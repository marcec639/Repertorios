import './NavBar.css'

export function NavBar({ items = [], activeItem, onChange }) {
  return (
    <nav className="ui-navbar" aria-label="Main navigation">
      {items.map((item) => (
        <button
          key={item.id}
          className={`ui-navbar__item ${activeItem === item.id ? 'is-active' : ''}`}
          onClick={() => onChange(item.id)}
          type="button"
        >
          {item.label}
        </button>
      ))}
    </nav>
  )
}
