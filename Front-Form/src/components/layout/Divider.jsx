import './Divider.css'

export function Divider({ label }) {
  return (
    <div className="ui-divider" role="separator" aria-label={label}>
      {label ? <span className="ui-divider__label">{label}</span> : null}
    </div>
  )
}
