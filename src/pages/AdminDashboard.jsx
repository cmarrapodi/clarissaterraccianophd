import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const navItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'bookings', label: 'Bookings' },
  { id: 'leads', label: 'Leads' },
  { id: 'calendar', label: 'Calendar' },
  { id: 'services', label: 'Services' },
  { id: 'content', label: 'Content' },
  { id: 'revenue', label: 'Revenue' },
  { id: 'analytics', label: 'Analytics' },
]

const statusColors = {
  confirmed: { bg: '#F2EBF8', color: '#5C2D82' },
  pending_payment: { bg: '#FFF8E7', color: '#B8860B' },
  free: { bg: '#E8F8F0', color: '#2D7A4F' },
  cancelled: { bg: '#FDF2F2', color: '#9B2B2B' },
}

const statusLabels = {
  confirmed: 'Confirmed',
  pending_payment: 'Pending Payment',
  free: 'Free Call',
  cancelled: 'Cancelled',
}

export default function AdminDashboard() {
  const [activeNav, setActiveNav] = useState('overview')
  const [bookings, setBookings] = useState([])
  const [loadingBookings, setLoadingBookings] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState(null)
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/admin')
  }

  useEffect(() => {
    if (activeNav === 'bookings' || activeNav === 'overview') {
      fetchBookings()
    }
  }, [activeNav])

  const fetchBookings = async () => {
    setLoadingBookings(true)
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error) setBookings(data || [])
    setLoadingBookings(false)
  }

  const updateBookingStatus = async (id, status) => {
    await supabase.from('bookings').update({ status }).eq('id', id)
    fetchBookings()
    setSelectedBooking(null)
  }

  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
  const formatMoney = (cents) => cents === 0 ? 'Free' : `$${(cents / 100).toFixed(0)}`

  const upcomingBookings = bookings.filter(b => new Date(b.session_date) >= new Date())
  const pastBookings = bookings.filter(b => new Date(b.session_date) < new Date())

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F9F6F2', fontFamily: 'inherit' }}>

      {/* Sidebar */}
      <aside style={{ width: '220px', flexShrink: 0, background: '#1A0F24', display: 'flex', flexDirection: 'column', padding: '2rem 0', position: 'sticky', top: 0, height: '100vh' }}>
        <div style={{ padding: '0 1.5rem 2rem' }}>
          <div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9B6BBD', marginBottom: '4px' }}>Admin Portal</div>
          <div style={{ fontSize: '14px', fontWeight: 500, color: '#fff', lineHeight: 1.3 }}>Clarissa Terracciano</div>
        </div>
        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px', padding: '0 0.75rem' }}>
          {navItems.map(item => (
            <button key={item.id} onClick={() => setActiveNav(item.id)}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '6px', border: 'none',
                background: activeNav === item.id ? 'rgba(92,45,130,0.4)' : 'transparent',
                color: activeNav === item.id ? '#fff' : 'rgba(255,255,255,0.45)',
                fontSize: '13px', cursor: 'pointer', textAlign: 'left', width: '100%',
                borderLeft: activeNav === item.id ? '2px solid #9B6BBD' : '2px solid transparent' }}>
              {item.label}
            </button>
          ))}
        </nav>
        <div style={{ padding: '1.5rem 1.25rem 0' }}>
          <button onClick={handleLogout}
            style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: 'rgba(255,255,255,0.4)', fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer' }}>
            Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: '2.5rem', overflowY: 'auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9B6BBD', marginBottom: '6px' }}>
            {navItems.find(n => n.id === activeNav)?.label}
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 400, color: '#0D0D0D', letterSpacing: '-0.02em', margin: 0 }}>
            {activeNav === 'overview' ? 'Good morning, Clarissa.' : navItems.find(n => n.id === activeNav)?.label}
          </h1>
        </div>

        {/* OVERVIEW */}
        {activeNav === 'overview' && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
              {[
                { label: 'Total bookings', value: bookings.length },
                { label: 'Upcoming sessions', value: upcomingBookings.length },
                { label: 'Discovery calls', value: bookings.filter(b => b.payment_status === 'free').length },
                { label: 'Paid sessions', value: bookings.filter(b => b.payment_status !== 'free' && b.payment_status !== 'pending').length },
              ].map(stat => (
                <div key={stat.label} style={{ background: '#fff', border: '0.5px solid rgba(0,0,0,0.08)', borderRadius: '10px', padding: '1.5rem' }}>
                  <div style={{ fontSize: '32px', fontWeight: 300, color: '#5C2D82', marginBottom: '4px' }}>{stat.value}</div>
                  <div style={{ fontSize: '13px', color: '#0D0D0D' }}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Recent bookings */}
            <div style={{ background: '#fff', border: '0.5px solid rgba(0,0,0,0.08)', borderRadius: '10px', padding: '1.5rem' }}>
              <div style={{ fontSize: '15px', fontWeight: 500, color: '#0D0D0D', marginBottom: '1.5rem' }}>Recent bookings</div>
              {loadingBookings ? <div style={{ color: '#aaa', fontSize: '14px' }}>Loading...</div> :
                bookings.slice(0, 5).map(booking => (
                  <div key={booking.id} onClick={() => setSelectedBooking(booking)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0', borderBottom: '0.5px solid rgba(0,0,0,0.06)', cursor: 'pointer' }}>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 500, color: '#0D0D0D' }}>{booking.client_name}</div>
                      <div style={{ fontSize: '12px', color: '#888' }}>{booking.service_type} · {formatDate(booking.session_date)} at {booking.session_time}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ fontSize: '14px', fontWeight: 500, color: '#5C2D82' }}>{formatMoney(booking.amount_cents)}</div>
                      <div style={{ padding: '4px 10px', borderRadius: '100px', fontSize: '11px', fontWeight: 500, background: statusColors[booking.status]?.bg || '#f5f5f5', color: statusColors[booking.status]?.color || '#666' }}>
                        {statusLabels[booking.status] || booking.status}
                      </div>
                    </div>
                  </div>
                ))
              }
              {bookings.length === 0 && !loadingBookings && <div style={{ color: '#aaa', fontSize: '14px' }}>No bookings yet.</div>}
            </div>
          </>
        )}

        {/* BOOKINGS */}
        {activeNav === 'bookings' && (
          <div>
            {/* Upcoming */}
            <div style={{ background: '#fff', border: '0.5px solid rgba(0,0,0,0.08)', borderRadius: '10px', padding: '1.5rem', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '15px', fontWeight: 500, color: '#0D0D0D', marginBottom: '1.5rem' }}>Upcoming Sessions ({upcomingBookings.length})</div>
              {loadingBookings ? <div style={{ color: '#aaa' }}>Loading...</div> :
                upcomingBookings.length === 0 ? <div style={{ color: '#aaa', fontSize: '14px' }}>No upcoming sessions.</div> :
                upcomingBookings.map(booking => (
                  <div key={booking.id} onClick={() => setSelectedBooking(booking)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0', borderBottom: '0.5px solid rgba(0,0,0,0.06)', cursor: 'pointer' }}>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 500, color: '#0D0D0D' }}>{booking.client_name}</div>
                      <div style={{ fontSize: '12px', color: '#888', marginBottom: '2px' }}>{booking.service_type}</div>
                      <div style={{ fontSize: '12px', color: '#5C2D82' }}>{formatDate(booking.session_date)} at {booking.session_time}</div>
                      {booking.client_email && <div style={{ fontSize: '12px', color: '#888' }}>{booking.client_email} {booking.client_phone && `· ${booking.client_phone}`}</div>}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                      <div style={{ fontSize: '16px', fontWeight: 500, color: '#5C2D82' }}>{formatMoney(booking.amount_cents)}</div>
                      <div style={{ padding: '4px 10px', borderRadius: '100px', fontSize: '11px', fontWeight: 500, background: statusColors[booking.status]?.bg || '#f5f5f5', color: statusColors[booking.status]?.color || '#666' }}>
                        {statusLabels[booking.status] || booking.status}
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>

            {/* Past */}
            <div style={{ background: '#fff', border: '0.5px solid rgba(0,0,0,0.08)', borderRadius: '10px', padding: '1.5rem' }}>
              <div style={{ fontSize: '15px', fontWeight: 500, color: '#0D0D0D', marginBottom: '1.5rem' }}>Past Sessions ({pastBookings.length})</div>
              {pastBookings.length === 0 ? <div style={{ color: '#aaa', fontSize: '14px' }}>No past sessions.</div> :
                pastBookings.map(booking => (
                  <div key={booking.id} onClick={() => setSelectedBooking(booking)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0', borderBottom: '0.5px solid rgba(0,0,0,0.06)', cursor: 'pointer', opacity: 0.7 }}>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 500, color: '#0D0D0D' }}>{booking.client_name}</div>
                      <div style={{ fontSize: '12px', color: '#888' }}>{booking.service_type} · {formatDate(booking.session_date)} at {booking.session_time}</div>
                    </div>
                    <div style={{ fontSize: '14px', color: '#888' }}>{formatMoney(booking.amount_cents)}</div>
                  </div>
                ))
              }
            </div>
          </div>
        )}

        {/* OTHER SECTIONS */}
        {activeNav !== 'overview' && activeNav !== 'bookings' && (
          <div style={{ background: '#fff', border: '0.5px solid rgba(0,0,0,0.08)', borderRadius: '10px', padding: '3rem', textAlign: 'center' }}>
            <div style={{ fontSize: '18px', fontWeight: 400, color: '#0D0D0D', marginBottom: '0.5rem' }}>
              {navItems.find(n => n.id === activeNav)?.label} — coming in next phase
            </div>
            <div style={{ fontSize: '14px', color: '#888' }}>This section is being built out.</div>
          </div>
        )}

      </main>

      {/* Booking detail modal */}
      {selectedBooking && (
        <div onClick={() => setSelectedBooking(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: '12px', padding: '2rem', maxWidth: '480px', width: '100%', boxShadow: '0 24px 64px rgba(0,0,0,0.15)' }}>
            <div style={{ fontSize: '18px', fontWeight: 500, color: '#0D0D0D', marginBottom: '1.5rem' }}>Booking Details</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '2rem' }}>
              {[
                { label: 'Client', value: selectedBooking.client_name },
                { label: 'Email', value: selectedBooking.client_email },
                { label: 'Phone', value: selectedBooking.client_phone || 'Not provided' },
                { label: 'Service', value: selectedBooking.service_type },
                { label: 'Date', value: formatDate(selectedBooking.session_date) },
                { label: 'Time', value: selectedBooking.session_time },
                { label: 'Amount', value: formatMoney(selectedBooking.amount_cents) },
                { label: 'Notes', value: selectedBooking.notes || 'None' },
              ].map(row => (
                <div key={row.label} style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ fontSize: '12px', color: '#888', width: '70px', flexShrink: 0, paddingTop: '2px' }}>{row.label}</div>
                  <div style={{ fontSize: '14px', color: '#0D0D0D' }}>{row.value}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: '12px', color: '#888', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Update status</div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              {['confirmed', 'pending_payment', 'cancelled'].map(status => (
                <button key={status} onClick={() => updateBookingStatus(selectedBooking.id, status)}
                  style={{ padding: '8px 14px', borderRadius: '6px', border: '0.5px solid rgba(0,0,0,0.15)', background: selectedBooking.status === status ? '#5C2D82' : '#fff', color: selectedBooking.status === status ? '#fff' : '#0D0D0D', fontSize: '12px', cursor: 'pointer' }}>
                  {statusLabels[status]}
                </button>
              ))}
            </div>
            <button onClick={() => setSelectedBooking(null)} style={{ width: '100%', padding: '12px', background: '#F9F6F2', border: '0.5px solid rgba(0,0,0,0.1)', borderRadius: '6px', fontSize: '13px', cursor: 'pointer', color: '#666' }}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
