import { useEffect, useRef } from 'react'
import { animate } from 'animejs'
import { useScrollReveal } from '@/common/hooks/useScrollReveal'
import { useCounter } from '../hooks/useCounter'
import { HeroBlobs } from '@/common/organisms/HeroBlobs'
import { Button } from '@/common/atoms/Button'
import shared from '@/styles/shared.module.css'
import styles from './HeroSection.module.css'

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal()
  const { ref: subtitleRef, isVisible: subtitleVisible } = useScrollReveal()
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollReveal()
  const { ref: statsRef, isVisible: statsVisible } = useScrollReveal()
  const { ref: visualRef, isVisible: visualVisible } = useScrollReveal()

  const { ref: counter1, display: d1 } = useCounter({ target: 30, suffix: '%' })
  const { ref: counter2, display: d2 } = useCounter({ target: 500, suffix: '+' })
  const { ref: counter3, display: d3 } = useCounter({ target: 99.5, suffix: '%', decimal: true })

  useEffect(() => {
    const badges = sectionRef.current?.querySelectorAll<HTMLElement>('[data-animate="badge"]')
    if (!badges) return

    const handlers: { el: HTMLElement; enter: () => void; leave: () => void }[] = []

        badges.forEach((el: HTMLElement) => {
      // ── State machine: idle → entering → entered → (queued leave) → leaving → (queued enter) → idle ──
      type AnimState = 'idle' | 'entering' | 'entered' | 'leaving'
      let animState: AnimState = 'idle'
      let leaveQueued = false
      let enterQueued = false
      let pulseAnim: ReturnType<typeof animate> | null = null

      const performLeave = () => {
        animState = 'leaving'
        leaveQueued = false

        // Cancel pulse animation
        if (pulseAnim) {
          pulseAnim.cancel()
          pulseAnim = null
        }

        // Remove neon overlay
        el.querySelectorAll('.neon-overlay').forEach((o) => o.remove())

        // Restore original paths
        const svg = el.querySelector('svg')
        if (svg) {
          svg.querySelectorAll<SVGElement>('polyline, polygon, path').forEach((p) => {
            p.style.opacity = ''
            p.style.strokeDasharray = ''
            p.style.strokeDashoffset = ''
          })
        }

        // Reverse rotateY
        animate(el, {
          rotateY: [360, 0],
          scale: [1.4, 1],
          translateX: ['-10px', '0px'],
          duration: 600,
          ease: 'outQuad',
          onComplete: () => {
            animState = 'idle'
            // If enter was queued while leaving, fire it now
            if (enterQueued) {
              enterQueued = false
              enter()
            }
          },
        })
      }

      const enter = () => {
        // If cursor re-enters mid-animation, cancel any queued leave
        if (animState === 'entering') {
          leaveQueued = false
          return
        }

        // Don't restart if already fully entered
        if (animState === 'entered') return

        // If leave animation is still running, queue re-enter for when it finishes
        if (animState === 'leaving') {
          enterQueued = true
          return
        }

        animState = 'entering'
        leaveQueued = false
        enterQueued = false

        const iconWrap = el.querySelector('[class*="badgeIcon"]') as HTMLElement | null
        const svg = el.querySelector('svg')
        if (!svg || !iconWrap) return

        const isEmerald = el.querySelector('.badgeValueEmerald') !== null
        const neonColor = isEmerald ? '#4ade80' : '#22d3ee'
        const neonGlow = isEmerald ? '#86efac' : '#67e8f9'

        // --- 1. Position reference for absolute overlay ---
        iconWrap.style.position = 'relative'

        // --- 2. Clone SVG for neon overlay ---
        const glowSvg = svg.cloneNode(true) as SVGElement
        glowSvg.classList.add('neon-overlay')

        // Match the original SVG's exact position and size so neon strokes
        // align perfectly with the original (same viewBox → same scale).
        // Must use bottom‑up measurement because the parent has overflow:hidden
        // and we need the glow blur to stay within badge bounds.
        const svgRect = svg.getBoundingClientRect()
        const wrapRect = iconWrap.getBoundingClientRect()
        glowSvg.style.cssText = `
          position: absolute;
          left: ${svgRect.left - wrapRect.left}px;
          top: ${svgRect.top - wrapRect.top}px;
          width: ${svgRect.width}px;
          height: ${svgRect.height}px;
          opacity: 0;
          pointer-events: none;
          overflow: visible;
        `

        // --- 2a. SVG-native filter for clean glow (no CSS drop-shadow square clipping) ---
        const svgNs = 'http://www.w3.org/2000/svg'
        const filter = document.createElementNS(svgNs, 'filter')
        const filterId = `neon-f-${Date.now()}`
        filter.setAttribute('id', filterId)
        filter.setAttribute('x', '-20%')
        filter.setAttribute('y', '-20%')
        filter.setAttribute('width', '140%')
        filter.setAttribute('height', '140%')

        const blur1 = document.createElementNS(svgNs, 'feGaussianBlur')
        blur1.setAttribute('stdDeviation', '3')
        blur1.setAttribute('result', 'glow1')

        const blur2 = document.createElementNS(svgNs, 'feGaussianBlur')
        blur2.setAttribute('stdDeviation', '1.5')
        blur2.setAttribute('result', 'glow2')

        const merge = document.createElementNS(svgNs, 'feMerge')
        const mn1 = document.createElementNS(svgNs, 'feMergeNode')
        mn1.setAttribute('in', 'glow1')
        const mn2 = document.createElementNS(svgNs, 'feMergeNode')
        mn2.setAttribute('in', 'glow2')
        const mn3 = document.createElementNS(svgNs, 'feMergeNode')
        mn3.setAttribute('in', 'SourceGraphic')
        merge.appendChild(mn1)
        merge.appendChild(mn2)
        merge.appendChild(mn3)

        filter.appendChild(blur1)
        filter.appendChild(blur2)
        filter.appendChild(merge)
        glowSvg.prepend(filter)

        const glowPaths = glowSvg.querySelectorAll('polyline, polygon, path') as NodeListOf<SVGGeometryElement>
        glowPaths.forEach((p) => {
          p.setAttribute('stroke', neonColor)
          p.setAttribute('stroke-width', '1.8')
          p.setAttribute('filter', `url(#${filterId})`)
          p.style.filter = ''
          p.style.opacity = '0.9'
        })

        iconWrap.appendChild(glowSvg)

        // --- 3. Dim original paths → "lighter tone" base ---
        const origPaths = svg.querySelectorAll<SVGElement>('polyline, polygon, path')
        origPaths.forEach((p) => {
          p.style.opacity = '0.35'
        })

        // --- 4. Smooth rotateY ---
        animate(el, {
          rotateY: [0, 360],
          scale: [1, 1.4],
          translateX: ['0px', '-10px'],
          duration: 700,
          ease: 'outCirc',
        })

        // --- 5. Fade in neon overlay (overlaps tail of rotateY) ---
        animate(glowSvg, {
          opacity: [0, 1],
          duration: 400,
          delay: 300,
          ease: 'outQuad',
          onComplete: () => {
            // --- 7. Pulse brightness every ~2s after initial fade-in ---
            pulseAnim = animate(glowSvg, {
              opacity: [1, 0.6, 1],
              duration: 2000,
              loop: true,
              ease: 'easeInOutSine',
            })

            // Enter completed — resolve queued leave if any
            animState = 'entered'
            if (leaveQueued) {
              performLeave()
            }
          },
        })

        // --- 6. Draw neon stroke — starts before rotateY finishes ---
        glowPaths.forEach((path, i) => {
          const length = path.getTotalLength()
          path.style.strokeDasharray = `${length}`
          path.style.strokeDashoffset = `${length}`

          animate(path, {
            strokeDashoffset: [length, 0],
            duration: 700,
            delay: 350 + i * 80,
            ease: 'outCubic',
          })
        })
      }

      const leave = () => {
        // ── If enter animation is still running, queue leave instead of interrupting ──
        if (animState === 'entering') {
          leaveQueued = true
          return
        }

        // Only proceed if we're in entered state
        if (animState !== 'entered') return

        performLeave()
      }

      el.addEventListener('mouseenter', enter)
      el.addEventListener('mouseleave', leave)
      handlers.push({ el, enter, leave })
    })

    return () => {
      handlers.forEach(({ el, enter, leave }) => {
        el.removeEventListener('mouseenter', enter)
        el.removeEventListener('mouseleave', leave)
      })
    }
  }, [])

  return (
    <section ref={sectionRef} className={`min-h-screen flex items-center ${styles.section}`}>
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
            <div className={`${shared.liquidGlass} ${shared.cardHover} ${styles.floatBadge} ${styles.floatBadgeTop}`} data-glass="liquid" data-animate="badge">
              <div className={shared.refractLayer} />
              <div className={shared.glowAurora} />
              <div className={shared.glowCore} />
              <div className={shared.glowRim} />
              <div className={styles.badgeIconEmerald}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--emerald)" strokeWidth="2" strokeLinecap="round">
                  <polyline points="1 18 8.5 10.5 13.5 15.5 23 6" />
                  <polyline points="23 12 23 6 17 6" />
                </svg>
              </div>
              <div>
                <div className={styles.badgeLabel}>Eficiencia</div>
                <div className={styles.badgeValueEmerald}>+30%</div>
              </div>
            </div>

            {/* Uptime badge */}
            <div className={`${shared.liquidGlass} ${shared.cardHover} ${styles.floatBadge} ${styles.floatBadgeBottom}`} data-glass="liquid" data-animate="badge">
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
