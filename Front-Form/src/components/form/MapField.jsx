import { useState, useRef, useEffect, useCallback } from 'react'
import { Bone } from '../feedback/Skeleton'
import './MapField.css'

/* ═══════════════════════════════════════════════════════════
   Google Maps script loader (singleton)
   ═══════════════════════════════════════════════════════════ */
let _loadPromise = null

function loadGoogleMaps(apiKey) {
  if (window.google?.maps?.Map) return Promise.resolve()
  if (_loadPromise) return _loadPromise

  _loadPromise = new Promise((resolve, reject) => {
    const cb = `__gm_cb_${Date.now()}`
    window[cb] = () => {
      delete window[cb]
      resolve()
    }
    const s = document.createElement('script')
    s.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&libraries=places&callback=${cb}`
    s.async = true
    s.onerror = () => {
      _loadPromise = null
      reject(new Error('Google Maps failed to load'))
    }
    document.head.appendChild(s)
  })
  return _loadPromise
}

/* ═══════════════════════════════════════════════════════════
   MapField
   ═══════════════════════════════════════════════════════════
   Props:
     apiKey            – Google Maps API key (required)
     value             – { lat, lng, name, description }
     onChange          – (value) => void
     mode              – "view" | "pick"   (default "view")
     showSearch        – boolean            (default false)
     showDetails       – boolean            (default false)
     zoom              – number             (default 15)
     height            – CSS height string  (default "400px")
     defaultCenter     – { lat, lng }
     searchPlaceholder – string
     namePlaceholder   – string
     descriptionPlaceholder – string
   ═══════════════════════════════════════════════════════════ */
export default function MapField({
  apiKey,
  value,
  onChange,
  mode = 'view',
  showSearch = false,
  showDetails = false,
  zoom = 15,
  height = '400px',
  defaultCenter = { lat: 9.9281, lng: -84.0907 },
  searchPlaceholder = 'Buscar lugar...',
  namePlaceholder = 'Nombre del lugar',
  descriptionPlaceholder = 'Descripción del lugar',
  loading,
}) {
  const containerRef = useRef(null)
  const mapRef = useRef(null)
  const markerRef = useRef(null)
  const infoRef = useRef(null)
  const searchRef = useRef(null)
  const onChangeRef = useRef(onChange)

  const [ready, setReady] = useState(!!window.google?.maps?.Map)
  const [name, setName] = useState(value?.name ?? '')
  const [description, setDescription] = useState(value?.description ?? '')

  // Keep onChange ref fresh
  useEffect(() => { onChangeRef.current = onChange }, [onChange])

  // Sync controlled value → local fields
  useEffect(() => { setName(value?.name ?? '') }, [value?.name])
  useEffect(() => { setDescription(value?.description ?? '') }, [value?.description])

  /* ── Place / move marker with optional info-window ── */
  const placeMarker = useCallback((lat, lng, label) => {
    const map = mapRef.current
    if (!map) return

    if (markerRef.current) {
      markerRef.current.setPosition({ lat, lng })
    } else {
      markerRef.current = new google.maps.Marker({ position: { lat, lng }, map })
    }

    if (label) {
      if (!infoRef.current) {
        infoRef.current = new google.maps.InfoWindow()
      }
      const el = document.createElement('div')
      el.style.cssText = 'font-family:Inter,system-ui,sans-serif;font-size:13px;max-width:240px;line-height:1.4'
      const strong = document.createElement('strong')
      strong.textContent = label
      el.appendChild(strong)
      infoRef.current.setContent(el)
      infoRef.current.open(map, markerRef.current)
    }
  }, [])

  /* ── Load script & init map ── */
  useEffect(() => {
    if (!apiKey) return
    let cancelled = false

    loadGoogleMaps(apiKey).then(() => {
      if (cancelled) return

      const center = value?.lat != null
        ? { lat: value.lat, lng: value.lng }
        : defaultCenter

      const map = new google.maps.Map(containerRef.current, {
        center,
        zoom,
        disableDefaultUI: true,
        zoomControl: true,
        gestureHandling: 'greedy',
      })
      mapRef.current = map

      // Initial marker
      if (value?.lat != null) {
        placeMarker(value.lat, value.lng, value.name)
      }

      // ── Pick mode: click → geocode → emit ──
      if (mode === 'pick') {
        const geocoder = new google.maps.Geocoder()

        map.addListener('click', (e) => {
          const lat = e.latLng.lat()
          const lng = e.latLng.lng()
          placeMarker(lat, lng, null)

          geocoder.geocode({ location: { lat, lng } }, (results, status) => {
            const addr = (status === 'OK' && results?.[0])
              ? results[0].formatted_address
              : ''
            placeMarker(lat, lng, addr)
            setName(addr)
            setDescription('')
            if (onChangeRef.current) {
              onChangeRef.current({ lat, lng, name: addr, description: '' })
            }
          })
        })
      }

      // ── Search autocomplete ──
      if (showSearch && searchRef.current) {
        const ac = new google.maps.places.Autocomplete(searchRef.current, {
          fields: ['geometry', 'name', 'formatted_address'],
        })
        ac.bindTo('bounds', map)

        ac.addListener('place_changed', () => {
          const place = ac.getPlace()
          if (!place.geometry?.location) return

          const lat = place.geometry.location.lat()
          const lng = place.geometry.location.lng()
          const pName = place.name || place.formatted_address || ''
          const pDesc = place.formatted_address || ''

          map.panTo({ lat, lng })
          map.setZoom(17)
          placeMarker(lat, lng, pName)

          setName(pName)
          setDescription(pDesc)
          if (onChangeRef.current) {
            onChangeRef.current({ lat, lng, name: pName, description: pDesc })
          }
        })
      }

      setReady(true)
    }).catch(console.error)

    return () => {
      cancelled = true
      if (markerRef.current) {
        markerRef.current.setMap(null)
        markerRef.current = null
      }
      if (infoRef.current) {
        infoRef.current.close()
        infoRef.current = null
      }
      mapRef.current = null
    }
  }, [apiKey]) // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Sync marker when value changes externally ── */
  useEffect(() => {
    if (!ready || !mapRef.current || value?.lat == null) return
    mapRef.current.panTo({ lat: value.lat, lng: value.lng })
    placeMarker(value.lat, value.lng, value.name)
  }, [ready, value?.lat, value?.lng, placeMarker]) // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Detail field handlers ── */
  const handleNameChange = (e) => {
    const v = e.target.value
    setName(v)
    if (onChangeRef.current) {
      onChangeRef.current({
        lat: value?.lat ?? null,
        lng: value?.lng ?? null,
        name: v,
        description,
      })
    }
  }

  const handleDescriptionChange = (e) => {
    const v = e.target.value
    setDescription(v)
    if (onChangeRef.current) {
      onChangeRef.current({
        lat: value?.lat ?? null,
        lng: value?.lng ?? null,
        name,
        description: v,
      })
    }
  }

  /* ── Render ── */
  if (loading) {
    return (
      <div className="ui-map-field">
        {showSearch && <Bone variant="rect" width="100%" height={38} />}
        <Bone variant="rect" width="100%" height={typeof height === 'number' ? height : parseInt(height) || 300} />
        {showDetails && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)', marginTop: 'var(--space-sm)' }}>
            <Bone variant="text" width="20%" height={12} />
            <Bone variant="rect" width="100%" height={38} />
            <Bone variant="text" width="25%" height={12} />
            <Bone variant="rect" width="100%" height={38} />
          </div>
        )}
      </div>
    )
  }

  if (!apiKey) {
    return (
      <div className="ui-map-field ui-map-field--empty" style={{ height }}>
        <span className="ui-map-field__no-key">Se requiere un API key de Google Maps</span>
      </div>
    )
  }

  return (
    <div className="ui-map-field">
      {showSearch && (
        <div className="ui-map-field__search">
          <svg className="ui-map-field__search-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="8.5" cy="8.5" r="5.5" />
            <path d="M13 13l4 4" />
          </svg>
          <input
            ref={searchRef}
            type="text"
            className="ui-map-field__search-input"
            placeholder={searchPlaceholder}
            autoComplete="off"
          />
        </div>
      )}

      <div className="ui-map-field__map-wrapper" style={{ height, position: 'relative' }}>
        {!ready && (
          <div className="ui-map-field__loader">
            <span className="ui-map-field__loader-dot" />
            <span className="ui-map-field__loader-dot" />
            <span className="ui-map-field__loader-dot" />
          </div>
        )}
        <div
          ref={containerRef}
          className="ui-map-field__map"
          style={{ height: '100%', width: '100%' }}
        />
      </div>

      {showDetails && (
        <div className="ui-map-field__details">
          <div className="ui-map-field__field">
            <label className="ui-map-field__label">Nombre</label>
            <input
              type="text"
              className="ui-control ui-map-field__input"
              value={name}
              onChange={handleNameChange}
              placeholder={namePlaceholder}
            />
          </div>
          <div className="ui-map-field__field">
            <label className="ui-map-field__label">Descripción</label>
            <input
              type="text"
              className="ui-control ui-map-field__input"
              value={description}
              onChange={handleDescriptionChange}
              placeholder={descriptionPlaceholder}
            />
          </div>
          {value?.lat != null && (
            <div className="ui-map-field__coords">
              <svg className="ui-map-field__coords-icon" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0a5.5 5.5 0 0 0-5.5 5.5C2.5 9.6 8 16 8 16s5.5-6.4 5.5-10.5A5.5 5.5 0 0 0 8 0zm0 7.5a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
              </svg>
              <span>{value.lat.toFixed(6)}, {value.lng.toFixed(6)}</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export { MapField }
