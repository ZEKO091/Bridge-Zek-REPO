const translations: Record<string, Record<string, string>> = {
  es: {
    'app.name': 'ZEK BRIDGE',
    'app.version': 'v1.1.0',
    'menu.new': 'Nuevo Workspace',
    'menu.open': 'Abrir Workspace',
    'menu.terminal': 'Terminal',
    'menu.agents': 'AI Agents',
    'menu.import': 'Importar',
    'menu.newProject': 'Nuevo Proyecto',
    'sidebar.dashboard': 'Dashboard',
    'sidebar.workspaces': 'Workspaces',
    'sidebar.powershells': 'PowerShells',
    'sidebar.agents': 'Agentes',
    'sidebar.models': 'Modelos',
    'sidebar.memory': 'Memoria',
    'sidebar.files': 'Archivos',
    'sidebar.git': 'Git',
    'sidebar.analytics': 'Analíticas',
    'sidebar.settings': 'Ajustes',
    'workspace.title': 'Bridge Lab',
    'workspace.newTerminal': 'Nuevo Terminal',
    'workspace.noTerminals': 'Sin Terminales Activos',
    'workspace.noTerminalsDesc': 'Abre un nuevo terminal para empezar a trabajar.',
    'workspace.openTerminal': 'Abrir Terminal',
    'workspace.max12': 'Máx 12',
    'sub.create': 'Nuevo sub-workspace...',
    'sub.noSubs': 'Sin sub-workspaces',
    'terminal.pause': 'Pausar',
    'terminal.resume': 'Reanudar',
    'terminal.clear': 'Limpiar',
    'terminal.restart': 'Reiniciar',
    'terminal.kill': 'Cerrar',
    'terminal.cmd': 'CMD',
    'dashboard.title': 'Dashboard',
    'dashboard.cpu': 'CPU',
    'dashboard.gpu': 'GPU',
    'dashboard.ram': 'RAM',
    'dashboard.terminals': 'Terminales',
    'dashboard.tools': 'Herramientas',
    'dashboard.workspace': 'Workspace',
    'dashboard.clickRename': 'Click para renombrar',
    'dashboard.detected': 'Herramientas Detectadas',
    'dashboard.noTools': 'Sin herramientas detectadas',
    'agents.title': 'Agentes y Herramientas',
    'agents.available': 'Disponibles',
    'agents.notDetected': 'No Detectados',
    'agents.installed': 'instaladas',
    'git.title': 'Git',
    'git.noWorkspace': 'Sin workspace abierto',
    'git.notRepo': 'No es un repo git',
    'git.clean': 'Working tree limpio',
    'git.runInit': 'Ejecuta git init para crear un repositorio',
    'analytics.title': 'Analíticas',
    'settings.title': 'Ajustes',
    'settings.clearStorage': 'Limpiar almacenamiento local',
    'settings.clearDesc': 'Los workspaces se recargarán desde el disco',
    'settings.systemInfo': 'Información del sistema',
    'settings.checkUpdates': 'Buscar actualizaciones',
    'memory.title': 'Memoria',
    'files.title': 'Archivos',
    'models.title': 'Modelos',
    'notifications.maxTerminals': 'Máximo número de agentes activos alcanzado (12). Cierra un agente antes de crear uno nuevo.',
    'notifications.cleared': 'Almacenamiento local limpiado',
    'notifications.checking': 'Buscando actualizaciones...',
    'update.checking': 'Buscando actualizaciones...',
    'update.downloading': 'Actualizando a v{version}... {progress}%',
    'update.ready': 'Actualización v{version} lista',
    'update.restart': 'Reiniciar y Actualizar',
    'update.later': 'Después',
    'update.retry': 'Reintentar',
    'update.dismiss': 'Descartar',
    'open.title': 'Abrir Workspace',
    'open.folder': 'Ruta de la carpeta',
    'open.cancel': 'Cancelar',
    'open.open': 'Abrir',
    'open.terminal': 'Abrir Terminal',
    'create.title': 'Crear Workspace',
    'create.parent': 'Directorio padre',
    'create.name': 'Nombre del proyecto',
    'create.terminals': 'Terminales',
    'create.cancel': 'Cancelar',
    'create.create': 'Crear',
    'create.browse': 'Examinar',
  },
  en: {
    'app.name': 'ZEK BRIDGE',
    'app.version': 'v1.1.0',
    'menu.new': 'New Workspace',
    'menu.open': 'Open Workspace',
    'menu.terminal': 'Terminal',
    'menu.agents': 'AI Agents',
    'menu.import': 'Import',
    'menu.newProject': 'New Project',
    'sidebar.dashboard': 'Dashboard',
    'sidebar.workspaces': 'Workspaces',
    'sidebar.powershells': 'PowerShells',
    'sidebar.agents': 'Agents',
    'sidebar.models': 'Models',
    'sidebar.memory': 'Memory',
    'sidebar.files': 'Files',
    'sidebar.git': 'Git',
    'sidebar.analytics': 'Analytics',
    'sidebar.settings': 'Settings',
    'workspace.title': 'Bridge Lab',
    'workspace.newTerminal': 'New Terminal',
    'workspace.noTerminals': 'No Active Terminals',
    'workspace.noTerminalsDesc': 'Open a new terminal to start working.',
    'workspace.openTerminal': 'Open Terminal',
    'workspace.max12': 'Max 12',
    'sub.create': 'New sub-workspace...',
    'sub.noSubs': 'No sub-workspaces',
    'terminal.pause': 'Pause',
    'terminal.resume': 'Resume',
    'terminal.clear': 'Clear',
    'terminal.restart': 'Restart',
    'terminal.kill': 'Kill',
    'terminal.cmd': 'CMD',
    'dashboard.title': 'Dashboard',
    'dashboard.cpu': 'CPU',
    'dashboard.gpu': 'GPU',
    'dashboard.ram': 'RAM',
    'dashboard.terminals': 'Terminals',
    'dashboard.tools': 'Tools',
    'dashboard.workspace': 'Workspace',
    'dashboard.clickRename': 'Click to rename',
    'dashboard.detected': 'Detected Tools',
    'dashboard.noTools': 'No tools detected',
    'agents.title': 'Agents & Tools',
    'agents.available': 'Available',
    'agents.notDetected': 'Not Detected',
    'agents.installed': 'installed',
    'git.title': 'Git',
    'git.noWorkspace': 'No workspace open',
    'git.notRepo': 'Not a git repo',
    'git.clean': 'Clean working tree',
    'git.runInit': 'Run git init to create a repository',
    'analytics.title': 'Analytics',
    'settings.title': 'Settings',
    'settings.clearStorage': 'Clear Local Storage',
    'settings.clearDesc': 'Workspaces will reload from disk',
    'settings.systemInfo': 'System Info',
    'settings.checkUpdates': 'Check for Updates',
    'memory.title': 'Memory',
    'files.title': 'Files',
    'models.title': 'Models',
    'notifications.maxTerminals': 'Maximum number of active agents reached (12). Close an existing agent before creating a new one.',
    'notifications.cleared': 'Local storage cleared',
    'notifications.checking': 'Checking for updates...',
    'update.checking': 'Checking for updates...',
    'update.downloading': 'Updating to v{version}... {progress}%',
    'update.ready': 'Update v{version} ready',
    'update.restart': 'Restart & Update',
    'update.later': 'Later',
    'update.retry': 'Retry',
    'update.dismiss': 'Dismiss',
    'open.title': 'Open Workspace',
    'open.folder': 'Folder path',
    'open.cancel': 'Cancel',
    'open.open': 'Open',
    'open.terminal': 'Open Terminal',
    'create.title': 'Create Workspace',
    'create.parent': 'Parent directory',
    'create.name': 'Project name',
    'create.terminals': 'Terminals',
    'create.cancel': 'Cancel',
    'create.create': 'Create',
    'create.browse': 'Browse',
  },
}

export type Lang = 'es' | 'en'

function detectLang(): Lang {
  const nav = navigator.language || (navigator as any).userLanguage || ''
  if (nav.startsWith('es')) return 'es'
  return 'en'
}

let currentLang: Lang = detectLang()
const listeners: Array<() => void> = []

export function t(key: string, vars?: Record<string, string | number>): string {
  const text = translations[currentLang]?.[key] || translations['en']?.[key] || key
  if (!vars) return text
  let result = text
  for (const [k, v] of Object.entries(vars)) {
    result = result.replace(`{${k}}`, String(v))
  }
  return result
}

export function setLang(lang: Lang) {
  currentLang = lang
  listeners.forEach(fn => fn())
}

export function getLang(): Lang {
  return currentLang
}

export function onLangChange(fn: () => void): () => void {
  listeners.push(fn)
  return () => {
    const idx = listeners.indexOf(fn)
    if (idx >= 0) listeners.splice(idx, 1)
  }
}



