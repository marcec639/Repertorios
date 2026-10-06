import { createContext } from 'react'

export const AuthContext = createContext(null)

/* ── JWT helpers (no library needed) ─────────────────── */

/** Decode a JWT payload without verifying signature */
export function decodeToken(token) {
  try {
    const base64 = token.split('.')[1]
    const json = atob(base64.replace(/-/g, '+').replace(/_/g, '/'))
    return JSON.parse(json)
  } catch {
    return null
  }
}

/** Check if token is expired (exp claim in seconds) */
export function isTokenExpired(token) {
  const payload = decodeToken(token)
  if (!payload?.exp) return true
  return Date.now() >= payload.exp * 1000
}

/* ── Initial state builder ───────────────────────────── */

export function buildInitialState() {
  const token = localStorage.getItem('token')
  if (token && !isTokenExpired(token)) {
    const payload = decodeToken(token)
    return {
      token,
      user: payload,
      isAuthenticated: true,
    }
  }
  localStorage.removeItem('token')
  return { token: null, user: null, isAuthenticated: false }
}
