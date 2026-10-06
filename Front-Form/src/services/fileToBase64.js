/**
 * Convierte un File/Blob a una cadena Base64.
 * Retorna un objeto con la data URI completa y la parte pura base64.
 *
 * @param {File|Blob} file
 * @returns {Promise<{ name: string, size: number, type: string, base64: string, dataUri: string }>}
 */
export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    if (!(file instanceof Blob)) {
      return reject(new TypeError('Se esperaba un File o Blob'))
    }

    const reader = new FileReader()

    reader.onload = () => {
      const dataUri = reader.result          // "data:<mime>;base64,xxxxx…"
      const base64 = dataUri.split(',')[1]   // solo la parte base64

      resolve({
        name: file.name || '',
        size: file.size,
        type: file.type || 'application/octet-stream',
        base64,
        dataUri,
      })
    }

    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

/**
 * Convierte varios archivos en paralelo.
 *
 * @param {File[]|FileList} files
 * @returns {Promise<Array<{ name: string, size: number, type: string, base64: string, dataUri: string }>>}
 */
export function filesToBase64(files) {
  return Promise.all(Array.from(files).map(fileToBase64))
}

/**
 * Descarga un recurso desde una URL y lo convierte a Base64.
 * Útil para imágenes remotas, PDFs, etc.
 *
 * @param {string} url
 * @returns {Promise<{ type: string, base64: string, dataUri: string }>}
 */
export async function urlToBase64(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Error al descargar: ${res.status}`)
  const blob = await res.blob()
  return fileToBase64(blob)
}

/**
 * Convierte una cadena Base64 de vuelta a un Blob.
 *
 * @param {string} base64  – cadena base64 pura (sin prefijo data:…)
 * @param {string} type    – MIME type (e.g. 'image/png')
 * @returns {Blob}
 */
export function base64ToBlob(base64, type = 'application/octet-stream') {
  const bytes = atob(base64)
  const buffer = new Uint8Array(bytes.length)
  for (let i = 0; i < bytes.length; i++) {
    buffer[i] = bytes.charCodeAt(i)
  }
  return new Blob([buffer], { type })
}

/**
 * Convierte una cadena Base64 a un File con nombre.
 *
 * @param {string} base64
 * @param {string} fileName
 * @param {string} type
 * @returns {File}
 */
export function base64ToFile(base64, fileName, type = 'application/octet-stream') {
  const blob = base64ToBlob(base64, type)
  return new File([blob], fileName, { type })
}
