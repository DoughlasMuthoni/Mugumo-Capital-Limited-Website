import { useState } from 'react'
import { submitContactForm } from '../../services/api'

const inquiryTypes = [
  { value: '', label: 'Select inquiry type...' },
  { value: 'project_sponsor', label: 'Project Sponsor' },
  { value: 'ppp_authority', label: 'PPP Contracting Authority' },
  { value: 'institutional_investor', label: 'Institutional Investor' },
  { value: 'dfi', label: 'Development Finance Institution' },
  { value: 'mfi', label: 'Microfinance Institution' },
  { value: 'other', label: 'Other' },
]

const initialForm = {
  full_name: '',
  organisation: '',
  email: '',
  phone: '',
  inquiry_type: '',
  subject: '',
  message: '',
}

function validate(data) {
  const errors = {}
  if (!data.full_name.trim()) errors.full_name = 'Name is required.'
  if (!data.organisation.trim()) errors.organisation = 'Organisation is required.'
  if (!data.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address.'
  }
  if (!data.inquiry_type) errors.inquiry_type = 'Please select an inquiry type.'
  if (!data.subject.trim()) errors.subject = 'Subject is required.'
  if (!data.message.trim()) {
    errors.message = 'Message is required.'
  } else if (data.message.trim().length < 20) {
    errors.message = 'Please provide at least 20 characters.'
  }
  return errors
}

