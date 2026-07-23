import DetectedTools from './DetectedTools'
import SubWorkspacePanel from './SubWorkspacePanel'
import { useTerminalStore, canAddTerminal, notifyMaxTerminals } from '../store/terminalStore'
import * as I from './Icons'

const quickCmds = ['node --version', 'npm start', 'python --version', 'dir', 'cd ~', 'ipconfig', 'systeminfo', 'whoami']

export default function AIPanel() {
  const addTerminal = useTerminalStore((s) => s.addTerminal)

  const runCommand = async (cmd: string) => {
    if (!canAddTerminal()) { notifyMaxTerminals(); return }
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
        <div className="ai-section" style={{padding:0,background:'none',border:'none'}}>
          <SubWorkspacePanel />
        </div>
        <div className="ai-section">
          <DetectedTools />
        </div>
        <div className="ai-section">
          <div className="ai-section-title">
            <I.IconTerminal size={14} className="ai-section-icon" />
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
            <I.IconModel size={14} className="ai-section-icon" />
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
