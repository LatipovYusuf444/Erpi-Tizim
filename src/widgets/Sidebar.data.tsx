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
    icon: LayoutDashboard, // 📊 boshqaruv paneli
  },
  {
    to: "/sotuv",
    label: "Sotuv",
    icon: ShoppingCart, // 🛒 sotuv / savdo
    badge: 3,
  },
  {
    to: "/ombor",
    label: "Ombor",
    icon: Warehouse, // 🏬 omborxona
  },
  {
    to: "/moliya",
    label: "Moliya",
    icon: Wallet, // 💳 moliya / pul
    badge: 12,
  },
  {
    to: "/staff",
    label: "Xodimlar",
    icon: Users, // 👥 xodimlar
  },
  {
    to: "/notifications",
    label: "Xabarlar",
    icon: Bell, // 🔔 bildirishnomalar
  },
];
