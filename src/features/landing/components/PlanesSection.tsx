import { useScrollReveal } from '@/common/hooks/useScrollReveal'

export function PlanesSection() {
  const { ref: badgeRef, isVisible: badgeVisible } = useScrollReveal()

  return (
    <section id="planes" style={{ padding: '112px 0' }}>
      <div className="wrap">
        <div className="text-center" style={{ marginBottom: 64 }}>
          <div ref={badgeRef as React.RefObject<HTMLDivElement>} className={`reveal badge liquid-glass-subtle ${badgeVisible ? 'active' : ''}`} style={{ marginBottom: 24, display: 'inline-flex' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="2" strokeLinecap="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
            <span style={{ color: 'var(--cyan)' }}>Modelos de Compromiso</span>
          </div>
          <h2 className={`reveal ${badgeVisible ? 'active' : ''}`} style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>Planes que escalan <span className="gradient-text">contigo</span></h2>
        </div>

        <div className="cols-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, maxWidth: 1000, margin: '0 auto', paddingTop: 18 }}>
          {[
            { phase: 'Fase 1', name: 'Surgical Strike', price: '$15k – $50k', desc: 'MVP de 4 semanas, Roadmap y Dashboard ROI.', features: ['MVP en 4 semanas', 'Roadmap estratégico', 'Dashboard ROI'], popular: false },
            { phase: 'Fase 2', name: 'PLG Híbrido', price: '$500 – $30k', desc: 'Herramientas Self-Service y Consultoría de Escalabilidad.', features: ['Herramientas Self-Service', 'Consultoría de escalabilidad'], popular: true },
            { phase: 'Fase 3', name: 'Managed Partner', price: '$5k – $50k/mes', desc: 'SRE team extension, co-gestión y SLA contractual.', features: ['SRE team extension', 'Co-gestión', 'SLA contractual'], popular: false },
          ].map((plan, i) => (
            <div key={plan.name} className={`glass-bisel card-hover liquid-card reveal ${badgeVisible ? 'active' : ''}`} style={{ padding: '36px 28px', position: 'relative', ...(plan.popular ? { border: '1px solid rgba(6,182,212,0.3)' } : {}) }}>
              <div className="refract-layer" /><div className="glow-aurora" /><div className="glow-core" /><div className="glow-rim" />
              {plan.popular && <div className="popular-badge">Popular</div>}
              <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>{plan.phase}</div>
              <h3 style={{ fontSize: 20, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>{plan.name}</h3>
              <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--cyan)', marginBottom: 4 }}>{plan.price}</div>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 24 }}>{plan.desc}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {plan.features.map((f) => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-secondary)', padding: '6px 0' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={i === 0 ? 'var(--cyan)' : i === 1 ? 'var(--emerald)' : 'var(--blue)'} strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
