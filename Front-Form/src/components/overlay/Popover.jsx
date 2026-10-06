import { useState, useRef, useEffect } from 'react'
import './Popover.css'

export function Popover({ trigger, children, align = 'start', width }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const triggerRef = useRef(null)
  const [pos, setPos] = useState({ top: 0, left: 0 })

  useEffect(() => {
    if (!open) return
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  function toggle() {
    if (!open && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      const top = rect.bottom + 6
      let left = rect.left
      if (align === 'end') left = rect.right
      if (align === 'center') left = rect.left + rect.width / 2
      setPos({ top, left })
    }
    setOpen((v) => !v)
  }

  const alignClass =
    align === 'end' ? 'ui-popover__panel--end' :
    align === 'center' ? 'ui-popover__panel--center' : ''

  return (
    <span className="ui-popover" ref={ref}>
      <span ref={triggerRef} onClick={toggle} className="ui-popover__trigger">
        {trigger}
      </span>
      {open && (
        <div
          className={`ui-popover__panel ${alignClass}`}
          style={{ position: 'fixed', top: pos.top, left: pos.left, ...(width ? { width } : {}) }}
        >
          {children}
        </div>
      )}
    </span>
  )
}
