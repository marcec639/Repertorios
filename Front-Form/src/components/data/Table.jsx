import { useMemo, useState } from 'react'
import './Table.css'
import { Bone } from '../feedback/Skeleton'
import { TextInput } from '../form/TextInput'
import { SelectField } from '../form/SelectField'

/**
 * Table
 * -----
 * columns: [{ key, label, render?, align?, hideOnMobile?, filter? }]
 *   filter:
 *     - true
 *     - 'text' | 'number' | 'date' | 'time' | 'datetime' | 'daterange' | 'select'
 *     - { type, options?, placeholder? }
 * rows: [{ id, ... }]
 * filters: [{ column, type, options?, placeholder? }]   // alt. externa
 * loading, emptyMessage, onFiltersChange, initialFilters
 */
export function Table({
  columns = [],
  rows = [],
  filters,
  loading = false,
  emptyMessage = 'Sin resultados',
  onFiltersChange,
  initialFilters = {},
}) {
  const filterConfigs = useMemo(() => {
    const map = new Map()
    columns.forEach((col) => {
      if (col.filter) {
        const cfg = normalizeFilter(col.filter)
        map.set(col.key, { ...cfg, column: col.key, label: col.label })
      }
    })
    ;(filters || []).forEach((f) => {
      const cfg = normalizeFilter(f)
      const col = columns.find((c) => c.key === f.column)
      map.set(f.column, { ...cfg, column: f.column, label: col?.label ?? f.column })
    })
    return Array.from(map.values())
  }, [columns, filters])

  const [filterState, setFilterState] = useState(initialFilters)

  const updateFilter = (key, value) => {
    const next = { ...filterState, [key]: value }
    Object.keys(next).forEach((k) => {
      const v = next[k]
      if (v === '' || v == null || (typeof v === 'object' && !v.from && !v.to)) delete next[k]
    })
    setFilterState(next)
    if (onFiltersChange) onFiltersChange(next)
  }

  const clearFilters = () => {
    setFilterState({})
    if (onFiltersChange) onFiltersChange({})
  }

  const visibleRows = useMemo(() => {
    if (onFiltersChange) return rows
    if (!Object.keys(filterState).length) return rows
    return rows.filter((row) =>
      filterConfigs.every((cfg) => matchesFilter(row[cfg.column], filterState[cfg.column], cfg.type))
    )
  }, [rows, filterState, filterConfigs, onFiltersChange])

  const hasFilters = filterConfigs.length > 0
  const activeCount = Object.keys(filterState).length

  const cellClass = (col) => [
    col.align ? `ui-table__cell--${col.align}` : '',
    col.hideOnMobile ? 'ui-table__cell--hide-mobile' : '',
  ].filter(Boolean).join(' ')

  return (
    <div className="ui-table-root">
      {hasFilters && (
        <div className="ui-table-filters">
          {filterConfigs.map((cfg) => (
            <div key={cfg.column} className="ui-table-filters__item">
              <label className="ui-table-filters__label">{cfg.label}</label>
              {loading ? (
                <Bone variant="rect" width="100%" height={32} />
              ) : (
                <FilterControl
                  cfg={cfg}
                  value={filterState[cfg.column]}
                  onChange={(v) => updateFilter(cfg.column, v)}
                />
              )}
            </div>
          ))}
          {activeCount > 0 && !loading && (
            <button type="button" className="ui-table-filters__clear" onClick={clearFilters}>
              Limpiar ({activeCount})
            </button>
          )}
        </div>
      )}

      <div className="ui-table-wrap">
        <table className="ui-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key} className={cellClass(col)}>
                  {loading ? <Bone variant="text" width="70%" height={12} /> : col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: rows.length || 5 }, (_, r) => (
                <tr key={`sk-${r}`}>
                  {columns.map((col, c) => (
                    <td key={col.key} data-label={col.label} className={cellClass(col)}>
                      <Bone variant="text" width={`${55 + (r * 7 + c * 13) % 35}%`} height={14} />
                    </td>
                  ))}
                </tr>
              ))
            ) : visibleRows.length === 0 ? (
              <tr>
                <td className="ui-table__empty" colSpan={columns.length}>{emptyMessage}</td>
              </tr>
            ) : (
              visibleRows.map((row) => (
                <tr key={row.id}>
                  {columns.map((col) => (
                    <td key={col.key} data-label={col.label} className={cellClass(col)}>
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ── Helpers ─────────────────────────────────────────────────

function normalizeFilter(filter) {
  if (filter === true) return { type: 'text' }
  if (typeof filter === 'string') return { type: filter }
  return { type: 'text', ...filter }
}

function FilterControl({ cfg, value, onChange }) {
  const { type, options, placeholder } = cfg

  if (type === 'select') {
    return (
      <SelectField
        options={[{ value: '', label: placeholder || 'Todos' }, ...(options || [])]}
        value={value ?? ''}
        onChange={(v) => onChange(v)}
        placeholder={placeholder || 'Todos'}
      />
    )
  }

  if (type === 'daterange') {
    const v = value || {}
    return (
      <div className="ui-table-filters__range">
        <input
          type="date"
          className="ui-control"
          value={v.from || ''}
          onChange={(e) => onChange({ ...v, from: e.target.value })}
        />
        <span className="ui-table-filters__range-sep">—</span>
        <input
          type="date"
          className="ui-control"
          value={v.to || ''}
          onChange={(e) => onChange({ ...v, to: e.target.value })}
        />
      </div>
    )
  }

  const inputType =
    type === 'date' ? 'date'
    : type === 'time' ? 'time'
    : type === 'datetime' ? 'datetime-local'
    : type === 'number' ? 'number'
    : 'text'

  return (
    <TextInput
      type={inputType}
      value={value ?? ''}
      placeholder={placeholder || 'Buscar...'}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

function matchesFilter(cellValue, filterValue, type) {
  if (filterValue == null || filterValue === '') return true

  if (type === 'select') {
    return String(cellValue) === String(filterValue)
  }
  if (type === 'number') {
    if (cellValue == null) return false
    return Number(cellValue) === Number(filterValue)
  }
  if (type === 'date' || type === 'datetime' || type === 'time') {
    return String(cellValue) === String(filterValue)
  }
  if (type === 'daterange') {
    const { from, to } = filterValue
    if (!cellValue) return false
    const cell = new Date(cellValue).getTime()
    if (Number.isNaN(cell)) return false
    if (from && cell < new Date(from).getTime()) return false
    if (to && cell > new Date(to).getTime() + 86_399_000) return false
    return true
  }
  return String(cellValue ?? '').toLowerCase().includes(String(filterValue).toLowerCase())
}
