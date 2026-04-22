import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { adminApi } from '../api/adminApi'
import StatCard from '../components/StatCard'
import StatusBadge from '../components/StatusBadge'

export default function AdminDashboard() {
  const [stats,   setStats]   = useState(null)
  const [recent,  setRecent]  = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      adminApi.getStats(),
      adminApi.listInquiries({ limit: 8, page: 1 }),
    ])
      .then(([s, i]) => { setStats(s); setRecent(i.items || []) })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F2B3C', marginBottom: '4px' }}>Dashboard</h1>
        <p style={{ color: '#6B7280', fontSize: '0.875rem', margin: 0 }}>Overview of site activity and content.</p>
      </div>

      {loading ? (
        <p style={{ color: '#9CA3AF' }}>Loading…</p>
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '20px', marginBottom: '32px' }}>
            <StatCard icon="bi-envelope-fill"    label="Contact Submissions" value={stats?.total_contacts ?? 0} sub={`${stats?.new_contacts ?? 0} unread`}  color="#0F2B3C" />
            <StatCard icon="bi-handshake-fill"   label="Partner Inquiries"   value={stats?.total_partners ?? 0} sub={`${stats?.new_partners ?? 0} unread`}  color="#E8751A" />
            <StatCard icon="bi-people-fill"      label="Team Members"        value={stats?.active_team ?? 0}    sub="active profiles"                        color="#0F2B3C" />
            <StatCard icon="bi-chat-dots-fill"   label="Total Inquiries"
              value={(stats?.total_contacts ?? 0) + (stats?.total_partners ?? 0)}
              sub="all types combined"
              color="#E8751A"
            />
          </div>

          <div style={{ background: '#fff', borderRadius: '8px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
            <div style={{ padding: '18px 24px', borderBottom: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#111827', margin: 0 }}>Recent Contact Submissions</h2>
              <Link to="/admin/inquiries" style={{ fontSize: '0.8rem', color: '#E8751A', textDecoration: 'none', fontWeight: 600 }}>
                View all →
              </Link>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                <thead>
                  <tr style={{ background: '#F9FAFB' }}>
                    {['Name', 'Organisation', 'Type', 'Date', 'Status'].map(h => (
                      <th key={h} style={{ padding: '10px 20px', textAlign: 'left', fontSize: '0.68rem', fontWeight: 700, color: '#6B7280', letterSpacing: '0.08em', textTransform: 'uppercase', borderBottom: '1px solid #F3F4F6' }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recent.map(row => (
                    <tr key={row.id} style={{ borderBottom: '1px solid #F9FAFB' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#FAFAFA'}
                      onMouseLeave={e => e.currentTarget.style.background = ''}
                    >
                      <td style={{ padding: '12px 20px', fontSize: '0.875rem', color: '#111827', fontWeight: 500 }}>{row.full_name}</td>
                      <td style={{ padding: '12px 20px', fontSize: '0.875rem', color: '#4B5563' }}>{row.organisation}</td>
                      <td style={{ padding: '12px 20px' }}>
                        <span style={{ fontSize: '0.68rem', background: '#EFF6FF', color: '#1D4ED8', padding: '3px 8px', borderRadius: '20px', fontWeight: 700 }}>
                          {(row.inquiry_type || 'other').replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td style={{ padding: '12px 20px', fontSize: '0.8rem', color: '#9CA3AF' }}>
                        {new Date(row.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </td>
                      <td style={{ padding: '12px 20px' }}><StatusBadge status={row.status} /></td>
                    </tr>
                  ))}
                  {recent.length === 0 && (
                    <tr>
                      <td colSpan={5} style={{ padding: '32px', textAlign: 'center', color: '#9CA3AF', fontSize: '0.875rem' }}>
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
    </>
  )
}
