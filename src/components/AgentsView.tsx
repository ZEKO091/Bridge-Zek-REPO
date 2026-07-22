import { useEffect, useState } from 'react'

interface Tool { name: string; version: string; installed: boolean }

export default function AgentsView() {
  const [tools, setTools] = useState<Tool[]>([])

  useEffect(() => {
    window.electronAPI.getSystemTools().then(setTools)
    return window.electronAPI.onSystemTools(setTools)
  }, [])

  const installed = tools.filter((t) => t.installed)
  const missing = tools.filter((t) => !t.installed)

  return (
    <div className="view-container">
      <div className="view-header">
        <h2>Agents & Tools</h2>
        <span className="workspace-badge">{installed.length} installed</span>
      </div>
      <div style={{ marginTop: 16 }}>
        <div className="dash-section-title">Available</div>
        <div className="tools-view-grid">
          {installed.map((t) => (
            <div key={t.name} className="tv-card">
              <span className="tv-dot" />
              <div>
                <div className="tv-name">{t.name}</div>
                <div className="tv-ver">{t.version}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ marginTop: 20 }}>
        <div className="dash-section-title">Not Detected</div>
        <div className="tools-view-grid">
          {missing.map((t) => (
            <div key={t.name} className="tv-card muted">
              <span className="tv-dot off" />
              <div>
                <div className="tv-name">{t.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