export default function ContactForm() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [serverError, setServerError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const clientErrors = validate(form)
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors)
      return
    }
    setSubmitting(true)
    setServerError(null)
    try {
      await submitContactForm(form)
      setSuccess(true)
    } catch (err) {
      if (err.errors && Object.keys(err.errors).length > 0) {
        setErrors(err.errors)
      } else {
        setServerError(err.message || 'Something went wrong. Please try again or email us directly.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <div
        style={{
          background: 'var(--color-ivory)',
          borderRadius: 'var(--radius-lg)',
          padding: '3rem 2.5rem',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: '72px', height: '72px', borderRadius: '50%',
            background: 'rgba(232,117,26,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1.5rem',
          }}
        >
          <i className="bi bi-check-lg" style={{ fontSize: '2rem', color: 'var(--color-accent)' }}></i>
        </div>
        <h3 className="heading-serif mb-3" style={{ fontSize: '1.375rem' }}>Thank You for Your Inquiry</h3>
        <p className="text-muted-custom mb-0" style={{ lineHeight: 1.8, fontSize: '0.975rem' }}>
          A member of our advisory team will be in touch shortly. We acknowledge all inquiries within one business day.
        </p>
        <p className="mt-3" style={{ fontSize: '0.875rem', color: 'var(--color-muted)' }}>
          For urgent matters, write directly to{' '}
          <a href="mailto:info@mugumocapital.com">info@mugumocapital.com</a>
        </p>
      </div>
    )
  }

  const inputStyle = (field) => ({
    borderColor: errors[field] ? '#dc3545' : 'var(--color-ivory-muted)',
    borderRadius: 'var(--radius-sm)',
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    padding: '0.7rem 1rem',
    color: 'var(--color-body)',
    backgroundColor: 'var(--color-white)',
  })

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Contact inquiry form">
      <div
        style={{
          background: 'var(--color-white)',
          borderRadius: 'var(--radius-lg)',
          padding: '2.5rem',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        <h3 className="heading-serif mb-4" style={{ fontSize: '1.25rem' }}>Send an Inquiry</h3>

        {serverError && (
          <div className="alert alert-danger mb-4" role="alert" style={{ fontSize: '0.875rem' }}>
            <i className="bi bi-exclamation-triangle me-2"></i>
            {serverError}
          </div>
        )}

        <div className="row g-3">
          {/* Name */}
          <div className="col-md-6">
            <label htmlFor="full_name" className="form-label" style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--color-navy)' }}>
              Full Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              id="full_name"
              name="full_name"
              className="form-control"
              value={form.full_name}
              onChange={handleChange}
              placeholder="Your full name"
              aria-required="true"
              aria-describedby={errors.full_name ? 'full_name_error' : undefined}
              style={inputStyle('full_name')}
            />
            {errors.full_name && <div id="full_name_error" className="text-danger mt-1" style={{ fontSize: '0.8rem' }}>{errors.full_name}</div>}
          </div>

          {/* Organisation */}
          <div className="col-md-6">
            <label htmlFor="organisation" className="form-label" style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--color-navy)' }}>
              Organisation <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              id="organisation"
              name="organisation"
              className="form-control"
              value={form.organisation}
              onChange={handleChange}
              placeholder="Your organisation"
              aria-required="true"
              aria-describedby={errors.organisation ? 'organisation_error' : undefined}
              style={inputStyle('organisation')}
            />
            {errors.organisation && <div id="organisation_error" className="text-danger mt-1" style={{ fontSize: '0.8rem' }}>{errors.organisation}</div>}
          </div>

          {/* Email */}
          <div className="col-md-6">
            <label htmlFor="email" className="form-label" style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--color-navy)' }}>
              Email Address <span className="text-danger">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
              placeholder="your@email.com"
              aria-required="true"
              aria-describedby={errors.email ? 'email_error' : undefined}
              style={inputStyle('email')}
            />
            {errors.email && <div id="email_error" className="text-danger mt-1" style={{ fontSize: '0.8rem' }}>{errors.email}</div>}
          </div>

          {/* Phone */}
          <div className="col-md-6">
            <label htmlFor="phone" className="form-label" style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--color-navy)' }}>
              Phone <span className="text-muted-custom" style={{ fontWeight: 400 }}>(optional)</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="form-control"
              value={form.phone}
              onChange={handleChange}
              placeholder="+254 700 000 000"
              style={inputStyle('phone')}
            />
          </div>

          {/* Inquiry Type */}
          <div className="col-12">
            <label htmlFor="inquiry_type" className="form-label" style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--color-navy)' }}>
              Inquiry Type <span className="text-danger">*</span>
            </label>
            <select
              id="inquiry_type"
              name="inquiry_type"
              className="form-select"
              value={form.inquiry_type}
              onChange={handleChange}
              aria-required="true"
              aria-describedby={errors.inquiry_type ? 'inquiry_type_error' : undefined}
              style={inputStyle('inquiry_type')}
            >
              {inquiryTypes.map(({ value, label }) => (
                <option key={value} value={value} disabled={value === ''}>{label}</option>
              ))}
            </select>
            {errors.inquiry_type && <div id="inquiry_type_error" className="text-danger mt-1" style={{ fontSize: '0.8rem' }}>{errors.inquiry_type}</div>}
          </div>

          {/* Subject */}
          <div className="col-12">
            <label htmlFor="subject" className="form-label" style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--color-navy)' }}>
              Subject <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              className="form-control"
              value={form.subject}
              onChange={handleChange}
              placeholder="Brief description of your inquiry"
              aria-required="true"
              aria-describedby={errors.subject ? 'subject_error' : undefined}
              style={inputStyle('subject')}
            />
            {errors.subject && <div id="subject_error" className="text-danger mt-1" style={{ fontSize: '0.8rem' }}>{errors.subject}</div>}
          </div>

          {/* Message */}
          <div className="col-12">
            <label htmlFor="message" className="form-label" style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--color-navy)' }}>
              Message <span className="text-danger">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              className="form-control"
              rows={5}
              value={form.message}
              onChange={handleChange}
              placeholder="Please describe your mandate, project, or inquiry in as much detail as you are comfortable sharing at this stage."
              aria-required="true"
              aria-describedby={errors.message ? 'message_error' : undefined}
              style={{ ...inputStyle('message'), resize: 'vertical', minHeight: '120px' }}
            />
            {errors.message && <div id="message_error" className="text-danger mt-1" style={{ fontSize: '0.8rem' }}>{errors.message}</div>}
          </div>

          {/* Submit */}
          <div className="col-12 mt-2">
            <button
              type="submit"
              disabled={submitting}
              className="btn-mugumo-primary w-100 d-flex align-items-center justify-content-center gap-2"
              style={{ fontSize: '0.95rem', padding: '0.875rem' }}
            >
              {submitting ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  Submitting...
                </>
              ) : (
                <>
                  <i className="bi bi-send"></i>
                  Submit Inquiry
                </>
              )}
            </button>
            <p className="text-center mt-3 mb-0" style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>
              Your information is kept confidential and used solely for responding to your inquiry.
            </p>
          </div>
        </div>
      </div>
    </form>
  )
}
