import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const navItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'bookings', label: 'Bookings' },
  { id: 'leads', label: 'Leads' },
  { id: 'calendar', label: 'Calendar' },
  { id: 'services', label: 'Services' },
  { id: 'revenue', label: 'Revenue' },
  { id: 'analytics', label: 'Analytics' },
]

const statusColors = {
  confirmed: { bg: '#F2EBF8', color: '#5C2D82' },
  pending_payment: { bg: '#FFF8E7', color: '#B8860B' },
  pending: { bg: '#FFF8E7', color: '#B8860B' },
  free: { bg: '#E8F8F0', color: '#2D7A4F' },
  cancelled: { bg: '#FDF2F2', color: '#9B2B2B' },
}

const statusLabels = {
  confirmed: 'Confirmed',
  pending_payment: 'Pending Payment',
  pending: 'Pending',
  free: 'Free Call',
  cancelled: 'Cancelled',
}

const allServices = [
  { id: 'discovery', title: 'Free Discovery Call', price: 0, duration: '30 min' },
  { id: 'consulting', title: 'Private Educational Consulting', price: 375, duration: '90 min' },
  { id: 'tutoring', title: 'Academic Tutoring', price: 337.50, duration: '90 min' },
  { id: 'literacy', title: 'Literacy & Reading Support', price: 375, duration: '90 min' },
  { id: 'intervention', title: 'Intensive Academic Intervention', price: 412.50, duration: '90 min' },
  { id: 'homeschool', title: 'Homeschool Planning & Curriculum Design', price: 450, duration: '90 min' },
  { id: 'advocacy', title: 'Educational Advocacy & Parent Strategy', price: 375, duration: '90 min' },
  { id: 'dissertation', title: 'Dissertation & Research Consulting', price: 375, duration: '90 min' },
  { id: 'policy', title: 'Educational Policy & EdTech Consulting', price: 525, duration: '90 min' },
  { id: 'org', title: 'School / Organizational Consulting', price: 525, duration: '90 min' },
  { id: 'pods', title: 'Learning Pods', price: 375, duration: '90 min' },
  { id: 'retainer', title: 'Monthly Family Educational Retainer', price: 1500, duration: 'Ongoing' },
  { id: 'halfday', title: 'Half-Day Consulting', price: 1500, duration: '4 hrs' },
  { id: 'fullday', title: 'Full-Day Consulting', price: 3000, duration: '8 hrs' },
]

const defaultTimeSlots = ['9:00 AM', '10:30 AM', '12:00 PM', '1:30 PM', '3:00 PM', '4:30 PM']
const defaultAvailableDays = [1, 2, 3, 4, 5]

