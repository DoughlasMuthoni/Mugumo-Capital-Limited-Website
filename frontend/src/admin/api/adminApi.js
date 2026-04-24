const BASE = import.meta.env.VITE_API_BASE_URL ?? '/api'

function getToken() {
  return localStorage.getItem('adminToken')
}

async function request(path, options = {}) {
  const token = getToken()
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  })
  const json = await res.json()
  if (!res.ok) {
    const err = new Error(json.message || 'Request failed')
    err.status = res.status
    throw err
  }
  return json.data
}

export const adminApi = {
  login:    (username, password) =>
    request('/admin/login', { method: 'POST', body: JSON.stringify({ username, password }) }),
  logout:   () => request('/admin/logout', { method: 'POST' }),
  verify:   () => request('/admin/verify'),

  getStats: () => request('/admin/stats'),

  listInquiries:  (params = {}) =>
    request('/admin/inquiries?' + new URLSearchParams(params).toString()),
  updateInquiry:  (id, data, type = 'contact') =>
    request(`/admin/inquiries/${id}?type=${type}`, { method: 'PATCH', body: JSON.stringify(data) }),
  deleteInquiry:  (id, type = 'contact') =>
    request(`/admin/inquiries/${id}?type=${type}`, { method: 'DELETE' }),

  listTeam:   () => request('/admin/team'),
  createTeam: (data) =>
    request('/admin/team', { method: 'POST', body: JSON.stringify(data) }),
  updateTeam: (id, data) =>
    request(`/admin/team/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteTeam: (id) => request(`/admin/team/${id}`, { method: 'DELETE' }),

  listServices:   () => request('/admin/services'),
  createService:  (data) =>
    request('/admin/services', { method: 'POST', body: JSON.stringify(data) }),
  updateService:  (id, data) =>
    request(`/admin/services/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteService:  (id) => request(`/admin/services/${id}`, { method: 'DELETE' }),

  getSettings:    () => request('/admin/settings'),
  updateSettings: (data) =>
    request('/admin/settings', { method: 'PUT', body: JSON.stringify(data) }),

  uploadPhoto: async (file) => {
    const token = getToken()
    const body  = new FormData()
    body.append('photo', file)
    const res = await fetch(`${BASE}/admin/upload-photo`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body,
    })
    const json = await res.json()
    if (!res.ok) {
      const err = new Error(json.message || 'Upload failed')
      err.status = res.status
      throw err
    }
    return json.data
  },
}
