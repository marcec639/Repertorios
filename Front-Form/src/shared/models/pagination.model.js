/**
 * Modelo global compartido para paginación.
 */
export function toPaginationModel(dto = {}) {
  return {
    page: Number(dto.page ?? 1),
    pageSize: Number(dto.pageSize ?? 10),
    totalItems: Number(dto.totalItems ?? 0),
    totalPages: Number(dto.totalPages ?? 0)
  }
}
