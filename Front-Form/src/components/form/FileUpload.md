# FileUpload

Carga de archivos con drag & drop, preview lightbox y soporte para archivos remotos.

## Qué es

Un componente completo de carga de archivos que soporta selección por click, drag & drop, previews de imágenes/PDF, lightbox a pantalla completa, descarga, y archivos remotos (desde base de datos/API).

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `accept` | `string` | — | Tipos de archivo aceptados (ej. `"image/*,.pdf"`) |
| `multiple` | `boolean` | `false` | Permite seleccionar múltiples archivos |
| `value` | `Array<{ name, url, type?, size? }>` | — | Archivos remotos/iniciales (desde DB) |
| `onChange` | `(files) => void` | — | Callback con la lista combinada de archivos (remotos + locales) |
| `maxFiles` | `number` | `10` | Máximo de archivos permitidos |
| `loading` | `boolean` | `false` | Muestra skeleton de la dropzone |

## Cómo funciona

### Archivos locales vs remotos

- **Locales**: Se agregan por click o drag & drop. Se crean URLs temporales con `URL.createObjectURL()`
- **Remotos**: Se pasan vía `value`. Muestran un badge "remoto" en la fila. Se normalizan con `normaliseFile()`

### Preview / Lightbox

- Cada archivo en la lista muestra un thumbnail clickeable
- Al hacer click se abre un lightbox (`FileLightbox`) a pantalla completa con:
  - **Imágenes**: Se muestran directamente
  - **PDFs**: Se muestran en un `<iframe>`
  - **Otros**: Se muestra un fallback con botón de descarga
- El lightbox se cierra con Escape, click fuera del panel, o botón ✕
- Incluye botón de descarga (abre en nueva pestaña para remotos)

### Drag & Drop

- La dropzone detecta `dragover`, `dragleave` y `drop`
- En estado de drag, se agrega la clase `is-dragover` para feedback visual

### Normalización

La función `normaliseFile()` unifica objetos `File` del browser y descriptores remotos a un formato común: `{ name, size, type, url, remote }`.

## Uso

```jsx
import { FileUpload } from '@/components'

// Básico
<FileUpload accept="image/*" onChange={(files) => console.log(files)} />

// Múltiple con máximo
<FileUpload multiple maxFiles={5} accept=".pdf,.doc,.docx" />

// Con archivos remotos desde DB
<FileUpload
  value={[
    { name: 'contrato.pdf', url: 'https://api.example.com/files/contrato.pdf' },
    { name: 'foto.jpg', url: 'https://api.example.com/files/foto.jpg' },
  ]}
  multiple
  onChange={handleFilesChange}
/>

// Skeleton
<FileUpload loading={isLoading} />
```
