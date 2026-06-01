import { useMenuStore } from '@/features/landing/store/useMenuStore'
import { useCallback } from 'react'
import shared from '@/styles/shared.module.css'
import styles from './MobileMenu.module.css'

interface MobileMenuProps {
  onNavClick?: () => void
}

const NAV_LINKS = [
  { href: '#desafios', label: 'Desafíos' },
  { href: '#pilares', label: 'Pilares' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#sectores', label: 'Sectores' },
  { href: '#planes', label: 'Planes' },
  { href: '#casos', label: 'Casos' },
  { href: '#modelo', label: 'Modelo' },
] as const

export function MobileMenu({ onNavClick }: MobileMenuProps) {
  const { isOpen, close } = useMenuStore()

  const handleClose = useCallback(() => {
    close()
    onNavClick?.()
  }, [close, onNavClick])

  return (
    <>
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ''}`}
        onClick={handleClose}
      />

      <div
        className={`${shared.liquidGlassStrong} ${styles.menuContent} ${isOpen ? styles.menuOpen : ''}`}
        id="mobileMenu"
      >
        <button
          className={styles.closeBtn}
          onClick={handleClose}
          aria-label="Close"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={handleClose}
            className={styles.menuLink}
          >
            {link.label}
          </a>
        ))}

        <div style={{ paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <a
            href="#contacto"
            className="btn-primary"
            onClick={handleClose}
            style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}
          >
            <span>Solicita tu diagnóstico gratuito</span>
          </a>
        </div>
      </div>
    </>
  )
}
