import { useEffect } from 'react'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import Workspace from './components/Workspace'
import AIPanel from './components/AIPanel'
import TitleBar from './components/TitleBar'
import UpdateNotification from './components/UpdateNotification'
import MainMenu from './components/MainMenu'
import FileExplorer from './components/FileExplorer'
import DashboardView from './components/DashboardView'
import AgentsView from './components/AgentsView'
import MemoryView from './components/MemoryView'
import { useAppStore } from './store/appStore'
import { useWorkspaceStore } from './store/workspaceStore'
import { useTerminalStore, canAddTerminal } from './store/terminalStore'

const BG = { backgroundImage: 'url(/bg.png)', backgroundSize: 'cover' as const, backgroundPosition: 'center' as const, position: 'fixed' as const, top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }

function MainView() {
  const view = useAppStore((s) => s.view)
  switch (view) {
    case 'files': return <FileExplorer />
    case 'dashboard': return <DashboardView />
    case 'agents': return <AgentsView />
    case 'memory': return <MemoryView />
    default: return <Workspace />
  }
}

export default function App() {
  const notification = useAppStore((s) => s.notification)
  const menuOpen = useAppStore((s) => s.menuOpen)
  const current = useWorkspaceStore((s) => s.current)
  const addTerminal = useTerminalStore((s) => s.addTerminal)
  const terminals = useTerminalStore((s) => s.terminals)

  useEffect(() => {
    if (!menuOpen && current && terminals.length === 0 && current.terminalCount && current.terminalCount > 0) {
      const restore = async () => {
        for (let i = 0; i < Math.min(current.terminalCount || 1, 12); i++) {
          if (!canAddTerminal()) break
          try { const id = await window.electronAPI.createTerminal(); addTerminal(id) } catch {}
        }
      }
      restore()
    }
  }, [menuOpen, current?.path])

  return (
    <div className="app-container">
      <div style={BG} />
      <div className="app-overlay">
        <UpdateNotification />
        <TitleBar />
        {menuOpen || !current ? <MainMenu /> : (
          <>
            <TopBar />
            <div className="app-body">
              <Sidebar />
              <MainView />
              <AIPanel />
            </div>
          </>
        )}
        {notification && <div className="toast-notification">{notification}</div>}
      </div>
    </div>
  )
}
