import { useState } from 'react'
import { useWorkspaceStore } from '../store/workspaceStore'

export default function MainMenu() {
  const [newName, setNewName] = useState('')
  const recent = useWorkspaceStore((s) => s.recent)
  const setWorkspace = useWorkspaceStore((s) => s.setWorkspace)

  const handleOpen = async () => {
    const folder = await window.electronAPI.openFolderDialog()
    if (folder) {
      setWorkspace({ path: folder, name: folder.split(/[\\/]/).pop() || 'Workspace', openedAt: Date.now() })
    }
  }

  const handleCreate = async () => {
    const name = newName.trim() || 'my-zek-workspace'
    const folder = await window.electronAPI.createFolderDialog(name)
    if (folder) {
      setWorkspace({ path: folder, name, openedAt: Date.now() })
    }
  }

  const handleRecent = (ws: { path: string; name: string }) => {
    setWorkspace({ path: ws.path, name: ws.name, openedAt: Date.now() })
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
              <span className="mm-icon">🗁</span>
              <span className="mm-title">Open Workspace</span>
              <span className="mm-desc">Select an existing project folder</span>
            </div>

            <div className="main-menu-card create">
              <span className="mm-icon">+</span>
              <div className="mm-create-row">
                <input
                  className="mm-input"
                  placeholder="my-zek-workspace"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleCreate() }}
                />
                <button className="mm-create-btn" onClick={handleCreate}>Create</button>
              </div>
              <span className="mm-desc">New project folder</span>
            </div>
          </div>

          {recent.length > 0 && (
            <div className="main-menu-recent">
              <h3>Recent Workspaces</h3>
              <div className="recent-list">
                {recent.map((ws) => (
                  <button key={ws.path} className="recent-item" onClick={() => handleRecent(ws)}>
                    <span className="recent-icon">▦</span>
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
