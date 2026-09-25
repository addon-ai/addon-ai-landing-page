import { useScrollReveal } from '@/common/hooks/useScrollReveal'
import { HeroBlobs } from '@/common/organisms/HeroBlobs'
import shared from '@/styles/shared.module.css'
import styles from './SectoresSection.module.css'

const SECTORS = [
  {
    name: 'Finanzas',
    tag: 'SERVICIOS FINANCIEROS',
    img: '/img/trading.jpg',
    arch: 'Microservicios con API gateways y bases de datos segregadas.',
    result: 'Diseño de modelos fintech para tu negocio, basados en wallets tecnológicas.',
    color: 'var(--cyan)',
    iconGrad: 'linear-gradient(135deg, var(--emerald), var(--cyan))',
    tagBg: 'rgba(6,182,212,0.9)',
    align: 'left' as const,
  },
  {
    name: 'Calidad',
    tag: 'CALIDAD & CUMPLIMIENTO',
    img: '/img/pexels-merlin-11308974.jpg',
    arch: 'Integración con sistemas de gestión existentes y trazabilidad normativa.',
    result: 'Plataformas de gestión de calidad basadas en agentes de IA.',
    color: 'var(--emerald)',
    iconGrad: 'linear-gradient(135deg, var(--cyan), var(--blue))',
    tagBg: 'rgba(34,197,94,0.9)',
    align: 'right' as const,
  },
  {
    name: 'Logística',
    tag: 'LOGÍSTICA & SUPPLY CHAIN',
    img: '/img/ecomerce.jpg',
    arch: 'Orientada a eventos (event-driven) y serverless.',
    result: 'Plataforma tecnológica integrada WMS, OMS y TMS, orientada a resultados operativos.',
    color: 'var(--blue)',
    iconGrad: 'linear-gradient(135deg, var(--blue), var(--violet))',
    tagBg: 'rgba(59,130,246,0.9)',
    align: 'left' as const,
  },
]

export function SectoresSection() {
  const { ref: badgeRef, isVisible: badgeVisible } = useScrollReveal()
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal()
  const { ref: containerRef, isVisible: containerVisible } = useScrollReveal({ threshold: 0.05 })

  return (
    <section id="sectores" className={styles.section}>
      <HeroBlobs />

      <div className={`${shared.wrap} ${styles.content}`}>
        <div className={styles.header}>
          <div ref={badgeRef as React.RefObject<HTMLDivElement>} className={`${shared.reveal} ${shared.badge} ${shared.badgeGlassGradient} ${badgeVisible ? styles.revealed : ''} ${styles.badge}`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
            <span style={{ color: '#ffffff' }}>Soluciones por Sector</span>
          </div>
          <h2 ref={titleRef as React.RefObject<HTMLHeadingElement>} className={`${shared.reveal} ${titleVisible ? styles.revealed : ''} ${styles.title}`}>Verticales de <span className={shared.gradientText}>industria</span></h2>
        </div>

        <div ref={containerRef as React.RefObject<HTMLDivElement>} className={`${shared.reveal} ${containerVisible ? styles.revealed : ''} ${styles.container}`}>
          {SECTORS.map((s, i) => {
            const isImageLeft = i % 2 === 0
            const shadowColor = s.color === 'var(--cyan)' ? 'rgba(6,182,212,0.35)' : s.color === 'var(--emerald)' ? 'rgba(34,197,94,0.35)' : 'rgba(59,130,246,0.35)'
            return (
              <div key={s.name} className={`${shared.glassBisel} ${isImageLeft ? styles.panelLeftImage : styles.panelRightImage}`} data-glass="bisel">
                {isImageLeft && (
                  <div className={styles.imgWrap}>
                    <img src={s.img} alt={s.name} className={styles.imgFill} />
                    <div className={styles.imgOverlayLeft} />
                    <span className={styles.tagBadgeLeft} style={{ background: s.tagBg }}>{s.tag}</span>
                  </div>
                )}
                <div className={styles.panelContent}>
                  <div className={styles.panelHeader}>
                    <div className={styles.panelIconWrap} style={{ background: s.iconGrad, boxShadow: `0 12px 32px ${shadowColor}` }}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
                        {s.name === 'Finanzas' ? <><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></> : s.name === 'Calidad' ? <><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></> : <><path d="M1 3h15v13H1z" /><path d="M16 8h4l3 3v5h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></>}
                      </svg>
                    </div>
                    <div className={styles.panelHeaderText}>
                      <h3 className={styles.sectorName}>{s.name}</h3>
                      <span className={styles.subtitle} style={{ color: 'var(--cyan)' }}>Arquitectura</span>
                    </div>
                  </div>
                  <p className={`${styles.text} ${styles.archText}`}>{s.arch}</p>
                  <div>
                    <span className={styles.subtitle} style={{ color: 'var(--emerald)' }}>Resultado</span>
                    <p className={styles.textValue} style={{ color: 'var(--emerald)' }}>{s.result}</p>
                  </div>
                </div>
                {!isImageLeft && (
                  <div className={styles.imgWrap}>
                    <img src={s.img} alt={s.name} className={styles.imgFill} />
                    <div className={styles.imgOverlayRight} />
                    <span className={styles.tagBadgeRight} style={{ background: s.tagBg }}>{s.tag}</span>
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
