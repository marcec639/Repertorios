import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Badge,
  Breadcrumbs,
  Button,
  Card,
  Container,
  Divider,
  EmptyState,
  Grid,
  Heading,
  IconButton,
  ListPanel,
  Section,
  SelectField,
  Stack,
  Stat,
  Text,
} from '../../../components'
import { AppLayout } from '../../../layouts'
import './ListPanelPage.css'

const PLANS = [
  {
    id: 'detroit',
    avatar: 'DE',
    title: 'detroit',
    subtitle: '₡40 000 · 7 días',
    status: { label: 'Inactivo', tone: 'warning' },
    price: '₡40 000',
    duration: '7 días',
    members: 0,
    createdAt: '15 abr 2026',
    active: false,
  },
  {
    id: 'youtube',
    avatar: 'ME',
    title: 'membresia youtube',
    subtitle: '₡30 015 · 15 días',
    status: { label: 'Inactivo', tone: 'warning' },
    price: '₡30 015',
    duration: '15 días',
    members: 2,
    createdAt: '02 abr 2026',
    active: false,
  },
  {
    id: 'regular',
    avatar: 'RE',
    title: 'Regular nuevo',
    subtitle: '$6.03 · 1 mes',
    status: { label: 'Activo', tone: 'success' },
    price: '$6.03',
    duration: '1 mes',
    members: 12,
    createdAt: '28 mar 2026',
    active: true,
  },
]

export default function ListPanelPage() {
  const navigate = useNavigate()
  const [selectedId, setSelectedId] = useState(PLANS[0].id)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')

  const filtered = useMemo(() => {
    return PLANS.filter((p) => {
      const matchesQuery = p.title.toLowerCase().includes(query.toLowerCase())
      const matchesFilter =
        filter === 'all' ||
        (filter === 'active' && p.active) ||
        (filter === 'inactive' && !p.active)
      return matchesQuery && matchesFilter
    })
  }, [query, filter])

  const selected = PLANS.find((p) => p.id === selectedId) ?? null

  return (
    <AppLayout>
      <Container>
        <Section>
          <Stack gap="sm">
            <Breadcrumbs
              items={[
                { label: 'Dashboard', href: '/' },
                { label: 'ListPanel' },
              ]}
            />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-md)' }}>
              <Heading as="h2">ListPanel · Demo</Heading>
              <Button variant="secondary" onClick={() => navigate('/')}>
                ← Volver al Dashboard
              </Button>
            </div>
            <Text tone="muted">
              Sub-sidebar reutilizable con buscador, filtro, lista seleccionable
              y panel de detalle al lado. Basado en el estilo actual del sistema.
            </Text>
          </Stack>
        </Section>

        <Section title="Master — Detail" subtitle="Membresías">
          <div className="list-panel-demo">
            <ListPanel
              title="Planes"
              meta={`${PLANS.length} planes`}
              action={
                <Button size="sm" variant="primary">
                  + Nuevo
                </Button>
              }
              searchValue={query}
              onSearchChange={setQuery}
              searchPlaceholder="Buscar plan..."
              filter={
                <SelectField
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  options={[
                    { value: 'all', label: 'Todos los planes' },
                    { value: 'active', label: 'Activos' },
                    { value: 'inactive', label: 'Inactivos' },
                  ]}
                />
              }
              items={filtered}
              activeId={selectedId}
              onSelect={(item) => setSelectedId(item.id)}
              emptyLabel="Sin planes"
            />

            <div className="list-panel-demo__detail">
              {selected ? (
                <Stack>
                  <Card
                    title={selected.title}
                    subtitle={`${selected.price} · ${selected.duration}`}
                    headerActions={
                      <div style={{ display: 'flex', gap: 'var(--space-xs)' }}>
                        <IconButton icon="⏻" label="Activar/Desactivar" />
                        <IconButton icon="✎" label="Editar" />
                        <IconButton icon="🗑" label="Eliminar" />
                      </div>
                    }
                  >
                    <Stack>
                      <Text tone="muted" style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Información del plan
                      </Text>
                      <Grid columns={3}>
                        <Stat label="Precio" value={selected.price} />
                        <Stat label="Duración" value={selected.duration} />
                        <Stat label="Miembros" value={String(selected.members)} />
                      </Grid>
                      <Divider />
                      <Grid columns={2}>
                        <Stack gap="xs">
                          <Text tone="muted" style={{ fontSize: 'var(--text-xs)' }}>NOMBRE</Text>
                          <Text>{selected.title}</Text>
                        </Stack>
                        <Stack gap="xs">
                          <Text tone="muted" style={{ fontSize: 'var(--text-xs)' }}>ESTADO</Text>
                          <Badge tone={selected.status.tone}>{selected.status.label}</Badge>
                        </Stack>
                        <Stack gap="xs">
                          <Text tone="muted" style={{ fontSize: 'var(--text-xs)' }}>INACTIVIDAD MÁXIMA</Text>
                          <Text>Sin límite</Text>
                        </Stack>
                        <Stack gap="xs">
                          <Text tone="muted" style={{ fontSize: 'var(--text-xs)' }}>CREADO</Text>
                          <Text>{selected.createdAt}</Text>
                        </Stack>
                      </Grid>
                    </Stack>
                  </Card>

                  <Card title={`Miembros suscritos (${selected.members})`}>
                    {selected.members === 0 ? (
                      <EmptyState
                        title="Sin miembros"
                        message="Sin miembros suscritos a este plan"
                      />
                    ) : (
                      <Text tone="muted">
                        Este plan tiene {selected.members} miembro(s) suscrito(s).
                      </Text>
                    )}
                  </Card>
                </Stack>
              ) : (
                <EmptyState
                  title="Selecciona un plan"
                  message="Elige un plan de la lista para ver su información."
                />
              )}
            </div>
          </div>
        </Section>
      </Container>
    </AppLayout>
  )
}
