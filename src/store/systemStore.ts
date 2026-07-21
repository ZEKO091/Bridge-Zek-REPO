import { create } from 'zustand'

interface SysMetrics {
  cpu: number; gpu: number | null; gpuName: string; ram: number; ramGB: number; ramTotal: string
}

interface DetectedTool {
  name: string; version: string; path: string; installed: boolean
}

interface SystemStore {
  cpu: number
  gpu: number | null
  gpuName: string
  ram: number
  ramGB: number
  ramTotal: string
  tools: DetectedTool[]
  setMetrics: (m: SysMetrics) => void
  setTools: (t: DetectedTool[]) => void
}

export const useSystemStore = create<SystemStore>((set) => ({
  cpu: 0,
  gpu: null,
  gpuName: 'Unknown',
  ram: 0,
  ramGB: 0,
  ramTotal: '0',
  tools: [],
  setMetrics: (m) => set({ cpu: m.cpu, gpu: m.gpu, gpuName: m.gpuName, ram: m.ram, ramGB: m.ramGB, ramTotal: m.ramTotal }),
  setTools: (t) => set({ tools: t }),
}))
