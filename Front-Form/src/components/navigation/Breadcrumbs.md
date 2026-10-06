# Breadcrumbs

Navegación jerárquica tipo migas de pan.

## Qué es

Un componente de navegación que muestra la ruta actual del usuario dentro de la aplicación como enlaces separados por `/`.

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `items` | `Array<{ label, href? }>` | `[]` | Lista de ítems de la ruta. El último (sin `href`) se muestra como texto bold |

## Cómo funciona

- Renderiza un `<nav aria-label="Breadcrumb" class="ui-breadcrumbs">`
- Cada ítem con `href` renderiza un `<a>`, sin `href` renderiza un `<strong>` (ítem actual)
- Los separadores `/` se insertan entre ítems automáticamente

## Uso

```jsx
import { Breadcrumbs } from '@/components'

<Breadcrumbs items={[
  { label: 'Inicio', href: '/' },
  { label: 'Productos', href: '/productos' },
  { label: 'Detalle' },
]} />
```
