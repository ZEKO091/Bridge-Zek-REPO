import { useEffect, useState, useCallback } from 'react'
import { useWorkspaceStore } from '../store/workspaceStore'

const MEMORY_FILES = ['AGENTS.md', 'GEMINI.md', 'CONTEXT.md', 'RULES.md', 'MEMORY.md']

export default function MemoryView() {
  const ws = useWorkspaceStore((s) => s.current)
  const [files, setFiles] = useState<{ name: string; exists: boolean; content: string }[]>([])
  const [selected, setSelected] = useState<string | null>(null)
  const [editor, setEditor] = useState('')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  const loadFiles = useCallback(async () => {
    if (!ws?.path) return
    const results = []
    for (const name of MEMORY_FILES) {
      const fullPath = `${ws.path}\\${name}`
      const content = await window.electronAPI.readFile(fullPath)
      results.push({ name, exists: content !== null, content: content || getTemplate(name) })
    }
    setFiles(results)
  }, [ws])

  useEffect(() => { loadFiles() }, [loadFiles])

  const getTemplate = (name: string) => {
    const templates: Record<string, string> = {
      'AGENTS.md': `# Project Context for AI Agents\n\n## Project Overview\n- **Name:** ${ws?.name || ''}\n- **Purpose:** \n- **Tech Stack:** \n\n## Architecture Rules\n- \n\n## Coding Style\n- \n\n## Preferred Libraries\n- \n\n## Goals\n- \n`,
      'GEMINI.md': `# Gemini AI Context\n\n## Project Identity\n- **Project:** ${ws?.name || ''}\n- **Language:** \n- **Framework:** \n\n## Conventions\n- \n\n## Notes\n- \n`,
      'CONTEXT.md': `# Project Context\n\n## Description\n\n## Key Files\n\n## Dependencies\n\n## Environment\n`,
      'RULES.md': `# Coding Rules\n\n## General\n\n## Performance\n\n## Security\n\n## Testing\n`,
      'MEMORY.md': `# AI Memory Log\n\n## Session Log\n\n## Decisions\n\n## Known Issues\n\n## Next Steps\n`,
    }
    return templates[name] || `# ${name}\n\nAdd your project context here...\n`
  }

  const currentFile = files.find((f) => f.name === selected)

  const handleSave = async () => {
    if (!selected || !ws?.path) return
    setSaving(true)
    const fullPath = `${ws.path}\\${selected}`
    const ok = await window.electronAPI.writeFile(fullPath, editor)
    setSaving(false)
    if (ok) {
      setMessage('Saved ✓')
      setTimeout(() => setMessage(''), 2000)
      loadFiles()
    } else {
      setMessage('Error saving')
    }
  }

  const handleNew = async () => {
    const name = prompt('New memory file name:', 'CONTEXT.md')
    if (!name || !ws?.path) return
    if (!name.endsWith('.md')) return alert('File must be .md')
    const fullPath = `${ws.path}\\${name}`
    const exists = await window.electronAPI.readFile(fullPath)
    if (exists !== null) return alert('File already exists')
    await window.electronAPI.writeFile(fullPath, `# ${name}\n\n`)
    loadFiles()
    setSelected(name)
    setEditor(`# ${name}\n\n`)
  }

  if (!ws) return <div className="view-container"><div className="fe-empty">No workspace open</div></div>

  return (
    <div className="view-container">
      <div className="view-header">
        <h2>Project Memory</h2>
        <span className="workspace-badge">{files.filter((f) => f.exists).length}/{files.length} files</span>
        <button className="mm-create-btn" onClick={handleNew} style={{ marginLeft: 'auto' }}>+ New</button>
      </div>

      <p className="memory-intro">
        Memory files store persistent context for AI agents: rules, architecture, style guides, and project goals.
        These files help the AI remember your project between sessions.
      </p>

      <div className="memory-body">
        <div className="memory-sidebar">
          {files.map((f) => (
            <button
              key={f.name}
              className={`memory-file ${selected === f.name ? 'active' : ''} ${f.exists ? '' : 'new'}`}
              onClick={() => { setSelected(f.name); setEditor(f.content) }}
            >
              <span className="memory-file-icon">{f.exists ? '📝' : '📄'}</span>
              <div className="memory-file-info">
                <span className="memory-file-name">{f.name}</span>
                <span className="memory-file-status">{f.exists ? 'saved' : 'new'}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="memory-editor">
          {currentFile ? (
            <>
              <div className="memory-toolbar">
                <span className="memory-toolbar-name">{selected}</span>
                <div className="memory-toolbar-actions">
                  {message && <span className="memory-saved">{message}</span>}
                  <button className="mm-create-btn" onClick={handleSave} disabled={saving}>
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </div>
              <textarea
                className="memory-textarea"
                value={editor}
                onChange={(e) => setEditor(e.target.value)}
                spellCheck={false}
              />
            </>
          ) : (
            <div className="memory-placeholder">
              <span className="memory-placeholder-icon">☰</span>
              <p>Select a memory file to edit</p>
              <p className="memory-placeholder-sub">
                These files define how AI agents understand your project
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
