import { Navigate, Outlet } from 'react-router-dom'
import { useAdminAuth } from '../context/AdminAuthContext'
import AdminLayout from './AdminLayout'

export default function AdminGuardLayout() {
  const { user, isLoading } = useAdminAuth()

  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh', background: '#0F2B3C',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem' }}>
          <i className="bi bi-arrow-repeat" style={{ marginRight: '8px' }} />
          Loading...
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />
  }

  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  )
}
