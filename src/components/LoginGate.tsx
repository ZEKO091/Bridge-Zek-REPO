import { useState, useEffect } from 'react'
import * as I from './Icons'

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

  useEffect(() => {
    const token = localStorage.getItem('zek-bridge:auth-token')
    const stored = localStorage.getItem('zek-bridge:auth-user')
    if (token && stored) {
      try { setUser(JSON.parse(stored)); setAuthed(true) } catch { setAuthed(false) }
    } else {
      setAuthed(false)
    }
  }, [])

  if (authed === null) return null

  if (authed && user) {
    return <>{children}</>
  }

  const handleLogin = async () => {
    setLoading(true); setMsg('')
    const res = await window.electronAPI.authLogin(email, password)
    if (res?.ok) {
      const u = res.user || res.data?.user
      const tok = res.token || res.data?.token
      localStorage.setItem('zek-bridge:auth-user', JSON.stringify(u))
      localStorage.setItem('zek-bridge:auth-token', tok)
      setUser(u); setAuthed(true)
    } else {
      setMsg(res?.data?.error || res?.error || 'Login failed')
    }
    setLoading(false)
  }

  const handleSignup = async () => {
    setLoading(true); setMsg('')
    const res = await window.electronAPI.authSignup(username, email, password)
    if (res?.ok) {
      const u = res.user || res.data?.user
      const tok = res.token || res.data?.token
      localStorage.setItem('zek-bridge:auth-user', JSON.stringify(u))
      localStorage.setItem('zek-bridge:auth-token', tok)
      setUser(u); setAuthed(true)
    } else {
      setMsg(res?.data?.error || res?.error || 'Signup failed')
    }
    setLoading(false)
  }

  return (
    <div className="app-container">
      <div style={{backgroundImage:'url(/bg.png)',backgroundSize:'cover',backgroundPosition:'center',position:'fixed',top:0,left:0,width:'100%',height:'100%',zIndex:0}} />
      <div style={{position:'fixed',inset:0,zIndex:1,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(5,6,8,0.6)',backdropFilter:'blur(12px)'}}>
        <div style={{background:'rgba(20,25,35,0.85)',backdropFilter:'blur(24px)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:24,padding:40,width:400,display:'flex',flexDirection:'column',gap:16}}>
          <div style={{textAlign:'center',marginBottom:8}}>
            <div style={{fontSize:36,fontWeight:800,letterSpacing:6,background:'linear-gradient(135deg,#00E5FF,#7C3AED)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',lineHeight:1}}>ZEK</div>
            <div style={{fontSize:10,letterSpacing:10,color:'var(--text-muted)',marginTop:4}}>BRIDGE</div>
          </div>

          {msg && <p style={{fontSize:12,color:'#EF4444',fontFamily:'JetBrains Mono,monospace',textAlign:'center',padding:'6px 10px',background:'rgba(239,68,68,0.06)',borderRadius:6,lineHeight:1.3}}>{msg}</p>}

          {view === 'login' ? (
            <>
              <h2 style={{fontSize:16,fontWeight:600,margin:0,textAlign:'center'}}>Sign In</h2>
              <div><label style={{fontSize:10,color:'var(--text-muted)',letterSpacing:1,textTransform:'uppercase'}}>Email</label>
                <input autoFocus value={email} onChange={e=>setEmail(e.target.value)} placeholder="your@email.com"
                  style={{width:'100%',padding:'8px 12px',marginTop:4,background:'rgba(0,0,0,0.3)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:8,color:'var(--text-primary)',fontFamily:'inherit',fontSize:13,outline:'none'}} />
              </div>
              <div><label style={{fontSize:10,color:'var(--text-muted)',letterSpacing:1,textTransform:'uppercase'}}>Password</label>
                <input type="password" value={password} onChange={e=>setPassword(e.target.value)} onKeyDown={e=>{if(e.key==='Enter')handleLogin()}} placeholder="********"
                  style={{width:'100%',padding:'8px 12px',marginTop:4,background:'rgba(0,0,0,0.3)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:8,color:'var(--text-primary)',fontFamily:'inherit',fontSize:13,outline:'none'}} />
              </div>
              <button onClick={handleLogin} disabled={loading}
                style={{width:'100%',padding:'10px',background:'linear-gradient(135deg,rgba(0,229,255,0.15),rgba(124,58,237,0.15))',border:'1px solid rgba(0,229,255,0.2)',borderRadius:8,color:'var(--glow-cyan)',cursor:'pointer',fontFamily:'inherit',fontSize:13,fontWeight:600}}>
                {loading ? 'Please wait...' : 'Sign In'}
              </button>
              <p style={{textAlign:'center',fontSize:11,color:'var(--text-muted)'}}>
                No account?{' '}
                <a href="#" onClick={e=>{e.preventDefault();setView('signup');setMsg('')}} style={{color:'var(--glow-cyan)',textDecoration:'none'}}>Create one</a>
              </p>
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
                <input type="password" value={password} onChange={e=>setPassword(e.target.value)} onKeyDown={e=>{if(e.key==='Enter')handleSignup()}} placeholder="********"
                  style={{width:'100%',padding:'8px 12px',marginTop:4,background:'rgba(0,0,0,0.3)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:8,color:'var(--text-primary)',fontFamily:'inherit',fontSize:13,outline:'none'}} />
              </div>
              <button onClick={handleSignup} disabled={loading}
                style={{width:'100%',padding:'10px',background:'linear-gradient(135deg,rgba(0,229,255,0.15),rgba(124,58,237,0.15))',border:'1px solid rgba(0,229,255,0.2)',borderRadius:8,color:'var(--glow-cyan)',cursor:'pointer',fontFamily:'inherit',fontSize:13,fontWeight:600}}>
                {loading ? 'Please wait...' : 'Create Account'}
              </button>
              <p style={{textAlign:'center',fontSize:11,color:'var(--text-muted)'}}>
                Already have an account?{' '}
                <a href="#" onClick={e=>{e.preventDefault();setView('login');setMsg('')}} style={{color:'var(--glow-cyan)',textDecoration:'none'}}>Sign in</a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
