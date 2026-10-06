# MapField

Campo de mapa interactivo con Google Maps.

## Qué es

Un componente de mapa completo que integra Google Maps JavaScript API con soporte para visualización, selección de ubicación (click en mapa), búsqueda con autocomplete, campos de detalle editables y estado skeleton.

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `apiKey` | `string` | — | **Requerido**. API key de Google Maps (variable `VITE_GOOGLE_MAPS_API_KEY`) |
| `value` | `{ lat, lng, name?, description? }` | — | Ubicación actual |
| `onChange` | `(value) => void` | — | Callback cuando cambia la ubicación |
| `mode` | `'view' \| 'pick'` | `'view'` | `view` = solo visualización, `pick` = click para seleccionar |
| `showSearch` | `boolean` | `false` | Muestra barra de búsqueda con autocomplete de Places |
| `showDetails` | `boolean` | `false` | Muestra campos editables de nombre y descripción debajo del mapa |
| `zoom` | `number` | `15` | Nivel de zoom inicial |
| `height` | `string` | `'400px'` | Altura CSS del mapa |
| `defaultCenter` | `{ lat, lng }` | `{ lat: 9.9281, lng: -84.0907 }` | Centro por defecto (San José, CR) |
| `searchPlaceholder` | `string` | `'Buscar lugar...'` | Placeholder del campo de búsqueda |
| `namePlaceholder` | `string` | `'Nombre del lugar'` | Placeholder del campo nombre |
| `descriptionPlaceholder` | `string` | `'Descripción del lugar'` | Placeholder del campo descripción |
| `loading` | `boolean` | `false` | Muestra skeleton para mapa, búsqueda y detalles |

## Cómo funciona

### Carga del script

- Usa un loader singleton (`loadGoogleMaps`) que carga el script de Google Maps una sola vez
- Carga las librerías `places` para el autocomplete
- Muestra dots animados mientras carga

### Modos

- **`view`**: Solo muestra el mapa con un marker si hay `value`. No es interactivo
- **`pick`**: Click en el mapa → geocode inverso → coloca marker → emite `onChange` con lat/lng y dirección

### Autocomplete

Si `showSearch={true}`, renderiza un input con `google.maps.places.Autocomplete` que busca lugares y mueve el mapa/marker.

### Campos de detalle

Si `showDetails={true}`, muestra inputs editables para nombre y descripción debajo del mapa, con las coordenadas actuales.

### Exports

El archivo exporta tanto `default` como named: `export default function MapField` y `export { MapField }`.

## Uso

```jsx
import MapField from '@/components/form/MapField'

// Solo vista
<MapField
  apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
  value={{ lat: 9.9281, lng: -84.0907, name: 'San José' }}
/>

// Selector con búsqueda y detalles
<MapField
  apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
  mode="pick"
  showSearch
  showDetails
  value={location}
  onChange={setLocation}
  height="500px"
/>

// Skeleton
<MapField loading showSearch showDetails />
```

## Requisitos

- Variable de entorno `VITE_GOOGLE_MAPS_API_KEY` con una API key válida
- La key debe tener habilitadas las APIs: Maps JavaScript API, Places API, Geocoding API
