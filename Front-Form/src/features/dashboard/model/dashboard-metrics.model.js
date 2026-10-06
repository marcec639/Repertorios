/**
 * Modelo interno para métricas del dashboard.
 */
export function toDashboardMetricsModel(dto = {}) {
  return {
    totalSales: Number(dto.totalSales ?? 0),
    openOrders: Number(dto.openOrders ?? 0),
    lowStockItems: Number(dto.lowStockItems ?? 0),
    activeUsers: Number(dto.activeUsers ?? 0),
    updatedAt: dto.updatedAt ?? null
  }
}
