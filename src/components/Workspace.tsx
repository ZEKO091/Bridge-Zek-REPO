import { useCallback, useMemo } from 'react'
import TerminalCard from './TerminalCard'
import { useTerminalStore, MAX_TERMINALS, canAddTerminal, notifyMaxTerminals } from '../store/terminalStore'
import * as I from './Icons'

function getCols(count: number): number {
  if (count <= 1) return 1
  if (count <= 4) return 2
  if (count <= 9) return 3
  return 4
}

export default function Workspace() {
  const terminals = useTerminalStore((s) => s.terminals)
  const addTerminal = useTerminalStore((s) => s.addTerminal)

  const handleNewTerminal = useCallback(async () => {
    if (!canAddTerminal()) { notifyMaxTerminals(); return }
    try {
      const id = await window.electronAPI.createTerminal()
      addTerminal(id)
    } catch {}
  }, [addTerminal])

  const cols = useMemo(() => getCols(terminals.length), [terminals.length])
  const rows = terminals.length > 0 ? Math.ceil(terminals.length / cols) : 1

  return (
    <div className="workspace">
      <div className="workspace-header">
        <div className="workspace-title">
          <I.IconTerminal size={20} className="workspace-icon" />
          <h2>Bridge Lab</h2>
          <span className="workspace-badge">{terminals.length}/12</span>
        </div>
        <button
          className="new-terminal-btn"
          onClick={handleNewTerminal}
          disabled={terminals.length >= 12}
          style={{ opacity: terminals.length >= 12 ? 0.4 : 1 }}
        >
          <span className="new-terminal-plus">+</span>
          New Terminal
        </button>
      </div>
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
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gridAutoRows: '1fr',
            gap: 12,
            padding: '0 16px 16px',
            flex: 1,
            overflow: 'auto',
            alignContent: 'start',
            minHeight: 0,
          }}
        >
          {terminals.map((t) => (
            <TerminalCard key={t.id} terminalId={t.id} />
          ))}
        </div>
      )}
    </div>
  )
}
