import './Text.css'
import { Bone } from '../feedback/Skeleton'

export function Text({ children, tone = 'default', loading, ...props }) {
  if (loading) {
    return <p className={`ui-text ui-text--${tone}`} {...props}><Bone variant="text" width="80%" /></p>
  }
  return <p className={`ui-text ui-text--${tone}`} {...props}>{children}</p>
}
