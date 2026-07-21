import { useEffect, useState } from 'react'

interface Tool {
  name: string
  version: string
  installed: boolean
}

export default function DetectedTools() {
  const [tools, setTools] = useState<Tool[]>([])
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    window.electronAPI.getSystemTools().then(setTools)
    return window.electronAPI.onSystemTools(setTools)
  }, [])

  const installed = tools.filter((t) => t.installed)
  const notInstalled = tools.filter((t) => !t.installed)

  if (tools.length === 0) return null

  return (
    <div className="detected-tools">
      <div className="ai-section-title" onClick={() => setExpanded(!expanded)} style={{ cursor: 'pointer' }}>
        <span className="ai-section-icon">⬡</span>
        <span>Detected Tools ({installed.length}/{tools.length})</span>
        <span style={{ marginLeft: 'auto', fontSize: '10px', color: 'var(--text-muted)' }}>{expanded ? '▲' : '▼'}</span>
      </div>
      {expanded && (
        <div className="tools-grid">
          {installed.map((t) => (
            <div key={t.name} className="tool-chip installed" title={t.version}>
              <span className="tool-dot" />
              <span className="tool-name">{t.name}</span>
              <span className="tool-version">{t.version.split('\n')[0].slice(0, 20)}</span>
            </div>
          ))}
          {notInstalled.map((t) => (
            <div key={t.name} className="tool-chip missing">
              <span className="tool-dot missing" />
              <span className="tool-name">{t.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
