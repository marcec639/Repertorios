import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Accordion,
  Alert,
  Badge,
  Breadcrumbs,
  Button,
  Card,
  CheckboxField,
  Container,
  DatePicker,
  Divider,
  Drawer,
  EmptyState,
  Field,
  FileUpload,
  Grid,
  MapField,
  Skeleton,
  Toast,
  Heading,
  IconButton,
  Modal,
  Pagination,
  Popover,
  ProgressBar,
  RadioGroup,
  Section,
  SelectField,
  Spinner,
  Stack,
  Stat,
  SwitchField,
  Table,
  Tabs,
  Text,
  TextArea,
  TextInput,
} from '../../../components'
import { DocumentTree } from '../../../components/navigation/DocumentTree'
import { AppLayout, NavBar, SidebarNav } from '../../../layouts'
import './DashboardPage.css'

export default function DashboardPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('workflows')
  const [activeNav, setActiveNav] = useState('workflows')
  const [page, setPage] = useState(1)
  const [progress, setProgress] = useState(52)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [birthday, setBirthday] = useState('')
  const [toasts, setToasts] = useState([])

  const addToast = (toast) => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, ...toast }])
  }
  const removeToast = (id) => setToasts((prev) => prev.filter((t) => t.id !== id))
  const [mapLocation, setMapLocation] = useState({
    lat: 9.9281,
    lng: -84.0907,
    name: 'San José, Costa Rica',
    description: 'Capital de Costa Rica',
  })
  const [pageLoading, setPageLoading] = useState(false)

  const tabs = [
    { id: 'workflows', label: 'Workflows' },
    { id: 'permissions', label: 'Permissions' },
    { id: 'executions', label: 'Executions' },
  ]

  const navItems = [
    { id: 'workflows', label: 'Workflows' },
    { id: 'permissions', label: 'Permissions' },
    { id: 'executions', label: 'Executions' },
  ]

  const sideSections = [
    {
      title: 'Projects',
      items: [
        { label: 'Dashboard', count: 0, active: true, icon: '☰' },
        { label: 'Library', icon: '▦' },
        {
          label: 'Threads',
          icon: '◩',
          defaultOpen: true,
          children: [
            { label: 'Fignuts', icon: '◫' },
            { label: 'Enlarz System', icon: '◫' },
            { label: 'Hugeicons', icon: '◫' },
          ],
        },
        { label: 'Shared Projects', icon: '↗' },
      ],
    },
    {
      title: 'Status',
      items: [
        { label: 'New', count: 3, icon: '◉' },
        {
          label: 'Drafts',
          count: 3,
          icon: '◧',
          submenu: [
            { label: 'General', icon: '▤' },
            { label: 'Drafts', icon: '▤' },
            { label: 'Feedback', icon: '▤' },
          ],
        },
        { label: 'Updates', count: 2, icon: '♦' },
        { label: 'Team Review', icon: '⚑' },
      ],
    },
    {
      title: 'History',
      items: [
        { label: 'Recently Edited', icon: '⟲' },
        {
          label: 'Folders',
          count: 6,
          icon: '◫',
          submenu: [
            { label: 'Archive', icon: '▤' },
            { label: "Favourite's", icon: '☆' },
            { label: 'Backups', icon: '▤' },
          ],
        },
        { label: 'Archive', icon: '▣' },
      ],
    },
  ]

  const documents = [
    {
      label: "System Management's",
      count: 12,
      children: [
        {
          label: "2025 Update's",
          count: 2,
          children: [
            { label: 'Hiring Process', count: 4 },
            { label: 'Billing Process', count: 3 },
          ],
        },
        { label: 'Fundamentals', count: 4 },
      ],
    },
    { label: 'Off Grid Servers', count: 5 },
  ]

  const columns = [
    { key: 'name', label: 'Nombre', filter: 'text' },
    {
      key: 'role',
      label: 'Rol',
      filter: {
        type: 'select',
        options: [
          { value: 'Admin', label: 'Admin' },
          { value: 'Editor', label: 'Editor' },
          { value: 'Viewer', label: 'Viewer' },
        ],
      },
    },
    {
      key: 'status',
      label: 'Estado',
      filter: {
        type: 'select',
        options: [
          { value: 'Active', label: 'Active' },
          { value: 'Invited', label: 'Invited' },
          { value: 'Suspended', label: 'Suspended' },
        ],
      },
      render: (value) => (
        <Badge tone={value === 'Active' ? 'success' : value === 'Invited' ? 'info' : 'warning'}>
          {value}
        </Badge>
      ),
    },
    { key: 'joined', label: 'Ingreso', filter: 'daterange', hideOnMobile: true },
  ]

  const rows = [
    { id: '1', name: 'Andrea Mora', role: 'Admin',  status: 'Active',    joined: '2025-11-02' },
    { id: '2', name: 'Luis Vega',   role: 'Editor', status: 'Invited',   joined: '2026-01-14' },
    { id: '3', name: 'Sofia Ruiz',  role: 'Viewer', status: 'Suspended', joined: '2026-03-21' },
  ]

  return (
    <AppLayout
      sidebar={
        <div className="app-sidebar">
          <div className="app-sidebar__profile">
            <div className="app-sidebar__avatar">JD</div>
            <div className="app-sidebar__profile-info">
              <span className="app-sidebar__name">
                John Doe <span className="app-sidebar__chevron">›</span>
              </span>
              <span className="app-sidebar__mail">customerpop@gmail.com</span>
            </div>
          </div>

          <SidebarNav sections={sideSections} />

          <div className="app-sidebar__documents">
            <div className="app-sidebar__documents-header">
              <span className="app-sidebar__section-title">Documents</span>
              <button className="app-sidebar__add-btn" type="button">+</button>
            </div>
            <div className="app-sidebar__search">
              <TextInput placeholder="Search" />
            </div>
            <DocumentTree nodes={documents} />
          </div>
        </div>
      }
    >
      <Container>
        {/* ── Loading toggle (floating) ──────────────────── */}
        <button
          onClick={() => setPageLoading((p) => !p)}
          className="app-loading-toggle"
          title={pageLoading ? 'Desactivar loading' : 'Activar loading'}
        >
          {pageLoading ? '⏹ Stop' : '▶ Loading'}
        </button>

        {/* ── Dashboard Hero ─────────────────────────────── */}
        <Section>
          <Stack gap="sm">
            <Breadcrumbs
              items={[
                { label: 'Dashboard', href: '#' },
                { label: 'UI System', href: '#' },
                { label: 'Componentes' },
              ]}
            />
            <NavBar items={navItems} activeItem={activeNav} onChange={setActiveNav} />
          </Stack>
        </Section>

        {/* ── Sub-sidebar / ListPanel demo ──────────────── */}
        <Section
          title="Sub-sidebar (ListPanel)"
          subtitle="Navegador de lista maestro–detalle tipo Membresías"
        >
          <Card
            title="ListPanel"
            subtitle="Buscador, filtro, lista seleccionable y panel de detalle"
            footer={
              <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end', gap: 'var(--space-xs)' }}>
                <Button variant="secondary" onClick={() => navigate('/list-panel')}>
                  Abrir demo →
                </Button>
              </div>
            }
          >
            <Text tone="muted">
              Componente reutilizable para construir vistas tipo master–detail
              (Planes, Miembros, Coaches, etc.) manteniendo el estilo del sistema.
            </Text>
          </Card>
        </Section>

        {/* ── Typography y acciones ──────────────────────── */}
        <Section title="Typography y acciones" subtitle="Texto, botones e interacción básica">
          <Stack>
            <Heading as="h2" loading={pageLoading}>Encabezados y texto</Heading>
            <Text loading={pageLoading}>Texto principal para contenido relevante de una sección.</Text>
            <Text tone="muted" loading={pageLoading}>Texto secundario para ayuda contextual.</Text>
            <Grid columns={3}>
              <Button loading={pageLoading}>Primary</Button>
              <Button variant="secondary" loading={pageLoading}>Secondary</Button>
              <Button variant="ghost" loading={pageLoading}>Ghost</Button>
            </Grid>
            <IconButton icon="⋯" label="Mas acciones" />
            <div className="app-inline-row">
              <Badge tone="info">Info</Badge>
              <Badge tone="success">Success</Badge>
              <Badge tone="warning">Warning</Badge>
            </div>
          </Stack>
        </Section>

        {/* ── Formularios ────────────────────────────────── */}
        <Section title="Formularios" subtitle="Todos los controles base reutilizables">
          <Grid columns={2}>
            <Stack>
              <Field label="Nombre" loading={pageLoading}>
                <TextInput placeholder="Escribe tu nombre" />
              </Field>
              <Field label="Correo" helperText="Usaremos este correo para notificaciones." loading={pageLoading}>
                <TextInput type="email" placeholder="nombre@empresa.com" />
              </Field>
              <Field label="Rol" loading={pageLoading}>
                <SelectField
                  options={[
                    { value: 'admin', label: 'Admin' },
                    { value: 'editor', label: 'Editor' },
                    { value: 'viewer', label: 'Viewer' },
                  ]}
                />
              </Field>
              <Field label="Notas" loading={pageLoading}>
                <TextArea placeholder="Notas internas..." />
              </Field>
              <Field label="Fecha de nacimiento" helperText="Selecciona una fecha del calendario." loading={pageLoading}>
                <DatePicker
                  value={birthday}
                  onChange={(iso) => setBirthday(iso)}
                  placeholder="dd/mm/aaaa"
                  loading={pageLoading}
                />
              </Field>
            </Stack>
            <Stack>
              <CheckboxField label="Aceptar terminos" defaultChecked loading={pageLoading} />
              <RadioGroup
                name="plan"
                loading={pageLoading}
                options={[
                  { value: 'basic', label: 'Plan basico' },
                  { value: 'pro', label: 'Plan pro', checked: true },
                ]}
              />
              <SwitchField
                label="Notificaciones activas"
                checked={notificationsEnabled}
                onChange={(event) => setNotificationsEnabled(event.target.checked)}
                loading={pageLoading}
              />
              <Divider label="Acciones" />
              <Grid columns={2}>
                <Button type="submit" loading={pageLoading}>Guardar</Button>
                <Button variant="secondary" type="reset" loading={pageLoading}>Limpiar</Button>
              </Grid>
            </Stack>
          </Grid>
        </Section>

        {/* ── Navegación ─────────────────────────────────── */}
        <Section title="Navegación" subtitle="Componentes para flujo y cambio de vistas">
          <Stack>
            <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
            <Text>
              Tab activa: <span className="ui-code">{activeTab}</span>
            </Text>
            <Pagination
              page={page}
              totalPages={8}
              onPrevious={() => setPage((c) => Math.max(1, c - 1))}
              onNext={() => setPage((c) => Math.min(8, c + 1))}
            />
          </Stack>
        </Section>

        {/* ── Feedback ───────────────────────────────────── */}
        <Section title="Feedback" subtitle="Estados, progreso y mensajes">
          <Stack>
            <Alert tone="info" title="Información">
              Tu perfil fue actualizado correctamente.
            </Alert>
            <Alert tone="warning" title="Atención">
              Quedan 3 días para renovar la suscripción.
            </Alert>
            <Grid columns={2}>
              <Stack>
                <Text tone="muted">Progreso de onboarding</Text>
                <ProgressBar value={progress} />
                <Button
                  variant="secondary"
                  onClick={() => setProgress((v) => Math.min(100, v + 8))}
                >
                  Avanzar progreso
                </Button>
              </Stack>
              <Stack>
                <Text tone="muted">Cargando...</Text>
                <Spinner />
              </Stack>
            </Grid>
            <EmptyState
              title="No hay resultados"
              message="Todavía no tienes elementos en esta vista. Crea el primero para comenzar."
              actionLabel="Crear elemento"
              onAction={() => setIsModalOpen(true)}
            />
          </Stack>
        </Section>

        {/* ── Toast / Notificaciones ────────────────────── */}
        <Section title="Notificaciones" subtitle="Toasts personalizables con acciones, duración y tonos">
          <Stack>
            <Text tone="muted">Ejemplos estáticos (siempre visibles):</Text>
            <Toast
              tone="warning"
              title="Data disponible"
              actions={[
                { label: '✓', onClick: () => {} },
                { label: '+5', onClick: () => {} },
              ]}
              dismissible={false}
              onDismiss={() => {}}
            >
              Nuevos datos disponibles en esta tabla, ¿desea actualizar el contenido?
            </Toast>

            <Toast
              tone="success"
              title="Guardado exitoso"
              actions={[
                { label: 'Deshacer', onClick: () => {} },
              ]}
              dismissible={false}
              onDismiss={() => {}}
            >
              Los cambios se guardaron correctamente.
            </Toast>

            <Toast
              tone="danger"
              title="Error de conexión"
              actions={[
                { label: 'Reintentar', variant: 'primary', onClick: () => {} },
                { label: 'Ignorar', onClick: () => {} },
              ]}
              dismissible={false}
              onDismiss={() => {}}
            >
              No se pudo conectar con el servidor. Verifique su red.
            </Toast>

            <Toast
              tone="info"
              title="Actualización disponible"
              dismissible={false}
              onDismiss={() => {}}
            >
              Versión 2.4.0 lista para instalar.
            </Toast>

            <Divider label="Toasts dinámicos" />
            <Text tone="muted">Presioná un botón para lanzar un toast flotante:</Text>
            <div className="app-inline-row">
              <Button
                variant="secondary"
                onClick={() => addToast({
                  tone: 'warning',
                  title: 'Data disponible',
                  children: 'Nuevos datos disponibles en esta tabla, ¿desea actualizar el contenido?',
                  actions: [{ label: '✓' }, { label: '+5' }],
                  duration: 0,
                })}
              >
                Persistente
              </Button>
              <Button
                variant="secondary"
                onClick={() => addToast({
                  tone: 'success',
                  title: 'Acción completada',
                  children: 'Tu perfil fue actualizado correctamente.',
                  duration: 4000,
                })}
              >
                4s auto-dismiss
              </Button>
              <Button
                variant="secondary"
                onClick={() => addToast({
                  tone: 'danger',
                  title: 'Error crítico',
                  children: 'No se pudo procesar la solicitud.',
                  actions: [{ label: 'Reintentar', variant: 'primary' }],
                  duration: 6000,
                })}
              >
                Con acción + 6s
              </Button>
            </div>

            {/* Floating toasts container */}
            <div className="ui-toast-container ui-toast-container--top-right" style={{ position: 'fixed' }}>
              {toasts.map((t) => (
                <Toast key={t.id} {...t} onDismiss={() => removeToast(t.id)} />
              ))}
            </div>
          </Stack>
        </Section>

        {/* ── Data display ───────────────────────────────── */}
        <Section title="Data display" subtitle="Tarjetas, métricas y tablas">
          <Stack>
            <Grid columns={3}>
              <Card loading={pageLoading} title="Ingresos mensuales" subtitle="Total acumulado">
                <Stat loading={pageLoading} label="Total" value="$28,450" change="+11.2%" />
              </Card>
              <Card
                loading={pageLoading}
                title="Usuarios activos"
                headerActions={<Badge tone="success">Live</Badge>}
              >
                <Stat loading={pageLoading} label="Últimos 30 días" value="5,120" change="+4.1%" />
              </Card>
              <Card loading={pageLoading} title="Churn" subtitle="Tasa mensual">
                <Stat loading={pageLoading} label="Mensual" value="2.8%" change="-0.6%" />
              </Card>
            </Grid>
            <Card loading={pageLoading} title="Executions">
              <Stat loading={pageLoading} label="Executions" value="340" change="+204%" size="lg" />
            </Card>
            <Card
              title="Equipo"
              subtitle="Miembros del proyecto · filtros por columna (texto, select, daterange) + responsive"
              headerActions={<IconButton icon="⋯" label="Opciones" />}
              footer={
                <Button variant="ghost" onClick={() => setIsDrawerOpen(true)}>
                  Abrir panel
                </Button>
              }
            >
              <Table
                loading={pageLoading}
                columns={columns}
                rows={rows}
                emptyMessage="No hay miembros que coincidan con los filtros"
              />
            </Card>
          </Stack>
        </Section>

        {/* ── Accordion ──────────────────────────────────── */}
        <Section title="Accordion" subtitle="Secciones colapsables para contenido extenso">
          <Stack>
            <Accordion loading={pageLoading}>
              <Accordion.Item title="¿Cómo funciona la facturación?" defaultOpen>
                El cobro se realiza de forma mensual al inicio del periodo. Puedes cancelar en cualquier momento desde la configuración de tu cuenta.
              </Accordion.Item>
              <Accordion.Item title="¿Puedo cambiar de plan?">
                Sí, puedes subir o bajar de plan desde el panel de administración. Los cambios se aplican en el siguiente ciclo de facturación.
              </Accordion.Item>
              <Accordion.Item title="¿Qué métodos de pago aceptan?">
                Aceptamos tarjeta de crédito/débito, transferencia bancaria y PayPal. Todos los pagos se procesan de forma segura.
              </Accordion.Item>
              <Accordion.Item title="¿Ofrecen soporte técnico?">
                Contamos con soporte 24/7 vía chat y email. Los planes Pro y Enterprise incluyen soporte prioritario con tiempo de respuesta garantizado.
              </Accordion.Item>
            </Accordion>
          </Stack>
        </Section>

        {/* ── Popover ────────────────────────────────────── */}
        <Section title="Popover" subtitle="Mini card flotante desde un botón">
          <Stack>
            <div className="app-inline-row">
              <Popover
                trigger={<Button variant="secondary">Perfil de usuario</Button>}
                width="280px"
              >
                <Stack gap="sm">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                    <div className="app-sidebar__avatar" style={{ width: 36, height: 36, fontSize: 13 }}>JD</div>
                    <div>
                      <Text><strong>John Doe</strong></Text>
                      <Text tone="muted" style={{ fontSize: 'var(--text-xs)' }}>Admin · Activo</Text>
                    </div>
                  </div>
                  <Divider />
                  <Text tone="muted" style={{ fontSize: 'var(--text-xs)' }}>Correo: customerpop@gmail.com</Text>
                  <Text tone="muted" style={{ fontSize: 'var(--text-xs)' }}>Último acceso: hace 2 min</Text>
                  <Button variant="secondary" style={{ width: '100%' }}>Ver perfil completo</Button>
                </Stack>
              </Popover>

              <Popover
                trigger={<IconButton icon="⋯" label="Más opciones" />}
                align="start"
                width="200px"
              >
                <Stack gap="xs">
                  <Button variant="ghost" style={{ width: '100%', justifyContent: 'flex-start' }}>Editar</Button>
                  <Button variant="ghost" style={{ width: '100%', justifyContent: 'flex-start' }}>Duplicar</Button>
                  <Divider />
                  <Button variant="ghost" style={{ width: '100%', justifyContent: 'flex-start', color: 'var(--color-danger)' }}>Eliminar</Button>
                </Stack>
              </Popover>
            </div>
          </Stack>
        </Section>

        {/* ── File Upload ────────────────────────────────── */}
        <Section title="Archivos" subtitle="Selector, preview y descarga de archivos">
          <Grid columns={2}>
            <Card title="Subir imágenes" subtitle="JPG, PNG, GIF — click en thumb para preview" loading={pageLoading}>
              <FileUpload accept="image/*" multiple maxFiles={5} loading={pageLoading} />
            </Card>
            <Card title="Archivos remotos (DB)" subtitle="Precargar archivos con URL para preview y descarga" loading={pageLoading}>
              <FileUpload
                accept="image/*,.pdf"
                multiple
                maxFiles={5}
                loading={pageLoading}
                value={[
                  { name: 'paisaje-montaña.jpg', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop', type: 'image/jpeg', size: 245000 },
                  { name: 'oficina-moderna.jpg', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop', type: 'image/jpeg', size: 182000 },
                  { name: 'reporte-Q1-2026.pdf', url: '#', type: 'application/pdf', size: 1240000 },
                ]}
              />
            </Card>
          </Grid>
        </Section>

        {/* ── MapField ────────────────────────────────── */}
        <Section title="MapField" subtitle="Mapa interactivo con búsqueda y selección de ubicación">
          <Stack>
            <Grid columns={2}>
              <Card title="Solo visualización" subtitle="mode=view" loading={pageLoading}>
                <MapField
                  apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                  value={{ lat: 9.9281, lng: -84.0907 }}
                  mode="view"
                  height="240px"
                  loading={pageLoading}
                />
              </Card>
              <Card title="Seleccionar + buscar" subtitle="mode=pick, showSearch" loading={pageLoading}>
                <MapField
                  apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                  value={mapLocation}
                  onChange={setMapLocation}
                  mode="pick"
                  showSearch
                  height="240px"
                  loading={pageLoading}
                />
              </Card>
            </Grid>
            <Card title="Completo: mapa + buscador + detalles" subtitle="Todos los módulos activos" loading={pageLoading}>
              <MapField
                apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                value={mapLocation}
                onChange={setMapLocation}
                mode="pick"
                showSearch
                showDetails
                height="360px"
                loading={pageLoading}
              />
            </Card>
          </Stack>
        </Section>

        {/* ── Cards avanzados ────────────────────────────── */}
        <Section title="Cards avanzados" subtitle="Header, body y footer completos">
          <Grid columns={3}>
            <Card
              loading={pageLoading}
              cover="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=360&fit=crop"
              title="Lago de montaña"
              subtitle="Paisaje natural"
              footer={
                <div style={{ display: 'flex', gap: 'var(--space-xs)', width: '100%', justifyContent: 'flex-end' }}>
                  <Button variant="ghost" size="sm">Compartir</Button>
                  <Button size="sm">Ver más</Button>
                </div>
              }
            >
              <Text tone="secondary" style={{ fontSize: 'var(--text-sm)' }}>
                Un lago rodeado de montañas nevadas capturado al amanecer con reflejos perfectos en el agua.
              </Text>
            </Card>
            <Card
              loading={pageLoading}
              cover="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=360&fit=crop"
              title="Espacio de trabajo"
              subtitle="Diseño interior"
            >
              <Stack gap="xs">
                <Text tone="secondary" style={{ fontSize: 'var(--text-sm)' }}>
                  Oficina moderna con iluminación natural y mobiliario minimalista.
                </Text>
                <div className="app-inline-row">
                  <Badge>Diseño</Badge>
                  <Badge tone="info">Tendencia</Badge>
                </div>
              </Stack>
            </Card>
            <Card
              loading={pageLoading}
              cover="https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=360&fit=crop"
              title="Circuito electrónico"
              subtitle="Tecnología"
              footer={
                <Text tone="muted" style={{ fontSize: 'var(--text-xs)' }}>Publicado: 17 abr 2026</Text>
              }
            >
              <Text tone="secondary" style={{ fontSize: 'var(--text-sm)' }}>
                Macro fotografía de un circuito impreso con componentes electrónicos iluminados.
              </Text>
            </Card>
          </Grid>
          <Grid columns={2} style={{ marginTop: 'var(--space-lg)' }}>
            <Card
              loading={pageLoading}
              title="Resumen del proyecto"
              subtitle="Actualizado hace 5 min"
              headerActions={
                <div className="app-inline-row">
                  <Badge tone="success">Activo</Badge>
                  <IconButton icon="⋯" label="Opciones" />
                </div>
              }
              footer={
                <div style={{ display: 'flex', gap: 'var(--space-sm)', width: '100%', justifyContent: 'flex-end' }}>
                  <Button variant="ghost">Descartar</Button>
                  <Button>Guardar cambios</Button>
                </div>
              }
            >
              <Stack gap="sm">
                <Text>El proyecto cuenta con 12 tareas completadas de 18 planeadas.</Text>
                <ProgressBar value={67} />
                <Text tone="muted" style={{ fontSize: 'var(--text-xs)' }}>67% completado</Text>
              </Stack>
            </Card>
            <Card
              loading={pageLoading}
              title="Configuración de alertas"
              subtitle="Notificaciones del sistema"
              footer={
                <Text tone="muted" style={{ fontSize: 'var(--text-xs)' }}>Última modificación: 14 abr 2026</Text>
              }
            >
              <Stack gap="sm">
                <SwitchField label="Email al crear tarea" checked onChange={() => {}} loading={pageLoading} />
                <SwitchField label="Push al completar" checked={false} onChange={() => {}} loading={pageLoading} />
                <SwitchField label="Resumen semanal" checked onChange={() => {}} loading={pageLoading} />
              </Stack>
            </Card>
          </Grid>
        </Section>

      </Container>

      <Modal open={isModalOpen} title="Crear elemento" onClose={() => setIsModalOpen(false)}>
        <Stack>
          <Text>Este modal ya está listo para reutilizarse en cualquier flujo CRUD.</Text>
          <Button onClick={() => setIsModalOpen(false)}>Cerrar</Button>
        </Stack>
      </Modal>

      <Drawer open={isDrawerOpen} title="Panel lateral" onClose={() => setIsDrawerOpen(false)} loading={pageLoading}>
        <Stack>
          <Text>Usa este drawer para filtros, detalles o configuración contextual.</Text>
          <Button variant="secondary" onClick={() => setIsDrawerOpen(false)}>
            Cerrar panel
          </Button>
        </Stack>
      </Drawer>
    </AppLayout>
  )
}
