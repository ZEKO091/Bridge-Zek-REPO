let audioCtx: AudioContext | null = null

async function ensureCtx(): Promise<AudioContext> {
  if (!audioCtx) audioCtx = new AudioContext()
  if (audioCtx.state === 'suspended') await audioCtx.resume()
  return audioCtx
}

// Init AudioContext on first user interaction (browser policy)
export function initAudio() {
  if (audioCtx) return
  audioCtx = new AudioContext()
  if (audioCtx.state === 'suspended') audioCtx.resume().catch(() => {})
}

export async function playNotification() {
  try {
    const ctx = await ensureCtx()
    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.type = 'sine'
    osc.frequency.setValueAtTime(880, now)
    osc.frequency.setValueAtTime(1108.73, now + 0.15)
    gain.gain.setValueAtTime(0.15, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3)
    osc.start(now)
    osc.stop(now + 0.3)
  } catch {}
}

export function playError() {
  try {
    const ctx = getCtx()
    const now = ctx.currentTime

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(220, now)
    osc.frequency.setValueAtTime(180, now + 0.2)

    gain.gain.setValueAtTime(0.1, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3)

    osc.start(now)
    osc.stop(now + 0.3)
  } catch {}
}

export function playStartup() {
  try {
    const ctx = getCtx()
    const now = ctx.currentTime

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.type = 'sine'
    osc.frequency.setValueAtTime(523.25, now)     // C5
    osc.frequency.setValueAtTime(659.25, now + 0.1) // E5
    osc.frequency.setValueAtTime(783.99, now + 0.2) // G5

    gain.gain.setValueAtTime(0.12, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4)

    osc.start(now)
    osc.stop(now + 0.4)
  } catch {}
}
