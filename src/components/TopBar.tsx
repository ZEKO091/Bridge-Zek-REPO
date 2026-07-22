import { useEffect, useRef, useState } from 'react'
import { useSystemStore } from '../store/systemStore'
import { useAppStore } from '../store/appStore'
import { useWorkspaceStore } from '../store/workspaceStore'
import * as I from './Icons'

export default function TopBar() {
  const cpu = useSystemStore((s) => s.cpu)
  const gpu = useSystemStore((s) => s.gpu)
  const gpuName = useSystemStore((s) => s.gpuName)
  const ram = useSystemStore((s) => s.ram)
  const ramGB = useSystemStore((s) => s.ramGB)
  const ramTotal = useSystemStore((s) => s.ramTotal)
  const setMetrics = useSystemStore((s) => s.setMetrics)
  const notify = useAppStore((s) => s.notify)
  const current = useWorkspaceStore((s) => s.current)
  const lastSaved = useWorkspaceStore((s) => s.lastSaved)
  const closeWorkspace = useWorkspaceStore((s) => s.closeWorkspace)

  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')

  useEffect(() => {
    return window.electronAPI.onSystemMetrics(setMetrics)
  }, [setMetrics])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault(); inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const handleSearch = async (cmd: string) => {
    const trimmed = cmd.trim()
    if (!trimmed) return

    if (trimmed === 'cls' || trimmed === 'clear') {
      setQuery(''); inputRef.current?.blur(); return
    }
    if (trimmed === 'tools') {
      const tools = await window.electronAPI.getSystemTools()
      notify(`Installed: ${tools.filter((t: any) => t.installed).map((t: any) => t.name).join(', ')}`)
      setQuery(''); inputRef.current?.blur(); return
    }

    try {
      const id = await window.electronAPI.createTerminal()
      await window.electronAPI.writeToTerminal(id, `${trimmed}\r`)
      const { useTerminalStore } = await import('../store/terminalStore')
      useTerminalStore.getState().addTerminal(id)
      setQuery(''); inputRef.current?.blur()
    } catch {}
  }

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <div className="top-bar-workspace">
          <I.IconWorkspaces size={16}/>
          <span className="ws-name">{current?.name || 'Bridge Lab'}</span>
          <span className="ws-badge" title={`Auto-saved ${new Date(lastSaved || Date.now()).toLocaleTimeString()}`}>●</span>
          <button className="ws-close" onClick={closeWorkspace} title="Close workspace">✕</button>
        </div>
        <div className="top-bar-model" onClick={() => notify(`GPU: ${gpuName}`)} style={{ cursor: 'pointer' }}>
          <span className="model-dot" />
          <span>{gpuName.includes('Unknown') ? 'Local Machine' : gpuName.slice(0, 20)}</span>
          <span className="model-badge">{osType()}</span>
        </div>
      </div>
      <div className="top-bar-center">
        <div className="search-bar">
          <I.IconSearch size={14} className="search-icon" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command and press Enter..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(query) }}
          />
          <span className="search-hint">Ctrl+K</span>
        </div>
      </div>
      <div className="top-bar-right">
        <div className="metric" title={`CPU: ${cpu}%`}>
          <span className="metric-label">CPU</span>
          <span className="metric-value">{cpu}%</span>
          <div className="metric-bar"><div className="metric-fill cpu" style={{ width: `${cpu}%` }} /></div>
        </div>
        <div className="metric" title={`GPU: ${gpu !== null ? `${gpu}%` : 'N/A'}`}>
          <span className="metric-label">GPU</span>
          <span className="metric-value">{gpu !== null && gpu !== undefined ? `${gpu}%` : '—'}</span>
          <div className="metric-bar"><div className="metric-fill gpu" style={{ width: `${gpu ?? 0}%` }} /></div>
        </div>
        <div className="metric" title={`RAM: ${ramGB.toFixed(1)}GB / ${ramTotal}GB`}>
          <span className="metric-label">RAM</span>
          <span className="metric-value">{ramGB.toFixed(1)}GB</span>
          <div className="metric-bar"><div className="metric-fill ram" style={{ width: `${ram}%` }} /></div>
        </div>
        <div className="top-bar-avatar" onClick={() => notify('ZEK BRIDGE v1.0.8')} title="About" style={{ cursor: 'pointer' }}>ZK</div>
      </div>
    </div>
  )
}

function osType() {
  const p = navigator.platform
  if (p.includes('Win')) return 'Windows'
  if (p.includes('Mac')) return 'macOS'
  if (p.includes('Linux')) return 'Linux'
  return p
}







