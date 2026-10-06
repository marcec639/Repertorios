# RadioGroup

Grupo de radio buttons.

## Qué es

Un grupo de opciones mutuamente excluyentes usando radio buttons nativos, con soporte para skeleton loading.

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `name` | `string` | — | Nombre del grupo (atributo `name` de los radios, y `aria-label` del grupo) |
| `options` | `Array<{ value, label, checked? }>` | `[]` | Lista de opciones. `checked` marca la opción seleccionada por defecto |
| `loading` | `boolean` | `false` | Muestra skeleton para cada opción (círculo + texto) |

## Cómo funciona

- Renderiza un `<div class="ui-radio-group">` con `role="radiogroup"` y `aria-label={name}`
- Cada opción es un `<label class="ui-check">` con un `<input type="radio">` nativo
- Cuando `loading={true}`, muestra un `Bone` circle (18px) y un `Bone` text (90px) por cada opción, con `pointerEvents: 'none'`

## Uso

```jsx
import { RadioGroup } from '@/components'

<RadioGroup
  name="plan"
  options={[
    { value: 'free', label: 'Gratuito', checked: true },
    { value: 'pro', label: 'Profesional' },
    { value: 'enterprise', label: 'Enterprise' },
  ]}
/>

<RadioGroup name="tipo" options={opciones} loading={isLoading} />
```
