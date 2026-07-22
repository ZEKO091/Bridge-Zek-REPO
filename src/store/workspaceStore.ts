import { create } from 'zustand'

export interface Workspace {
  path: string
  name: string
  openedAt: number
  terminalCount?: number
}

interface WorkspaceStore {
  current: Workspace | null
  recent: Workspace[]
  lastSaved: number | null
  setWorkspace: (w: Workspace, termCount?: number) => void
  closeWorkspace: () => void
}

const RECENT_KEY = 'zek-bridge:recent'
const CURRENT_KEY = 'zek-bridge:current'

function loadLocal(key: string): any {
  try { return JSON.parse(localStorage.getItem(key) || 'null') } catch { return null }
}
function saveLocal(key: string, data: any) {
  try { localStorage.setItem(key, JSON.stringify(data)) } catch {}
}

export const useWorkspaceStore = create<WorkspaceStore>((set) => ({
  current: loadLocal(CURRENT_KEY),
  recent: loadLocal(RECENT_KEY) || [],
  lastSaved: Date.now(),
  setWorkspace: (w, termCount) => {
    const data = { ...w, terminalCount: termCount || w.terminalCount || 1 }
    const recent = (loadLocal(RECENT_KEY) || []).filter((r: Workspace) => r.path !== w.path)
    recent.unshift(data)
    saveLocal(RECENT_KEY, recent.slice(0, 10))
    saveLocal(CURRENT_KEY, data)
    // Also save to disk (survives app updates)
    window.electronAPI.wsSave('current', data)
    window.electronAPI.wsSave('recent', recent.slice(0, 10))
    set({ current: data, recent, lastSaved: Date.now() })
  },
  closeWorkspace: () => {
    localStorage.removeItem(CURRENT_KEY)
    window.electronAPI.wsDelete('current')
    set({ current: null, lastSaved: Date.now() })
  },
}))

// Restore from disk if localStorage was cleared (e.g. after update)
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
