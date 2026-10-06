import { useState, useEffect } from 'react'
import './AppLayout.css'

function useIsMobile(breakpoint = 768) {
  const [mobile, setMobile] = useState(() => window.innerWidth <= breakpoint)
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`)
    const handler = (e) => setMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [breakpoint])
  return mobile
}

export function AppLayout({ sidebar, children }) {
  const isMobile = useIsMobile()
  const [collapsed, setCollapsed] = useState(isMobile)

  return (
    <div className={`ui-app ${collapsed ? 'ui-app--collapsed' : ''} ${isMobile ? 'ui-app--mobile' : ''}`}>
      {/* Mobile overlay backdrop */}
      {isMobile && !collapsed && (
        <div className="ui-app__backdrop" onClick={() => setCollapsed(true)} />
      )}
      <aside className={`ui-app__sidebar ${isMobile && collapsed ? 'ui-app--sidebar-hidden' : ''}`}>
        {sidebar}
      </aside>
      <main className="ui-app__main">
        <button
          className="ui-app__collapse-btn"
          type="button"
          onClick={() => setCollapsed((v) => !v)}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <span className="ui-app__collapse-icon" />
        </button>
        {children}
      </main>
    </div>
  )
}
