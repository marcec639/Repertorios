# Modal

Diálogo modal con overlay.

## Qué es

Un componente de diálogo modal que se muestra sobre un backdrop oscuro, bloqueando la interacción con el contenido inferior.

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `open` | `boolean` | — | Controla la visibilidad del modal |
| `title` | `string` | — | Título del modal (renderiza `<h3>`) |
| `children` | `ReactNode` | — | Contenido del body |
| `onClose` | `function` | — | Callback al cerrar (botón Close) |

## Cómo funciona

- Si `open` es `false`, no renderiza nada (retorna `null`)
- Renderiza un `<div class="ui-modal-backdrop">` con `role="dialog"`, `aria-modal="true"` y `aria-label={title}`
- El header tiene el título y un `Button` variant `ghost` para cerrar
- El body renderiza los `children` directamente

## Uso

```jsx
import { Modal } from '@/components'

const [open, setOpen] = useState(false)

<Button onClick={() => setOpen(true)}>Abrir modal</Button>

<Modal open={open} title="Confirmar acción" onClose={() => setOpen(false)}>
  <p>¿Estás seguro de que deseas continuar?</p>
  <Button onClick={handleConfirm}>Confirmar</Button>
</Modal>
```
