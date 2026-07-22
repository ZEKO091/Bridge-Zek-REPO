import { useAppStore } from '../store/appStore'

export default function SettingsView() {
  const notify = useAppStore((s) => s.notify)

  return (
    <div className="view-container">
      <div className="view-header"><h2>Settings</h2></div>
      <div style={{display:'flex',flexDirection:'column',gap:8}}>
        <div className="tv-card" style={{cursor:'pointer'}} onClick={() => { localStorage.clear(); notify('Local storage cleared') }}>
          <span style={{color:'var(--glow-cyan)',fontSize:16}}>🗑</span>
          <div><div className="tv-name">Clear Local Storage</div><div className="tv-ver">Reset app data (workspaces will reload from disk)</div></div>
        </div>
        <div className="tv-card" style={{cursor:'pointer'}} onClick={() => notify(`Platform: ${navigator.platform} | Cores: ${navigator.hardwareConcurrency} | GPU: check dashboard`)}>
          <span style={{color:'var(--glow-cyan)',fontSize:16}}>ℹ</span>
          <div><div className="tv-name">System Info</div><div className="tv-ver">View platform, hardware, and environment details</div></div>
        </div>
        <div className="tv-card" style={{cursor:'pointer'}} onClick={() => window.electronAPI.checkUpdate().then(() => notify('Checking for updates...'))}>
          <span style={{color:'var(--glow-cyan)',fontSize:16}}>⬇</span>
          <div><div className="tv-name">Check for Updates</div><div className="tv-ver">v1.0.13 — Check GitHub for new releases</div></div>
        </div>
      </div>
    </div>
  )
}
