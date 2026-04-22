import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdminAuth } from '../context/AdminAuthContext'
import logo from '../../assets/images/logo-removebg.png'

export default function AdminLogin() {
  const { login, user } = useAdminAuth()
  const navigate = useNavigate()
  const [form, setForm]     = useState({ username: '', password: '' })
  const [error, setError]   = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) navigate('/admin', { replace: true })
  }, [user, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(form.username, form.password)
      navigate('/admin')
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  const field = (name, type, label, autocomplete) => (
    <div style={{ marginBottom: '18px' }}>
      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#374151', marginBottom: '6px', letterSpacing: '0.04em' }}>
        {label}
      </label>
      <input
        type={type}
        value={form[name]}
        onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))}
        autoComplete={autocomplete}
        required
        style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #E5E7EB', borderRadius: '6px', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.15s' }}
        onFocus={e => e.target.style.borderColor = '#0F2B3C'}
        onBlur={e => e.target.style.borderColor = '#E5E7EB'}
      />
    </div>
  )

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(150deg, #081923 0%, #0F2B3C 60%, #163d54 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      <div style={{
        background: '#fff', width: '100%', maxWidth: '400px',
        borderRadius: '10px', overflow: 'hidden',
        boxShadow: '0 32px 80px rgba(0,0,0,0.4)',
      }}>
        {/* Top bar */}
        <div style={{ background: '#0F2B3C', padding: '36px 32px 30px', textAlign: 'center' }}>
          <img src={logo} alt="Mugumo Capital" style={{ height: '52px', width: 'auto', filter: 'brightness(0) invert(1)' }} />
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: '14px', marginBottom: 0 }}>
            Admin Console
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: '32px' }}>
          {error && (
            <div style={{
              background: '#FEF2F2', border: '1px solid #FECACA',
              color: '#DC2626', padding: '10px 14px', borderRadius: '6px',
              fontSize: '0.83rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              <i className="bi bi-exclamation-circle-fill" />
              {error}
            </div>
          )}

          {field('username', 'text', 'Username', 'username')}
          {field('password', 'password', 'Password', 'current-password')}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', background: loading ? '#7A9EAF' : '#0F2B3C',
              color: '#fff', border: 'none', padding: '12px',
              borderRadius: '6px', fontSize: '0.875rem', fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              letterSpacing: '0.04em', transition: 'background 0.2s',
              marginTop: '4px',
            }}
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
