import { useState } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useAdminAuth } from '../context/AdminAuthContext'
import logo from '../../assets/images/logo-removebg.png'

const NAV_GROUPS = [
  {
    label: 'Content',
    items: [
      { path: '/admin',          label: 'Dashboard', icon: 'bi-speedometer2',    exact: true },
      { path: '/admin/homepage', label: 'Homepage',  icon: 'bi-house-heart-fill'             },
      { path: '/admin/team',     label: 'Team',      icon: 'bi-people-fill'                  },
      { path: '/admin/services', label: 'Services',  icon: 'bi-grid-fill'                    },
    ],
  },
  {
    label: 'Communications',
    items: [
      { path: '/admin/inquiries', label: 'Inquiries', icon: 'bi-envelope-fill' },
    ],
  },
  {
    label: 'System',
    items: [
      { path: '/admin/settings', label: 'Settings', icon: 'bi-gear-fill' },
    ],
  },
]

const PAGE_NAMES = {
  '/admin':           'Dashboard',
  '/admin/homepage':  'Homepage Content',
  '/admin/team':      'Team Members',
  '/admin/services':  'Services',
  '/admin/inquiries': 'Inquiries',
  '/admin/settings':  'Site Settings',
}

function getInitials(u) {
  if (!u) return 'A'
  const parts = u.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

function NavItem({ path, label, icon, exact }) {
  const [hovered, setHovered] = useState(false)
  return (
    <NavLink
      to={path}
      end={exact}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={({ isActive }) => ({
        display: 'flex', alignItems: 'center', gap: '11px',
        padding: '9px 20px',
        color: isActive ? '#fff' : hovered ? 'rgba(255,255,255,0.78)' : 'rgba(255,255,255,0.48)',
        background: isActive ? 'rgba(232,117,26,0.15)' : hovered ? 'rgba(255,255,255,0.05)' : 'transparent',
        borderLeft: isActive ? '3px solid #E8751A' : '3px solid transparent',
        textDecoration: 'none',
        fontSize: '0.835rem',
        fontWeight: isActive ? 600 : 400,
        transition: 'all 0.15s ease',
        userSelect: 'none',
      })}
    >
      <i className={`bi ${icon}`} style={{ fontSize: '0.92rem', flexShrink: 0 }} />
      {label}
    </NavLink>
  )
}

export default function AdminLayout({ children }) {
  const { user, logout } = useAdminAuth()
  const navigate  = useNavigate()
  const location  = useLocation()

  const handleLogout = async () => {
    await logout()
    navigate('/admin/login')
  }

  const pageName = PAGE_NAMES[location.pathname] || 'Admin'

  return (
    <div style={{
      display: 'flex', minHeight: '100vh', background: '#F2F4F7',
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    }}>

      {/* ── Sidebar ────────────────────────────────────────────────────────── */}
      <aside style={{
        width: '248px', flexShrink: 0,
        background: '#0A1F2E',
        display: 'flex', flexDirection: 'column',
        position: 'fixed', top: 0, left: 0, bottom: 0,
        zIndex: 100,
        borderRight: '1px solid rgba(255,255,255,0.05)',
        boxShadow: '4px 0 20px rgba(0,0,0,0.15)',
      }}>
        {/* Logo */}
        <div style={{
          padding: '20px 20px',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}>
          <img src={logo} alt="Mugumo Capital" style={{ height: '32px', width: 'auto', filter: 'brightness(0) invert(1)', display: 'block' }} />
          <div style={{
            marginTop: '7px', display: 'flex', alignItems: 'center', gap: '6px',
            fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)',
          }}>
            <span style={{ width: '5px', height: '5px', background: '#E8751A', borderRadius: '50%', flexShrink: 0 }} />
            Admin Console
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '14px 0', overflowY: 'auto' }}>
          {NAV_GROUPS.map(({ label, items }) => (
            <div key={label} style={{ marginBottom: '6px' }}>
              <div style={{
                padding: '8px 20px 5px',
                fontSize: '0.58rem', fontWeight: 700,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.2)',
              }}>
                {label}
              </div>
              {items.map(item => <NavItem key={item.path} {...item} />)}
            </div>
          ))}
        </nav>

        {/* User footer */}
        <div style={{ padding: '14px 20px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <div style={{
              width: '34px', height: '34px', borderRadius: '50%', flexShrink: 0,
              background: 'linear-gradient(135deg, #E8751A 0%, #c9620f 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.68rem', fontWeight: 700, color: '#fff',
              boxShadow: '0 2px 8px rgba(232,117,26,0.35)',
            }}>
              {getInitials(user)}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '0.775rem', color: 'rgba(255,255,255,0.82)', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {user}
              </div>
              <div style={{ fontSize: '0.63rem', color: 'rgba(255,255,255,0.32)', marginTop: '1px' }}>Administrator</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            style={{
              width: '100%', background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.5)',
              padding: '7px 12px', fontSize: '0.75rem',
              cursor: 'pointer', borderRadius: '6px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(220,38,38,0.14)'; e.currentTarget.style.color = '#FCA5A5'; e.currentTarget.style.borderColor = 'rgba(220,38,38,0.28)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
          >
            <i className="bi bi-box-arrow-right" /> Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main content ────────────────────────────────────────────────────── */}
      <div style={{ flex: 1, marginLeft: '248px', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

        {/* Top header bar */}
        <header style={{
          background: '#fff',
          borderBottom: '1px solid #E9ECF0',
          padding: '0 36px',
          height: '58px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          position: 'sticky', top: 0, zIndex: 50,
          boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.72rem', color: '#B0B7C3' }}>Admin</span>
            <i className="bi bi-chevron-right" style={{ fontSize: '0.58rem', color: '#D1D5DB' }} />
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#111827' }}>{pageName}</span>
          </div>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              fontSize: '0.775rem', color: '#6B7280', textDecoration: 'none',
              padding: '5px 12px', borderRadius: '6px',
              border: '1px solid #E5E7EB', transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#0F2B3C'; e.currentTarget.style.borderColor = '#9CA3AF'; e.currentTarget.style.background = '#F9FAFB' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#6B7280'; e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.background = 'transparent' }}
          >
            <i className="bi bi-box-arrow-up-right" style={{ fontSize: '0.68rem' }} />
            View Site
          </a>
        </header>

        <main style={{ flex: 1, padding: '32px 36px' }}>
          {children}
        </main>

        <footer style={{
          padding: '12px 36px', fontSize: '0.72rem', color: '#B0B7C3',
          borderTop: '1px solid #E9ECF0', background: '#fff',
        }}>
          Mugumo Capital Partners Ltd &mdash; Admin Console
        </footer>
      </div>
    </div>
  )
}
