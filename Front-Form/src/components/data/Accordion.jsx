import { useState } from 'react'
import { Bone } from '../feedback/Skeleton'
import './Accordion.css'

function AccordionItem({ title, children, defaultOpen = false, loading }) {
  const [open, setOpen] = useState(defaultOpen)

  if (loading) {
    return (
      <div className="ui-accordion__item">
        <div className="ui-accordion__trigger" style={{ pointerEvents: 'none' }}>
          <Bone variant="text" width="45%" height={16} />
          <Bone variant="text" width={16} height={16} />
        </div>
      </div>
    )
  }

  return (
    <div className={`ui-accordion__item ${open ? 'is-open' : ''}`}>
      <button
        className="ui-accordion__trigger"
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="ui-accordion__title">{title}</span>
        <span className="ui-accordion__icon">›</span>
      </button>
      <div className="ui-accordion__panel">
        <div className="ui-accordion__panel-inner">
          <div className="ui-accordion__content">{children}</div>
        </div>
      </div>
    </div>
  )
}

export function Accordion({ items = [], children, loading }) {
  if (loading) {
    const count = children ? (Array.isArray(children) ? children.length : 1) : items.length || 4
    return (
      <div className="ui-accordion">
        {Array.from({ length: count }, (_, i) => (
          <AccordionItem key={i} loading title="" />
        ))}
      </div>
    )
  }

  if (children) {
    return <div className="ui-accordion">{children}</div>
  }

  return (
    <div className="ui-accordion">
      {items.map((item, i) => (
        <AccordionItem key={i} title={item.title} defaultOpen={item.defaultOpen}>
          {item.content}
        </AccordionItem>
      ))}
    </div>
  )
}

Accordion.Item = AccordionItem
