import { useScrollReveal } from '@/common/hooks/useScrollReveal'
import { useThemeStore } from '../store/useThemeStore'

const CHALLENGES = [
  {
    title: 'Sistemas Legados',
    desc: 'Software que frena la operación en lugar de impulsarla.',
    color: '#ef4444',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round">
        <rect x="2" y="2" width="20" height="8" rx="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" />
        <line x1="6" y1="18" x2="6.01" y2="18" />
      </svg>
    ),
  },
  {
    title: 'Datos Aislados',
    desc: 'Información valiosa atrapada en silos sin análisis real.',
    color: '#f59e0b',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    title: 'IA Experimental',
    desc: 'Dificultad para pasar de "prototipos" a soluciones con ROI real.',
    color: '#a855f7',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round">
        <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
        <path d="M20.66 7A10 10 0 0 0 14 2v5.37" />
      </svg>
    ),
  },
  {
    title: 'Ineficiencia Operativa',
    desc: 'Procesos manuales que consumen cientos de horas hombre.',
    color: '#ec4899',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
]

export function DesafiosSection() {
  const mode = useThemeStore((s) => s.mode)
  const { ref: badgeRef, isVisible: badgeVisible } = useScrollReveal()
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal()
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal()

  return (
    <section id="desafios" style={{ padding: '140px 0', position: 'relative', overflow: 'hidden' }}>
      <div
        className="desafios-bg"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          backgroundImage: mode === 'light' ? "url('/img/desafíos del mercado-light.jpg')" : "url('/img/pexels-rostislav-5307735.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        }}
      />
      <div
        className="desafios-overlay"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          background: 'linear-gradient(180deg, rgba(5,10,20,0.72) 0%, rgba(5,10,20,0.58) 50%, rgba(5,10,20,0.78) 100%)',
        }}
      />

      <div className="wrap" style={{ position: 'relative' }}>
        <div className="text-center" style={{ marginBottom: 64 }}>
          <div
            ref={badgeRef as React.RefObject<HTMLDivElement>}
            className={`reveal badge liquid-glass-subtle ${badgeVisible ? 'active' : ''}`}
            style={{ marginBottom: 24, display: 'inline-flex', background: 'rgba(239,68,68,0.2)' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span style={{ color: '#ef4444' }}>Desafíos del Mercado</span>
          </div>

          <h2
            ref={titleRef as React.RefObject<HTMLHeadingElement>}
            className={`reveal ${titleVisible ? 'active' : ''}`}
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: '#fff', marginBottom: 16 }}
          >
            ¿Por qué las empresas no logran{' '}
            <span className="gradient-text">escalar su tecnología</span>?
          </h2>
        </div>

        <div
          ref={gridRef as React.RefObject<HTMLDivElement>}
          className={`cols-2 reveal ${gridVisible ? 'active' : ''}`}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}
        >
          {CHALLENGES.map((c) => (
            <div
              key={c.title}
              className="glass-bisel card-hover"
              style={{ padding: 36, background: 'rgba(255,255,255,0.03)' }}
            >
              <div className="refract-layer" />
              <div className="glow-aurora" />
              <div className="glow-core" />
              <div className="glow-rim" />

              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 16,
                  background: `${c.color}33`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 24,
                }}
              >
                {c.icon}
              </div>

              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 10 }}>{c.title}</h3>
              <p style={{ fontSize: 14, color: '#dde5ef', lineHeight: 1.6 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
