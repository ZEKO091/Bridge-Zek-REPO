import DetectedTools from './DetectedTools'
import { useTerminalStore } from '../store/terminalStore'

const quickCmds = ['node --version', 'npm start', 'python --version', 'dir', 'cd ~', 'ipconfig', 'systeminfo', 'whoami']

export default function AIPanel() {
  const addTerminal = useTerminalStore((s) => s.addTerminal)

  const runCommand = async (cmd: string) => {
    try {
      const id = await window.electronAPI.createTerminal()
      addTerminal(id)
      setTimeout(async () => {
        await window.electronAPI.writeToTerminal(id, `${cmd}\r`)
      }, 200)
    } catch {}
  }

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
            {quickCmds.map((cmd) => (
              <button key={cmd} className="suggestion-btn" onClick={() => runCommand(cmd)}>
                {cmd}
              </button>
            ))}
          </div>
        </div>
        <div className="ai-section">
          <div className="ai-section-title">
            <span className="ai-section-icon">☰</span>
            <span>System Info</span>
          </div>
          <div className="system-info-list">
            <div className="sys-info-item" title={`Platform: ${navigator.platform}`}>
              <span className="sys-info-label">Platform</span>
              <span className="sys-info-value">{navigator.platform}</span>
            </div>
            <div className="sys-info-item" title={`CPU Cores: ${navigator.hardwareConcurrency}`}>
              <span className="sys-info-label">Cores</span>
              <span className="sys-info-value">{navigator.hardwareConcurrency || '—'}</span>
            </div>
            <div className="sys-info-item" title={`Architecture: ${navigator.userAgent.includes('x64') ? 'x64' : 'unknown'}`}>
              <span className="sys-info-label">Arch</span>
              <span className="sys-info-value">{navigator.userAgent.includes('x64') ? 'x64' : '—'}</span>
            </div>
          </div>
        </div>
        <div className="ai-section">
          <div className="ai-section-title" style={{ cursor: 'pointer' }} onClick={() => runCommand('help')}>
            <span className="ai-section-icon">⟳</span>
            <span>Run Command</span>
            <span className="ai-section-icon" style={{ marginLeft: 'auto', fontSize: '10px' }}>▶</span>
          </div>
          <div className="ai-queue-empty">Use Quick Launch or Ctrl+K search bar</div>
        </div>
      </div>
    </div>
  )
}
