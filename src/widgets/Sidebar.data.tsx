import type { LucideIcon } from "lucide-react"
import {
  LayoutDashboard,
  ShoppingCart,
  Warehouse,
  Wallet,
  Users,
  Bell,
} from "lucide-react"

export type SidebarItemType = {
  to: string
  label: string
  icon: LucideIcon
  badge?: string | number
  disabled?: boolean
}

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
    to: "/ombor", // ✅ TO‘G‘RI
    label: "Ombor",
    icon: Warehouse,
  },
  {
    to: "/moliya", // avval "/moliya" edi
    label: "Moliya",
    icon: Wallet,
    badge: 12,
  },
  {
    to: "/staff",
    label: "Xodimlar",
    icon: Users,
  },
  {
    to: "/notifications",
    label: "Xabarlar",
    icon: Bell,
  },
]
