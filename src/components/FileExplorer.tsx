import { useEffect, useState, useCallback } from 'react'
import { useWorkspaceStore } from '../store/workspaceStore'

interface DirEntry {
  name: string; isDirectory: boolean; isFile: boolean; size: number
}

export default function FileExplorer() {
  const ws = useWorkspaceStore((s) => s.current)
  const [currentDir, setCurrentDir] = useState('')
  const [entries, setEntries] = useState<DirEntry[]>([])
  const [history, setHistory] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const loadDir = useCallback(async (dir: string) => {
    setLoading(true)
    setCurrentDir(dir)
    const list = await window.electronAPI.listDir(dir)
    setEntries(list || [])
    setLoading(false)
  }, [])

  useEffect(() => {
    if (ws?.path) loadDir(ws.path)
  }, [ws, loadDir])

  const enterDir = (name: string) => {
    const newPath = currentDir.endsWith('\\') ? currentDir + name : currentDir + '\\' + name
    setHistory((h) => [...h, currentDir])
    loadDir(newPath)
  }

  const goBack = () => {
    if (history.length > 0) {
      const prev = history[history.length - 1]
      setHistory((h) => h.slice(0, -1))
      loadDir(prev)
    }
  }

  const goUp = () => {
    const parent = currentDir.replace(/\\+$/, '').split('\\').slice(0, -1).join('\\')
    if (parent && parent.length > 2) {
      setHistory((h) => [...h, currentDir])
      loadDir(parent)
    }
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`
  }

  const fileIcon = (name: string, isDir: boolean) => {
    if (isDir) return '📁'
    const ext = name.split('.').pop()?.toLowerCase()
    const icons: Record<string, string> = {
      js: '🟨', jsx: '⚛️', ts: '🔵', tsx: '⚛️', json: '📋', html: '🌐',
      css: '🎨', md: '📝', py: '🐍', rs: '🦀', go: '🔷', exe: '⚙️',
      dll: '⚙️', txt: '📄', yml: '⚙️', yaml: '⚙️', toml: '⚙️',
      gitignore: '🙈', lock: '🔒', bat: '📦', ps1: '📦', sh: '📦',
    }
    return icons[ext || ''] || '📄'
  }

  const isTextFile = (name: string) => {
    const ext = name.split('.').pop()?.toLowerCase()
    return ['txt', 'md', 'js', 'jsx', 'ts', 'tsx', 'json', 'html', 'css', 'py', 'yml', 'yaml', 'toml', 'gitignore', 'bat', 'ps1', 'sh', 'xml', 'env'].includes(ext || '')
  }

  if (!ws) return <div className="fe-empty">No workspace open</div>

  return (
    <div className="fe-container">
      <div className="fe-header">
        <div className="fe-path-row">
          <button className="fe-nav-btn" onClick={goBack} disabled={history.length === 0} title="Back">←</button>
          <button className="fe-nav-btn" onClick={goUp} title="Up">↑</button>
          <span className="fe-path">{currentDir || 'No directory'}</span>
        </div>
      </div>
      <div className="fe-list">
        {loading ? (
          <div className="fe-loading">Loading...</div>
        ) : entries.length === 0 ? (
          <div className="fe-empty">Empty folder</div>
        ) : (
          entries.map((e) => (
            <div
              key={e.name}
              className={`fe-item ${e.isDirectory ? 'dir' : 'file'}`}
              onDoubleClick={() => { if (e.isDirectory) enterDir(e.name) }}
              onClick={async () => {
                if (e.isFile && isTextFile(e.name)) {
                  const content = await window.electronAPI.readFile(currentDir + '\\' + e.name)
                  if (content !== null) {
                    alert(content.slice(0, 2000))
                  }
                }
              }}
            >
              <span className="fe-icon">{fileIcon(e.name, e.isDirectory)}</span>
              <span className="fe-name">{e.name}</span>
              {e.isFile && <span className="fe-size">{formatSize(e.size)}</span>}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
