import { useEffect, useRef } from 'react'

export default function CityBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cvs = canvasRef.current
    const c = cvs?.getContext('2d')
    if (!cvs || !c) return

    const canvas = cvs
    const ctx = c

    let animFrame = 0
    let buildings: Array<{ x: number; w: number; h: number; color: string; windows: Array<{ x: number; y: number; lit: boolean }> }> = []
    let particles: Array<{ x: number; y: number; vx: number; vy: number; life: number; maxLife: number; size: number }> = []
    let flyingCars: Array<{ x: number; y: number; speed: number; trail: Array<{ x: number; y: number }> }> = []
    let stars: Array<{ x: number; y: number; r: number; twinkle: number }> = []
    let auroraTime = 0

    function generateCity() {
      buildings = []
      const w = canvas.width
      const h = canvas.height
      const groundY = h * 0.75
      let x = 0
      while (x < w) {
        const bw = 20 + Math.random() * 60
        const bh = 80 + Math.random() * (groundY - 100)
        const cv = 8 + Math.floor(Math.random() * 8)
        const color = `rgb(${cv},${cv + 2},${cv + 4})`
        const wins: Array<{ x: number; y: number; lit: boolean }> = []
        const cols = Math.floor(bw / 8)
        const rows = Math.floor(bh / 10)
        for (let ry = 0; ry < rows; ry++)
          for (let rx = 0; rx < cols; rx++)
            if (Math.random() > 0.35) wins.push({ x: rx * 8 + 3, y: ry * 10 + 4, lit: Math.random() > 0.4 })
        buildings.push({ x, w: bw, h: bh, color, windows: wins })
        x += bw + 1
      }
      stars = Array.from({ length: 200 }, () => ({ x: Math.random() * w, y: Math.random() * groundY * 0.6, r: 0.5 + Math.random() * 1.5, twinkle: Math.random() * Math.PI * 2 }))
      flyingCars = Array.from({ length: 12 }, () => ({ x: Math.random() * w, y: 80 + Math.random() * (groundY - 160), speed: 0.5 + Math.random() * 1.5, trail: [] }))
    }

    function drawCity(time: number) {
      const w = canvas.width
      const h = canvas.height
      const groundY = h * 0.75
      const grad = ctx.createLinearGradient(0, 0, 0, h)
      grad.addColorStop(0, '#0A0E1A'); grad.addColorStop(0.3, '#0E1525'); grad.addColorStop(0.5, '#121A2E'); grad.addColorStop(0.7, '#162035'); grad.addColorStop(1, '#1A2540')
      ctx.fillStyle = grad; ctx.fillRect(0, 0, w, h)
      // Horizon glow
      const hGrad = ctx.createRadialGradient(w/2, groundY, 0, w/2, groundY, h*0.3)
      hGrad.addColorStop(0, 'rgba(0,229,255,0.06)'); hGrad.addColorStop(0.5, 'rgba(59,130,246,0.03)'); hGrad.addColorStop(1, 'transparent')
      ctx.fillStyle = hGrad; ctx.fillRect(0, 0, w, h)
      drawAurora(time); drawStars(time); drawMoon()
      for (const b of buildings) {
        const by = groundY - b.h
        ctx.fillStyle = b.color; ctx.fillRect(b.x, by, b.w, b.h)
        for (const win of b.windows) {
          const lit = win.lit && Math.random() > 0.001
          if (lit) { ctx.fillStyle = ['#FFD700', '#00E5FF', '#7DF9FF', '#FF6B6B', '#7C3AED', '#3B82F6'][Math.floor(Math.random() * 6)]; ctx.globalAlpha = 0.3 + Math.random() * 0.5 }
          else { ctx.fillStyle = '#1A2030'; ctx.globalAlpha = 0.3 }
          ctx.fillRect(b.x + win.x, by + win.y, 3, 4); ctx.globalAlpha = 1
        }
        const nc = ['#00E5FF', '#7C3AED', '#3B82F6', '#7DF9FF'][Math.floor(Math.random() * 4)]
        ctx.strokeStyle = nc; ctx.globalAlpha = 0.15 + Math.sin(time * 0.001 + b.x) * 0.05; ctx.lineWidth = 1
        ctx.strokeRect(b.x, by, b.w, b.h); ctx.globalAlpha = 1
      }
      drawNeonLines(groundY, time); drawFlyingCars(); drawParticles()
    }

    function drawAurora(time: number) {
      auroraTime += 0.002; const w = canvas.width; const h = canvas.height
      for (let i = 0; i < 3; i++) {
        const o = i * 0.3; const grad = ctx.createLinearGradient(0, 0, 0, h * 0.4)
        grad.addColorStop(0, 'transparent'); grad.addColorStop(0.3, `rgba(0,229,255,${0.02 + Math.sin(auroraTime + o) * 0.015})`); grad.addColorStop(0.5, `rgba(124,58,237,${0.02 + Math.cos(auroraTime * 0.7 + o) * 0.015})`); grad.addColorStop(0.7, `rgba(61,130,246,${0.01 + Math.sin(auroraTime * 0.5 + o) * 0.01})`); grad.addColorStop(1, 'transparent')
        ctx.fillStyle = grad; ctx.beginPath(); const baseY = h * 0.1 + i * 30; const amp = 40 + Math.sin(auroraTime * 0.5 + i) * 20
        for (let x = 0; x <= w; x += 20) { const y = baseY + Math.sin(x * 0.01 + auroraTime * 0.3 + i * 2) * amp; if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y) }
        ctx.lineTo(w, h * 0.4); ctx.lineTo(0, h * 0.4); ctx.closePath(); ctx.fill()
      }
    }

    function drawStars(time: number) { for (const s of stars) { const tw = 0.5 + Math.sin(time * 0.001 + s.twinkle) * 0.5; ctx.fillStyle = `rgba(255,255,255,${tw * 0.8})`; ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill() } }

    function drawMoon() {
      const x = canvas.width * 0.85, y = canvas.height * 0.08, r = 30
      const grad = ctx.createRadialGradient(x, y, 0, x, y, r * 2); grad.addColorStop(0, 'rgba(200,210,255,0.3)'); grad.addColorStop(0.3, 'rgba(180,200,255,0.1)'); grad.addColorStop(1, 'transparent')
      ctx.fillStyle = grad; ctx.beginPath(); ctx.arc(x, y, r * 2, 0, Math.PI * 2); ctx.fill()
      ctx.fillStyle = 'rgba(200,210,255,0.6)'; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill()
      ctx.fillStyle = 'rgba(220,230,255,0.4)'; ctx.beginPath(); ctx.arc(x - 5, y - 3, r * 0.6, 0, Math.PI * 2); ctx.fill()
      ctx.fillStyle = 'rgba(240,245,255,0.2)'; ctx.beginPath(); ctx.arc(x - 8, y - 5, r * 0.3, 0, Math.PI * 2); ctx.fill()
    }

    function drawNeonLines(groundY: number, time: number) {
      ctx.strokeStyle = '#00E5FF'; ctx.globalAlpha = 0.08; ctx.lineWidth = 1
      for (let i = 0; i < 5; i++) { const y = groundY + 10 + i * 30 + Math.sin(time * 0.0005 + i) * 5; ctx.beginPath(); ctx.moveTo(0, y); for (let x = 0; x <= canvas.width; x += 50) ctx.lineTo(x, y + Math.sin(x * 0.02 + time * 0.001 + i) * 3); ctx.stroke() }
      ;['#00E5FF', '#7C3AED', '#3B82F6', '#7DF9FF'].forEach((color, i) => { ctx.strokeStyle = color; ctx.globalAlpha = 0.15; ctx.lineWidth = 1; const y2 = groundY + 50 + i * 40; ctx.beginPath(); ctx.moveTo(0, y2); for (let x = 0; x <= canvas.width; x += 30) ctx.lineTo(x, y2 + Math.sin(x * 0.015 + time * 0.0008 + i * 2) * 4); ctx.stroke() })
      ctx.globalAlpha = 1
    }

    function drawFlyingCars() {
      const w = canvas.width
      for (const car of flyingCars) {
        car.x += car.speed; if (car.x > w + 100) { car.x = -100; car.y = 80 + Math.random() * (canvas.height * 0.6) }
        car.trail.push({ x: car.x, y: car.y }); if (car.trail.length > 20) car.trail.shift()
        const color = ['#00E5FF', '#7C3AED', '#3B82F6', '#7DF9FF'][Math.floor(Math.random() * 4)]
        for (let i = 0; i < car.trail.length; i++) { ctx.fillStyle = color; ctx.globalAlpha = (i / car.trail.length) * 0.4; ctx.beginPath(); ctx.arc(car.trail[i].x, car.trail[i].y, 1.5, 0, Math.PI * 2); ctx.fill() }
        ctx.globalAlpha = 1; ctx.fillStyle = color; ctx.shadowColor = color; ctx.shadowBlur = 8; ctx.beginPath(); ctx.arc(car.x, car.y, 2.5, 0, Math.PI * 2); ctx.fill(); ctx.shadowBlur = 0
      }
    }

    function drawParticles() {
      if (Math.random() > 0.7) particles.push({ x: Math.random() * canvas.width, y: 0, vx: (Math.random() - 0.5) * 0.3, vy: 0.2 + Math.random() * 0.5, life: 0, maxLife: 100 + Math.random() * 200, size: 0.5 + Math.random() * 2 })
      particles = particles.filter((p) => p.life < p.maxLife)
      for (const p of particles) { p.x += p.vx; p.y += p.vy; p.life++; const alpha = Math.sin((p.life / p.maxLife) * Math.PI) * 0.5; ctx.fillStyle = `rgba(0,229,255,${alpha})`; ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill() }
    }

    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; generateCity() }

    function animate(time: number) { drawCity(time); animFrame = requestAnimationFrame(animate) }

    generateCity()
    animFrame = requestAnimationFrame(animate)
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(animFrame); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={canvasRef} className="city-background" />
}
