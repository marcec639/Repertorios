import { useState, useRef, useEffect } from 'react'
import { Bone } from '../feedback/Skeleton'
import './FileUpload.css'

/**
 * Normalise any file entry to { name, size, type, url, remote }.
 * Accepts browser File objects and remote descriptors { name, url, type?, size? }.
 */
function normaliseFile(entry) {
  if (entry instanceof File) {
    return { name: entry.name, size: entry.size, type: entry.type, url: URL.createObjectURL(entry), remote: false, _raw: entry }
  }
  // Remote / DB file: { name, url, type?, size? }
  return {
    name: entry.name || 'archivo',
    size: entry.size || 0,
    type: entry.type || guessType(entry.name || entry.url || ''),
    url: entry.url,
    remote: true,
  }
}

function guessType(name) {
  const ext = name.split('.').pop()?.toLowerCase()
  const map = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', gif: 'image/gif', webp: 'image/webp', svg: 'image/svg+xml', pdf: 'application/pdf', doc: 'application/msword', docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }
  return map[ext] || 'application/octet-stream'
}

function formatSize(bytes) {
  if (!bytes) return ''
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

/* ── Single file row ─────────────────────────────── */
function FileRow({ file, onRemove, onPreview }) {
  const isImage = file.type.startsWith('image/')
  const isPdf = file.type === 'application/pdf'

  return (
    <div className="ui-file-upload__preview">
      <button type="button" className="ui-file-upload__thumb-btn" onClick={onPreview} title="Ver preview">
        <div className="ui-file-upload__thumb">
          {isImage && <img src={file.url} alt={file.name} className="ui-file-upload__img" />}
          {isPdf && <div className="ui-file-upload__pdf-icon"><span>PDF</span></div>}
          {!isImage && !isPdf && <div className="ui-file-upload__generic-icon"><span>📄</span></div>}
          <div className="ui-file-upload__thumb-overlay">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/><path d="M11 8v6M8 11h6"/></svg>
          </div>
        </div>
      </button>
      <div className="ui-file-upload__meta">
        <span className="ui-file-upload__name" title={file.name}>{file.name}</span>
        <span className="ui-file-upload__size">
          {formatSize(file.size)}
          {file.remote && <span className="ui-file-upload__badge-remote">remoto</span>}
        </span>
      </div>
      <button type="button" className="ui-file-upload__remove" onClick={onRemove} aria-label="Remove file">✕</button>
    </div>
  )
}

/* ── Preview lightbox ────────────────────────────── */
function FileLightbox({ file, onClose }) {
  const isImage = file.type.startsWith('image/')
  const isPdf = file.type === 'application/pdf'

  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  function handleDownload() {
    const a = document.createElement('a')
    a.href = file.url
    a.download = file.name
    a.rel = 'noopener noreferrer'
    if (file.remote) a.target = '_blank'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <div className="ui-file-lightbox" onClick={onClose}>
      <div className="ui-file-lightbox__panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="ui-file-lightbox__header">
          <div className="ui-file-lightbox__title">
            <span className="ui-file-lightbox__name">{file.name}</span>
            {file.size > 0 && <span className="ui-file-lightbox__size">{formatSize(file.size)}</span>}
          </div>
          <div className="ui-file-lightbox__actions">
            <button type="button" className="ui-file-lightbox__btn" onClick={handleDownload} title="Descargar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            </button>
            <button type="button" className="ui-file-lightbox__btn" onClick={onClose} title="Cerrar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="ui-file-lightbox__body">
          {isImage && <img src={file.url} alt={file.name} className="ui-file-lightbox__image" />}
          {isPdf && (
            <iframe src={file.url} className="ui-file-lightbox__iframe" title={file.name} />
          )}
          {!isImage && !isPdf && (
            <div className="ui-file-lightbox__fallback">
              <div className="ui-file-lightbox__fallback-icon">📄</div>
              <span className="ui-file-lightbox__fallback-name">{file.name}</span>
              <button type="button" className="ui-file-lightbox__download-btn" onClick={handleDownload}>
                Descargar archivo
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ── Main component ──────────────────────────────── */
export function FileUpload({ accept, multiple = false, value, onChange, maxFiles = 10, loading }) {
  const [localFiles, setLocalFiles] = useState([])
  const [dragOver, setDragOver] = useState(false)
  const [previewIndex, setPreviewIndex] = useState(null)
  const inputRef = useRef(null)

  // Merge value (remote/initial files) with locally added files
  const remoteFiles = (value || []).map(normaliseFile)
  const allFiles = [...remoteFiles, ...localFiles.map(normaliseFile)]

  function addFiles(newFiles) {
    const merged = multiple ? [...localFiles, ...newFiles].slice(0, Math.max(0, maxFiles - remoteFiles.length)) : [newFiles[0]]
    setLocalFiles(merged)
    if (onChange) onChange([...remoteFiles, ...merged.map(normaliseFile)])
  }

  function handleChange(e) {
    if (e.target.files?.length) addFiles(Array.from(e.target.files))
    e.target.value = ''
  }

  function handleDrop(e) {
    e.preventDefault()
    setDragOver(false)
    if (e.dataTransfer.files?.length) addFiles(Array.from(e.dataTransfer.files))
  }

  function removeFile(index) {
    if (index < remoteFiles.length) {
      // Removing a remote file — report to parent
      const nextRemote = remoteFiles.filter((_, i) => i !== index)
      if (onChange) onChange([...nextRemote, ...localFiles.map(normaliseFile)])
    } else {
      const localIndex = index - remoteFiles.length
      const nextLocal = localFiles.filter((_, i) => i !== localIndex)
      setLocalFiles(nextLocal)
      if (onChange) onChange([...remoteFiles, ...nextLocal.map(normaliseFile)])
    }
    setPreviewIndex(null)
  }

  if (loading) {
    return (
      <div className="ui-file-upload">
        <div className="ui-file-upload__dropzone" style={{ pointerEvents: 'none' }}>
          <Bone variant="circle" size={32} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-xs)' }}>
            <Bone variant="text" width={180} height={14} />
            <Bone variant="text" width={140} height={11} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="ui-file-upload">
      <div
        className={`ui-file-upload__dropzone ${dragOver ? 'is-dragover' : ''}`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <div className="ui-file-upload__dropzone-icon">↑</div>
        <div className="ui-file-upload__dropzone-text">
          <span className="ui-file-upload__dropzone-action">Haz click o arrastra archivos</span>
          <span className="ui-file-upload__dropzone-hint">
            {accept ? accept.replace(/,/g, ', ') : 'Todos los formatos'} · Máx {multiple ? `${maxFiles} archivos` : '1 archivo'}
          </span>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          className="ui-file-upload__input"
        />
      </div>
      {allFiles.length > 0 && (
        <div className="ui-file-upload__list">
          {allFiles.map((file, i) => (
            <FileRow
              key={`${file.name}-${i}`}
              file={file}
              onRemove={() => removeFile(i)}
              onPreview={() => setPreviewIndex(i)}
            />
          ))}
        </div>
      )}

      {previewIndex !== null && allFiles[previewIndex] && (
        <FileLightbox file={allFiles[previewIndex]} onClose={() => setPreviewIndex(null)} />
      )}
    </div>
  )
}
