import { useEffect } from 'react'

export default function BookingConfirmed() {
  useEffect(() => {
    window.location.replace('/book')
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#F9F6F2', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ textAlign: 'center', maxWidth: '480px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 400, color: '#0D0D0D', marginBottom: '1rem', letterSpacing: '-0.02em' }}>Redirecting to the consultation form...</h1>
        <p style={{ fontSize: '15px', color: '#666', lineHeight: 1.8, marginBottom: '2rem' }}>
          If you are not redirected automatically, use the consultation form below.
        </p>
        <a href="/book" style={{ display: 'inline-block', background: '#5C2D82', color: '#fff', padding: '12px 28px', borderRadius: '3px', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none' }}>Open Consultation Form</a>
      </div>
    </div>
  )
}
