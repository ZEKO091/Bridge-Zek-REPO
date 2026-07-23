import { useState, useEffect } from 'react'
import * as I from './Icons'

const TOKEN_KEY = 'zek-bridge:auth-token'
const USER_KEY = 'zek-bridge:auth-user'

export default function AuthPanel() {
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [user, setUser] = useState<{ username: string; email: string } | null>(null)
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(USER_KEY)
    if (stored) { try { setUser(JSON.parse(stored)) } catch {} }
  }, [])

  const saveSession = (u: any, token: string) => {
    const data = { username: u.username || u.name, email: u.email }
    localStorage.setItem(USER_KEY, JSON.stringify(data))
    localStorage.setItem(TOKEN_KEY, token)
    setUser(data)
  }

  const handleLogin = async () => {
    setLoading(true); setMsg('')
    const res = await window.electronAPI.authLogin(email, password)
    if (res?.ok || res?.valid) {
      saveSession(res.user || res.data?.user, res.token || res.data?.token)
      setMsg('Logged in successfully')
      setTimeout(() => { setShowLogin(false); setMsg('') }, 1500)
    } else {
      setMsg(res?.data?.error || res?.error || 'Login failed')
    }
    setLoading(false)
  }

  const handleSignup = async () => {
    setLoading(true); setMsg('')
    const res = await window.electronAPI.authSignup(username, email, password)
    if (res?.ok) {
      saveSession(res.user || res.data?.user, res.token || res.data?.token)
      setMsg('Account created!')
      setTimeout(() => { setShowSignup(false); setMsg('') }, 1500)
    } else {
      setMsg(res?.data?.error || res?.error || 'Signup failed')
    }
    setLoading(false)
  }

  const handleLogout = () => {
    localStorage.removeItem(USER_KEY)
    localStorage.removeItem(TOKEN_KEY)
    setUser(null)
  }

  return (
    <>
      <div className="ai-section">
        <div className="ai-section-title">
          <I.IconAgent size={14} className="ai-section-icon" />
          <span>Account</span>
          {user && <span style={{marginLeft:'auto',fontSize:10,color:'var(--glow-cyan)'}}>●</span>}
        </div>
        {user ? (
          <div>
            <p style={{fontSize:11,color:'var(--text-secondary)',marginBottom:4}}>{user.username}</p>
            <p style={{fontSize:9,color:'var(--text-muted)',marginBottom:8}}>{user.email}</p>
            <button onClick={handleLogout} style={{padding:'4px 12px',background:'rgba(239,68,68,0.08)',border:'1px solid rgba(239,68,68,0.15)',borderRadius:6,color:'#EF4444',cursor:'pointer',fontFamily:'inherit',fontSize:10}}>Logout</button>
          </div>
        ) : (
          <div style={{display:'flex',gap:6}}>
            <button onClick={() => { setShowLogin(true); setMsg('') }} style={{flex:1,padding:'6px 0',background:'rgba(0,229,255,0.08)',border:'1px solid rgba(0,229,255,0.12)',borderRadius:6,color:'var(--glow-cyan)',cursor:'pointer',fontFamily:'inherit',fontSize:11}}>Login</button>
            <button onClick={() => { setShowSignup(true); setMsg('') }} style={{flex:1,padding:'6px 0',background:'rgba(124,58,237,0.08)',border:'1px solid rgba(124,58,237,0.12)',borderRadius:6,color:'var(--glow-purple)',cursor:'pointer',fontFamily:'inherit',fontSize:11}}>Sign Up</button>
          </div>
        )}
      </div>

      {showLogin && (
        <div className="mm-overlay" onClick={() => setShowLogin(false)}>
          <div className="mm-modal" onClick={e => e.stopPropagation()} style={{width:360}}>
            <h2>Login</h2>
            {msg && <p style={{fontSize:11,color:msg.includes('success')?'#22C55E':'#EF4444',fontFamily:'JetBrains Mono,monospace'}}>{msg}</p>}
            <div><label>Email</label><input autoFocus value={email} onChange={e=>setEmail(e.target.value)} placeholder="your@email.com" /></div>
            <div><label>Password</label><input type="password" value={password} onChange={e=>setPassword(e.target.value)} onKeyDown={e=>{if(e.key==='Enter')handleLogin()}} placeholder="********" /></div>
            <div className="mm-modal-actions">
              <button className="mm-cancel" onClick={()=>setShowLogin(false)}>Cancel</button>
              <button className="mm-confirm" onClick={handleLogin} disabled={loading}>{loading?'Please wait...':'Login'}</button>
            </div>
          </div>
        </div>
      )}

      {showSignup && (
        <div className="mm-overlay" onClick={() => setShowSignup(false)}>
          <div className="mm-modal" onClick={e => e.stopPropagation()} style={{width:360}}>
            <h2>Create Account</h2>
            {msg && <p style={{fontSize:11,color:msg.includes('created')?'#22C55E':'#EF4444',fontFamily:'JetBrains Mono,monospace'}}>{msg}</p>}
            <div><label>Username</label><input autoFocus value={username} onChange={e=>setUsername(e.target.value)} placeholder="Your name" /></div>
            <div><label>Email</label><input value={email} onChange={e=>setEmail(e.target.value)} placeholder="your@email.com" /></div>
            <div><label>Password</label><input type="password" value={password} onChange={e=>setPassword(e.target.value)} onKeyDown={e=>{if(e.key==='Enter')handleSignup()}} placeholder="********" /></div>
            <div className="mm-modal-actions">
              <button className="mm-cancel" onClick={()=>setShowSignup(false)}>Cancel</button>
              <button className="mm-confirm" onClick={handleSignup} disabled={loading}>{loading?'Please wait...':'Create Account'}</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
