import { Button } from '../actions/Button'
import './Modal.css'

export function Modal({ open, title, children, onClose }) {
  if (!open) return null

  return (
    <div className="ui-modal-backdrop" role="dialog" aria-modal="true" aria-label={title}>
      <div className="ui-modal">
        <header className="ui-modal__header">
          <h3>{title}</h3>
          <Button variant="ghost" onClick={onClose}>Close</Button>
        </header>
        <div className="ui-modal__body">{children}</div>
      </div>
    </div>
  )
}
