import { useScrollReveal } from '@/common/hooks/useScrollReveal'
import shared from '@/styles/shared.module.css'
import styles from './PlanesSection.module.css'

export function PlanesSection() {
  const { ref: badgeRef, isVisible: badgeVisible } = useScrollReveal()

  return (
    <section id="planes" className={styles.section}>
      <div className={shared.wrap}>
        <div className={styles.header}>
          <div ref={badgeRef as React.RefObject<HTMLDivElement>} className={`${shared.reveal} ${shared.badge} ${shared.liquidGlassSubtle} ${badgeVisible ? styles.revealed : ''} ${styles.badge}`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="2" strokeLinecap="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
            <span style={{ color: 'var(--cyan)' }}>Modelos de Compromiso</span>
          </div>
          <h2 className={`${shared.reveal} ${badgeVisible ? styles.revealed : ''} ${styles.title}`}>Planes que escalan <span className={shared.gradientText}>contigo</span></h2>
        </div>

        <div className={`${shared.cols3} ${styles.grid}`}>
          {[
            { phase: 'Fase 1', name: 'Surgical Strike', price: '$15k – $50k', desc: 'MVP de 4 semanas, Roadmap y Dashboard ROI.', features: ['MVP en 4 semanas', 'Roadmap estratégico', 'Dashboard ROI'], popular: false },
            { phase: 'Fase 2', name: 'PLG Híbrido', price: '$500 – $30k', desc: 'Herramientas Self-Service y Consultoría de Escalabilidad.', features: ['Herramientas Self-Service', 'Consultoría de escalabilidad'], popular: true },
            { phase: 'Fase 3', name: 'Managed Partner', price: '$5k – $50k/mes', desc: 'SRE team extension, co-gestión y SLA contractual.', features: ['SRE team extension', 'Co-gestión', 'SLA contractual'], popular: false },
          ].map((plan, i) => (
            <div key={plan.name} className={`${shared.glassBisel} ${shared.cardHover} ${shared.reveal} ${badgeVisible ? styles.revealed : ''} ${styles.planCard}`} data-glass="bisel" style={plan.popular ? { border: '1px solid rgba(6,182,212,0.3)' } : {}}>
              <div className={shared.refractLayer} /><div className={shared.glowAurora} /><div className={shared.glowCore} /><div className={shared.glowRim} />
              {plan.popular && <div className={shared.popularBadge}>Popular</div>}
              <div className={styles.planPhase}>{plan.phase}</div>
              <h3 className={styles.planName}>{plan.name}</h3>
              <div className={styles.planPrice}>{plan.price}</div>
              <p className={styles.planDesc}>{plan.desc}</p>
              <ul className={styles.featureList}>
                {plan.features.map((f) => (
                  <li key={f} className={styles.featureItem}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={i === 0 ? 'var(--cyan)' : i === 1 ? 'var(--emerald)' : 'var(--blue)'} strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
