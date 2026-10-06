import { TextInput } from '../form/TextInput'
import { Badge } from '../feedback/Badge'
import { cn } from '../../utils/cn'
import './ListPanel.css'

/**
 * ListPanel — Sub-sidebar / master list navigator
 *
 * Composable panel that mimics a secondary sidebar: header with title, meta
 * and action slot, optional search and filter toolbar, and a selectable list
 * of items with active state. Also supports arbitrary children for fully
 * custom content in the body.
 */
export function ListPanel({
  title,
  meta,
  action,

  // Toolbar
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Buscar...',
  showSearch = true,
  filter,

  // Items (data-driven)
  items,
  activeId,
  onSelect,
  renderItem,
  getItemKey = (item) => item.id ?? item.label,
  emptyLabel = 'Sin resultados',

  // Extra slots
  footer,
  children,

  // Styling
  flush = false,
  className,
  bodyClassName,
  style,
}) {
  const hasToolbar = showSearch || filter

  return (
    <aside
      className={cn('ui-list-panel', flush && 'ui-list-panel--flush', className)}
      style={style}
    >
      {(title || action || meta) && (
        <header className="ui-list-panel__header">
          <div className="ui-list-panel__titles">
            {title ? <span className="ui-list-panel__title">{title}</span> : null}
            {meta ? <span className="ui-list-panel__meta">{meta}</span> : null}
          </div>
          {action ? <div className="ui-list-panel__action">{action}</div> : null}
        </header>
      )}

      {hasToolbar && (
        <div className="ui-list-panel__toolbar">
          {showSearch && onSearchChange ? (
            <TextInput
              type="search"
              value={searchValue ?? ''}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={searchPlaceholder}
            />
          ) : null}
          {filter ? <div className="ui-list-panel__filter">{filter}</div> : null}
        </div>
      )}

      <div className={cn('ui-list-panel__body', bodyClassName)}>
        {children ? (
          children
        ) : items && items.length > 0 ? (
          <ul className="ui-list-panel__list">
            {items.map((item) => {
              const key = getItemKey(item)
              const isActive = activeId != null && key === activeId
              return (
                <li key={key}>
                  {renderItem ? (
                    renderItem(item, { isActive, onSelect: () => onSelect?.(item) })
                  ) : (
                    <DefaultItem
                      item={item}
                      isActive={isActive}
                      onClick={() => onSelect?.(item)}
                    />
                  )}
                </li>
              )
            })}
          </ul>
        ) : (
          <div className="ui-list-panel__empty">{emptyLabel}</div>
        )}
      </div>

      {footer ? <div className="ui-list-panel__footer">{footer}</div> : null}
    </aside>
  )
}

/* ── Default item renderer ────────────────────────────── */
function DefaultItem({ item, isActive, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn('ui-list-panel__item', isActive && 'is-active')}
    >
      {item.avatar !== undefined ? (
        <span className="ui-list-panel__avatar">
          {typeof item.avatar === 'string' && /^https?:|^\//.test(item.avatar) ? (
            <img src={item.avatar} alt="" />
          ) : (
            item.avatar
          )}
        </span>
      ) : null}

      <span className="ui-list-panel__item-body">
        <span className="ui-list-panel__item-title">{item.title ?? item.label}</span>
        {item.subtitle ? (
          <span className="ui-list-panel__item-subtitle">{item.subtitle}</span>
        ) : null}
        {item.status ? (
          <span className="ui-list-panel__item-footer">
            <Badge tone={item.status.tone ?? 'info'}>{item.status.label}</Badge>
          </span>
        ) : null}
      </span>

      {(item.trailing || item.count != null) && (
        <span className="ui-list-panel__trailing">
          {item.count != null ? <span>{item.count}</span> : null}
          {item.trailing ?? null}
        </span>
      )}
    </button>
  )
}
