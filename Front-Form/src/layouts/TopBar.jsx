import { Button } from '../components/actions/Button'
import './TopBar.css'

export function TopBar({ title, subtitle, onOpenDrawer }) {
  return (
    <div className="ui-topbar">
      <div className="ui-topbar__intro">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      <div className="ui-topbar__actions">
        <input className="ui-topbar__search" placeholder="Search" />
        <Button variant="secondary" onClick={onOpenDrawer}>Panel</Button>
      </div>
    </div>
  )
}
