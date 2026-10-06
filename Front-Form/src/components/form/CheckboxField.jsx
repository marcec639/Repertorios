import { Bone } from '../feedback/Skeleton'
import './Checks.css'

export function CheckboxField({ label, loading, ...props }) {
  if (loading) {
    return (
      <div className="ui-check" style={{ pointerEvents: 'none' }}>
        <Bone variant="rect" width={18} height={18} />
        <Bone variant="text" width={100} height={14} />
      </div>
    )
  }

  return (
    <label className="ui-check">
      <input type="checkbox" {...props} />
      <span>{label}</span>
    </label>
  )
}
