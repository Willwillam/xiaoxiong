export interface DashboardData {
  totalUsers: number
  totalOrders: number
  totalSales: number
  totalProducts: number
}

export const getDashboardData = () => {
  return new Promise<DashboardData>((resolve) => {
    setTimeout(() => {
      resolve({
        totalUsers: 1000,
        totalOrders: 5280,
        totalSales: 126500,
        totalProducts: 85
      })
    }, 300)
  })
} 