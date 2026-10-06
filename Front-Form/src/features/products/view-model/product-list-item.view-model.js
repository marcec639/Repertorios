/**
 * ViewModel para filas de tabla/lista de productos.
 */
export function toProductListItemViewModel(model = {}) {
  return {
    id: model.id,
    title: model.name,
    sku: model.sku,
    priceLabel: formatCurrency(model.price),
    stockLabel: String(model.stock ?? 0),
    statusLabel: model.isActive ? 'Activo' : 'Inactivo'
  }
}

function formatCurrency(value) {
  return new Intl.NumberFormat('es-CR', {
    style: 'currency',
    currency: 'CRC',
    maximumFractionDigits: 0
  }).format(Number(value ?? 0))
}
