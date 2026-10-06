import './Breadcrumbs.css'

export function Breadcrumbs({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" className="ui-breadcrumbs">
      {items.map((item, index) => (
        <span key={item.label} className="ui-breadcrumbs__item">
          {index > 0 ? <span className="ui-breadcrumbs__sep">/</span> : null}
          {item.href ? <a href={item.href}>{item.label}</a> : <strong>{item.label}</strong>}
        </span>
      ))}
    </nav>
  )
}
