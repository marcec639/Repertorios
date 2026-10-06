# Divider

Separador visual horizontal con label opcional.

## Qué es

Un divisor horizontal para separar visualmente secciones de contenido, con opción de mostrar un texto centrado.

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `label` | `string` | — | Texto centrado sobre la línea divisora |

## Cómo funciona

- Renderiza un `<div class="ui-divider">` con `role="separator"` y `aria-label={label}`
- Si `label` está presente, muestra un `<span class="ui-divider__label">` centrado con línea a cada lado
- Sin label, renderiza una línea horizontal simple

## Uso

```jsx
import { Divider } from '@/components'

<Divider />
<Divider label="O continúa con" />
```
