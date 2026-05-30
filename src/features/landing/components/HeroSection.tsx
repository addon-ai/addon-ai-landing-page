import { useScrollReveal } from '@/common/hooks/useScrollReveal'
import { useCounter } from '../hooks/useCounter'
import { HeroBlobs } from '@/common/organisms/HeroBlobs'

export function HeroSection() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal()
  const { ref: subtitleRef, isVisible: subtitleVisible } = useScrollReveal()
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollReveal()
  const { ref: statsRef, isVisible: statsVisible } = useScrollReveal()
  const { ref: visualRef, isVisible: visualVisible } = useScrollReveal()

  const { ref: counter1, display: d1 } = useCounter({ target: 30, suffix: '%' })
  const { ref: counter2, display: d2 } = useCounter({ target: 500, suffix: '+' })
  const { ref: counter3, display: d3 } = useCounter({ target: 99.5, suffix: '%', decimal: true })

  return (
    <section
      className="min-h-screen flex items-center"
      style={{ paddingTop: 64, position: 'relative', overflow: 'hidden' }}
    >
      <HeroBlobs />

      <div className="wrap" style={{ paddingTop: 80, paddingBottom: 80, position: 'relative', zIndex: 1 }}>
        <div
          className="hero-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            gap: 64,
            alignItems: 'center',
          }}
        >
          <div>
            <h1
              ref={titleRef as React.RefObject<HTMLHeadingElement>}
              className={`reveal hero-title ${titleVisible ? 'active' : ''}`}
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                letterSpacing: '-0.03em',
                lineHeight: 1.08,
                marginBottom: 24,
                fontFamily: "'Plus Jakarta Sans', -apple-system, 'Helvetica Neue', sans-serif",
                fontWeight: 200,
              }}
            >
              El puente hacia la{' '}
              <span className="gradient-text">eficiencia inteligente</span>
            </h1>

            <p
              ref={subtitleRef as React.RefObject<HTMLParagraphElement>}
              className={`reveal ${subtitleVisible ? 'active' : ''}`}
              style={{
                fontSize: 17,
                lineHeight: 1.8,
                color: 'var(--text-secondary)',
                marginBottom: 40,
                maxWidth: 520,
              }}
            >
              Diseñamos ecosistemas tecnológicos robustos combinando arquitectura de software
              e IA para optimizar procesos.
            </p>

            <div
              ref={ctaRef as React.RefObject<HTMLDivElement>}
              className={`reveal hero-cta ${ctaVisible ? 'active' : ''}`}
              style={{ marginBottom: 48, display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', alignItems: 'center', gap: 16 }}
            >
              <a href="#contacto" className="btn-primary">
                <span>Solicita tu diagnóstico gratuito</span>
              </a>
              <a href="#servicios" className="btn-secondary">
                Conoce nuestros servicios
              </a>
            </div>

            <div
              ref={statsRef as React.RefObject<HTMLDivElement>}
              className={`reveal stats-row ${statsVisible ? 'active' : ''}`}
              style={{ display: 'flex', alignItems: 'center', gap: 32 }}
            >
              <div>
                <div ref={counter1} style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text)' }}>{d1}</div>
                <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginTop: 4 }}>Optimización de procesos</div>
              </div>
              <div className="stat-divider" style={{ width: 1, height: 40, background: 'rgba(255,255,255,0.1)' }} />
              <div>
                <div ref={counter2} style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text)' }}>{d2}</div>
                <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginTop: 4 }}>Horas automatizadas / mes</div>
              </div>
              <div className="stat-divider" style={{ width: 1, height: 40, background: 'rgba(255,255,255,0.1)' }} />
              <div>
                <div ref={counter3} style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text)' }}>{d3}</div>
                <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginTop: 4 }}>Uptime garantizado</div>
              </div>
            </div>
          </div>

          <div
            ref={visualRef as React.RefObject<HTMLDivElement>}
            className={`hero-visual reveal ${visualVisible ? 'active' : ''}`}
            style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 500 }}
          >
            <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div className="float-logo" style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img
                  src="/logos/logo-horizontal-full-primary.svg"
                  alt="Addon.ai"
                  style={{ height: 160, width: 'auto', filter: 'drop-shadow(0 1px 8px rgba(18,210,124,0.12))' }}
                />
              </div>
            </div>

            {/* Efficiency badge */}
            <div
              className="liquid-glass card-hover"
              style={{ position: 'absolute', top: 10, right: 10, borderRadius: 20, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 10 }}
            >
              <div style={{ width: 32, height: 32, borderRadius: 10, background: 'rgba(34,197,94,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--emerald)" strokeWidth="2" strokeLinecap="round">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                  <polyline points="17 6 23 6 23 12" />
                </svg>
              </div>
              <div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Eficiencia</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--emerald)' }}>+30%</div>
              </div>
            </div>

            {/* Uptime badge */}
            <div
              className="liquid-glass card-hover"
              style={{ position: 'absolute', bottom: 10, left: 10, borderRadius: 20, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 10 }}
            >
              <div style={{ width: 32, height: 32, borderRadius: 10, background: 'rgba(6,182,212,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="2" strokeLinecap="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </div>
              <div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Uptime</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--cyan)' }}>99.5%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
