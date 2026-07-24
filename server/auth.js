const { betterAuth } = require('better-auth')
const path = require('path')
const fs = require('fs')

const DATA_DIR = process.env.ZEK_BRIDGE_DATA_DIR || (process.env.APPDATA ? path.join(process.env.APPDATA, 'zek-bridge') : __dirname)
const DB_PATH = path.join(DATA_DIR, 'better-auth.db')

try { fs.mkdirSync(DATA_DIR, { recursive: true }) } catch {}

let auth = null
let authReady = false

function initAuth() {
  try {
    auth = betterAuth({
      appName: 'ZEK BRIDGE',
      database: {
        provider: 'sqlite',
        url: DB_PATH.replace(/\\/g, '/')
      },
      emailAndPassword: {
        enabled: true,
        minPasswordLength: 4,
        requireEmailVerification: false,
        autoSignIn: true
      },
      socialProviders: {},
      rateLimit: { window: 60, max: 100 },
      logger: { level: 'error' }
    })
    authReady = true
    console.log('[Better Auth] Initialized')
  } catch (e) {
    console.warn('[Better Auth] Init failed:', e.message)
  }
}

// Initialize on import
initAuth()

async function apiCall(handler, body, headers) {
  if (!authReady) return { error: 'Auth not initialized' }
  try {
    const req = new Request('http://localhost/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...headers },
      body: body ? JSON.stringify(body) : undefined
    })
    const response = await handler({ body, headers: req.headers })
    return response
  } catch (e) {
    return { error: e.message }
  }
}

function setupBetterAuthRoutes(app) {
  app.post('/api/auth/signup', async (req, res) => {
    try {
      const response = await auth.api.signUpEmail({
        body: {
          name: req.body.username || req.body.email?.split('@')[0] || 'User',
          email: req.body.email,
          password: req.body.password
        },
        headers: req.headers
      })
      res.json(response)
    } catch (e) {
      res.status(400).json({ error: e.message || 'Signup failed' })
    }
  })

  app.post('/api/auth/login', async (req, res) => {
    try {
      const response = await auth.api.signInEmail({
        body: { email: req.body.email, password: req.body.password },
        headers: { 'content-type': 'application/json' }
      })
      res.json(response)
    } catch (e) {
      res.status(401).json({ error: e.message || 'Login failed' })
    }
  })

  app.post('/api/auth/session', async (req, res) => {
    try {
      const session = await auth.api.getSession({
        headers: { authorization: req.headers.authorization }
      })
      res.json(session)
    } catch (e) {
      res.status(401).json({ error: e.message || 'Invalid session' })
    }
  })

  app.post('/api/auth/signout', async (req, res) => {
    try {
      await auth.api.signOut({ headers: { authorization: req.headers.authorization } })
      res.json({ ok: true })
    } catch (e) {
      res.status(400).json({ error: e.message })
    }
  })
}

module.exports = { auth, setupBetterAuthRoutes, DB_PATH, authReady }
