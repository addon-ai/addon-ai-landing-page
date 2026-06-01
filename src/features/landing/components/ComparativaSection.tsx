import { useScrollReveal } from '@/common/hooks/useScrollReveal'
import shared from '@/styles/shared.module.css'
import styles from './ComparativaSection.module.css'

export function ComparativaSection() {
  const { ref: cardRef, isVisible: cardVisible } = useScrollReveal()

  return (
    <section className={styles.section}>
      <div className={shared.wrap}>
        <div className={styles.header}>
          <div className={`${shared.reveal} ${shared.revealed} ${shared.badge} ${shared.liquidGlassSubtle} ${styles.badge}`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
            <span style={{ color: 'var(--cyan)' }}>Comparativa</span>
          </div>
          <h2 className={`${shared.reveal} ${shared.revealed} ${styles.title}`}>Addon AI vs. <span className={shared.gradientText}>Big Four</span></h2>
        </div>

        <div ref={cardRef as React.RefObject<HTMLDivElement>} className={`${shared.glassBisel} ${shared.reveal} ${cardVisible ? styles.revealed : ''} ${styles.card}`} data-glass="bisel">
          <div className={shared.refractLayer} /><div className={shared.glowAurora} /><div className={shared.glowCore} /><div className={shared.glowRim} />
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.colWidth30}>Criterio</th>
                <th className={styles.colWidth35}>Addon AI</th>
                <th className={styles.colWidth35}>Big Four</th>
              </tr>
            </thead>
            <tbody>
              {[
                { criterion: 'Tiempo de respuesta', addon: 'Días', bigfour: 'Meses' },
                { criterion: 'Costo de proyecto', addon: '$15-50k', bigfour: '$200k+' },
                { criterion: 'Especialización IA', addon: 'Core business', bigfour: 'Una práctica más' },
                { criterion: 'Arquitectura', addon: 'Build + Operate', bigfour: 'Solo consultoría' },
              ].map((row) => (
                <tr key={row.criterion}>
                  <td className={styles.cellMuted}>{row.criterion}</td>
                  <td className={styles.highlight}>{row.addon}</td>
                  <td className={styles.cellMuted}>{row.bigfour}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
