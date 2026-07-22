import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'

function browserFolderPicker(): Promise<string | null> {
  const p = prompt('Enter the full path to your workspace folder:\n(e.g. C:\\Users\\YourName\\Projects)')
  return Promise.resolve(p || null)
}

const termCbs: Map<string, { data: (d: string) => void; exit: () => void; stats: (s: { ram: number }) => void }> = new Map()

if (!window.electronAPI) {
  const mock: ElectronAPI = {
    minimize: () => {},
    maximize: () => {},
    close: () => {},
    createTerminal: async () => {
      const id = `term-mock-${Date.now()}`
      setTimeout(() => {
        const cb = termCbs.get(id)
        if (cb) {
          cb.data('Windows PowerShell\r\nCopyright (C) Microsoft Corporation. All rights reserved.\r\n\r\n')
          cb.stats({ ram: Math.round(Math.random() * 200 + 20) })
          setTimeout(() => cb.data('PS C:\\Users\\User> '), 100)
        }
      }, 300)
      return id
    },
    writeToTerminal: async () => {},
    resizeTerminal: async () => {},
    killTerminal: async (id) => { termCbs.delete(id); const cb = termCbs.get(id); cb?.exit() },
    onTerminalData: (id, cb) => { if (!termCbs.has(id)) termCbs.set(id, { data: cb, exit: () => {}, stats: () => {} }); const e = termCbs.get(id)!; e.data = cb; return () => {} },
    onTerminalExit: (id, cb) => { if (!termCbs.has(id)) termCbs.set(id, { data: () => {}, exit: cb, stats: () => {} }); const e = termCbs.get(id)!; e.exit = cb; return () => {} },
    onTerminalStats: (id, cb) => { if (!termCbs.has(id)) termCbs.set(id, { data: () => {}, exit: () => {}, stats: cb }); const e = termCbs.get(id)!; e.stats = cb; return () => {} },
    onSystemMetrics: (cb) => { const poll = async () => { try { const r = await fetch('/api/metrics'); if (r.ok) cb(await r.json()) } catch {} }; poll(); const id = setInterval(poll, 3000); return () => clearInterval(id) },
    onSystemTools: () => () => {},
    getSystemTools: async () => [
      { name: 'Node.js', version: 'v24.3.0', path: '', installed: true },
      { name: 'npm', version: '10.9.8', path: '', installed: true },
      { name: 'Python', version: '3.11.15', path: '', installed: true },
      { name: 'Git', version: '2.45.0', path: '', installed: true },
    ],
    runShell: async () => 'ok',
    openFolderDialog: async () => browserFolderPicker(),
    createFolderDialog: async (name) => { const p = await browserFolderPicker(); return p ? `${p}\\${name}` : null },
    pickParentFolder: async () => browserFolderPicker(),
    createFolderAt: async (parent, name) => `${parent}\\${name}`,
    listDir: async (dir) => {
      try {
        const r = await fetch(`/api/list?path=${encodeURIComponent(dir)}`)
        if (r.ok) return await r.json()
      } catch {}
      return []
    },
    readFile: async (f) => { try { const r = await fetch(`/api/read?file=${encodeURIComponent(f)}`); if (r.ok) return await r.text(); return 'mock content' } catch { return 'mock content' } },
    writeFile: async () => true,
    getFileInfo: async () => null,
    saveTerminalHistory: async () => true,
    loadTerminalHistory: async () => null,
    voiceStart: async () => { alert('Voice agent requires the desktop app'); return false },
    voiceStop: async () => true,
    voiceStatus: async () => false,
    wsSave: async () => true,
    wsLoad: async () => null,
    wsDelete: async () => true,
    onVoiceLog: () => () => {},
    onVoiceStopped: () => () => {},
    checkUpdate: async () => {},
    downloadUpdate: async () => {},
    installUpdate: async () => {},
    onUpdateStatus: () => () => {},
    onUpdateAvailable: () => () => {},
    onUpdateProgress: () => () => {},
    onUpdateDownloaded: () => () => {},
    onUpdateError: () => () => {},
  }
  window.electronAPI = mock
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
