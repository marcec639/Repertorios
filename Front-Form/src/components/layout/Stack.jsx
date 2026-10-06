import './Stack.css'

export function Stack({ children, gap = 'md' }) {
  return <div className={`ui-stack ui-stack--${gap}`}>{children}</div>
}
