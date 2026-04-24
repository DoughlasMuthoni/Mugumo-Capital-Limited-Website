import { useEffect, useState, useCallback } from 'react'
import { adminApi } from '../api/adminApi'
import StatusBadge from '../components/StatusBadge'
import ConfirmModal from '../components/ConfirmModal'

const TABS   = [{ key: 'contact', label: 'Contact Submissions' }, { key: 'partner', label: 'Partner Inquiries' }]
const STATUS = [{ value: '', label: 'All Statuses' }, { value: 'new', label: 'New' }, { value: 'read', label: 'Read' }, { value: 'responded', label: 'Responded' }]

export default function AdminInquiries() {
  const [tab,      setTab]      = useState('contact')
  const [items,    setItems]    = useState([])
  const [total,    setTotal]    = useState(0)
  const [pages,    setPages]    = useState(1)
  const [page,     setPage]     = useState(1)
  const [status,   setStatus]   = useState('')
  const [search,   setSearch]   = useState('')
  const [loading,  setLoading]  = useState(false)
  const [expanded, setExpanded] = useState(null)
  const [toDelete, setToDelete] = useState(null)

  const [loadError, setLoadError] = useState('')

  const load = useCallback(() => {
    setLoading(true)
    setExpanded(null)
    setLoadError('')
    adminApi.listInquiries({ type: tab, page, limit: 15, status, search })
      .then(d => { setItems(d.items || []); setTotal(d.total || 0); setPages(d.pages || 1) })
      .catch(err => setLoadError(err.message || 'Failed to load inquiries.'))
      .finally(() => setLoading(false))
  }, [tab, page, status, search])

  useEffect(() => { setPage(1) }, [tab, status, search])
  useEffect(() => { load() }, [load])

  const updateStatus = async (id, newStatus) => {
    await adminApi.updateInquiry(id, { status: newStatus }, tab)
    setItems(prev => prev.map(i => i.id === id ? { ...i, status: newStatus } : i))
  }

  const confirmDelete = (id) => setToDelete(id)
  const doDelete = async () => {
    await adminApi.deleteInquiry(toDelete, tab)
    setToDelete(null)
    load()
  }

  const isContact = tab === 'contact'

  return (
    <>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F2B3C', marginBottom: '4px' }}>Inquiries</h1>
        <p style={{ color: '#6B7280', fontSize: '0.875rem', margin: 0 }}>Manage all inbound inquiries from the website.</p>
      </div>

      {loadError && (
        <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', padding: '12px 16px', borderRadius: '6px', fontSize: '0.875rem', marginBottom: '20px' }}>
          <strong>API Error:</strong> {loadError}
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '20px', background: '#E5E7EB', borderRadius: '8px', padding: '4px', width: 'fit-content' }}>
        {TABS.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            style={{
              padding: '7px 18px', border: 'none', borderRadius: '6px', cursor: 'pointer',
              fontSize: '0.85rem', fontWeight: 600, transition: 'all 0.15s',
              background: tab === t.key ? '#fff' : 'transparent',
              color: tab === t.key ? '#0F2B3C' : '#6B7280',
              boxShadow: tab === t.key ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <input
          type="text" placeholder="Search name, email, organisation…"
          value={search} onChange={e => setSearch(e.target.value)}
          style={{ flex: '1 1 260px', padding: '9px 14px', border: '1.5px solid #E5E7EB', borderRadius: '6px', fontSize: '0.875rem', outline: 'none' }}
          onFocus={e => e.target.style.borderColor = '#0F2B3C'}
          onBlur={e => e.target.style.borderColor = '#E5E7EB'}
        />
        <select value={status} onChange={e => setStatus(e.target.value)}
          style={{ padding: '9px 14px', border: '1.5px solid #E5E7EB', borderRadius: '6px', fontSize: '0.875rem', background: '#fff', cursor: 'pointer', outline: 'none' }}>
          {STATUS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
        <div style={{ fontSize: '0.8rem', color: '#9CA3AF', display: 'flex', alignItems: 'center' }}>
          {total} result{total !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Table */}
      <div style={{ background: '#fff', borderRadius: '8px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
            <thead>
              <tr style={{ background: '#F9FAFB' }}>
                {['Name', 'Organisation', 'Email', isContact ? 'Type' : 'Investor Type', 'Date', 'Status', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '0.68rem', fontWeight: 700, color: '#6B7280', letterSpacing: '0.08em', textTransform: 'uppercase', borderBottom: '1px solid #F3F4F6', whiteSpace: 'nowrap' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr><td colSpan={7} style={{ padding: '32px', textAlign: 'center', color: '#9CA3AF' }}>Loading…</td></tr>
              )}
              {!loading && items.length === 0 && (
                <tr><td colSpan={7} style={{ padding: '32px', textAlign: 'center', color: '#9CA3AF' }}>No records found.</td></tr>
              )}
              {!loading && items.map(row => (
                <>
                  <tr key={row.id}
                    style={{ borderBottom: '1px solid #F3F4F6', cursor: 'pointer' }}
                    onClick={() => setExpanded(expanded === row.id ? null : row.id)}
                    onMouseEnter={e => e.currentTarget.style.background = '#FAFAFA'}
                    onMouseLeave={e => e.currentTarget.style.background = ''}
                  >
                    <td style={{ padding: '12px 16px', fontSize: '0.875rem', color: '#111827', fontWeight: 500 }}>{row.full_name}</td>
                    <td style={{ padding: '12px 16px', fontSize: '0.875rem', color: '#4B5563' }}>{row.organisation}</td>
                    <td style={{ padding: '12px 16px', fontSize: '0.8rem', color: '#6B7280' }}>{row.email}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ fontSize: '0.68rem', background: '#EFF6FF', color: '#1D4ED8', padding: '3px 8px', borderRadius: '20px', fontWeight: 700, whiteSpace: 'nowrap' }}>
                        {(isContact ? row.inquiry_type : row.investor_type || '—')?.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: '0.78rem', color: '#9CA3AF', whiteSpace: 'nowrap' }}>
                      {new Date(row.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td style={{ padding: '12px 16px' }} onClick={e => e.stopPropagation()}>
                      <StatusDropdown current={row.status} onChange={s => updateStatus(row.id, s)} />
                    </td>
                    <td style={{ padding: '12px 16px' }} onClick={e => e.stopPropagation()}>
                      <button onClick={() => confirmDelete(row.id)}
                        style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', fontSize: '0.85rem', padding: '4px 8px', borderRadius: '4px' }}
                        title="Delete">
                        <i className="bi bi-trash3" />
                      </button>
                    </td>
                  </tr>
                  {expanded === row.id && (
                    <tr key={`exp-${row.id}`} style={{ background: '#F8FAFC' }}>
                      <td colSpan={7} style={{ padding: '20px 24px' }}>
                        <InquiryDetail row={row} isContact={isContact} />
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pages > 1 && (
          <div style={{ padding: '14px 20px', borderTop: '1px solid #F3F4F6', display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'flex-end' }}>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              style={{ padding: '6px 14px', border: '1px solid #E5E7EB', borderRadius: '5px', background: '#fff', cursor: page === 1 ? 'not-allowed' : 'pointer', fontSize: '0.8rem', color: page === 1 ? '#D1D5DB' : '#374151' }}>
              ← Prev
            </button>
            <span style={{ fontSize: '0.8rem', color: '#6B7280' }}>Page {page} of {pages}</span>
            <button onClick={() => setPage(p => Math.min(pages, p + 1))} disabled={page === pages}
              style={{ padding: '6px 14px', border: '1px solid #E5E7EB', borderRadius: '5px', background: '#fff', cursor: page === pages ? 'not-allowed' : 'pointer', fontSize: '0.8rem', color: page === pages ? '#D1D5DB' : '#374151' }}>
              Next →
            </button>
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={toDelete !== null}
        title="Delete Inquiry"
        message="This action cannot be undone. The inquiry record will be permanently removed."
        onConfirm={doDelete}
        onCancel={() => setToDelete(null)}
      />
    </>
  )
}

function StatusDropdown({ current, onChange }) {
  return (
    <select value={current || 'new'} onChange={e => onChange(e.target.value)}
      style={{ padding: '4px 8px', border: '1px solid #E5E7EB', borderRadius: '5px', fontSize: '0.75rem', background: '#fff', cursor: 'pointer', outline: 'none' }}>
      <option value="new">New</option>
      <option value="read">Read</option>
      <option value="responded">Responded</option>
    </select>
  )
}

function InquiryDetail({ row, isContact }) {
  const fields = isContact
    ? [
        ['Full Name', row.full_name],
        ['Organisation', row.organisation],
        ['Email', row.email],
        ['Phone', row.phone || '—'],
        ['Inquiry Type', (row.inquiry_type || '').replace(/_/g, ' ')],
        ['Subject', row.subject || '—'],
        ['IP Address', row.ip_address || '—'],
        ['Submitted', new Date(row.created_at).toLocaleString()],
      ]
    : [
        ['Full Name', row.full_name],
        ['Organisation', row.organisation],
        ['Email', row.email],
        ['Investor Type', row.investor_type || '—'],
        ['Interest Area', row.interest_area || '—'],
        ['IP Address', row.ip_address || '—'],
        ['Submitted', new Date(row.created_at).toLocaleString()],
      ]

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
      {fields.map(([label, value]) => (
        <div key={label}>
          <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '3px' }}>{label}</div>
          <div style={{ fontSize: '0.875rem', color: '#111827' }}>{value}</div>
        </div>
      ))}
      <div style={{ gridColumn: '1 / -1' }}>
        <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>Message</div>
        <div style={{ fontSize: '0.875rem', color: '#374151', lineHeight: 1.7, background: '#fff', padding: '14px', borderRadius: '6px', border: '1px solid #E5E7EB' }}>
          {row.message}
        </div>
      </div>
    </div>
  )
}
