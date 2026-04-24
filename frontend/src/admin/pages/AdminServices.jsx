import { useEffect, useRef, useState } from 'react'
import { adminApi } from '../api/adminApi'
import ConfirmModal from '../components/ConfirmModal'

const EMPTY = {
  slug: '', icon: 'bi-briefcase', title: '', overview: '',
  client_types: '', transaction_scope: '', structuring_themes: '',
  image_url: '', sort_order: 0, is_active: true,
}

const toLines  = (arr) => (Array.isArray(arr) ? arr.join('\n') : arr || '')
const fromLines = (str) => str.split('\n').map(s => s.trim()).filter(Boolean)

function formToPayload(form) {
  return {
    ...form,
    client_types:       fromLines(form.client_types),
    transaction_scope:  fromLines(form.transaction_scope),
    structuring_themes: fromLines(form.structuring_themes),
  }
}

function rowToForm(m) {
  return {
    slug:               m.slug        || '',
    icon:               m.icon        || 'bi-briefcase',
    title:              m.title       || '',
    overview:           m.overview    || '',
    client_types:       toLines(m.client_types),
    transaction_scope:  toLines(m.transaction_scope),
    structuring_themes: toLines(m.structuring_themes),
    image_url:          m.image_url   || '',
    sort_order:         m.sort_order  || 0,
    is_active:          m.is_active === 1 || m.is_active === true,
  }
}

