# Grid

Layout de cuadrícula con columnas configurables.

## Qué es

Un contenedor de CSS Grid que distribuye sus hijos en un número configurable de columnas de igual tamaño.

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Elementos de la grid |
| `columns` | `number` | `2` | Número de columnas |
| `style` | `object` | — | Estilos adicionales (se mezclan con el grid inline style) |

## Cómo funciona

- Renderiza un `<div class="ui-grid">` con `gridTemplateColumns: repeat({columns}, minmax(0, 1fr))` inline
- Usa `minmax(0, 1fr)` para que las columnas no crezcan más allá del espacio disponible
- Los estilos adicionales via `style` se aplican después, permitiendo sobreescribir gap u otras propiedades

## Uso

```jsx
import { Grid } from '@/components'

<Grid columns={3}>
  <Card title="A" />
  <Card title="B" />
  <Card title="C" />
</Grid>

<Grid columns={2} style={{ gap: 'var(--space-xl)' }}>
  <div>Columna 1</div>
  <div>Columna 2</div>
</Grid>
```
