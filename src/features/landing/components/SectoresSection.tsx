import { useScrollReveal } from '@/common/hooks/useScrollReveal'

const SECTORS = [
  {
    name: 'Finanzas',
    tag: 'SERVICIOS FINANCIEROS',
    img: '/img/trading.jpg',
    arch: 'Microservicios con API gateways y bases de datos segregadas.',
    result: 'Detección de fraude en tiempo real y auditoría automatizada.',
    color: 'var(--cyan)',
    gradient: 'linear-gradient(135deg, rgba(6,182,212,0.08), rgba(5,10,20,0.95))',
    iconGrad: 'linear-gradient(135deg, var(--cyan), var(--blue))',
    align: 'left' as const,
  },
  {
    name: 'Salud',
    tag: 'SALUD & FARMA',
    img: '/img/pexels-merlin-10874554.jpg',
    arch: 'Plataforma HIPAA/GDPR-ready, lakehouse de datos médicos.',
    result: 'Diagnóstico asistido por IA y optimización de recursos.',
    color: 'var(--emerald)',
    gradient: 'linear-gradient(135deg, rgba(34,197,94,0.08), rgba(5,10,20,0.95))',
    iconGrad: 'linear-gradient(135deg, var(--emerald), var(--cyan))',
    align: 'right' as const,
  },
  {
    name: 'Comercial',
    tag: 'COMERCIO & RETAIL',
    img: '/img/ecomerce.jpg',
    arch: 'Orientada a eventos (event-driven) y serverless.',
    result: 'Predicción de demanda y personalización masiva.',
    color: 'var(--blue)',
    gradient: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(5,10,20,0.95))',
    iconGrad: 'linear-gradient(135deg, var(--blue), var(--violet))',
    align: 'left' as const,
  },
]

export function SectoresSection() {
  const { ref: badgeRef, isVisible: badgeVisible } = useScrollReveal()
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal()
  const { ref: containerRef, isVisible: containerVisible } = useScrollReveal({ threshold: 0.05 })

  return (
    <section id="sectores" className="sectors-section" style={{ padding: '140px 0', position: 'relative', isolation: 'isolate', overflow: 'hidden', background: 'linear-gradient(135deg, #C7F4EC 0%, #9EE6F5 35%, #7DD3FC 65%, #A7F3D0 100%)' }}>
      <div className="wrap">
        <div className="text-center" style={{ marginBottom: 72 }}>
          <div ref={badgeRef as React.RefObject<HTMLDivElement>} className={`reveal badge liquid-glass-subtle ${badgeVisible ? 'active' : ''}`} style={{ marginBottom: 24, display: 'inline-flex', background: 'linear-gradient(135deg, rgba(6,182,212,0.2), rgba(34,197,94,0.15))' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="2" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
            <span style={{ color: 'var(--cyan)' }}>Soluciones por Sector</span>
          </div>
          <h2 ref={titleRef as React.RefObject<HTMLHeadingElement>} className={`reveal ${titleVisible ? 'active' : ''}`} style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: '#0F2A4A', marginBottom: 16, textShadow: '0 1px 14px rgba(255,255,255,0.45)' }}>Verticales de <span className="gradient-text">industria</span></h2>
        </div>

        <div ref={containerRef as React.RefObject<HTMLDivElement>} className={`reveal ${containerVisible ? 'active' : ''}`} style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
          {SECTORS.map((s, i) => {
            const isImageLeft = i % 2 === 0
            return (
              <div key={s.name} className="glass-bisel" style={{ display: 'grid', gridTemplateColumns: isImageLeft ? '1.3fr 1fr' : '1fr 1.3fr', overflow: 'hidden', borderRadius: 32 }}>
                {isImageLeft && (
                  <div style={{ minHeight: 380, alignSelf: 'stretch', overflow: 'hidden', position: 'relative' }}>
                    <img src={s.img} alt={s.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(5,10,20,0.9) 0%, transparent 50%)' }} />
                    <div style={{ position: 'absolute', bottom: 32, left: 32 }}>
                      <span style={{ background: s.color === 'var(--cyan)' ? 'rgba(6,182,212,0.9)' : s.color === 'var(--emerald)' ? 'rgba(34,197,94,0.9)' : 'rgba(59,130,246,0.9)', padding: '10px 20px', borderRadius: 10, fontSize: 13, fontWeight: 600, color: '#fff' }}>{s.tag}</span>
                    </div>
                  </div>
                )}
                <div className="sector-panel" style={{ padding: 48, background: s.gradient, color: '#fff' }}>
                  <div style={{ width: 72, height: 72, borderRadius: 20, background: s.iconGrad, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 28, boxShadow: `0 12px 32px ${s.color === 'var(--cyan)' ? 'rgba(6,182,212,0.35)' : s.color === 'var(--emerald)' ? 'rgba(34,197,94,0.35)' : 'rgba(59,130,246,0.35)'}` }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
                      {s.name === 'Finanzas' ? <><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></> : s.name === 'Salud' ? <><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></> : <><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></>}
                    </svg>
                  </div>
                  <h3 style={{ fontSize: 28, fontWeight: 700, marginBottom: 20, color: '#fff' }}>{s.name}</h3>
                  <div style={{ marginBottom: 24 }}>
                    <span style={{ fontSize: 11, color: 'var(--cyan)', textTransform: 'uppercase', letterSpacing: '0.12em', display: 'block', marginBottom: 8 }}>Arquitectura</span>
                    <p style={{ fontSize: 15, color: '#dde5ef', lineHeight: 1.7 }}>{s.arch}</p>
                  </div>
                  <div style={{ marginBottom: 24 }}>
                    <span style={{ fontSize: 11, color: 'var(--emerald)', textTransform: 'uppercase', letterSpacing: '0.12em', display: 'block', marginBottom: 8 }}>Resultado</span>
                    <p style={{ fontSize: 15, color: 'var(--emerald)', fontWeight: 500 }}>{s.result}</p>
                  </div>
                </div>
                {!isImageLeft && (
                  <div style={{ minHeight: 380, alignSelf: 'stretch', overflow: 'hidden', position: 'relative' }}>
                    <img src={s.img} alt={s.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(270deg, rgba(5,10,20,0.9) 0%, transparent 50%)' }} />
                    <div style={{ position: 'absolute', bottom: 32, right: 32 }}>
                      <span style={{ background: s.color === 'var(--cyan)' ? 'rgba(6,182,212,0.9)' : s.color === 'var(--emerald)' ? 'rgba(34,197,94,0.9)' : 'rgba(59,130,246,0.9)', padding: '10px 20px', borderRadius: 10, fontSize: 13, fontWeight: 600, color: '#fff' }}>{s.tag}</span>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
