import { useEffect, useState } from 'react'
import { useWorkspaceStore } from '../store/workspaceStore'

export default function GitView() {
  const ws = useWorkspaceStore((s) => s.current)
  const [branch, setBranch] = useState('')
  const [status, setStatus] = useState('')

  useEffect(() => {
    if (!ws?.path) return
    const check = async () => {
      const branchResult = await window.electronAPI.runShell(`git -C "${ws.path}" branch --show-current 2>nul`)
      if (branchResult) setBranch(branchResult.trim())
      const statusResult = await window.electronAPI.runShell(`git -C "${ws.path}" status --short 2>nul`)
      if (statusResult) setStatus(statusResult.trim())
    }
    check()
  }, [ws])

  return (
    <div className="view-container">
      <div className="view-header"><h2>Git</h2></div>
      {!ws ? (
        <p style={{color:'var(--text-muted)',fontStyle:'italic'}}>No workspace open</p>
      ) : (
        <>
          <div className="tv-card" style={{marginBottom:8}}>
            <div><div className="tv-name">{branch || 'Not a git repo'}</div>
            <div className="tv-ver">{ws.path}</div></div>
          </div>
          {status ? (
            <div style={{background:'rgba(0,0,0,0.15)',borderRadius:8,padding:12,fontFamily:'JetBrains Mono,monospace',fontSize:11,color:'var(--text-muted)',lineHeight:1.6,whiteSpace:'pre-wrap',maxHeight:300,overflow:'auto'}}>
              {status || 'Clean working tree'}
            </div>
          ) : (
            <p style={{color:'var(--text-muted)',fontStyle:'italic',marginTop:8}}>
              {branch ? 'Clean working tree' : 'Run git init to create a repository'}
            </p>
          )}
        </>
      )}
    </div>
  )
}
