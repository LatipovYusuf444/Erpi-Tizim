import type { LucideIcon } from "lucide-react"
import {
  LayoutDashboard,
  ShoppingCart,
  Warehouse,
  Wallet,
  Users,
  Bell,
  Cog,
  User,
  Package,
} from "lucide-react"

export type SidebarItemType = {
  to: string
  label: string
  icon: LucideIcon
  badge?: string | number
  disabled?: boolean
}
// sfbahgfhgahfjafj
export const sidebarItems: SidebarItemType[] = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    to: "/sotuv",
    label: "Sotuv",
    icon: ShoppingCart,
    badge: 3,
  },
  {
    to: "/ombor",
    label: "Ombor",
    icon: Warehouse,
  },
  {
    to: "/moliya",
    label: "Moliya",
    icon: Wallet,
    badge: 12,
  },
  {
    to: "/xodimlar", // ✅ TO‘G‘RI
    label: "Tovar va Narx",
    icon: Package,
  },
  {
    to: "/bildirishnomalar",
    label: "Mijoz va Ishchi",
    icon: Users, 
  },
]
