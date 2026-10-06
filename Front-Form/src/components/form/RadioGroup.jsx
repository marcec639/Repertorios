import { Bone } from '../feedback/Skeleton'
import './Checks.css'

export function RadioGroup({ name, options = [], loading }) {
  if (loading) {
    return (
      <div className="ui-radio-group" style={{ pointerEvents: 'none' }}>
        {options.map((_, i) => (
          <div className="ui-check" key={i}>
            <Bone variant="circle" size={18} />
            <Bone variant="text" width={90} height={14} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="ui-radio-group" role="radiogroup" aria-label={name}>
      {options.map((option) => (
        <label className="ui-check" key={option.value}>
          <input type="radio" name={name} value={option.value} defaultChecked={option.checked} />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  )
}
