import { useState, useEffect } from 'react'
import { useWorkspaceStore } from '../store/workspaceStore'
import { useTerminalStore } from '../store/terminalStore'
import { useSystemStore } from '../store/systemStore'
import { useAppStore } from '../store/appStore'
import * as I from './Icons'

const actionCards = [
  { id: 'new', icon: (s: number) => <I.IconPlus size={s} />, title: 'New Workspace', desc: 'Create a new project', color: '#00E5FF' },
  { id: 'open', icon: (s: number) => <I.IconFolderOpen size={s} />, title: 'Open Workspace', desc: 'Open an existing folder', color: '#3B82F6' },
  { id: 'continue', icon: (s: number) => <I.IconRestart size={s} />, title: 'Continue Last', desc: 'Resume recent session', color: '#7C3AED' },
  { id: 'agents', icon: (s: number) => <I.IconAgent size={s} />, title: 'AI Agents', desc: 'Manage agents & tools', color: '#7DF9FF' },
  { id: 'terminal', icon: (s: number) => <I.IconTerminal size={s} />, title: 'Terminal', desc: 'Open PowerShell', color: '#00E5FF' },
  { id: 'models', icon: (s: number) => <I.IconModel size={s} />, title: 'Local Models', desc: 'AI model manager', color: '#3B82F6' },
  { id: 'files', icon: (s: number) => <I.IconFolder size={s} />, title: 'Files', desc: 'Browse project files', color: '#7C3AED' },
  { id: 'settings', icon: (s: number) => <I.IconSettings size={s} />, title: 'Settings', desc: 'Configure workspace', color: '#7DF9FF' },
]

