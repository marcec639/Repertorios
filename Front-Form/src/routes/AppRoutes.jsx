import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import DashboardPage from '../pages/DashboardPage'
import ListPanelPage from '../pages/ListPanelPage'
import NotFoundPage from '../pages/NotFoundPage'
import LoginPage from '../features/auth/pages/LoginPage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/list-panel"
        element={
          <ProtectedRoute>
            <ListPanelPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
