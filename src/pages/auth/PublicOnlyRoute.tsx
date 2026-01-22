import { Navigate, Outlet } from "react-router-dom"
import { isAuthenticated } from "@/lib/auth"

export default function PublicOnlyRoute() {
  if (isAuthenticated()) {
    return <Navigate to="/dashboard" replace />
  }
  return <Outlet />
}
