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
          <div style={{ fontSize:'11px', letterSpacing:'0.2em', textTransform:'
