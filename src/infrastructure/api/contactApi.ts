import { env } from '@/infrastructure/config/env';

export type ContactPayload = {
  name: string;
  email: string;
  company: string;
  message: string;
  /** Honeypot. Vacio para un envio legitimo. */
  botcheck?: string;
};

export type ContactResult = { ok: true } | { ok: false; error: string };

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

/**
 * Envio por la serverless function (Resend). Es el camino primario: se envia
 * desde el servidor con un remitente verificado, que es lo que hace confiable
 * la entrega a Gmail.
 */
async function postToOwnApi(payload: ContactPayload): Promise<ContactResult> {
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const result = (await res.json().catch(() => null)) as { error?: string } | null;
      return { ok: false, error: result?.error ?? 'Error al enviar' };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: 'Error de red' };
  }
}

/**
 * Fallback a Web3Forms. Solo se usa si la function no respondio, para no perder
 * el lead si Vercel esta caido. Si la function respondio bien no se llama: dos
 * envios al mismo destino generan leads duplicados.
 */
async function postToWeb3forms(payload: ContactPayload): Promise<ContactResult> {
  if (!env.web3forms.accessKey) return { ok: false, error: 'Sin credencial de respaldo' };
  try {
    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: env.web3forms.accessKey,
        subject: `Nuevo contacto desde landing — ${payload.company}`,
        from_name: payload.name,
        ...payload,
      }),
    });
    const result = (await res.json().catch(() => null)) as { success?: boolean; message?: string } | null;
    if (!res.ok || !result?.success) {
      return { ok: false, error: result?.message ?? 'Error al enviar' };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: 'Error de red' };
  }
}

export async function submitContact(payload: ContactPayload): Promise<ContactResult> {
  const primary = await postToOwnApi(payload);
  if (primary.ok) return primary;
  return postToWeb3forms(payload);
}
