import DetectedTools from './DetectedTools'

export default function AIPanel() {
  return (
    <div className="ai-panel">
      <div className="ai-panel-header">
        <h3>Bridge Console</h3>
        <div className="ai-panel-status">
          <span className="ai-status-dot" />
          <span>Live</span>
        </div>
      </div>
      <div className="ai-panel-content">
        <div className="ai-section">
          <DetectedTools />
        </div>
        <div className="ai-section">
          <div className="ai-section-title">
            <span className="ai-section-icon">⌘</span>
            <span>Quick Launch</span>
          </div>
          <div className="ai-suggestions">
            <button className="suggestion-btn" onClick={() => {
              const e = new KeyboardEvent('keydown', { key: 'Enter' })
              document.activeElement?.dispatchEvent(e)
            }}>node --version</button>
            <button className="suggestion-btn">npm start</button>
            <button className="suggestion-btn">python --version</button>
            <button className="suggestion-btn">dir</button>
            <button className="suggestion-btn">cd ~</button>
          </div>
        </div>
        <div className="ai-section">
          <div className="ai-section-title">
            <span className="ai-section-icon">☰</span>
            <span>System Info</span>
          </div>
          <div className="system-info-list">
            <div className="sys-info-item">
              <span className="sys-info-label">Platform</span>
              <span className="sys-info-value">{navigator.platform}</span>
            </div>
            <div className="sys-info-item">
              <span className="sys-info-label">Cores</span>
              <span className="sys-info-value">{navigator.hardwareConcurrency || '—'}</span>
            </div>
            <div className="sys-info-item">
              <span className="sys-info-label">Arch</span>
              <span className="sys-info-value">{navigator.userAgent.includes('x64') ? 'x64' : '—'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
