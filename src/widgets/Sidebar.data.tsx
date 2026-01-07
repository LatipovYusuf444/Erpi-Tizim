import { LayoutDashboard, Calendar, Mail, MessageCircle, KanbanSquare, User } from "lucide-react";

export const sidebarItems = [
  { to: "/dashboard", label: "Dashboard 1", icon: LayoutDashboard },
  { to: "/dashboard?mode=2", label: "Dashboard 2", icon: LayoutDashboard },
  { to: "/chat", label: "Chat", icon: MessageCircle },
  { to: "/calendar", label: "Calendar", icon: Calendar },
  { to: "/email", label: "Email", icon: Mail },
  { to: "/kanban", label: "Kanban", icon: KanbanSquare },
  { to: "/profile", label: "User Profile", icon: User },
];
