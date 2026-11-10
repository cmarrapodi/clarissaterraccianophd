const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSeRhKoe0mP1_1QvzqNPRcWm27H2JvJ15IYL9z36pHL0rQmbxQ/viewform'

export default function BookingPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#F9F6F2', fontFamily: 'inherit' }}>
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 2.5rem', borderBottom: '0.5px solid rgba(0,0,0,0.09)', background: 'rgba(249,246,242,0.92)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 50 }}>
        <a href="/" style={{ fontSize: '15px', fontWeight: 500, letterSpacing: '0.06em', color: '#0D0D0D', textDecoration: 'none' }}>Clarissa Terracciano</a>
        <a href="/book" style={{ fontSize: '13px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#5C2D82', textDecoration: 'none', fontWeight: 600 }}>Request a Consultation</a>
      </nav>

      <div style={{ maxWidth: '980px', margin: '0 auto', padding: '4rem 1.25rem 5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#9B6BBD', marginBottom: '1rem' }}>Consultation Request</div>
          <h1 style={{ fontSize: 'clamp(34px, 4vw, 54px)', fontWeight: 400, color: '#0D0D0D', margin: '0 0 1rem', letterSpacing: '-0.02em' }}>Let's Work Together</h1>
          <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#666', maxWidth: '620px', margin: '0 auto' }}>
            Tell me a little about what you're looking for, and I'll be in touch to discuss how I can help.
          </p>
        </div>

        <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid rgba(92,45,130,0.12)', overflow: 'hidden', boxShadow: '0 20px 50px rgba(92,45,130,0.06)' }}>
          <iframe
            src={GOOGLE_FORM_URL}
            title="Consultation request form"
            width="100%"
            height="1400"
            style={{ border: 'none', display: 'block', minHeight: '1400px' }}
            loading="lazy"
            allowFullScreen
          />
        </div>

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <a
            href={GOOGLE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: '#5C2D82', color: '#fff', padding: '14px 28px', borderRadius: '3px', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none' }}
          >
            Open Consultation Form
          </a>
        </div>
      </div>
    </div>
  )
}
