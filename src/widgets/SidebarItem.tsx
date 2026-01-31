import { NavLink } from "react-router-dom"
import type { SidebarItemType } from "./Sidebar.data"
import { cn } from "@/lib/utils"

export default function SidebarItem({ item }: { item: SidebarItemType }) {
  return (
    <NavLink to={item.to} end={item.to === "/dashboard"} className="block">
      {({ isActive }) => (
        <div
          className={cn(
            "relative w-full h-14 rounded-2xl flex items-center",
            "transition-all duration-300",
            "hover:translate-x-0.5",
            isActive
              ? "bg-linear-to-r from-blue-600/10 to-indigo-600/10 ring-1 ring-blue-500/15 shadow-[0_18px_55px_-30px_rgba(37,99,235,0.65)]"
              : "hover:bg-slate-900/5"
          )}
        >
          {/* left active indicator */}
          <div
            className={cn(
              "absolute left-0 top-1/2 -translate-y-1/2",
              "h-8 w-1.5 rounded-full",
              "bg-linear-to-b from-sky-400 to-indigo-600",
              "opacity-0",
              isActive && "opacity-100"
            )}
          />

          {/* icon */}
          <div className="w-16 shrink-0 flex items-center justify-center">
            <div
              className={cn(
                "relative w-11 h-11 rounded-2xl flex items-center justify-center",
                "transition-all duration-300",
                isActive
                  ? "bg-blue-600/15 shadow-[0_16px_38px_-22px_rgba(37,99,235,0.75)] ring-1 ring-blue-400/25"
                  : "bg-white/80 shadow-[0_10px_25px_-18px_rgba(15,23,42,0.25)]"
              )}
            >
              {/* soft halo */}
              <div
                className={cn(
                  "pointer-events-none absolute inset-0 rounded-2xl blur-xl",
                  "opacity-0",
                  isActive && "opacity-100",
                  "bg-linear-to-br from-sky-400/30 to-indigo-500/25"
                )}
              />

              <item.icon
                size={20}
                className={cn(
                  "relative transition-colors duration-300",
                  isActive ? "text-blue-600" : "text-slate-700"
                )}
              />
            </div>
          </div>

          {/* label */}
          <div className="min-w-0 flex-1 pr-4">
            <span
              className={cn(
                "block truncate font-semibold text-sm",
                "opacity-0 translate-x-2",
                "group-hover:opacity-100 group-hover:translate-x-0",
                "transition-all duration-300",
                isActive ? "text-blue-700" : "text-slate-700"
              )}
            >
              {item.label}
            </span>
          </div>
        </div>
      )}
    </NavLink>
  )
}
