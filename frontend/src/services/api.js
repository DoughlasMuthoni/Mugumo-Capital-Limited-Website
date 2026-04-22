const BASE = import.meta.env.VITE_API_BASE_URL ?? '/api'

export async function getPublicTeam() {
  const res  = await fetch(`${BASE}/team`)
  const json = await res.json()
  if (!res.ok) throw new Error(json.message || 'Failed')
  return json.data
}

export async function getPublicSettings() {
  const res  = await fetch(`${BASE}/public-settings`)
  const json = await res.json()
  if (!res.ok) throw new Error(json.message || 'Failed')
  return json.data
}

export async function submitContactForm(data) {
  const response = await fetch(`${BASE}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const json = await response.json()
  if (!response.ok) {
    const err = new Error(json.message ?? 'Submission failed')
    err.errors = json.errors ?? {}
    throw err
  }
  return json
}

export async function submitPartnerInquiry(data) {
  const response = await fetch(`${BASE}/inquiry`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const json = await response.json()
  if (!response.ok) {
    const err = new Error(json.message ?? 'Submission failed')
    err.errors = json.errors ?? {}
    throw err
  }
  return json
}
