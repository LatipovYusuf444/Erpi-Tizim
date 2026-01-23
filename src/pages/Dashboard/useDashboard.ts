import { useQuery } from "@tanstack/react-query"
import { dashboardApi } from "@/shared/api/dashboard.api"
import type { DashboardResponse } from "@/shared/types/dashboard"

export function useDashboard() {
  return useQuery<DashboardResponse>({
    queryKey: ["dashboard"],
    queryFn: dashboardApi.get, // ✅ dashboardApi o‘zi fallback qiladi
    staleTime: 10_000,
  })
}
