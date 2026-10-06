# Accordion

Componente desplegable que muestra/oculta contenido por secciones.

## Qué es

Un accordion compuesto (compound component) donde cada ítem puede expandirse/colapsarse individualmente con animación suave. Se puede usar con `items` (data-driven) o con `Accordion.Item` (composición).

## Props

### Accordion (contenedor)

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `items` | `Array<{ title, content, defaultOpen? }>` | `[]` | Ítems del accordion (modo data-driven) |
| `children` | `ReactNode` | — | `Accordion.Item` hijos (modo composición) |
| `loading` | `boolean` | `false` | Muestra skeleton para todos los ítems |

### Accordion.Item

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `title` | `string` | — | Título del ítem (texto del trigger) |
| `children` | `ReactNode` | — | Contenido colapsable |
| `defaultOpen` | `boolean` | `false` | Si el ítem inicia expandido |
| `loading` | `boolean` | `false` | Muestra skeleton para este ítem |

## Cómo funciona

- Cada ítem tiene estado `open` con `useState`
- La animación usa `grid-template-rows: 0fr → 1fr` con transición CSS de 0.3s
- El ícono `›` rota 90° cuando está abierto
- En modo `loading`, muestra `Bone` de texto para el título y el ícono
- El número de ítems skeleton se calcula desde los children o `items.length` (fallback: 4)

## Uso

```jsx
import { Accordion } from '@/components'

// Modo data-driven
<Accordion items={[
  { title: 'Sección 1', content: <p>Contenido 1</p>, defaultOpen: true },
  { title: 'Sección 2', content: <p>Contenido 2</p> },
]} />

// Modo composición
<Accordion>
  <Accordion.Item title="FAQ 1" defaultOpen>
    <p>Respuesta 1</p>
  </Accordion.Item>
  <Accordion.Item title="FAQ 2">
    <p>Respuesta 2</p>
  </Accordion.Item>
</Accordion>

// Loading
<Accordion loading={isLoading}>
  <Accordion.Item title="" />
  <Accordion.Item title="" />
</Accordion>
```
