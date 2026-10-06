import { useState } from 'react'
import {
  Button,
  CheckboxField,
  Field,
  Heading,
  Stack,
  Text,
  TextInput,
} from '../../../components'
import { useAuth } from '../hooks/useAuth'
import './LoginPage.css'

export default function LoginPage() {
  const { login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login({ username, password })
    } catch (err) {
      setError(err?.data?.message || err.message || 'Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      {/* ── Left · Branding panel ──────────────────── */}
      <div className="login-page__brand">
        <img
          className="login-page__brand-bg"
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=1600&fit=crop"
          alt=""
          aria-hidden="true"
        />
        <div className="login-page__brand-content">
          <div className="login-page__logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" transform="rotate(45 12 12)"/></svg>
          </div>
          <Heading as="h1" className="login-page__brand-title">
            <span className="login-page__brand-highlight">Element</span>System
          </Heading>
          <Text className="login-page__brand-tagline">
            Gestiona tus proyectos, equipos y flujos de trabajo desde un solo lugar.
          </Text>

          {/*<div className="login-page__features">
            <div className="login-page__feature">
              <span className="login-page__feature-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              </span>
              <div>
                <Text className="login-page__feature-title">Rápido y eficiente</Text>
                <Text className="login-page__feature-desc">Diseñado para equipos que mueven rápido.</Text>
              </div>
            </div>
            <div className="login-page__feature">
              <span className="login-page__feature-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </span>
              <div>
                <Text className="login-page__feature-title">Seguro por defecto</Text>
                <Text className="login-page__feature-desc">Encriptación end-to-end en cada nivel.</Text>
              </div>
            </div>
            <div className="login-page__feature">
              <span className="login-page__feature-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
              </span>
              <div>
                <Text className="login-page__feature-title">Analytics integrado</Text>
                <Text className="login-page__feature-desc">Métricas en tiempo real sin configuración.</Text>
              </div>
            </div>
          </div>*/}
        </div>

        <Text className="login-page__brand-footer">
          © 2026 ElementSystem. Todos los derechos reservados.
        </Text>
      </div>

      {/* ── Right · Login form ─────────────────────── */}
      <div className="login-page__form-side">
        <div className="login-page__form-wrapper">
          <div className="login-page__form-header">
            <Heading as="h2">Bienvenido de vuelta</Heading>
            <Text tone="muted">Ingresá tus credenciales para acceder a tu cuenta.</Text>
          </div>

          <form onSubmit={handleSubmit} className="login-page__form">
            <Stack>
              {error && (
                <div className="login-page__error">{error}</div>
              )}
              <Field label="Usuario o email" loading={loading}>
                <TextInput
                  type="text"
                  placeholder="usuario o tu@empresa.com"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  required
                />
              </Field>
              <Field label="Contraseña" loading={loading}>
                <TextInput
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Field>

              <div className="login-page__form-options">
                <CheckboxField
                  label="Recordarme"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  loading={loading}
                />
                <a href="#" className="login-page__forgot">¿Olvidaste tu contraseña?</a>
              </div>

              <Button type="submit" loading={loading}>
                Iniciar sesión
              </Button>
            </Stack>
          </form>

          <Text tone="muted" className="login-page__signup">
            ¿No tenés cuenta?{' '}
            <a href="#" className="login-page__link">Crear cuenta</a>
          </Text>
        </div>
      </div>
    </div>
  )
}
