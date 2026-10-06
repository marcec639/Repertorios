import { Bone } from '../feedback/Skeleton'
import './SwitchField.css'

export function SwitchField({ label, checked, onChange, loading }) {
  if (loading) {
    return (
      <div className="ui-switch" style={{ pointerEvents: 'none' }}>
        <Bone variant="rect" width={44} height={24} />
        <Bone variant="text" width={120} height={14} />
      </div>
    )
  }

  return (
    <label className="ui-switch">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="ui-switch__track" aria-hidden="true"></span>
      <span>{label}</span>
    </label>
  )
}
