import { useState } from 'react'
import { supabase } from "./lib/supabase"
import { ArrowRight, ArrowLeft, Calendar, Clock, User, Mail, Phone, CheckCircle } from 'lucide-react'

const services = [
  { id: 'discovery', title: 'Free Discovery Call', duration: '30 min', price: 0, description: 'A complimentary call to discuss your needs and how Dr. Terracciano can help.' },
  { id: 'consulting', title: 'Private Educational Consulting', duration: '90 min', price: 375, description: 'Personalized 1:1 consulting for families navigating complex educational decisions.' },
  { id: 'tutoring', title: 'Academic Tutoring', duration: '90 min', price: 337.50, description: 'Expert subject-matter support tailored to your learner\'s pace, style, and goals.' },
  { id: 'intervention', title: 'Intensive Academic Intervention', duration: '90 min', price: 412.50, description: 'Targeted, high-impact sessions for students who need accelerated support.' },
  { id: 'homeschool', title: 'Homeschool Planning & Curriculum Design', duration: '90 min', price: 450, description: 'Custom curriculum architecture and learning plans for homeschool families.' },
  { id: 'advocacy', title: 'Educational Advocacy & Parent Strategy', duration: '90 min', price: 375, description: 'Navigate IEPs, 504 plans, and school systems with confidence.' },
  { id: 'dissertation', title: 'Dissertation & Research Consulting', duration: '90 min', price: 375, description: 'Expert guidance for doctoral students and researchers.' },
  { id: 'policy', title: 'Educational Policy & EdTech Consulting', duration: '90 min', price: 525, description: 'Strategic consulting at the intersection of education, policy, and technology.' },
  { id: 'org', title: 'School / Organizational Consulting', duration: '90 min', price: 525, description: 'Systems-level consulting for schools and educational organizations.' },
]

const timeSlots = ['9:00 AM', '10:30 AM', '12:00 PM', '1:30 PM', '3:00 PM', '4:30 PM']

function getDatesForNextWeeks(weeks = 6) {
  const dates = []
  const today = new Date()
  for (let i = 1; i <= weeks * 7; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    if (date.getDay() !== 0 && date.getDay() !== 6) {
      dates.push(date)
    }
  }
  return dates
}

