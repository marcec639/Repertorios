import './Card.css'
import { Bone } from '../feedback/Skeleton'

export function Card({ title, subtitle, headerActions, children, footer, padding = true, cover, loading }) {
  const hasHeader = title || headerActions

  if (loading) {
    return (
      <article className="ui-card">
        {cover && <div className="ui-card__cover"><Bone variant="rect" width="100%" height={180} /></div>}
        {hasHeader && (
          <div className="ui-card__header">
            <div className="ui-card__header-text">
              {title && <Bone variant="heading" width="55%" />}
              {subtitle && <Bone variant="text" width="35%" height={11} />}
            </div>
          </div>
        )}
        <div className={`ui-card__body ${!padding ? 'ui-card__body--flush' : ''}`}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
            <Bone variant="text" width="100%" />
            <Bone variant="text" width="90%" />
            <Bone variant="text" width="60%" />
          </div>
        </div>
        {footer && (
          <div className="ui-card__footer">
            <Bone variant="text" width="40%" height={12} />
          </div>
        )}
      </article>
    )
  }

  return (
    <article className="ui-card">
      {cover && (
        <div className="ui-card__cover">
          {typeof cover === 'string' ? <img src={cover} alt="" className="ui-card__cover-img" /> : cover}
        </div>
      )}
      {hasHeader && (
        <div className="ui-card__header">
          <div className="ui-card__header-text">
            {title && <h3 className="ui-card__title">{title}</h3>}
            {subtitle && <p className="ui-card__subtitle">{subtitle}</p>}
          </div>
          {headerActions && <div className="ui-card__header-actions">{headerActions}</div>}
        </div>
      )}
      <div className={`ui-card__body ${!padding ? 'ui-card__body--flush' : ''}`}>{children}</div>
      {footer && <div className="ui-card__footer">{footer}</div>}
    </article>
  )
}
