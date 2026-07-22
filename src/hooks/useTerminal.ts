import { useEffect, useRef, useCallback } from 'react'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { useTerminalStore } from '../store/terminalStore'
import { useWorkspaceStore } from '../store/workspaceStore'

export function useTerminal(terminalId: string, containerRef: React.RefObject<HTMLDivElement>) {
  const termRef = useRef<Terminal | null>(null)
  const fitAddonRef = useRef<FitAddon | null>(null)
  const pausedRef = useRef(false)
  const updateTerminal = useTerminalStore((s) => s.updateTerminal)
  const setCommand = useTerminalStore((s) => s.setCommand)

  useEffect(() => {
    if (!containerRef.current) return

    const term = new Terminal({
      cursorBlink: true,
      cursorStyle: 'bar',
      fontFamily: "'JetBrains Mono', 'Cascadia Code', 'Fira Code', monospace",
      fontSize: 12,
      lineHeight: 1.3,
      cols: 80,
      rows: 20,
      theme: {
        background: '#0A0B10', foreground: '#D9E4F2', cursor: '#00E5FF',
        cursorAccent: '#050608', selectionBackground: '#3B82F640',
        black: '#1A1B26', red: '#F7768E', green: '#9ECE6A', yellow: '#E0AF68',
        blue: '#7AA2F7', magenta: '#BB9AF7', cyan: '#00E5FF', white: '#D9E4F2',
        brightBlack: '#414868', brightRed: '#F7768E', brightGreen: '#9ECE6A',
        brightYellow: '#E0AF68', brightBlue: '#7AA2F7', brightMagenta: '#BB9AF7',
        brightCyan: '#00E5FF', brightWhite: '#D9E4F2',
      },
      allowTransparency: true,
    })

    const fitAddon = new FitAddon()
    term.loadAddon(fitAddon)
    fitAddonRef.current = fitAddon

    term.open(containerRef.current)
    const fit = () => { try { fitAddon.fit() } catch {} }
    setTimeout(fit, 100)
    setTimeout(fit, 500)

    const handleResize = () => fitAddon.fit()
    window.addEventListener('resize', handleResize)

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
          saveBuffer()
          outputBuffer = ''
        }
      }
    })

    const saveBuffer = () => {
      if (!outputBuffer) return
      const ws = useWorkspaceStore.getState().current
      if (ws?.path) {
        window.electronAPI.saveTerminalHistory(ws.path, terminalId, outputBuffer)
      }
    }

    const autoSave = setInterval(() => {
      if (!pausedRef.current) saveBuffer()
    }, 10000)

    const exitCleanup = window.electronAPI.onTerminalExit(terminalId, () => {
      saveBuffer()
      updateTerminal(terminalId, { status: 'stopped' })
    })

    updateTerminal(terminalId, { status: 'running' })

    termRef.current = term

    return () => {
      clearInterval(autoSave)
      saveBuffer()
      dataCleanup()
      exitCleanup()
      term.dispose()
      window.removeEventListener('resize', handleResize)
    }
  }, [terminalId])

  const fitTerminal = useCallback(() => fitAddonRef.current?.fit(), [])

  const togglePause = useCallback(() => {
    pausedRef.current = !pausedRef.current
    return pausedRef.current
  }, [])

  const writeToTerminal = useCallback((text: string) => {
    window.electronAPI.writeToTerminal(terminalId, text)
  }, [terminalId])

  return { fitTerminal, togglePause, writeToTerminal }
}
