export default function TitleBar() {
  return (
    <div className="title-bar">
      <div className="title-bar-drag">
        <div className="title-bar-brand">
          <img src="/icon.png" className="title-bar-logo" alt="" style={{objectFit:'cover'}} />
          <span className="title-bar-text">ZEK BRIDGE</span>
          <span className="title-bar-version">v1.1.0</span>
        </div>
      </div>
      <div className="title-bar-actions">
        <button className="title-btn" onClick={() => window.electronAPI.minimize()}>
          <svg width="12" height="12" viewBox="0 0 12 12"><rect y="5" width="12" height="2" fill="currentColor"/></svg>
        </button>
        <button className="title-btn" onClick={() => window.electronAPI.maximize()}>
          <svg width="12" height="12" viewBox="0 0 12 12"><rect x="1" y="1" width="10" height="10" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg>
        </button>
        <button className="title-btn title-btn-close" onClick={() => window.electronAPI.close()}>
          <svg width="12" height="12" viewBox="0 0 12 12"><line x1="1" y1="1" x2="11" y2="11" stroke="currentColor" strokeWidth="1.5"/><line x1="11" y1="1" x2="1" y2="11" stroke="currentColor" strokeWidth="1.5"/></svg>
        </button>
      </div>
    </div>
  )
}









