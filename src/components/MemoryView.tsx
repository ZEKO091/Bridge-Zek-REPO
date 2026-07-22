import { useEffect, useState, useCallback } from 'react'
import { useWorkspaceStore } from '../store/workspaceStore'

const MEMORY_FILES = ['AGENTS.md', 'GEMINI.md', 'CONTEXT.md', 'RULES.md', 'MEMORY.md']

export default function MemoryView() {
  return (
    <div className="view-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.3 }}>⏳</div>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, letterSpacing: 4, color: 'var(--glow-cyan)' }}>COMING SOON</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>Project Memory — AI context files editor</p>
      </div>
    </div>
  )
}
