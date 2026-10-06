# Popover

Panel flotante posicionado relativamente a un trigger.

## Qué es

Un componente de overlay que muestra un panel flotante al hacer click en un elemento trigger, posicionándose dinámicamente según la posición del trigger en pantalla.

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `trigger` | `ReactNode` | — | Elemento que activa el popover al hacer click |
| `children` | `ReactNode` | — | Contenido del panel flotante |
| `align` | `'start' \| 'center' \| 'end'` | `'start'` | Alineación horizontal del panel respecto al trigger |
| `width` | `string \| number` | — | Ancho fijo del panel (opcional) |

## Cómo funciona

- El `trigger` se renderiza dentro de un `<span>` clickeable
- Al hacer click, calcula la posición del panel usando `getBoundingClientRect()` del trigger
- El panel se renderiza con `position: fixed` en la posición calculada
- Se cierra con click-outside (event listener `mousedown` en `document`)
- La alineación controla el punto de anclaje horizontal:
  - `start`: esquina izquierda del trigger
  - `center`: centro del trigger
  - `end`: esquina derecha del trigger

## Uso

```jsx
import { Popover } from '@/components'

<Popover trigger={<Button variant="ghost">Opciones</Button>} align="end" width={200}>
  <div style={{ padding: 'var(--space-sm)' }}>
    <button>Editar</button>
    <button>Eliminar</button>
  </div>
</Popover>
```
