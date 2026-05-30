import { useEffect, useRef } from 'react'
import { useThemeStore } from '@/features/landing/store/useThemeStore'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  pulse: number
  pulseSpeed: number
}

interface GraphEdge {
  x1: number
  y1: number
  x2: number
  y2: number
  progress: number
  phase: 'draw' | 'hold' | 'fade'
  holdTimer: number
  speed: number
  alpha: number
  maxAlpha: number
  isDark: boolean
}

const NODE_COUNT = 60
const CONNECTION_DIST = 150
const NODE_RADIUS = 2
const MOUSE_INFLUENCE_RADIUS = 200
const GRID_STEP = 60
const GRAPH_DIAG_STEPS: [number, number][] = [
  [-2, -2], [-2, -1], [-2, 2],
  [-1, -2], [-1, -1], [-1, 1], [-1, 2],
  [1, -2], [1, -1], [1, 1], [1, 2],
  [2, -2], [2, -1], [2, 1], [2, 2],
]

export function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mode = useThemeStore((s) => s.mode)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let nodes: Node[] = []
    let graphEdges: GraphEdge[] = []
    let lastHoveredDot: string | null = null
    const mouse = { x: -1000, y: -1000 }
    let animationId: number

    function resize() {
      canvas!.width = window.innerWidth
      canvas!.height = window.innerHeight
    }

    function initNodes() {
      nodes = []
      for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
          x: Math.random() * canvas!.width,
          y: Math.random() * canvas!.height,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          radius: NODE_RADIUS + Math.random() * 1.5,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.005 + Math.random() * 0.01,
        })
      }
    }

    function getNearestGridDot(mx: number, my: number) {
      const gx = Math.round(mx / GRID_STEP) * GRID_STEP
      const gy = Math.round(my / GRID_STEP) * GRID_STEP
      const snappedX = Math.max(GRID_STEP, Math.min(Math.floor(canvas!.width / GRID_STEP) * GRID_STEP, gx))
      const snappedY = Math.max(GRID_STEP, Math.min(Math.floor(canvas!.height / GRID_STEP) * GRID_STEP, gy))
      return { x: snappedX, y: snappedY }
    }

    function spawnGraphEdges(dotX: number, dotY: number) {
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light'
      const shuffled = [...GRAPH_DIAG_STEPS].sort(() => Math.random() - 0.5)
      const selected = shuffled.slice(0, 3)
      for (const [dx, dy] of selected) {
        const tx = dotX + dx * GRID_STEP
        const ty = dotY + dy * GRID_STEP
        if (tx < 0 || tx > canvas!.width || ty < 0 || ty > canvas!.height) continue
        graphEdges.push({
          x1: dotX, y1: dotY,
          x2: tx, y2: ty,
          progress: 0,
          phase: 'draw' as const,
          holdTimer: 0,
          speed: 0.018 + Math.random() * 0.022,
          alpha: 0,
          maxAlpha: 0.18 + Math.random() * 0.18,
          isDark,
        })
      }
      if (graphEdges.length > 60) graphEdges = graphEdges.slice(-60)
    }

    function drawGrid() {
      ctx!.save()
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light'
      ctx!.strokeStyle = isDark ? 'rgba(0,212,255,0.04)' : 'rgba(0,100,200,0.06)'
      ctx!.lineWidth = 0.5
      for (let x = 0; x < canvas!.width; x += GRID_STEP) {
        ctx!.beginPath()
        ctx!.moveTo(x + 0.5, 0)
        ctx!.lineTo(x + 0.5, canvas!.height)
        ctx!.stroke()
      }
      for (let y = 0; y < canvas!.height; y += GRID_STEP) {
        ctx!.beginPath()
        ctx!.moveTo(0, y + 0.5)
        ctx!.lineTo(canvas!.width, y + 0.5)
        ctx!.stroke()
      }
      ctx!.restore()
    }

    function drawGridDots() {
      ctx!.save()
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light'
      for (let x = GRID_STEP; x < canvas!.width; x += GRID_STEP) {
        for (let y = GRID_STEP; y < canvas!.height; y += GRID_STEP) {
          const dist = Math.hypot(mouse.x - x, mouse.y - y)
          const glow = Math.max(0, 1 - dist / MOUSE_INFLUENCE_RADIUS)
          const alpha = 0.06 + glow * 0.3
          const r = 1 + glow * 2
          ctx!.beginPath()
          ctx!.arc(x, y, r, 0, Math.PI * 2)
          ctx!.fillStyle = isDark ? `rgba(0,212,255,${alpha})` : `rgba(0,100,200,${alpha})`
          ctx!.fill()
        }
      }
      ctx!.restore()
    }

    function drawGraphEdges() {
      ctx!.save()
      const toRemove: number[] = []
      for (let i = 0; i < graphEdges.length; i++) {
        const e = graphEdges[i]
        const color = e.isDark ? '0,212,255' : '0,100,200'

        if (e.phase === 'draw') {
          e.progress += e.speed
          e.alpha = Math.min(e.maxAlpha, e.alpha + 0.015)
          if (e.progress >= 1) {
            e.progress = 1
            e.phase = 'hold'
            e.holdTimer = 18 + Math.floor(Math.random() * 24)
          }
        } else if (e.phase === 'hold') {
          e.holdTimer--
          if (e.holdTimer <= 0) e.phase = 'fade'
        } else if (e.phase === 'fade') {
          e.alpha -= 0.012
          if (e.alpha <= 0) {
            toRemove.push(i)
            continue
          }
        }

        const cx = e.x1 + (e.x2 - e.x1) * e.progress
        const cy = e.y1 + (e.y2 - e.y1) * e.progress
        const grad = ctx!.createLinearGradient(e.x1, e.y1, cx, cy)
        grad.addColorStop(0, `rgba(${color},${e.alpha * 0.3})`)
        grad.addColorStop(0.5, `rgba(${color},${e.alpha})`)
        grad.addColorStop(1, `rgba(${color},${e.alpha * 0.6})`)

        ctx!.beginPath()
        ctx!.moveTo(e.x1, e.y1)
        ctx!.lineTo(cx, cy)
        ctx!.strokeStyle = grad
        ctx!.lineWidth = 0.7
        ctx!.stroke()

        if (e.phase === 'draw') {
          ctx!.beginPath()
          ctx!.arc(cx, cy, 1.5, 0, Math.PI * 2)
          ctx!.fillStyle = `rgba(${color},${e.alpha * 1.4})`
          ctx!.fill()
        } else {
          ctx!.beginPath()
          ctx!.arc(e.x2, e.y2, 1.8, 0, Math.PI * 2)
          ctx!.fillStyle = `rgba(${color},${e.alpha * 1.2})`
          ctx!.fill()
        }
      }
      for (let i = toRemove.length - 1; i >= 0; i--) graphEdges.splice(toRemove[i], 1)
      ctx!.restore()
    }

    function updateHoveredDot() {
      const dot = getNearestGridDot(mouse.x, mouse.y)
      const dist = Math.hypot(mouse.x - dot.x, mouse.y - dot.y)
      if (dist < GRID_STEP * 0.38) {
        const key = `${dot.x},${dot.y}`
        if (lastHoveredDot !== key) {
          lastHoveredDot = key
          spawnGraphEdges(dot.x, dot.y)
        }
      } else {
        lastHoveredDot = null
      }
    }

    function animate() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)

      drawGrid()
      drawGridDots()
      drawGraphEdges()

      const isDark = document.documentElement.getAttribute('data-theme') !== 'light'
      const nodeColor = isDark ? '0,212,255' : '0,100,200'
      const nodeColorAlt = isDark ? '124,58,237' : '50,50,180'
      const connectionColor = isDark ? '0,212,255' : '0,100,200'

      // Update node positions with mouse repulsion
      for (const node of nodes) {
        node.x += node.vx
        node.y += node.vy
        node.pulse += node.pulseSpeed

        if (node.x < 0 || node.x > canvas!.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas!.height) node.vy *= -1

        const mouseDist = Math.hypot(mouse.x - node.x, mouse.y - node.y)
        if (mouseDist < MOUSE_INFLUENCE_RADIUS) {
          const force = (1 - mouseDist / MOUSE_INFLUENCE_RADIUS) * 0.05
          node.vx += ((node.x - mouse.x) / mouseDist) * force
          node.vy += ((node.y - mouse.y) / mouseDist) * force
        }
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.hypot(dx, dy)
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.15
            ctx!.beginPath()
            ctx!.moveTo(nodes[i].x, nodes[i].y)
            ctx!.lineTo(nodes[j].x, nodes[j].y)
            ctx!.strokeStyle = `rgba(${connectionColor},${alpha})`
            ctx!.lineWidth = 0.5
            ctx!.stroke()
          }
        }
      }

      // Draw nodes with pulse and mouse glow
      for (const node of nodes) {
        const pulseAlpha = 0.2 + Math.sin(node.pulse) * 0.15
        const mouseDist = Math.hypot(mouse.x - node.x, mouse.y - node.y)
        const glowRadius = mouseDist < MOUSE_INFLUENCE_RADIUS
          ? (1 - mouseDist / MOUSE_INFLUENCE_RADIUS) * 8 + 4
          : 4

        ctx!.shadowColor = `rgba(${nodeColor},0.3)`
        ctx!.shadowBlur = glowRadius

        ctx!.beginPath()
        ctx!.arc(node.x, node.y, node.radius * (0.8 + Math.sin(node.pulse) * 0.2), 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(${nodeColor},${pulseAlpha})`
        ctx!.fill()

        if (mouseDist < MOUSE_INFLUENCE_RADIUS) {
          ctx!.beginPath()
          ctx!.arc(node.x, node.y, node.radius * 2, 0, Math.PI * 2)
          ctx!.fillStyle = `rgba(${nodeColorAlt},${(1 - mouseDist / MOUSE_INFLUENCE_RADIUS) * 0.3})`
          ctx!.fill()
        }

        ctx!.shadowBlur = 0
      }

      animationId = requestAnimationFrame(animate)
    }

    resize()
    initNodes()
    animate()

    window.addEventListener('resize', resize)
    window.addEventListener('resize', () => initNodes())

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      updateHoveredDot()
    }
    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('resize', () => initNodes())
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [mode])

  return (
    <canvas
      ref={canvasRef}
      id="neural-grid"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 'var(--canvas-opacity)',
        transition: 'opacity 0.4s',
      }}
    />
  )
}
