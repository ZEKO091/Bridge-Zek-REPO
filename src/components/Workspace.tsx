import { useCallback } from 'react'
import TerminalCard from './TerminalCard'
import { useTerminalStore } from '../store/terminalStore'

export default function Workspace() {
  const terminals = useTerminalStore((s) => s.terminals)
  const addTerminal = useTerminalStore((s) => s.addTerminal)

  const handleNewTerminal = useCallback(async () => {
    try {
      const id = await window.electronAPI.createTerminal()
      addTerminal(id)
    } catch (err) {
      console.error('Failed to create terminal:', err)
    }
  }, [addTerminal])

  return (
    <div className="workspace">
      <div className="workspace-header">
        <div className="workspace-title">
          <span className="workspace-icon">〉</span>
          <h2>Bridge Lab</h2>
          <span className="workspace-badge">{terminals.length} active</span>
        </div>
        <button className="new-terminal-btn" onClick={handleNewTerminal}>
          <span className="new-terminal-plus">+</span>
          New Terminal
        </button>
      </div>
      <div className="workspace-grid">
        {terminals.length === 0 ? (
          <div className="workspace-empty">
            <div className="empty-icon">〉</div>
            <h3>No Active Terminals</h3>
            <p>Open a new terminal to start running your agents in the Bridge lab.</p>
            <button className="empty-action-btn" onClick={handleNewTerminal}>
              <span className="new-terminal-plus">+</span>
              Open Terminal
            </button>
          </div>
        ) : (
          terminals.map((t) => (
            <TerminalCard key={t.id} terminalId={t.id} />
          ))
        )}
      </div>
    </div>
  )
}
