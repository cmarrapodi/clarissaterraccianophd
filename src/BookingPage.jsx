import { useState } from 'react'
import { supabase } from "./lib/supabase"
import { ArrowRight, ArrowLeft, Calendar, Clock, CheckCircle } from 'lucide-react'

const services = [
  { id: 'discovery', title: 'Free Discovery Call', duration: '30 min', price: 0, description: 'A complimentary call to discuss your needs and how Dr. Terracciano can help.' },
  { id: 'consulting', title: 'Private Educational Consulting', duration: '90 min', price: 375, description: 'Personalized 1:1 consulting for families navigating complex educational decisions.' },
  { id: 'tutoring', title: 'Academic Tutoring', duration: '90 min', price: 337.50, description: 'Expert subject-matter support tailored to your learner\'s pace, style, and goals.' },
  { id: 'literacy', title: 'Literacy & Reading Support', duration: '90 min', price: 375, description: 'Structured literacy intervention using Orton-Gillingham, Wilson Reading System®, and PAF.' },
  { id: 'intervention', title: 'Intensive Academic Intervention', duration: '90 min', price: 412.50, description: 'Targeted, high-impact sessions for students who need accelerated support.' },
  { id: 'homeschool', title: 'Homeschool Planning & Curriculum Design', duration: '90 min', price: 450, description: 'Custom curriculum architecture and learning plans for homeschool families.' },
  { id: 'advocacy', title: 'Educational Advocacy & Parent Strategy', duration: '90 min', price: 375, description: 'Navigate IEPs, 504 plans, and school systems with confidence.' },
  { id: 'dissertation', title: 'Dissertation & Research Consulting', duration: '90 min', price: 375, description: 'Expert guidance for doctoral students and researchers.' },
  { id: 'policy', title: 'Educational Policy & EdTech Consulting', duration: '90 min', price: 525, description: 'Strategic consulting at the intersection of education, policy, and technology.' },
  { id: 'org', title: 'School / Organizational Consulting', duration: '90 min', price: 525, description: 'Systems-level consulting for schools and educational organizations.' },
  { id: 'pods', title: 'Learning Pods', duration: '90 min', price: 375, description: 'Curated small-group learning series for children focused on academic growth.' },
  { id: 'retainer', title: 'Monthly Family Educational Retainer', duration: 'Ongoing', price: 1500, description: 'Ongoing monthly advisory support for families.' },
  { id: 'halfday', title: 'Half-Day Consulting', duration: '4 hrs', price: 1500, description: 'Intensive half-day consulting for schools and organizations.' },
  { id: 'fullday', title: 'Full-Day Consulting', duration: '8 hrs', price: 3000, description: 'Full-day strategic consulting engagement.' },
]

