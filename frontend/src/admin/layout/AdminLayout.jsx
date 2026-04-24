import { NavLink, useNavigate } from 'react-router-dom'
import { useAdminAuth } from '../context/AdminAuthContext'
import logo from '../../assets/images/logo-removebg.png'

const NAV = [
  { path: '/admin',           label: 'Dashboard',  icon: 'bi-speedometer2',  exact: true },
  { path: '/admin/inquiries', label: 'Inquiries',  icon: 'bi-envelope-fill' },
  { path: '/admin/team',      label: 'Team',       icon: 'bi-people-fill' },
  { path: '/admin/services',  label: 'Services',   icon: 'bi-grid-fill' },
  { path: '/admin/settings',  label: 'Settings',   icon: 'bi-gear-fill' },
]

export default function AdminLayout({ children }) {
  const { user, logout } = useAdminAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/admin/login')
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F0F2F5', fontFamily: 'system-ui, -apple-system, sans-serif' }}>

      {/* Sidebar */}
      <aside style={{
        width: '240px', flexShrink: 0,
        background: '#0F2B3C',
        display: 'flex', flexDirection: 'column',
        position: 'fixed', top: 0, left: 0, bottom: 0,
        zIndex: 100,
      }}>
        <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <img src={logo} alt="Mugumo Capital" style={{ height: '38px', width: 'auto', filter: 'brightness(0) invert(1)' }} />
          <div style={{ fontSize: '0.62rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginTop: '8px' }}>
            Admin Console
          </div>
        </div>

        <nav style={{ flex: 1, padding: '12px 0' }}>
          {NAV.map(({ path, label, icon, exact }) => (
            <NavLink
              key={path}
              to={path}
              end={exact}
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '11px 20px',
                color: isActive ? '#fff' : 'rgba(255,255,255,0.55)',
                background: isActive ? 'rgba(232,117,26,0.15)' : 'transparent',
                borderLeft: isActive ? '3px solid #E8751A' : '3px solid transparent',
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: isActive ? 600 : 400,
                transition: 'all 0.15s ease',
              })}
            >
              <i className={`bi ${icon}`} style={{ fontSize: '1rem', flexShrink: 0 }} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.45)', marginBottom: '10px' }}>
            Signed in as <strong style={{ color: 'rgba(255,255,255,0.8)' }}>{user}</strong>
          </div>
          <button
            onClick={handleLogout}
            style={{
              width: '100%', background: 'none',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'rgba(255,255,255,0.65)',
              padding: '7px 12px', fontSize: '0.78rem',
              cursor: 'pointer', borderRadius: '5px',
              display: 'flex', alignItems: 'center', gap: '8px',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'rgba(255,255,255,0.65)' }}
          >
            <i className="bi bi-box-arrow-right" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Content area */}
      <div style={{ flex: 1, marginLeft: '240px', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <main style={{ flex: 1, padding: '32px 36px' }}>
          {children}
        </main>
        <div style={{ padding: '14px 36px', fontSize: '0.75rem', color: '#9CA3AF', borderTop: '1px solid #E5E9EE' }}>
          Mugumo Capital Partners Ltd &mdash; Admin Console
        </div>
      </div>
    </div>
  )
}
