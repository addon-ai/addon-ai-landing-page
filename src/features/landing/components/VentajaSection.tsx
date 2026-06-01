import shared from '@/styles/shared.module.css'
import styles from './VentajaSection.module.css'
import { useScrollReveal } from '@/common/hooks/useScrollReveal'

export function VentajaSection() {
  const { ref: badgeRef, isVisible: badgeVisible } = useScrollReveal()
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal()
  const { ref: descRef, isVisible: descVisible } = useScrollReveal()

  return (
    <section className={styles.section}>
      <div className={shared.wrap}>
        <div className={`${shared.glassBisel} ${styles.card}`} data-glass="bisel">
          <div className={shared.refractLayer} />
          <div className={shared.glowAurora} />
          <div className={shared.glowCore} />
          <div className={shared.glowRim} />

          <div
            ref={badgeRef as React.RefObject<HTMLDivElement>}
            className={`${shared.reveal} ${shared.badge} ${styles.badge} ${shared.liquidGlassSubtle} ${badgeVisible ? styles.revealed : ''}`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--emerald)" strokeWidth="2" strokeLinecap="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            <span className={styles.badgeText}>Arquitectura + IA</span>
          </div>

          <h2
            ref={titleRef as React.RefObject<HTMLHeadingElement>}
            className={`${shared.reveal} ${titleVisible ? styles.revealed : ''} ${styles.title}`}
          >
            Ventaja Operativa <span className={shared.gradientTextAlt}>Sostenible</span>
          </h2>

          <p
            ref={descRef as React.RefObject<HTMLParagraphElement>}
            className={`${shared.reveal} ${descVisible ? styles.revealed : ''} ${styles.description}`}
          >
            Addon AI es el socio tecnológico estratégico integral que construye, despliega y mantiene
            ecosistemas digitales completos impulsados por IA. Arquitectamos soluciones de clase
            producción basadas en cloud computing.
          </p>
        </div>
      </div>
    </section>
  )
}
