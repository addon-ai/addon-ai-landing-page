import { useScrollReveal } from '@/common/hooks/useScrollReveal'

export function CompromisoSection() {
  const { ref: cardRef, isVisible: cardVisible } = useScrollReveal()

  return (
    <section className="compromiso-section" style={{ padding: '112px 0', position: 'relative', isolation: 'isolate', backgroundImage: 'url(/img/pexels-marek-piwnicki-3907296-7430463.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(5,10,20,0.78) 0%, rgba(5,10,20,0.68) 50%, rgba(5,10,20,0.82) 100%)', zIndex: 0, pointerEvents: 'none' }} />
      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
        <div className="text-center" style={{ marginBottom: 64 }}>
          <div className="reveal active badge liquid-glass-subtle" style={{ marginBottom: 24, display: 'inline-flex', background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.18)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5EEAD4" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            <span style={{ color: '#5EEAD4' }}>Compromiso e Impacto</span>
          </div>
          <h2 className="reveal active" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: '#FFFFFF', marginBottom: 16, textShadow: '0 2px 18px rgba(0,0,0,0.55)' }}>Impacto en <span className="gradient-text-alt">ODS</span></h2>
        </div>
        <div ref={cardRef as React.RefObject<HTMLDivElement>} className={`glass-bisel reveal ${cardVisible ? 'active' : ''}`} style={{ padding: 40, maxWidth: 700, margin: '0 auto', background: 'rgba(10,18,32,0.62) !important', backdropFilter: 'blur(28px) saturate(160%)', WebkitBackdropFilter: 'blur(28px) saturate(160%)', border: '1px solid rgba(255,255,255,0.14) !important', boxShadow: '0 24px 60px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)' }}>
          <div className="refract-layer" /><div className="glow-aurora" /><div className="glow-core" /><div className="glow-rim" />
          {[
            { label: 'Eficiencia (ODS 9)', value: '+30%', width: '78%', gradient: 'linear-gradient(90deg, rgba(6,182,212,0.95), rgba(59,130,246,1))' },
            { label: 'Crecimiento (ODS 8)', value: '500+ horas', width: '65%', gradient: 'linear-gradient(90deg, rgba(34,197,94,0.95), rgba(16,185,129,1))' },
            { label: 'Sostenibilidad (ODS 12)', value: '-35% energía', width: '55%', gradient: 'linear-gradient(90deg, rgba(168,85,247,0.95), rgba(139,92,246,1))' },
          ].map((bar) => (
            <div key={bar.label} style={{ marginBottom: 28 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 14, color: '#F1F5F9' }}>{bar.label}</span>
                <span style={{ fontSize: 13, color: '#CBD5E1' }}>{bar.value}</span>
              </div>
              <div className="progress-track" style={{ background: 'rgba(255,255,255,0.18)' }}>
                <div className="progress-fill" style={{ width: cardVisible ? bar.width : '0%', background: bar.gradient, boxShadow: `0 0 16px ${bar.gradient.includes('rgba(6,182,212') ? 'rgba(6,182,212,0.45)' : bar.gradient.includes('rgba(34,197,94') ? 'rgba(34,197,94,0.4)' : 'rgba(168,85,247,0.4)'}` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
