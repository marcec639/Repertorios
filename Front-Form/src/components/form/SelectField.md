# SelectField

Dropdown de selección personalizado.

## Qué es

Un componente de select custom que reemplaza el `<select>` nativo con un dropdown estilizado, con soporte para teclado, click-outside y estado controlado/no controlado.

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `options` | `Array<{ value, label }>` | `[]` | Lista de opciones seleccionables |
| `value` | `string` | — | Valor seleccionado (modo controlado) |
| `defaultValue` | `string` | — | Valor inicial (modo no controlado) |
| `onChange` | `(value, option) => void` | — | Callback al seleccionar una opción |
| `placeholder` | `string` | `'Seleccionar...'` | Texto cuando no hay selección |

## Cómo funciona

- Renderiza un trigger tipo botón que abre un dropdown (`<ul>` con `role="listbox"`)
- Soporta modo controlado (`value`) y no controlado (`defaultValue`). Sin ninguno, usa la primera opción
- Cierra con Escape, click-outside o al seleccionar una opción
- Soporta apertura con tecla Enter y Space en el trigger
- La opción seleccionada muestra un checkmark (✓) y la clase `is-selected`
- Usa `aria-haspopup`, `aria-expanded` y `aria-selected` para accesibilidad

## Uso

```jsx
import { SelectField } from '@/components'

const opciones = [
  { value: 'a', label: 'Opción A' },
  { value: 'b', label: 'Opción B' },
  { value: 'c', label: 'Opción C' },
]

// No controlado
<SelectField options={opciones} placeholder="Elige uno..." />

// Controlado
<SelectField options={opciones} value={selected} onChange={(val) => setSelected(val)} />
```
