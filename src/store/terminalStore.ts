import { create } from 'zustand'

export const MAX_TERMINALS = 12

export interface TerminalInstance {
  id: string
  name: string
  status: 'starting' | 'running' | 'stopped'
  runningCommand: string
  cpu: number
  ram: number
  runtime: number
  tokenCount: number
  createdAt: number
  subWorkspaceId?: string
}

interface TerminalStore {
  terminals: TerminalInstance[]
  addTerminal: (id: string) => boolean
  removeTerminal: (id: string) => void
  updateTerminal: (id: string, updates: Partial<TerminalInstance>) => void
  setCommand: (id: string, cmd: string) => void
}

export const useTerminalStore = create<TerminalStore>((set, get) => ({
  terminals: [],
  addTerminal: (id, subWorkspaceId?: string) => {
    const state = get()
    if (state.terminals.length >= MAX_TERMINALS) return false
    set((state) => ({
      terminals: [
        ...state.terminals,
        {
          id,
          name: `Agent ${state.terminals.length + 1}`,
          status: 'starting',
          runningCommand: '',
          cpu: 0,
          ram: 0,
          runtime: 0,
          tokenCount: 0,
          createdAt: Date.now(),
          subWorkspaceId,
        },
      ],
    }))
    return true
  },
  removeTerminal: (id) =>
    set((state) => ({
      terminals: state.terminals.filter((t) => t.id !== id),
    })),
  updateTerminal: (id, updates) =>
    set((state) => ({
      terminals: state.terminals.map((t) =>
        t.id === id ? { ...t, ...updates } : t
      ),
    })),
  setCommand: (id, cmd) =>
    set((state) => ({
      terminals: state.terminals.map((t) =>
        t.id === id ? { ...t, runningCommand: cmd } : t
      ),
    })),
}))

export function canAddTerminal(): boolean {
  return useTerminalStore.getState().terminals.length < MAX_TERMINALS
}

export const MAX_ERROR = `Maximum number of active agents reached (${MAX_TERMINALS}). Close an existing agent before creating a new one.`

export function notifyMaxTerminals() {
  const { useAppStore } = require('./appStore')
  useAppStore.getState().notify(MAX_ERROR)
}
