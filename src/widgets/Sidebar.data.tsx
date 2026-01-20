import {
  LayoutDashboard,
  ShoppingCart,
  Warehouse,
  Wallet,
  Users,
  Bell,
} from "lucide-react";

export type SidebarItemType = {
  to: string;
  label: string;
  icon: any;
  badge?: string | number;
  disabled?: boolean;
};

export const sidebarItems: SidebarItemType[] = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    to: "/sotuv", // ✅ sotuv modul root
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
    to: "/moliya", // ✅ moliya modul root
    label: "Moliya",
    icon: Wallet,
    badge: 12,
  },
  {
    to: "/staff",
    label: "Staff",
    icon: Users,
  },
  {
    to: "/notifications",
    label: "Xabarlar",
    icon: Bell,
  },
];
