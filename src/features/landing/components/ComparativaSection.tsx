import { useScrollReveal } from '@/common/hooks/useScrollReveal'

export function ComparativaSection() {
  const { ref: cardRef, isVisible: cardVisible } = useScrollReveal()

  return (
    <section style={{ padding: '112px 0' }}>
      <div className="wrap">
        <div className="text-center" style={{ marginBottom: 64 }}>
          <div className="reveal active badge liquid-glass-subtle" style={{ marginBottom: 24, display: 'inline-flex' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
            <span style={{ color: 'var(--cyan)' }}>Comparativa</span>
          </div>
          <h2 className="reveal active" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>Addon AI vs. <span className="gradient-text">Big Four</span></h2>
        </div>

        <div ref={cardRef as React.RefObject<HTMLDivElement>} className={`glass-bisel reveal ${cardVisible ? 'active' : ''}`} style={{ padding: 32, maxWidth: 800, margin: '0 auto' }}>
          <div className="refract-layer" /><div className="glow-aurora" /><div className="glow-core" /><div className="glow-rim" />
          <table className="compare-table">
            <thead>
              <tr>
                <th style={{ width: '30%' }}>Criterio</th>
                <th style={{ width: '35%', color: 'var(--cyan)' }}>Addon AI</th>
                <th style={{ width: '35%' }}>Big Four</th>
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
                  <td style={{ color: 'var(--text-secondary)' }}>{row.criterion}</td>
                  <td className="highlight">{row.addon}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{row.bigfour}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
