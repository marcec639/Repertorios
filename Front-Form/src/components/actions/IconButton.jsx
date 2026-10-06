import './IconButton.css'

export function IconButton({ icon = '+', label, ...props }) {
  return (
    <button className="ui-icon-button" aria-label={label} {...props}>
      {icon}
    </button>
  )
}