const inputStyle = { width: '100%', padding: '10px 14px', fontSize: '14px', color: '#0D0D0D', background: '#fff', border: '0.5px solid rgba(0,0,0,0.15)', borderRadius: '6px', outline: 'none', boxSizing: 'border-box' }
const labelStyle = { fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#666', display: 'block', marginBottom: '6px' }

export default function AdminDashboard() {
  const [activeNav, setActiveNav] = useState('overview')
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [editingBooking, setEditingBooking] = useState(null)
  const [editForm, setEditForm] = useState({})
  const [availableDays, setAvailableDays] = useState(defaultAvailableDays)
  const [timeSlots, setTimeSlots] = useState(defaultTimeSlots)
  const [newTimeSlot, setNewTimeSlot] = useState('')
  const [blockedDates, setBlockedDates] = useState([])
  const [newBlockedDate, setNewBlockedDate] = useState('')
  const [services, setServices] = useState(allServices)
  const [editingService, setEditingService] = useState(null)
  const [serviceForm, setServiceForm] = useState({})
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/admin')
  }

  useEffect(() => { fetchBookings() }, [])

  const fetchBookings = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('bookings').select('*').order('created_at', { ascending: false })
    if (!error) setBookings(data || [])
    setLoading(false)
  }

  const updateBookingStatus = async (id, status) => {
    await supabase.from('bookings').update({ status }).eq('id', id)
    fetchBookings()
    setSelectedBooking(null)
  }

  const saveEditedBooking = async () => {
    await supabase.from('bookings').update({
      client_name: editForm.client_name,
      client_email: editForm.client_email,
      client_phone: editForm.client_phone,
      service_type: editForm.service_type,
      session_date: editForm.session_date,
      session_time: editForm.session_time,
      status: editForm.status,
      notes: editForm.notes,
      zoom_link: editForm.zoom_link,
    }).eq('id', editingBooking.id)
    fetchBookings()
    setEditingBooking(null)
    setSelectedBooking(null)
  }

  const deleteBooking = async (id) => {
    if (!confirm('Are you sure you want to delete this booking?')) return
    await supabase.from('bookings').delete().eq('id', id)
    fetchBookings()
    setSelectedBooking(null)
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    return new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
  }
  const formatMoney = (cents) => cents === 0 ? 'Free' : `$${(cents / 100).toFixed(0)}`

  const upcomingBookings = bookings.filter(b => new Date(b.session_date) >= new Date())
  const pastBookings = bookings.filter(b => new Date(b.session_date) < new Date())
  const totalRevenue = bookings.filter(b => b.payment_status === 'paid').reduce((sum, b) => sum + (b.amount_cents || 0), 0)
  const pendingRevenue = bookings.filter(b => b.payment_status === 'pending' || b.payment_status === 'pending_payment').reduce((sum, b) => sum + (b.amount_cents || 0), 0)

  const parseIntake = (notes) => {
    if (!notes) return null
    const lines = notes.split('\n')
    const result = {}
    lines.forEach(line => {
      const [key, ...rest] = line.split(': ')
      if (key && rest.length) result[key.trim()] = rest.join(': ').trim()
    })
    return Object.keys(result).length > 0 ? result : null
  }

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const servicesByType = bookings.reduce((acc, b) => {
    acc[b.service_type] = (acc[b.service_type] || 0) + 1
    return acc
  }, {})

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F9F6F2', fontFamily: 'inherit' }}>

      {/* Sidebar */}
      <aside style={{ width: '220px', flexShrink: 0, background: '#1A0F24', display: 'flex', flexDirection: 'column', padding: '2rem 0', position: 'sticky', top: 0, height: '100vh' }}>
        <div style={{ padding: '0 1.5rem 2rem' }}>
          <div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9B6BBD', marginBottom: '4px' }}>Admin Portal</div>
          <div style={{ fontSize: '14px', fontWeight: 500, color: '#fff' }}>Clarissa Terracciano</div>
        </div>
        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px', padding: '0 0.75rem' }}>
          {navItems.map(item => (
            <button key={item.id} onClick={() => setActiveNav(item.id)}
              style={{ padding: '10px 12px', borderRadius: '6px', border: 'none', background: activeNav === item.id ? 'rgba(92,45,130,0.4)' : 'transparent', color: activeNav === item.id ? '#fff' : 'rgba(255,255,255,0.45)', fontSize: '13px', cursor: 'pointer', textAlign: 'left', width: '100%', borderLeft: activeNav === item.id ? '2px solid #9B6BBD' : '2px solid transparent' }}>
              {item.label}
            </button>
          ))}
        </nav>
        <div style={{ padding: '1.5rem 1.25rem 0' }}>
          <button onClick={handleLogout} style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: 'rgba(255,255,255,0.4)', fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer' }}>
            Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: '2.5rem', overflowY: 'auto' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9B6BBD', marginBottom: '6px' }}>{navItems.find(n => n.id === activeNav)?.label}</div>
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
                { label: 'Confirmed paid', value: bookings.filter(b => b.status === 'confirmed' && b.amount_cents > 0).length },
              ].map(stat => (
                <div key={stat.label} style={{ background: '#fff', border: '0.5px solid rgba(0,0,0,0.08)', borderRadius: '10px', padding: '1.5rem' }}>
                  <div style={{ fontSize: '32px', fontWeight: 300, color: '#5C2D82', marginBottom: '4px' }}>{stat.value}</div>
                  <div style={{ fontSize: '13px', color: '#666' }}>{stat.label}</div>
                </div>
              ))}
            </div>
            <div style={{ background: '#fff', border: '0.5px solid rgba(0,0,0,0.08)', borderRadius: '10px', padding: '1.5rem' }}>
              <div style={{ fontSize: '15px', fontWeight: 500, color: '#0D0D0D', marginBottom: '1.5rem' }}>Recent bookings</div>
              {loading ? <div style={{ color: '#aaa' }}>Loading...</div> :
                bookings.length === 0 ? <div style={{ color: '#aaa', fontSize: '14px' }}>No bookings yet.</div> :
                bookings.slice(0, 5).map(b => (
                  <div key={b.id} onClick={() => setSelectedBooking(b)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0', borderBottom: '0.5px solid rgba(0,0,0,0.06)', cursor: 'pointer' }}>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 500, color: '#0D0D0D' }}>{b.client_name}</div>
                      <div style={{ fontSize: '12px', color: '#888' }}>{b.service_type} · {formatDate(b.session_date)} at {b.session_time}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ fontSize: '14px', fontWeight: 500, color: '#5C2D82' }}>{formatMoney(b.amount_cents)}</div>
                      <div style={{ padding: '4px 10px', borderRadius: '100px', fontSize: '11px', background: statusColors[b.status]?.bg || '#f5f5f5', color: statusColors[b.status]?.color || '#666' }}>
                        {statusLabels[b.status] || b.status}
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </>
        )}

        {/* BOOKINGS */}
        {activeNav === 'bookings' && (
          <div>
            {[{ title: 'Upcoming Sessions', list: upcomingBookings }, { title: 'Past Sessions', list: pastBookings }].map(section => (
              <div key={section.title} style={{ background: '#fff', border: '0.5px solid rgba(0,0,0,0.08)', borderRadius: '10px', padding: '1.5rem', marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '15px', fontWeight: 500, color: '#0D0D0D', marginBottom: '1.5rem' }}>{section.title} ({section.list.length})</div>
                {section.list.length === 0 ? <div style={{ color: '#aaa', fontSize: '14px' }}>None yet.</div> :
                  section.list.map(b => (
                    <div key={b.id} onClick={() => setSelectedBooking(b)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0', borderBottom: '0.5px solid rgba(0,0,0,0.06)', cursor: 'pointer' }}>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 500, color: '#0D0D0D' }}>{b.client_name}</div>
                        <div style={{ fontSize: '12px', color: '#888', marginBottom: '2px' }}>{b.service_type}</div>
                        <div style={{ fontSize: '12px', color: '#5C2D82' }}>{formatDate(b.session_date)} at {b.session_time}</div>
                        <div style={{ fontSize: '12px', color: '#888' }}>{b.client_email}{b.client_phone ? ` · ${b.client_phone}` : ''}</div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                        <div style={{ fontSize: '16px', fontWeight: 500, color: '#5C2D82' }}>{formatMoney(b.amount_cents)}</div>
                        <div style={{ padding: '4px 10px', borderRadius: '100px', fontSize: '11px', background: statusColors[b.status]?.bg || '#f5f5f5', color: statusColors[b.status]?.color || '#666' }}>
                          {statusLabels[b.status] || b.status}
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            ))}
          </div>
        )}

        {/* LEADS */}
        {activeNav === 'leads' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
              {[
                { label: 'Total inquiries', value: bookings.length, color: '#5C2D82' },
                { label: 'Discovery calls', value: bookings.filter(b => b.payment_status === 'free').length, color: '#2D7A4F' },
                { label: 'Converted to paid', value: bookings.filter(b => b.amount_cents > 0 && b.status === 'confirmed').length, color: '#B8860B' },
              ].map(s => (
                <div key={s.label} style={{ background: '#fff', border: '0.5px solid rgba(0,0,0,0.08)', borderRadius: '10px', padding: '1.5rem' }}>
                  <div style={{ fontSize: '32px', fontWeight: 300, color: s.color, marginBottom: '4px' }}>{s.value}</div>
                  <div style={{ fontSize: '13px', color: '#666' }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{ background: '#fff', border: '0.5px solid rgba(0,0,0,0.08)', borderRadius: '10px', padding: '1.5rem' }}>
              <div style={{ fontSize: '15px', fontWeight: 500, color: '#0D0D0D', marginBottom: '1.5rem' }}>All Leads & Inquiries</div>
              {bookings.length === 0 ? <div style={{ color: '#aaa' }}>No leads yet.</div> :
                bookings.map(b => (
                  <div key={b.id} onClick={() => setSelectedBooking(b)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0', borderBottom: '0.5px solid rgba(0,0,0,0.06)', cursor: 'pointer' }}>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 500, color: '#0D0D0D' }}>{b.client_name}</div>
                      <div style={{ fontSize: '12px', color: '#888' }}>{b.client_email}</div>
                      <div style={{ fontSize: '12px', color: '#5C2D82' }}>{b.service_type}</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                      <div style={{ fontSize: '12px', color: '#888' }}>{formatDate(b.created_at)}</div>
                      <div style={{ padding: '4px 10px', borderRadius: '100px', fontSize: '11px', background: statusColors[b.status]?.bg || '#f5f5f5', color: statusColors[b.status]?.color || '#666' }}>
                        {statusLabels[b.status] || b.status}
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        )}

        {/* CALENDAR */}
        {activeNav === 'calendar' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div style={{ background: '#fff', border: '0.5px solid rgba(0,0,0,0.08)', borderRadius: '10px', padding: '1.5rem' }}>
              <div style={{ fontSize: '15px', fontWeight: 500, color: '#0D0D0D', marginBottom: '1.5rem' }}>Available Days</div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1rem' }}>
                {dayNames.map((day, i) => (
                  <button key={i} onClick={() => setAvailableDays(prev => prev.includes(i) ? prev.filter(d => d !== i) : [...prev, i])}
                    style={{ padding: '8px 16px', borderRadius: '6px', border: '0.5px solid rgba(0,0,0,0.15)', background: availableDays.includes(i) ? '#5C2D82' : '#fff', color: availableDays.includes(i) ? '#fff' : '#666', fontSize: '13px', cursor: 'pointer' }}>
                    {day}
                  </button>
                ))}
              </div>
              <div style={{ fontSize: '12px', color: '#888' }}>Click to toggle availability. Currently available: {availableDays.map(d => dayNames[d]).join(', ')}</div>
            </div>

            <div style={{ background: '#fff', border: '0.5px solid rgba(0,0,0,0.08)', borderRadius: '10px', padding: '1.5rem' }}>
              <div style={{ fontSize: '15px', fontWeight: 500, color: '#0D0D0D', marginBottom: '1.5rem' }}>Time Slots</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '1rem' }}>
                {timeSlots.map(slot => (
                  <div key={slot} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: '#F9F6F2', borderRadius: '6px' }}>
                    <span style={{ fontSize: '14px', color: '#0D0D0D' }}>{slot}</span>
                    <button onClick={() => setTimeSlots(prev => prev.filter(s => s !== slot))}
                      style={{ background: 'none', border: 'none', color: '#9B2B2B', fontSize: '12px', cursor: 'pointer' }}>Remove</button>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input type="text" placeholder="e.g. 2:00 PM" value={newTimeSlot} onChange={e => setNewTimeSlot(e.target.value)}
                  style={{ ...inputStyle, flex: 1 }} />
                <button onClick={() => { if (newTimeSlot) { setTimeSlots(prev => [...prev, newTimeSlot]); setNewTimeSlot('') } }}
                  style={{ padding: '10px 16px', background: '#5C2D82', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '13px', cursor: 'pointer' }}>Add</button>
              </div>
            </div>

            <div style={{ background: '#fff', border: '0.5px solid rgba(0,0,0,0.08)', borderRadius: '10px', padding: '1.5rem' }}>
              <div style={{ fontSize: '15px', fontWeight: 500, color: '#0D0D0D', marginBottom: '1.5rem' }}>Blocked Dates</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '1rem' }}>
                {blockedDates.length === 0 ? <div style={{ color: '#aaa', fontSize: '13px' }}>No blocked dates.</div> :
                  blockedDates.map(date => (
                    <div key={date} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: '#FDF2F2', borderRadius: '6px' }}>
                      <span style={{ fontSize: '14px', color: '#9B2B2B' }}>{formatDate(date)}</span>
                      <button onClick={() => setBlockedDates(prev => prev.filter(d => d !== date))}
                        style={{ background: 'none', border: 'none', color: '#9B2B2B', fontSize: '12px', cursor: 'pointer' }}>Remove</button>
                    </div>
                  ))
                }
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input type="date" value={newBlockedDate} onChange={e => setNewBlockedDate(e.target.value)}
                  style={{ ...inputStyle, flex: 1 }} />
                <button onClick={() => { if (newBlockedDate) { setBlockedDates(prev => [...prev, newBlockedDate]); setNewBlockedDate('') } }}
                  style={{ padding: '10px 16px', background: '#5C2D82', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '13px', cursor: 'pointer' }}>Block</button>
              </div>
            </div>

            <div style={{ background: '#fff', border: '0.5px solid rgba(0,0,0,0.08)', borderRadius: '10px', padding: '1.5rem' }}>
              <div style={{ fontSize: '15px', fontWeight: 500, color: '#0D0D0D', marginBottom: '1.5rem' }}>Upcoming Bookings</div>
              {upcomingBookings.length === 0 ? <div style={{ color: '#aaa', fontSize: '13px' }}>No upcoming bookings.</div> :
                upcomingBookings.slice(0, 6).map(b => (
                  <div key={b.id} style={{ padding: '8px 0', borderBottom: '0.5px solid rgba(0,0,0,0.06)' }}>
                    <div style={{ fontSize: '13px', fontWeight: 500, color: '#0D0D0D' }}>{b.client_name}</div>
                    <div style={{ fontSize: '12px', color: '#5C2D82' }}>{formatDate(b.session_date)} at {b.session_time}</div>
                    <div style={{ fontSize: '12px', color: '#888' }}>{b.service_type}</div>
                  </div>
                ))
              }
            </div>
          </div>
        )}

        {/* SERVICES */}
        {activeNav === 'services' && (
          <div style={{ background: '#fff', border: '0.5px solid rgba(0,0,0,0.08)', borderRadius: '10px', padding: '1.5rem' }}>
            <div style={{ fontSize: '15px', fontWeight: 500, color: '#0D0D0D', marginBottom: '1.5rem' }}>Manage Services</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {services.map(s => (
                <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.25rem', background: '#F9F6F2', borderRadius: '8px', border: '0.5px solid rgba(0,0,0,0.08)' }}>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 500, color: '#0D0D0D' }}>{s.title}</div>
                    <div style={{ fontSize: '12px', color: '#888' }}>{s.duration} · {s.price === 0 ? 'Free' : `$${s.price}`}</div>
                  </div>
                  <button onClick={() => { setEditingService(s); setServiceForm({ ...s }) }}
                    style={{ padding: '7px 16px', background: '#5C2D82', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}>Edit</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* REVENUE */}
        {activeNav === 'revenue' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
              {[
                { label: 'Total collected', value: `$${(totalRevenue / 100).toFixed(0)}`, color: '#2D7A4F' },
                { label: 'Pending payment', value: `$${(pendingRevenue / 100).toFixed(0)}`, color: '#B8860B' },
                { label: 'Free sessions', value: bookings.filter(b => b.amount_cents === 0).length, color: '#5C2D82' },
              ].map(s => (
                <div key={s.label} style={{ background: '#fff', border: '0.5px solid rgba(0,0,0,0.08)', borderRadius: '10px', padding: '1.5rem' }}>
                  <div style={{ fontSize: '32px', fontWeight: 300, color: s.color, marginBottom: '4px' }}>{s.value}</div>
                  <div style={{ fontSize: '13px', color: '#666' }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{ background: '#fff', border: '0.5px solid rgba(0,0,0,0.08)', borderRadius: '10px', padding: '1.5rem' }}>
              <div style={{ fontSize: '15px', fontWeight: 500, color: '#0D0D0D', marginBottom: '1.5rem' }}>Payment History</div>
              {bookings.length === 0 ? <div style={{ color: '#aaa' }}>No payments yet.</div> :
                bookings.map(b => (
                  <div key={b.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0', borderBottom: '0.5px solid rgba(0,0,0,0.06)' }}>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 500, color: '#0D0D0D' }}>{b.client_name}</div>
                      <div style={{ fontSize: '12px', color: '#888' }}>{b.service_type} · {formatDate(b.session_date)}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ fontSize: '15px', fontWeight: 500, color: b.amount_cents === 0 ? '#2D7A4F' : '#0D0D0D' }}>{formatMoney(b.amount_cents)}</div>
                      <div style={{ padding: '4px 10px', borderRadius: '100px', fontSize: '11px', background: statusColors[b.payment_status]?.bg || '#f5f5f5', color: statusColors[b.payment_status]?.color || '#666' }}>
                        {b.payment_status || 'unknown'}
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        )}

        {/* ANALYTICS */}
        {activeNav === 'analytics' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
              <div style={{ background: '#fff', border: '0.5px solid rgba(0,0,0,0.08)', borderRadius: '10px', padding: '1.5rem' }}>
                <div style={{ fontSize: '15px', fontWeight: 500, color: '#0D0D0D', marginBottom: '1.5rem' }}>Bookings by Service</div>
                {Object.entries(servicesByType).length === 0 ? <div style={{ color: '#aaa' }}>No data yet.</div> :
                  Object.entries(servicesByType).sort((a, b) => b[1] - a[1]).map(([service, count]) => (
                    <div key={service} style={{ marginBottom: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ fontSize: '13px', color: '#0D0D0D' }}>{service}</span>
                        <span style={{ fontSize: '13px', color: '#5C2D82', fontWeight: 500 }}>{count}</span>
                      </div>
                      <div style={{ height: '6px', background: '#F2EBF8', borderRadius: '100px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', background: '#5C2D82', borderRadius: '100px', width: `${(count / bookings.length) * 100}%` }} />
                      </div>
                    </div>
                  ))
                }
              </div>
              <div style={{ background: '#fff', border: '0.5px solid rgba(0,0,0,0.08)', borderRadius: '10px', padding: '1.5rem' }}>
                <div style={{ fontSize: '15px', fontWeight: 500, color: '#0D0D0D', marginBottom: '1.5rem' }}>Booking Status Breakdown</div>
                {['confirmed', 'pending_payment', 'free', 'cancelled'].map(status => {
                  const count = bookings.filter(b => b.status === status).length
                  return (
                    <div key={status} style={{ marginBottom: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ fontSize: '13px', color: '#0D0D0D' }}>{statusLabels[status]}</span>
                        <span style={{ fontSize: '13px', fontWeight: 500, color: statusColors[status]?.color || '#666' }}>{count}</span>
                      </div>
                      <div style={{ height: '6px', background: '#F2EBF8', borderRadius: '100px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', background: statusColors[status]?.color || '#ccc', borderRadius: '100px', width: bookings.length ? `${(count / bookings.length) * 100}%` : '0%' }} />
                      </div>
                    </div>
                  )
                })}
              </div>
              <div style={{ background: '#fff', border: '0.5px solid rgba(0,0,0,0.08)', borderRadius: '10px', padding: '1.5rem' }}>
                <div style={{ fontSize: '15px', fontWeight: 500, color: '#0D0D0D', marginBottom: '1.5rem' }}>How Clients Found You</div>
                {(() => {
                  const sources = {}
                  bookings.forEach(b => {
                    const intake = parseIntake(b.notes)
                    const source = intake?.['HEARD ABOUT US'] || 'Not provided'
                    sources[source] = (sources[source] || 0) + 1
                  })
                  return Object.entries(sources).length === 0 ? <div style={{ color: '#aaa' }}>No data yet.</div> :
                    Object.entries(sources).sort((a, b) => b[1] - a[1]).map(([source, count]) => (
                      <div key={source} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '0.5px solid rgba(0,0,0,0.06)' }}>
                        <span style={{ fontSize: '13px', color: '#0D0D0D' }}>{source}</span>
                        <span style={{ fontSize: '13px', fontWeight: 500, color: '#5C2D82' }}>{count}</span>
                      </div>
                    ))
                })()}
              </div>
              <div style={{ background: '#fff', border: '0.5px solid rgba(0,0,0,0.08)', borderRadius: '10px', padding: '1.5rem' }}>
                <div style={{ fontSize: '15px', fontWeight: 500, color: '#0D0D0D', marginBottom: '1.5rem' }}>Revenue Summary</div>
                {[
                  { label: 'Total bookings', value: bookings.length },
                  { label: 'Paid sessions', value: bookings.filter(b => b.amount_cents > 0).length },
                  { label: 'Free sessions', value: bookings.filter(b => b.amount_cents === 0).length },
                  { label: 'Confirmed revenue', value: `$${(totalRevenue / 100).toFixed(0)}` },
                  { label: 'Pending revenue', value: `$${(pendingRevenue / 100).toFixed(0)}` },
                ].map(row => (
                  <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '0.5px solid rgba(0,0,0,0.06)' }}>
                    <span style={{ fontSize: '13px', color: '#666' }}>{row.label}</span>
                    <span style={{ fontSize: '13px', fontWeight: 500, color: '#0D0D0D' }}>{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Booking detail modal */}
      {selectedBooking && !editingBooking && (
        <div onClick={() => setSelectedBooking(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: '12px', padding: '2rem', maxWidth: '560px', width: '100%', boxShadow: '0 24px 64px rgba(0,0,0,0.15)', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '18px', fontWeight: 500, color: '#0D0D0D' }}>Booking Details</div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => { setEditingBooking(selectedBooking); setEditForm({ ...selectedBooking }) }}
                  style={{ padding: '7px 14px', background: '#5C2D82', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}>Edit</button>
                <button onClick={() => deleteBooking(selectedBooking.id)}
                  style={{ padding: '7px 14px', background: '#FDF2F2', color: '#9B2B2B', border: '0.5px solid rgba(155,43,43,0.2)', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}>Delete</button>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '1.5rem' }}>
              {[
                { label: 'Client', value: selectedBooking.client_name },
                { label: 'Email', value: selectedBooking.client_email },
                { label: 'Phone', value: selectedBooking.client_phone || 'Not provided' },
                { label: 'Service', value: selectedBooking.service_type },
                { label: 'Date', value: formatDate(selectedBooking.session_date) },
                { label: 'Time', value: selectedBooking.session_time },
                { label: 'Amount', value: formatMoney(selectedBooking.amount_cents) },
                { label: 'Status', value: statusLabels[selectedBooking.status] || selectedBooking.status },
                { label: 'Zoom link', value: selectedBooking.zoom_link || 'Not set' },
              ].map(row => (
                <div key={row.label} style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ fontSize: '12px', color: '#888', width: '70px', flexShrink: 0, paddingTop: '2px' }}>{row.label}</div>
                  <div style={{ fontSize: '14px', color: '#0D0D0D' }}>{row.value}</div>
                </div>
              ))}
            </div>

            {/* Intake survey */}
            {(() => {
              const intake = parseIntake(selectedBooking.notes)
              if (!intake) return selectedBooking.notes ? (
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '12px', color: '#888', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Notes</div>
                  <div style={{ fontSize: '13px', color: '#0D0D0D', background: '#F9F6F2', padding: '12px', borderRadius: '6px', lineHeight: 1.6 }}>{selectedBooking.notes}</div>
                </div>
              ) : null
              return (
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '12px', color: '#888', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Intake Survey</div>
                  <div style={{ background: '#F9F6F2', padding: '1rem', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {Object.entries(intake).map(([key, value]) => (
                      <div key={key}>
                        <div style={{ fontSize: '11px', color: '#9B6BBD', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '2px' }}>{key}</div>
                        <div style={{ fontSize: '13px', color: '#0D0D0D', lineHeight: 1.6 }}>{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })()}

            <div style={{ fontSize: '12px', color: '#888', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Update Status</div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              {['confirmed', 'pending_payment', 'cancelled'].map(status => (
                <button key={status} onClick={() => updateBookingStatus(selectedBooking.id, status)}
                  style={{ padding: '8px 14px', borderRadius: '6px', border: '0.5px solid rgba(0,0,0,0.15)', background: selectedBooking.status === status ? '#5C2D82' : '#fff', color: selectedBooking.status === status ? '#fff' : '#0D0D0D', fontSize: '12px', cursor: 'pointer' }}>
                  {statusLabels[status]}
                </button>
              ))}
            </div>
            <button onClick={() => setSelectedBooking(null)} style={{ width: '100%', padding: '12px', background: '#F9F6F2', border: '0.5px solid rgba(0,0,0,0.1)', borderRadius: '6px', fontSize: '13px', cursor: 'pointer', color: '#666' }}>Close</button>
          </div>
        </div>
      )}

      {/* Edit booking modal */}
      {editingBooking && (
        <div onClick={() => setEditingBooking(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: '12px', padding: '2rem', maxWidth: '560px', width: '100%', boxShadow: '0 24px 64px rgba(0,0,0,0.15)', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ fontSize: '18px', fontWeight: 500, color: '#0D0D0D', marginBottom: '1.5rem' }}>Edit Booking</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { label: 'Client name', key: 'client_name', type: 'text' },
                { label: 'Email', key: 'client_email', type: 'email' },
                { label: 'Phone', key: 'client_phone', type: 'tel' },
                { label: 'Session date', key: 'session_date', type: 'date' },
                { label: 'Session time', key: 'session_time', type: 'text' },
                { label: 'Zoom link', key: 'zoom_link', type: 'text' },
              ].map(field => (
                <div key={field.key}>
                  <label style={labelStyle}>{field.label}</label>
                  <input type={field.type} value={editForm[field.key] || ''} onChange={e => setEditForm({ ...editForm, [field.key]: e.target.value })} style={inputStyle} />
                </div>
              ))}
              <div>
                <label style={labelStyle}>Service</label>
                <select value={editForm.service_type || ''} onChange={e => setEditForm({ ...editForm, service_type: e.target.value })} style={inputStyle}>
                  {allServices.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Status</label>
                <select value={editForm.status || ''} onChange={e => setEditForm({ ...editForm, status: e.target.value })} style={inputStyle}>
                  {Object.entries(statusLabels).map(([val, label]) => <option key={val} value={val}>{label}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Notes</label>
                <textarea value={editForm.notes || ''} onChange={e => setEditForm({ ...editForm, notes: e.target.value })} style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '1.5rem' }}>
              <button onClick={saveEditedBooking} style={{ flex: 1, padding: '12px', background: '#5C2D82', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '13px', cursor: 'pointer', fontWeight: 500 }}>Save changes</button>
              <button onClick={() => setEditingBooking(null)} style={{ flex: 1, padding: '12px', background: '#F9F6F2', border: '0.5px solid rgba(0,0,0,0.1)', borderRadius: '6px', fontSize: '13px', cursor: 'pointer', color: '#666' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit service modal */}
      {editingService && (
        <div onClick={() => setEditingService(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: '12px', padding: '2rem', maxWidth: '480px', width: '100%', boxShadow: '0 24px 64px rgba(0,0,0,0.15)' }}>
            <div style={{ fontSize: '18px', fontWeight: 500, color: '#0D0D0D', marginBottom: '1.5rem' }}>Edit Service</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={labelStyle}>Service name</label>
                <input type="text" value={serviceForm.title || ''} onChange={e => setServiceForm({ ...serviceForm, title: e.target.value })} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Price ($)</label>
                <input type="number" value={serviceForm.price || ''} onChange={e => setServiceForm({ ...serviceForm, price: parseFloat(e.target.value) })} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Duration</label>
                <input type="text" value={serviceForm.duration || ''} onChange={e => setServiceForm({ ...serviceForm, duration: e.target.value })} style={inputStyle} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '1.5rem' }}>
              <button onClick={() => { setServices(prev => prev.map(s => s.id === editingService.id ? { ...s, ...serviceForm } : s)); setEditingService(null) }}
                style={{ flex: 1, padding: '12px', background: '#5C2D82', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '13px', cursor: 'pointer', fontWeight: 500 }}>Save</button>
              <button onClick={() => setEditingService(null)} style={{ flex: 1, padding: '12px', background: '#F9F6F2', border: '0.5px solid rgba(0,0,0,0.1)', borderRadius: '6px', fontSize: '13px', cursor: 'pointer', color: '#666' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
