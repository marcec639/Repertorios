# Button

Botón de acción principal de la interfaz.

## Qué es

Un componente de botón reutilizable con variantes visuales, soporte para estado de carga (skeleton) y deshabilitado.

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Contenido del botón (texto, íconos, etc.) |
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'danger'` | `'primary'` | Variante visual del botón |
| `type` | `string` | `'button'` | Atributo HTML `type` (`button`, `submit`, `reset`) |
| `loading` | `boolean` | `false` | Muestra un placeholder skeleton y deshabilita el botón |
| `disabled` | `boolean` | `false` | Deshabilita el botón |

## Cómo funciona

- Renderiza un `<button>` nativo con clases BEM: `ui-button ui-button--{variant}`
- Cuando `loading={true}`, agrega la clase `ui-button--loading`, muestra un `Bone` animado en lugar del contenido, y se deshabilita automáticamente
- Todos los props adicionales (`onClick`, `className`, etc.) se pasan al `<button>` vía spread

## Uso

```jsx
import { Button } from '@/components'

<Button variant="primary" onClick={handleSave}>Guardar</Button>
<Button variant="secondary">Cancelar</Button>
<Button variant="ghost">Editar</Button>
<Button variant="danger">Eliminar</Button>
<Button loading={isLoading}>Cargando…</Button>
```
