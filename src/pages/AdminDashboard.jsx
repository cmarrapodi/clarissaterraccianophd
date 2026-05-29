import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const navItems = [
  { id: 'overview',  label: 'Overview' },
  { id: 'bookings',  label: 'Bookings' },
  { id: 'leads',     label: 'Leads' },
  { id: 'calendar',  label: 'Calendar' },
  { id: 'services',  label: 'Services' },
  { id: 'content',   label: 'Content' },
  { id: 'revenue',   label: 'Revenue' },
  { id: 'analytics', label: 'Analytics' },
]

const stats = [
  { label: 'Total visitors',        value: '—', note: 'Connect Vercel Analytics' },
  { label: 'Consultation requests', value: '—', note: 'Phase 2' },
  { label: 'Discovery calls',       value: '—', note: 'Phase 2' },
  { label: 'Contact submissions',   value: '—', note: 'Phase 3' },
]

export default function AdminDashboard() {
  const [activeNav, setActiveNav] = useState('overview')
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/admin')
  }

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#F9F6F2', fontFamily:'inherit' }}>
      <aside style={{ width:'220px', flexShrink:0, background:'#1A0F24', display:'flex', flexDirection:'column', padding:'2rem 0', position:'sticky', top:0, height:'100vh' }}>
        <div style={{ padding:'0 1.5rem 2rem' }}>
          <div style={{ fontSize:'10px', letterSpacing:'0.2em', textTransform:'uppercase', color:'#9B6BBD', marginBottom:'4px' }}>Admin Portal</div>
          <div style={{ fontSize:'14px', fontWeight:500, color:'#fff', lineHeight:1.3 }}>Clarissa Terracciano</div>
        </div>
        <nav style={{ flex:1, display:'flex', flexDirection:'column', gap:'2px', padding:'0 0.75rem' }}>
          {navItems.map(item => (
            <button key={item.id} onClick={() => setActiveNav(item.id)}
              style={{ display:'flex', alignItems:'center', gap:'10px', padding:'10px 12px', borderRadius:'6px', border:'none',
                background: activeNav === item.id ? 'rgba(92,45,130,0.4)' : 'transparent',
                color: activeNav === item.id ? '#fff' : 'rgba(255,255,255,0.45)',
                fontSize:'13px', cursor:'pointer', textAlign:'left', width:'100%',
                borderLeft: activeNav === item.id ? '2px solid #9B6BBD' : '2px solid transparent' }}>
              {item.label}
            </button>
          ))}
        </nav>
        <div style={{ padding:'1.5rem 1.25rem 0' }}>
          <button onClick={handleLogout}
            style={{ width:'100%', padding:'10px', background:'rgba(255,255,255,0.05)', border:'0.5px solid rgba(255,255,255,0.1)', borderRadius:'6px', color:'rgba(255,255,255,0.4)', fontSize:'12px', letterSpacing:'0.08em', textTransform:'uppercase', cursor:'pointer' }}>
            Sign out
          </button>
        </div>
      </aside>
      <main style={{ flex:1, padding:'2.5rem', overflowY:'auto' }}>
        <div style={{ marginBottom:'2.5rem' }}>
          <div style={{ fontSize:'11px', letterSpacing:'0.2em', textTransform:'uppercase', color:'#9B6BBD', marginBottom:'6px' }}>
            {navItems.find(n => n.id === activeNav)?.label}
          </div>
          <h1 style={{ fontSize:'28px', fontWeight:400, color:'#0D0D0D', letterSpacing:'-0.02em', margin:0 }}>
            {activeNav === 'overview' ? 'Good morning, Clarissa.' : navItems.find(n => n.id === activeNav)?.label}
          </h1>
        </div>
        {activeNav === 'overview' && (
          <>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'1rem', marginBottom:'2rem' }}>
              {stats.map(stat => (
                <div key={stat.label} style={{ background:'#fff', border:'0.5px solid rgba(0,0,0,0.08)', borderRadius:'10px', padding:'1.5rem' }}>
                  <div style={{ fontSize:'28px', fontWeight:300, color:'#5C2D82', marginBottom:'4px' }}>{stat.value}</div>
                  <div style={{ fontSize:'13px', color:'#0D0D0D', marginBottom:'4px' }}>{stat.label}</div>
                  <div style={{ fontSize:'11px', color:'#aaa' }}>{stat.note}</div>
                </div>
              ))}
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
              {['Upcoming bookings','Recent leads','Revenue this month','Recent content changes'].map(panel => (
                <div key={panel} style={{ background:'#fff', border:'0.5px solid rgba(0,0,0,0.08)', borderRadius:'10px', padding:'1.5rem', minHeight:'160px', display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
                  <div style={{ fontSize:'14px', fontWeight:500, color:'#0D0D0D' }}>{panel}</div>
                  <div style={{ display:'inline-block', background:'#F2EBF8', color:'#3B1A55', fontSize:'11px', letterSpacing:'0.1em', textTransform:'uppercase', padding:'5px 12px', borderRadius:'100px', alignSelf:'flex-start' }}>
                    Coming in Phase 2
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        {activeNav !== 'overview' && (
          <div style={{ background:'#fff', border:'0.5px solid rgba(0,0,0,0.08)', borderRadius:'10px', padding:'3rem', textAlign:'center' }}>
            <div style={{ fontSize:'18px', fontWeight:400, color:'#0D0D0D', marginBottom:'0.5rem' }}>
              {navItems.find(n => n.id === activeNav)?.label} — coming soon
            </div>
            <div style={{ fontSize:'14px', color:'#888' }}>This section will be built in the next phase.</div>
          </div>
        )}
      </main>
    </div>
  )
}
