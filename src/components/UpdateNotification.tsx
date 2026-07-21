import { useEffect, useState } from 'react'

type UpdateState = 'idle' | 'checking' | 'available' | 'downloading' | 'downloaded' | 'up-to-date' | 'error'

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
      setState('available')
      setVersion(info.version)
    })
  }, [])

  useEffect(() => {
    return window.electronAPI.onUpdateProgress((p) => {
      setState('downloading')
      setProgress(Math.round(p.percent))
    })
  }, [])

  useEffect(() => {
    return window.electronAPI.onUpdateDownloaded(() => setState('downloaded'))
  }, [])

  useEffect(() => {
    return window.electronAPI.onUpdateError((e) => {
      setState('error'); setError(e); setTimeout(() => setState('idle'), 5000)
    })
  }, [])

  if (state === 'idle') return null

  return (
    <div className={`update-notification ${state}`}>
      <div className="update-content">
        {state === 'checking' && (
          <><span className="update-spinner" /> Checking for updates...</>
        )}
        {state === 'available' && (
          <>
            <span className="update-icon">⬇</span>
            <span>Update v{version} available</span>
            <button className="update-btn" onClick={() => window.electronAPI.downloadUpdate()}>Download</button>
            <button className="update-btn dismiss" onClick={() => setState('idle')}>Skip</button>
          </>
        )}
        {state === 'downloading' && (
          <><span className="update-spinner" /> Downloading... {progress}%</>
        )}
        {state === 'downloaded' && (
          <>
            <span className="update-icon">✓</span>
            <span>Update ready</span>
            <button className="update-btn" onClick={() => window.electronAPI.installUpdate()}>Install & Restart</button>
          </>
        )}
        {state === 'up-to-date' && <><span className="update-icon">✓</span> ZEK BRIDGE is up to date</>}
        {state === 'error' && <><span className="update-icon error">✕</span> Update error: {error}</>}
      </div>
    </div>
  )
}
