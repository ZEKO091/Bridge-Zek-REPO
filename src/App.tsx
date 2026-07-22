import { useEffect } from 'react'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import Workspace from './components/Workspace'
import AIPanel from './components/AIPanel'
import CityBackground from './components/CityBackground'
import TitleBar from './components/TitleBar'
import UpdateNotification from './components/UpdateNotification'
import MainMenu from './components/MainMenu'
import FileExplorer from './components/FileExplorer'
import DashboardView from './components/DashboardView'
import AgentsView from './components/AgentsView'
import MemoryView from './components/MemoryView'
import { useAppStore } from './store/appStore'
import { useWorkspaceStore } from './store/workspaceStore'
import { useTerminalStore } from './store/terminalStore'

function MainView() {
  const view = useAppStore((s) => s.view)
  switch (view) {
    case 'files': return <FileExplorer />
    case 'dashboard': return <DashboardView />
    case 'agents': return <AgentsView />
    case 'memory': return <MemoryView />
    case 'models':
    case 'analytics':
    case 'settings':
    case 'git':
    case 'workspaces':
    default: return <Workspace />
  }
}

export default function App() {
  const notification = useAppStore((s) => s.notification)
  const current = useWorkspaceStore((s) => s.current)
  const addTerminal = useTerminalStore((s) => s.addTerminal)
  const terminals = useTerminalStore((s) => s.terminals)

  // Restore terminals when workspace loads with saved terminalCount
  useEffect(() => {
    if (current && terminals.length === 0 && current.terminalCount && current.terminalCount > 0) {
      const restore = async () => {
        for (let i = 0; i < (current.terminalCount || 1); i++) {
          try {
            const id = await window.electronAPI.createTerminal()
            addTerminal(id)
          } catch {}
        }
      }
      restore()
    }
  }, [current?.path])

  if (!current) {
    return (
      <div className="app-container">
        <CityBackground />
        <div className="app-overlay">
          <UpdateNotification />
          <TitleBar />
          <MainMenu />
        </div>
      </div>
    )
  }

  return (
    <div className="app-container">
      <CityBackground />
      <div className="app-overlay">
        <UpdateNotification />
        <TitleBar />
        <TopBar />
        <div className="app-body">
          <Sidebar />
          <MainView />
          <AIPanel />
        </div>
        {notification && <div className="toast-notification">{notification}</div>}
      </div>
    </div>
  )
}
