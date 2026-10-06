# ProgressBar

Barra de progreso visual.

## Qué es

Un componente de barra de progreso accesible que muestra visualmente un porcentaje de completitud.

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `value` | `number` | `0` | Porcentaje de progreso (0–100). Se clampea automáticamente |

## Cómo funciona

- Renderiza un `<div class="ui-progress">` con `role="progressbar"` y atributos ARIA (`aria-valuemin`, `aria-valuemax`, `aria-valuenow`)
- El ancho de la barra interna (`ui-progress__bar`) se calcula con `Math.min(Math.max(value, 0), 100)%`

## Uso

```jsx
import { ProgressBar } from '@/components'

<ProgressBar value={75} />
<ProgressBar value={100} />
<ProgressBar value={0} />
```
