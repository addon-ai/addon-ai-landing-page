import { useEffect, useRef } from 'react'

interface BlobDef {
  xp: number
  yp: number
  r: number
  vx: number
  vy: number
  color: string
  base: number
  amp: number
}

const ORBIT_R = [0.06, 0.05, 0.07, 0.04]

export function HeroBlobs() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const blobs: BlobDef[] = [
      { xp: 0.72, yp: 0.38, r: 240, vx: 0.00018, vy: 0.00012, color: 'rgba(18,210,124,', base: 0.14, amp: 0.05 },
      { xp: 0.62, yp: 0.55, r: 190, vx: -0.00014, vy: 0.00016, color: 'rgba(6,182,212,', base: 0.10, amp: 0.04 },
      { xp: 0.80, yp: 0.60, r: 160, vx: 0.00020, vy: -0.00010, color: 'rgba(51,138,123,', base: 0.12, amp: 0.04 },
      { xp: 0.58, yp: 0.35, r: 140, vx: -0.00016, vy: -0.00014, color: 'rgba(34,197,94,', base: 0.10, amp: 0.04 },
    ]

    const angles = blobs.map(() => Math.random() * Math.PI * 2)
    let t = 0
    let animationId: number

    function resize() {
      canvas!.width = canvas!.offsetWidth
      canvas!.height = canvas!.offsetHeight
    }

    resize()
    window.addEventListener('resize', resize)

    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
      t += 0.004

      blobs.forEach((b, i) => {
        angles[i] += b.vx * 60

        const cx = (b.xp + Math.cos(angles[i] + i) * ORBIT_R[i]) * canvas!.width
        const cy = (b.yp + Math.sin(angles[i] * 0.7 + i) * ORBIT_R[i] * 0.8) * canvas!.height
        const pulsR = b.r * (1 + Math.sin(t + i * 1.3) * 0.08)
        const alpha = b.base + Math.sin(t * 0.8 + i * 0.9) * b.amp

        const g = ctx!.createRadialGradient(cx, cy, 0, cx, cy, pulsR)
        g.addColorStop(0, b.color + alpha + ')')
        g.addColorStop(0.5, b.color + (alpha * 0.5) + ')')
        g.addColorStop(1, b.color + '0)')

        ctx!.beginPath()
        ctx!.arc(cx, cy, pulsR, 0, Math.PI * 2)
        ctx!.fillStyle = g
        ctx!.fill()
      })

      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      id="hero-blobs"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}
