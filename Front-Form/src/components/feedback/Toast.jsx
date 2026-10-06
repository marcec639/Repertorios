import { useState, useEffect, useCallback, useRef, createContext, useContext } from 'react'
import './Toast.css'

/* ═══════════════════════════════════════════════════════════
   Toast Context — manage toasts globally
   ═══════════════════════════════════════════════════════════ */
const ToastContext = createContext(null)

let _nextId = 1

export function ToastProvider({ children, position = 'top-right' }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((toast) => {
    const id = _nextId++
    setToasts((prev) => [...prev, { id, ...toast }])
    return id
  }, [])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className={`ui-toast-container ui-toast-container--${position}`}>
        {toasts.map((t) => (
          <ToastItem key={t.id} {...t} onDismiss={() => removeToast(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within <ToastProvider>')
  return ctx
}

/* ═══════════════════════════════════════════════════════════
   Toast (standalone — solo componente visual)
   ═══════════════════════════════════════════════════════════
   Props:
     tone      – "info" | "success" | "warning" | "danger"  (default "info")
     icon      – JSX / string / null                        (default: auto by tone)
     title     – string (required)
     children  – body text content
     actions   – [{ label, onClick, variant? }]  botones a la derecha del título
     duration  – ms (0 = persistent, null/undefined = persistent)
     onDismiss – () => void
     dismissible – boolean (show X, default true)
   ═══════════════════════════════════════════════════════════ */

const TONE_ICONS = {
  info: (
    <svg viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM9 9a1 1 0 0 0 0 2v3a1 1 0 0 0 1 1h1a1 1 0 1 0 0-2v-3a1 1 0 0 0-1-1H9z" clipRule="evenodd" />
    </svg>
  ),
  success: (
    <svg viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm3.707-9.293a1 1 0 0 0-1.414-1.414L9 10.586 7.707 9.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4z" clipRule="evenodd" />
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-1-8a1 1 0 0 0-1 1v3a1 1 0 0 0 2 0V6a1 1 0 0 0-1-1z" clipRule="evenodd" />
    </svg>
  ),
  danger: (
    <svg viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM8.707 7.293a1 1 0 0 0-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 1 0 1.414 1.414L10 11.414l1.293 1.293a1 1 0 0 0 1.414-1.414L11.414 10l1.293-1.293a1 1 0 0 0-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
    </svg>
  ),
}

export function Toast({
  tone = 'info',
  icon,
  title,
  children,
  actions,
  duration,
  onDismiss,
  dismissible = true,
}) {
  const [exiting, setExiting] = useState(false)
  const timerRef = useRef(null)

  const handleDismiss = useCallback(() => {
    setExiting(true)
    setTimeout(() => onDismiss?.(), 250)
  }, [onDismiss])

  // Auto-dismiss timer
  useEffect(() => {
    if (!duration || duration <= 0) return
    timerRef.current = setTimeout(handleDismiss, duration)
    return () => clearTimeout(timerRef.current)
  }, [duration, handleDismiss])

  // Pause on hover
  const handleMouseEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
  }
  const handleMouseLeave = () => {
    if (duration && duration > 0) {
      timerRef.current = setTimeout(handleDismiss, duration)
    }
  }

  const resolvedIcon = icon !== undefined ? icon : TONE_ICONS[tone]

  return (
    <div
      className={`ui-toast ui-toast--${tone}${exiting ? ' ui-toast--exit' : ''}`}
      role="status"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {resolvedIcon && (
        <span className="ui-toast__icon">{resolvedIcon}</span>
      )}

      <div className="ui-toast__body">
        <div className="ui-toast__header">
          <span className="ui-toast__title">{title}</span>
          {actions?.length > 0 && (
            <div className="ui-toast__actions">
              {actions.map((a, i) => (
                <button
                  key={i}
                  type="button"
                  className={`ui-toast__action${a.variant === 'primary' ? ' ui-toast__action--primary' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    a.onClick?.()
                  }}
                >
                  {a.label}
                </button>
              ))}
            </div>
          )}
          {dismissible && (
            <button
              type="button"
              className="ui-toast__close"
              onClick={handleDismiss}
              aria-label="Cerrar notificación"
            >
              <svg viewBox="0 0 16 16" fill="currentColor">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </button>
          )}
        </div>
        {children && <div className="ui-toast__content">{children}</div>}
      </div>

      {duration > 0 && <div className="ui-toast__progress" style={{ animationDuration: `${duration}ms` }} />}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   ToastItem — wrapper used inside ToastProvider
   ═══════════════════════════════════════════════════════════ */
function ToastItem({ id, onDismiss, ...props }) {
  return <Toast {...props} onDismiss={onDismiss} />
}
