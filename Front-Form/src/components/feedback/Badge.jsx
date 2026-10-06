import './Badge.css'

export function Badge({ children, tone = 'info' }) {
  return <span className={`ui-badge ui-badge--${tone}`}>{children}</span>
}
