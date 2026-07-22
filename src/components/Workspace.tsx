import { useCallback, useMemo } from 'react'
import TerminalCard from './TerminalCard'
import { useTerminalStore } from '../store/terminalStore'
import * as I from './Icons'

function getGridLayout(count: number): { cols: number; template: string; centeredLast?: boolean } {
  if (count <= 0) return { cols: 1, template: '1fr' }
  if (count === 1) return { cols: 1, template: '1fr' }
  if (count === 2) return { cols: 2, template: '1fr 1fr' }
  if (count === 3) return { cols: 2, template: '1fr 1fr', centeredLast: true }
  if (count === 4) return { cols: 2, template: '1fr 1fr' }
  if (count === 5) return { cols: 3, template: '1fr 1fr 1fr', centeredLast: true }
  if (count === 6) return { cols: 3, template: '1fr 1fr 1fr' }
  if (count === 7) return { cols: 4, template: '1fr 1fr 1fr 1fr', centeredLast: true }
  if (count === 8) return { cols: 4, template: '1fr 1fr 1fr 1fr' }
  if (count === 9) return { cols: 3, template: '1fr 1fr 1fr' }
  if (count === 10) return { cols: 5, template: '1fr 1fr 1fr 1fr 1fr' }
  if (count === 11) return { cols: 4, template: '1fr 1fr 1fr 1fr', centeredLast: true }
  if (count >= 12) return { cols: 4, template: '1fr 1fr 1fr 1fr' }
  return { cols: 4, template: '1fr 1fr 1fr 1fr' }
}

export default function Workspace() {
  const terminals = useTerminalStore((s) => s.terminals)
  const addTerminal = useTerminalStore((s) => s.addTerminal)

  const handleNewTerminal = useCallback(async () => {
    if (terminals.length >= 12) return
    try {
      const id = await window.electronAPI.createTerminal()
      addTerminal(id)
    } catch {}
  }, [addTerminal, terminals.length])

  const layout = useMemo(() => getGridLayout(terminals.length), [terminals.length])

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: layout.template,
    gap: 10,
    padding: '0 16px 16px',
    flex: 1,
    overflow: 'auto',
    alignContent: 'start',
    transition: 'grid-template-columns 0.2s ease',
  }

  const maxed = terminals.length >= 12

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
          disabled={maxed}
          style={{ opacity: maxed ? 0.4 : 1 }}
        >
          <span className="new-terminal-plus">+</span>
          {maxed ? 'Max 12' : 'New Terminal'}
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
        <div style={gridStyle}>
          {terminals.map((t, i) => (
            <div
              key={t.id}
              style={
                layout.centeredLast && i === terminals.length - 1 && terminals.length % layout.cols !== 0
                  ? { gridColumn: `2 / ${layout.cols}` }
                  : undefined
              }
            >
              <TerminalCard terminalId={t.id} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
