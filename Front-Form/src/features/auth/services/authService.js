import { apiClient } from '../../../services/apiClient'

export async function login({ username, password }) {
  const data = await apiClient.post('/auth/login', { username, password })
  return data // expects { token, user? } from backend
}
