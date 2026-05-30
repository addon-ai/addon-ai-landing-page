export function Footer() {
  return (
    <footer style={{ padding: '64px 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="wrap">
        <div
          className="footer-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            gap: 48,
            marginBottom: 48,
          }}
        >
          <div>
            <div
              className="logo-wrap footer-logo"
              style={{ marginBottom: 20, display: 'inline-flex', alignItems: 'center', height: 'auto' }}
            >
              <img
                src="/logos/logo-icon-dark-compact.svg"
                alt="Addon.ai"
                className="logo-dark"
                style={{ height: 56, width: 'auto' }}
              />
              <img
                src="/logos/logo-icon-primary.svg"
                alt="Addon.ai"
                className="logo-light"
                style={{ height: 56, width: 'auto' }}
              />
            </div>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 20 }}>
              Arquitectura de software empresarial combinada con IA aplicada para optimizar procesos desde la raíz.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <a href="#" className="liquid-glass-subtle" style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', color: 'var(--text-secondary)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a href="#" className="liquid-glass-subtle" style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', color: 'var(--text-secondary)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Servicios</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {['Consultoría', 'Desarrollo', 'Data & Analytics', 'Managed Services'].map((item) => (
                <li key={item} style={{ marginBottom: 10 }}>
                  <a href="#servicios" style={{ fontSize: 14, color: 'var(--text-secondary)', textDecoration: 'none' }}>{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Sectores</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {['Finanzas', 'Salud', 'Comercial'].map((item) => (
                <li key={item} style={{ marginBottom: 10 }}>
                  <a href="#sectores" style={{ fontSize: 14, color: 'var(--text-secondary)', textDecoration: 'none' }}>{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Contacto</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: 10 }}><a href="mailto:jiliar.silgado@gmail.com" style={{ fontSize: 14, color: 'var(--text-secondary)', textDecoration: 'none' }}>jiliar.silgado@gmail.com</a></li>
              <li style={{ marginBottom: 10 }}><a href="tel:+573016733590" style={{ fontSize: 14, color: 'var(--text-secondary)', textDecoration: 'none' }}>+57 301 673 3590</a></li>
              <li style={{ marginBottom: 10 }}><span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Cartagena, Colombia</span></li>
            </ul>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 24, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
          <p style={{ fontSize: 12.5, color: 'var(--text-secondary)' }}>&copy; 2026 Addon.ai Enterprise. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
