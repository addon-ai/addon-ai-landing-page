import { useScrollReveal } from '@/common/hooks/useScrollReveal'

export function QuickWinsSection() {
  const { ref: badgeRef, isVisible: badgeVisible } = useScrollReveal()
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal()
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal()

  return (
    <section style={{ padding: '112px 0' }}>
      <div className="wrap">
        <div className="text-center" style={{ marginBottom: 64 }}>
          <div ref={badgeRef as React.RefObject<HTMLDivElement>} className={`reveal badge liquid-glass-subtle ${badgeVisible ? 'active' : ''}`} style={{ marginBottom: 24, display: 'inline-flex' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--emerald)" strokeWidth="2" strokeLinecap="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            <span style={{ color: 'var(--emerald)' }}>Quick Wins</span>
          </div>
          <h2 ref={titleRef as React.RefObject<HTMLHeadingElement>} className={`reveal ${titleVisible ? 'active' : ''}`} style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>Resultados <span className="gradient-text-alt">semanales</span></h2>
        </div>
        <div ref={gridRef as React.RefObject<HTMLDivElement>} className={`cols-2 reveal ${gridVisible ? 'active' : ''}`} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div className="glass-bisel card-hover" style={{ padding: 32 }}>
            <div className="refract-layer" /><div className="glow-aurora" /><div className="glow-core" /><div className="glow-rim" />
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg,var(--emerald),var(--cyan))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
              </div>
              <div>
                <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Inmediato</div>
                <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text)' }}>Diagnóstico de negocio</div>
              </div>
            </div>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>Identificación de 3 a 5 mejoras críticas de salud y deuda técnica.</p>
          </div>
          <div className="glass-bisel card-hover" style={{ padding: 32 }}>
            <div className="refract-layer" /><div className="glow-aurora" /><div className="glow-core" /><div className="glow-rim" />
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg,var(--cyan),var(--blue))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, color: '#fff' }}>2</div>
              <div>
                <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Semanas</div>
                <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text)' }}>Propuesta tecnológica</div>
              </div>
            </div>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>Diagnóstico técnico y plan de acción de 90 días.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
