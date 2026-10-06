import './Stat.css'
import { Bone } from '../feedback/Skeleton'

export function Stat({ label, value, change, size, loading }) {
  if (loading) {
    return (
      <div className={`ui-stat${size ? ` ui-stat--${size}` : ''}`}>
        <Bone variant="text" width="50%" height={12} />
        <div className="ui-stat__row">
          <Bone variant="heading" width="35%" height={28} />
        </div>
        {change !== undefined && <Bone variant="text" width="40%" height={12} />}
      </div>
    )
  }

  const tone = change && change.startsWith('-') ? 'down' : 'up'

  return (
    <div className={`ui-stat${size ? ` ui-stat--${size}` : ''}`}>
      <span className="ui-stat__label">{label}</span>
      <div className="ui-stat__row">
        <strong className="ui-stat__value">{value}</strong>
        {change ? <span className={`ui-stat__change ui-stat__change--${tone}`}>{change}</span> : null}
      </div>
    </div>
  )
}
