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
    let frameCount = 0
    let buildings: Array<{ x: number; w: number; h: number; color: string; wins: Array<{ x: number; y: number }> }> = []
    let particles: Array<{ x: number; y: number; vx: number; vy: number; life: number; maxLife: number }> = []
    let cars: Array<{ x: number; y: number; speed: number; trail: Array<{ x: number; y: number }> }> = []
    let stars: Array<{ x: number; y: number; r: number }> = []

    function gen() {
      buildings = []; stars = []; cars = []
      const w = canvas.width, h = canvas.height, gy = h * 0.75
      let x = 0
      while (x < w) {
        const bw = 20 + Math.random() * 60, bh = 80 + Math.random() * (gy - 100)
        const cv = 8 + Math.floor(Math.random() * 8), color = `rgb(${cv},${cv+2},${cv+4})`
        const wins: Array<{x:number;y:number}> = []
        for (let ry = 0; ry < Math.floor(bh/12); ry++)
          for (let rx = 0; rx < Math.floor(bw/10); rx++)
            if (Math.random() > 0.4) wins.push({ x: rx*10+4, y: ry*12+5 })
        buildings.push({ x, w: bw, h: bh, color, wins })
        x += bw + 1
      }
      for (let i = 0; i < 60; i++) stars.push({ x: Math.random()*w, y: Math.random()*gy*0.6, r: 0.5+Math.random()*1.5 })
      for (let i = 0; i < 4; i++) cars.push({ x: Math.random()*w, y: 80+Math.random()*(gy-160), speed: 0.2+Math.random()*0.4, trail: [] })
    }

    function draw(t: number) {
      frameCount++
      if (frameCount % 3 !== 0) { animFrame = requestAnimationFrame(draw); return }
      const w = canvas.width, h = canvas.height, gy = h * 0.75

      // Sky (cached per resize)
      const grad = ctx.createLinearGradient(0, 0, 0, h)
      grad.addColorStop(0, '#0A0E1A'); grad.addColorStop(0.5, '#121A2E'); grad.addColorStop(1, '#1A2540')
      ctx.fillStyle = grad; ctx.fillRect(0, 0, w, h)

      // Stars
      for (const s of stars) { ctx.fillStyle = `rgba(255,255,255,${0.3+Math.sin(t*0.001+s.x)*0.3})`; ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.28); ctx.fill() }

      // Moon
      const mx = w*0.88, my = h*0.08
      ctx.fillStyle = 'rgba(200,210,255,0.15)'; ctx.beginPath(); ctx.arc(mx, my, 50, 0, 6.28); ctx.fill()
      ctx.fillStyle = 'rgba(200,210,255,0.5)'; ctx.beginPath(); ctx.arc(mx, my, 25, 0, 6.28); ctx.fill()

      // Buildings
      for (const b of buildings) {
        const by = gy - b.h
        ctx.fillStyle = b.color; ctx.fillRect(b.x, by, b.w, b.h)
        for (const win of b.wins) {
          ctx.fillStyle = Math.random() > 0.998 ? '#FFD700' : '#1A2030'
          ctx.fillRect(b.x+win.x, by+win.y, 3, 4)
        }
      }

      // Cars
      for (const car of cars) {
        car.x += car.speed; if (car.x > w+80) { car.x = -80; car.y = 80+Math.random()*(gy-160) }
        car.trail.push({x:car.x,y:car.y}); if (car.trail.length>12) car.trail.shift()
        for (let i=0; i<car.trail.length; i++) { ctx.fillStyle = `rgba(0,229,255,${i/car.trail.length*0.3})`; ctx.beginPath(); ctx.arc(car.trail[i].x, car.trail[i].y, 1.5, 0, 6.28); ctx.fill() }
        ctx.fillStyle = '#00E5FF'; ctx.beginPath(); ctx.arc(car.x, car.y, 2.5, 0, 6.28); ctx.fill()
      }

      // Particles (fewer)
      if (Math.random() > 0.85) particles.push({ x: Math.random()*w, y: 0, vx: (Math.random()-0.5)*0.05, vy: 0.05+Math.random()*0.1, life: 0, maxLife: 100+Math.random()*200 })
      particles = particles.filter(p => p.life < p.maxLife)
      for (const p of particles) { p.x += p.vx; p.y += p.vy; p.life++; ctx.fillStyle = `rgba(0,229,255,${Math.sin(p.life/p.maxLife*3.14)*0.3})`; ctx.beginPath(); ctx.arc(p.x, p.y, 1.5, 0, 6.28); ctx.fill() }

      animFrame = requestAnimationFrame(draw)
    }

    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; gen() }

    gen()
    animFrame = requestAnimationFrame(draw)
    window.addEventListener('resize', resize)

    // Stop when hidden
    const onVisibility = () => { if (document.hidden) { cancelAnimationFrame(animFrame) } else { animFrame = requestAnimationFrame(draw) } }
    document.addEventListener('visibilitychange', onVisibility)

    return () => { cancelAnimationFrame(animFrame); window.removeEventListener('resize', resize); document.removeEventListener('visibilitychange', onVisibility) }
  }, [])

  return <canvas ref={canvasRef} className="city-background" />
}
