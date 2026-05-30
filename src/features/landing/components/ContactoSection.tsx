import { useScrollReveal } from '@/common/hooks/useScrollReveal'
import { useState } from 'react'

export function ContactoSection() {
  const { ref: glassRef, isVisible: glassVisible } = useScrollReveal()
  const { ref: infoRef, isVisible: infoVisible } = useScrollReveal()
  const [status, setStatus] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = data.get('name') as string
    const email = data.get('email') as string
    const company = data.get('company') as string
    const message = data.get('message') as string

    if (!name || !email || !company || !message) {
      setStatus('Por favor completa todos los campos correctamente.')
      return
    }

    const subject = encodeURIComponent(`Nuevo contacto desde landing — ${company}`)
    const body = encodeURIComponent(`Nombre: ${name}\nEmpresa: ${company}\nCorreo: ${email}\n\nMensaje:\n${message}`)
    setStatus('Abriendo tu cliente de correo…')
    window.location.href = `mailto:jiliar.silgado@gmail.com?subject=${subject}&body=${body}`
    setTimeout(() => {
      form.reset()
      setStatus('¡Gracias! Te responderemos en menos de 24 h.')
    }, 800)
  }

  return (
    <section id="contacto" style={{ padding: '112px 0' }}>
      <div className="wrap">
        <div ref={glassRef as React.RefObject<HTMLDivElement>} className={`glass-bisel reveal ${glassVisible ? 'active' : ''}`} style={{ padding: '64px 48px', textAlign: 'center', maxWidth: 700, margin: '0 auto' }}>
          <div className="refract-layer" /><div className="glow-aurora" /><div className="glow-core" /><div className="glow-rim" />
          <div style={{ width: 64, height: 64, borderRadius: 20, background: 'linear-gradient(135deg, rgba(6,182,212,0.2), rgba(34,197,94,0.2))', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          </div>
          <h2 className="reveal active" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>¿Listo para implementar IA <span className="gradient-text">de verdad</span>?</h2>
          <p className="reveal active" style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: 520, margin: '0 auto 36px' }}>Solicita tu diagnóstico gratuito. Sin compromiso, sin jerga innecesaria — solo soluciones.</p>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="cf-grid">
              <div className="cf-field">
                <label htmlFor="cf-name" className="cf-label">Nombre completo</label>
                <input id="cf-name" name="name" type="text" className="cf-input" placeholder="Tu nombre" autoComplete="name" required />
              </div>
              <div className="cf-field">
                <label htmlFor="cf-email" className="cf-label">Correo corporativo</label>
                <input id="cf-email" name="email" type="email" className="cf-input" placeholder="nombre@empresa.com" autoComplete="email" required />
              </div>
              <div className="cf-field cf-field-full">
                <label htmlFor="cf-company" className="cf-label">Empresa</label>
                <input id="cf-company" name="company" type="text" className="cf-input" placeholder="Nombre de tu empresa" autoComplete="organization" required />
              </div>
              <div className="cf-field cf-field-full">
                <label htmlFor="cf-message" className="cf-label">Mensaje / Desafío técnico</label>
                <textarea id="cf-message" name="message" className="cf-input cf-textarea" rows={5} placeholder="Cuéntanos brevemente el reto que quieres resolver" required />
              </div>
            </div>
            <button type="submit" className="btn-primary cf-submit"><span>Enviar mensaje</span></button>
            {status && <p className="cf-status" style={{ color: status.includes('Gracias') ? 'var(--emerald)' : status.includes('Abriendo') ? 'var(--text-secondary)' : '#ef4444' }}>{status}</p>}
          </form>
        </div>

        <div ref={infoRef as React.RefObject<HTMLDivElement>} className={`reveal contact-info ${infoVisible ? 'active' : ''}`} style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center', marginTop: 8 }}>
          <a href="mailto:jiliar.silgado@gmail.com" className="contact-info-item" aria-label="Enviar correo">
            <span className="contact-info-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></span>
            <span className="contact-info-text"><span className="contact-info-label">Email</span><span className="contact-info-value">jiliar.silgado@gmail.com</span></span>
          </a>
          <a href="tel:+573016733590" className="contact-info-item" aria-label="Llamar por teléfono">
            <span className="contact-info-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></span>
            <span className="contact-info-text"><span className="contact-info-label">Teléfono</span><span className="contact-info-value">+57 301 673 3590</span></span>
          </a>
          <div className="contact-info-item" aria-label="Ubicación">
            <span className="contact-info-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></span>
            <span className="contact-info-text"><span className="contact-info-label">Ubicación</span><span className="contact-info-value">Cartagena, Colombia</span></span>
          </div>
        </div>
      </div>
    </section>
  )
}
