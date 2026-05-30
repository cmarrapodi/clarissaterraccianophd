import { useEffect, useState } from 'react'
import { CheckCircle, Loader } from 'lucide-react'
import { supabase } from './lib/supabase'

export default function BookingConfirmed() {
  const [status, setStatus] = useState('loading')
  const [sessionData, setSessionData] = useState(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const sessionId = params.get('session_id')

    if (!sessionId) {
      setStatus('error')
      return
    }

    const confirmBooking = async () => {
      try {
        const response = await fetch(`/api/get-checkout-session?session_id=${sessionId}`)
        const data = await response.json()

        if (!response.ok || data.error) {
          throw new Error(data.error || 'Could not retrieve session')
        }

        setSessionData(data)

        await supabase
          .from('bookings')
          .update({ payment_status: 'paid', status: 'confirmed' })
          .eq('client_email', data.customer_email)
          .eq('payment_status', 'pending')
          .order('created_at', { ascending: false })
          .limit(1)

        await fetch('/api/send-notification', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            clientName: data.customer_name || data.customer_email,
            clientEmail: data.customer_email,
            serviceTitle: data.service_title,
            sessionDate: data.session_date,
            sessionTime: data.session_time,
            notes: 'Payment confirmed via Stripe.',
          }),
        })

        setStatus('success')
      } catch (err) {
        console.error('Booking confirmation error:', err)
        setStatus('error')
      }
    }

    confirmBooking()
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#F9F6F2', fontFamily: 'inherit' }}>
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 2.5rem', borderBottom: '0.5px solid rgba(0,0,0,0.09)', background: 'rgba(249,246,242,0.92)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 50 }}>
        <a href="/" style={{ fontSize: '15px', fontWeight: 500, letterSpacing: '0.06em', color: '#0D0D0D', textDecoration: 'none' }}>Clarissa Terracciano</a>
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 65px)', padding: '2rem' }}>
        {status === 'loading' && (
          <div style={{ textAlign: 'center' }}>
            <Loader size={32} color="#9B6BBD" style={{ animation: 'spin 1s linear infinite', marginBottom: '1rem' }} />
            <p style={{ fontSize: '15px', color: '#888' }}>Confirming your booking...</p>
            <style>{`@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }`}</style>
          </div>
        )}

        {status === 'success' && (
          <div style={{ textAlign: 'center', maxWidth: '480px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#F2EBF8', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
              <CheckCircle size={32} color="#5C2D82" />
            </div>
            <h1 style={{ fontSize: '32px', fontWeight: 400, color: '#0D0D0D', marginBottom: '1rem', letterSpacing: '-0.02em' }}>You're booked!</h1>
            {sessionData && (
              <div style={{ background: '#F2EBF8', border: '0.5px solid rgba(92,45,130,0.15)', borderRadius: '8px', padding: '1.5rem', marginBottom: '2rem', textAlign: 'left' }}>
                {sessionData.service_title && (
                  <div style={{ fontSize: '14px', fontWeight: 500, color: '#3B1A55', marginBottom: '6px' }}>{sessionData.service_title}</div>
                )}
                {sessionData.session_date && sessionData.session_time && (
                  <div style={{ fontSize: '13px', color: '#9B6BBD', marginBottom: '8px' }}>{sessionData.session_date} at {sessionData.session_time} · via Zoom</div>
                )}
                {sessionData.amount_total && (
                  <div style={{ fontSize: '13px', color: '#5C2D82', fontWeight: 500 }}>${(sessionData.amount_total / 100).toFixed(2)} paid</div>
                )}
              </div>
            )}
            <p style={{ fontSize: '14px', color: '#999', marginBottom: '2rem' }}>A confirmation has been sent to {sessionData?.customer_email || 'your email'}.</p>
            <a href="/" style={{ display: 'inline-block', background: '#5C2D82', color: '#fff', padding: '12px 28px', borderRadius: '3px', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none' }}>Back to website</a>
          </div>
        )}

        {status === 'error' && (
          <div style={{ textAlign: 'center', maxWidth: '480px' }}>
            <h1 style={{ fontSize: '28px', fontWeight: 400, color: '#0D0D0D', marginBottom: '1rem', letterSpacing: '-0.02em' }}>Something went wrong</h1>
            <p style={{ fontSize: '15px', color: '#888', lineHeight: 1.8, marginBottom: '2rem' }}>
              If your payment went through, please email{' '}
              <a href="mailto:clarissa@clarissaterraccianophd.com" style={{ color: '#5C2D82' }}>clarissa@clarissaterraccianophd.com</a>{' '}
              and we'll sort it out right away.
            </p>
            <a href="/book" style={{ display: 'inline-block', background: '#5C2D82', color: '#fff', padding: '12px 28px', borderRadius: '3px', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none' }}>Try again</a>
          </div>
        )}
      </div>
    </div>
  )
}
