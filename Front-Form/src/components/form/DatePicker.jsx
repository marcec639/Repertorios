import { useState, useRef, useEffect, useMemo } from 'react'
import { Bone } from '../feedback/Skeleton'
import { cn } from '../../utils/cn'
import './Controls.css'
import './DatePicker.css'

/* ── Helpers ─────────────────────────────────────────── */
const MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
]
const WEEKDAYS = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do']

function pad(n) { return String(n).padStart(2, '0') }

function toISO(d) {
  if (!d) return ''
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

function parseISO(value) {
  if (!value) return null
  if (value instanceof Date) return isNaN(value) ? null : value
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(value)
  if (!m) return null
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]))
  return isNaN(d) ? null : d
}

function formatDisplay(d, format = 'dd/MM/yyyy') {
  if (!d) return ''
  const map = {
    dd: pad(d.getDate()),
    MM: pad(d.getMonth() + 1),
    yyyy: String(d.getFullYear()),
  }
  return format.replace(/dd|MM|yyyy/g, (t) => map[t])
}

function isSameDay(a, b) {
  if (!a || !b) return false
  return a.getFullYear() === b.getFullYear()
    && a.getMonth() === b.getMonth()
    && a.getDate() === b.getDate()
}

function startOfMonth(d) { return new Date(d.getFullYear(), d.getMonth(), 1) }

/** Build a 6x7 grid of days for the month cursor is on. */
function buildCalendar(cursor) {
  const first = startOfMonth(cursor)
  // Shift so Monday = 0
  const offset = (first.getDay() + 6) % 7
  const start = new Date(first)
  start.setDate(1 - offset)
  const days = []
  for (let i = 0; i < 42; i++) {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    days.push(d)
  }
  return days
}

/* ═══════════════════════════════════════════════════════
   DatePicker
   ═══════════════════════════════════════════════════════ */
export function DatePicker({
  value,
  defaultValue,
  onChange,
  placeholder = 'Seleccionar fecha',
  format = 'dd/MM/yyyy',
  min,
  max,
  disabled = false,
  loading = false,
  clearable = true,
  className,
  ...rest
}) {
  const isControlled = value !== undefined
  const [internal, setInternal] = useState(() => parseISO(defaultValue))
  const current = isControlled ? parseISO(value) : internal

  const [open, setOpen] = useState(false)
  const [cursor, setCursor] = useState(() => current ?? new Date())
  const ref = useRef(null)

  useEffect(() => {
    if (current) setCursor(current)
  }, [current?.getTime()]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!open) return
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    function handleKey(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [open])

  const minDate = useMemo(() => parseISO(min), [min])
  const maxDate = useMemo(() => parseISO(max), [max])

  function isDisabledDay(d) {
    if (minDate && d < stripTime(minDate)) return true
    if (maxDate && d > stripTime(maxDate)) return true
    return false
  }

  function commit(d) {
    if (!isControlled) setInternal(d)
    if (onChange) onChange(d ? toISO(d) : '', d)
  }

  function handleSelect(d) {
    if (isDisabledDay(d)) return
    commit(d)
    setOpen(false)
  }

  function handleClear(e) {
    e.stopPropagation()
    commit(null)
  }

  function prevMonth() { setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1)) }
  function nextMonth() { setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1)) }
  function goToday() {
    const now = new Date()
    setCursor(now)
    handleSelect(now)
  }

  const days = useMemo(() => buildCalendar(cursor), [cursor])
  const today = new Date()
  const displayValue = current ? formatDisplay(current, format) : ''

  /* ── Skeleton loading state ────────────────────────── */
  if (loading) {
    return <Bone variant="rect" width="100%" height={38} />
  }

  return (
    <div
      ref={ref}
      className={cn('ui-datepicker', open && 'is-open', disabled && 'is-disabled', className)}
      {...rest}
    >
      <button
        type="button"
        className="ui-datepicker__trigger"
        onClick={() => !disabled && setOpen((v) => !v)}
        disabled={disabled}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span className="ui-datepicker__icon" aria-hidden>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="4.5" width="18" height="16.5" rx="2" />
            <path d="M3 9h18" />
            <path d="M8 2.5v4" />
            <path d="M16 2.5v4" />
          </svg>
        </span>
        <span className={cn('ui-datepicker__value', !displayValue && 'ui-datepicker__value--placeholder')}>
          {displayValue || placeholder}
        </span>
        {clearable && current && !disabled ? (
          <span
            className="ui-datepicker__clear"
            role="button"
            aria-label="Limpiar fecha"
            onClick={handleClear}
          >
            ×
          </span>
        ) : null}
      </button>

      {open && (
        <div className="ui-datepicker__panel" role="dialog">
          <div className="ui-datepicker__header">
            <button
              type="button"
              className="ui-datepicker__nav"
              onClick={prevMonth}
              aria-label="Mes anterior"
            >
              ‹
            </button>
            <div className="ui-datepicker__title">
              {MONTHS[cursor.getMonth()]} {cursor.getFullYear()}
            </div>
            <button
              type="button"
              className="ui-datepicker__nav"
              onClick={nextMonth}
              aria-label="Mes siguiente"
            >
              ›
            </button>
          </div>

          <div className="ui-datepicker__weekdays">
            {WEEKDAYS.map((w) => (
              <span key={w} className="ui-datepicker__weekday">{w}</span>
            ))}
          </div>

          <div className="ui-datepicker__grid">
            {days.map((d) => {
              const outside = d.getMonth() !== cursor.getMonth()
              const selected = isSameDay(d, current)
              const isToday = isSameDay(d, today)
              const dis = isDisabledDay(d)
              return (
                <button
                  key={d.getTime()}
                  type="button"
                  disabled={dis}
                  onClick={() => handleSelect(d)}
                  className={cn(
                    'ui-datepicker__day',
                    outside && 'is-outside',
                    selected && 'is-selected',
                    isToday && !selected && 'is-today',
                    dis && 'is-disabled',
                  )}
                >
                  {d.getDate()}
                </button>
              )
            })}
          </div>

          <div className="ui-datepicker__footer">
            <button type="button" className="ui-datepicker__link" onClick={goToday}>
              Hoy
            </button>
            {clearable ? (
              <button
                type="button"
                className="ui-datepicker__link"
                onClick={() => { commit(null); setOpen(false) }}
              >
                Limpiar
              </button>
            ) : null}
          </div>
        </div>
      )}
    </div>
  )
}

function stripTime(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}
