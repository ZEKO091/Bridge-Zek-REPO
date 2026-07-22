interface SystemMetrics {
  cpu: number; gpu: number | null; gpuName: string; ram: number; ramGB: number; ramTotal: string
}
interface DetectedTool { name: string; version: string; path: string; installed: boolean }
interface TerminalStats { ram: number }
interface UpdateInfo { version: string; releaseDate: string; releaseNotes: string }
interface UpdateProgress { percent: number; bytesPerSecond: number; transferred: number; total: number }

interface ElectronAPI {
  minimize: () => void
  maximize: () => void
  close: () => void
  createTerminal: () => Promise<string>
  writeToTerminal: (id: string, data: string) => Promise<void>
  resizeTerminal: (id: string, cols: number, rows: number) => Promise<void>
  killTerminal: (id: string) => Promise<void>
  onTerminalData: (id: string, callback: (data: string) => void) => () => void
  onTerminalExit: (id: string, callback: () => void) => () => void
  onTerminalStats: (id: string, callback: (stats: TerminalStats) => void) => () => void
  onSystemMetrics: (callback: (metrics: SystemMetrics) => void) => () => void
  onSystemTools: (callback: (tools: DetectedTool[]) => void) => () => void
  getSystemTools: () => Promise<DetectedTool[]>
  runShell: (cmd: string) => Promise<string>
  openFolderDialog: () => Promise<string | null>
  createFolderDialog: (name: string) => Promise<string | null>
  pickParentFolder: () => Promise<string | null>
  createFolderAt: (parent: string, name: string) => Promise<string | null>
  checkUpdate: () => Promise<void>
  downloadUpdate: () => Promise<void>
  installUpdate: () => Promise<void>
  onUpdateStatus: (callback: (status: string) => void) => () => void
  onUpdateAvailable: (callback: (info: UpdateInfo) => void) => () => void
  onUpdateProgress: (callback: (progress: UpdateProgress) => void) => () => void
  onUpdateDownloaded: (callback: () => void) => () => void
  onUpdateError: (callback: (err: string) => void) => () => void
}

declare global {
  interface Window { electronAPI: ElectronAPI }
}

export {}
