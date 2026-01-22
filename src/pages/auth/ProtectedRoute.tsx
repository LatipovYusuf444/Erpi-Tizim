import { Navigate, Outlet } from "react-router-dom"
import { isAuthenticated } from "@/lib/auth"

export default function ProtectedRoute() {
  if (!isAuthenticated()) {
    return <Navigate to="/auth/login" replace />
  }
  return <Outlet />
}
