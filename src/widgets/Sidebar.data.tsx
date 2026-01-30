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
    label: "Xodimlar",
    icon: Users,
  },
  {
    to: "/notifications", // hozircha page yo‘q bo‘lsa disable
    to: "/notification", // hozircha page yo‘q bo‘lsa disable
    label: "Xabarlar",
    icon: Bell,
    disabled: true,
  },
]
