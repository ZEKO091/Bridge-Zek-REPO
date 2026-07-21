import { useEffect } from 'react'
import { useSystemStore } from '../store/systemStore'

export default function TopBar() {
  const cpu = useSystemStore((s) => s.cpu)
  const gpu = useSystemStore((s) => s.gpu)
  const gpuName = useSystemStore((s) => s.gpuName)
  const ram = useSystemStore((s) => s.ram)
  const ramGB = useSystemStore((s) => s.ramGB)
  const ramTotal = useSystemStore((s) => s.ramTotal)
  const setMetrics = useSystemStore((s) => s.setMetrics)

  useEffect(() => {
    return window.electronAPI.onSystemMetrics(setMetrics)
  }, [setMetrics])

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <div className="top-bar-workspace">
          <span className="top-bar-icon">◇</span>
          <span>Bridge Lab</span>
        </div>
        <div className="top-bar-model">
          <span className="model-dot" />
          <span>{gpuName.includes('Unknown') ? 'Local Machine' : gpuName.slice(0, 20)}</span>
          <span className="model-badge">{osType()}</span>
        </div>
      </div>
      <div className="top-bar-center">
        <div className="search-bar">
          <span className="search-icon">⌕</span>
          <input type="text" placeholder="Search commands, files, agents..." readOnly />
          <span className="search-hint">Ctrl+K</span>
        </div>
      </div>
      <div className="top-bar-right">
        <div className="metric">
          <span className="metric-label">CPU</span>
          <span className="metric-value">{cpu}%</span>
          <div className="metric-bar"><div className="metric-fill cpu" style={{ width: `${cpu}%` }} /></div>
        </div>
        <div className="metric">
          <span className="metric-label">GPU</span>
          <span className="metric-value">{gpu !== null ? `${gpu}%` : '—'}</span>
          <div className="metric-bar"><div className="metric-fill gpu" style={{ width: `${gpu ?? 0}%` }} /></div>
        </div>
        <div className="metric">
          <span className="metric-label">RAM</span>
          <span className="metric-value">{ramGB.toFixed(1)}GB</span>
          <div className="metric-bar"><div className="metric-fill ram" style={{ width: `${ram}%` }} /></div>
        </div>
        <div className="top-bar-avatar">ZK</div>
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
