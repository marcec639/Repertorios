# IconButton

Botón compacto que muestra un ícono sin texto.

## Qué es

Un botón circular o cuadrado reducido, diseñado para acciones con íconos (cerrar, menú, opciones, etc.).

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `icon` | `ReactNode \| string` | `'+'` | Ícono a mostrar (texto, emoji, SVG, componente) |
| `label` | `string` | — | Texto accesible (`aria-label`) para lectores de pantalla |

## Cómo funciona

- Renderiza un `<button>` con la clase `ui-icon-button`
- El prop `label` se asigna como `aria-label` para accesibilidad
- Todos los props adicionales (`onClick`, `disabled`, etc.) se pasan al `<button>` vía spread

## Uso

```jsx
import { IconButton } from '@/components'

<IconButton icon="✕" label="Cerrar" onClick={handleClose} />
<IconButton icon="☰" label="Menú" onClick={toggleMenu} />
<IconButton icon={<MiIconoSVG />} label="Opciones" />
```
