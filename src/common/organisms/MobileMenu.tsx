import { useMenuStore } from '@/features/landing/store/useMenuStore'
import { useCallback } from 'react'

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
        className={`menu-overlay ${isOpen ? 'open' : ''}`}
        onClick={handleClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          zIndex: 55,
          display: isOpen ? 'block' : 'none',
        }}
      />

      <div
        className={`liquid-glass-strong ${isOpen ? 'open' : ''}`}
        id="mobileMenu"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: 300,
          height: '100vh',
          zIndex: 60,
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
          padding: '80px 32px 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          borderRadius: 0,
        }}
      >
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            width: 40,
            height: 40,
            borderRadius: 12,
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(255,255,255,0.05)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text)',
          }}
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
            style={{ fontSize: 18, color: 'var(--text-secondary)', textDecoration: 'none' }}
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
