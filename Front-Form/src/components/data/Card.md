# Card

Contenedor visual con header, body, footer y portada opcional.

## Qué es

Un componente de tarjeta que agrupa contenido relacionado con estructura semántica (`<article>`). Soporta título, subtítulo, acciones en el header, imagen de portada y estado de carga skeleton.

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `title` | `string` | — | Título principal del card (renderiza `<h3>`) |
| `subtitle` | `string` | — | Texto secundario debajo del título |
| `headerActions` | `ReactNode` | — | Contenido a la derecha del header (botones, badges, etc.) |
| `children` | `ReactNode` | — | Contenido principal (body) |
| `footer` | `ReactNode` | — | Contenido del footer |
| `padding` | `boolean` | `true` | Si `false`, el body no tiene padding (`ui-card__body--flush`) — útil para tablas |
| `cover` | `string \| ReactNode` | — | URL de imagen o elemento JSX para la portada |
| `loading` | `boolean` | `false` | Muestra placeholders skeleton en lugar del contenido |

## Cómo funciona

- Renderiza un `<article class="ui-card">` con secciones opcionales: cover, header, body, footer
- Si `cover` es un string, renderiza un `<img>`. Si es JSX, lo renderiza directamente
- Cuando `loading={true}`, todas las secciones muestran `Bone` animados manteniendo la estructura visual

## Uso

```jsx
import { Card } from '@/components'

<Card title="Ingresos" subtitle="Último mes">
  <p>Contenido aquí</p>
</Card>

<Card title="Equipo" padding={false}>
  <Table columns={cols} rows={rows} />
</Card>

<Card cover="/imagen.jpg" title="Proyecto" footer={<Button>Ver más</Button>}>
  <p>Descripción del proyecto</p>
</Card>

<Card title="Cargando..." loading={true} />
```
