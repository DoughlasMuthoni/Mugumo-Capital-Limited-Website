import { Routes, Route } from 'react-router-dom'
import { AdminAuthProvider } from './context/AdminAuthContext'
import AdminGuardLayout from './layout/AdminGuardLayout'
import AdminLogin      from './pages/AdminLogin'
import AdminDashboard  from './pages/AdminDashboard'
import AdminHomepage   from './pages/AdminHomepage'
import AdminInquiries  from './pages/AdminInquiries'
import AdminTeam       from './pages/AdminTeam'
import AdminServices   from './pages/AdminServices'
import AdminSettings   from './pages/AdminSettings'

export default function AdminApp() {
  return (
    <AdminAuthProvider>
      <Routes>
        <Route path="login" element={<AdminLogin />} />
        <Route element={<AdminGuardLayout />}>
          <Route index            element={<AdminDashboard />} />
          <Route path="homepage"  element={<AdminHomepage />} />
          <Route path="inquiries" element={<AdminInquiries />} />
          <Route path="team"      element={<AdminTeam />} />
          <Route path="services"  element={<AdminServices />} />
          <Route path="settings"  element={<AdminSettings />} />
        </Route>
      </Routes>
    </AdminAuthProvider>
  )
}
