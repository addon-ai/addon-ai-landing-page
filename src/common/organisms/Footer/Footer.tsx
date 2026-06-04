import shared from '@/styles/shared.module.css'
import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={shared.wrap}>
        <div className={styles.footerGrid}>
          
            <div className={styles.footerLogo}>
              <img
                src="/logos/logo-vertical-green-tagline.svg"
                alt="Addon.ai"
                className={styles.logoDark}
              />
              <img
                src="/logos/logo-vertical-primary.svg"
                alt="Addon.ai"
                className={styles.logoLight}
              />
              <div className={styles.textAndSocials}>


            <p className={styles.description}>
              Arquitectura de software empresarial combinada con IA aplicada para optimizar procesos desde la raíz.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <a href="#" className={`${shared.liquidGlassSubtle} ${styles.socialIcon}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a href="#" className={`${shared.liquidGlassSubtle} ${styles.socialIcon}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              </a>
            </div>
          
            </div>
              </div>

          <div>
            <h4 className={styles.columnTitle}>Servicios</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {['Consultoría', 'Desarrollo', 'Data & Analytics', 'Managed Services'].map((item) => (
                <li key={item} style={{ marginBottom: 10 }}>
                  <a href="#servicios" className={styles.columnLink}>{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={styles.columnTitle}>Sectores</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {['Finanzas', 'Salud', 'Comercial'].map((item) => (
                <li key={item} style={{ marginBottom: 10 }}>
                  <a href="#sectores" className={styles.columnLink}>{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={styles.columnTitle}>Contacto</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: 10 }}><a href="mailto:jiliar.silgado@gmail.com" className={styles.columnLink}>jiliar.silgado@gmail.com</a></li>
              <li style={{ marginBottom: 10 }}><a href="tel:+573016733590" className={styles.columnLink}>+57 301 673 3590</a></li>
              <li style={{ marginBottom: 10 }}><span className={styles.columnLink}>Cartagena, Colombia</span></li>
            </ul>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <p className={styles.copyright}>&copy; 2026 Addon.ai Enterprise. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
