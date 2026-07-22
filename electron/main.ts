import { app, BrowserWindow, ipcMain, dialog } from 'electron'
import path from 'path'
import fs from 'fs'
import { spawn, execSync } from 'child_process'
import os from 'os'
import { autoUpdater } from 'electron-updater'

let nodePty: any = null
try { nodePty = require('node-pty') } catch { console.warn('node-pty failed to load. Terminals fallback mode.') }

let mainWindow: BrowserWindow | null = null
const terminals: Map<string, any> = new Map()
let terminalCounter = 0

// ── Real system metrics ──
let cpuLoad = 0
let prevIdle = 0
let prevTotal = 0
let cpuCores = os.cpus().length

function pollCPU() {
  const cpus = os.cpus()
  let idle = 0, total = 0
  for (const cpu of cpus) {
    for (const type in cpu.times) {
      total += (cpu.times as any)[type]
    }
    idle += cpu.times.idle
  }
  if (prevTotal > 0) {
    const dIdle = idle - prevIdle
    const dTotal = total - prevTotal
    cpuLoad = Math.min(100, Math.max(0, Math.round(100 * (1 - dIdle / dTotal))))
  }
  prevIdle = idle
  prevTotal = total
}

let gpuName = 'Detecting...'
let gpuLoad: number | null = null
let gpuVendor = ''

function detectGPU() {
  try {
    const out = execSync('wmic path win32_VideoController get name,AdapterRAM /format:csv', { encoding: 'utf8', timeout: 3000 })
    const lines = out.split('\n').map(l => l.trim()).filter(l => l && !l.includes('Name') && !l.includes('Node'))
    if (lines.length > 0) {
      const parts = lines[0].split(',')
      const name = parts[parts.length - 2] || parts[0]
      gpuName = name
      gpuVendor = name.toLowerCase().includes('nvidia') ? 'nvidia' : 
                  name.toLowerCase().includes('amd') || name.toLowerCase().includes('radeon') ? 'amd' :
                  name.toLowerCase().includes('intel') ? 'intel' : 'other'
    }
  } catch {}
}

function pollGPU() {
  if (gpuVendor === 'nvidia') {
    try {
      const out = execSync('nvidia-smi --query-gpu=utilization.gpu --format=csv,noheader,nounits', { encoding: 'utf8', timeout: 2000 })
      gpuLoad = Math.min(100, Math.max(0, parseInt(out.trim()))) || 0
      return
    } catch {}
  }
  if (gpuVendor === 'amd') {
    try {
      const out = execSync('wmic path win32_PerfFormattedData_GPUPerformanceCounters_GPUEngine where "Name like \'%3D%\'" get PercentUtilization', { encoding: 'utf8', timeout: 2000 })
      const val = parseInt(out.trim().split('\n').filter(l => l.trim() && !l.includes('Percent'))[0])
      if (!isNaN(val)) { gpuLoad = Math.min(100, Math.max(0, val)); return }
    } catch {}
  }
  try {
    const out = execSync('wmic path win32_PerfFormattedData_GPUPerformanceCounters_GPUEngine get PercentUtilization', { encoding: 'utf8', timeout: 2000 })
    const val = parseInt(out.trim().split('\n').filter(l => l.trim() && !l.includes('Percent'))[0])
    if (!isNaN(val)) { gpuLoad = Math.min(100, Math.max(0, val)); return }
  } catch {}
  gpuLoad = null
}

// ── Tool detection ──
interface DetectedTool {
  name: string
  version: string
  path: string
  installed: boolean
}

let detectedTools: DetectedTool[] = []

