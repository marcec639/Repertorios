# fileToBase64

Servicio utilitario para convertir archivos a Base64 y viceversa.

## Qué es

Un conjunto de funciones puras que permiten convertir cualquier tipo de archivo (imágenes, documentos, PDFs, etc.) a cadenas Base64, y también revertir el proceso. Esto es útil para enviar archivos como texto plano en peticiones JSON al backend, almacenarlos en localStorage, o previsualizar contenido sin necesidad de URLs temporales.

## Ubicación

`src/services/fileToBase64.js`

## Funciones

| Función | Entrada | Salida | Descripción |
|---------|---------|--------|-------------|
| `fileToBase64(file)` | `File \| Blob` | `Promise<Result>` | Convierte un archivo a Base64 |
| `filesToBase64(files)` | `File[] \| FileList` | `Promise<Result[]>` | Convierte múltiples archivos en paralelo |
| `urlToBase64(url)` | `string` | `Promise<Result>` | Descarga un recurso remoto y lo convierte |
| `base64ToBlob(base64, type)` | `string, string` | `Blob` | Convierte Base64 puro de vuelta a Blob |
| `base64ToFile(base64, name, type)` | `string, string, string` | `File` | Convierte Base64 a un File con nombre |

### Objeto `Result`

```js
{
  name: string,     // nombre del archivo (vacío si es Blob)
  size: number,     // tamaño en bytes
  type: string,     // MIME type (e.g. 'image/png')
  base64: string,   // cadena base64 pura (sin prefijo)
  dataUri: string,  // data URI completa: "data:image/png;base64,iVBOR…"
}
```

---

## Cómo funciona

- `fileToBase64` utiliza `FileReader.readAsDataURL()` internamente para leer el archivo de forma asíncrona y devolver tanto el data URI completo como la parte base64 limpia
- `filesToBase64` ejecuta `fileToBase64` en paralelo con `Promise.all` para procesar lotes de archivos eficientemente
- `urlToBase64` hace un `fetch` de la URL, obtiene el `Blob` resultante y lo pasa a `fileToBase64`
- `base64ToBlob` decodifica la cadena con `atob()` y construye un `Blob` con el buffer binario
- `base64ToFile` extiende `base64ToBlob` envolviendo el resultado en un `File` con nombre

---

## Uso

### Convertir un archivo desde un `<input>`

```jsx
import { fileToBase64 } from '@/services/fileToBase64'

async function handleChange(e) {
  const file = e.target.files[0]
  const result = await fileToBase64(file)

  console.log(result.base64)    // "iVBORw0KGgo…"
  console.log(result.dataUri)   // "data:image/png;base64,iVBORw0KGgo…"
  console.log(result.type)      // "image/png"
  console.log(result.size)      // 24832
}
```

### Convertir múltiples archivos

```jsx
import { filesToBase64 } from '@/services/fileToBase64'

async function handleMultiple(e) {
  const results = await filesToBase64(e.target.files)

  // results es un array de objetos { name, size, type, base64, dataUri }
  const payload = results.map(r => ({
    nombre: r.name,
    contenido: r.base64,
    tipo: r.type,
  }))

  await api.post('/documentos', { archivos: payload })
}
```

### Integración con FileUpload

```jsx
import { FileUpload } from '@/components'
import { filesToBase64 } from '@/services/fileToBase64'

function MiFormulario() {
  const [archivos, setArchivos] = useState([])

  const handleFiles = async (files) => {
    const convertidos = await filesToBase64(files)
    setArchivos(convertidos)
  }

  return <FileUpload onChange={handleFiles} />
}
```

### Descargar imagen remota y convertir

```jsx
import { urlToBase64 } from '@/services/fileToBase64'

const result = await urlToBase64('https://ejemplo.com/foto.jpg')
console.log(result.base64)  // cadena base64 de la imagen
```

### Revertir: Base64 → File

```jsx
import { base64ToFile } from '@/services/fileToBase64'

// Útil para reconstruir archivos desde datos guardados
const file = base64ToFile(base64String, 'documento.pdf', 'application/pdf')

// Se puede usar en un FormData o como descarga
const url = URL.createObjectURL(file)
```

### Enviar al backend como JSON

```jsx
import { fileToBase64 } from '@/services/fileToBase64'
import { apiClient } from '@/services/apiClient'

async function subirDocumento(file) {
  const { base64, type, name } = await fileToBase64(file)

  await apiClient.post('/documentos', {
    nombre: name,
    contenido: base64,
    mimeType: type,
  })
}
```