const intakeFields = {
  discovery: [
    { key: 'situation', label: "What's your current situation?", type: 'textarea', placeholder: 'Tell us briefly about yourself or your child and what has brought you here.' },
    { key: 'goals', label: 'What are you hoping to get from working with Dr. Terracciano?', type: 'textarea', placeholder: 'No need to have it all figured out — just share what is on your mind.' },
    { key: 'heard_about', label: 'How did you hear about Dr. Terracciano?', type: 'text', placeholder: 'e.g. Google, referral, social media' },
  ],
  consulting: [
    { key: 'learner_age', label: 'Learner\'s age and current grade', type: 'text', placeholder: 'e.g. 10 years old, 5th grade' },
    { key: 'school_type', label: 'Current school setting', type: 'text', placeholder: 'e.g. public school, private school, homeschool' },
    { key: 'decisions', label: 'What educational decisions are you currently navigating?', type: 'textarea', placeholder: 'e.g. school placement, learning differences, program options, transitions' },
    { key: 'tried', label: 'What have you already tried or explored?', type: 'textarea', placeholder: 'Any prior evaluations, programs, schools, or consultants you have worked with' },
    { key: 'goals', label: 'What would a successful outcome look like for your family?', type: 'textarea', placeholder: 'Be as specific or broad as you like' },
    { key: 'heard_about', label: 'How did you hear about Dr. Terracciano?', type: 'text', placeholder: 'e.g. Google, referral, social media' },
  ],
  tutoring: [
    { key: 'learner_age', label: 'Learner\'s age and current grade', type: 'text', placeholder: 'e.g. 14 years old, 9th grade' },
    { key: 'subjects', label: 'Which subject(s) need support?', type: 'text', placeholder: 'e.g. Algebra, essay writing, reading comprehension' },
    { key: 'challenges', label: 'Where does the learner struggle most?', type: 'textarea', placeholder: 'e.g. staying focused, understanding concepts, test anxiety, completing work' },
    { key: 'learning_style', label: 'How does this learner learn best?', type: 'textarea', placeholder: 'e.g. visual, hands-on, needs lots of repetition, responds well to encouragement' },
    { key: 'goals', label: 'What are your goals for tutoring?', type: 'textarea', placeholder: 'e.g. pass an upcoming exam, build long-term skills, raise grades' },
    { key: 'heard_about', label: 'How did you hear about Dr. Terracciano?', type: 'text', placeholder: 'e.g. Google, referral, social media' },
  ],
  literacy: [
    { key: 'learner_age', label: 'Learner\'s age and current grade', type: 'text', placeholder: 'e.g. 7 years old, 2nd grade' },
    { key: 'concerns', label: 'What specific literacy concerns have you noticed?', type: 'textarea', placeholder: 'e.g. difficulty decoding words, reverses letters, avoids reading, slow fluency' },
    { key: 'evaluations', label: 'Has the learner had any evaluations or diagnoses?', type: 'textarea', placeholder: 'e.g. dyslexia screening, IEP, psychoeducational evaluation' },
    { key: 'school_support', label: 'What support is the school currently providing, if any?', type: 'textarea', placeholder: 'e.g. reading specialist, resource room, nothing yet' },
    { key: 'goals', label: 'What does success look like for this learner?', type: 'textarea', placeholder: 'e.g. reading at grade level, feeling confident, no longer dreading school' },
    { key: 'heard_about', label: 'How did you hear about Dr. Terracciano?', type: 'text', placeholder: 'e.g. Google, referral, social media' },
  ],
  intervention: [
    { key: 'learner_age', label: 'Learner\'s age and current grade', type: 'text', placeholder: 'e.g. 12 years old, 7th grade' },
    { key: 'urgency', label: 'What has made this feel urgent right now?', type: 'textarea', placeholder: 'e.g. failing grades, upcoming exams, school is recommending retention' },
    { key: 'areas', label: 'Which academic areas are most affected?', type: 'text', placeholder: 'e.g. reading, math, writing, all subjects' },
    { key: 'history', label: 'How long has this been a struggle?', type: 'textarea', placeholder: 'Share any relevant background — prior interventions, diagnoses, school history' },
    { key: 'goals', label: 'What does your family need from this intervention?', type: 'textarea', placeholder: 'e.g. get back on track before the end of the year, build foundational skills' },
    { key: 'heard_about', label: 'How did you hear about Dr. Terracciano?', type: 'text', placeholder: 'e.g. Google, referral, social media' },
  ],
  homeschool: [
    { key: 'learner_ages', label: 'Ages and grades of learner(s) you are homeschooling', type: 'text', placeholder: 'e.g. 8-year-old (3rd grade) and 11-year-old (6th grade)' },
    { key: 'why_homeschool', label: 'What led your family to homeschool?', type: 'textarea', placeholder: 'e.g. leaving traditional school, always homeschooled, pandemic shift, learning differences' },
    { key: 'current_approach', label: 'Do you currently follow any curriculum or method?', type: 'text', placeholder: 'e.g. classical, Charlotte Mason, eclectic, nothing yet' },
    { key: 'challenges', label: 'What is not working right now?', type: 'textarea', placeholder: 'e.g. lack of structure, finding the right curriculum, child resistance, not knowing where to start' },
    { key: 'goals', label: 'What do you want your homeschool to look and feel like?', type: 'textarea', placeholder: 'Your vision — academically, emotionally, practically' },
    { key: 'heard_about', label: 'How did you hear about Dr. Terracciano?', type: 'text', placeholder: 'e.g. Google, referral, social media' },
  ],
  advocacy: [
    { key: 'learner_age', label: 'Learner\'s age and current grade', type: 'text', placeholder: 'e.g. 9 years old, 4th grade' },
    { key: 'situation', label: 'What is the current situation with the school?', type: 'textarea', placeholder: 'e.g. IEP meeting coming up, school denied services, 504 not being followed' },
    { key: 'diagnosis', label: 'Does the learner have any diagnoses or evaluations on file?', type: 'textarea', placeholder: 'e.g. ADHD, dyslexia, autism, anxiety' },
    { key: 'what_you_want', label: 'What outcome are you advocating for?', type: 'textarea', placeholder: 'e.g. appropriate placement, more services, a fair IEP, school accountability' },
    { key: 'blockers', label: 'What obstacles have you already run into?', type: 'textarea', placeholder: 'e.g. school pushback, unclear rights, feeling dismissed or overwhelmed' },
    { key: 'heard_about', label: 'How did you hear about Dr. Terracciano?', type: 'text', placeholder: 'e.g. Google, referral, social media' },
  ],
  dissertation: [
    { key: 'program', label: 'Your degree program and institution', type: 'text', placeholder: 'e.g. PhD in Education, University of Denver' },
    { key: 'stage', label: 'Where are you in the dissertation process?', type: 'text', placeholder: 'e.g. proposal stage, data collection, writing Chapter 3, preparing for defense' },
    { key: 'topic', label: 'What is your research topic or focus?', type: 'textarea', placeholder: 'A brief description of your study, research questions, or methodology' },
    { key: 'challenges', label: 'Where are you stuck or struggling?', type: 'textarea', placeholder: 'e.g. conceptual framework, writing clarity, methodology, committee feedback' },
    { key: 'goals', label: 'What do you need from this session?', type: 'textarea', placeholder: 'e.g. feedback on a chapter, help with analysis, defense prep, accountability' },
    { key: 'heard_about', label: 'How did you hear about Dr. Terracciano?', type: 'text', placeholder: 'e.g. Google, referral, colleague' },
  ],
  policy: [
    { key: 'role', label: 'Your current role and organization', type: 'text', placeholder: 'e.g. EdTech founder, policy director at a nonprofit, school district administrator' },
    { key: 'focus', label: 'What policy or EdTech area are you working in?', type: 'textarea', placeholder: 'e.g. AI in education, state literacy policy, digital equity, ed policy reform' },
    { key: 'project', label: 'What project or initiative are you bringing to this session?', type: 'textarea', placeholder: 'Brief description of what you are working on and where you are in the process' },
    { key: 'goals', label: 'What do you need from Dr. Terracciano?', type: 'textarea', placeholder: 'e.g. strategic thinking, research synthesis, policy analysis, thought partnership' },
    { key: 'heard_about', label: 'How did you hear about Dr. Terracciano?', type: 'text', placeholder: 'e.g. LinkedIn, referral, conference' },
  ],
  org: [
    { key: 'org_type', label: 'Type and size of your organization', type: 'text', placeholder: 'e.g. K-8 charter school (400 students), regional nonprofit, tutoring center' },
    { key: 'role', label: 'Your role in the organization', type: 'text', placeholder: 'e.g. Head of School, Executive Director, Curriculum Director' },
    { key: 'challenge', label: 'What organizational challenge are you trying to solve?', type: 'textarea', placeholder: 'e.g. curriculum alignment, staff training, academic outcomes, strategic planning' },
    { key: 'context', label: 'What context should Dr. Terracciano know going in?', type: 'textarea', placeholder: 'Any relevant history, prior attempts, or constraints that shape this work' },
    { key: 'goals', label: 'What do you want to walk away with from this engagement?', type: 'textarea', placeholder: 'e.g. a clear action plan, an outside perspective, a framework to implement' },
    { key: 'heard_about', label: 'How did you hear about Dr. Terracciano?', type: 'text', placeholder: 'e.g. referral, conference, LinkedIn' },
  ],
  pods: [
    { key: 'learner_age', label: "Child's age and current grade", type: 'text', placeholder: 'e.g. 9 years old, 4th grade' },
    { key: 'interests', label: 'What subjects or topics does your child love?', type: 'textarea', placeholder: 'e.g. science, storytelling, math games, history, art' },
    { key: 'social', label: 'How does your child do in small group settings?', type: 'textarea', placeholder: 'e.g. thrives, a little shy at first, prefers 1:1, gets easily distracted in groups' },
    { key: 'goals', label: 'What are you hoping your child gets from the pod experience?', type: 'textarea', placeholder: 'e.g. academic enrichment, social connection, confidence, love of learning' },
    { key: 'heard_about', label: 'How did you hear about Dr. Terracciano?', type: 'text', placeholder: 'e.g. Google, referral, social media' },
  ],
  retainer: [
    { key: 'family_situation', label: "Tell us about your family's educational situation", type: 'textarea', placeholder: 'Number of children, ages, school settings, any learning differences or special needs' },
    { key: 'pain_points', label: 'What ongoing challenges are you navigating?', type: 'textarea', placeholder: 'e.g. constantly putting out fires with the school, no clear educational plan, feeling overwhelmed' },
    { key: 'advisory_needs', label: 'What would ongoing advisory support look like for you?', type: 'textarea', placeholder: 'e.g. monthly check-ins, help as issues arise, long-term planning, someone in your corner' },
    { key: 'goals', label: "What does your family's educational life look like in 1 year?", type: 'textarea', placeholder: 'Paint a picture of what you are working toward' },
    { key: 'heard_about', label: 'How did you hear about Dr. Terracciano?', type: 'text', placeholder: 'e.g. Google, referral, social media' },
  ],
  halfday: [
    { key: 'org_role', label: 'Your organization and your role', type: 'text', placeholder: 'e.g. Director of Curriculum at a K-12 school, founder of an ed nonprofit' },
    { key: 'focus', label: 'What is the focus of this half-day engagement?', type: 'textarea', placeholder: 'e.g. strategic planning session, curriculum audit, leadership team workshop' },
    { key: 'participants', label: 'Who will be in the room?', type: 'text', placeholder: 'e.g. 6 school leaders, full teaching staff of 20, founding team of 4' },
    { key: 'outcome', label: 'What do you need to walk away with?', type: 'textarea', placeholder: 'e.g. a decision made, a plan drafted, a team aligned, a problem reframed' },
    { key: 'context', label: 'Any important context Dr. Terracciano should know in advance?', type: 'textarea', placeholder: 'Political dynamics, prior work done, constraints, urgency' },
    { key: 'heard_about', label: 'How did you hear about Dr. Terracciano?', type: 'text', placeholder: 'e.g. referral, conference, LinkedIn' },
  ],
  fullday: [
    { key: 'org_role', label: 'Your organization and your role', type: 'text', placeholder: 'e.g. Superintendent, VP of Programs, Chief Academic Officer' },
    { key: 'focus', label: 'What is the focus of this full-day engagement?', type: 'textarea', placeholder: 'e.g. strategic retreat, systems redesign, intensive curriculum development, board offsite' },
    { key: 'participants', label: 'Who will be participating?', type: 'text', placeholder: 'e.g. 12-person leadership team, school board + admin, cross-functional staff' },
    { key: 'outcome', label: 'What does a successful day produce?', type: 'textarea', placeholder: 'e.g. a 3-year strategic plan, resolved team misalignment, a new academic framework' },
    { key: 'context', label: 'What should Dr. Terracciano know before walking in the door?', type: 'textarea', placeholder: 'Organizational history, current challenges, what has been tried, what is at stake' },
    { key: 'heard_about', label: 'How did you hear about Dr. Terracciano?', type: 'text', placeholder: 'e.g. referral, conference, LinkedIn' },
  ],
}

