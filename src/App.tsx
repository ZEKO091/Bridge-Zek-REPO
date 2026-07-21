import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import Workspace from './components/Workspace'
import AIPanel from './components/AIPanel'
import CityBackground from './components/CityBackground'
import TitleBar from './components/TitleBar'
import UpdateNotification from './components/UpdateNotification'

export default function App() {
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
      </div>
    </div>
  )
}
