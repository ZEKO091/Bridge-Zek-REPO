import { useSystemStore } from '../store/systemStore'
import { useTerminalStore } from '../store/terminalStore'
import { useWorkspaceStore } from '../store/workspaceStore'

export default function DashboardView() {
  const cpu = useSystemStore((s) => s.cpu)
  const gpu = useSystemStore((s) => s.gpu)
  const gpuName = useSystemStore((s) => s.gpuName)
  const ram = useSystemStore((s) => s.ram)
  const ramGB = useSystemStore((s) => s.ramGB)
  const ramTotal = useSystemStore((s) => s.ramTotal)
  const tools = useSystemStore((s) => s.tools)
  const terminals = useTerminalStore((s) => s.terminals)
  const ws = useWorkspaceStore((s) => s.current)

  const installed = tools.filter((t) => t.installed)

  return (
    <div className="view-container">
      <div className="view-header"><h2>Dashboard</h2></div>
      <div className="dash-grid">
        <div className="dash-card"><div className="dash-value">{cpu}%</div><div className="dash-label">CPU</div></div>
        <div className="dash-card"><div className="dash-value">{gpu !== null ? `${gpu}%` : '—'}</div><div className="dash-label">GPU {gpuName.slice(0, 12)}</div></div>
        <div className="dash-card"><div className="dash-value">{ramGB.toFixed(1)}GB</div><div className="dash-label">RAM / {ramTotal}GB</div></div>
        <div className="dash-card"><div className="dash-value">{terminals.length}</div><div className="dash-label">Terminals</div></div>
        <div className="dash-card"><div className="dash-value">{installed.length}</div><div className="dash-label">Tools</div></div>
        <div className="dash-card"><div className="dash-value">{ws?.name || '—'}</div><div className="dash-label">Workspace</div></div>
      </div>
      <div className="dash-bar">
        <div className="dash-bar-label">CPU</div>
        <div className="dash-bar-track"><div className="dash-bar-fill cpu" style={{ width: `${cpu}%` }} /></div>
      </div>
      <div className="dash-bar">
        <div className="dash-bar-label">RAM</div>
        <div className="dash-bar-track"><div className="dash-bar-fill ram" style={{ width: `${ram}%` }} /></div>
      </div>
      <div className="dash-section-title">Detected Tools</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
        {installed.map((t) => (
          <span key={t.name} className="tool-chip installed">{t.name}</span>
        ))}
        {installed.length === 0 && <span className="dash-muted">No tools detected</span>}
      </div>
    </div>
  )
}
