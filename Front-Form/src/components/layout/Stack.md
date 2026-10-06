# Stack

Apilamiento vertical con gap configurable.

## Qué es

Un componente de layout que apila sus hijos verticalmente con un espaciado (gap) configurable usando los tokens de spacing del design system.

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Elementos a apilar |
| `gap` | `'2xs' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'md'` | Tamaño del gap entre elementos |

## Cómo funciona

- Renderiza un `<div class="ui-stack ui-stack--{gap}">` con `display: flex`, `flex-direction: column` y el gap correspondiente al token `--space-{gap}`

## Uso

```jsx
import { Stack } from '@/components'

<Stack gap="lg">
  <Card title="Card 1" />
  <Card title="Card 2" />
  <Card title="Card 3" />
</Stack>

<Stack gap="xs">
  <Text>Línea 1</Text>
  <Text>Línea 2</Text>
</Stack>
```
