import { useEffect, useRef, useState } from 'react'
import { useTerminal } from '../hooks/useTerminal'
import { useTerminalStore } from '../store/terminalStore'

interface TerminalCardProps {
  terminalId: string
}

export default function TerminalCard({ terminalId }: TerminalCardProps) {
  const termRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { fitTerminal, togglePause, writeToTerminal } = useTerminal(terminalId, containerRef)
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

  useEffect(() => {
    if (!termRef.current) return
    const observer = new ResizeObserver(() => fitTerminal())
    observer.observe(termRef.current)
    return () => observer.disconnect()
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
    if (nowPaused) writeToTerminal('\x1b[2K\r⏸ Output paused — click Resume to continue\r\n')
  }

  const handleClear = () => {
    writeToTerminal('\x1b[2J\x1b[H')
  }

  const handleRestart = async () => {
    await window.electronAPI.killTerminal(terminalId)
    removeTerminal(terminalId)
    try {
      const id = await window.electronAPI.createTerminal()
      useTerminalStore.getState().addTerminal(id)
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
          <div className="stat" title="Terminal ID">
            <span className="stat-label">PID</span>
            <span className="stat-value">{terminalId.slice(-4)}</span>
          </div>
          <div className="stat" title="Memory usage">
            <span className="stat-label">RAM</span>
            <span className="stat-value">{termRAM}MB</span>
          </div>
          <div className="stat" title="Running time">
            <span className="stat-label">Runtime</span>
            <span className="stat-value">{mins}:{secs.toString().padStart(2, '0')}</span>
          </div>
          <div className="stat" title="Commands executed">
            <span className="stat-label">Tokens</span>
            <span className="stat-value">{terminal.tokenCount}</span>
          </div>
        </div>
        <div className="terminal-card-actions">
          <button className={`term-action-btn ${paused ? 'active' : ''}`} title={paused ? 'Resume output' : 'Pause output'} onClick={handlePause}>
            {paused ? '▶' : '⏸'}
          </button>
          <button className="term-action-btn" title="Clear screen" onClick={handleClear}>⊡</button>
          <button className="term-action-btn" title="Restart terminal" onClick={handleRestart}>⟳</button>
          <button className="term-action-btn" title="Kill terminal" onClick={() => {
            window.electronAPI.killTerminal(terminalId)
            removeTerminal(terminalId)
          }}>⏹</button>
        </div>
      </div>
      <div className="terminal-card-body" ref={termRef}>
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
