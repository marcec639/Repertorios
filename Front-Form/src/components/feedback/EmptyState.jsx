import { Button } from '../actions/Button'
import './EmptyState.css'

export function EmptyState({ title, message, actionLabel, onAction }) {
  return (
    <div className="ui-empty-state">
      <h3>{title}</h3>
      <p>{message}</p>
      {actionLabel ? <Button onClick={onAction}>{actionLabel}</Button> : null}
    </div>
  )
}
