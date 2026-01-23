import React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { toast } from "react-toastify"

const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10_000,
      gcTime: 5 * 60_000,
      refetchOnWindowFocus: false,
      retry: (failureCount, error: any) => {
        const status = error?.response?.status
        // 401/403 bo‘lsa qayta-qayta urinish kerak emas
        if (status === 401 || status === 403) return false
        return failureCount < 2
      },
    },
    mutations: {
      onError: (error: any) => {
        const msg =
          error?.response?.data?.detail ||
          error?.response?.data?.message ||
          error?.message ||
          "Xatolik yuz berdi"
        toast.error(msg)
      },
    },
  },
})

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
