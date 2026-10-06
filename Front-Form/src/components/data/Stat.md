# Stat

Indicador numérico con label, valor y cambio porcentual.

## Qué es

Un componente para mostrar métricas clave (KPIs) como valores numéricos con su etiqueta descriptiva y un indicador de tendencia (subida/bajada).

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `label` | `string` | — | Etiqueta descriptiva del indicador |
| `value` | `string \| number` | — | Valor principal a mostrar |
| `change` | `string` | — | Texto de cambio (ej. `"+12.5%"`, `"-3.2%"`). Si empieza con `-`, se marca como "down" |
| `size` | `string` | — | Tamaño opcional (agrega clase `ui-stat--{size}`) |
| `loading` | `boolean` | `false` | Muestra placeholders skeleton |

## Cómo funciona

- Renderiza un `<div class="ui-stat">` con label, valor y badge de cambio
- El tono del cambio (`up`/`down`) se determina automáticamente: si `change` empieza con `"-"` es `down`, de lo contrario `up`
- Cuando `loading={true}`, muestra `Bone` para label (50%), valor (35%) y cambio (40%)

## Uso

```jsx
import { Stat } from '@/components'

<Stat label="Ingresos" value="$28,450" change="+12.5%" />
<Stat label="Gastos" value="$12,300" change="-3.2%" />
<Stat label="Usuarios" value="5,120" loading={isLoading} />
```
