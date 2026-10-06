/**
 * Estado inicial para pantalla de login.
 */
export function createLoginFormViewModel() {
  return {
    username: '',
    password: '',
    loading: false,
    errorMessage: ''
  }
}

/**
 * Mapea el estado del formulario al DTO que espera el endpoint.
 */
export function toLoginRequestDto(form = {}) {
  return {
    username: (form.username ?? '').trim(),
    password: form.password ?? ''
  }
}
