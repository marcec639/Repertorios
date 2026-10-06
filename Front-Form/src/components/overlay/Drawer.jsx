import { Button } from '../actions/Button'
import { Bone } from '../feedback/Skeleton'
import './Drawer.css'

export function Drawer({ open, title, children, onClose, loading }) {
  if (!open) return null

  return (
    <aside className="ui-drawer" role="complementary" aria-label={title}>
      <header className="ui-drawer__header">
        {loading ? <Bone variant="heading" width="45%" /> : <h3>{title}</h3>}
        <Button variant="ghost" onClick={onClose}>Close</Button>
      </header>
      <div className="ui-drawer__body">
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <Bone variant="text" width="100%" />
            <Bone variant="text" width="85%" />
            <Bone variant="text" width="70%" />
            <Bone variant="rect" width="100%" height={40} />
          </div>
        ) : children}
      </div>
    </aside>
  )
}
