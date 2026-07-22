import { create } from 'zustand'

export interface Workspace {
  path: string
  name: string
  openedAt: number
}

interface WorkspaceStore {
  current: Workspace | null
  recent: Workspace[]
  setWorkspace: (w: Workspace) => void
  closeWorkspace: () => void
}

const STORAGE_KEY = 'zek-bridge:recent'

function loadRecent(): Workspace[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') } catch { return [] }
}

function saveRecent(recent: Workspace[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recent.slice(0, 10)))
}

export const useWorkspaceStore = create<WorkspaceStore>((set) => ({
  current: null,
  recent: loadRecent(),
  setWorkspace: (w) => {
    const recent = loadRecent().filter((r) => r.path !== w.path)
    recent.unshift(w)
    saveRecent(recent)
    set({ current: w, recent })
  },
  closeWorkspace: () => set({ current: null }),
}))
