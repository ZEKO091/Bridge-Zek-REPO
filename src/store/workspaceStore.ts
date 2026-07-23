import { create } from 'zustand'
import { useTerminalStore } from './terminalStore'

export interface SubWorkspace {
  id: string
  name: string
  terminalCount: number
  createdAt: number
}

export interface Workspace {
  path: string
  name: string
  openedAt: number
  terminalCount?: number
  subWorkspaces: SubWorkspace[]
}

interface WorkspaceStore {
  current: Workspace | null
  recent: Workspace[]
  lastSaved: number | null
  activeSubId: string | null
  setWorkspace: (w: Workspace, termCount?: number) => void
  closeWorkspace: () => void
  addSubWorkspace: (name: string) => void
  removeSubWorkspace: (id: string) => void
  renameSubWorkspace: (id: string, name: string) => void
  setActiveSub: (id: string | null) => void
}

const RECENT_KEY = 'zek-bridge:recent'
const CURRENT_KEY = 'zek-bridge:current'

function loadLocal(key: string): any {
  try { return JSON.parse(localStorage.getItem(key) || 'null') } catch { return null }
}
function saveLocal(key: string, data: any) {
  try { localStorage.setItem(key, JSON.stringify(data)) } catch {}
}

export const useWorkspaceStore = create<WorkspaceStore>((set, get) => ({
  current: loadLocal(CURRENT_KEY),
  recent: loadLocal(RECENT_KEY) || [],
  lastSaved: Date.now(),
  activeSubId: null,

  setWorkspace: (w, termCount) => {
    const data = { ...w, terminalCount: termCount || w.terminalCount || 1, subWorkspaces: w.subWorkspaces || [] }
    const recent = (loadLocal(RECENT_KEY) || []).filter((r: Workspace) => r.path !== w.path)
    recent.unshift(data)
    saveLocal(RECENT_KEY, recent.slice(0, 10))
    saveLocal(CURRENT_KEY, data)
    window.electronAPI.wsSave('current', data)
    window.electronAPI.wsSave('recent', recent.slice(0, 10))
    set({ current: data, recent, lastSaved: Date.now(), activeSubId: null })
  },

  closeWorkspace: () => {
    localStorage.removeItem(CURRENT_KEY)
    window.electronAPI.wsDelete('current')
    const termStore = useTerminalStore.getState()
    termStore.terminals.forEach(t => { try { window.electronAPI.killTerminal(t.id) } catch {} })
    termStore.terminals.forEach(t => termStore.removeTerminal(t.id))
    set({ current: null, lastSaved: Date.now(), activeSubId: null })
  },

  addSubWorkspace: (name) => {
    const cur = get().current
    if (!cur) return
    const sub: SubWorkspace = { id: `sub-${Date.now()}`, name, terminalCount: 2, createdAt: Date.now() }
    const updated = { ...cur, subWorkspaces: [...(cur.subWorkspaces || []), sub] }
    saveLocal(CURRENT_KEY, updated)
    window.electronAPI.wsSave('current', updated)
    set({ current: updated, lastSaved: Date.now(), activeSubId: sub.id })
  },

  removeSubWorkspace: (id) => {
    const cur = get().current
    if (!cur) return
    const updated = { ...cur, subWorkspaces: (cur.subWorkspaces || []).filter(s => s.id !== id) }
    saveLocal(CURRENT_KEY, updated)
    window.electronAPI.wsSave('current', updated)
    set({ current: updated, lastSaved: Date.now(), activeSubId: null })
  },

  renameSubWorkspace: (id, name) => {
    const cur = get().current
    if (!cur) return
    const updated = { ...cur, subWorkspaces: (cur.subWorkspaces || []).map(s => s.id === id ? { ...s, name } : s) }
    saveLocal(CURRENT_KEY, updated)
    window.electronAPI.wsSave('current', updated)
    set({ current: updated, lastSaved: Date.now() })
  },

  setActiveSub: (id) => set({ activeSubId: id }),
}))

// Restore from disk
window.electronAPI.wsLoad('current').then((disk: Workspace | null) => {
  if (disk && !loadLocal(CURRENT_KEY)) {
    saveLocal(CURRENT_KEY, disk)
    const recent = loadLocal(RECENT_KEY) || []
    if (!recent.find((r: Workspace) => r.path === disk.path)) {
      recent.unshift(disk)
      saveLocal(RECENT_KEY, recent.slice(0, 10))
    }
    useWorkspaceStore.setState({ current: disk, recent, lastSaved: Date.now() })
  }
})
