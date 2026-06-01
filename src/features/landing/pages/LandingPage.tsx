import { NeuralCanvas } from '@/common/organisms/NeuralCanvas'
import { Navbar } from '@/common/organisms/Navbar'
import { MobileMenu } from '@/common/organisms/MobileMenu'
import { Footer } from '@/common/organisms/Footer'
import { HeroSection } from '../components/HeroSection'
import { DesafiosSection } from '../components/DesafiosSection'
import { VentajaSection } from '../components/VentajaSection'
import { PilaresSection } from '../components/PilaresSection'
import { QuickWinsSection } from '../components/QuickWinsSection'
import { ServiciosSection } from '../components/ServiciosSection'
import { SectoresSection } from '../components/SectoresSection'
import { CasosSection } from '../components/CasosSection'
import { ComparativaSection } from '../components/ComparativaSection'
import { PlanesSection } from '../components/PlanesSection'
import { CompromisoSection } from '../components/CompromisoSection'
import { ModeloSection } from '../components/ModeloSection'
import { ContactoSection } from '../components/ContactoSection'
import { useEffect } from 'react'
import { useThemeStore } from '../store/useThemeStore'

export default function LandingPage() {
  const { setMode } = useThemeStore()

  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'dark' | 'light' | null
    setMode(saved || 'dark')
  }, [setMode])

  useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector('[data-nav="glass"]') as HTMLElement | null
      const navCta = document.getElementById('navCta') as HTMLElement | null
      if (!nav) return
      const isLight = document.documentElement.getAttribute('data-theme') === 'light'

      if (window.scrollY > 50) {
        nav.style.background = isLight ? '#FFFFFF' : 'rgba(5,10,20,0.85)'
        if (navCta) navCta.style.display = 'inline-block'
      } else {
        nav.style.background = isLight ? '#FFFFFF' : 'rgba(5,10,20,0.6)'
        if (navCta) navCta.style.display = 'none'
      }
    }

    const handleResize = () => {
      const navCta = document.getElementById('navCta') as HTMLElement | null
      if (window.innerWidth <= 768) {
        if (navCta) navCta.style.display = 'none'
      } else {
        if (window.scrollY > 50 && navCta) navCta.style.display = 'inline-block'
      }
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)

    // Trigger once on mount
    handleResize()

    // Refraction + glow effect on glass elements
    document.querySelectorAll('[data-glass]').forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect()
        const me = e as MouseEvent
        const x = ((me.clientX - rect.left) / rect.width * 100).toFixed(1)
        const y = ((me.clientY - rect.top) / rect.height * 100).toFixed(1)
        const rx = el.querySelector('.refract-layer, [class*="refract"]') as HTMLElement | null
        if (rx) {
          rx.style.setProperty('--rx', x + '%')
          rx.style.setProperty('--ry', y + '%')
        }
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const angle = ((Math.atan2(me.clientY - cy, me.clientX - cx) * 180 / Math.PI + 90 + 360) % 360).toFixed(1)
        ;(el as HTMLElement).style.setProperty('--angle', angle + 'deg')
        ;(el as HTMLElement).style.setProperty('--gx', x + '%')
        ;(el as HTMLElement).style.setProperty('--gy', y + '%')
      })
      el.addEventListener('mouseleave', () => {
        const rx = el.querySelector('.refract-layer, [class*="refract"]') as HTMLElement | null
        if (rx) {
          rx.style.removeProperty('--rx')
          rx.style.removeProperty('--ry')
        }
        ;(el as HTMLElement).style.removeProperty('--angle')
        ;(el as HTMLElement).style.removeProperty('--gx')
        ;(el as HTMLElement).style.removeProperty('--gy')
      })
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      <NeuralCanvas />
      <Navbar />
      <MobileMenu />
      <main>
        <HeroSection />
        <DesafiosSection />
        <VentajaSection />
        <PilaresSection />
        <QuickWinsSection />
        <ServiciosSection />
        <SectoresSection />
        <CasosSection />
        <ComparativaSection />
        <PlanesSection />
        <CompromisoSection />
        <ModeloSection />
        <ContactoSection />
      </main>
      <Footer />
    </>
  )
}
