import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'

function browserFolderPicker(): Promise<string | null> {
  return new Promise((resolve) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.setAttribute('webkitdirectory', '')
    input.setAttribute('directory', '')
    input.style.display = 'none'
    input.addEventListener('change', () => {
      const path = (input as any).files?.[0]?.path
      if (path) {
        resolve(path.replace(/[^\\/]+$/, '').replace(/\\$/, ''))
      } else {
        resolve(input.value ? input.value.split('\\').slice(0, -1).join('\\').replace(/\\$/,'') || null : null)
      }
      input.remove()
    })
    input.addEventListener('cancel', () => { resolve(null); input.remove() })
    document.body.appendChild(input)
    input.click()
  })
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
    onSystemMetrics: (cb) => { setInterval(() => cb({ cpu: Math.round(Math.random()*100), gpu: Math.round(Math.random()*100), gpuName: 'Simulated GPU', ram: Math.round(Math.random()*100), ramGB: Math.random()*16, ramTotal: '16' }), 3000); return () => {} },
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
    readFile: async () => 'file content preview (browser mock)',
    getFileInfo: async () => null,
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
