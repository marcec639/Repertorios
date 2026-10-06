import './ProgressBar.css'

export function ProgressBar({ value = 0 }) {
  return (
    <div className="ui-progress" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={value}>
      <span className="ui-progress__bar" style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}></span>
    </div>
  )
}
