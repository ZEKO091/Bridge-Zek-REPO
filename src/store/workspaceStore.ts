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

function loadRecent(): Workspace[] {
  try { return JSON.parse(localStorage.getItem(RECENT_KEY) || '[]') } catch { return [] }
}

function loadCurrent(): Workspace | null {
  try { return JSON.parse(localStorage.getItem(CURRENT_KEY) || 'null') } catch { return null }
}

export const useWorkspaceStore = create<WorkspaceStore>((set) => ({
  current: loadCurrent(),
  recent: loadRecent(),
  lastSaved: Date.now(),
  setWorkspace: (w, termCount) => {
    const data = { ...w, terminalCount: termCount || w.terminalCount || 1 }
    const recent = loadRecent().filter((r) => r.path !== w.path)
    recent.unshift(data)
    localStorage.setItem(RECENT_KEY, JSON.stringify(recent.slice(0, 10)))
    localStorage.setItem(CURRENT_KEY, JSON.stringify(data))
    set({ current: data, recent, lastSaved: Date.now() })
  },
  closeWorkspace: () => {
    localStorage.removeItem(CURRENT_KEY)
    set({ current: null, lastSaved: Date.now() })
  },
}))
