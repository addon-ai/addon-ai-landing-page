import { useScrollReveal } from '@/common/hooks/useScrollReveal'

const STEPS = [
  { num: '01', title: 'Discovery', desc: 'Talleres de requerimientos y NFRs.', color: 'var(--cyan)', bg: 'rgba(6,182,212,0.12)',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg> },
  { num: '02', title: 'Desarrollo Ágil', desc: 'Entregas iterativas (Sprints).', color: 'var(--emerald)', bg: 'rgba(34,197,94,0.12)',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--emerald)" strokeWidth="2" strokeLinecap="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg> },
  { num: '03', title: 'Managed Services', desc: 'Monitoreo y alertas 24/7.', color: 'var(--blue)', bg: 'rgba(59,130,246,0.12)',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
  { num: '04', title: 'Transferencia', desc: 'Entrega de Runbooks y documentación técnica.', color: '#a855f7', bg: 'rgba(168,85,247,0.12)',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg> },
]

export function ModeloSection() {
  const { ref: badgeRef, isVisible: badgeVisible } = useScrollReveal()
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal()

  return (
    <section id="modelo" style={{ padding: '112px 0' }}>
      <div className="wrap">
        <div className="text-center" style={{ marginBottom: 64 }}>
          <div ref={badgeRef as React.RefObject<HTMLDivElement>} className={`reveal badge liquid-glass-subtle ${badgeVisible ? 'active' : ''}`} style={{ marginBottom: 24, display: 'inline-flex' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="2" strokeLinecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            <span style={{ color: 'var(--cyan)' }}>Modelo de Trabajo</span>
          </div>
          <h2 className={`reveal ${badgeVisible ? 'active' : ''}`} style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>De la idea al <span className="gradient-text">impacto</span></h2>
        </div>
        <div ref={gridRef as React.RefObject<HTMLDivElement>} className={`cols-4 reveal ${gridVisible ? 'active' : ''}`} style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }}>
          {STEPS.map((s) => (
            <div key={s.num} className="glass-bisel card-hover liquid-card" style={{ padding: '32px 24px', textAlign: 'center' }}>
              <div className="refract-layer" /><div className="glow-aurora" /><div className="glow-core" /><div className="glow-rim" />
              <div style={{ fontSize: 36, fontWeight: 800, color: s.color, opacity: 0.12, marginBottom: 16 }}>{s.num}</div>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>{s.icon}</div>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>{s.title}</h3>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
