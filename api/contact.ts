/**
 * Vercel Serverless Function — contacto.
 *
 * Por que existe: la integracion directa con Web3Forms es client-side y no
 * permite verificar la entrega. Este endpoint envia el correo desde el lado
 * del servidor via Resend, donde si tenemos control del remitente y del
 * destino.
 *
 * REGLA DE SEGURIDAD CRITICA: la API key de Resend NO debe llevar el prefijo
 * `VITE_`. Vite reemplaza todo `VITE_*` por texto plano en el bundle del
 * cliente, lo que publicaria el secreto en el navegador de cada visitante.
 * Se lee unicamente desde process.env dentro de esta funcion.
 */

const RESEND_ENDPOINT = 'https://api.resend.com/emails';

/** Limites de entrada. El cliente no es una frontera de confianza. */
const LIMITS = {
  name: 100,
  email: 254,
  company: 200,
  message: 5000,
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type ContactFields = {
  name: string;
  email: string;
  company: string;
  message: string;
};

type ValidationResult =
  | { ok: true; value: ContactFields }
  | { ok: false; error: string };

const asString = (value: unknown): string => (typeof value === 'string' ? value.trim() : '');

function validate(body: unknown): ValidationResult {
  if (typeof body !== 'object' || body === null) {
    return { ok: false, error: 'Payload invalido.' };
  }
  const raw = body as Record<string, unknown>;
  const value: ContactFields = {
    name: asString(raw.name),
    email: asString(raw.email),
    company: asString(raw.company),
    message: asString(raw.message),
  };

  if (!value.name) return { ok: false, error: 'Falta el nombre.' };
  if (!value.email) return { ok: false, error: 'Falta el email.' };
  if (!value.company) return { ok: false, error: 'Falta la empresa.' };
  if (!value.message) return { ok: false, error: 'Falta el mensaje.' };

  if (!EMAIL_PATTERN.test(value.email)) {
    return { ok: false, error: 'El email no tiene un formato valido.' };
  }
  for (const key of Object.keys(LIMITS) as (keyof typeof LIMITS)[]) {
    if (value[key].length > LIMITS[key]) {
      return { ok: false, error: `El campo ${key} excede el largo permitido.` };
    }
  }
  return { ok: true, value };
}

/**
 * El honeypot se responde con 200 para no darle feedback al bot. Si devolvemos
 * un error, el atacante sabe que el campo importa y lo evita.
 */
const spamResponse = (): Response =>
  new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });

const jsonResponse = (status: number, payload: Record<string, unknown>): Response =>
  new Response(JSON.stringify(payload), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

/**
 * Rechaza origins externos. Un sitio de terceros podria hacer POST a este
 * endpoint para usarlo de relay de spam; el navegador no lo impediria porque
 * un POST simple no dispara preflight.
 */
function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return true;
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

function buildHtml(fields: ContactFields): string {
  const escape = (value: string): string =>
    value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  return [
    '<h2>Nuevo contacto desde addonai.biz</h2>',
    `<p><strong>Nombre:</strong> ${escape(fields.name)}</p>`,
    `<p><strong>Email:</strong> ${escape(fields.email)}</p>`,
    `<p><strong>Empresa:</strong> ${escape(fields.company)}</p>`,
    '<p><strong>Mensaje:</strong></p>',
    `<p>${escape(fields.message).replace(/\n/g, '<br />')}</p>`,
  ].join('');
}

/**
 * Export por metodo con nombre, NO `export default`. En `api/` con runtime
 * nodejs, `export default` significa firma Node `(req, res) => void`: el
 * `request` que llega es un IncomingMessage (sin `headers.get()`) y el
 * `Response` que se retorna se descarta sin escribir nada en `res`. Ese
 * contrato de Vercel esta en vercel.com/docs/functions/functions-api-reference.
 * Un export con nombre activa la firma Web `Request` -> `Response`, que es la
 * que este handler asume. Los metodos que no se exportan responden 405 solos.
 */
export async function POST(request: Request): Promise<Response> {
  if (!isSameOrigin(request)) {
    return jsonResponse(403, { success: false, error: 'Origen no permitido.' });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonResponse(400, { success: false, error: 'JSON invalido.' });
  }

  const raw = body as Record<string, unknown> | null;
  if (raw && asString(raw.botcheck)) {
    return spamResponse();
  }

  const validation = validate(body);
  if (!validation.ok) {
    return jsonResponse(400, { success: false, error: validation.error });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? 'jiliar.silgado@gmail.com';
  const from = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !from) {
    // 500 explicito: es un problema de configuracion del deploy, no del
    // visitante. No se filtra cual de las dos variables falta.
    console.error('[contact] Faltan RESEND_API_KEY o RESEND_FROM_EMAIL en el entorno.');
    return jsonResponse(500, { success: false, error: 'El servicio no esta disponible.' });
  }

  const res = await fetch(RESEND_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: validation.value.email,
      subject: `Nuevo contacto desde addonai.biz — ${validation.value.company}`,
      html: buildHtml(validation.value),
    }),
  });

  if (!res.ok) {
    // El detalle del error de Resend se loguea, no se devuelve: puede incluir
    // informacion de la cuenta.
    console.error('[contact] Resend respondio', res.status, await res.text());
    return jsonResponse(502, { success: false, error: 'No se pudo enviar el mensaje.' });
  }

  return jsonResponse(200, { success: true });
}

export const config = { runtime: 'nodejs' };
