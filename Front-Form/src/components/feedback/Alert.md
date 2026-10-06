# Alert

Mensaje de alerta con tono semántico.

## Qué es

Un componente que muestra notificaciones o mensajes contextuales con un título destacado y un cuerpo de texto, coloreados según su nivel de severidad.

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `tone` | `'info' \| 'success' \| 'warning' \| 'danger'` | `'info'` | Tono visual y semántico del alerta |
| `title` | `string` | — | Título del mensaje (renderiza `<strong>`) |
| `children` | `ReactNode` | — | Cuerpo del mensaje |

## Cómo funciona

- Renderiza un `<div class="ui-alert ui-alert--{tone}">` con `role="alert"`
- Cada tono aplica colores del token correspondiente (`--color-info`, `--color-success`, etc.)
- El `role="alert"` hace que lectores de pantalla lo anuncien automáticamente

## Uso

```jsx
import { Alert } from '@/components'

<Alert tone="info" title="Información">Operación completada.</Alert>
<Alert tone="success" title="Éxito">Datos guardados correctamente.</Alert>
<Alert tone="warning" title="Advertencia">Tu sesión expira pronto.</Alert>
<Alert tone="danger" title="Error">No se pudo conectar al servidor.</Alert>
```
