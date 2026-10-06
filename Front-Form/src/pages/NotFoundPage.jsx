import { useNavigate } from 'react-router-dom'
import { Button, Heading, Text, Stack } from '../components'
import './NotFoundPage.css'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="not-found">
      <div className="not-found__card">
        <span className="not-found__code">404</span>

        <Stack gap="xs">
          <Heading level={2}>Página no encontrada</Heading>
          <Text muted>
            La dirección que intentas visitar no existe o fue movida.
          </Text>
        </Stack>

        <div className="not-found__actions">
          <Button variant="primary" onClick={() => navigate('/')}>
            Ir al inicio
          </Button>
          <Button variant="ghost" onClick={() => navigate(-1)}>
            ← Volver atrás
          </Button>
        </div>
      </div>
    </div>
  )
}
