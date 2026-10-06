import './Button.css'
import { Bone } from '../feedback/Skeleton'

export function Button({ children, variant = 'primary', type = 'button', loading, ...props }) {
  return (
    <button type={type} className={`ui-button ui-button--${variant}${loading ? ' ui-button--loading' : ''}`} disabled={loading || props.disabled} {...props}>
      {loading ? <Bone variant="text" width="70%" height={14} /> : children}
    </button>
  )
}
