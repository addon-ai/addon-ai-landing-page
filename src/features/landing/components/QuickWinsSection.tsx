import shared from '@/styles/shared.module.css'
import styles from './QuickWinsSection.module.css'
import { useScrollReveal } from '@/common/hooks/useScrollReveal'

export function QuickWinsSection() {
  const { ref: badgeRef, isVisible: badgeVisible } = useScrollReveal()
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal()
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal()

  return (
    <section className={styles.section}>
      <div className={shared.wrap}>
        <div className={styles.header}>
          <div ref={badgeRef as React.RefObject<HTMLDivElement>} className={`${shared.reveal} ${styles.badge} ${shared.liquidGlassSubtle} ${badgeVisible ? styles.revealed : ''}`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--emerald)" strokeWidth="2" strokeLinecap="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            <span style={{ color: 'var(--emerald)' }}>Quick Wins</span>
          </div>
          <h2 ref={titleRef as React.RefObject<HTMLHeadingElement>} className={`${shared.reveal} ${titleVisible ? styles.revealed : ''} ${styles.title}`}>Resultados <span className={shared.gradientTextAlt}>semanales</span></h2>
        </div>
        <div ref={gridRef as React.RefObject<HTMLDivElement>} className={`${shared.cols2} ${shared.reveal} ${gridVisible ? styles.revealed : ''}`} style={{ gap: 20 }}>
          <div className={`${shared.glassBisel} ${shared.cardHover} ${styles.card}`} data-glass="bisel">
            <div className={shared.refractLayer} /><div className={shared.glowAurora} /><div className={shared.glowCore} /><div className={shared.glowRim} />
            <div className={styles.cardContent}>
              <div className={`${styles.iconCircle} ${styles.iconEmerald}`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
              </div>
              <div>
                <div className={styles.cardLabel}>Inmediato</div>
                <div className={styles.cardTitle}>Diagnóstico de negocio</div>
              </div>
            </div>
            <p className={styles.cardDesc}>Identificación de 3 a 5 mejoras críticas de salud y deuda técnica.</p>
          </div>
          <div className={`${shared.glassBisel} ${shared.cardHover} ${styles.card}`} data-glass="bisel">
            <div className={shared.refractLayer} /><div className={shared.glowAurora} /><div className={shared.glowCore} /><div className={shared.glowRim} />
            <div className={styles.cardContent}>
              <div className={`${styles.iconCircle} ${styles.iconCyan}`}>
                <span className={styles.iconCircleNum}>2</span>
              </div>
              <div>
                <div className={styles.cardLabel}>Semanas</div>
                <div className={styles.cardTitle}>Propuesta tecnológica</div>
              </div>
            </div>
            <p className={styles.cardDesc}>Diagnóstico técnico y plan de acción de 90 días.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
