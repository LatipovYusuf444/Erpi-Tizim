import { useQuery } from "@tanstack/react-query"
import { fetchCashFlowChart } from "@/api/kirim-chiqim"

export function useCashFlowChart() {
  return useQuery({
    queryKey: ["charts", "cashflow", "week"],
    queryFn: fetchCashFlowChart,
    staleTime: 60_000,
    retry: 1,
    refetchOnWindowFocus: false,
  })
}
