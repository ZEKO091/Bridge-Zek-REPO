import { useAppStore, View } from '../store/appStore'
import { useTerminalStore } from '../store/terminalStore'
import * as I from './Icons'

const navItems: { icon: (size: number) => JSX.Element; label: string; view: View }[] = [
  { icon: (s) => <I.IconDashboard size={s}/>, label: 'Dashboard', view: 'dashboard' },
  { icon: (s) => <I.IconWorkspaces size={s}/>, label: 'Workspaces', view: 'workspaces' },
  { icon: (s) => <I.IconTerminal size={s}/>, label: 'PowerShells', view: 'powershells' },
  { icon: (s) => <I.IconAgent size={s}/>, label: 'Agents', view: 'agents' },
  { icon: (s) => <I.IconModel size={s}/>, label: 'Models', view: 'models' },
  { icon: (s) => <I.IconMemory size={s}/>, label: 'Memory', view: 'memory' },
  { icon: (s) => <I.IconFolder size={s}/>, label: 'Files', view: 'files' },
  { icon: (s) => <I.IconGit size={s}/>, label: 'Git', view: 'git' },
  { icon: (s) => <I.IconAnalytics size={s}/>, label: 'Analytics', view: 'analytics' },
  { icon: (s) => <I.IconSettings size={s}/>, label: 'Settings', view: 'settings' },
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
            <span className="sidebar-icon">{item.icon(18)}</span>
            <span className="sidebar-label">{item.label}</span>
            {view === item.view && <span className="sidebar-indicator" />}
          </button>
        ))}
      </div>
    </div>
  )
}
