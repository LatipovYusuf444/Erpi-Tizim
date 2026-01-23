export type DashboardStat = { title: string; value: number }

export type DashboardProductRank = {
  label: string
  value: number
  color?: string
}

export type DashboardCustomer = {
  sn: string
  name: string
  id: string
  phone: string
  status: "plus" | "minus" | "neutral"
  amount: number
}

export type DashboardWarehouseItem = {
  title: string
  value: number
  tone?: string
}

export type DashboardSaleRow = {
  sn: string
  client: string
  clientId: string
  saleId: string
  time: string
  price: number
  status: "done" | "pending"
}

export type DashboardResponse = {
  stats: DashboardStat[]
  productRank: DashboardProductRank[]
  customers: DashboardCustomer[]
  warehouse: DashboardWarehouseItem[]
  sales: DashboardSaleRow[]
}
