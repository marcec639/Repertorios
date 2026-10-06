# Tabs

Navegación por pestañas.

## Qué es

Un componente de pestañas horizontal que permite alternar entre secciones de contenido.

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `tabs` | `Array<{ id, label }>` | `[]` | Lista de pestañas. `id` es el identificador único, `label` el texto visible |
| `activeTab` | `string` | — | `id` de la pestaña activa |
| `onChange` | `(tabId) => void` | — | Callback cuando se selecciona una pestaña |

## Cómo funciona

- Renderiza un `<div class="ui-tabs" role="tablist">` con botones para cada tab
- La pestaña activa tiene la clase `is-active` y `aria-selected="true"`
- Cada botón tiene `role="tab"` para accesibilidad
- No renderiza contenido — solo la barra de tabs. El contenido se controla externamente con `activeTab`

## Uso

```jsx
import { Tabs } from '@/components'

const [tab, setTab] = useState('general')

<Tabs
  tabs={[
    { id: 'general', label: 'General' },
    { id: 'config', label: 'Configuración' },
    { id: 'permisos', label: 'Permisos' },
  ]}
  activeTab={tab}
  onChange={setTab}
/>

{tab === 'general' && <GeneralContent />}
{tab === 'config' && <ConfigContent />}
```
