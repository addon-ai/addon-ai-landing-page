import { useScrollReveal } from '@/common/hooks/useScrollReveal'

const CASOS = [
  { title: 'Comprobación Inteligente', desc: 'Validación de documentos/vehículos con Computer Vision.', color: 'var(--cyan)', bg: 'rgba(6,182,212,0.15)',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg> },
  { title: 'Control Tower', desc: 'Gestión logística de Impo/Expo.', color: 'var(--emerald)', bg: 'rgba(34,197,94,0.15)',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--emerald)" strokeWidth="2" strokeLinecap="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg> },
  { title: 'Lectura Inteligente', desc: 'Automatización documental con Agentes IA.', color: 'var(--blue)', bg: 'rgba(59,130,246,0.15)',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg> },
  { title: 'Migración Cloud', desc: 'Sotracar, CI Global y Asercol.', color: '#a855f7', bg: 'rgba(168,85,247,0.15)',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg> },
]

export function CasosSection() {
  const { ref: badgeRef, isVisible: badgeVisible } = useScrollReveal()
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal()

  return (
    <section id="casos" style={{ padding: '112px 0' }}>
      <div className="wrap">
        <div className="text-center" style={{ marginBottom: 64 }}>
          <div ref={badgeRef as React.RefObject<HTMLDivElement>} className={`reveal badge liquid-glass-subtle ${badgeVisible ? 'active' : ''}`} style={{ marginBottom: 24, display: 'inline-flex' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="2" strokeLinecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            <span style={{ color: 'var(--cyan)' }}>Casos de Éxito</span>
          </div>
          <h2 className={`reveal ${badgeVisible ? 'active' : ''}`} style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>Resultados que <span className="gradient-text">hablan solos</span></h2>
        </div>
        <div ref={gridRef as React.RefObject<HTMLDivElement>} className={`cols-2 reveal ${gridVisible ? 'active' : ''}`} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {CASOS.map((c) => (
            <div key={c.title} className="glass-bisel card-hover" style={{ padding: 28 }}>
              <div className="refract-layer" /><div className="glow-aurora" /><div className="glow-core" /><div className="glow-rim" />
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{c.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text)' }}>{c.title}</h3>
              </div>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
