import { useEffect, useRef, useCallback } from 'react'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { useTerminalStore } from '../store/terminalStore'
import { useWorkspaceStore } from '../store/workspaceStore'
import { playNotification } from '../lib/sound'

const FONT = "'Cascadia Code', 'JetBrains Mono', 'Consolas', 'Fira Code', monospace"

export function useTerminal(terminalId: string, containerRef: React.RefObject<HTMLDivElement>) {
  const termRef = useRef<Terminal | null>(null)
  const fitAddonRef = useRef<FitAddon | null>(null)
  const pausedRef = useRef(false)
  const resizeTimerRef = useRef<number>(0)
  const updateTerminal = useTerminalStore((s) => s.updateTerminal)
  const setCommand = useTerminalStore((s) => s.setCommand)

  useEffect(() => {
    if (!containerRef.current) return

    const term = new Terminal({
      cursorBlink: true,
      cursorStyle: 'bar',
      fontSize: 13,
      fontFamily: FONT,
      lineHeight: 1.0,
      letterSpacing: 0,
      cols: 80,
      rows: 24,
      disableStdin: false,
      allowProposedApi: true,
      allowTransparency: true,
      minimumContrastRatio: 1,
      theme: {
        background: '#0A0B10',
        foreground: '#D9E4F2',
        cursor: '#00E5FF',
        cursorAccent: '#050608',
        selectionBackground: '#3B82F640',
        black: '#1A1B26',
        red: '#F7768E',
        green: '#9ECE6A',
        yellow: '#E0AF68',
        blue: '#7AA2F7',
        magenta: '#BB9AF7',
        cyan: '#00E5FF',
        white: '#D9E4F2',
        brightBlack: '#414868',
        brightRed: '#F7768E',
        brightGreen: '#9ECE6A',
        brightYellow: '#E0AF68',
        brightBlue: '#7AA2F7',
        brightMagenta: '#BB9AF7',
        brightCyan: '#00E5FF',
        brightWhite: '#D9E4F2',
      },
    })

    const fitAddon = new FitAddon()
    term.loadAddon(fitAddon)
    fitAddonRef.current = fitAddon

    term.open(containerRef.current)

    const doFit = () => {
      try {
        fitAddon.fit()
        const dims = fitAddon.proposeDimensions()
        if (dims) {
          window.electronAPI.resizeTerminal(terminalId, dims.cols, dims.rows)
        }
      } catch {}
    }

    const fitSequence = () => {
      doFit()
      requestAnimationFrame(() => {
        doFit()
        requestAnimationFrame(() => doFit())
      })
    }

    document.fonts?.ready?.then(fitSequence).catch(fitSequence)

    const debouncedResize = () => {
      if (resizeTimerRef.current) cancelAnimationFrame(resizeTimerRef.current)
      resizeTimerRef.current = requestAnimationFrame(() => doFit())
    }
    window.addEventListener('resize', debouncedResize)

    // Keyboard shortcuts matching VS Code / Windows Terminal
    term.attachCustomKeyEventHandler((e) => {
      if (e.type !== 'keydown') return true
      const ctrl = e.ctrlKey || e.metaKey
      const shift = e.shiftKey

      // Ctrl+Shift+C → copy always
      if (ctrl && shift && e.key === 'C') {
        const sel = term.getSelection() || term.buffer.active.getLine(term.buffer.active.cursorY)?.translateToString()
        if (sel) navigator.clipboard.writeText(sel).catch(() => {})
        if (term.getSelection()) term.clearSelection()
        return false
      }
      // Ctrl+Shift+V → paste always
      if (ctrl && shift && e.key === 'V') {
        navigator.clipboard.readText().then(t => { if (t) term.paste(t) }).catch(() => {})
        return false
      }
      // Ctrl+C → copy native (browser), SIGINT if no selection
      if (ctrl && !shift && e.key === 'c') {
        if (term.getSelection()) {
          setTimeout(() => term.clearSelection(), 0)
          return false
        }
        return true
      }
      // Ctrl+V → paste
      if (ctrl && !shift && e.key === 'v') {
        navigator.clipboard.readText().then(t => { if (t) term.paste(t) }).catch(() => {})
        return false
      }
      // Ctrl+A → select all
      if (ctrl && e.key === 'a') { term.selectAll(); return false }
      return true
    })

    term.onData((data) => {
      if (!pausedRef.current) window.electronAPI.writeToTerminal(terminalId, data)
    })

    let outputBuffer = ''
    const dataCleanup = window.electronAPI.onTerminalData(terminalId, (data) => {
      if (pausedRef.current) return
      term.write(data)
      outputBuffer += data
      const lines = outputBuffer.split('\n')
      if (lines.length > 1) {
        const lastLine = lines[lines.length - 1].trim()
        if (lastLine && !lastLine.startsWith('PS') && !lastLine.startsWith('Microsoft')) {
          setCommand(terminalId, lastLine)
        }
        if (outputBuffer.length > 2000) {
          saveBuffer(); outputBuffer = ''
        }
      }
    })

    const saveBuffer = () => {
      if (!outputBuffer) return
      const ws = useWorkspaceStore.getState().current
      if (ws?.path) window.electronAPI.saveTerminalHistory(ws.path, terminalId, outputBuffer)
    }

    const autoSave = setInterval(() => { if (!pausedRef.current) saveBuffer() }, 30000)

    const exitCleanup = window.electronAPI.onTerminalExit(terminalId, () => {
      saveBuffer(); updateTerminal(terminalId, { status: 'stopped' }); playNotification().catch(() => {})
    })

    updateTerminal(terminalId, { status: 'running' })
    termRef.current = term

    return () => {
      clearInterval(autoSave); saveBuffer(); dataCleanup(); exitCleanup()
      if (resizeTimerRef.current) cancelAnimationFrame(resizeTimerRef.current)
      window.removeEventListener('resize', debouncedResize)
      term.dispose()
    }
  }, [terminalId])

  const fitTerminal = useCallback(() => {
    const fit = fitAddonRef.current
    if (!fit) return
    try {
      fit.fit()
      const dims = fit.proposeDimensions()
      if (dims) window.electronAPI.resizeTerminal(terminalId, dims.cols, dims.rows)
    } catch {}
  }, [terminalId])

  const togglePause = useCallback(() => {
    pausedRef.current = !pausedRef.current
    return pausedRef.current
  }, [])

  const writeToTerminal = useCallback((text: string) => {
    window.electronAPI.writeToTerminal(terminalId, text)
  }, [terminalId])

  const clearTerminal = useCallback(() => {
    const term = termRef.current
    if (term) { term.clear(); term.write('\x1b[H'); term.focus() }
  }, [])

  return { fitTerminal, togglePause, writeToTerminal, clearTerminal }
}
