import { useState, useEffect } from 'react'
import { useWorkspaceStore } from '../store/workspaceStore'
import { useTerminalStore } from '../store/terminalStore'
import { useSystemStore } from '../store/systemStore'
import * as I from './Icons'

export default function MainMenu() {
  const [parentDir, setParentDir] = useState('')
  const [projectName, setProjectName] = useState('')
  const [termCount, setTermCount] = useState(2)
  const recent = useWorkspaceStore((s) => s.recent)
  const tools = useSystemStore((s) => s.tools)
  const setTools = useSystemStore((s) => s.setTools)

  useEffect(() => {
    window.electronAPI.getSystemTools().then(setTools)
    return window.electronAPI.onSystemTools(setTools)
  }, [])
  const setWorkspace = useWorkspaceStore((s) => s.setWorkspace)
  const addTerminal = useTerminalStore((s) => s.addTerminal)

  const openWithTerminals = async (path: string, name: string, count: number) => {
    setWorkspace({ path, name, openedAt: Date.now() }, count)
    for (let i = 0; i < count; i++) {
      try {
        const id = await window.electronAPI.createTerminal()
        addTerminal(id)
      } catch {}
    }
  }

  const handleOpen = async () => {
    const folder = await window.electronAPI.openFolderDialog()
    if (folder) {
      openWithTerminals(folder, folder.split(/[\\/]/).pop() || 'Workspace', 1)
    }
  }

  const handleBrowse = async () => {
    const folder = await window.electronAPI.pickParentFolder()
    if (folder) setParentDir(folder)
  }

  const handleCreate = async () => {
    const name = projectName.trim()
    if (!name || !parentDir) return
    const fullPath = await window.electronAPI.createFolderAt(parentDir, name)
    if (fullPath) openWithTerminals(fullPath, name, termCount)
  }

  const handleRecent = (ws: { path: string; name: string }) => {
    openWithTerminals(ws.path, ws.name, 1)
  }

  return (
    <div className="main-menu">
      <div className="main-menu-bg">
        <div className="main-menu-content">
          <div className="main-menu-logo">
            <div className="main-menu-logo-icon">ZEK</div>
            <h1>BRIDGE</h1>
            <p className="main-menu-subtitle">Terminal Workspace for AI Agents</p>
          </div>

          <div className="main-menu-actions">
            <div className="main-menu-card" onClick={handleOpen}>
              <I.IconFolderOpen size={24} className="mm-icon" />
              <span className="mm-title">Open Workspace</span>
              <span className="mm-desc">Select an existing project folder</span>
            </div>

            <div className="main-menu-card">
              <I.IconPlus size={24} className="mm-icon" />
              <span className="mm-title">Create New Workspace</span>

              <div className="mm-path-row">
                <span className="mm-path-label">Parent directory</span>
                <div className="mm-path-input-row">
                  <input
                    className="mm-input path"
                    placeholder="C:\Users\YourName\Projects"
                    value={parentDir}
                    onChange={(e) => setParentDir(e.target.value)}
                  />
                  <button className="mm-browse-btn" onClick={handleBrowse}>Browse</button>
                </div>
              </div>

              <div className="mm-path-row">
                <span className="mm-path-label">Project name</span>
                <input
                  className="mm-input"
                  placeholder="my-zek-workspace"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleCreate() }}
                />
              </div>

              <div className="mm-path-row">
                <span className="mm-path-label">Terminals to open</span>
                <div className="mm-term-selector">
                  {[1, 2, 3, 4, 6, 8, 10, 12].map((n) => (
                    <button
                      key={n}
                      className={`mm-term-btn ${termCount === n ? 'active' : ''}`}
                      onClick={() => setTermCount(n)}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              {parentDir && projectName.trim() && (
                <div className="mm-path-preview">
                  <I.IconWorkspaces size={14} className="mm-preview-icon" />
                  <span className="mm-preview-path">{parentDir}\{projectName.trim()}</span>
                  <span className="mm-preview-terms">{termCount} terminals</span>
                </div>
              )}

              <button
                className="mm-create-btn full"
                disabled={!parentDir || !projectName.trim()}
                onClick={handleCreate}
              >
                Create Workspace ({termCount} terminals)
              </button>
            </div>
          </div>

          <div className="main-menu-tools">
            <h3>Detected Agents & Tools</h3>
            <div className="main-menu-tools-grid">
              {tools.filter(t => t.installed).map(t => (
                <span key={t.name} className="main-menu-tool installed">{t.name}</span>
              ))}
              {tools.filter(t => !t.installed).slice(0, 4).map(t => (
                <span key={t.name} className="main-menu-tool missing">{t.name}</span>
              ))}
            </div>
          </div>

          {recent.length > 0 && (
            <div className="main-menu-recent">
              <h3>Recent Workspaces</h3>
              <div className="recent-list">
                {recent.map((ws) => (
                  <button key={ws.path} className="recent-item" onClick={() => handleRecent(ws)}>
                    <I.IconWorkspaces size={16} className="recent-icon" />
                    <div className="recent-info">
                      <span className="recent-name">{ws.name}</span>
                      <span className="recent-path">{ws.path}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
