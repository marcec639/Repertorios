import { Bone } from '../feedback/Skeleton'
import './Field.css'

export function Field({ label, helperText, children, loading }) {
  if (loading) {
    return (
      <div className="ui-field">
        <Bone variant="text" width="30%" height={14} />
        <Bone variant="rect" width="100%" height={38} />
      </div>
    )
  }

  return (
    <label className="ui-field">
      <span className="ui-field__label">{label}</span>
      {children}
      {helperText ? <span className="ui-field__helper">{helperText}</span> : null}
    </label>
  )
}
