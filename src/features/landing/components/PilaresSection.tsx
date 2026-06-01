import { useScrollReveal } from '@/common/hooks/useScrollReveal'
import shared from '@/styles/shared.module.css'
import styles from './PilaresSection.module.css'

const PILLARS = [
  {
    num: '01',
    tag: 'Software & Modernización',
    title: 'Arquitectura cloud-native',
    desc: 'Microservicios seguros, APIs, CI/CD automatizadas y despliegue continuo.',
    chips: ['DevSecOps', 'Kubernetes'],
    color: 'var(--cyan)',
    bgColor: 'rgba(6,182,212,0.2)',
    img: '/img/pexels-googledeepmind-25626428.jpg',
    align: 'left' as const,
    gradient: 'linear-gradient(90deg, rgba(5,10,20,0.92) 0%, rgba(5,10,20,0.6) 40%, transparent 70%)',
  },
  {
    num: '02',
    tag: 'Data & MLOps',
    title: 'Ingeniería de datos',
    desc: 'Lakehouse, pipelines de alto flujo y modelos predictivos en producción.',
    chips: ['Spark', 'MLflow'],
    color: 'var(--emerald)',
    bgColor: 'rgba(34,197,94,0.2)',
    img: '/img/binario.jpg',
    align: 'right' as const,
    gradient: 'linear-gradient(270deg, rgba(5,10,20,0.92) 0%, rgba(5,10,20,0.6) 40%, transparent 70%)',
  },
  {
    num: '03',
    tag: 'AI Solutions',
    title: 'Agentes inteligentes',
    desc: 'Agentes conversacionales, detección de fraude y diagnóstico asistido por IA.',
    chips: ['NLP', 'LLMs'],
    color: '#66e8ff',
    bgColor: 'rgba(113,231,255,0.3)',
    img: '/img/pexels-googledeepmind-18069816.jpg',
    align: 'left' as const,
    gradient: 'linear-gradient(90deg, rgba(5,10,20,0.92) 0%, rgba(5,10,20,0.6) 40%, transparent 70%)',
  },
]

export function PilaresSection() {
  const { ref: badgeRef, isVisible: badgeVisible } = useScrollReveal()
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal()
  const { ref: containerRef, isVisible: containerVisible } = useScrollReveal({ threshold: 0.05 })

  return (
    <section id="pilares" className={styles.section}>
      <div className={shared.wrap}>
        <div className={styles.header}>
          <div
            ref={badgeRef as React.RefObject<HTMLDivElement>}
            className={`${shared.reveal} ${shared.badge} ${shared.liquidGlassSubtle} ${badgeVisible ? styles.revealed : ''} ${styles.badge}`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--violet)" strokeWidth="2" strokeLinecap="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span style={{ color: 'var(--violet)' }}>Pilares de Especialización</span>
          </div>

          <h2
            ref={titleRef as React.RefObject<HTMLHeadingElement>}
            className={`${shared.reveal} ${titleVisible ? styles.revealed : ''} ${styles.title}`}
          >
            Tres pilares, una <span className={shared.gradientText}>visión integral</span>
          </h2>
        </div>

        <div
          ref={containerRef as React.RefObject<HTMLDivElement>}
          className={`${shared.reveal} ${containerVisible ? styles.revealed : ''} ${styles.container}`}
        >
          {PILLARS.map((p) => {
            const isRight = p.align === 'right'

            return (
              <div key={p.num} className={styles.pilarCard}>
                <img src={p.img} alt={p.tag} className={styles.pilarImage} />
                <div className={styles.pilarOverlay} style={{ background: p.gradient }} />

                <div className={isRight ? styles.contentRight : styles.contentLeft}>
                  <div className={isRight ? styles.tagRowRight : styles.tagRow}>
                    <span
                      className={styles.numBadge}
                      style={{ color: p.color, background: p.bgColor }}
                    >
                      {p.num}
                    </span>
                    <span className={styles.tagText} style={{ color: p.color }}>
                      {p.tag}
                    </span>
                  </div>

                  <h3 className={styles.pilarTitle}>{p.title}</h3>
                  <p className={styles.pilarDesc}>{p.desc}</p>

                  <div className={isRight ? styles.chipWrapRight : styles.chipWrap}>
                    {p.chips.map((chip) => (
                      <span key={chip} className={shared.aiChip}>
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
