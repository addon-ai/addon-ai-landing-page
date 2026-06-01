import shared from '@/styles/shared.module.css'
import styles from './ModeloSection.module.css'
import { useScrollReveal } from '@/common/hooks/useScrollReveal'

const STEPS = [
  { num: '01', title: 'Discovery', desc: 'Talleres de requerimientos y NFRs.', color: 'var(--cyan)', bg: 'rgba(6,182,212,0.12)',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg> },
  { num: '02', title: 'Desarrollo Ágil', desc: 'Entregas iterativas (Sprints).', color: 'var(--emerald)', bg: 'rgba(34,197,94,0.12)',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--emerald)" strokeWidth="2" strokeLinecap="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg> },
  { num: '03', title: 'Managed Services', desc: 'Monitoreo y alertas 24/7.', color: 'var(--blue)', bg: 'rgba(59,130,246,0.12)',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
  { num: '04', title: 'Transferencia', desc: 'Entrega de Runbooks y documentación técnica.', color: '#a855f7', bg: 'rgba(168,85,247,0.12)',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg> },
]

export function ModeloSection() {
  const { ref: badgeRef, isVisible: badgeVisible } = useScrollReveal()
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal()

  return (
    <section id="modelo" className={styles.section}>
      <div className={shared.wrap}>
        <div className={styles.header}>
          <div ref={badgeRef as React.RefObject<HTMLDivElement>} className={`${shared.reveal} ${styles.badge} ${shared.liquidGlassSubtle} ${badgeVisible ? styles.revealed : ''}`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="2" strokeLinecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            <span style={{ color: 'var(--cyan)' }}>Modelo de Trabajo</span>
          </div>
          <h2 className={`${shared.reveal} ${badgeVisible ? styles.revealed : ''} ${styles.title}`}>De la idea al <span className={shared.gradientText}>impacto</span></h2>
        </div>
        <div ref={gridRef as React.RefObject<HTMLDivElement>} className={`${shared.cols4} ${shared.reveal} ${gridVisible ? styles.revealed : ''}`}>
          {STEPS.map((s) => (
            <div key={s.num} className={`${shared.glassBisel} ${shared.cardHover} ${styles.card} liquid-card`}>
              <div className={shared.refractLayer} /><div className={shared.glowAurora} /><div className={shared.glowCore} /><div className={shared.glowRim} />
              <div className={styles.stepNumber} style={{ color: s.color }}>{s.num}</div>
              <div className={styles.stepIconWrap} style={{ background: s.bg }}>{s.icon}</div>
              <h3 className={styles.stepTitle}>{s.title}</h3>
              <p className={styles.stepDesc}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
