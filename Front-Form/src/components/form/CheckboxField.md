# CheckboxField

Campo de checkbox con label.

## Qué es

Un checkbox nativo (`<input type="checkbox">`) envuelto en un `<label>` estilizado.

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `label` | `string` | — | Texto junto al checkbox |
| `loading` | `boolean` | `false` | Muestra skeleton (rectángulo + texto) |

Acepta todos los props nativos de `<input>`: `checked`, `onChange`, `disabled`, `name`, etc.

## Cómo funciona

- Renderiza un `<label class="ui-check">` con un `<input type="checkbox">` y un `<span>` con el label
- Cuando `loading={true}`, muestra un `Bone` rect (18×18) y un `Bone` text, con `pointerEvents: 'none'`
- Todos los props adicionales se pasan al `<input>` vía spread

## Uso

```jsx
import { CheckboxField } from '@/components'

<CheckboxField label="Acepto los términos" onChange={(e) => setAccepted(e.target.checked)} />
<CheckboxField label="Recordarme" checked={remember} onChange={toggleRemember} />
<CheckboxField label="Opción" loading={isLoading} />
```
