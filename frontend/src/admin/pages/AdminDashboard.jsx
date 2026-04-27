import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { adminApi } from '../api/adminApi'
import StatCard from '../components/StatCard'
import StatusBadge from '../components/StatusBadge'

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

const QUICK_LINKS = [
  { to: '/admin/homepage', icon: 'bi-house-heart',    label: 'Edit Homepage',   color: '#6366F1' },
  { to: '/admin/team',     icon: 'bi-person-plus',    label: 'Manage Team',     color: '#0891B2' },
  { to: '/admin/services', icon: 'bi-plus-square',    label: 'Edit Services',   color: '#059669' },
  { to: '/admin/inquiries',icon: 'bi-inbox',          label: 'View Inquiries',  color: '#E8751A' },
]

export default function AdminDashboard() {
  const [stats,   setStats]   = useState(null)
  const [recent,  setRecent]  = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState('')

  useEffect(() => {
    Promise.all([
      adminApi.getStats(),
      adminApi.listInquiries({ limit: 8, page: 1 }),
    ])
      .then(([s, i]) => { setStats(s); setRecent(i.items || []) })
      .catch(err => setError(err.message || 'Failed to load dashboard data.'))
      .finally(() => setLoading(false))
  }, [])

  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })

  return (
    <>
      {/* Page header */}
      <div style={{ marginBottom: '30px' }}>
        <div style={{ fontSize: '0.775rem', color: '#9CA3AF', marginBottom: '5px' }}>{today}</div>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0F2B3C', marginBottom: '5px', letterSpacing: '-0.025em' }}>
          {getGreeting()}
        </h1>
        <p style={{ color: '#6B7280', fontSize: '0.875rem', margin: 0 }}>
          Here's an overview of your site activity and content.
        </p>
      </div>

      {error && (
        <div style={{
          background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626',
          padding: '12px 16px', borderRadius: '8px', fontSize: '0.875rem',
          marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px',
        }}>
          <i className="bi bi-exclamation-circle-fill" />
          <strong>API Error:</strong> {error}
        </div>
      )}

      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#9CA3AF', padding: '40px 0' }}>
          <span style={{ width: '16px', height: '16px', border: '2px solid #E5E7EB', borderTopColor: '#0F2B3C', borderRadius: '50%', display: 'inline-block', animation: 'dbSpin 0.7s linear infinite' }} />
          Loading dashboard…
        </div>
      ) : (
        <>
          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '18px', marginBottom: '28px' }}>
            <StatCard icon="bi-envelope-fill"    label="Contact Submissions" value={stats?.total_contacts ?? 0}  sub={`${stats?.new_contacts ?? 0} unread`}   color="#0F2B3C" />
            <StatCard icon="bi-handshake-fill"   label="Partner Inquiries"   value={stats?.total_partners ?? 0}  sub={`${stats?.new_partners ?? 0} unread`}   color="#E8751A" />
            <StatCard icon="bi-people-fill"      label="Team Members"        value={stats?.active_team ?? 0}     sub="active profiles"                        color="#0F2B3C" />
            <StatCard icon="bi-grid-fill"        label="Active Services"     value={stats?.active_services ?? 0} sub="visible on site"                        color="#E8751A" />
          </div>

          {/* Quick actions */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(175px, 1fr))', gap: '12px', marginBottom: '28px' }}>
            {QUICK_LINKS.map(({ to, icon, label, color }) => (
              <Link
                key={to}
                to={to}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '13px 16px', background: '#fff',
                  borderRadius: '9px', textDecoration: 'none',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  border: '1px solid #F0F2F5',
                  color: '#374151', fontSize: '0.835rem', fontWeight: 500,
                  transition: 'box-shadow 0.15s, transform 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)'; e.currentTarget.style.transform = 'none' }}
              >
                <div style={{
                  width: '34px', height: '34px', borderRadius: '8px',
                  background: color + '14',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <i className={`bi ${icon}`} style={{ fontSize: '0.95rem', color }} />
                </div>
                {label}
              </Link>
            ))}
          </div>

          {/* Recent inquiries table */}
          <div style={{
            background: '#fff', borderRadius: '10px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            overflow: 'hidden', border: '1px solid #F0F2F5',
          }}>
            <div style={{
              padding: '16px 24px', borderBottom: '1px solid #F3F4F6',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div>
                <h2 style={{ fontSize: '0.925rem', fontWeight: 700, color: '#111827', margin: 0 }}>
                  Recent Contact Submissions
                </h2>
                <p style={{ fontSize: '0.73rem', color: '#9CA3AF', margin: '3px 0 0' }}>
                  Latest {recent.length} enquiries received
                </p>
              </div>
              <Link
                to="/admin/inquiries"
                style={{
                  fontSize: '0.775rem', color: '#E8751A', textDecoration: 'none', fontWeight: 600,
                  padding: '5px 12px', borderRadius: '6px',
                  border: '1px solid rgba(232,117,26,0.25)',
                  display: 'inline-flex', alignItems: 'center', gap: '5px',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(232,117,26,0.06)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                View all <i className="bi bi-arrow-right" style={{ fontSize: '0.72rem' }} />
              </Link>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '580px' }}>
                <thead>
                  <tr style={{ background: '#FAFBFC' }}>
                    {['Name', 'Organisation', 'Type', 'Date', 'Status'].map(h => (
                      <th key={h} style={{
                        padding: '10px 20px', textAlign: 'left',
                        fontSize: '0.66rem', fontWeight: 700, color: '#9CA3AF',
                        letterSpacing: '0.09em', textTransform: 'uppercase',
                        borderBottom: '1px solid #F3F4F6',
                      }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recent.map(row => (
                    <tr
                      key={row.id}
                      style={{ borderBottom: '1px solid #F9FAFB', transition: 'background 0.1s' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#FAFBFC'}
                      onMouseLeave={e => e.currentTarget.style.background = ''}
                    >
                      <td style={{ padding: '12px 20px', fontSize: '0.875rem', color: '#111827', fontWeight: 500 }}>
                        {row.full_name}
                      </td>
                      <td style={{ padding: '12px 20px', fontSize: '0.835rem', color: '#4B5563' }}>
                        {row.organisation || <span style={{ color: '#D1D5DB' }}>—</span>}
                      </td>
                      <td style={{ padding: '12px 20px' }}>
                        <span style={{
                          fontSize: '0.67rem', background: '#EFF6FF', color: '#1D4ED8',
                          padding: '3px 9px', borderRadius: '20px', fontWeight: 700, letterSpacing: '0.02em',
                        }}>
                          {(row.inquiry_type || 'other').replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td style={{ padding: '12px 20px', fontSize: '0.78rem', color: '#9CA3AF' }}>
                        {new Date(row.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </td>
                      <td style={{ padding: '12px 20px' }}><StatusBadge status={row.status} /></td>
                    </tr>
                  ))}
                  {recent.length === 0 && (
                    <tr>
                      <td colSpan={5} style={{ padding: '52px', textAlign: 'center', color: '#9CA3AF', fontSize: '0.875rem' }}>
                        <i className="bi bi-inbox" style={{ fontSize: '2.2rem', display: 'block', marginBottom: '10px', opacity: 0.35 }} />
                        No inquiries yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      <style>{`@keyframes dbSpin { to { transform: rotate(360deg); } }`}</style>
    </>
  )
}
