import { useState } from 'react'
import { useWorkspaceStore } from '../store/workspaceStore'
import { useTerminalStore } from '../store/terminalStore'
import * as I from './Icons'

export default function SubWorkspacePanel() {
  const current = useWorkspaceStore((s) => s.current)
  const activeSubId = useWorkspaceStore((s) => s.activeSubId)
  const addSub = useWorkspaceStore((s) => s.addSubWorkspace)
  const removeSub = useWorkspaceStore((s) => s.removeSubWorkspace)
  const renameSub = useWorkspaceStore((s) => s.renameSubWorkspace)
  const setActiveSub = useWorkspaceStore((s) => s.setActiveSub)
  const terminals = useTerminalStore((s) => s.terminals)
  const addTerminal = useTerminalStore((s) => s.addTerminal)

  const [newName, setNewName] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')

  const subs = current?.subWorkspaces || []
  const activeSub = subs.find(s => s.id === activeSubId) || null

  const handleAdd = async () => {
    const name = newName.trim() || `Sub-Workspace ${subs.length + 1}`
    addSub(name)
    setNewName('')
  }

  const handleLaunch = async (subId: string) => {
    const sub = subs.find(s => s.id === subId)
    if (!sub) return
    setActiveSub(subId)
    // Create terminals for this sub-workspace
    const existing = terminals.filter(t => t.subWorkspaceId === subId)
    for (let i = existing.length; i < sub.terminalCount; i++) {
      try {
        const id = await window.electronAPI.createTerminal()
        addTerminal(id, subId)
      } catch {}
    }
  }

  const handleRename = (id: string) => {
    if (editName.trim()) renameSub(id, editName.trim())
    setEditingId(null)
  }

  return (
    <div style={{padding:'0 16px 12px',borderBottom:'1px solid rgba(255,255,255,0.05)',display:'flex',flexDirection:'column',gap:6}}>
      <div style={{display:'flex',alignItems:'center',gap:6}}>
        <I.IconWorkspaces size={14} style={{color:'var(--glow-cyan)'}} />
        <span style={{fontSize:10,color:'var(--text-muted)',letterSpacing:1,textTransform:'uppercase'}}>Sub-Workspaces</span>
      </div>

      {subs.length === 0 && (
        <p style={{fontSize:10,color:'var(--text-muted)',fontStyle:'italic',padding:'2px 0'}}>No sub-workspaces yet</p>
      )}

      {subs.map(sub => (
        <div key={sub.id} style={{display:'flex',alignItems:'center',gap:4}}>
          <button
            onClick={() => handleLaunch(sub.id)}
            style={{
              flex:1,display:'flex',alignItems:'center',gap:5,padding:'4px 8px',textAlign:'left',
              background: activeSubId === sub.id ? 'rgba(0,229,255,0.08)' : 'rgba(255,255,255,0.02)',
              border: activeSubId === sub.id ? '1px solid rgba(0,229,255,0.15)' : '1px solid transparent',
              borderRadius:6,cursor:'pointer',color:'var(--text-secondary)',fontFamily:'inherit',fontSize:11
            }}
          >
            <span style={{fontSize:9}}>▦</span>
            {editingId === sub.id ? (
              <input
                autoFocus
                value={editName}
                onChange={e => setEditName(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleRename(sub.id); if (e.key === 'Escape') setEditingId(null) }}
                onBlur={() => handleRename(sub.id)}
                style={{flex:1,padding:'1px 4px',background:'rgba(0,0,0,0.3)',border:'1px solid rgba(0,229,255,0.2)',borderRadius:3,color:'#fff',fontSize:11,outline:'none'}}
              />
            ) : (
              <span style={{flex:1,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{sub.name}</span>
            )}
            <span style={{fontSize:9,color:'var(--text-muted)',marginLeft:'auto'}}>{terminals.filter(t=>t.subWorkspaceId===sub.id).length}/{sub.terminalCount}</span>
          </button>
          <button onClick={() => { setEditingId(sub.id); setEditName(sub.name) }} style={{background:'none',border:'none',color:'var(--text-muted)',cursor:'pointer',fontSize:9,padding:2}} title="Rename">✎</button>
          <button onClick={() => removeSub(sub.id)} style={{background:'none',border:'none',color:'var(--text-muted)',cursor:'pointer',fontSize:9,padding:2,opacity:0.5}} title="Remove">✕</button>
        </div>
      ))}

      <div style={{display:'flex',gap:4}}>
        <input
          value={newName}
          onChange={e => setNewName(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleAdd() }}
          placeholder="New sub-workspace..."
          style={{flex:1,padding:'4px 8px',background:'rgba(0,0,0,0.2)',border:'1px solid rgba(255,255,255,0.05)',borderRadius:5,color:'var(--text-primary)',fontFamily:'inherit',fontSize:10,outline:'none'}}
        />
        <button onClick={handleAdd} style={{padding:'4px 10px',background:'rgba(0,229,255,0.08)',border:'1px solid rgba(0,229,255,0.12)',borderRadius:5,color:'var(--glow-cyan)',cursor:'pointer',fontSize:10,fontFamily:'inherit'}}>+</button>
      </div>
    </div>
  )
}