function detectTools(): Promise<DetectedTool[]> {
  const checks = [
    { name: 'Node.js', cmd: 'node --version' },
    { name: 'npm', cmd: 'npm --version' },
    { name: 'Python', cmd: 'python --version' },
    { name: 'Python 3', cmd: 'python3 --version' },
    { name: 'Git', cmd: 'git --version' },
    { name: 'Ollama', cmd: 'ollama --version' },
    { name: 'PowerShell', cmd: 'pwsh --version' },
    { name: 'VS Code', cmd: 'code --version' },
    { name: 'Docker', cmd: 'docker --version' },
    { name: 'npx', cmd: 'npx --version' },
    { name: 'yarn', cmd: 'yarn --version' },
    { name: 'pnpm', cmd: 'pnpm --version' },
    { name: 'rustc', cmd: 'rustc --version' },
    { name: 'go', cmd: 'go version' },
    { name: 'FFmpeg', cmd: 'ffmpeg -version' },
  ]

  const results: DetectedTool[] = []

  return new Promise((resolve) => {
    let completed = 0
    for (const check of checks) {
      const child = spawn('cmd', ['/c', check.cmd], { windowsHide: true, timeout: 3000 })
      let stdout = ''
      let stderr = ''

      child.stdout?.on('data', (d) => { stdout += d.toString() })
      child.stderr?.on('data', (d) => { stderr += d.toString() })
      child.on('error', () => {
        results.push({ name: check.name, version: '', path: '', installed: false })
        completed++; if (completed === checks.length) resolve(results)
      })
      child.on('close', (code) => {
        const output = (stdout || stderr).trim()
        if (code === 0 && output) {
          const version = output.split('\n')[0].trim()
          results.push({ name: check.name, version, path: '', installed: true })
        } else {
          results.push({ name: check.name, version: '', path: '', installed: false })
        }
        completed++; if (completed === checks.length) resolve(results)
      })
    }
  })
}

// ── Window ──
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1600,
    height: 1000,
    minWidth: 1200,
    minHeight: 800,
    frame: false,
    transparent: true,
    backgroundColor: '#050608',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false,
    },
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL)
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'))
  }

  mainWindow.on('closed', () => { mainWindow = null })
}

// ── Auto Updater ──
autoUpdater.autoDownload = true
autoUpdater.autoInstallOnAppQuit = true
// Cuando hay update, lo descarga automáticamente en background.
// El instalador reemplaza los archivos en el mismo lugar (no desinstala).
// Los datos del usuario en AppData/Roaming se conservan siempre.

// ── Single instance lock ──
const gotLock = app.requestSingleInstanceLock()
if (!gotLock) {
  app.quit()
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })
}

app.whenReady().then(async () => {
  createWindow()
  detectGPU()
  detectedTools = await detectTools()
  mainWindow?.webContents.send('system:tools', detectedTools)

  autoUpdater.checkForUpdates()

  autoUpdater.on('checking-for-update', () => {
    mainWindow?.webContents.send('update:status', 'checking')
  })

  autoUpdater.on('update-available', (info) => {
    mainWindow?.webContents.send('update:available', {
      version: info.version,
      releaseDate: info.releaseDate,
      releaseNotes: info.releaseNotes,
    })
  })

  autoUpdater.on('update-not-available', () => {
    mainWindow?.webContents.send('update:status', 'up-to-date')
  })

  autoUpdater.on('download-progress', (progress) => {
    mainWindow?.webContents.send('update:progress', {
      percent: progress.percent,
      bytesPerSecond: progress.bytesPerSecond,
      transferred: progress.transferred,
      total: progress.total,
    })
  })

  autoUpdater.on('update-downloaded', () => {
    mainWindow?.webContents.send('update:downloaded')
  })

  autoUpdater.on('error', (err) => {
    const msg = err?.message || ''
    if (msg.includes('Cannot find latest') || msg.includes('404') || msg.includes('no versions')) {
      mainWindow?.webContents.send('update:status', 'up-to-date')
    } else {
      mainWindow?.webContents.send('update:error', msg)
    }
  })

  pollCPU()
  setInterval(() => {
    pollCPU()
    const totalMem = os.totalmem()
    const freeMem = os.freemem()
    const usedMem = totalMem - freeMem
    const ramPercent = Math.round((usedMem / totalMem) * 100)
    const ramGB = (usedMem / 1024 / 1024 / 1024).toFixed(1)

    pollGPU()

    let procRAM = 0
    try {
      const pOut = execSync(`wmic process where ProcessId=${process.pid} get WorkingSetSize`, { encoding: 'utf8', timeout: 1000 })
      const pVal = parseInt(pOut.trim().split('\n').filter(l => l.trim() && !l.includes('WorkingSetSize'))[0])
      if (!isNaN(pVal)) procRAM = Math.round(pVal / 1024 / 1024)
    } catch {}

    mainWindow?.webContents.send('system:metrics', {
      cpu: cpuLoad,
      gpu: gpuLoad !== null ? gpuLoad : null,
      gpuName,
      ram: ramPercent,
      ramGB: parseFloat(ramGB),
      ramTotal: (totalMem / 1024 / 1024 / 1024).toFixed(1),
      procRAM,
      cores: cpuCores,
    })
  }, 2000)
})

