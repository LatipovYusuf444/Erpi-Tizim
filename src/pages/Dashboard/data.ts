export type StatItem = {
  title: string;
  value: string;
  sub: string;
}

export const STATS: StatItem[] = [
  { title: "Total Earnings", value: "$125,450", sub: "This month" },
  { title: "Products Sold", value: "$8,760", sub: "units this month" },
  { title: "Best Selling Category", value: "Electronics", sub: "this quarter" },
  { title: "Best Selling Product", value: "Wireless Headsets", sub: "this year" },
]

export type SaleRow = {
  productName: string;
  quantity: number;
  price: number;
  date: string;
}

export const RECENT_SALES: SaleRow[] = [
  { productName: "Wireless Mouse", quantity: 5, price: 250, date: "2024-07-28" },
  { productName: "Mechanical Keyboard", quantity: 2, price: 180, date: "2024-07-27" },
  { productName: "Gaming Monitor", quantity: 1, price: 499, date: "2024-07-26" },
  { productName: "USB-C Hub", quantity: 10, price: 150, date: "2024-07-25" },
  { productName: "External SSD 1TB", quantity: 3, price: 300, date: "2024-07-24" },
]

export const SALES_SERIES = [
  { label: "Jan", value: 2000 },
  { label: "Feb", value: 2150 },
  { label: "Mar", value: 2550 },
  { label: "Apr", value: 2350 },
  { label: "May", value: 2750 },
  { label: "Jun", value: 2950 },
]