export default function MainMenu() {
  const [parentDir, setParentDir] = useState('')
  const [projectName, setProjectName] = useState('')
  const [termCount, setTermCount] = useState(2)
  const [showCreate, setShowCreate] = useState(false)
  const recent = useWorkspaceStore((s) => s.recent)
  const setWorkspace = useWorkspaceStore((s) => s.setWorkspace)
  const addTerminal = useTerminalStore((s) => s.addTerminal)
  const tools = useSystemStore((s) => s.tools)
  const setTools = useSystemStore((s) => s.setTools)
  const cpu = useSystemStore((s) => s.cpu)
  const gpu = useSystemStore((s) => s.gpu)
  const gpuName = useSystemStore((s) => s.gpuName)
  const ram = useSystemStore((s) => s.ram)

  useEffect(() => {
    window.electronAPI.getSystemTools().then(setTools)
    return window.electronAPI.onSystemTools(setTools)
  }, [])

  const closeMenu = useAppStore((s) => s.closeMenu)

  const openWorkspace = async (path: string, name: string, count: number = 2) => {
    setWorkspace({ path, name, openedAt: Date.now() }, count)
    closeMenu()
  }

  const handleCard = async (id: string) => {
    if (id === 'new') { setShowCreate(true); return }
    if (id === 'open') {
      const folder = await window.electronAPI.openFolderDialog()
      if (folder) openWorkspace(folder, folder.split(/[\\/]/).pop() || 'Workspace')
      return
    }
    if (id === 'continue' && recent.length > 0) {
      const ws = recent[0]
      openWorkspace(ws.path, ws.name, ws.terminalCount || 2)
      return
    }
    if (id === 'terminal') {
      const folder = await window.electronAPI.openFolderDialog()
      if (folder) openWorkspace(folder, folder.split(/[\\/]/).pop() || 'Workspace', 1)
      return
    }
    if (id === 'files') {
      const folder = await window.electronAPI.openFolderDialog()
      if (folder) openWorkspace(folder, folder.split(/[\\/]/).pop() || 'Workspace')
      return
    }
    if (id === 'agents' || id === 'models' || id === 'settings') {
      const folder = await window.electronAPI.openFolderDialog()
      if (folder) openWorkspace(folder, folder.split(/[\\/]/).pop() || 'Workspace')
    }
  }

  const handleCreate = async () => {
    const name = projectName.trim() || 'my-zek-workspace'
    const parent = parentDir || (await window.electronAPI.pickParentFolder())
    if (!parent) return
    const fullPath = await window.electronAPI.createFolderAt(parent, name)
    if (fullPath) { setShowCreate(false); openWorkspace(fullPath, name, termCount) }
  }

  const installedTools = tools.filter(t => t.installed)

  return (
    <div className="mm-main">
      {showCreate && (
        <div className="mm-overlay" onClick={() => setShowCreate(false)}>
          <div className="mm-create-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Create Workspace</h2>
            <div className="mm-create-field">
              <label>Parent directory</label>
              <div className="mm-create-row">
                <input value={parentDir} onChange={(e) => setParentDir(e.target.value)} placeholder="C:\Users\YourName\Projects" />
                <button onClick={async () => { const f = await window.electronAPI.pickParentFolder(); if (f) setParentDir(f) }}>Browse</button>
              </div>
            </div>
            <div className="mm-create-field">
              <label>Project name</label>
              <input value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder="my-project" />
            </div>
            <div className="mm-create-field">
              <label>Terminals</label>
              <div className="mm-term-selector">
                {[1,2,3,4,6,8,10,12].map(n => (
                  <button key={n} className={`mm-term-btn ${termCount===n?'active':''}`} onClick={() => setTermCount(n)}>{n}</button>
                ))}
              </div>
            </div>
            <div className="mm-create-actions">
              <button className="mm-cancel-btn" onClick={() => setShowCreate(false)}>Cancel</button>
              <button className="mm-confirm-btn" onClick={handleCreate}>Create Workspace</button>
            </div>
          </div>
        </div>
      )}

      <div className="mm-layout">
        <div className="mm-left">
          <div className="mm-panel mm-stats-panel">
            <div className="mm-panel-title">Quick Stats</div>
            <div className="mm-stat"><span className="mm-stat-label">Running Agents</span><span className="mm-stat-value">{installedTools.length}</span></div>
            <div className="mm-stat"><span className="mm-stat-label">CPU Usage</span><span className="mm-stat-value">{cpu}%</span></div>
            <div className="mm-stat"><span className="mm-stat-label">GPU Usage</span><span className="mm-stat-value">{gpu !== null ? `${gpu}%` : '—'}</span></div>
            <div className="mm-stat"><span className="mm-stat-label">RAM Usage</span><span className="mm-stat-value">{ram}%</span></div>
            <div className="mm-stat"><span className="mm-stat-label">Active Tasks</span><span className="mm-stat-value">{recent.length}</span></div>
            <div className="mm-stat"><span className="mm-stat-label">Tools Detected</span><span className="mm-stat-value">{installedTools.length}</span></div>
            <div className="mm-stat"><span className="mm-stat-label">GPU Model</span><span className="mm-stat-value" style={{fontSize:9}}>{gpuName.slice(0,16)}</span></div>
          </div>
        </div>

        <div className="mm-center">
          <div className="mm-header">
            <div className="mm-logo">
              <div className="mm-logo-icon">ZEK</div>
              <div className="mm-logo-sub">BRIDGE</div>
            </div>
            <div className="mm-status-row">
              <span className="mm-status-dot" />
              <span className="mm-status-text">AI Workspace</span>
              <span className="mm-status-badge">v1.0.1</span>
            </div>
          </div>

          <div className="mm-cards-grid">
            {actionCards.map((card) => (
              <button key={card.id} className="mm-action-card" onClick={() => handleCard(card.id)} style={{'--card-glow': card.color} as any}>
                <span className="mm-action-icon">{card.icon(24)}</span>
                <span className="mm-action-title">{card.title}</span>
                <span className="mm-action-desc">{card.desc}</span>
              </button>
            ))}
          </div>

          <div className="mm-bottom">
            <button className="mm-quick-btn" onClick={handleCard('new')}><I.IconPlus size={14} /> New Project</button>
            <button className="mm-quick-btn" onClick={handleCard('open')}><I.IconFolderOpen size={14} /> Import</button>
            <button className="mm-quick-btn" onClick={() => handleCard('continue')}><I.IconRestart size={14} /> Clone Repo</button>
            <button className="mm-quick-btn" onClick={() => handleCard('agents')}><I.IconAgent size={14} /> AI Assistant</button>
          </div>
        </div>

        <div className="mm-right">
          <div className="mm-panel mm-recent-panel">
            <div className="mm-panel-title">Recent Workspaces</div>
            {recent.length === 0 ? (
              <div className="mm-recent-empty">No recent workspaces</div>
            ) : (
              recent.slice(0, 5).map((ws) => (
                <button key={ws.path} className="mm-recent-item" onClick={() => openWorkspace(ws.path, ws.name, ws.terminalCount || 2)}>
                  <div className="mm-recent-name">{ws.name}</div>
                  <div className="mm-recent-path">{ws.path.split('\\').pop()}</div>
                </button>
              ))
            )}
            <div className="mm-recent-tools">
              {installedTools.slice(0, 8).map(t => (
                <span key={t.name} className="mm-recent-tool">{t.name}</span>
              ))}
              {installedTools.length > 8 && <span className="mm-recent-tool">+{installedTools.length-8}</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
