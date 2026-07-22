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
  const addTerminal = useTerminalStore((s) => s.addTerminal)
  const terminals = useTerminalStore((s) => s.terminals)

  const handleClick = async (item: typeof navItems[0]) => {
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
