/**
 * Modelo de producto usado internamente por la feature.
 */
export function toProductModel(dto = {}) {
  const price = Number(dto.price ?? 0)

  return {
    id: dto.id ?? null,
    name: dto.name ?? '',
    sku: dto.sku ?? '',
    price,
    stock: Number(dto.stock ?? 0),
    isActive: Boolean(dto.isActive),
    updatedAt: dto.updatedAt ?? null
  }
}
