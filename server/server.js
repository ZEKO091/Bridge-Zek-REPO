const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = 6060;
const DB_PATH = path.join(__dirname, 'users.json');

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

// Signup
app.post('/api/signup', (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Username, email and password required' });
    }
    const users = loadUsers();
    if (users.find(u => u.email === email)) {
        return res.status(409).json({ error: 'An account with this email already exists' });
    }
    const hash = crypto.createHash('sha256').update(password).digest('hex');
    const token = generateToken();
    const user = { id: `user_${Date.now()}`, username, email, password: hash, token, createdAt: new Date().toISOString() };
    users.push(user);
    saveUsers(users);
    res.json({ ok: true, token, user: { id: user.id, username: user.username, email: user.email } });
});

// Login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password required' });
    }
    const users = loadUsers();
    const hash = crypto.createHash('sha256').update(password).digest('hex');
    const user = users.find(u => u.email === email && u.password === hash);
    if (!user) {
        return res.status(403).json({ error: 'Account not found in the application database. Please sign up first.' });
    }
    const token = generateToken();
    user.token = token;
    saveUsers(users);
    res.json({ ok: true, token, user: { id: user.id, username: user.username, email: user.email } });
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

app.listen(PORT, () => {
    console.log(`ZEK BRIDGE Auth server running on http://localhost:${PORT}`);
    if (!fs.existsSync(DB_PATH)) {
        saveUsers([]);
        console.log('Users database created at:', DB_PATH);
    }
});
