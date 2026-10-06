/**
 * ViewModel para tarjetas de resumen del dashboard.
 */
export function toDashboardSummaryViewModel(model = {}) {
  return [
    {
      key: 'sales',
      label: 'Ventas totales',
      value: formatCurrency(model.totalSales)
    },
    {
      key: 'orders',
      label: 'Pedidos abiertos',
      value: String(model.openOrders ?? 0)
    },
    {
      key: 'stock',
      label: 'Productos con stock bajo',
      value: String(model.lowStockItems ?? 0)
    },
    {
      key: 'users',
      label: 'Usuarios activos',
      value: String(model.activeUsers ?? 0)
    }
  ]
}

function formatCurrency(value) {
  return new Intl.NumberFormat('es-CR', {
    style: 'currency',
    currency: 'CRC',
    maximumFractionDigits: 0
  }).format(Number(value ?? 0))
}
