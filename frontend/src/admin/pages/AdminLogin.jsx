import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdminAuth } from '../context/AdminAuthContext'
import logo from '../../assets/images/logo-removebg.png'

export default function AdminLogin() {
  const { login, user } = useAdminAuth()
  const navigate = useNavigate()
  const [form, setForm]       = useState({ username: '', password: '' })
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)
  const [showPwd, setShowPwd] = useState(false)

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

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(150deg, #050f16 0%, #0a1d2b 35%, #0F2B3C 65%, #163d54 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px',
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Decorative accent blobs */}
      <div style={{ position: 'absolute', top: '-100px', right: '-80px', width: '440px', height: '440px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,117,26,0.09) 0%, transparent 70%)', pointerEvents: 'none' }} aria-hidden="true" />
      <div style={{ position: 'absolute', bottom: '-80px', left: '-100px', width: '360px', height: '360px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,117,26,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} aria-hidden="true" />
      <div style={{ position: 'absolute', top: '50%', right: '15%', transform: 'translateY(-50%)', width: '1px', height: '200px', background: 'linear-gradient(to bottom, transparent, rgba(232,117,26,0.15), transparent)', pointerEvents: 'none' }} aria-hidden="true" />

      <div style={{
        width: '100%', maxWidth: '420px',
        background: 'rgba(255,255,255,0.035)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '16px',
        boxShadow: '0 48px 100px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.07)',
        overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{
          padding: '38px 40px 26px', textAlign: 'center',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          background: 'rgba(255,255,255,0.02)',
        }}>
          <img
            src={logo}
            alt="Mugumo Capital Partners"
            style={{ height: '42px', width: 'auto', filter: 'brightness(0) invert(1)', marginBottom: '18px', display: 'block', margin: '0 auto 18px' }}
          />
          <h1 style={{ color: '#fff', fontSize: '1.15rem', fontWeight: 700, margin: '0 0 5px', letterSpacing: '-0.01em' }}>
            Admin Console
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.32)', fontSize: '0.7rem', margin: 0, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
            Mugumo Capital Partners
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: '30px 40px 38px' }}>
          {error && (
            <div style={{
              background: 'rgba(220,38,38,0.12)', border: '1px solid rgba(220,38,38,0.28)',
              color: '#FCA5A5', padding: '11px 14px', borderRadius: '8px',
              fontSize: '0.8rem', marginBottom: '22px',
              display: 'flex', alignItems: 'flex-start', gap: '8px', lineHeight: 1.45,
            }}>
              <i className="bi bi-exclamation-triangle-fill" style={{ flexShrink: 0, marginTop: '1px', fontSize: '0.85rem' }} />
              {error}
            </div>
          )}

          {/* Username */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '0.67rem', fontWeight: 700, color: 'rgba(255,255,255,0.42)', marginBottom: '8px', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
              Username
            </label>
            <div style={{ position: 'relative' }}>
              <i className="bi bi-person" style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.28)', fontSize: '1rem', pointerEvents: 'none' }} />
              <input
                type="text"
                value={form.username}
                onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                autoComplete="username"
                required
                placeholder="Enter username"
                style={{
                  width: '100%', padding: '11px 14px 11px 38px',
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '8px', fontSize: '0.875rem',
                  color: '#fff', outline: 'none', boxSizing: 'border-box',
                  transition: 'border-color 0.18s, box-shadow 0.18s, background 0.18s',
                }}
                onFocus={e => { e.target.style.borderColor = '#E8751A'; e.target.style.background = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = '0 0 0 3px rgba(232,117,26,0.14)' }}
                onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; e.target.style.background = 'rgba(255,255,255,0.07)'; e.target.style.boxShadow = 'none' }}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: '28px' }}>
            <label style={{ display: 'block', fontSize: '0.67rem', fontWeight: 700, color: 'rgba(255,255,255,0.42)', marginBottom: '8px', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <i className="bi bi-lock" style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.28)', fontSize: '1rem', pointerEvents: 'none' }} />
              <input
                type={showPwd ? 'text' : 'password'}
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                autoComplete="current-password"
                required
                placeholder="Enter password"
                style={{
                  width: '100%', padding: '11px 42px 11px 38px',
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '8px', fontSize: '0.875rem',
                  color: '#fff', outline: 'none', boxSizing: 'border-box',
                  transition: 'border-color 0.18s, box-shadow 0.18s, background 0.18s',
                }}
                onFocus={e => { e.target.style.borderColor = '#E8751A'; e.target.style.background = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = '0 0 0 3px rgba(232,117,26,0.14)' }}
                onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; e.target.style.background = 'rgba(255,255,255,0.07)'; e.target.style.boxShadow = 'none' }}
              />
              <button
                type="button"
                onClick={() => setShowPwd(s => !s)}
                tabIndex={-1}
                style={{
                  position: 'absolute', right: '11px', top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)',
                  cursor: 'pointer', padding: '3px 5px', lineHeight: 1,
                  transition: 'color 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.65)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
              >
                <i className={`bi bi-eye${showPwd ? '-slash' : ''}`} style={{ fontSize: '0.9rem' }} />
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              background: loading
                ? 'rgba(232,117,26,0.45)'
                : 'linear-gradient(135deg, #E8751A 0%, #c9620f 100%)',
              color: '#fff', border: 'none',
              padding: '13px', borderRadius: '8px',
              fontSize: '0.875rem', fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              letterSpacing: '0.02em',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              boxShadow: loading ? 'none' : '0 4px 18px rgba(232,117,26,0.38)',
              transition: 'opacity 0.18s',
            }}
            onMouseEnter={e => { if (!loading) e.currentTarget.style.opacity = '0.9' }}
            onMouseLeave={e => { if (!loading) e.currentTarget.style.opacity = '1' }}
          >
            {loading ? (
              <>
                <span style={{ width: '14px', height: '14px', border: '2px solid rgba(255,255,255,0.35)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'loginSpin 0.7s linear infinite' }} />
                Signing in…
              </>
            ) : (
              <>
                <i className="bi bi-arrow-right-circle-fill" />
                Sign In to Console
              </>
            )}
          </button>
        </form>
      </div>

      <style>{`
        @keyframes loginSpin { to { transform: rotate(360deg); } }
        input[placeholder]::placeholder { color: rgba(255,255,255,0.18) !important; }
      `}</style>
    </div>
  )
}