function ServiceImageUploadField({ value, onChange }) {
  const fileRef = useRef(null)
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
    <div style={{ marginBottom: '14px' }}>
      <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#374151', marginBottom: '4px', letterSpacing: '0.04em' }}>
        Service Image
      </label>

      {value && (
        <div style={{ marginBottom: '10px', position: 'relative', display: 'inline-block' }}>
          <img
            src={value}
            alt="Service"
            style={{ width: '160px', height: '100px', objectFit: 'cover', borderRadius: '6px', border: '1.5px solid #E5E7EB', display: 'block' }}
          />
          <button
            type="button"
            onClick={() => onChange('')}
            style={{
              position: 'absolute', top: '-8px', right: '-8px',
              width: '22px', height: '22px', borderRadius: '50%',
              background: '#EF4444', border: 'none', color: '#fff',
              fontSize: '0.75rem', cursor: 'pointer', lineHeight: 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
            title="Remove image"
          >×</button>
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <input
          type="text"
          value={value}
          placeholder="Paste image URL or upload below"
          onChange={e => onChange(e.target.value)}
          style={{ flex: 1, padding: '9px 12px', border: '1.5px solid #E5E7EB', borderRadius: '6px', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' }}
          onFocus={e => e.target.style.borderColor = '#0F2B3C'}
          onBlur={e => e.target.style.borderColor = '#E5E7EB'}
        />
        <input type="file" accept="image/*" ref={fileRef} onChange={handleFile} style={{ display: 'none' }} />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          style={{
            padding: '9px 14px', border: '1.5px solid #0F2B3C', background: uploading ? '#7A9EAF' : '#0F2B3C',
            color: '#fff', borderRadius: '6px', cursor: uploading ? 'not-allowed' : 'pointer',
            fontSize: '0.78rem', fontWeight: 600, whiteSpace: 'nowrap', flexShrink: 0,
          }}
        >
          {uploading ? 'Uploading…' : <><i className="bi bi-upload" /> Upload</>}
        </button>
      </div>

      {uploadErr && (
        <p style={{ fontSize: '0.72rem', color: '#EF4444', margin: '4px 0 0' }}>{uploadErr}</p>
      )}
      <p style={{ fontSize: '0.7rem', color: '#9CA3AF', margin: '3px 0 0' }}>
        Shown on the Our Services page. JPG, PNG, WebP — max 5 MB.
      </p>
    </div>
  )
}

export default function AdminServices() {
  const [items,    setItems]    = useState([])
  const [loading,  setLoading]  = useState(true)
  const [modal,    setModal]    = useState(false)
  const [editing,  setEditing]  = useState(null)
  const [form,     setForm]     = useState(EMPTY)
  const [saving,   setSaving]   = useState(false)
  const [toDelete, setToDelete] = useState(null)
  const [error,    setError]    = useState('')
  const [loadError,setLoadError]= useState('')

  const load = () => {
    setLoadError('')
    adminApi.listServices()
      .then(d => setItems(d.items || []))
      .catch(err => setLoadError(err.message || 'Failed to load services.'))
      .finally(() => setLoading(false))
  }
  useEffect(load, [])

  const openAdd = () => {
    setEditing(null); setForm(EMPTY); setError(''); setModal(true)
  }
  const openEdit = (m) => {
    setEditing(m); setForm(rowToForm(m)); setError(''); setModal(true)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      const payload = formToPayload(form)
      if (editing) {
        const d = await adminApi.updateService(editing.id, payload)
        setItems(prev => prev.map(s => s.id === editing.id ? d.item : s))
      } else {
        const d = await adminApi.createService(payload)
        setItems(prev => [...prev, d.item])
      }
      setModal(false)
    } catch (err) {
      setError(err.message || 'Failed to save.')
    } finally {
      setSaving(false)
    }
  }

  const doDelete = async () => {
    await adminApi.deleteService(toDelete)
    setItems(prev => prev.filter(s => s.id !== toDelete))
    setToDelete(null)
  }

  const tf = (key, label, type = 'text', required = false, hint = '') => (
    <div style={{ marginBottom: '14px' }}>
      <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#374151', marginBottom: '4px', letterSpacing: '0.04em' }}>
        {label}{required && <span style={{ color: '#EF4444' }}> *</span>}
      </label>
      {type === 'textarea' ? (
        <textarea value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} rows={4}
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
      {hint && <p style={{ fontSize: '0.7rem', color: '#9CA3AF', margin: '3px 0 0' }}>{hint}</p>}
    </div>
  )

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F2B3C', marginBottom: '4px' }}>Services</h1>
          <p style={{ color: '#6B7280', fontSize: '0.875rem', margin: 0 }}>Manage the service offerings shown on the Our Services page.</p>
        </div>
        <button onClick={openAdd}
          style={{ background: '#0F2B3C', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <i className="bi bi-plus-lg" /> Add Service
        </button>
      </div>

      {loadError && (
        <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', padding: '12px 16px', borderRadius: '6px', fontSize: '0.875rem', marginBottom: '20px' }}>
          <strong>API Error:</strong> {loadError}
        </div>
      )}

      {loading ? (
        <p style={{ color: '#9CA3AF' }}>Loading…</p>
      ) : items.length === 0 ? (
        <div style={{ background: '#fff', borderRadius: '8px', padding: '48px', textAlign: 'center', color: '#9CA3AF', boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
          <i className="bi bi-grid" style={{ fontSize: '2.5rem', display: 'block', marginBottom: '12px' }} />
          <p style={{ fontWeight: 600, color: '#6B7280', marginBottom: '4px' }}>No services yet</p>
          <p style={{ fontSize: '0.85rem', margin: 0 }}>Add services using the button above.</p>
        </div>
      ) : (
        <div style={{ background: '#fff', borderRadius: '8px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '620px' }}>
              <thead>
                <tr style={{ background: '#F9FAFB' }}>
                  {['', 'Title', 'Slug', 'Status', 'Order', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '0.68rem', fontWeight: 700, color: '#6B7280', letterSpacing: '0.08em', textTransform: 'uppercase', borderBottom: '1px solid #F3F4F6', whiteSpace: 'nowrap' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map(s => (
                  <tr key={s.id} style={{ borderBottom: '1px solid #F3F4F6' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#FAFAFA'}
                    onMouseLeave={e => e.currentTarget.style.background = ''}>
                    <td style={{ padding: '10px 16px', width: '64px' }}>
                      {s.image_url ? (
                        <img
                          src={s.image_url}
                          alt={s.title}
                          style={{ width: '52px', height: '40px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #E5E7EB', display: 'block' }}
                        />
                      ) : (
                        <div style={{ width: '40px', height: '40px', background: '#0F2B3C', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <i className={`bi ${s.icon}`} style={{ fontSize: '1rem', color: '#E8751A' }} />
                        </div>
                      )}
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: '0.875rem', color: '#111827', fontWeight: 600, maxWidth: '220px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {s.image_url && (
                          <div style={{ width: '28px', height: '28px', background: '#0F2B3C', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <i className={`bi ${s.icon}`} style={{ fontSize: '0.75rem', color: '#E8751A' }} />
                          </div>
                        )}
                        <div>
                          {s.title}
                          {s.overview && (
                            <p style={{ fontSize: '0.75rem', color: '#9CA3AF', margin: '2px 0 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '200px' }}>
                              {s.overview}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: '0.78rem', color: '#6B7280', fontFamily: 'monospace' }}>{s.slug}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{
                        fontSize: '0.68rem', fontWeight: 700, padding: '3px 8px', borderRadius: '20px',
                        background: s.is_active ? '#ECFDF5' : '#F9FAFB',
                        color: s.is_active ? '#059669' : '#9CA3AF',
                      }}>
                        {s.is_active ? 'Active' : 'Hidden'}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: '0.875rem', color: '#6B7280' }}>{s.sort_order}</td>
                    <td style={{ padding: '12px 16px', display: 'flex', gap: '8px' }}>
                      <button onClick={() => openEdit(s)}
                        style={{ background: 'none', border: '1px solid #E5E7EB', color: '#374151', cursor: 'pointer', fontSize: '0.78rem', padding: '5px 10px', borderRadius: '4px' }}>
                        <i className="bi bi-pencil" /> Edit
                      </button>
                      <button onClick={() => setToDelete(s.id)}
                        style={{ background: '#FEF2F2', border: '1px solid #FEE2E2', color: '#EF4444', cursor: 'pointer', fontSize: '0.78rem', padding: '5px 10px', borderRadius: '4px' }}>
                        <i className="bi bi-trash3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {modal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', zIndex: 2000, padding: '24px', overflowY: 'auto' }}
          onClick={() => setModal(false)}>
          <div style={{ background: '#fff', borderRadius: '10px', width: '100%', maxWidth: '680px', marginTop: '40px', marginBottom: '40px' }}
            onClick={e => e.stopPropagation()}>
            <div style={{ padding: '22px 28px', borderBottom: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F2B3C', margin: 0 }}>
                {editing ? 'Edit Service' : 'Add Service'}
              </h3>
              <button onClick={() => setModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.3rem', color: '#9CA3AF', lineHeight: 1 }}>×</button>
            </div>

            <form onSubmit={handleSave} style={{ padding: '24px 28px' }}>
              {error && (
                <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', padding: '10px 14px', borderRadius: '6px', fontSize: '0.83rem', marginBottom: '16px' }}>
                  {error}
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
                <div style={{ gridColumn: '1 / -1' }}>{tf('title', 'Title', 'text', true)}</div>
                <div>{tf('slug', 'Slug', 'text', false, 'URL-friendly ID, e.g. affordable-housing')}</div>
                <div>{tf('icon', 'Bootstrap Icon', 'text', false, 'e.g. bi-house-heart-fill')}</div>

                {/* Icon preview */}
                {form.icon && (
                  <div style={{ gridColumn: '1 / -1', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '40px', height: '40px', background: '#0F2B3C', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <i className={`bi ${form.icon}`} style={{ fontSize: '1.1rem', color: '#E8751A' }} />
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>Icon preview</span>
                  </div>
                )}

                <div style={{ gridColumn: '1 / -1' }}>
                  <ServiceImageUploadField
                    value={form.image_url}
                    onChange={url => setForm(f => ({ ...f, image_url: url }))}
                  />
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  {tf('overview', 'Overview', 'textarea')}
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  {tf('client_types', 'Client Types', 'textarea', false, 'One item per line')}
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  {tf('transaction_scope', 'Transaction Scope', 'textarea', false, 'One item per line')}
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  {tf('structuring_themes', 'Structuring Themes', 'textarea', false, 'One item per line')}
                </div>
                <div>{tf('sort_order', 'Sort Order', 'number')}</div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px', marginBottom: '22px' }}>
                <input type="checkbox" id="svc_active" checked={form.is_active}
                  onChange={e => setForm(f => ({ ...f, is_active: e.target.checked }))}
                  style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: '#0F2B3C' }} />
                <label htmlFor="svc_active" style={{ fontSize: '0.875rem', color: '#374151', cursor: 'pointer' }}>
                  Active — visible on the Our Services page
                </label>
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setModal(false)}
                  style={{ padding: '9px 20px', border: '1px solid #E5E7EB', background: '#fff', borderRadius: '6px', cursor: 'pointer', fontSize: '0.875rem', color: '#374151' }}>
                  Cancel
                </button>
                <button type="submit" disabled={saving}
                  style={{ padding: '9px 22px', border: 'none', background: saving ? '#7A9EAF' : '#0F2B3C', color: '#fff', borderRadius: '6px', cursor: saving ? 'not-allowed' : 'pointer', fontSize: '0.875rem', fontWeight: 600 }}>
                  {saving ? 'Saving…' : (editing ? 'Update Service' : 'Add Service')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={toDelete !== null}
        title="Remove Service"
        message="This service will be permanently removed from the database. The static fallback will still show on the frontend if no other services are active."
        confirmLabel="Remove"
        onConfirm={doDelete}
        onCancel={() => setToDelete(null)}
      />
    </>
  )
}
