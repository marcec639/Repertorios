import './Grid.css'

export function Grid({ children, columns = 2, style }) {
  return (
    <div className="ui-grid" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`, ...style }}>
      {children}
    </div>
  )
}