export default function BookingPage() {
  const [step, setStep] = useState(1)
  const [selected, setSelected] = useState({ service: null, date: null, time: null })
  const [form, setForm] = useState({ name: '', email: '', phone: '', notes: '' })
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const dates = getDatesForNextWeeks(6)
  const service = services.find(s => s.id === selected.service)

  const formatDate = (date) => date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  const handleBook = async () => {
    if (!form.name || !form.email) { setError('Please fill in your name and email.'); return }
    setLoading(true)
    setError('')
    try {
      const { error } = await supabase.from('bookings').insert({
        client_name: form.name,
        client_email: form.email,
        client_phone: form.phone,
        service_type: service.title,
        session_date: selected.date.toISOString().split('T')[0],
        session_time: selected.time,
        duration_minutes: service.id === 'discovery' ? 30 : 90,
        amount_cents: service.price * 100,
        payment_status: service.price === 0 ? 'free' : 'pending',
        notes: form.notes,
        status: 'confirmed',
      })
      if (error) throw error
      setDone(true)
    } catch (err) {
      setError('Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  if (done) return (
    <div style={{ minHeight: '100vh', background: '#F9F6F2', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ textAlign: 'center', maxWidth: '480px' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#F2EBF8', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
          <CheckCircle size={32} color="#5C2D82" />
        </div>
        <h1 style={{ fontSize: '32px', fontWeight: 400, color: '#0D0D0D', marginBottom: '1rem', letterSpacing: '-0.02em' }}>You're booked!</h1>
        <p style={{ fontSize: '15px', color: '#666', lineHeight: 1.8, marginBottom: '0.5rem' }}>
          <strong>{service.title}</strong>
        </p>
        <p style={{ fontSize: '15px', color: '#666', lineHeight: 1.8, marginBottom: '0.5rem' }}>{formatDate(selected.date)} at {selected.time}</p>
        <p style={{ fontSize: '14px', color: '#999', marginBottom: '2rem' }}>A confirmation will be sent to {form.email}</p>
        <a href="/" style={{ display: 'inline-block', background: '#5C2D82', color: '#fff', padding: '12px 28px', borderRadius: '3px', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none' }}>Back to website</a>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#F9F6F2', fontFamily: 'inherit' }}>
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 2.5rem', borderBottom: '0.5px solid rgba(0,0,0,0.09)', background: 'rgba(249,246,242,0.92)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 50 }}>
        <a href="/" style={{ fontSize: '15px', fontWeight: 500, letterSpacing: '0.06em', color: '#0D0D0D', textDecoration: 'none' }}>Clarissa Terracciano</a>
        <div style={{ fontSize: '13px', color: '#999' }}>Book a session</div>
      </nav>

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '4rem 2rem' }}>

        {/* Progress */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3rem' }}>
          {['Select service', 'Pick a time', 'Your details'].map((label, i) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: step > i + 1 ? '#5C2D82' : step === i + 1 ? '#5C2D82' : '#e5e5e5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: step >= i + 1 ? '#fff' : '#999', fontWeight: 500 }}>{i + 1}</div>
              <span style={{ fontSize: '12px', color: step === i + 1 ? '#0D0D0D' : '#999', letterSpacing: '0.04em' }}>{label}</span>
              {i < 2 && <div style={{ width: '32px', height: '1px', background: '#e5e5e5', margin: '0 4px' }} />}
            </div>
          ))}
        </div>

        {/* Step 1 — Service */}
        {step === 1 && (
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 400, color: '#0D0D0D', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>Select a service</h1>
            <p style={{ fontSize: '14px', color: '#888', marginBottom: '2.5rem' }}>All paid sessions are 90 minutes (60 min session + 30 min planning). Conducted via Zoom.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {services.map(s => (
                <div key={s.id} onClick={() => setSelected({ ...selected, service: s.id })}
                  style={{ padding: '1.5rem', border: selected.service === s.id ? '1.5px solid #5C2D82' : '0.5px solid rgba(0,0,0,0.12)', borderRadius: '8px', background: selected.service === s.id ? '#F2EBF8' : '#fff', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.15s' }}>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 500, color: '#0D0D0D', marginBottom: '4px' }}>{s.title}</div>
                    <div style={{ fontSize: '13px', color: '#888' }}>{s.description}</div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: '1.5rem' }}>
                    <div style={{ fontSize: '18px', fontWeight: 500, color: '#5C2D82' }}>{s.price === 0 ? 'Free' : `$${s.price}`}</div>
                    <div style={{ fontSize: '11px', color: '#aaa' }}>{s.duration}</div>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => selected.service && setStep(2)} style={{ marginTop: '2rem', background: selected.service ? '#5C2D82' : '#ccc', color: '#fff', border: 'none', padding: '14px 32px', borderRadius: '3px', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: selected.service ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', gap: '8px' }}>
              Continue <ArrowRight size={14} />
            </button>
          </div>
        )}

        {/* Step 2 — Date & Time */}
        {step === 2 && (
          <div>
            <button onClick={() => setStep(1)} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: '#888', fontSize: '13px', cursor: 'pointer', marginBottom: '2rem', padding: 0 }}>
              <ArrowLeft size={14} /> Back
            </button>
            <h1 style={{ fontSize: '32px', fontWeight: 400, color: '#0D0D0D', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>Pick a date & time</h1>
            <p style={{ fontSize: '14px', color: '#888', marginBottom: '2.5rem' }}>All times are Eastern Time (ET).</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div>
                <div style={{ fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9B6BBD', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={14} /> Select a date</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '400px', overflowY: 'auto' }}>
                  {dates.map((date, i) => (
                    <div key={i} onClick={() => setSelected({ ...selected, date, time: null })}
                      style={{ padding: '10px 14px', border: selected.date?.toDateString() === date.toDateString() ? '1.5px solid #5C2D82' : '0.5px solid rgba(0,0,0,0.1)', borderRadius: '6px', background: selected.date?.toDateString() === date.toDateString() ? '#F2EBF8' : '#fff', cursor: 'pointer', fontSize: '13px', color: '#0D0D0D' }}>
                      {formatDate(date)}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9B6BBD', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={14} /> Select a time</div>
                {selected.date ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {timeSlots.map(time => (
                      <div key={time} onClick={() => setSelected({ ...selected, time })}
                        style={{ padding: '10px 14px', border: selected.time === time ? '1.5px solid #5C2D82' : '0.5px solid rgba(0,0,0,0.1)', borderRadius: '6px', background: selected.time === time ? '#F2EBF8' : '#fff', cursor: 'pointer', fontSize: '13px', color: '#0D0D0D' }}>
                        {time}
                      </div>
                    ))}
                  </div>
                ) : <div style={{ fontSize: '13px', color: '#aaa', paddingTop: '1rem' }}>Select a date first</div>}
              </div>
            </div>
            <button onClick={() => selected.date && selected.time && setStep(3)} style={{ marginTop: '2rem', background: selected.date && selected.time ? '#5C2D82' : '#ccc', color: '#fff', border: 'none', padding: '14px 32px', borderRadius: '3px', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: selected.date && selected.time ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', gap: '8px' }}>
              Continue <ArrowRight size={14} />
            </button>
          </div>
        )}

        {/* Step 3 — Details */}
        {step === 3 && (
          <div>
            <button onClick={() => setStep(2)} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: '#888', fontSize: '13px', cursor: 'pointer', marginBottom: '2rem', padding: 0 }}>
              <ArrowLeft size={14} /> Back
            </button>
            <h1 style={{ fontSize: '32px', fontWeight: 400, color: '#0D0D0D', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>Your details</h1>
            <p style={{ fontSize: '14px', color: '#888', marginBottom: '2.5rem' }}>Almost there — just a few details to confirm your booking.</p>

            {/* Summary */}
            <div style={{ background: '#F2EBF8', border: '0.5px solid rgba(92,45,130,0.15)', borderRadius: '8px', padding: '1.25rem 1.5rem', marginBottom: '2rem' }}>
              <div style={{ fontSize: '13px', fontWeight: 500, color: '#3B1A55', marginBottom: '4px' }}>{service.title}</div>
              <div style={{ fontSize: '13px', color: '#9B6BBD' }}>{formatDate(selected.date)} at {selected.time} · {service.duration}</div>
              <div style={{ fontSize: '16px', fontWeight: 500, color: '#5C2D82', marginTop: '8px' }}>{service.price === 0 ? 'Free' : `$${service.price}`}</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '480px' }}>
              {[
                { label: 'Full name', key: 'name', type: 'text', placeholder: 'Your name', required: true },
                { label: 'Email address', key: 'email', type: 'email', placeholder: 'your@email.com', required: true },
                { label: 'Phone number', key: 'phone', type: 'tel', placeholder: 'Optional' },
              ].map(field => (
                <div key={field.key}>
                  <label style={{ fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#666', display: 'block', marginBottom: '6px' }}>{field.label}{field.required && ' *'}</label>
                  <input type={field.type} placeholder={field.placeholder} value={form[field.key]} onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                    style={{ width: '100%', padding: '11px 14px', fontSize: '14px', color: '#0D0D0D', background: '#fff', border: '0.5px solid rgba(0,0,0,0.15)', borderRadius: '6px', outline: 'none', boxSizing: 'border-box' }} />
                </div>
              ))}
              <div>
                <label style={{ fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#666', display: 'block', marginBottom: '6px' }}>Notes (optional)</label>
                <textarea placeholder="Tell Dr. Terracciano a little about what you're hoping to work on..." value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })}
                  style={{ width: '100%', padding: '11px 14px', fontSize: '14px', color: '#0D0D0D', background: '#fff', border: '0.5px solid rgba(0,0,0,0.15)', borderRadius: '6px', outline: 'none', boxSizing: 'border-box', minHeight: '100px', resize: 'vertical' }} />
              </div>
            </div>

            {error && <div style={{ marginTop: '1rem', padding: '10px 14px', background: '#FDF2F2', border: '0.5px solid rgba(220,50,50,0.2)', borderRadius: '6px', fontSize: '13px', color: '#9B2B2B', maxWidth: '480px' }}>{error}</div>}

            <button onClick={handleBook} disabled={loading}
              style={{ marginTop: '2rem', background: loading ? '#9B6BBD' : '#5C2D82', color: '#fff', border: 'none', padding: '14px 32px', borderRadius: '3px', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
              {loading ? 'Confirming...' : service.price === 0 ? 'Confirm free booking' : `Confirm & pay $${service.price}`} {!loading && <ArrowRight size={14} />}
            </button>
            <p style={{ fontSize: '12px', color: '#aaa', marginTop: '1rem' }}>
              {service.price > 0 ? 'Payment collected securely via Stripe at confirmation.' : 'No payment required for discovery calls.'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

