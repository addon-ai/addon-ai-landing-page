import { useScrollReveal } from '@/common/hooks/useScrollReveal'
import { useCounter } from '../hooks/useCounter'
import { HeroBlobs } from '@/common/organisms/HeroBlobs'
import { Button } from '@/common/atoms/Button'
import shared from '@/styles/shared.module.css'
import styles from './HeroSection.module.css'

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
    <section className={`min-h-screen flex items-center ${styles.section}`}>
      <HeroBlobs />

      <div className={`${shared.wrap} ${styles.wrapInner}`}>
        <div className={styles.heroGrid}>
          <div>
            <h1
              ref={titleRef as React.RefObject<HTMLHeadingElement>}
              className={`${shared.reveal} ${titleVisible ? styles.revealed : ''} ${styles.heroTitle}`}
            >
              El puente hacia la{' '}
              <span className={shared.gradientText}>eficiencia inteligente</span>
            </h1>

            <p
              ref={subtitleRef as React.RefObject<HTMLParagraphElement>}
              className={`${shared.reveal} ${subtitleVisible ? styles.revealed : ''} ${styles.subtitle}`}
            >
              Diseñamos ecosistemas tecnológicos robustos combinando arquitectura de software
              e IA para optimizar procesos.
            </p>

            <div
              ref={ctaRef as React.RefObject<HTMLDivElement>}
              className={`${shared.reveal} ${ctaVisible ? styles.revealed : ''} ${styles.heroCta}`}
            >
              <Button href="#contacto" variant="primary">
                Solicita tu diagnóstico gratuito
              </Button>
              <Button href="#servicios" variant="secondary">
                Conoce nuestros servicios
              </Button>
            </div>

            <div className={styles.heroVisualResponsive}>
              <img
                src="/logos/logo-horizontal-full-primary.svg"
                alt="Addon.ai"
                className={styles.heroLogo}
              />
            </div>

            <div
              ref={statsRef as React.RefObject<HTMLDivElement>}
              className={`${shared.reveal} ${statsVisible ? styles.revealed : ''} ${styles.statsRow}`}
            >
              <div>
                <div ref={counter1} className={styles.statValue}>{d1}</div>
                <div className={styles.statLabel}>Optimización de procesos</div>
              </div>
              <div className={styles.statDivider} />
              <div>
                <div ref={counter2} className={styles.statValue}>{d2}</div>
                <div className={styles.statLabel}>Horas automatizadas / mes</div>
              </div>
              <div className={styles.statDivider} />
              <div>
                <div ref={counter3} className={styles.statValue}>{d3}</div>
                <div className={styles.statLabel}>Uptime garantizado</div>
              </div>
            </div>
          </div>

          <div
            ref={visualRef as React.RefObject<HTMLDivElement>}
            className={`${shared.reveal} ${visualVisible ? styles.revealed : ''} ${styles.heroVisual}`}
          >
            <div className={styles.heroVisualInner}>
              <div className={`float-logo ${styles.floatLogo}`}>
                <img
                  src="/logos/logo-horizontal-full-primary.svg"
                  alt="Addon.ai"
                  className={styles.heroLogo}
                />
              </div>
            </div>

            {/* Efficiency badge */}
            <div className={`${shared.liquidGlass} ${shared.cardHover} ${styles.floatBadge} ${styles.floatBadgeTop}`} data-glass="liquid">
              <div className={shared.refractLayer} />
              <div className={shared.glowAurora} />
              <div className={shared.glowCore} />
              <div className={shared.glowRim} />
              <div className={styles.badgeIconEmerald}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--emerald)" strokeWidth="2" strokeLinecap="round">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                  <polyline points="17 6 23 6 23 12" />
                </svg>
              </div>
              <div>
                <div className={styles.badgeLabel}>Eficiencia</div>
                <div className={styles.badgeValueEmerald}>+30%</div>
              </div>
            </div>

            {/* Uptime badge */}
            <div className={`${shared.liquidGlass} ${shared.cardHover} ${styles.floatBadge} ${styles.floatBadgeBottom}`} data-glass="liquid">
              <div className={shared.refractLayer} />
              <div className={shared.glowAurora} />
              <div className={shared.glowCore} />
              <div className={shared.glowRim} />
              <div className={styles.badgeIconCyan}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="2" strokeLinecap="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </div>
              <div>
                <div className={styles.badgeLabel}>Uptime</div>
                <div className={styles.badgeValueCyan}>99.5%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
