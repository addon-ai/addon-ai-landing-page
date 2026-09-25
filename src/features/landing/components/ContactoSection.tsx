import { useScrollReveal } from '@/common/hooks/useScrollReveal'
import { HeroBlobs } from '@/common/organisms/HeroBlobs'
import { Button } from '@/common/atoms/Button'
import { useState } from 'react'
import shared from '@/styles/shared.module.css'
import { env } from '@/infrastructure/config/env'
import styles from './ContactoSection.module.css'

export function ContactoSection() {
  const { ref: glassRef, isVisible: glassVisible } = useScrollReveal()
  const { ref: infoRef, isVisible: infoVisible } = useScrollReveal()
  const [status, setStatus] = useState<{ type: 'info' | 'success' | 'error'; text: string } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = data.get('name') as string
    const email = data.get('email') as string
    const company = data.get('company') as string
    const message = data.get('message') as string
    // Honeypot: the hidden checkbox below is what bots fill in. It has to be
    // read from the form, otherwise it is always sent empty and Web3Forms can
    // never flag a submission as spam.
    const botcheck = data.get('botcheck') ? String(data.get('botcheck')) : ''

    if (!name || !email || !company || !message) {
      setStatus({ type: 'error', text: 'Por favor completa todos los campos correctamente.' })
      return
    }

    if (!env.web3forms.accessKey) {
      setStatus({ type: 'error', text: 'El formulario aún no está configurado para enviar. Escribinos a jiliar.silgado@gmail.com.' })
      return
    }

    setIsSubmitting(true)
    setStatus({ type: 'info', text: 'Enviando…' })

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: env.web3forms.accessKey,
          subject: `Nuevo contacto desde landing — ${company}`,
          from_name: name,
          name,
          email,
          company,
          message,
          botcheck,
        }),
      })
      const result = (await res.json()) as { success?: boolean; message?: string }
      if (!res.ok || !result.success) {
        throw new Error(result.message ?? 'Error al enviar')
      }
      form.reset()
      setStatus({ type: 'success', text: '¡Gracias! Te responderemos en menos de 24 h.' })
    } catch {
      setStatus({ type: 'error', text: 'No se pudo enviar el mensaje. Escribinos a jiliar.silgado@gmail.com.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contacto" className={styles.section}>
      <HeroBlobs />

      <div className={shared.wrap}>
        <div ref={glassRef as React.RefObject<HTMLDivElement>} className={`${shared.glassBisel} ${shared.reveal} ${glassVisible ? styles.revealed : ''} ${styles.glassCard}`} data-glass="bisel">
          <div className={shared.refractLayer} /><div className={shared.glowAurora} /><div className={shared.glowCore} /><div className={shared.glowRim} />
          <div className={styles.iconWrap}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          </div>
          <h2 className={`${shared.reveal} ${shared.revealed} ${styles.title}`}>¿Listo para implementar IA <span className={shared.gradientText}>de verdad</span>?</h2>
          <p className={`${shared.reveal} ${shared.revealed} ${styles.description}`}>Solicita tu diagnóstico gratuito. Sin compromiso, sin jerga innecesaria — solo soluciones.</p>

          <form className={styles.contactForm} onSubmit={handleSubmit} noValidate>
            <input type="checkbox" name="botcheck" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
            <div className={styles.cfGrid}>
              <div className={styles.cfField}>
                <label htmlFor="cf-name" className={styles.cfLabel}>Nombre completo</label>
                <input id="cf-name" name="name" type="text" className={styles.cfInput} placeholder="Tu nombre" autoComplete="name" required />
              </div>
              <div className={styles.cfField}>
                <label htmlFor="cf-email" className={styles.cfLabel}>Correo corporativo</label>
                <input id="cf-email" name="email" type="email" className={styles.cfInput} placeholder="nombre@empresa.com" autoComplete="email" required />
              </div>
              <div className={`${styles.cfField} ${styles.cfFieldFull}`}>
                <label htmlFor="cf-company" className={styles.cfLabel}>Empresa</label>
                <input id="cf-company" name="company" type="text" className={styles.cfInput} placeholder="Nombre de tu empresa" autoComplete="organization" required />
              </div>
              <div className={`${styles.cfField} ${styles.cfFieldFull}`}>
                <label htmlFor="cf-message" className={styles.cfLabel}>Mensaje / Desafío técnico</label>
                <textarea id="cf-message" name="message" className={`${styles.cfInput} ${styles.cfTextarea}`} rows={5} placeholder="Cuéntanos brevemente el reto que quieres resolver" required />
              </div>
            </div>
            <Button type="submit" variant="primary" className={styles.cfSubmit} disabled={isSubmitting}>
              {isSubmitting ? 'Enviando…' : 'Enviar mensaje'}
            </Button>
            {status && (
              <p className={styles.cfStatus} style={{ color: status.type === 'success' ? 'var(--emerald)' : status.type === 'error' ? '#ef4444' : 'var(--text-secondary)' }}>
                {status.text}
              </p>
            )}
          </form>
        </div>

        <div ref={infoRef as React.RefObject<HTMLDivElement>} className={`${shared.reveal} ${infoVisible ? styles.revealed : ''} ${styles.contactInfo}`}>
          <a href="mailto:jiliar.silgado@gmail.com" className={styles.contactInfoItem} aria-label="Enviar correo">
            <span className={styles.contactInfoIcon}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></span>
            <span className={styles.contactInfoText}><span className={styles.contactInfoLabel}>Email</span><span className={styles.contactInfoValue}>jiliar.silgado@gmail.com</span></span>
          </a>
          <a href="tel:+573016733590" className={styles.contactInfoItem} aria-label="Llamar por teléfono">
            <span className={styles.contactInfoIcon}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></span>
            <span className={styles.contactInfoText}><span className={styles.contactInfoLabel}>Teléfono</span><span className={styles.contactInfoValue}>+57 301 673 3590</span></span>
          </a>
          <div className={styles.contactInfoItem} aria-label="Ubicación">
            <span className={styles.contactInfoIcon}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></span>
            <span className={styles.contactInfoText}><span className={styles.contactInfoLabel}>Ubicación</span><span className={styles.contactInfoValue}>Cartagena, Colombia</span></span>
          </div>
        </div>
      </div>
    </section>
  )
}
