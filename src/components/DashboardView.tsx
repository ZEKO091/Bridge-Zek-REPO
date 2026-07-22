import { useState } from 'react'
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
  const setWorkspace = useWorkspaceStore((s) => s.setWorkspace)

  const [editing, setEditing] = useState(false)
  const [newName, setNewName] = useState('')

  const installed = tools.filter((t) => t.installed)

  const handleRename = () => {
    if (newName.trim() && ws) {
      setWorkspace({ ...ws, name: newName.trim() }, ws.terminalCount)
    }
    setEditing(false)
  }

  return (
    <div className="view-container">
      <div className="view-header"><h2>Dashboard</h2></div>
      <div className="dash-grid">
        <div className="dash-card"><div className="dash-value">{cpu}%</div><div className="dash-label">CPU</div></div>
        <div className="dash-card"><div className="dash-value">{gpu !== null ? `${gpu}%` : '—'}</div><div className="dash-label">GPU {gpuName.slice(0, 12)}</div></div>
        <div className="dash-card"><div className="dash-value">{ramGB.toFixed(1)}GB</div><div className="dash-label">RAM / {ramTotal}GB</div></div>
        <div className="dash-card"><div className="dash-value">{terminals.length}</div><div className="dash-label">Terminals</div></div>
        <div className="dash-card"><div className="dash-value">{installed.length}</div><div className="dash-label">Tools</div></div>
        <div className="dash-card" style={{cursor:'pointer'}} onClick={() => { if (ws) { setNewName(ws.name); setEditing(true) } }}>
          {editing ? (
            <div style={{display:'flex',gap:4,alignItems:'center',justifyContent:'center'}}>
              <input
                autoFocus
                value={newName}
                onChange={e => setNewName(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleRename(); if (e.key === 'Escape') setEditing(false) }}
                onBlur={handleRename}
                style={{width:'100%',padding:'4px 6px',background:'rgba(0,0,0,0.3)',border:'1px solid rgba(0,229,255,0.2)',borderRadius:4,color:'#fff',fontFamily:'Space Grotesk,sans-serif',fontSize:12,textAlign:'center',outline:'none'}}
              />
            </div>
          ) : (
            <>
              <div className="dash-value" style={{fontSize:14}}>{ws?.name || '—'}</div>
              <div className="dash-label">Workspace (click to rename)</div>
            </>
          )}
        </div>
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
