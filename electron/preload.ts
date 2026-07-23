import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  minimize: () => ipcRenderer.send('window:minimize'),
  maximize: () => ipcRenderer.send('window:maximize'),
  close: () => ipcRenderer.send('window:close'),

  createTerminal: () => ipcRenderer.invoke('terminal:create'),
  writeToTerminal: (id: string, data: string) => ipcRenderer.invoke('terminal:write', id, data),
  resizeTerminal: (id: string, cols: number, rows: number) => ipcRenderer.invoke('terminal:resize', id, cols, rows),
  killTerminal: (id: string) => ipcRenderer.invoke('terminal:kill', id),

  onTerminalData: (id: string, callback: (data: string) => void) => {
    const c = `terminal:data:${id}`; const h = (_e: any, d: string) => callback(d)
    ipcRenderer.on(c, h); return () => ipcRenderer.removeListener(c, h)
  },

  onTerminalExit: (id: string, callback: () => void) => {
    const c = `terminal:exit:${id}`; const h = () => callback()
    ipcRenderer.on(c, h); return () => ipcRenderer.removeListener(c, h)
  },

  onTerminalStats: (id: string, callback: (stats: { ram: number }) => void) => {
    const c = `terminal:stats:${id}`; const h = (_e: any, s: { ram: number }) => callback(s)
    ipcRenderer.on(c, h); return () => ipcRenderer.removeListener(c, h)
  },

  onSystemMetrics: (callback: (metrics: { cpu: number; gpu: number | null; gpuName: string; ram: number; ramGB: number; ramTotal: string }) => void) => {
    const h = (_e: any, m: any) => callback(m)
    ipcRenderer.on('system:metrics', h); return () => ipcRenderer.removeListener('system:metrics', h)
  },

  onSystemTools: (callback: (tools: any[]) => void) => {
    const h = (_e: any, t: any[]) => callback(t)
    ipcRenderer.on('system:tools', h); return () => ipcRenderer.removeListener('system:tools', h)
  },

  getSystemTools: () => ipcRenderer.invoke('system:getTools'),
  runShell: (cmd: string) => ipcRenderer.invoke('shell:run', cmd),
  openFolderDialog: () => ipcRenderer.invoke('dialog:openFolder'),
  createFolderDialog: (name: string) => ipcRenderer.invoke('dialog:createFolder', name),
  pickParentFolder: () => ipcRenderer.invoke('dialog:pickParent'),
  createFolderAt: (parent: string, name: string) => ipcRenderer.invoke('dialog:createFolderAt', parent, name),

  // ── Auto Update ──
  checkUpdate: () => ipcRenderer.invoke('update:check'),
  downloadUpdate: () => ipcRenderer.invoke('update:download'),
  installUpdate: () => ipcRenderer.invoke('update:install'),

  onUpdateStatus: (callback: (status: string) => void) => {
    const h = (_e: any, s: string) => callback(s)
    ipcRenderer.on('update:status', h); return () => ipcRenderer.removeListener('update:status', h)
  },

  onUpdateAvailable: (callback: (info: { version: string; releaseDate: string; releaseNotes: string }) => void) => {
    const h = (_e: any, i: any) => callback(i)
    ipcRenderer.on('update:available', h); return () => ipcRenderer.removeListener('update:available', h)
  },

  onUpdateProgress: (callback: (progress: { percent: number; bytesPerSecond: number; transferred: number; total: number }) => void) => {
    const h = (_e: any, p: any) => callback(p)
    ipcRenderer.on('update:progress', h); return () => ipcRenderer.removeListener('update:progress', h)
  },

  onUpdateDownloaded: (callback: () => void) => {
    const h = () => callback()
    ipcRenderer.on('update:downloaded', h); return () => ipcRenderer.removeListener('update:downloaded', h)
  },

  onUpdateError: (callback: (err: string) => void) => {
    const h = (_e: any, e: string) => callback(e)
    ipcRenderer.on('update:error', h); return () => ipcRenderer.removeListener('update:error', h)
  },
  listDir: (dir: string) => ipcRenderer.invoke('fs:listDir', dir),
  readFile: (file: string) => ipcRenderer.invoke('fs:readFile', file),
  writeFile: (file: string, content: string) => ipcRenderer.invoke('fs:writeFile', file, content),
  getFileInfo: (p: string) => ipcRenderer.invoke('fs:getInfo', p),
  saveTerminalHistory: (wsPath: string, termId: string, data: string) => ipcRenderer.invoke('fs:saveTerminalHistory', wsPath, termId, data),
  loadTerminalHistory: (wsPath: string, termId: string) => ipcRenderer.invoke('fs:loadTerminalHistory', wsPath, termId),
  wsSave: (key: string, data: any) => ipcRenderer.invoke('ws:save', key, data),
  wsLoad: (key: string) => ipcRenderer.invoke('ws:load', key),
  wsDelete: (key: string) => ipcRenderer.invoke('ws:delete', key),
  // ── Auth ──
  authSignup: (username: string, email: string, password: string) => ipcRenderer.invoke('auth:signup', username, email, password),
  authLogin: (email: string, password: string) => ipcRenderer.invoke('auth:login', email, password),
  authVerify: (token: string) => ipcRenderer.invoke('auth:verify', token),
})
