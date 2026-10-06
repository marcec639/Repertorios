# SwitchField

Toggle switch con label.

## Qué es

Un interruptor tipo toggle (on/off) implementado como un checkbox estilizado con apariencia de switch.

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `label` | `string` | — | Texto junto al switch |
| `checked` | `boolean` | — | Estado del switch (controlado) |
| `onChange` | `function` | — | Callback al cambiar el estado |
| `loading` | `boolean` | `false` | Muestra skeleton (rectángulo + texto) |

## Cómo funciona

- Renderiza un `<label class="ui-switch">` con un `<input type="checkbox">` oculto y un `<span class="ui-switch__track">` visual
- El track muestra un indicador circular que se desliza entre las posiciones on/off vía CSS
- Cuando `loading={true}`, muestra un `Bone` rect (44×24) y un `Bone` text (120px), con `pointerEvents: 'none'`

## Uso

```jsx
import { SwitchField } from '@/components'

<SwitchField label="Modo oscuro" checked={dark} onChange={() => setDark(!dark)} />
<SwitchField label="Notificaciones" loading={isLoading} />
```
