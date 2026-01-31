import axios from "axios"
import { getAccessToken, clearAuth } from "@/lib/auth"

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:8000/api",
})

http.interceptors.request.use((config) => {
  const token = getAccessToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

http.interceptors.response.use(
  (res) => res,
  (error) => {
    // token invalid / expired
    if (error?.response?.status === 401) {
      clearAuth()
      // xohlasang login pagega otkazish:
      // window.location.href = "/auth/login"
    }
    return Promise.reject(error)
  }
)
