# Heading

Título semántico con nivel configurable.

## Qué es

Un componente de encabezado que renderiza etiquetas `h1`–`h4` con estilos del design system y soporte para skeleton loading.

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `as` | `'h1' \| 'h2' \| 'h3' \| 'h4'` | `'h2'` | Nivel del heading (etiqueta HTML) |
| `children` | `ReactNode` | — | Texto del heading |
| `loading` | `boolean` | `false` | Muestra skeleton en lugar del texto |

## Cómo funciona

- Renderiza un `<{Tag} class="ui-heading ui-heading--{as}">` donde `Tag` es el valor de `as`
- Cuando `loading={true}`, renderiza un `Bone` heading dentro del tag con altura variable según el nivel:
  - `h1`: 32px
  - `h2`: 26px
  - `h3`: 22px
  - Otros: 18px

## Uso

```jsx
import { Heading } from '@/components'

<Heading as="h1">Título principal</Heading>
<Heading as="h2">Subtítulo</Heading>
<Heading as="h3">Sección</Heading>
<Heading as="h1" loading={isLoading}>Cargando...</Heading>
```
