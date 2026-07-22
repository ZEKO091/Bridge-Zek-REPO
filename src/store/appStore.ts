import { create } from 'zustand'

export type View = 'dashboard' | 'workspaces' | 'powershells' | 'agents' | 'models' | 'memory' | 'files' | 'git' | 'analytics' | 'settings'

interface AppStore {
  view: View
  setView: (v: View) => void
  notification: string | null
  notify: (msg: string) => void
  clearNotification: () => void
  menuOpen: boolean
  closeMenu: () => void
}

export const useAppStore = create<AppStore>((set) => ({
  view: 'powershells',
  setView: (v) => set({ view: v }),
  notification: null,
  notify: (msg) => { set({ notification: msg }); setTimeout(() => set({ notification: null }), 3000) },
  clearNotification: () => set({ notification: null }),
  menuOpen: true,
  closeMenu: () => set({ menuOpen: false }),
}))
