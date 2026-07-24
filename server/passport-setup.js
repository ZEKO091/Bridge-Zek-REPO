const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const crypto = require('crypto')
const fs = require('fs')
const path = require('path')

const DATA_DIR = process.env.ZEK_BRIDGE_DATA_DIR || (process.env.APPDATA ? path.join(process.env.APPDATA, 'zek-bridge') : path.join(__dirname, '..'))
const DB_PATH = path.join(DATA_DIR, 'users.json')

function loadUsers() {
  try {
    if (fs.existsSync(DB_PATH)) {
      const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'))
      return Array.isArray(data) ? data : []
    }
  } catch {}
  return []
}

function saveUsers(users) {
  fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2), 'utf-8')
}

function generateToken() {
  return crypto.randomBytes(32).toString('hex')
}

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex')
  const key = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex')
  return 'pbkdf2:' + salt + ':' + key
}

function verifyPassword(password, stored) {
  if (!stored.startsWith('pbkdf2:')) {
    return crypto.createHash('sha256').update(password).digest('hex') === stored
  }
  const parts = stored.split(':')
  if (parts.length !== 3) return false
  const key = crypto.pbkdf2Sync(password, parts[1], 100000, 64, 'sha512').toString('hex')
  return key === parts[2]
}

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false
  }, (email, password, done) => {
    const users = loadUsers()
    const user = users.find(u => u.email === email)
    if (!user) return done(null, false, { message: 'Account not found' })
    if (!verifyPassword(password, user.password)) return done(null, false, { message: 'Invalid password' })
    // Update token
    const token = generateToken()
    user.token = token
    saveUsers(users)
    return done(null, { id: user.id, username: user.username, email: user.email, token })
  })
)

function setupPassportAuth(app) {
  app.use(passport.initialize())

  // Signup
  app.post('/api/auth/signup', (req, res) => {
    const { username, email, password } = req.body
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Username, email and password required' })
    }
    const users = loadUsers()
    if (users.find(u => u.email === email)) {
      return res.status(409).json({ error: 'Account already exists' })
    }
    const token = generateToken()
    const user = {
      id: 'user_' + Date.now(),
      username,
      email,
      password: hashPassword(password),
      token,
      createdAt: new Date().toISOString()
    }
    users.push(user)
    saveUsers(users)
    res.json({ ok: true, token, user: { id: user.id, username: user.username, email: user.email } })
  })

  // Login using Passport
  app.post('/api/auth/login', (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err) return res.status(500).json({ error: 'Internal error' })
      if (!user) return res.status(401).json({ error: info?.message || 'Account not found. Please sign up first.' })
      res.json({ ok: true, token: user.token, user: { id: user.id, username: user.username, email: user.email } })
    })(req, res, next)
  })

  // Verify session
  app.post('/api/auth/verify', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.status(401).json({ error: 'No token' })
    const users = loadUsers()
    const user = users.find(u => u.token === token)
    if (!user) return res.status(403).json({ error: 'Invalid or expired session' })
    res.json({ valid: true, user: { id: user.id, username: user.username, email: user.email } })
  })

  // Logout (clear token)
  app.post('/api/auth/logout', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (token) {
      const users = loadUsers()
      const user = users.find(u => u.token === token)
      if (user) {
        user.token = ''
        saveUsers(users)
      }
    }
    res.json({ ok: true })
  })
}

module.exports = { setupPassportAuth, passport }
