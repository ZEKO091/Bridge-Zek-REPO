const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = process.env.ZEK_BRIDGE_PORT || 6061;
const HOST = process.env.ZEK_BRIDGE_HOST || '0.0.0.0';
const DATA_DIR = process.env.ZEK_BRIDGE_DATA_DIR || (process.env.APPDATA ? path.join(process.env.APPDATA, 'zek-bridge') : path.join(__dirname, '..'));
const DB_PATH = path.join(DATA_DIR, 'users.json');

app.use(cors({ origin: '*' }));
app.use(express.json());

function loadUsers() {
    try {
        if (fs.existsSync(DB_PATH)) {
            return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
        }
    } catch (e) { console.error('Error loading users:', e); }
    return [];
}

function saveUsers(users) {
    fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2), 'utf-8');
}

function generateToken() {
    return crypto.randomBytes(32).toString('hex');
}

function hashPassword(password) {
    const salt = crypto.randomBytes(16).toString('hex');
    const key = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
    return 'pbkdf2:' + salt + ':' + key;
}

function verifyPassword(password, stored) {
    // Legacy support: SHA-256 sin salt (usuarios existentes)
    if (!stored.startsWith('pbkdf2:')) {
        const hash = crypto.createHash('sha256').update(password).digest('hex');
        return hash === stored;
    }
    const parts = stored.split(':');
    if (parts.length !== 3) return false;
    const key = crypto.pbkdf2Sync(password, parts[1], 100000, 64, 'sha512').toString('hex');
    return key === parts[2];
}

function isLegacyHash(stored) {
    return !stored.startsWith('pbkdf2:');
}

let dbLock = false;
const dbQueue = [];

function withDB(fn) {
    return new Promise((resolve, reject) => {
        dbQueue.push({ fn, resolve, reject });
        processQueue();
    });
}

function processQueue() {
    if (dbLock || dbQueue.length === 0) return;
    dbLock = true;
    const { fn, resolve, reject } = dbQueue.shift();
    process.nextTick(async () => {
        try {
            const result = await fn();
            resolve(result);
        } catch (e) {
            reject(e);
        } finally {
            dbLock = false;
            processQueue();
        }
    });
}

// ── SSE (Server-Sent Events) ──
const sseClients = new Set();

app.get('/api/events', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
    });
    res.write('data: {"type":"connected"}\n\n');
    sseClients.add(res);

    const cleanup = () => {
        sseClients.delete(res);
        res.removeListener('close', cleanup);
        res.removeListener('error', cleanup);
    };
    res.on('close', cleanup);
    res.on('error', cleanup);
});

function broadcast(event) {
    const msg = `data: ${JSON.stringify(event)}\n\n`;
    for (const c of sseClients) {
        try { c.write(msg) } catch {
            sseClients.delete(c);
        }
    }
}

// Heartbeat cada 30s para mantener conexiones vivas
setInterval(() => {
    for (const c of sseClients) {
        try { c.write(':heartbeat\n\n') } catch {
            sseClients.delete(c);
        }
    }
}, 30000);

function sanitize(str) {
    if (typeof str !== 'string') return '';
    return str.replace(/[<>"']/g, '').trim().slice(0, 100);
}

// Signup
app.post('/api/signup', async (req, res) => {
    const username = sanitize(req.body.username);
    const email = sanitize(req.body.email);
    const password = req.body.password;
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Username, email and password required' });
    }
    if (password.length < 4) {
        return res.status(400).json({ error: 'Password must be at least 4 characters' });
    }
    const result = await withDB(async () => {
        const users = loadUsers();
        if (users.find(u => u.email === email)) {
            return { error: 'An account with this email already exists' };
        }
        const hash = hashPassword(password);
        const token = generateToken();
        const user = { id: `user_${Date.now()}`, username, email, password: hash, token, createdAt: new Date().toISOString() };
        users.push(user);
        saveUsers(users);
        return { ok: true, token, user: { id: user.id, username: user.username, email: user.email } };
    });
    if (result.error) return res.status(409).json(result);
    broadcast({ type: 'user_created', user: result.user, token: result.token });
    res.json(result);
});

// Login
app.post('/api/login', async (req, res) => {
    const email = sanitize(req.body.email);
    const password = req.body.password;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password required' });
    }
    const result = await withDB(async () => {
        const users = loadUsers();
        const user = users.find(u => u.email === email);
        if (!user || !verifyPassword(password, user.password)) {
            return { error: 'Account not found. Please sign up first.' };
        }
        // Upgrade legacy SHA-256 hash to PBKDF2
        if (isLegacyHash(user.password)) {
            user.password = hashPassword(password);
        }
        const token = generateToken();
        user.token = token;
        saveUsers(users);
        return { ok: true, token, user: { id: user.id, username: user.username, email: user.email } };
    });
    if (result.error) return res.status(403).json(result);
    broadcast({ type: 'user_logged_in', user: result.user, token: result.token });
    res.json(result);
});

// Verify session
app.post('/api/verify-session', (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Token not provided' });
    }
    const users = loadUsers();
    const user = users.find(u => u.token === token);
    if (!user) {
        return res.status(403).json({ error: 'Account does not exist or has been disabled in the application database.' });
    }
    res.json({ valid: true, user: { id: user.id, username: user.username, email: user.email } });
});

// Get user info
app.get('/api/user', (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token' });
    const users = loadUsers();
    const user = users.find(u => u.token === token);
    if (!user) return res.status(403).json({ error: 'User not found' });
    res.json({ id: user.id, username: user.username, email: user.email });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

const server = app.listen(PORT, () => {
    console.log(`ZEK BRIDGE Auth server running on http://localhost:${PORT}`);
    if (!fs.existsSync(DB_PATH)) {
        saveUsers([]);
        console.log('Users database created at:', DB_PATH);
    }
});

// Graceful shutdown
function shutdown() {
    console.log('\nShutting down auth server...');
    for (const c of sseClients) {
        try { c.end() } catch {}
    }
    sseClients.clear();
    server.close(() => process.exit(0));
}
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
process.on('uncaughtException', (err) => {
    console.error('Uncaught exception:', err);
    shutdown();
});
