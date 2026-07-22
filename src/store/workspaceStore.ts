import { create } from 'zustand'

export interface Workspace {
  path: string
  name: string
  openedAt: number
}

interface WorkspaceStore {
  current: Workspace | null
  recent: Workspace[]
  lastSaved: number | null
  setWorkspace: (w: Workspace) => void
  closeWorkspace: () => void
}

const RECENT_KEY = 'zek-bridge:recent'
const CURRENT_KEY = 'zek-bridge:current'

function loadRecent(): Workspace[] {
  try { return JSON.parse(localStorage.getItem(RECENT_KEY) || '[]') } catch { return [] }
}

function loadCurrent(): Workspace | null {
  try { return JSON.parse(localStorage.getItem(CURRENT_KEY) || 'null') } catch { return null }
}

function saveRecent(recent: Workspace[]) {
  localStorage.setItem(RECENT_KEY, JSON.stringify(recent.slice(0, 10)))
}

function saveCurrent(w: Workspace | null) {
  if (w) localStorage.setItem(CURRENT_KEY, JSON.stringify(w))
  else localStorage.removeItem(CURRENT_KEY)
}

export const useWorkspaceStore = create<WorkspaceStore>((set) => ({
  current: loadCurrent(),
  recent: loadRecent(),
  lastSaved: Date.now(),
  setWorkspace: (w) => {
    const recent = loadRecent().filter((r) => r.path !== w.path)
    recent.unshift(w)
    saveRecent(recent)
    saveCurrent(w)
    set({ current: w, recent, lastSaved: Date.now() })
  },
  closeWorkspace: () => {
    saveCurrent(null)
    set({ current: null, lastSaved: Date.now() })
  },
}))
