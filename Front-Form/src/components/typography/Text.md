# Text

Párrafo de texto con tono visual.

## Qué es

Un componente de texto (`<p>`) con variantes de tono para ajustar el color y soporte para skeleton loading.

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Texto a mostrar |
| `tone` | `'default' \| 'secondary' \| 'muted'` | `'default'` | Tono visual (color del texto) |
| `loading` | `boolean` | `false` | Muestra skeleton en lugar del texto |

Acepta todos los props nativos de `<p>`: `style`, `className`, etc.

## Cómo funciona

- Renderiza un `<p class="ui-text ui-text--{tone}">`
- Los tonos mapean a tokens de color:
  - `default` → `--color-text-primary`
  - `secondary` → `--color-text-secondary`
  - `muted` → `--color-text-muted`
- Cuando `loading={true}`, muestra un `Bone` text (80% ancho) dentro del `<p>`
- Props adicionales se pasan al `<p>` vía spread

## Uso

```jsx
import { Text } from '@/components'

<Text>Texto principal normal.</Text>
<Text tone="secondary">Texto secundario gris.</Text>
<Text tone="muted">Texto deshabilitado o auxiliar.</Text>
<Text loading={isLoading}>Este texto se verá como skeleton.</Text>
```
