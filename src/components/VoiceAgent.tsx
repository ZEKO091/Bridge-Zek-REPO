import { useEffect, useState, useRef } from 'react'
import * as I from './Icons'

export default function VoiceAgent() {
  const [running, setRunning] = useState(false)
  const [logs, setLogs] = useState<string[]>([])
  const logEnd = useRef<HTMLDivElement>(null)
  const pollRef = useRef<number>(0)

  useEffect(() => {
    const offLog = window.electronAPI.onVoiceLog((msg) => {
      setLogs((prev) => [...prev.slice(-50), msg])
    })
    const offStop = window.electronAPI.onVoiceStopped(() => {
      setRunning(false)
      setLogs((prev) => [...prev, '[VTT] Agent stopped'])
    })
    // Poll for status/logs (works in browser mode)
    const poll = async () => {
      try {
        const r = await fetch('/api/voice/status')
        if (r.ok) {
          const data = await r.json()
          setRunning(data.running)
          if (data.logs && data.logs.length > 0) {
            setLogs((prev) => {
              const combined = [...prev, ...data.logs]
              return combined.slice(-50)
            })
          }
        }
      } catch {}
    }
    // Initial status check
    poll()
    pollRef.current = window.setInterval(poll, 3000)
    return () => { offLog(); offStop(); clearInterval(pollRef.current) }
  }, [])

  useEffect(() => {
    logEnd.current?.scrollIntoView({ behavior: 'smooth' })
  }, [logs])

  const toggle = async () => {
    if (running) {
      await window.electronAPI.voiceStop()
      setRunning(false)
    } else {
      setLogs([])
      const ok = await window.electronAPI.voiceStart()
      if (ok) {
        setRunning(true)
        setLogs(['[VTT] Starting voice agent...'])
      }
    }
  }

  return (
    <div className="ai-section">
      <div className="ai-section-title">
        <I.IconAgent size={14} className="ai-section-icon" />
        <span>Voice Agent</span>
        <span className="ai-status-dot" style={{ marginLeft: 'auto', background: running ? '#22C55E' : '#9CAEC8' }} />
      </div>
      <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8, lineHeight: 1.4 }}>
        {running ? 'Hold Ctrl+Space to speak. Transcribes using Whisper.' : 'Start the voice agent to use speech-to-text in your terminal.'}
      </p>
      {logs.length > 0 && (
        <div style={{ maxHeight: 120, overflowY: 'auto', background: 'rgba(0,0,0,0.2)', borderRadius: 6, padding: 6, marginBottom: 8, fontSize: 10, fontFamily: 'JetBrains Mono, monospace', color: 'var(--text-muted)', lineHeight: 1.5 }}>
          {logs.map((l, i) => <div key={i}>{l}</div>)}
          <div ref={logEnd} />
        </div>
      )}
      <button
        onClick={toggle}
        style={{
          display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', width: '100%',
          background: running ? 'rgba(239,68,68,0.1)' : 'rgba(0,229,255,0.08)',
          border: `1px solid ${running ? 'rgba(239,68,68,0.2)' : 'rgba(0,229,255,0.15)'}`,
          borderRadius: 8, color: running ? '#EF4444' : 'var(--glow-cyan)',
          fontFamily: 'inherit', fontSize: 11, fontWeight: 500, cursor: 'pointer', justifyContent: 'center'
        }}
      >
        {running ? <><I.IconKill size={14} /> Stop Voice Agent</> : <><I.IconAgent size={14} /> Start Voice Agent</>}
      </button>
    </div>
  )
}
