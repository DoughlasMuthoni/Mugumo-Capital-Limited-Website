import { useEffect, useState, useRef } from 'react'
import { adminApi } from '../api/adminApi'
import ConfirmModal from '../components/ConfirmModal'

const EMPTY = { name: '', role: '', bio: '', linkedin: '', photo_url: '', sort_order: 0, is_active: true }

export default function AdminTeam() {
  const [members,  setMembers]  = useState([])
  const [loading,  setLoading]  = useState(true)
  const [modal,    setModal]    = useState(false)
  const [editing,  setEditing]  = useState(null)
  const [form,     setForm]     = useState(EMPTY)
  const [saving,   setSaving]   = useState(false)
  const [toDelete, setToDelete] = useState(null)
  const [error,    setError]    = useState('')

  const [loadError, setLoadError] = useState('')

  const load = () => {
    setLoadError('')
    adminApi.listTeam()
      .then(d => setMembers(d.items || []))
      .catch(err => setLoadError(err.message || 'Failed to load team members.'))
      .finally(() => setLoading(false))
  }
  useEffect(load, [])

  const openAdd = () => {
    setEditing(null)
    setForm(EMPTY)
    setError('')
    setModal(true)
  }

  const openEdit = (m) => {
    setEditing(m)
    setForm({
      name:       m.name,
      role:       m.role,
      bio:        m.bio || '',
      linkedin:   m.linkedin || '',
      photo_url:  m.photo_url || '',
      sort_order: m.sort_order || 0,
      is_active:  m.is_active === 1 || m.is_active === true,
    })
    setError('')
    setModal(true)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      if (editing) {
        const d = await adminApi.updateTeam(editing.id, form)
        setMembers(prev => prev.map(m => m.id === editing.id ? d.item : m))
      } else {
        const d = await adminApi.createTeam(form)
        setMembers(prev => [...prev, d.item])
      }
      setModal(false)
    } catch (err) {
      setError(err.message || 'Failed to save.')
    } finally {
      setSaving(false)
    }
  }

  const doDelete = async () => {
    await adminApi.deleteTeam(toDelete)
    setMembers(prev => prev.filter(m => m.id !== toDelete))
    setToDelete(null)
  }

  const tf = (key, label, type = 'text', required = false) => (
    <div style={{ marginBottom: '14px' }}>
      <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#374151', marginBottom: '5px', letterSpacing: '0.04em' }}>
        {label}{required && <span style={{ color: '#EF4444' }}> *</span>}
      </label>
      {type === 'textarea' ? (
        <textarea value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} rows={3}
          style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #E5E7EB', borderRadius: '6px', fontSize: '0.875rem', resize: 'vertical', outline: 'none', boxSizing: 'border-box' }}
          onFocus={e => e.target.style.borderColor = '#0F2B3C'}
          onBlur={e => e.target.style.borderColor = '#E5E7EB'} />
      ) : (
        <input type={type} value={form[key]} required={required}
          onChange={e => setForm(f => ({ ...f, [key]: type === 'number' ? Number(e.target.value) : e.target.value }))}
          style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #E5E7EB', borderRadius: '6px', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' }}
          onFocus={e => e.target.style.borderColor = '#0F2B3C'}
          onBlur={e => e.target.style.borderColor = '#E5E7EB'} />
      )}
    </div>
  )

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F2B3C', marginBottom: '4px' }}>Team Members</h1>
          <p style={{ color: '#6B7280', fontSize: '0.875rem', margin: 0 }}>Manage team profiles shown on the Our Team page.</p>
        </div>
        <button onClick={openAdd}
          style={{ background: '#0F2B3C', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <i className="bi bi-plus-lg" /> Add Member
        </button>
      </div>

      {loadError && (
        <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', padding: '12px 16px', borderRadius: '6px', fontSize: '0.875rem', marginBottom: '20px' }}>
          <strong>API Error:</strong> {loadError}
        </div>
      )}

      {loading ? (
        <p style={{ color: '#9CA3AF' }}>Loading…</p>
      ) : members.length === 0 ? (
        <div style={{ background: '#fff', borderRadius: '8px', padding: '48px', textAlign: 'center', color: '#9CA3AF', boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
          <i className="bi bi-people" style={{ fontSize: '2.5rem', display: 'block', marginBottom: '12px' }} />
          <p style={{ fontWeight: 600, color: '#6B7280', marginBottom: '4px' }}>No team members yet</p>
          <p style={{ fontSize: '0.85rem', margin: 0 }}>Add members using the button above.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '20px' }}>
          {members.map(m => (
            <div key={m.id} style={{ background: '#fff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', opacity: m.is_active ? 1 : 0.55 }}>
              <div style={{ height: '160px', background: '#0F2B3C', position: 'relative', overflow: 'hidden' }}>
                {m.photo_url
                  ? <img src={m.photo_url} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                      <i className="bi bi-person-fill" style={{ fontSize: '4rem', color: 'rgba(255,255,255,0.2)' }} />
                    </div>
                }
                {!m.is_active && (
                  <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.6)', color: '#fff', fontSize: '0.65rem', padding: '3px 8px', borderRadius: '20px', fontWeight: 700 }}>
                    Hidden
                  </div>
                )}
              </div>
              <div style={{ padding: '18px 20px' }}>
                <div style={{ fontWeight: 700, color: '#111827', fontSize: '0.95rem' }}>{m.name}</div>
                <div style={{ fontSize: '0.8rem', color: '#E8751A', fontWeight: 600, marginBottom: '10px' }}>{m.role}</div>
                {m.bio && (
                  <p style={{ fontSize: '0.8rem', color: '#6B7280', lineHeight: 1.6, marginBottom: '12px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {m.bio}
                  </p>
                )}
                <div style={{ display: 'flex', gap: '8px', paddingTop: '12px', borderTop: '1px solid #F3F4F6' }}>
                  <button onClick={() => openEdit(m)}
                    style={{ flex: 1, padding: '7px', border: '1px solid #E5E7EB', borderRadius: '5px', background: '#fff', cursor: 'pointer', fontSize: '0.78rem', color: '#374151', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                    <i className="bi bi-pencil" /> Edit
                  </button>
                  <button onClick={() => setToDelete(m.id)}
                    style={{ padding: '7px 12px', border: '1px solid #FEE2E2', borderRadius: '5px', background: '#FEF2F2', cursor: 'pointer', fontSize: '0.78rem', color: '#EF4444' }}>
                    <i className="bi bi-trash3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', zIndex: 2000, padding: '24px', overflowY: 'auto' }}
          onClick={() => setModal(false)}>
          <div style={{ background: '#fff', borderRadius: '10px', width: '100%', maxWidth: '540px', marginTop: '40px', marginBottom: '40px' }}
            onClick={e => e.stopPropagation()}>
            <div style={{ padding: '22px 28px', borderBottom: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F2B3C', margin: 0 }}>
                {editing ? 'Edit Team Member' : 'Add Team Member'}
              </h3>
              <button onClick={() => setModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.3rem', color: '#9CA3AF', lineHeight: 1 }}>×</button>
            </div>

            <form onSubmit={handleSave} style={{ padding: '24px 28px' }}>
              {error && (
                <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', padding: '10px 14px', borderRadius: '6px', fontSize: '0.83rem', marginBottom: '16px' }}>
                  {error}
                </div>
              )}

              <PhotoUploadField
                value={form.photo_url}
                onChange={url => setForm(f => ({ ...f, photo_url: url }))}
              />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
                <div style={{ gridColumn: '1 / -1' }}>{tf('name', 'Full Name', 'text', true)}</div>
                <div style={{ gridColumn: '1 / -1' }}>{tf('role', 'Role / Title', 'text', true)}</div>
                <div style={{ gridColumn: '1 / -1' }}>{tf('bio', 'Bio', 'textarea')}</div>
                <div>{tf('linkedin', 'LinkedIn URL', 'url')}</div>
                <div>{tf('sort_order', 'Sort Order', 'number')}</div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px', marginBottom: '22px' }}>
                <input type="checkbox" id="is_active" checked={form.is_active}
                  onChange={e => setForm(f => ({ ...f, is_active: e.target.checked }))}
                  style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: '#0F2B3C' }} />
                <label htmlFor="is_active" style={{ fontSize: '0.875rem', color: '#374151', cursor: 'pointer' }}>
                  Active — visible on the Our Team page
                </label>
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setModal(false)}
                  style={{ padding: '9px 20px', border: '1px solid #E5E7EB', background: '#fff', borderRadius: '6px', cursor: 'pointer', fontSize: '0.875rem', color: '#374151' }}>
                  Cancel
                </button>
                <button type="submit" disabled={saving}
                  style={{ padding: '9px 22px', border: 'none', background: saving ? '#7A9EAF' : '#0F2B3C', color: '#fff', borderRadius: '6px', cursor: saving ? 'not-allowed' : 'pointer', fontSize: '0.875rem', fontWeight: 600 }}>
                  {saving ? 'Saving…' : (editing ? 'Update Member' : 'Add Member')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={toDelete !== null}
        title="Remove Team Member"
        message="This team member will be permanently removed from the database."
        confirmLabel="Remove"
        onConfirm={doDelete}
        onCancel={() => setToDelete(null)}
      />
    </>
  )
}

function PhotoUploadField({ value, onChange }) {
  const fileRef    = useRef(null)
  const [uploading, setUploading] = useState(false)
  const [uploadErr, setUploadErr] = useState('')

  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadErr('')
    setUploading(true)
    try {
      const data = await adminApi.uploadPhoto(file)
      onChange(data.url)
    } catch (err) {
      setUploadErr(err.message || 'Upload failed.')
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  return (
    <div style={{ marginBottom: '18px' }}>
      <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#374151', marginBottom: '8px', letterSpacing: '0.04em' }}>
        Profile Photo
      </label>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Preview */}
        <div style={{
          width: '80px', height: '80px', borderRadius: '8px',
          background: '#F3F4F6', border: '1.5px solid #E5E7EB',
          overflow: 'hidden', flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {value
            ? <img src={value} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            : <i className="bi bi-person-fill" style={{ fontSize: '2rem', color: '#D1D5DB' }} />
          }
        </div>

        <div style={{ flex: 1 }}>
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleFile}
            style={{ display: 'none' }}
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            style={{
              padding: '8px 16px', border: '1.5px solid #E5E7EB',
              borderRadius: '6px', background: '#fff', cursor: uploading ? 'not-allowed' : 'pointer',
              fontSize: '0.82rem', color: '#374151', display: 'flex', alignItems: 'center', gap: '7px',
              marginBottom: '6px',
            }}>
            <i className={uploading ? 'bi bi-arrow-repeat' : 'bi bi-upload'} />
            {uploading ? 'Uploading…' : (value ? 'Replace Photo' : 'Upload Photo')}
          </button>

          <p style={{ fontSize: '0.72rem', color: '#9CA3AF', margin: 0 }}>
            JPG, PNG, WebP or GIF · Max 5 MB
          </p>

          {uploadErr && (
            <p style={{ fontSize: '0.75rem', color: '#EF4444', margin: '4px 0 0' }}>{uploadErr}</p>
          )}

          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              style={{ fontSize: '0.72rem', color: '#EF4444', background: 'none', border: 'none', cursor: 'pointer', padding: '2px 0', marginTop: '4px' }}>
              <i className="bi bi-x" /> Remove photo
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
