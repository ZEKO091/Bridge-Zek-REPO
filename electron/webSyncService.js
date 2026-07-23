const AUTH_API_URL = 'http://localhost:6060/api';

async function apiCall(endpoint, method = 'POST', body = null, token = null) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  try {
    const res = await fetch(`${AUTH_API_URL}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    });
    const data = await res.json();
    return { ok: res.ok, status: res.status, data };
  } catch (e) {
    return { ok: false, status: 0, data: { error: `Cannot connect to auth server (${AUTH_API_URL}). Make sure the server is running.` } };
  }
}

async function signup(username, email, password) {
  return apiCall('/signup', 'POST', { username, email, password });
}

async function login(email, password) {
  return apiCall('/login', 'POST', { email, password });
}

async function verifySession(token) {
  return apiCall('/verify-session', 'POST', null, token);
}

async function getUser(token) {
  return apiCall('/user', 'GET', null, token);
}

module.exports = { signup, login, verifySession, getUser };
