import { useEffect, useState } from 'react'
import * as I from './Icons'

type UpdateState = 'idle' | 'checking' | 'downloading' | 'downloaded' | 'up-to-date' | 'error'

export default function UpdateNotification() {
  const [state, setState] = useState<UpdateState>('idle')
  const [version, setVersion] = useState('')
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')

  useEffect(() => {
    return window.electronAPI.onUpdateStatus((s) => {
      if (s === 'checking') setState('checking')
      if (s === 'up-to-date') { setState('up-to-date'); setTimeout(() => setState('idle'), 3000) }
    })
  }, [])

  useEffect(() => {
    return window.electronAPI.onUpdateAvailable((info) => {
      setVersion(info.version)
    })
  }, [])

  useEffect(() => {
    return window.electronAPI.onUpdateProgress((p) => {
      setState('downloading'); setProgress(Math.round(p.percent))
    })
  }, [])

  useEffect(() => {
    return window.electronAPI.onUpdateDownloaded(() => setState('downloaded'))
  }, [])

  useEffect(() => {
    return window.electronAPI.onUpdateError((e) => {
      setState('error'); setError(e)
    })
  }, [])

  const handleInstall = async () => {
    try { await window.electronAPI.installUpdate() } catch {}
  }

  const handleRetry = async () => {
    setState('checking')
    try { await window.electronAPI.checkUpdate() } catch {}
  }

  if (state === 'idle') return null

  return (
    <div className={`update-notification ${state}`}>
      <div className="update-content">
        {state === 'checking' && <><span className="update-spinner" /> Checking for updates...</>}
        {state === 'downloading' && <><span className="update-spinner" /> Updating to v{version}... {progress}%</>}
        {state === 'downloaded' && (
          <>
            <I.IconUpdate size={14} className="update-icon" />
            <span>Update v{version} ready</span>
            <button className="update-btn" onClick={handleInstall}>Restart & Update</button>
            <button className="update-btn dismiss" onClick={() => setState('idle')}>Later</button>
          </>
        )}
        {state === 'up-to-date' && <><I.IconCheck size={14} className="update-icon" /> ZEK BRIDGE is up to date</>}
        {state === 'error' && (
          <>
            <I.IconClose size={14} className="update-icon error" />
            <span>{error.slice(0, 60)}</span>
            <button className="update-btn" onClick={handleRetry}>Retry</button>
            <button className="update-btn dismiss" onClick={() => setState('idle')}>Dismiss</button>
          </>
        )}
      </div>
    </div>
  )
}
