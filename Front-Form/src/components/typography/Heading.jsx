import './Heading.css'
import { Bone } from '../feedback/Skeleton'

export function Heading({ as = 'h2', children, loading }) {
  const Tag = as
  if (loading) {
    const h = as === 'h1' ? 32 : as === 'h2' ? 26 : as === 'h3' ? 22 : 18
    return <Tag className={`ui-heading ui-heading--${as}`}><Bone variant="heading" width="50%" height={h} /></Tag>
  }
  return <Tag className={`ui-heading ui-heading--${as}`}>{children}</Tag>
}
