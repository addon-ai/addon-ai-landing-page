import { useScrollReveal } from '@/common/hooks/useScrollReveal'

const SERVICES = [
  { title: 'Consultoría Estratégica', desc: 'Diagnóstico y hoja de ruta', tag: 'Discovery', icon: '🔍', color: 'var(--cyan)', bg: 'rgba(6,182,212,0.12)' },
  { title: 'Desarrollo a Medida', desc: 'Microservicios, APIs y agentes de IA', tag: 'Build', icon: '🔧', color: 'var(--emerald)', bg: 'rgba(34,197,94,0.12)' },
  { title: 'Data & Analytics', desc: 'Ingeniería de datos y dashboards interactivos', tag: 'Analyze', icon: '📊', color: 'var(--blue)', bg: 'rgba(59,130,246,0.12)' },
  { title: 'Managed Services', desc: 'Monitoreo 24/7 y SLA garantizado', tag: 'Operate', icon: '🛡️', color: '#a855f7', bg: 'rgba(168,85,247,0.12)' },
]

const SVC_ICONS: Record<string, JSX.Element> = {
  '🔍': <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>,
  '🔧': <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--emerald)" strokeWidth="2" strokeLinecap="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
  '📊': <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>,
  '🛡️': <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
}

export function ServiciosSection() {
  const { ref: badgeRef, isVisible: badgeVisible } = useScrollReveal()
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal()
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal()

  return (
    <section id="servicios" style={{ padding: '112px 0' }}>
      <div className="wrap">
        <div className="text-center" style={{ marginBottom: 64 }}>
          <div ref={badgeRef as React.RefObject<HTMLDivElement>} className={`reveal badge liquid-glass-subtle ${badgeVisible ? 'active' : ''}`} style={{ marginBottom: 24, display: 'inline-flex' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="2" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
            <span style={{ color: 'var(--cyan)' }}>Paquetes de Servicios</span>
          </div>
          <h2 ref={titleRef as React.RefObject<HTMLHeadingElement>} className={`reveal ${titleVisible ? 'active' : ''}`} style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>Soluciones a <span className="gradient-text">medida</span></h2>
        </div>
        <div ref={gridRef as React.RefObject<HTMLDivElement>} className={`cols-4 reveal ${gridVisible ? 'active' : ''}`} style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }}>
          {SERVICES.map((s) => (
            <div key={s.title} className="glass-bisel card-hover liquid-card" style={{ padding: '32px 24px', textAlign: 'center' }}>
              <div className="refract-layer" /><div className="glow-aurora" /><div className="glow-core" /><div className="glow-rim" />
              <div style={{ width: 56, height: 56, borderRadius: 16, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                {SVC_ICONS[s.icon]}
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>{s.title}</h3>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{s.desc}</p>
              <div className="liquid-glass-subtle" style={{ display: 'inline-block', padding: '4px 12px', fontSize: 11, color: s.color, marginTop: 12 }}>{s.tag}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
