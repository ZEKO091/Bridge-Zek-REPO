import { create } from 'zustand'

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
}

interface TerminalStore {
  terminals: TerminalInstance[]
  addTerminal: (id: string) => void
  removeTerminal: (id: string) => void
  updateTerminal: (id: string, updates: Partial<TerminalInstance>) => void
  setCommand: (id: string, cmd: string) => void
}

export const useTerminalStore = create<TerminalStore>((set) => ({
  terminals: [],
  addTerminal: (id) =>
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
        },
      ],
    })),
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
