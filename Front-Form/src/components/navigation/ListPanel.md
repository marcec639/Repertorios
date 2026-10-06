# ListPanel

Sub-sidebar / master-list navigator. Useful for building master–detail layouts
where a secondary panel (list) lives next to a main content area.

## Uso básico (data-driven)

```jsx
import { useState } from 'react'
import { ListPanel, Button, SelectField, Grid } from '@/components'

const plans = [
  {
    id: 'detroit',
    avatar: 'DE',
    title: 'detroit',
    subtitle: '₡40 000 · 7 días',
    status: { label: 'Inactivo', tone: 'warning' },
  },
  {
    id: 'yt',
    avatar: 'ME',
    title: 'membresia youtube',
    subtitle: '₡30 015 · 15 días',
    status: { label: 'Inactivo', tone: 'warning' },
  },
  {
    id: 'regular',
    avatar: 'RE',
    title: 'Regular nuevo',
    subtitle: '$6.03 · 1 mes',
    status: { label: 'Activo', tone: 'success' },
  },
]

export function MembershipsPage() {
  const [selected, setSelected] = useState('detroit')
  const [q, setQ] = useState('')

  const filtered = plans.filter((p) =>
    p.title.toLowerCase().includes(q.toLowerCase())
  )

  return (
    <Grid cols={{ base: 1, md: '320px 1fr' }} gap="lg">
      <ListPanel
        title="Planes"
        meta={`${plans.length} planes`}
        action={<Button size="sm" variant="primary">+ Nuevo</Button>}
        searchValue={q}
        onSearchChange={setQ}
        searchPlaceholder="Buscar plan..."
        filter={
          <SelectField
            value="all"
            options={[
              { value: 'all', label: 'Todos los planes' },
              { value: 'active', label: 'Activos' },
              { value: 'inactive', label: 'Inactivos' },
            ]}
          />
        }
        items={filtered}
        activeId={selected}
        onSelect={(item) => setSelected(item.id)}
        emptyLabel="Sin planes"
      />

      <div>{/* detalle del plan seleccionado */}</div>
    </Grid>
  )
}
```

## Props

| Prop | Tipo | Descripción |
| --- | --- | --- |
| `title` | `ReactNode` | Título del panel. |
| `meta` | `ReactNode` | Texto secundario bajo el título (ej. `"3 planes"`). |
| `action` | `ReactNode` | Slot para botón/acción a la derecha del header. |
| `showSearch` | `boolean` | Muestra/oculta el input de búsqueda. Default `true`. |
| `searchValue` / `onSearchChange` | `string` / `(v) => void` | Control del buscador. |
| `searchPlaceholder` | `string` | Placeholder del buscador. |
| `filter` | `ReactNode` | Slot para filtro (ej. `<SelectField />`). |
| `items` | `Item[]` | Lista de items a renderizar. |
| `activeId` | `string \| number` | Key del item activo. |
| `onSelect` | `(item) => void` | Handler al seleccionar un item. |
| `renderItem` | `(item, ctx) => ReactNode` | Render custom por item. `ctx` = `{ isActive, onSelect }`. |
| `getItemKey` | `(item) => key` | Extrae el key. Default: `item.id ?? item.label`. |
| `emptyLabel` | `ReactNode` | Texto cuando no hay items. |
| `footer` | `ReactNode` | Slot inferior del panel. |
| `children` | `ReactNode` | Si se pasan children, reemplazan la lista de items. |
| `flush` | `boolean` | Sin borde/radio, útil dentro de otro layout. |
| `className` / `bodyClassName` / `style` | — | Escapes para estilos. |

### Forma del item (default renderer)

```ts
{
  id: string | number,
  title: string,            // o label
  subtitle?: string,
  avatar?: string | ReactNode, // iniciales, emoji, URL o nodo
  status?: { label: string, tone?: 'success' | 'warning' | 'info' | 'danger' },
  count?: number,
  trailing?: ReactNode,
}
```

## Uso con contenido libre

Puedes ignorar `items` y pasar cualquier contenido dentro:

```jsx
<ListPanel title="Carpetas" meta="Sin resultados" showSearch={false}>
  <DocumentTree nodes={tree} />
</ListPanel>
```

## Uso con `renderItem`

```jsx
<ListPanel
  title="Coaches"
  items={coaches}
  activeId={current}
  onSelect={(c) => setCurrent(c.id)}
  renderItem={(coach, { isActive, onSelect }) => (
    <button
      className={`ui-list-panel__item ${isActive ? 'is-active' : ''}`}
      onClick={onSelect}
    >
      <img className="ui-list-panel__avatar" src={coach.photo} alt="" />
      <span className="ui-list-panel__item-body">
        <span className="ui-list-panel__item-title">{coach.name}</span>
        <span className="ui-list-panel__item-subtitle">{coach.specialty}</span>
      </span>
    </button>
  )}
/>
```

## Variante `flush`

Para integrarlo como columna dentro de otro layout (sin borde/radio propio):

```jsx
<div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', height: '100%' }}>
  <ListPanel flush title="Planes" items={plans} activeId={id} onSelect={...} />
  <main>{/* detalle */}</main>
</div>
```
