import { useState, useRef, useEffect } from 'react'
import './Controls.css'

export function SelectField({ options = [], value, defaultValue, onChange, placeholder = 'Seleccionar...', ...props }) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(value ?? defaultValue ?? (options[0]?.value || ''))
  const ref = useRef(null)

  useEffect(() => {
    if (value !== undefined) setSelected(value)
  }, [value])

  useEffect(() => {
    if (!open) return
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  function handleKeyDown(e) {
    if (e.key === 'Escape') setOpen(false)
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setOpen((v) => !v)
    }
  }

  function handleSelect(opt) {
    setSelected(opt.value)
    setOpen(false)
    if (onChange) onChange(opt.value, opt)
  }

  const selectedOption = options.find((o) => o.value === selected)

  return (
    <div className={`ui-select ${open ? 'is-open' : ''}`} ref={ref} {...props}>
      <button
        type="button"
        className="ui-select__trigger"
        onClick={() => setOpen((v) => !v)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={`ui-select__value ${!selectedOption ? 'ui-select__value--placeholder' : ''}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className="ui-select__arrow" />
      </button>
      {open && (
        <ul className="ui-select__menu" role="listbox">
          {options.map((opt) => (
            <li
              key={opt.value}
              className={`ui-select__option ${opt.value === selected ? 'is-selected' : ''}`}
              role="option"
              aria-selected={opt.value === selected}
              onClick={() => handleSelect(opt)}
            >
              <span className="ui-select__option-label">{opt.label}</span>
              {opt.value === selected && <span className="ui-select__check">✓</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
