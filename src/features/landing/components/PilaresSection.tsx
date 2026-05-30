import { useScrollReveal } from '@/common/hooks/useScrollReveal'

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
    <section id="pilares" className="pilares-section" style={{ padding: '140px 0', position: 'relative', isolation: 'isolate', overflow: 'hidden', background: '#0f172a' }}>
      <div className="wrap">
        <div className="text-center" style={{ marginBottom: 72 }}>
          <div
            ref={badgeRef as React.RefObject<HTMLDivElement>}
            className={`reveal badge liquid-glass-subtle ${badgeVisible ? 'active' : ''}`}
            style={{ marginBottom: 24, display: 'inline-flex', background: 'linear-gradient(135deg, rgba(168,85,247,0.25), rgba(59,130,246,0.2))' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--violet)" strokeWidth="2" strokeLinecap="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span style={{ color: 'var(--violet)' }}>Pilares de Especialización</span>
          </div>

          <h2
            ref={titleRef as React.RefObject<HTMLHeadingElement>}
            className={`reveal ${titleVisible ? 'active' : ''}`}
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}
          >
            Tres pilares, una <span className="gradient-text">visión integral</span>
          </h2>
        </div>

        <div
          ref={containerRef as React.RefObject<HTMLDivElement>}
          className={`reveal ${containerVisible ? 'active' : ''}`}
          style={{ display: 'flex', flexDirection: 'column', gap: 40 }}
        >
          {PILLARS.map((p) => {
            const isRight = p.align === 'right'

            return (
              <div
                key={p.num}
                style={{ position: 'relative', overflow: 'hidden', borderRadius: 32, height: 400 }}
              >
                <img
                  src={p.img}
                  alt={p.tag}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: p.gradient,
                  }}
                />

                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    [isRight ? 'right' : 'left']: 60,
                    transform: 'translateY(-50%)',
                    maxWidth: 480,
                    textAlign: isRight ? 'right' as const : 'left' as const,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 16,
                      marginBottom: 20,
                      flexDirection: isRight ? 'row-reverse' as const : 'row' as const,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: p.color,
                        background: p.bgColor,
                        padding: '8px 16px',
                        borderRadius: 8,
                      }}
                    >
                      {p.num}
                    </span>
                    <span
                      style={{
                        fontSize: 11,
                        textTransform: 'uppercase',
                        letterSpacing: '0.15em',
                        color: p.color,
                      }}
                    >
                      {p.tag}
                    </span>
                  </div>

                  <h3 style={{ fontSize: 36, fontWeight: 700, color: '#fff', marginBottom: 16, lineHeight: 1.2 }}>
                    {p.title}
                  </h3>

                  <p style={{ fontSize: 16, color: '#dde5ef', lineHeight: 1.7, marginBottom: 24 }}>
                    {p.desc}
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      gap: 12,
                      justifyContent: isRight ? 'flex-end' : 'flex-start',
                    }}
                  >
                    {p.chips.map((chip) => (
                      <span key={chip} className="ai-chip">
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
