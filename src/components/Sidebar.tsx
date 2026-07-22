import { useAppStore, View } from '../store/appStore'
import { useTerminalStore } from '../store/terminalStore'

const navItems: { icon: string; label: string; view: View }[] = [
  { icon: '⊞', label: 'Dashboard', view: 'dashboard' },
  { icon: '▦', label: 'Workspaces', view: 'workspaces' },
  { icon: '〉', label: 'PowerShells', view: 'powershells' },
  { icon: '◈', label: 'Agents', view: 'agents' },
  { icon: '◇', label: 'Models', view: 'models' },
  { icon: '☰', label: 'Memory', view: 'memory' },
  { icon: '🗁', label: 'Files', view: 'files' },
  { icon: '⑂', label: 'Git', view: 'git' },
  { icon: '📊', label: 'Analytics', view: 'analytics' },
  { icon: '⚙', label: 'Settings', view: 'settings' },
]

export default function Sidebar() {
  const view = useAppStore((s) => s.view)
  const setView = useAppStore((s) => s.setView)
  const notify = useAppStore((s) => s.notify)
  const terminals = useTerminalStore((s) => s.terminals)
  const addTerminal = useTerminalStore((s) => s.addTerminal)

  const handleClick = async (item: typeof navItems[0]) => {
    if (item.view === 'powershells') {
      setView('powershells')
    } else if (item.view === 'files') {
      setView('files')
      notify('Files: open File Explorer to manage project files')
    } else if (item.view === 'git') {
      notify('Git: use terminal to run git commands')
    } else if (item.view === 'agents') {
      const tools = await window.electronAPI.getSystemTools()
      const installed = tools.filter((t: any) => t.installed).map((t: any) => t.name)
      notify(`Detected: ${installed.join(', ')}`)
    } else if (item.view === 'memory') {
      setView('powershells')
      notify('RAM usage shown in top bar metrics')
    } else if (item.view === 'analytics') {
      notify(`System: ${navigator.platform} | Cores: ${navigator.hardwareConcurrency}`)
    } else if (item.view === 'dashboard') {
      const tools = await window.electronAPI.getSystemTools()
      const count = tools.filter((t: any) => t.installed).length
      notify(`ZEK BRIDGE • ${terminals.length} terminals • ${count} tools detected`)
    } else if (item.view === 'workspaces') {
      notify('All terminals shown in Bridge Lab workspace')
    } else if (item.view === 'models') {
      notify('Check installed AI models in terminal: ollama list')
    } else if (item.view === 'settings') {
      notify('Settings: coming soon')
    }
    setView(item.view)
    if (item.view === 'powershells' && terminals.length === 0) {
      try {
        const id = await window.electronAPI.createTerminal()
        addTerminal(id)
      } catch {}
    }
  }

  return (
    <div className="sidebar">
      <div className="sidebar-nav">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`sidebar-item ${view === item.view ? 'active' : ''}`}
            onClick={() => handleClick(item)}
            title={item.label}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
            {view === item.view && <span className="sidebar-indicator" />}
          </button>
        ))}
      </div>
    </div>
  )
}
