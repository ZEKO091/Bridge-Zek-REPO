import { useEffect, useRef, useState } from 'react'
import { useTerminal } from '../hooks/useTerminal'
import { useTerminalStore } from '../store/terminalStore'
import * as I from './Icons'

interface TerminalCardProps {
  terminalId: string
}

export default function TerminalCard({ terminalId }: TerminalCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { fitTerminal, togglePause, writeToTerminal, clearTerminal } = useTerminal(terminalId, containerRef)
  const terminal = useTerminalStore((s) => s.terminals.find((t) => t.id === terminalId))
  const removeTerminal = useTerminalStore((s) => s.removeTerminal)
  const updateTerminal = useTerminalStore((s) => s.updateTerminal)

  const [tick, setTick] = useState(0)
  const [termRAM, setTermRAM] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setTick((t) => t + 1), 1000)
    return () => clearInterval(timer)
  }, [])

  // ResizeObserver with debounce via requestAnimationFrame
  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    let pending = false
    const handler = () => {
      if (pending) return
      pending = true
      requestAnimationFrame(() => { fitTerminal(); pending = false })
    }
    const obs = new ResizeObserver(handler)
    obs.observe(el)
    return () => obs.disconnect()
  }, [fitTerminal])

  useEffect(() => {
    return window.electronAPI.onTerminalStats(terminalId, (stats) => {
      setTermRAM(stats.ram)
      updateTerminal(terminalId, { ram: stats.ram })
    })
  }, [terminalId, updateTerminal])

  if (!terminal) return null

  const runtime = Math.floor((Date.now() - terminal.createdAt) / 1000)
  void tick
  const mins = Math.floor(runtime / 60)
  const secs = runtime % 60

  const handlePause = () => {
    const nowPaused = togglePause()
    setPaused(nowPaused)
    if (nowPaused) writeToTerminal('\x1b[2K\rOutput paused — click Resume to continue\r\n')
  }

  const handleClear = () => clearTerminal()
  const handleRestart = async () => {
    await window.electronAPI.killTerminal(terminalId)
    removeTerminal(terminalId)
    try {
      const id = await window.electronAPI.createTerminal()
      const subId = terminal?.subWorkspaceId
      useTerminalStore.getState().addTerminal(id, subId)
    } catch {}
  }

  return (
    <div className="terminal-card">
      <div className="terminal-card-header">
        <div className="terminal-card-agent">
          <div className="agent-avatar">
            <span className="agent-initials">AG{terminal.name.slice(-1)}</span>
          </div>
          <div className="agent-info">
            <span className="agent-name">{terminal.name}</span>
            <div className="agent-status-row">
              <span className={`agent-status ${paused ? 'starting' : terminal.status}`} />
              <span className="agent-status-text">{paused ? 'paused' : terminal.status}</span>
            </div>
          </div>
        </div>
        <div className="terminal-card-stats">
          <div className="stat"><span className="stat-label">PID</span><span className="stat-value">{terminalId.slice(-4)}</span></div>
          <div className="stat"><span className="stat-label">RAM</span><span className="stat-value">{termRAM}MB</span></div>
          <div className="stat"><span className="stat-label">Time</span><span className="stat-value">{mins}:{secs.toString().padStart(2, '0')}</span></div>
          <div className="stat"><span className="stat-label">Logs</span><span className="stat-value">{terminal.tokenCount}</span></div>
        </div>
        <div className="terminal-card-actions">
          <button className={`term-action-btn ${paused ? 'active' : ''}`} title={paused ? 'Resume' : 'Pause'} onClick={handlePause}>
            {paused ? <I.IconPlay size={12} /> : <I.IconPause size={12} />}
          </button>
          <button className="term-action-btn" title="Clear" onClick={handleClear}><I.IconClear size={12} /></button>
          <button className="term-action-btn" title="Restart" onClick={handleRestart}><I.IconRestart size={12} /></button>
          <button className="term-action-btn" title="Kill" onClick={() => { window.electronAPI.killTerminal(terminalId); removeTerminal(terminalId) }}><I.IconKill size={12} /></button>
        </div>
      </div>
      <div className="terminal-card-body" ref={cardRef}>
        <div className="terminal-container" ref={containerRef} />
      </div>
      {terminal.runningCommand && (
        <div className="terminal-card-footer">
          <span className="footer-cmd-label">CMD</span>
          <span className="footer-cmd">{terminal.runningCommand}</span>
        </div>
      )}
    </div>
  )
}
