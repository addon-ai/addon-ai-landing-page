import { useScrollReveal } from '@/common/hooks/useScrollReveal'
import shared from '@/styles/shared.module.css'
import styles from './ServiciosSection.module.css'

const SERVICES = [
  { title: 'Consultoría Estratégica', desc: 'Diagnóstico y hoja de ruta', tag: 'Discovery', icon: '🔍', color: 'var(--cyan)', bg: 'rgba(6,182,212,0.12)' },
  { title: 'Desarrollo a Medida', desc: 'Microservicios, APIs y agentes de IA', tag: 'Build', icon: '🔧', color: 'var(--emerald)', bg: 'rgba(34,197,94,0.12)' },
  { title: 'Data & Analytics', desc: 'Ingeniería de datos y dashboards interactivos', tag: 'Analyze', icon: '📊', color: 'var(--blue)', bg: 'rgba(59,130,246,0.12)' },
  { title: 'Managed Services', desc: 'Monitoreo 24/7 y SLA garantizado', tag: 'Operate', icon: '🛡️', color: '#a855f7', bg: 'rgba(168,85,247,0.12)' },
]

const SVC_ICONS: Record<string, JSX.Element> = {
  '🔍': <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>,
  '🔧': <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--emerald)" strokeWidth="2" strokeLinecap="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
  '📊': <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>,
  '🛡️': <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
}

export function ServiciosSection() {
  const { ref: badgeRef, isVisible: badgeVisible } = useScrollReveal()
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal()
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal()

  return (
    <section id="servicios" className={styles.section}>
      <div className={shared.wrap}>
        <div className={styles.header}>
          <div ref={badgeRef as React.RefObject<HTMLDivElement>} className={`${shared.reveal} ${shared.badge} ${shared.liquidGlassSubtle} ${badgeVisible ? styles.revealed : ''} ${styles.badge}`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="2" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
            <span style={{ color: 'var(--cyan)' }}>Paquetes de Servicios</span>
          </div>
          <h2 ref={titleRef as React.RefObject<HTMLHeadingElement>} className={`${shared.reveal} ${titleVisible ? styles.revealed : ''} ${styles.title}`}>Soluciones a <span className={shared.gradientText}>medida</span></h2>
        </div>
        <div ref={gridRef as React.RefObject<HTMLDivElement>} className={`${shared.cols4} ${shared.reveal} ${gridVisible ? styles.revealed : ''}`}>
          {SERVICES.map((s) => (
            <div key={s.title} className={`${shared.glassBisel} ${shared.cardHover} ${shared.liquidCard} ${styles.card}`} data-glass="bisel">
              <div className={shared.refractLayer} /><div className={shared.glowAurora} /><div className={shared.glowCore} /><div className={shared.glowRim} />
              <div className={styles.iconWrap} style={{ background: s.bg }}>
                {SVC_ICONS[s.icon]}
              </div>
              <h3 className={styles.cardTitle}>{s.title}</h3>
              <p className={styles.cardDesc}>{s.desc}</p>
              <div className={`${shared.liquidGlassSubtle} ${styles.tag}`} style={{ color: s.color }}>{s.tag}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
