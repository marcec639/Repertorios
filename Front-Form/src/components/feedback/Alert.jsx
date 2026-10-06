import './Alert.css'

export function Alert({ tone = 'info', title, children }) {
  return (
    <div className={`ui-alert ui-alert--${tone}`} role="alert">
      <strong>{title}</strong>
      <p>{children}</p>
    </div>
  )
}
