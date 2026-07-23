import { useState, useEffect } from 'react'
import { useWorkspaceStore } from '../store/workspaceStore'
import { useTerminalStore, MAX_TERMINALS, canAddTerminal, notifyMaxTerminals } from '../store/terminalStore'
import { useSystemStore } from '../store/systemStore'
import { useAppStore } from '../store/appStore'
import * as I from './Icons'
import { initAudio } from '../lib/sound'
import { useLanguage } from '../hooks/useLanguage'

export default function MainMenu() {
  const [showCreate, setShowCreate] = useState(false)
  const [showOpen, setShowOpen] = useState(false)
  const [openPath, setOpenPath] = useState('')
  const [openTermCount, setOpenTermCount] = useState(2)
  const [projectName, setProjectName] = useState('')
  const [parentDir, setParentDir] = useState('')
  const [termCount, setTermCount] = useState(2)
  const tools = useSystemStore((s) => s.tools)
  const setTools = useSystemStore((s) => s.setTools)
  const cpu = useSystemStore((s) => s.cpu)
  const gpu = useSystemStore((s) => s.gpu)
  const gpuName = useSystemStore((s) => s.gpuName)
  const ram = useSystemStore((s) => s.ram)
  const recent = useWorkspaceStore((s) => s.recent)
  const setWorkspace = useWorkspaceStore((s) => s.setWorkspace)
  const addTerminal = useTerminalStore((s) => s.addTerminal)
  const closeMenu = useAppStore((s) => s.closeMenu)

  useEffect(() => {
    window.electronAPI.getSystemTools().then(setTools)
    return window.electronAPI.onSystemTools(setTools)
  }, [])

  const openWS = async (path: string, name: string, count = 2) => {
    const capped = Math.min(count, MAX_TERMINALS)
    if (!canAddTerminal()) { notifyMaxTerminals(); return }
    setWorkspace({ path, name, openedAt: Date.now(), subWorkspaces: [] }, capped)
    closeMenu()
    for (let i = 0; i < capped; i++) {
      if (!canAddTerminal()) break
      try { const id = await window.electronAPI.createTerminal(); addTerminal(id) } catch {}
    }
  }

  const handleCreate = async () => {
    const name = projectName.trim() || 'my-project'
    const parent = parentDir || (await window.electronAPI.pickParentFolder())
    if (!parent) { alert('Select a parent directory'); return }
    const folder = await window.electronAPI.createFolderAt(parent, name)
    if (folder) { 
      setShowCreate(false)
      // Small delay to let modal close before workspace opens
      setTimeout(() => openWS(folder, name, termCount), 100)
    } else {
      alert('Failed to create folder. Check the path and try again.')
    }
  }

  const { t } = useLanguage()

  const cards = [
    { id:'new', icon:<I.IconPlus size={20}/>, title:t('menu.new'), color:'#00E5FF' },
    { id:'open', icon:<I.IconFolderOpen size={20}/>, title:t('menu.open'), color:'#3B82F6' },
    { id:'terminal', icon:<I.IconTerminal size={20}/>, title:t('menu.terminal'), color:'#7C3AED' },
    { id:'agents', icon:<I.IconAgent size={20}/>, title:t('menu.agents'), color:'#7DF9FF' },
  ]

  const installed = tools.filter(t => t.installed)

  return (
    <div className="mm-container">
      <div className="mm-grid">
        <div className="mm-side">
          <div className="mm-panel">
            <div className="mm-panel-title">Quick Stats</div>
            {[{l:'CPU',v:`${cpu}%`},{l:'GPU',v:gpu!==null?`${gpu}%`:'—'},{l:'RAM',v:`${ram}%`},{l:'Tools',v:`${installed.length}`},{l:'GPU Model',v:gpuName.slice(0,16)}].map(s=>
              <div key={s.l} className="mm-stat">
                <span className="mm-stat-label">{s.l}</span>
                <span className="mm-stat-value">{s.v}</span>
              </div>
            )}
          </div>
        </div>

        <div className="mm-center">
          <div className="mm-logo">
            <div className="mm-logo-text">ZEK</div>
            <div className="mm-logo-sub">BRIDGE</div>
            <div className="mm-status">
              <span className="mm-status-dot" />
              <span className="mm-status-text">AI Workspace</span>
              <span className="mm-status-badge">v1.1.7</span>
            </div>
          </div>

          <div className="mm-cards">
            {cards.map(c => (
              <button key={c.id} className="mm-card" style={{'--card-glow':c.color} as any}
                onClick={() => {
                  initAudio()
                  if (c.id === 'open') { setShowOpen(true); setOpenTermCount(2) }
                  if (c.id === 'new') setShowCreate(true)
                  if (c.id === 'terminal') { setShowOpen(true); setOpenTermCount(1) }
                  if (c.id === 'agents') { setShowOpen(true); setOpenTermCount(2) }
                }}>
                <span className="mm-card-icon">{c.icon}</span>
                <span className="mm-card-title">{c.title}</span>
              </button>
            ))}
          </div>

          <div className="mm-bottom">
            <button className="mm-bottom-btn" onClick={() => { setShowOpen(true); setOpenTermCount(2) }}>
              <I.IconFolderOpen size={14} /> {t('menu.import')}
            </button>
            <button className="mm-bottom-btn" onClick={() => setShowCreate(true)}>
              <I.IconPlus size={14} /> {t('menu.newProject')}
            </button>
          </div>
        </div>

        <div className="mm-side">
          <div className="mm-panel">
            <div className="mm-panel-title">Recent</div>
            {recent.length === 0
              ? <div className="mm-recent-empty">No recent workspaces</div>
              : recent.slice(0,5).map(ws =>
                  <button key={ws.path} className="mm-recent-item" onClick={() => openWS(ws.path, ws.name, ws.terminalCount || 2)}>
                    <span className="mm-recent-name">{ws.name}</span>
                    <span className="mm-recent-path">{ws.path.split('\\').pop()}</span>
                  </button>
                )
            }
            {installed.length > 0 && (
              <div className="mm-tools">
                {installed.slice(0,6).map(t => <span key={t.name} className="mm-tool">{t.name}</span>)}
              </div>
            )}
          </div>
        </div>
      </div>

      {showOpen && (
        <div className="mm-overlay" onClick={() => { setShowOpen(false); setOpenPath('') }}>
          <div className="mm-modal" onClick={e => e.stopPropagation()}>
            <h2>Open Workspace</h2>
            <div>
              <label>Folder path</label>
              <input autoFocus value={openPath} onChange={e => setOpenPath(e.target.value)}
                placeholder="C:\Users\YourName\Projects\my-project"
                onKeyDown={e => { if (e.key === 'Enter' && openPath.trim()) { openWS(openPath.trim(), openPath.trim().split(/[\\/]/).pop() || 'Workspace', openTermCount); setShowOpen(false); setOpenPath('') } }} />
            </div>
            <div className="mm-modal-actions">
              <button className="mm-cancel" onClick={() => { setShowOpen(false); setOpenPath('') }}>Cancel</button>
              <button className="mm-confirm" onClick={() => { if (openPath.trim()) { openWS(openPath.trim(), openPath.trim().split(/[\\/]/).pop() || 'Workspace', openTermCount); setShowOpen(false); setOpenPath('') } }}>
                {openTermCount === 1 ? 'Open Terminal' : 'Open'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showCreate && (
        <div className="mm-overlay" onClick={() => setShowCreate(false)}>
          <div className="mm-modal" onClick={e => e.stopPropagation()}>
            <h2>Create Workspace</h2>
            <div>
              <label>Parent directory</label>
              <div className="mm-modal-row">
                <input value={parentDir} onChange={e => setParentDir(e.target.value)} placeholder="C:\Users\YourName\Projects" />
                <button className="mm-modal-btn" onClick={async () => { const f = await window.electronAPI.pickParentFolder(); if (f) setParentDir(f) }}>Browse</button>
              </div>
            </div>
            <div>
              <label>Project name</label>
              <input value={projectName} onChange={e => setProjectName(e.target.value)} placeholder="my-project" />
            </div>
            <div>
              <label>Terminals</label>
              <div className="mm-term-selector" style={{marginTop:4}}>
                {[1,2,3,4,6,8,10,12].map(n =>
                  <button key={n} className={`mm-term-btn ${termCount===n?'active':''}`} onClick={() => setTermCount(Math.min(n,12))}>{n}</button>
                )}
                {termCount > 12 && <span style={{fontSize:10,color:'#EF4444'}}>Max 12</span>}
              </div>
            </div>
            <div className="mm-modal-actions">
              <button className="mm-cancel" onClick={() => setShowCreate(false)}>Cancel</button>
              <button className="mm-confirm" onClick={handleCreate}>Create</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}





























