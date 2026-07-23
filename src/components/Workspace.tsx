import { useCallback, useMemo } from 'react'
import TerminalCard from './TerminalCard'
import { useTerminalStore, MAX_TERMINALS, canAddTerminal, notifyMaxTerminals } from '../store/terminalStore'
import { useWorkspaceStore } from '../store/workspaceStore'
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
  const activeSubId = useWorkspaceStore((s) => s.activeSubId)
  const subs = useWorkspaceStore((s) => s.current?.subWorkspaces || [])

  // Filter terminals by active sub-workspace
  const filtered = useMemo(() => {
    if (!activeSubId) return terminals.filter(t => !t.subWorkspaceId)
    return terminals.filter(t => t.subWorkspaceId === activeSubId)
  }, [terminals, activeSubId])

  const handleNewTerminal = useCallback(async () => {
    if (!canAddTerminal()) { notifyMaxTerminals(); return }
    try {
      const id = await window.electronAPI.createTerminal()
      addTerminal(id, activeSubId || undefined)
    } catch {}
  }, [addTerminal, activeSubId])

  const cols = useMemo(() => getCols(filtered.length), [filtered.length])
  const sub = subs.find(s => s.id === activeSubId)

  return (
    <div className="workspace">
      <div className="workspace-header">
        <div className="workspace-title">
          <I.IconTerminal size={20} className="workspace-icon" />
          <h2>{sub ? sub.name : 'Bridge Lab'}</h2>
          <span className="workspace-badge">{filtered.length}/{sub?.terminalCount || MAX_TERMINALS}</span>
        </div>
        <button
          className="new-terminal-btn"
          onClick={handleNewTerminal}
          disabled={!canAddTerminal()}
          style={{ opacity: !canAddTerminal() ? 0.4 : 1 }}
        >
          <span className="new-terminal-plus">+</span>
          New Terminal
        </button>
      </div>
      {filtered.length === 0 ? (
        <div className="workspace-empty">
          <div className="empty-icon">〉</div>
          <h3>{sub ? `No terminals in ${sub.name}` : 'No Active Terminals'}</h3>
          <p>Open a new terminal to start working.</p>
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
          {filtered.map((t) => (
            <TerminalCard key={t.id} terminalId={t.id} />
          ))}
        </div>
      )}
    </div>
  )
}
