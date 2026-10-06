# Toast

Notificaciones flotantes temporales o persistentes.

## Qué es

Un sistema de notificaciones tipo toast con soporte para tonos semánticos, auto-dismiss, acciones, íconos personalizados y barra de progreso. Incluye un contexto global (`ToastProvider` + `useToast`) para gestionar toasts desde cualquier componente.

## Exports

- `Toast` — Componente visual individual
- `ToastProvider` — Provider de contexto que gestiona la cola de toasts
- `useToast` — Hook para agregar/remover toasts desde cualquier componente

---

## Toast (componente visual)

### Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `tone` | `'info' \| 'success' \| 'warning' \| 'danger'` | `'info'` | Tono semántico y color |
| `icon` | `ReactNode \| null` | Auto según tono | Ícono personalizado. `null` para ocultar |
| `title` | `string` | — | Título del toast (requerido) |
| `children` | `ReactNode` | — | Contenido del cuerpo |
| `actions` | `Array<{ label, onClick, variant? }>` | — | Botones de acción en el header |
| `duration` | `number` | — | Milisegundos para auto-dismiss. `0` o `undefined` = persistente |
| `onDismiss` | `function` | — | Callback al cerrar |
| `dismissible` | `boolean` | `true` | Muestra botón de cerrar (✕) |

### Cómo funciona

- Cada tono tiene un ícono SVG predeterminado que se puede sobreescribir con `icon`
- Si `duration > 0`, se auto-cierra después del tiempo especificado. El timer se pausa con hover
- La animación de salida (`ui-toast--exit`) dura 250ms antes de ejecutar `onDismiss`
- Incluye una barra de progreso animada cuando hay `duration`

---

## ToastProvider

### Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Contenido de la app |
| `position` | `'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left'` | `'top-right'` | Posición del contenedor de toasts |

---

## useToast

Hook que retorna `{ addToast, removeToast }`.

- `addToast(config)` — Agrega un toast y retorna su `id`. El config recibe las mismas props que `Toast`
- `removeToast(id)` — Remueve un toast por su id

## Uso

```jsx
import { ToastProvider, useToast } from '@/components'

// En el root de la app
<ToastProvider position="top-right">
  <App />
</ToastProvider>

// En cualquier componente
function MiComponente() {
  const { addToast } = useToast()

  const handleSave = () => {
    addToast({
      tone: 'success',
      title: 'Guardado',
      children: 'Los datos se guardaron correctamente.',
      duration: 4000,
    })
  }

  return <Button onClick={handleSave}>Guardar</Button>
}
```
