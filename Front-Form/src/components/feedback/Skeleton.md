# Skeleton

Sistema de placeholders animados para estados de carga.

## Qué es

Un sistema de skeleton loading con dos niveles: `Skeleton` (componente de alto nivel con variantes compuestas) y `Bone` (primitivo base). Se usan para mostrar la forma del contenido mientras se cargan datos.

## Exports

Este archivo exporta dos componentes: `Skeleton` y `Bone`.

---

## Skeleton

Componente de alto nivel con variantes predefinidas.

### Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `variant` | `string` | `'text'` | Tipo de skeleton (ver variantes abajo) |
| `width` | `string \| number` | — | Ancho del bone |
| `height` | `string \| number` | — | Alto del bone |
| `size` | `number` | — | Tamaño para variantes circulares |
| `lines` | `number` | `3` | Cantidad de líneas para `text` (multi-línea), `form` y `list` |
| `rows` | `number` | `5` | Cantidad de filas para variante `table` |
| `cols` | `number` | `4` | Cantidad de columnas para variante `table` |
| `animated` | `boolean` | `true` | Habilita la animación pulse |
| `className` | `string` | `''` | Clase CSS adicional |

### Variantes

| Variante | Descripción |
|----------|-------------|
| `text` | Línea(s) de texto. Si `lines > 1`, renderiza múltiples líneas con ancho variable |
| `heading` | Bone de título |
| `circle` | Círculo (avatar) |
| `rect` | Rectángulo genérico |
| `button` | Forma de botón |
| `card` | Card completo (header + body con 3 líneas) |
| `card-image` | Card con imagen de portada + body |
| `stat` | Indicador estadístico (label + valor + cambio) |
| `table` | Tabla con headers y filas configurables |
| `avatar-text` | Círculo + 2 líneas de texto al lado |
| `form` | Formulario con campos (label + input) y botón |
| `list` | Lista con avatar circular + texto por ítem |

---

## Bone

Primitivo base — un solo bloque animado.

### Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `variant` | `'text' \| 'heading' \| 'circle' \| 'rect' \| 'button'` | `'text'` | Forma del bone |
| `width` | `string \| number` | — | Ancho. Números se convierten a `px` |
| `height` | `string \| number` | — | Alto. Números se convierten a `px` |
| `size` | `number` | `40` | Tamaño para `circle` (width = height = size) |
| `animated` | `boolean` | `true` | Animación pulse |

### Cómo funciona

- Renderiza un `<span>` con clases `ui-skeleton-bone ui-skeleton-bone--{variant}`
- Si `animated`, agrega `ui-skeleton-bone--animated` que aplica una animación CSS de opacidad pulsante
- Muchos componentes del sistema importan `Bone` directamente para sus estados `loading`

## Uso

```jsx
import { Skeleton, Bone } from '@/components'

// Variantes compuestas
<Skeleton variant="card" />
<Skeleton variant="table" rows={3} cols={5} />
<Skeleton variant="form" lines={4} />
<Skeleton variant="avatar-text" />

// Bone primitivo directo
<Bone variant="text" width="80%" />
<Bone variant="circle" size={40} />
<Bone variant="rect" width="100%" height={200} />
```
