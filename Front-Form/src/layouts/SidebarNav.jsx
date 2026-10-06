import { useState, useRef, useEffect } from 'react'
import './SidebarNav.css'

/* ── Regular link item ──────────────────────────────── */
function NavLinkItem({ item }) {
  return (
    <li>
      <button
        className={`ui-sidebar-nav__item ${item.active ? 'is-active' : ''}`}
        type="button"
      >
        {item.icon ? <span className="ui-sidebar-nav__icon">{item.icon}</span> : null}
        <span className="ui-sidebar-nav__label">{item.label}</span>
        {item.count != null ? <span className="ui-sidebar-nav__count">{item.count}</span> : null}
      </button>
    </li>
  )
}

/* ── Expandable item — children appear below ────────── */
function NavExpandItem({ item }) {
  const [open, setOpen] = useState(item.defaultOpen ?? false)

  return (
    <li className="ui-sidebar-nav__expandable">
      <button
        className={`ui-sidebar-nav__item ui-sidebar-nav__item--expandable ${open ? 'is-expanded' : ''} ${item.active ? 'is-active' : ''}`}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {item.icon ? <span className="ui-sidebar-nav__icon">{item.icon}</span> : null}
        <span className="ui-sidebar-nav__label">{item.label}</span>
        <span className="ui-sidebar-nav__expand-indicator">{open ? '−' : '+'}</span>
      </button>
      <div className={`ui-sidebar-nav__expand-panel ${open ? 'is-open' : ''}`}>
        <div className="ui-sidebar-nav__expand-panel-inner">
          <ul className="ui-sidebar-nav__children">
            {item.children.map((child) => (
              <li key={child.label}>
                <button
                  className={`ui-sidebar-nav__child ${child.active ? 'is-active' : ''}`}
                  type="button"
                >
                  {child.icon ? <span className="ui-sidebar-nav__icon">{child.icon}</span> : null}
                  <span className="ui-sidebar-nav__label">{child.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  )
}

/* ── Flyout item — submenu appears to the right ─────── */
function NavFlyoutItem({ item }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const btnRef = useRef(null)
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
    if (!open && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect()
      setPos({ top: rect.top, left: rect.right + 8 })
    }
    setOpen((v) => !v)
  }

  return (
    <li className="ui-sidebar-nav__flyout" ref={ref}>
      <button
        ref={btnRef}
        className={`ui-sidebar-nav__item ui-sidebar-nav__item--flyout ${open ? 'is-expanded' : ''} ${item.active ? 'is-active' : ''}`}
        type="button"
        onClick={toggle}
        aria-expanded={open}
      >
        {item.icon ? <span className="ui-sidebar-nav__icon">{item.icon}</span> : null}
        <span className="ui-sidebar-nav__label">{item.label}</span>
        {item.count != null ? <span className="ui-sidebar-nav__count">{item.count}</span> : null}
        <span className="ui-sidebar-nav__flyout-arrow">›</span>
      </button>
      {open && (
        <div className="ui-sidebar-nav__submenu" style={{ position: 'fixed', top: pos.top, left: pos.left }}>
          <div className="ui-sidebar-nav__submenu-header">
            <span className="ui-sidebar-nav__submenu-title">{item.label}</span>
          </div>
          <ul className="ui-sidebar-nav__submenu-list">
            {item.submenu.map((sub) => (
              <li key={sub.label}>
                <button
                  className={`ui-sidebar-nav__submenu-item ${sub.active ? 'is-active' : ''}`}
                  type="button"
                >
                  {sub.icon ? <span className="ui-sidebar-nav__icon">{sub.icon}</span> : null}
                  <span className="ui-sidebar-nav__label">{sub.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  )
}

/* ── Render the right component per item type ───────── */
function NavItem({ item }) {
  if (item.children) return <NavExpandItem item={item} />
  if (item.submenu) return <NavFlyoutItem item={item} />
  return <NavLinkItem item={item} />
}

/* ── Section wrapper ────────────────────────────────── */
function NavSection({ section }) {
  const [open, setOpen] = useState(section.defaultOpen !== false)

  return (
    <section className="ui-sidebar-nav__section">
      <button
        className="ui-sidebar-nav__title"
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span>{section.title}</span>
        <span className={`ui-sidebar-nav__chevron ${open ? 'is-open' : ''}`}>›</span>
      </button>
      <div className={`ui-sidebar-nav__section-panel ${open ? 'is-open' : ''}`}>
        <div className="ui-sidebar-nav__section-panel-inner">
          <ul className="ui-sidebar-nav__list">
            {section.items.map((item) => (
              <NavItem key={item.label} item={item} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export function SidebarNav({ sections = [] }) {
  return (
    <div className="ui-sidebar-nav">
      {sections.map((section) => (
        <NavSection key={section.title} section={section} />
      ))}
    </div>
  )
}
