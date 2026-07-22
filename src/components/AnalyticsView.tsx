import { useSystemStore } from '../store/systemStore'
import { useTerminalStore } from '../store/terminalStore'

export default function AnalyticsView() {
  const cpu = useSystemStore((s) => s.cpu)
  const gpu = useSystemStore((s) => s.gpu)
  const gpuName = useSystemStore((s) => s.gpuName)
  const ram = useSystemStore((s) => s.ram)
  const ramGB = useSystemStore((s) => s.ramGB)
  const ramTotal = useSystemStore((s) => s.ramTotal)
  const tools = useSystemStore((s) => s.tools)
  const terminals = useTerminalStore((s) => s.terminals)

  return (
    <div className="view-container">
      <div className="view-header"><h2>Analytics</h2></div>
      <div className="dash-grid">
        <div className="dash-card"><div className="dash-value">{cpu}%</div><div className="dash-label">CPU</div></div>
        <div className="dash-card"><div className="dash-value">{gpu !== null ? `${gpu}%` : '—'}</div><div className="dash-label">GPU</div></div>
        <div className="dash-card"><div className="dash-value">{ramGB.toFixed(1)}GB</div><div className="dash-label">RAM / {ramTotal}GB</div></div>
        <div className="dash-card"><div className="dash-value">{terminals.length}</div><div className="dash-label">Terminals</div></div>
      </div>
      <div className="dash-bar"><div className="dash-bar-label">CPU</div><div className="dash-bar-track"><div className="dash-bar-fill cpu" style={{width:`${cpu}%`}} /></div></div>
      <div className="dash-bar"><div className="dash-bar-label">RAM</div><div className="dash-bar-track"><div className="dash-bar-fill ram" style={{width:`${ram}%`}} /></div></div>
      {gpu !== null && <div className="dash-bar"><div className="dash-bar-label">GPU</div><div className="dash-bar-track"><div className="dash-bar-fill gpu" style={{width:`${gpu}%`}} /></div></div>}
      {tools.length > 0 && (
        <div style={{marginTop:12}}>
          <div className="dash-section-title">Detected Tools ({tools.filter(t=>t.installed).length})</div>
          <div style={{display:'flex',flexWrap:'wrap',gap:4}}>
            {tools.filter(t=>t.installed).map(t => <span key={t.name} className="tool-chip installed">{t.name}</span>)}
          </div>
        </div>
      )}
    </div>
  )
}
