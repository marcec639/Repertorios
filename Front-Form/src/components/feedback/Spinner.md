# Spinner

Indicador de carga circular.

## Qué es

Un spinner animado para indicar que una operación está en progreso.

## Props

No recibe props.

## Cómo funciona

- Renderiza un `<span class="ui-spinner">` con `role="status"` y `aria-label="Loading"`
- La animación se controla completamente por CSS (rotación continua)

## Uso

```jsx
import { Spinner } from '@/components'

<Spinner />
```
