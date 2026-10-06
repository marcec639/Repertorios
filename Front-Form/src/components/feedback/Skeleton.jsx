import './Skeleton.css'

/**
 * Base skeleton bone — a single animated placeholder block.
 * Use directly for custom compositions, or use compound variants.
 *
 * variant: "text" | "heading" | "circle" | "rect" | "button"
 * Compound: "card" | "stat" | "table" | "avatar-text" | "form"
 */
export function Skeleton({
  variant = 'text',
  width,
  height,
  size,
  lines = 3,
  rows = 5,
  cols = 4,
  animated = true,
  className = '',
}) {
  const cls = [
    'ui-skeleton',
    animated && 'ui-skeleton--animated',
    className,
  ].filter(Boolean).join(' ')

  /* ── Compound variants ─────────────────────────── */

  if (variant === 'card') {
    return (
      <div className={`ui-skeleton-card ${cls}`}>
        <div className="ui-skeleton-card__header">
          <Bone variant="heading" width="45%" />
          <Bone variant="text" width="30%" />
        </div>
        <div className="ui-skeleton-card__body">
          <Bone variant="text" width="100%" />
          <Bone variant="text" width="92%" />
          <Bone variant="text" width="60%" />
        </div>
      </div>
    )
  }

  if (variant === 'card-image') {
    return (
      <div className={`ui-skeleton-card ${cls}`}>
        <Bone variant="rect" height={160} width="100%" />
        <div className="ui-skeleton-card__body">
          <Bone variant="heading" width="60%" />
          <Bone variant="text" width="100%" />
          <Bone variant="text" width="75%" />
        </div>
      </div>
    )
  }

  if (variant === 'stat') {
    return (
      <div className={`ui-skeleton-stat ${cls}`}>
        <Bone variant="text" width="50%" height={12} />
        <Bone variant="heading" width="35%" height={28} />
        <Bone variant="text" width="40%" height={12} />
      </div>
    )
  }

  if (variant === 'table') {
    return (
      <div className={`ui-skeleton-table ${cls}`}>
        <div className="ui-skeleton-table__header">
          {Array.from({ length: cols }, (_, i) => (
            <Bone key={i} variant="text" width="70%" height={12} />
          ))}
        </div>
        {Array.from({ length: rows }, (_, r) => (
          <div key={r} className="ui-skeleton-table__row">
            {Array.from({ length: cols }, (_, c) => (
              <Bone key={c} variant="text" width={`${55 + Math.random() * 35}%`} height={14} />
            ))}
          </div>
        ))}
      </div>
    )
  }

  if (variant === 'avatar-text') {
    return (
      <div className={`ui-skeleton-avatar-text ${cls}`}>
        <Bone variant="circle" size={size || 40} />
        <div className="ui-skeleton-avatar-text__lines">
          <Bone variant="text" width="55%" height={14} />
          <Bone variant="text" width="35%" height={11} />
        </div>
      </div>
    )
  }

  if (variant === 'form') {
    return (
      <div className={`ui-skeleton-form ${cls}`}>
        {Array.from({ length: lines }, (_, i) => (
          <div key={i} className="ui-skeleton-form__field">
            <Bone variant="text" width="25%" height={12} />
            <Bone variant="rect" width="100%" height={38} />
          </div>
        ))}
        <Bone variant="button" width={120} />
      </div>
    )
  }

  if (variant === 'list') {
    return (
      <div className={`ui-skeleton-list ${cls}`}>
        {Array.from({ length: lines }, (_, i) => (
          <div key={i} className="ui-skeleton-list__item">
            <Bone variant="circle" size={32} />
            <div className="ui-skeleton-list__item-text">
              <Bone variant="text" width={`${60 + Math.random() * 30}%`} height={14} />
              <Bone variant="text" width={`${40 + Math.random() * 25}%`} height={11} />
            </div>
          </div>
        ))}
      </div>
    )
  }

  /* ── Primitive: multiple text lines ────────────── */
  if (variant === 'text' && lines > 1) {
    return (
      <div className={`ui-skeleton-lines ${cls}`}>
        {Array.from({ length: lines }, (_, i) => (
          <Bone
            key={i}
            variant="text"
            width={i === lines - 1 ? '60%' : `${85 + Math.random() * 15}%`}
          />
        ))}
      </div>
    )
  }

  /* ── Single bone ───────────────────────────────── */
  return <Bone variant={variant} width={width} height={height} size={size} animated={animated} />
}

/* ── Bone element (exported for use in components) ── */
export function Bone({ variant = 'text', width, height, size, animated = true }) {
  const style = {}

  if (variant === 'circle') {
    const s = size || 40
    style.width = s
    style.height = s
  } else {
    if (width) style.width = typeof width === 'number' ? `${width}px` : width
    if (height) style.height = typeof height === 'number' ? `${height}px` : height
  }

  const cls = [
    'ui-skeleton-bone',
    `ui-skeleton-bone--${variant}`,
    animated !== false && 'ui-skeleton-bone--animated',
  ].filter(Boolean).join(' ')

  return <span className={cls} style={style} />
}
