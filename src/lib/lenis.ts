import Lenis from 'lenis'

let lenisInstance: Lenis | null = null

export function startLenis(): Lenis {
  const lenis = new Lenis({ autoRaf: true })
  lenisInstance = lenis
  return lenis
}

export function getLenis(): Lenis | null {
  return lenisInstance
}
