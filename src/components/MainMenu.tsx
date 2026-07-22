import { useState } from 'react'
import { useWorkspaceStore } from '../store/workspaceStore'
import { useTerminalStore } from '../store/terminalStore'

export default function MainMenu() {
  const [parentDir, setParentDir] = useState('')
  const [projectName, setProjectName] = useState('')
  const recent = useWorkspaceStore((s) => s.recent)
  const setWorkspace = useWorkspaceStore((s) => s.setWorkspace)
  const addTerminal = useTerminalStore((s) => s.addTerminal)

  const openWithTerminal = async (path: string, name: string) => {
    setWorkspace({ path, name, openedAt: Date.now() })
    try {
      const id = await window.electronAPI.createTerminal()
      addTerminal(id)
    } catch {}
  }

  const handleOpen = async () => {
    const folder = await window.electronAPI.openFolderDialog()
    if (folder) {
      openWithTerminal(folder, folder.split(/[\\/]/).pop() || 'Workspace')
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
    if (fullPath) openWithTerminal(fullPath, name)
  }

  const handleRecent = (ws: { path: string; name: string }) => {
    openWithTerminal(ws.path, ws.name)
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

            <div className="main-menu-card">
              <span className="mm-icon">+</span>
              <span className="mm-title">Create New Workspace</span>

              <div className="mm-path-row">
                <span className="mm-path-label">Parent directory</span>
                <div className="mm-path-input-row">
                  <input
                    className="mm-input path"
                    placeholder="C:\Users\ianda\Projects"
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

              {parentDir && projectName.trim() && (
                <div className="mm-path-preview">
                  <span className="mm-preview-icon">▦</span>
                  <span className="mm-preview-path">{parentDir}\{projectName.trim()}</span>
                </div>
              )}

              <button
                className="mm-create-btn full"
                disabled={!parentDir || !projectName.trim()}
                onClick={handleCreate}
              >
                Create Workspace
              </button>
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
