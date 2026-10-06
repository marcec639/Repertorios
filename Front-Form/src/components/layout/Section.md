# Section

Sección con título, subtítulo y cuerpo.

## Qué es

Un componente que agrupa contenido en una sección semántica (`<section>`) con un header opcional (título y subtítulo).

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `title` | `string` | — | Título de la sección (renderiza `<h2>`) |
| `subtitle` | `string` | — | Subtítulo debajo del título |
| `children` | `ReactNode` | — | Contenido de la sección |

## Cómo funciona

- Renderiza un `<section class="ui-section">` con un `<header>` opcional (solo si hay `title` o `subtitle`)
- El body se renderiza en `<div class="ui-section__body">`

## Uso

```jsx
import { Section } from '@/components'

<Section title="Métricas" subtitle="Resumen del último mes">
  <Grid columns={3}>
    <Stat label="Ingresos" value="$28,450" />
  </Grid>
</Section>
```
