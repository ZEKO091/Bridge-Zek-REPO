import { useState, useEffect } from 'react'
import * as I from './Icons'
import UpdateNotification from './UpdateNotification'
import { auth, logIn as fbLogin, signUp as fbSignup, onAuthChange } from '../lib/firebase'

interface LoginGateProps {
  children: React.ReactNode
}

export default function LoginGate({ children }: LoginGateProps) {
  const [authed, setAuthed] = useState<boolean | null>(null)
  const [view, setView] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<{ username: string; email: string } | null>(null)
  const [showPwd, setShowPwd] = useState(false)
  const [showCode, setShowCode] = useState(false)
  const [accessCode, setAccessCode] = useState('')
  const [liveNotif, setLiveNotif] = useState('')
  const BYPASS_CODE = 'admin1612'

  useEffect(() => {
    const unsub = window.electronAPI.onAuthEvent((event) => {
      if (event.type === 'user_created' || event.type === 'user_logged_in') {
        if (event.token) {
          const u = event.user
          localStorage.setItem('zek-bridge:auth-user', JSON.stringify(u))
          localStorage.setItem('zek-bridge:auth-token', event.token)
          setUser(u); setAuthed(true)
        } else {
          setLiveNotif(`New account: ${event.user.username} — sign in to sync`)
          setTimeout(() => setLiveNotif(''), 4000)
        }
      }
    })
    return unsub
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('zek-bridge:auth-token')
    const stored = localStorage.getItem('zek-bridge:auth-user')
    if (token && stored) {
      try { setUser(JSON.parse(stored)); setAuthed(true) } catch { setAuthed(false) }
    } else {
      setAuthed(false)
    }
  }, [])

  useEffect(() => {
    const onLogout = () => { setUser(null); setAuthed(false) }
    window.addEventListener('zek:logout', onLogout)
    return () => window.removeEventListener('zek:logout', onLogout)
  }, [])

  // Poll token validity every 5s
  useEffect(() => {
    if (!authed) return
    const poll = setInterval(async () => {
      const token = localStorage.getItem('zek-bridge:auth-token')
      if (!token) { setUser(null); setAuthed(false); return }
      if (token === 'bypass-token') return // admin bypass, skip verify
      try {
        const r = await fetch('http://localhost:6061/api/verify-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        })
        if (!r.ok) {
          localStorage.removeItem('zek-bridge:auth-user')
          localStorage.removeItem('zek-bridge:auth-token')
          setUser(null); setAuthed(false)
        }
      } catch {}
    }, 5000)
    return () => clearInterval(poll)
  }, [authed])

  if (authed === null) return null

  if (authed && user) {
    return <>{children}</>
  }

  if (authed === false) {
    // Still check for updates on login screen
  }

  const handleLogin = async () => {
    setLoading(true); setMsg('')
    try {
      const fbUser = await fbLogin(email, password)
      const u = { username: fbUser.displayName || email.split('@')[0], email: fbUser.email || email }
      localStorage.setItem('zek-bridge:auth-user', JSON.stringify(u))
      localStorage.setItem('zek-bridge:auth-token', await fbUser.getIdToken())
      setUser(u); setAuthed(true)
    } catch {
      const res = await window.electronAPI.authLogin(email, password)
      if (res?.ok) {
        const u = res.user || res.data?.user
        const tok = res.token || res.data?.token
        localStorage.setItem('zek-bridge:auth-user', JSON.stringify(u))
        localStorage.setItem('zek-bridge:auth-token', tok)
        setUser(u); setAuthed(true)
      } else {
        const errMsg = res?.data?.error || res?.error || 'Login failed'
        setMsg(errMsg.includes('not available') ? 'Servidor de auth no disponible. Usa ▼ Access Code' : errMsg)
      }
    }
    setLoading(false)
  }

  const handleCodeBypass = () => {
    if (accessCode === BYPASS_CODE) {
      const u = { username: 'Admin', email: 'admin@zek.app' }
      localStorage.setItem('zek-bridge:auth-user', JSON.stringify(u))
      localStorage.setItem('zek-bridge:auth-token', 'bypass-token')
      setUser(u); setAuthed(true)
    } else {
      setMsg('Invalid access code')
    }
  }

  const handleSignup = async () => {
    setLoading(true); setMsg('')
    try {
      const fbUser = await fbSignup(email, password, username || email.split('@')[0])
      const u = { username: fbUser.displayName || username || email.split('@')[0], email: fbUser.email || email }
      localStorage.setItem('zek-bridge:auth-user', JSON.stringify(u))
      localStorage.setItem('zek-bridge:auth-token', await fbUser.getIdToken())
      setUser(u); setAuthed(true)
    } catch {
      const res = await window.electronAPI.authSignup(username, email, password)
      if (res?.ok) {
        const u = res.user || res.data?.user
        const tok = res.token || res.data?.token
        localStorage.setItem('zek-bridge:auth-user', JSON.stringify(u))
        localStorage.setItem('zek-bridge:auth-token', tok)
        setUser(u); setAuthed(true)
      } else {
        const errMsg = res?.data?.error || res?.error || 'Signup failed'
        setMsg(errMsg.includes('not available') ? 'Servidor de auth no disponible. Usa ▼ Access Code' : errMsg)
      }
    }
    setLoading(false)
  }

  return (
    <div className="app-container">
      <UpdateNotification />
      <div style={{backgroundImage:'url(/bg.png)',backgroundSize:'cover',backgroundPosition:'center',position:'fixed',top:0,left:0,width:'100%',height:'100%',zIndex:0}} />
      <div style={{position:'fixed',inset:0,zIndex:1,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(5,6,8,0.6)',backdropFilter:'blur(12px)'}}>
        <div style={{background:'rgba(20,25,35,0.85)',backdropFilter:'blur(24px)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:24,padding:40,width:400,display:'flex',flexDirection:'column',gap:16}}>
          <div style={{textAlign:'center',marginBottom:8}}>
            <div style={{fontSize:36,fontWeight:800,letterSpacing:6,background:'linear-gradient(135deg,#00E5FF,#7C3AED)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',lineHeight:1}}>ZEK</div>
            <div style={{fontSize:10,letterSpacing:10,color:'var(--text-muted)',marginTop:4}}>BRIDGE</div>
          </div>

          {liveNotif && <p style={{fontSize:11,color:'#22C55E',fontFamily:'JetBrains Mono,monospace',textAlign:'center',padding:'4px 8px',background:'rgba(34,197,94,0.08)',borderRadius:6,lineHeight:1.3}}>● {liveNotif}</p>}
          {msg && <p style={{fontSize:12,color:'#EF4444',fontFamily:'JetBrains Mono,monospace',textAlign:'center',padding:'6px 10px',background:'rgba(239,68,68,0.06)',borderRadius:6,lineHeight:1.3}}>{msg}</p>}

          {view === 'login' ? (
            <>
              <h2 style={{fontSize:16,fontWeight:600,margin:0,textAlign:'center'}}>Sign In</h2>
              <div><label style={{fontSize:10,color:'var(--text-muted)',letterSpacing:1,textTransform:'uppercase'}}>Email</label>
                <input autoFocus value={email} onChange={e=>setEmail(e.target.value)} placeholder="your@email.com"
                  style={{width:'100%',padding:'8px 12px',marginTop:4,background:'rgba(0,0,0,0.3)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:8,color:'var(--text-primary)',fontFamily:'inherit',fontSize:13,outline:'none'}} />
              </div>
              <div><label style={{fontSize:10,color:'var(--text-muted)',letterSpacing:1,textTransform:'uppercase'}}>Password</label>
                <div style={{position:'relative',marginTop:4}}>
                  <input type={showPwd?'text':'password'} value={password} onChange={e=>setPassword(e.target.value)} onKeyDown={e=>{if(e.key==='Enter')handleLogin()}} placeholder="********"
                    style={{width:'100%',padding:'8px 12px',paddingRight:36,background:'rgba(0,0,0,0.3)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:8,color:'var(--text-primary)',fontFamily:'inherit',fontSize:13,outline:'none'}} />
                  <button onClick={()=>setShowPwd(!showPwd)} tabIndex={-1}
                    style={{position:'absolute',right:8,top:'50%',transform:'translateY(-50%)',background:'none',border:'none',cursor:'pointer',color:'var(--text-muted)',fontSize:14,padding:4,lineHeight:1}}>
                    {showPwd ? '◉' : '◯'}
                  </button>
                </div>
              </div>
              <button onClick={handleLogin} disabled={loading}
                style={{width:'100%',padding:'10px',background:'linear-gradient(135deg,rgba(0,229,255,0.15),rgba(124,58,237,0.15))',border:'1px solid rgba(0,229,255,0.2)',borderRadius:8,color:'var(--glow-cyan)',cursor:'pointer',fontFamily:'inherit',fontSize:13,fontWeight:600}}>
                {loading ? 'Please wait...' : 'Sign In'}
              </button>
              <div style={{borderTop:'1px solid rgba(255,255,255,0.05)',paddingTop:8,marginTop:4}}>
                <button onClick={()=>{setShowCode(!showCode);setMsg('')}} style={{width:'100%',padding:'6px',background:'none',border:'none',color:'var(--text-muted)',cursor:'pointer',fontFamily:'inherit',fontSize:10,letterSpacing:1,textTransform:'uppercase'}}>
                  {showCode ? '▲' : '▼'} Access Code
                </button>
                {showCode && (
                  <div style={{display:'flex',gap:6,marginTop:4}}>
                    <input autoFocus value={accessCode} onChange={e=>setAccessCode(e.target.value)} onKeyDown={e=>{if(e.key==='Enter')handleCodeBypass()}} placeholder="Enter code..."
                      style={{flex:1,padding:'6px 10px',background:'rgba(0,0,0,0.3)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:6,color:'var(--text-primary)',fontFamily:'JetBrains Mono,monospace',fontSize:12,outline:'none',textAlign:'center',letterSpacing:3}} />
                    <button onClick={handleCodeBypass} style={{padding:'6px 14px',background:'rgba(124,58,237,0.12)',border:'1px solid rgba(124,58,237,0.2)',borderRadius:6,color:'var(--glow-purple)',cursor:'pointer',fontFamily:'inherit',fontSize:11}}>Go</button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <h2 style={{fontSize:16,fontWeight:600,margin:0,textAlign:'center'}}>Create Account</h2>
              <div><label style={{fontSize:10,color:'var(--text-muted)',letterSpacing:1,textTransform:'uppercase'}}>Username</label>
                <input autoFocus value={username} onChange={e=>setUsername(e.target.value)} placeholder="Your name"
                  style={{width:'100%',padding:'8px 12px',marginTop:4,background:'rgba(0,0,0,0.3)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:8,color:'var(--text-primary)',fontFamily:'inherit',fontSize:13,outline:'none'}} />
              </div>
              <div><label style={{fontSize:10,color:'var(--text-muted)',letterSpacing:1,textTransform:'uppercase'}}>Email</label>
                <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="your@email.com"
                  style={{width:'100%',padding:'8px 12px',marginTop:4,background:'rgba(0,0,0,0.3)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:8,color:'var(--text-primary)',fontFamily:'inherit',fontSize:13,outline:'none'}} />
              </div>
              <div><label style={{fontSize:10,color:'var(--text-muted)',letterSpacing:1,textTransform:'uppercase'}}>Password</label>
                <div style={{position:'relative',marginTop:4}}>
                  <input type={showPwd?'text':'password'} value={password} onChange={e=>setPassword(e.target.value)} onKeyDown={e=>{if(e.key==='Enter')handleSignup()}} placeholder="********"
                    style={{width:'100%',padding:'8px 12px',paddingRight:36,background:'rgba(0,0,0,0.3)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:8,color:'var(--text-primary)',fontFamily:'inherit',fontSize:13,outline:'none'}} />
                  <button onClick={()=>setShowPwd(!showPwd)} tabIndex={-1}
                    style={{position:'absolute',right:8,top:'50%',transform:'translateY(-50%)',background:'none',border:'none',cursor:'pointer',color:'var(--text-muted)',fontSize:14,padding:4,lineHeight:1}}>
                    {showPwd ? '◉' : '◯'}
                  </button>
                </div>
              </div>
              <button onClick={handleSignup} disabled={loading}
                style={{width:'100%',padding:'10px',background:'linear-gradient(135deg,rgba(0,229,255,0.15),rgba(124,58,237,0.15))',border:'1px solid rgba(0,229,255,0.2)',borderRadius:8,color:'var(--glow-cyan)',cursor:'pointer',fontFamily:'inherit',fontSize:13,fontWeight:600}}>
                {loading ? 'Please wait...' : 'Create Account'}
              </button>
              <p style={{textAlign:'center',fontSize:11,color:'var(--text-muted)'}}>
                Already have an account?{' '}
                <a href="#" onClick={e=>{e.preventDefault();setView('login');setMsg('')}} style={{color:'var(--glow-cyan)',textDecoration:'none'}}>Sign in</a>
              </p>
              <div style={{borderTop:'1px solid rgba(255,255,255,0.05)',paddingTop:8,marginTop:4}}>
                <button onClick={()=>{setShowCode(!showCode);setMsg('')}} style={{width:'100%',padding:'6px',background:'none',border:'none',color:'var(--text-muted)',cursor:'pointer',fontFamily:'inherit',fontSize:10,letterSpacing:1,textTransform:'uppercase'}}>
                  {showCode ? '▲' : '▼'} Access Code
                </button>
                {showCode && (
                  <div style={{display:'flex',gap:6,marginTop:4}}>
                    <input autoFocus value={accessCode} onChange={e=>setAccessCode(e.target.value)} onKeyDown={e=>{if(e.key==='Enter')handleCodeBypass()}} placeholder="Enter code..."
                      style={{flex:1,padding:'6px 10px',background:'rgba(0,0,0,0.3)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:6,color:'var(--text-primary)',fontFamily:'JetBrains Mono,monospace',fontSize:12,outline:'none',textAlign:'center',letterSpacing:3}} />
                    <button onClick={handleCodeBypass} style={{padding:'6px 14px',background:'rgba(124,58,237,0.12)',border:'1px solid rgba(124,58,237,0.2)',borderRadius:6,color:'var(--glow-purple)',cursor:'pointer',fontFamily:'inherit',fontSize:11}}>Go</button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
