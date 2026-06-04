import { useCallback } from 'react'
import { getLenis } from '@/lib/lenis'

export function useSmoothScroll() {
  const scrollToSection = useCallback((href: string) => {
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (!el) return

    const lenis = getLenis()
    if (lenis) {
      lenis.scrollTo(el, { offset: -80 })
    } else {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  return { scrollToSection }
}
