import { useScrollReveal } from '@/common/hooks/useScrollReveal'

export function VentajaSection() {
  const { ref: badgeRef, isVisible: badgeVisible } = useScrollReveal()
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal()
  const { ref: descRef, isVisible: descVisible } = useScrollReveal()

  return (
    <section
      style={{
        padding: '140px 0',
        background: 'linear-gradient(180deg, rgba(34,197,94,0.05) 0%, rgba(6,182,212,0.08) 100%)',
      }}
    >
      <div className="wrap">
        <div
          className="glass-bisel"
          style={{
            padding: 64,
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(34,197,94,0.08), rgba(6,182,212,0.05))',
          }}
        >
          <div className="refract-layer" />
          <div className="glow-aurora" />
          <div className="glow-core" />
          <div className="glow-rim" />

          <div
            ref={badgeRef as React.RefObject<HTMLDivElement>}
            className={`badge liquid-glass-subtle reveal ${badgeVisible ? 'active' : ''}`}
            style={{
              marginBottom: 24,
              display: 'inline-flex',
              background: 'linear-gradient(135deg, rgba(34,197,94,0.2), rgba(6,182,212,0.15))',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--emerald)" strokeWidth="2" strokeLinecap="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            <span style={{ color: 'var(--emerald)' }}>Arquitectura + IA</span>
          </div>

          <h2
            ref={titleRef as React.RefObject<HTMLHeadingElement>}
            className={`reveal ${titleVisible ? 'active' : ''}`}
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}
          >
            Ventaja Operativa <span className="gradient-text-alt">Sostenible</span>
          </h2>

          <p
            ref={descRef as React.RefObject<HTMLParagraphElement>}
            className={`reveal ${descVisible ? 'active' : ''}`}
            style={{
              fontSize: 16,
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              maxWidth: 720,
              margin: '0 auto',
            }}
          >
            Addon AI es el socio tecnológico estratégico integral que construye, despliega y mantiene
            ecosistemas digitales completos impulsados por IA. Arquitectamos soluciones de clase
            producción basadas en cloud computing.
          </p>
        </div>
      </div>
    </section>
  )
}
