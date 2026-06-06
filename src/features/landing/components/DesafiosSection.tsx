import { useScrollReveal } from '@/common/hooks/useScrollReveal'
import { useThemeStore } from '../store/useThemeStore'
import { ChallengeCard } from '@/common/molecules/ChallengeCard'
import shared from '@/styles/shared.module.css'
import styles from './DesafiosSection.module.css'

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
    <section id="desafios" className={styles.section}>
      <div
        className={styles.desafiosBg}
        style={{
          backgroundImage: mode === 'light' ? "url('/img/desafíos del mercado-light.jpg')" : "url('/img/pexels-rostislav-5307735.jpg')",
        }}
      />
      <div className={styles.desafiosOverlay} />

      <div className={`${shared.wrap} ${styles.content}`}>
        <div className={styles.header}>
          <div
            ref={badgeRef as React.RefObject<HTMLDivElement>}
            className={`${shared.reveal} ${shared.badge} ${shared.liquidGlassSubtle} ${badgeVisible ? styles.revealed : ''} ${styles.badge}`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span className={styles.badgeText}>Desafíos del Mercado</span>
          </div>

          <h2
            ref={titleRef as React.RefObject<HTMLHeadingElement>}
            className={`${shared.reveal} ${titleVisible ? styles.revealed : ''} ${styles.title}`}
          >
            ¿Por qué las empresas no logran{' '}
            <span className={shared.gradientText}>escalar su tecnología</span>?
          </h2>
        </div>

        <div
          ref={gridRef as React.RefObject<HTMLDivElement>}
          className={`${shared.cols2} ${shared.reveal} ${gridVisible ? styles.revealed : ''}`}
        >
          {CHALLENGES.map((c) => (
            <ChallengeCard
              key={c.title}
              icon={c.icon}
              title={c.title}
              desc={c.desc}
              iconBg={`${c.color}33`}
              cardClassName={styles.card}
              iconWrapClassName={styles.iconWrap}
              titleClassName={styles.cardTitle}
              descClassName={styles.cardDesc}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