const timeSlots = ['9:00 AM', '10:30 AM', '12:00 PM', '1:30 PM', '3:00 PM', '4:30 PM']

function getDatesForNextWeeks(weeks = 6) {
  const dates = []
  const today = new Date()
  for (let i = 1; i <= weeks * 7; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    if (date.getDay() !== 0 && date.getDay() !== 6) dates.push(date)
  }
  return dates
}

const inputStyle = { width: '100%', padding: '11px 14px', fontSize: '14px', color: '#0D0D0D', background: '#fff', border: '0.5px solid rgba(0,0,0,0.15)', borderRadius: '6px', outline: 'none', boxSizing: 'border-box' }
const labelStyle = { fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#666', display: 'block', marginBottom: '6px' }

export default function BookingPage() {
  const [step, setStep] = useState(1)
  const [selected, setSelected] = useState({ service: null, date: null, time: null })
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [intake, setIntake] = useState({})
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const dates = getDatesForNextWeeks(6)
  const service = services.find(s => s.id === selected.service)
  const fields = selected.service ? (intakeFields[selected.service] || intakeFields.discovery) : []
  const formatDate = (date) => date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
  const handleIntakeChange = (key, value) => setIntake(prev => ({ ...prev, [key]: value }))

  const handleBook = async () => {
    if (!form.name || !form.email) { setError('Please fill in your name and email.'); return }
    setLoading(true)
    setError('')
    try {
      const intakeSummary = fields.map(f => `${f.label.toUpperCase()}: ${intake[f.key] || 'Not provided'}`).join('\n')

      if (service.price > 0) {
        const { error: dbError } = await supabase.from('bookings').insert({
          client_name: form.name,
          client_email: form.email,
          client_phone: form.phone,
          service_type: service.title,
          session_date: selected.date.toISOString().split('T')[0],
          session_time: selected.time,
          duration_minutes: 90,
          amount_cents: service.price * 100,
          payment_status: 'pending',
          notes: intakeSummary,
          status: 'pending_payment',
        })
        if (dbError) throw dbError
        const response = await fetch('/api/create-checkout-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            serviceTitle: service.title,
            amount: service.price * 100,
            clientEmail: form.email,
            sessionDate: formatDate(selected.date),
            sessionTime: selected.time,
          }),
        })
        const data = await response.json()
        if (data.url) {
          window.location.href = data.url
        } else {
          throw new Error(data.error || 'No checkout URL returned')
        }
      } else {
        const { error: dbError } = await supabase.from('bookings').insert({
          client_name: form.name,
          client_email: form.email,
          client_phone: form.phone,
          service_type: service.title,
          session_date: selected.date.toISOString().split('T')[0],
          session_time: selected.time,
          duration_minutes: 30,
          amount_cents: 0,
          payment_status: 'free',
          notes: intakeSummary,
          status: 'confirmed',
        })
        if (dbError) throw dbError
        await fetch('/api/send-notification', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            clientName: form.name,
            clientEmail: form.email,
            clientPhone: form.phone,
            serviceTitle: service.title,
            sessionDate: formatDate(selected.date),
            sessionTime: selected.time,
            notes: intakeSummary,
          }),
        })
        setDone(true)
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
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
        <p style={{ fontSize: '15px', color: '#666', lineHeight: 1.8, marginBottom: '0.5rem' }}><strong>{service.title}</strong></p>
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3rem' }}>
          {['Select service', 'Pick a time', 'Your details'].map((label, i) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: step >= i + 1 ? '#5C2D82' : '#e5e5e5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: step >= i + 1 ? '#fff' : '#999', fontWeight: 500 }}>{i + 1}</div>
              <span style={{ fontSize: '12px', color: step === i + 1 ? '#0D0D0D' : '#999', letterSpacing: '0.04em' }}>{label}</span>
              {i < 2 && <div style={{ width: '32px', height: '1px', background: '#e5e5e5', margin: '0 4px' }} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 400, color: '#0D0D0D', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>What can Dr. Terracciano help you with?</h1>
            <p style={{ fontSize: '14px', color: '#888', marginBottom: '2.5rem' }}>Select the type of session that best fits your needs. All sessions are conducted via Zoom.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {services.map(s => (
                <div key={s.id} onClick={() => setSelected({ ...selected, service: s.id })}
                  style={{ padding: '1.5rem', border: selected.service === s.id ? '1.5px solid #5C2D82' : '0.5px solid rgba(0,0,0,0.12)', borderRadius: '8px', background: selected.service === s.id ? '#F2EBF8' : '#fff', cursor: 'pointer', transition: 'all 0.15s' }}>
                  <div style={{ fontSize: '15px', fontWeight: 500, color: '#0D0D0D', marginBottom: '4px' }}>{s.title}</div>
                  <div style={{ fontSize: '13px', color: '#888', lineHeight: 1.6 }}>{s.description}</div>
                  {s.id === 'discovery' && <div style={{ marginTop: '8px', display: 'inline-block', background: '#F2EBF8', color: '#5C2D82', fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: '100px' }}>Complimentary · 30 min</div>}
                </div>
              ))}
            </div>
            <button onClick={() => selected.service && setStep(2)}
              style={{ marginTop: '2rem', background: selected.service ? '#5C2D82' : '#ccc', color: '#fff', border: 'none', padding: '14px 32px', borderRadius: '3px', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: selected.service ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', gap: '8px' }}>
              Continue <ArrowRight size={14} />
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <button onClick={() => setStep(1)} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: '#888', fontSize: '13px', cursor: 'pointer', marginBottom: '2rem', padding: 0 }}>
              <ArrowLeft size={14} /> Back
            </button>
            <h1 style={{ fontSize: '32px', fontWeight: 400, color: '#0D0D0D', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>Pick a date & time</h1>
            <p style={{ fontSize: '14px', color: '#888', marginBottom: '2.5rem' }}>All times are Eastern Time (ET). Monday – Friday only.</p>
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
            <button onClick={() => selected.date && selected.time && setStep(3)}
              style={{ marginTop: '2rem', background: selected.date && selected.time ? '#5C2D82' : '#ccc', color: '#fff', border: 'none', padding: '14px 32px', borderRadius: '3px', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: selected.date && selected.time ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', gap: '8px' }}>
              Continue <ArrowRight size={14} />
            </button>
          </div>
        )}

        {step === 3 && (
          <div>
            <button onClick={() => setStep(2)} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: '#888', fontSize: '13px', cursor: 'pointer', marginBottom: '2rem', padding: 0 }}>
              <ArrowLeft size={14} /> Back
            </button>
            <h1 style={{ fontSize: '32px', fontWeight: 400, color: '#0D0D0D', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>Your details</h1>
            <p style={{ fontSize: '14px', color: '#888', marginBottom: '2.5rem' }}>Please complete the intake form so Dr. Terracciano can prepare for your session.</p>

            <div style={{ fontSize: '13px', fontWeight: 600, color: '#0D0D0D', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '1rem' }}>Contact Information</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '540px', marginBottom: '2.5rem' }}>
              {[
                { label: 'Full name', key: 'name', type: 'text', placeholder: 'Your name', required: true },
                { label: 'Email address', key: 'email', type: 'email', placeholder: 'your@email.com', required: true },
                { label: 'Phone number', key: 'phone', type: 'tel', placeholder: 'Optional' },
              ].map(field => (
                <div key={field.key}>
                  <label style={labelStyle}>{field.label}{field.required && ' *'}</label>
                  <input type={field.type} placeholder={field.placeholder} value={form[field.key] || ''} onChange={e => setForm({ ...form, [field.key]: e.target.value })} style={inputStyle} />
                </div>
              ))}
            </div>

            <div style={{ fontSize: '13px', fontWeight: 600, color: '#0D0D0D', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Intake Questions</div>
            <p style={{ fontSize: '13px', color: '#888', marginBottom: '1.5rem' }}>This helps Dr. Terracciano prepare a personalized, high-impact session for you.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '540px', marginBottom: '2rem' }}>
              {fields.map(field => (
                <div key={field.key}>
                  <label style={labelStyle}>{field.label}</label>
                  {field.type === 'textarea' ? (
                    <textarea placeholder={field.placeholder} value={intake[field.key] || ''} onChange={e => handleIntakeChange(field.key, e.target.value)}
                      style={{ ...inputStyle, minHeight: '90px', resize: 'vertical' }} />
                  ) : (
                    <input type="text" placeholder={field.placeholder} value={intake[field.key] || ''} onChange={e => handleIntakeChange(field.key, e.target.value)} style={inputStyle} />
                  )}
                </div>
              ))}
            </div>

            {error && <div style={{ marginTop: '1rem', padding: '10px 14px', background: '#FDF2F2', border: '0.5px solid rgba(220,50,50,0.2)', borderRadius: '6px', fontSize: '13px', color: '#9B2B2B', maxWidth: '540px' }}>{error}</div>}

            <button onClick={handleBook} disabled={loading}
              style={{ marginTop: '2rem', background: loading ? '#9B6BBD' : '#5C2D82', color: '#fff', border: 'none', padding: '14px 32px', borderRadius: '3px', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
              {loading ? 'Processing...' : service.price === 0 ? 'Confirm booking' : 'Continue to payment'}
              {!loading && <ArrowRight size={14} />}
            </button>
            <p style={{ fontSize: '12px', color: '#aaa', marginTop: '1rem' }}>
              {service.price > 0 ? 'You will be redirected to Stripe to complete payment securely.' : 'No payment required for discovery calls.'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
