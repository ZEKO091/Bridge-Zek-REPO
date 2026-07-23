import { useState, useEffect } from 'react'
import { useAppStore, View } from '../store/appStore'
import { useTerminalStore } from '../store/terminalStore'
import { useWorkspaceStore } from '../store/workspaceStore'
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
  const activeSubId = useWorkspaceStore((s) => s.activeSubId)
  const [user, setUser] = useState<{ username: string; email: string } | null>(null)
  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('zek-bridge:auth-user')
      if (stored) setUser(JSON.parse(stored))
    } catch {}
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('zek-bridge:auth-user')
    localStorage.removeItem('zek-bridge:auth-token')
    window.location.reload()
  }

  const handleClick = async (item: typeof navItems[0]) => {
    setView(item.view)
    if (item.view === 'powershells' && terminals.length === 0) {
      try {
        const id = await window.electronAPI.createTerminal()
        addTerminal(id, activeSubId || undefined)
      } catch {}
    }
  }

  return (
    <div className="sidebar">
      {/* Account section */}
      <div style={{padding:'8px 6px 4px',borderBottom:'1px solid rgba(255,255,255,0.05)',marginBottom:4,position:'relative'}}>
        <button
          onClick={() => setShowMenu(!showMenu)}
          style={{width:'100%',display:'flex',flexDirection:'column',alignItems:'center',gap:2,padding:'4px 0',background:'none',border:'none',cursor:'pointer',color:'var(--text-muted)',fontFamily:'inherit'}}
          title={user?.email || 'Account'}
        >
          <div style={{width:28,height:28,borderRadius:'50%',background:'linear-gradient(135deg,var(--glow-cyan),var(--glow-purple))',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:700,color:'var(--bg-primary)',marginBottom:2}}>
            {user?.username?.charAt(0).toUpperCase() || '?'}
          </div>
          <span style={{fontSize:8,letterSpacing:'0.3px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',maxWidth:'52px'}}>{user?.username || 'Account'}</span>
        </button>

        {showMenu && (
          <>
            <div style={{position:'fixed',inset:0,zIndex:99}} onClick={() => setShowMenu(false)} />
            <div style={{position:'absolute',left:64,top:0,zIndex:100,background:'rgba(20,25,35,0.95)',backdropFilter:'blur(16px)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:12,padding:8,width:160,display:'flex',flexDirection:'column',gap:2}}>
              <div style={{padding:'6px 10px',fontSize:11,color:'var(--text-primary)',fontWeight:600}}>{user?.username || 'User'}</div>
              <div style={{padding:'0 10px 6px',fontSize:9,color:'var(--text-muted)',borderBottom:'1px solid rgba(255,255,255,0.04)'}}>{user?.email || ''}</div>
              <button onClick={() => { setShowMenu(false); setView('dashboard') }} style={{display:'flex',alignItems:'center',gap:6,padding:'6px 10px',background:'none',border:'none',borderRadius:6,cursor:'pointer',color:'var(--text-secondary)',fontFamily:'inherit',fontSize:11,textAlign:'left',width:'100%'}}>
                <I.IconDashboard size={14} /> Dashboard
              </button>
              <button onClick={() => { setShowMenu(false) }} style={{display:'flex',alignItems:'center',gap:6,padding:'6px 10px',background:'none',border:'none',borderRadius:6,cursor:'pointer',color:'var(--text-muted)',fontFamily:'inherit',fontSize:11,textAlign:'left',width:'100%'}}>
                <I.IconSettings size={14} /> Settings
              </button>
              <div style={{borderTop:'1px solid rgba(255,255,255,0.04)',margin:'4px 0 2px'}} />
              <button onClick={handleLogout} style={{display:'flex',alignItems:'center',gap:6,padding:'6px 10px',background:'none',border:'none',borderRadius:6,cursor:'pointer',color:'#EF4444',fontFamily:'inherit',fontSize:11,textAlign:'left',width:'100%'}}>
                <I.IconClose size={14} /> Logout
              </button>
            </div>
          </>
        )}
      </div>

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
