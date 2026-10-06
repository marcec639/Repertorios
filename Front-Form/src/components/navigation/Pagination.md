# Pagination

Controles de paginación.

## Qué es

Un componente de navegación con botones Previous/Next y el indicador de página actual.

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `page` | `number` | — | Página actual |
| `totalPages` | `number` | — | Total de páginas |
| `onPrevious` | `function` | — | Callback al ir a página anterior |
| `onNext` | `function` | — | Callback al ir a página siguiente |

## Cómo funciona

- Renderiza un `<div class="ui-pagination">` con dos botones y un texto central "Page X of Y"
- El botón Previous se deshabilita si `page <= 1`
- El botón Next se deshabilita si `page >= totalPages`

## Uso

```jsx
import { Pagination } from '@/components'

<Pagination
  page={currentPage}
  totalPages={10}
  onPrevious={() => setPage(p => p - 1)}
  onNext={() => setPage(p => p + 1)}
/>
```
