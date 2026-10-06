import './Section.css'

export function Section({ title, subtitle, children }) {
  return (
    <section className="ui-section">
      {(title || subtitle) && (
        <header className="ui-section__header">
          {title ? <h2 className="ui-section__title">{title}</h2> : null}
          {subtitle ? <p className="ui-section__subtitle">{subtitle}</p> : null}
        </header>
      )}
      <div className="ui-section__body">{children}</div>
    </section>
  )
}
