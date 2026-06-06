import shared from '@/styles/shared.module.css'
import styles from './CasosSection.module.css'
import { useScrollReveal } from '@/common/hooks/useScrollReveal'
import { CaseCard } from '@/common/molecules/CaseCard'

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
    <section id="casos" className={styles.section}>
      <div className={shared.wrap}>
        <div className={styles.header}>
          <div ref={badgeRef as React.RefObject<HTMLDivElement>} className={`${shared.reveal} ${shared.badge} ${styles.badge} ${shared.liquidGlassSubtle} ${badgeVisible ? styles.revealed : ''}`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="2" strokeLinecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            <span style={{ color: 'var(--cyan)' }}>Casos de Éxito</span>
          </div>
          <h2 className={`${shared.reveal} ${badgeVisible ? styles.revealed : ''} ${styles.title}`}>Resultados que <span className={shared.gradientText}>hablan solos</span></h2>
        </div>
        <div ref={gridRef as React.RefObject<HTMLDivElement>} className={`${shared.cols2} ${shared.reveal} ${gridVisible ? styles.revealed : ''}`} style={{ gap: 20 }}>
          {CASOS.map((c) => (
            <CaseCard
              key={c.title}
              icon={c.icon}
              title={c.title}
              desc={c.desc}
              iconBg={c.bg}
              cardClassName={styles.card}
              contentClassName={styles.cardContent}
              iconClassName={styles.casoIcon}
              titleClassName={styles.cardTitle}
              descClassName={styles.cardDesc}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
