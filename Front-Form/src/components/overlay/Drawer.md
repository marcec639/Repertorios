# Drawer

Panel lateral deslizable.

## Qué es

Un panel lateral (sidebar) que se abre sobre el contenido principal, con header, body scrolleable y soporte para skeleton loading.

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `open` | `boolean` | — | Controla la visibilidad del drawer |
| `title` | `string` | — | Título del drawer (renderiza `<h3>`) |
| `children` | `ReactNode` | — | Contenido del body |
| `onClose` | `function` | — | Callback al cerrar (botón Close) |
| `loading` | `boolean` | `false` | Muestra skeleton en título y body |

## Cómo funciona

- Si `open` es `false`, no renderiza nada (retorna `null`)
- Renderiza un `<aside class="ui-drawer">` con `role="complementary"`
- El header muestra el título (o `Bone` heading si `loading`) y un `Button` ghost para cerrar
- Cuando `loading={true}`, el body muestra 3 líneas de `Bone` text (100%, 85%, 70%) y un `Bone` rect
- Cuando `loading={false}`, el body renderiza `children`

## Uso

```jsx
import { Drawer } from '@/components'

const [open, setOpen] = useState(false)

<Drawer open={open} title="Detalle" onClose={() => setOpen(false)}>
  <p>Contenido del panel</p>
</Drawer>

<Drawer open={open} title="Cargando" onClose={() => setOpen(false)} loading={isLoading}>
  <p>Esto se mostrará cuando loading sea false</p>
</Drawer>
```
