import { useState, useCallback, useEffect, useMemo } from 'react'
import { AuthContext, buildInitialState, decodeToken, isTokenExpired } from '../authSlice'
import { login as loginService } from '../services/authService'

const HAS_API = Boolean(import.meta.env.VITE_API_URL)

export default function AuthProvider({ children }) {
  const [state, setState] = useState(() =>
    HAS_API ? buildInitialState() : { token: null, user: null, isAuthenticated: true }
  )

  /* ── Login ─────────────────────────────────────────── */
  const login = useCallback(async ({ username, password }) => {
    const data = await loginService({ username, password })
    const { token } = data
    const user = decodeToken(token)

    localStorage.setItem('token', token)
    setState({ token, user, isAuthenticated: true })

    return user
  }, [])

  /* ── Logout ────────────────────────────────────────── */
  const logout = useCallback(() => {
    localStorage.removeItem('token')
    setState({ token: null, user: null, isAuthenticated: false })
  }, [])

  /* ── Listen for 401 / expired events from apiClient ── */
  useEffect(() => {
    function handleExpired() {
      logout()
    }
    window.addEventListener('auth:expired', handleExpired)
    return () => window.removeEventListener('auth:expired', handleExpired)
  }, [logout])

  /* ── Auto-check expiration on interval ─────────────── */
  useEffect(() => {
    if (!state.token) return
    const id = setInterval(() => {
      if (isTokenExpired(state.token)) logout()
    }, 60_000) // check every minute
    return () => clearInterval(id)
  }, [state.token, logout])

  const value = {
    ...state,
    login,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
