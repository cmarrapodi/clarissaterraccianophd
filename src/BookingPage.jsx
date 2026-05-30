import { useState } from 'react'
import { supabase } from "./lib/supabase"
import { ArrowRight, ArrowLeft, Calendar, Clock, CheckCircle } from 'lucide-react'

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
    if (date.getDay() !== 0 && date.getDay() !== 6) dates.push(date)
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
