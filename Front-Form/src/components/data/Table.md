# Table

Tabla de datos responsive con filtros por columna y skeleton integrado.

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `columns` | `Array<Column>` | `[]` | Columnas (ver abajo) |
| `rows` | `Array<Object>` | `[]` | Datos. Requiere `id` único por fila |
| `filters` | `Array<FilterCfg>` | — | Filtros externos (alternativa a `column.filter`) |
| `loading` | `boolean` | `false` | Skeleton en filtros, headers y celdas |
| `emptyMessage` | `string` | `'Sin resultados'` | Texto cuando no hay filas |
| `initialFilters` | `Object` | `{}` | Estado inicial `{ [columnKey]: value }` |
| `onFiltersChange` | `(state) => void` | — | Si se define, desactiva filtrado client-side (server-side) |

### Column

```ts
{
  key: string,
  label: string,
  render?: (value, row) => ReactNode,
  align?: 'left' | 'center' | 'right',
  hideOnMobile?: boolean,
  filter?: true | FilterType | FilterCfg,
}
```

### FilterType / FilterCfg

`FilterType`: `'text' | 'number' | 'select' | 'date' | 'time' | 'datetime' | 'daterange'`

`FilterCfg`: `{ type, options?, placeholder?, column? }`
(`column` solo es requerido cuando se pasa vía prop `filters`).

## Responsive

- En ≥ 768px renderiza tabla tradicional con scroll horizontal si hace falta.
- En < 768px cada fila se convierte en una card apilada con `data-label` por celda.
- Las columnas marcadas con `hideOnMobile` se ocultan en móvil.

## Uso

```jsx
const columns = [
  { key: 'name',   label: 'Nombre', filter: 'text' },
  { key: 'role',   label: 'Rol',    filter: { type: 'select', options: [
      { value: 'Admin',  label: 'Admin' },
      { value: 'Editor', label: 'Editor' },
      { value: 'Viewer', label: 'Viewer' },
  ] } },
  { key: 'status', label: 'Estado', filter: 'select', hideOnMobile: true },
  { key: 'joined', label: 'Ingreso', filter: 'daterange' },
]

<Table columns={columns} rows={rows} loading={isLoading} />

// Alternativa con filtros externos
<Table
  columns={columns}
  rows={rows}
  filters={[
    { column: 'name', type: 'text', placeholder: 'Buscar nombre' },
    { column: 'role', type: 'select', options: [...] },
  ]}
  onFiltersChange={(state) => fetch(`/api?filters=${encodeURIComponent(JSON.stringify(state))}`)}
/>
```
