const navItems = [
  { icon: '⊞', label: 'Dashboard', active: false },
  { icon: '▦', label: 'Workspaces', active: false },
  { icon: '〉', label: 'PowerShells', active: true },
  { icon: '◈', label: 'Agents', active: false },
  { icon: '◇', label: 'Models', active: false },
  { icon: '☰', label: 'Memory', active: false },
  { icon: '🗁', label: 'Files', active: false },
  { icon: '⑂', label: 'Git', active: false },
  { icon: '📊', label: 'Analytics', active: false },
  { icon: '⚙', label: 'Settings', active: false },
]

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-nav">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`sidebar-item ${item.active ? 'active' : ''}`}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
            {item.active && <span className="sidebar-indicator" />}
          </button>
        ))}
      </div>
    </div>
  )
}