app.on('window-all-closed', () => {
  terminals.forEach((t: any) => { try { t.kill?.() } catch {} })
  terminals.clear()
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => { if (mainWindow === null) createWindow() })

ipcMain.on('window:minimize', () => mainWindow?.minimize())
ipcMain.on('window:maximize', () => {
  if (mainWindow?.isMaximized()) mainWindow.unmaximize()
  else mainWindow?.maximize()
})
ipcMain.on('window:close', () => mainWindow?.close())

ipcMain.handle('system:getTools', () => detectedTools)

ipcMain.handle('dialog:openFolder', async () => {
  const result = await dialog.showOpenDialog(mainWindow!, {
    properties: ['openDirectory'],
    title: 'Open Workspace',
  })
  if (result.canceled || !result.filePaths.length) return null
  return result.filePaths[0]
})

ipcMain.handle('dialog:createFolder', async (_e, name: string) => {
  const result = await dialog.showOpenDialog(mainWindow!, {
    properties: ['openDirectory', 'createDirectory'],
    title: `Select parent folder for "${name}"`,
  })
  if (result.canceled || !result.filePaths.length) return null
  const basePath = result.filePaths[0]
  const fullPath = path.join(basePath, name)
  try {
    require('fs').mkdirSync(fullPath, { recursive: true })
    return fullPath
  } catch { return null }
})

ipcMain.handle('dialog:pickParent', async () => {
  const result = await dialog.showOpenDialog(mainWindow!, {
    properties: ['openDirectory'],
    title: 'Select parent directory for new workspace',
  })
  if (result.canceled || !result.filePaths.length) return null
  return result.filePaths[0]
})

ipcMain.handle('dialog:createFolderAt', async (_e, parentPath: string, name: string) => {
  const fullPath = path.join(parentPath, name)
  try {
    require('fs').mkdirSync(fullPath, { recursive: true })
    return fullPath
  } catch { return null }
})

// ── File system ──
ipcMain.handle('fs:listDir', async (_e, dirPath: string) => {
  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true })
    return entries.map((e: any) => ({
      name: e.name,
      isDirectory: e.isDirectory(),
      isFile: e.isFile(),
      size: e.isFile() ? fs.statSync(path.join(dirPath, e.name)).size : 0,
    })).sort((a: any, b: any) => {
      if (a.isDirectory && !b.isDirectory) return -1
      if (!a.isDirectory && b.isDirectory) return 1
      return a.name.localeCompare(b.name)
    })
  } catch { return [] }
})

ipcMain.handle('fs:readFile', async (_e, filePath: string) => {
  try {
    return fs.readFileSync(filePath, 'utf-8')
  } catch { return null }
})

ipcMain.handle('fs:getInfo', async (_e, itemPath: string) => {
  try {
    const stat = fs.statSync(itemPath)
    return { size: stat.size, isDirectory: stat.isDirectory(), modified: stat.mtimeMs }
  } catch { return null }
})

