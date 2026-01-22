import { http } from "@/shared/api/http"
import { endpoints } from "@/shared/api/endpoints"
import type { DashboardResponse } from "@/shared/types/dashboard"

const demoData: DashboardResponse = {
  stats: [
    { title: "Jami buyurtmalar soni", value: 250 },
    { title: "Tayyor buyurtmalar", value: 250 },
    { title: "Jarayondagi buyurtmalar", value: 250 },
    { title: "Kutilishdagi buyurtmalar", value: 250 },
    { title: "Bekor qilingan buyurtmalar", value: 250 },
  ],
  productRank: [
    { label: "Total applications", value: 500, color: "#16a34a" },
    { label: "Qoshimcha yuk", value: 80, color: "#f59e0b" },
    { label: "Stakan", value: 370, color: "#22c55e" },
    { label: "Tarelka", value: 50, color: "#ef4444" },
  ],
  customers: [
    { sn: "01", name: "Ustaboy Oyshanov", id: "20202020", phone: "99 999 99 99", status: "plus", amount: 250_000 },
    { sn: "02", name: "Ustaboy Oyshanov", id: "20202020", phone: "99 999 99 99", status: "neutral", amount: 0 },
  ],
  warehouse: [
    { title: "Tovar 1", value: 3000, tone: "text-slate-800" },
    { title: "Tovar 2", value: 1500, tone: "text-slate-800" },
    { title: "Tovar 3", value: 350, tone: "text-rose-500" },
  ],
  sales: Array.from({ length: 14 }).map((_, idx) => ({
    sn: String(idx + 1).padStart(2, "0"),
    client: "Yusuf Latipov",
    clientId: "20202020",
    saleId: "20202020",
    time: "11:00",
    price: 200_000,
    status: "pending",
  })),
}

export const dashboardApi = {
  async get(): Promise<DashboardResponse> {
    try {
      const res = await http.get<DashboardResponse>(endpoints.dashboard)
      return res.data
    } catch {
      // ✅ backend yo‘q bo‘lsa ham UI ishlayversin
      return demoData
    }
  },
}
