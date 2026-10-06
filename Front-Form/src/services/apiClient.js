const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

function getToken() {
  return localStorage.getItem('token')
}

async function request(method, path, body) {
  const headers = { 'Content-Type': 'application/json' }
  const token = getToken()
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  if (res.status === 401) {
    localStorage.removeItem('token')
    window.dispatchEvent(new Event('auth:expired'))
  }

  const data = res.headers.get('content-type')?.includes('application/json')
    ? await res.json()
    : null

  if (!res.ok) {
    const error = new Error(data?.message || res.statusText)
    error.status = res.status
    error.data = data
    throw error
  }

  return data
}

export const apiClient = {
  get: (path) => request('GET', path),
  post: (path, body) => request('POST', path, body),
  put: (path, body) => request('PUT', path, body),
  patch: (path, body) => request('PATCH', path, body),
  delete: (path) => request('DELETE', path),
}
