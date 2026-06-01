import { useScrollReveal } from '@/common/hooks/useScrollReveal'
import shared from '@/styles/shared.module.css'
import styles from './CompromisoSection.module.css'

export function CompromisoSection() {
  const { ref: cardRef, isVisible: cardVisible } = useScrollReveal()

  return (
    <section className={styles.section} style={{ backgroundImage: 'url(/img/pexels-marek-piwnicki-3907296-7430463.jpg)' }}>
      <div className={styles.overlay} />
      <div className={`${shared.wrap} ${styles.wrapContent}`}>
        <div className={styles.header}>
          <div className={`${shared.reveal} ${shared.revealed} ${shared.badge} ${shared.liquidGlassSubtle} ${styles.badge}`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5EEAD4" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            <span className={styles.badgeText}>Compromiso e Impacto</span>
          </div>
          <h2 className={`${shared.reveal} ${shared.revealed} ${styles.title}`}>Impacto en <span className={shared.gradientTextAlt}>ODS</span></h2>
        </div>
        <div ref={cardRef as React.RefObject<HTMLDivElement>} className={`${shared.glassBisel} ${shared.reveal} ${cardVisible ? styles.revealed : ''} ${styles.card}`} data-glass="bisel">
          <div className={shared.refractLayer} /><div className={shared.glowAurora} /><div className={shared.glowCore} /><div className={shared.glowRim} />
          {[
            { label: 'Eficiencia (ODS 9)', value: '+30%', width: '78%', gradient: 'linear-gradient(90deg, rgba(6,182,212,0.95), rgba(59,130,246,1))' },
            { label: 'Crecimiento (ODS 8)', value: '500+ horas', width: '65%', gradient: 'linear-gradient(90deg, rgba(34,197,94,0.95), rgba(16,185,129,1))' },
            { label: 'Sostenibilidad (ODS 12)', value: '-35% energía', width: '55%', gradient: 'linear-gradient(90deg, rgba(168,85,247,0.95), rgba(139,92,246,1))' },
          ].map((bar) => (
            <div key={bar.label} className={styles.barItem}>
              <div className={styles.barHeader}>
                <span className={styles.barLabel}>{bar.label}</span>
                <span className={styles.barValue}>{bar.value}</span>
              </div>
              <div className={styles.progressTrack}>
                <div className={styles.progressFill} style={{
                  width: cardVisible ? bar.width : '0%',
                  background: bar.gradient,
                  boxShadow: `0 0 16px ${bar.gradient.includes('rgba(6,182,212') ? 'rgba(6,182,212,0.45)' : bar.gradient.includes('rgba(34,197,94') ? 'rgba(34,197,94,0.4)' : 'rgba(168,85,247,0.4)'}`,
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
