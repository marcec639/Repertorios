import './SideRail.css'

export function SideRail({ items = [], footer = [] }) {
  return (
    <div className="ui-side-rail">
      <div className="ui-side-rail__group">
        {items.map((item) => (
          <button key={item.id} className={`ui-side-rail__item ${item.active ? 'is-active' : ''}`} type="button" aria-label={item.label}>
            <span>{item.icon}</span>
          </button>
        ))}
      </div>
      <div className="ui-side-rail__group">
        {footer.map((item) => (
          <button key={item.id} className="ui-side-rail__item" type="button" aria-label={item.label}>
            <span>{item.icon}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
