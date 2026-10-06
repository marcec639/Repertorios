# Field

Wrapper de campo de formulario con label y texto de ayuda.

## Qué es

Un contenedor semántico (`<label>`) que agrupa un label, un control de formulario (hijo) y un helper text opcional. Es la base para construir campos de formulario consistentes.

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `label` | `string` | — | Texto del label |
| `helperText` | `string` | — | Texto de ayuda debajo del campo |
| `children` | `ReactNode` | — | Control de formulario (TextInput, SelectField, etc.) |
| `loading` | `boolean` | `false` | Muestra skeleton para label y control |

## Cómo funciona

- Renderiza un `<label class="ui-field">` con el label arriba, el children (control) al medio, y opcionalmente el helper debajo
- Cuando `loading={true}`, muestra un `Bone` de texto (30%) para el label y un `Bone` rect para el input
- El `<label>` nativo asocia el click al primer control de formulario hijo

## Uso

```jsx
import { Field, TextInput } from '@/components'

<Field label="Nombre" helperText="Ingrese su nombre completo">
  <TextInput placeholder="Ej: Ana López" />
</Field>

<Field label="Email" loading={isLoading}>
  <TextInput type="email" />
</Field>
```