ipcMain.handle('fs:saveTerminalHistory', async (_e, wsPath: string, termId: string, data: string) => {
  const dir = path.join(wsPath, '.zek-bridge', 'terminals')
  try { fs.mkdirSync(dir, { recursive: true }) } catch {}
  try {
    fs.appendFileSync(path.join(dir, `${termId}.log`), data, 'utf-8')
    return true
  } catch { return false }
})

ipcMain.handle('fs:loadTerminalHistory', async (_e, wsPath: string, termId: string) => {
  try {
    const filePath = path.join(wsPath, '.zek-bridge', 'terminals', `${termId}.log`)
    if (fs.existsSync(filePath)) return fs.readFileSync(filePath, 'utf-8')
    return null
  } catch { return null }
})

ipcMain.handle('fs:writeFile', async (_e, filePath: string, content: string) => {
  try {
    fs.writeFileSync(filePath, content, 'utf-8')
    return true
  } catch { return false }
})

ipcMain.handle('update:check', () => { autoUpdater.checkForUpdates() })
ipcMain.handle('update:download', () => { autoUpdater.downloadUpdate() })
ipcMain.handle('update:install', () => { autoUpdater.quitAndInstall() })

ipcMain.handle('shell:run', async (_e, cmd: string) => {
  return new Promise<string>((resolve) => {
    const child = spawn('cmd', ['/c', cmd], { windowsHide: true, timeout: 10000 })
    let out = ''
    child.stdout?.on('data', (d: Buffer) => { out += d.toString() })
    child.stderr?.on('data', (d: Buffer) => { out += d.toString() })
    child.on('close', () => resolve(out.trim()))
    child.on('error', () => resolve(''))
  })
})

ipcMain.handle('terminal:create', () => {
  const id = `term-${++terminalCounter}`
  if (!nodePty) {
    mainWindow?.webContents.send(`terminal:data:${id}`, 'node-pty module failed to load.\r\nInstall native build tools and run: npm run rebuild\r\n\r\n')
    mainWindow?.webContents.send(`terminal:data:${id}`, 'ZEK BRIDGE Terminal (fallback mode)\r\n> ')
    terminals.set(id, { pid: -1 })
    setTimeout(() => mainWindow?.webContents.send(`terminal:exit:${id}`), 3000)
    return id
  }

  const shell = process.env.COMSPEC || 'C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe'
  const term = nodePty.spawn(shell, [], {
    name: 'xterm-color',
    cols: 120, rows: 30,
    cwd: process.env.USERPROFILE || 'C:\\',
    env: { ...process.env },
  })

  term.onData((data: string) => mainWindow?.webContents.send(`terminal:data:${id}`, data))
  term.onExit(() => { terminals.delete(id); mainWindow?.webContents.send(`terminal:exit:${id}`) })

  terminals.set(id, term)

  setInterval(() => {
    if (!terminals.has(id)) return
    try {
      const pid = term.pid
      if (!pid) return
      const out = execSync(`wmic process where ProcessId=${pid} get WorkingSetSize,PercentProcessorTime`, { encoding: 'utf8', timeout: 1000 })
      const lines = out.split('\n').map(l => l.trim()).filter(l => l && !l.includes('WorkingSetSize'))
      if (lines.length > 0) {
        const parts = lines[0].split(/\s+/).filter(Boolean)
        const ramMB = Math.round((parseInt(parts[0]) || 0) / 1024)
        mainWindow?.webContents.send(`terminal:stats:${id}`, { ram: ramMB })
      }
    } catch {}
  }, 3000)

  return id
})

ipcMain.handle('terminal:write', (_e, id: string, data: string) => {
  const term = terminals.get(id)
  if (term?.write) term.write(data)
})
ipcMain.handle('terminal:resize', (_e, id: string, cols: number, rows: number) => {
  const term = terminals.get(id)
  if (term?.resize) term.resize(cols, rows)
})
ipcMain.handle('terminal:kill', (_e, id: string) => {
  const term = terminals.get(id)
  if (term?.kill) { try { term.kill() } catch {} }
  terminals.delete(id)
})
