import { useThemeStore } from '@/features/landing/store/useThemeStore'
import { useMenuStore } from '@/features/landing/store/useMenuStore'
import { Button } from '@/common/atoms/Button'

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
    <nav className="nav-glass">
      <div
        className="wrap"
        style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            gap: 32,
            paddingRight: 40,
          }}
        >
          {/* Desktop nav */}
          <div
            className="desktop-nav"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Button href="#contacto" variant="primary" style={{ display: 'none' }} id="navCta">
              Solicita tu diagnóstico
            </Button>

            <button
              className="theme-btn"
              onClick={toggle}
              aria-label="Toggle theme"
            >
              {mode === 'dark' ? '\u263E' : '\u2600'}
            </button>

            {/* Mobile menu toggle */}
            <button
              id="menuToggle"
              onClick={open}
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                cursor: 'pointer',
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text)',
              }}
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
