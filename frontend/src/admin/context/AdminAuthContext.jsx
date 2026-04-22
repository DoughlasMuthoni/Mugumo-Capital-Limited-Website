import { createContext, useContext, useState, useEffect } from 'react'
import { adminApi } from '../api/adminApi'

const AdminAuthContext = createContext(null)

export function AdminAuthProvider({ children }) {
  const [user, setUser]           = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) { setIsLoading(false); return }

    adminApi.verify()
      .then(data => setUser(data.username))
      .catch(() => localStorage.removeItem('adminToken'))
      .finally(() => setIsLoading(false))
  }, [])

  async function login(username, password) {
    const data = await adminApi.login(username, password)
    localStorage.setItem('adminToken', data.token)
    setUser(data.username)
    return data
  }

  async function logout() {
    try { await adminApi.logout() } catch {}
    localStorage.removeItem('adminToken')
    setUser(null)
  }

  return (
    <AdminAuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  return useContext(AdminAuthContext)
}
