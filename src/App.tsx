import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import Workspace from './components/Workspace'
import AIPanel from './components/AIPanel'
import CityBackground from './components/CityBackground'
import TitleBar from './components/TitleBar'
import UpdateNotification from './components/UpdateNotification'
import MainMenu from './components/MainMenu'
import { useAppStore } from './store/appStore'
import { useWorkspaceStore } from './store/workspaceStore'

export default function App() {
  const notification = useAppStore((s) => s.notification)
  const current = useWorkspaceStore((s) => s.current)

  if (!current) {
    return (
      <div className="app-container">
        <CityBackground />
        <div className="app-overlay">
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
          <Workspace />
          <AIPanel />
        </div>
        {notification && <div className="toast-notification">{notification}</div>}
      </div>
    </div>
  )
}
