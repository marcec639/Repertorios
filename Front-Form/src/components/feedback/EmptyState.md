# EmptyState

Placeholder visual para estados vacíos.

## Qué es

Un componente que se muestra cuando una sección no tiene datos, con un mensaje descriptivo y una acción opcional.

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `title` | `string` | — | Título del estado vacío |
| `message` | `string` | — | Mensaje descriptivo |
| `actionLabel` | `string` | — | Texto del botón de acción (si se omite, no se muestra botón) |
| `onAction` | `function` | — | Callback al hacer click en el botón |

## Cómo funciona

- Renderiza un `<div class="ui-empty-state">` centrado con título (`<h3>`), mensaje (`<p>`) y un `Button` opcional
- El botón solo se renderiza si `actionLabel` está presente

## Uso

```jsx
import { EmptyState } from '@/components'

<EmptyState
  title="Sin resultados"
  message="No se encontraron datos para tu búsqueda."
  actionLabel="Crear nuevo"
  onAction={() => console.log('crear')}
/>

<EmptyState title="Lista vacía" message="Agrega elementos para comenzar." />
```
