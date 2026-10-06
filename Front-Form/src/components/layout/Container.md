# Container

Contenedor centrado de ancho máximo.

## Qué es

Un wrapper que centra y limita el ancho máximo del contenido principal de la página.

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Contenido a centrar |

## Cómo funciona

- Renderiza un `<div class="ui-container">` que aplica un `max-width` y centrado horizontal con `margin: 0 auto`

## Uso

```jsx
import { Container } from '@/components'

<Container>
  <h1>Contenido centrado</h1>
</Container>
```
