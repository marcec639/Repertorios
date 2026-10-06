# Sistema de Loading (Skeleton)

Documentación del sistema integrado de estados de carga del design system.

---

## Concepto

El sistema de loading permite mostrar placeholders animados (skeletons) mientras se cargan datos, manteniendo la estructura visual de la interfaz. Tiene dos niveles de uso:

1. **Prop `loading`**: Integrado directamente en los componentes — pasa `loading={true}` y el componente muestra su propia versión skeleton
2. **Componente `Skeleton`/`Bone`**: Uso standalone para composiciones custom

---

## Cómo activar el loading

### Con la prop `loading`

La mayoría de componentes aceptan una prop `loading` booleana. Cuando es `true`, el componente reemplaza su contenido real por `Bone` animados que mantienen la misma estructura visual.

```jsx
<Card title="Ingresos" loading={true}>
  <Stat label="Total" value="$28,450" loading={true} />
</Card>
```

### Patrón recomendado

Usa un solo estado para controlar todo el loading de una vista:

```jsx
function MiPagina() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData().then((data) => {
      setDatos(data)
      setLoading(false)
    })
  }, [])

  return (
    <Container>
      <Heading as="h1" loading={loading}>Dashboard</Heading>
      <Grid columns={3}>
        <Card title="Ingresos" loading={loading}>
          <Stat label="Total" value={datos?.ingresos} loading={loading} />
        </Card>
        <Card title="Usuarios" loading={loading}>
          <Stat label="Activos" value={datos?.usuarios} loading={loading} />
        </Card>
      </Grid>
      <Card title="Equipo" padding={false} loading={loading}>
        <Table columns={cols} rows={datos?.equipo || []} loading={loading} />
      </Card>
    </Container>
  )
}
```

---

## Componentes con prop `loading`

| Componente | Qué muestra en skeleton | Qué se deshabilita |
|------------|------------------------|--------------------|
| **Button** | `Bone` text (70%) | Se deshabilita (`disabled`) |
| **Heading** | `Bone` heading (50%, altura según `as`) | — |
| **Text** | `Bone` text (80%) | — |
| **Card** | `Bone` para cover, header, body (3 líneas), footer | — |
| **Stat** | `Bone` para label, valor y cambio | — |
| **Table** | `Bone` para cada header y celda con anchos variados | — |
| **Accordion** | `Bone` text para título de cada ítem | Clicks deshabilitados (`pointerEvents: 'none'`) |
| **Field** | `Bone` text (label) + `Bone` rect (input) | — |
| **CheckboxField** | `Bone` rect (18×18) + `Bone` text (100px) | `pointerEvents: 'none'` |
| **RadioGroup** | `Bone` circle (18) + `Bone` text (90px) por opción | `pointerEvents: 'none'` |
| **SwitchField** | `Bone` rect (44×24) + `Bone` text (120px) | `pointerEvents: 'none'` |
| **FileUpload** | `Bone` circle + `Bone` texts en dropzone | `pointerEvents: 'none'` |
| **MapField** | `Bone` rects para mapa, búsqueda, campos de detalle | — |
| **Drawer** | `Bone` heading (título) + `Bone` texts y rect (body) | — |

---

## Componente Skeleton (standalone)

Para layouts que no mapean a un componente existente, usa `<Skeleton>` directamente:

```jsx
import { Skeleton } from '@/components'

<Skeleton variant="card" />
<Skeleton variant="table" rows={3} cols={5} />
<Skeleton variant="form" lines={4} />
<Skeleton variant="avatar-text" />
<Skeleton variant="list" lines={6} />
```

### Variantes disponibles

| Variante | Descripción |
|----------|-------------|
| `text` | Línea(s) de texto. `lines > 1` genera múltiples líneas |
| `heading` | Línea de título |
| `circle` | Círculo (avatar) |
| `rect` | Rectángulo genérico |
| `button` | Forma de botón |
| `card` | Card completo (header + 3 líneas) |
| `card-image` | Card con imagen de portada |
| `stat` | Indicador estadístico |
| `table` | Tabla (configurable con `rows` y `cols`) |
| `avatar-text` | Círculo + 2 líneas |
| `form` | Formulario (label + input × `lines`) |
| `list` | Lista con avatares |

---

## Bone (primitivo)

Para composiciones completamente custom, importa `Bone` directamente:

```jsx
import { Bone } from '@/components/feedback/Skeleton'

<Bone variant="text" width="80%" />
<Bone variant="circle" size={40} />
<Bone variant="rect" width="100%" height={200} />
<Bone variant="heading" width="50%" height={28} />
```

### Variantes de Bone

| Variante | Descripción |
|----------|-------------|
| `text` | Línea de texto (ancho automático o custom) |
| `heading` | Línea de título |
| `circle` | Círculo — `size` define width y height |
| `rect` | Rectángulo genérico |
| `button` | Forma de botón |

---

## Animación

Todos los bones usan una animación CSS `pulse` que alterna la opacidad entre dos valores. Se activa por defecto con la clase `ui-skeleton-bone--animated`. Se puede desactivar con `animated={false}`.

---

## Toggle de desarrollo

El `DashboardPage` incluye un botón flotante (esquina inferior derecha) que activa/desactiva el estado de loading de toda la página, permitiendo previsualizar el skeleton de todos los componentes durante el desarrollo.
