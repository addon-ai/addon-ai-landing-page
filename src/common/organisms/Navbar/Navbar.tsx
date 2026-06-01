import { useThemeStore } from '@/features/landing/store/useThemeStore'
import { useMenuStore } from '@/features/landing/store/useMenuStore'
import { Button } from '@/common/atoms/Button'
import shared from '@/styles/shared.module.css'
import styles from './Navbar.module.css'

const NAV_LINKS = [
  { href: '#desafios', label: 'Desafíos' },
  { href: '#pilares', label: 'Pilares' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#sectores', label: 'Sectores' },
  { href: '#planes', label: 'Planes' },
  { href: '#casos', label: 'Casos' },
  { href: '#modelo', label: 'Modelo' },
] as const

export function Navbar() {
  const { mode, toggle } = useThemeStore()
  const { open } = useMenuStore()

  return (
    <nav className={styles.navGlass} data-nav="glass">
      <div className={`${shared.wrap} ${styles.navInner}`}>
        <div className={styles.navCenter}>
          {/* Desktop nav */}
          <div className={styles.desktopNav}>
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className={styles.navLink}>
                {link.label}
              </a>
            ))}
          </div>

          <div className={styles.navActions}>
            <Button href="#contacto" variant="primary" style={{ display: 'none' }} id="navCta">
              Solicita tu diagnóstico
            </Button>

            <button
              className={styles.themeBtn}
              onClick={toggle}
              aria-label="Toggle theme"
            >
              {mode === 'dark' ? '\u2600' : '\u263E'}
            </button>

            {/* Mobile menu toggle */}
            <button
              id="menuToggle"
              className={styles.mobileToggle}
              onClick={open}
              aria-label="Menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
