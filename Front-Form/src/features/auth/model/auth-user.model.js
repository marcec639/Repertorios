/**
 * Normaliza el payload de usuario autenticado al modelo de dominio del front.
 */
export function toAuthUserModel(dto = {}) {
  return {
    id: dto.id ?? null,
    fullName: dto.fullName ?? '',
    email: dto.email ?? '',
    role: dto.role ?? 'user',
    token: dto.token ?? ''
  }
}
