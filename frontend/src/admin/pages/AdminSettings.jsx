import { useEffect, useState } from 'react'
import { adminApi } from '../api/adminApi'

export default function AdminSettings() {
  const [settings, setSettings] = useState({})
  const [values,   setValues]   = useState({})
  const [loading,  setLoading]  = useState(true)
  const [saving,   setSaving]   = useState(false)
  const [saved,    setSaved]    = useState(false)
  const [error,    setError]    = useState('')

  useEffect(() => {
    adminApi.getSettings()
      .then(d => {
        setSettings(d.settings || {})
        const vals = {}
        Object.entries(d.settings || {}).forEach(([k, v]) => { vals[k] = v.value || '' })
        setValues(vals)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const handleSave = async (e) => {
    e.preventDefault()
    setError('')
    setSaved(false)
    setSaving(true)
    try {
      await adminApi.updateSettings(values)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      setError(err.message || 'Failed to save settings.')
    } finally {
      setSaving(false)
    }
  }

  const isUrl = (key) => key.includes('url') || key.includes('linkedin')
  const isPhone = (key) => key.includes('phone') || key.includes('whatsapp')

  return (
    <>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F2B3C', marginBottom: '4px' }}>Site Settings</h1>
        <p style={{ color: '#6B7280', fontSize: '0.875rem', margin: 0 }}>Manage contact details and configurable site settings.</p>
      </div>

      {loading ? (
        <p style={{ color: '#9CA3AF' }}>Loading…</p>
      ) : (
        <div style={{ maxWidth: '680px' }}>
          <form onSubmit={handleSave}>
            <div style={{ background: '#fff', borderRadius: '8px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', overflow: 'hidden', marginBottom: '20px' }}>
              <div style={{ padding: '18px 24px', borderBottom: '1px solid #F3F4F6' }}>
                <h2 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F2B3C', margin: 0 }}>Contact & Social</h2>
              </div>
              <div style={{ padding: '24px' }}>
                {Object.entries(settings).map(([key, { label }]) => (
                  <div key={key} style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#374151', marginBottom: '6px', letterSpacing: '0.04em' }}>
                      {label}
                    </label>
                    <input
                      type={isUrl(key) ? 'url' : isPhone(key) ? 'tel' : 'text'}
                      value={values[key] ?? ''}
                      onChange={e => setValues(v => ({ ...v, [key]: e.target.value }))}
                      placeholder={isUrl(key) ? 'https://…' : ''}
                      style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #E5E7EB', borderRadius: '6px', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' }}
                      onFocus={e => e.target.style.borderColor = '#0F2B3C'}
                      onBlur={e => e.target.style.borderColor = '#E5E7EB'}
                    />
                    {key === 'whatsapp_number' && (
                      <p style={{ fontSize: '0.72rem', color: '#9CA3AF', marginTop: '4px' }}>
                        Include country code without + symbol. E.g. 254700000000
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {error && (
              <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', padding: '10px 16px', borderRadius: '6px', fontSize: '0.85rem', marginBottom: '16px' }}>
                <i className="bi bi-exclamation-circle me-2" />{error}
              </div>
            )}
            {saved && (
              <div style={{ background: '#D1FAE5', border: '1px solid #A7F3D0', color: '#065F46', padding: '10px 16px', borderRadius: '6px', fontSize: '0.85rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <i className="bi bi-check-circle-fill" /> Settings saved successfully.
              </div>
            )}

            <button type="submit" disabled={saving}
              style={{
                background: saving ? '#7A9EAF' : '#0F2B3C',
                color: '#fff', border: 'none', padding: '11px 28px',
                borderRadius: '6px', cursor: saving ? 'not-allowed' : 'pointer',
                fontSize: '0.875rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '8px',
              }}>
              <i className="bi bi-floppy-fill" />
              {saving ? 'Saving…' : 'Save Settings'}
            </button>
          </form>
        </div>
      )}
    </>
  )
}
