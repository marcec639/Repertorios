# Badge

Etiqueta pequeña con tono semántico.

## Qué es

Un componente inline (`<span>`) para mostrar etiquetas, estados o contadores con color semántico.

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Texto del badge |
| `tone` | `'info' \| 'success' \| 'warning' \| 'danger'` | `'info'` | Color semántico |

## Cómo funciona

- Renderiza un `<span class="ui-badge ui-badge--{tone}">`
- Cada tono usa los colores `--color-{tone}` y `--color-{tone}-soft` del sistema de tokens

## Uso

```jsx
import { Badge } from '@/components'

<Badge tone="success">Activo</Badge>
<Badge tone="danger">Inactivo</Badge>
<Badge tone="warning">Pendiente</Badge>
<Badge tone="info">Nuevo</Badge>
```
