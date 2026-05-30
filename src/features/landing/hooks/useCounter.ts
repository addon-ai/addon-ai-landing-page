import { useEffect, useRef, useState } from 'react'

interface UseCounterOptions {
  target: number
  suffix?: string
  decimal?: boolean
  duration?: number
}

export function useCounter({ target, suffix = '', decimal = false, duration = 2000 }: UseCounterOptions) {
  const [display, setDisplay] = useState(decimal ? '0.0' : '0')
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || hasAnimated) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setHasAnimated(true)
          const startTime = performance.now()

          function animate(now: number) {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            const current = eased * target

            setDisplay((decimal ? current.toFixed(1) : Math.floor(current).toString()) + suffix)
            if (progress < 1) requestAnimationFrame(animate)
          }

          requestAnimationFrame(animate)
          observer.unobserve(el)
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, suffix, decimal, duration, hasAnimated])

  return { ref, display }
}
