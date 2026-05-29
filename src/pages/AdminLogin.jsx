import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError('Invalid email or password.')
      setLoading(false)
    } else {
      navigate('/admin/dashboard')
    }
  }

  return (
    <div style={{ minHeight:'100vh', background:'#F9F6F2', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'inherit', padding:'2rem' }}>
      <div style={{ width:'100%', maxWidth:'420px' }}>
        <div style={{ textAlign:'center', marginBottom:'2.5rem' }}>
          <div style={{ fontSize:'11px', letterSpacing:'0.2em', textTransform:'uppercase', color:'#9B6BBD', marginBottom:'0.5rem' }}>Admin Portal</div>
          <div style={{ fontSize:'22px', fontWeight:400, color:'#0D0D0D' }}>Clarissa Terracciano</div>
        </div>
        <div style={{ background:'#fff', border:'0.5px solid rgba(0,0,0,0.1)', borderRadius:'12px', padding:'2.5rem', boxShadow:'0 4px 24px rgba(92,45,130,0.06)' }}>
          <form onSubmit={handleLogin} style={{ display:'flex', flexDirection:'column', gap:'1.25rem' }}>
            <div style={{ display:'flex', flexDirection:'column', gap:'6px' }}>
              <label style={{ fontSize:'12px', letterSpacing:'0.08em', textTransform:'uppercase', color:'#666' }}>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="clarissa@example.com"
                style={{ padding:'11px 14px', fontSize:'14px', color:'#0D0D0D', background:'#F9F6F2', border:'0.5px solid rgba(0,0,0,0.15)', borderRadius:'6px', outline:'none', width:'100%', boxSizing:'border-box' }} />
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:'6px' }}>
              <label style={{ fontSize:'12px', letterSpacing:'0.08em', textTransform:'uppercase', color:'#666' }}>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••"
                style={{ padding:'11px 14px', fontSize:'14px', color:'#0D0D0D', background:'#F9F6F2', border:'0.5px solid rgba(0,0,0,0.15)', borderRadius:'6px', outline:'none', width:'100%', boxSizing:'border-box' }} />
            </div>
            {error && <div style={{ padding:'10px 14px', background:'#FDF2F2', border:'0.5px solid rgba(220,50,50,0.2)', borderRadius:'6px', fontSize:'13px', color:'#9B2B2B' }}>{error}</div>}
            <button type="submit" disabled={loading}
              style={{ marginTop:'0.5rem', padding:'13px', background: loading ? '#9B6BBD' : '#5C2D82', color:'#fff', border:'none', borderRadius:'6px', fontSize:'12px', letterSpacing:'0.1em', textTransform:'uppercase', cursor: loading ? 'not-allowed' : 'pointer' }}>
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>
        <div style={{ textAlign:'center', marginTop:'1.5rem' }}>
          <a href="/" style={{ fontSize:'12px', color:'#9B6BBD', textDecoration:'none' }}>← Back to website</a>
        </div>
      </div>
    </div>
  )
}
