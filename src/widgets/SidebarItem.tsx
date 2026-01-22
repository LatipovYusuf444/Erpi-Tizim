import { NavLink } from "react-router-dom";
import type { SidebarItemType } from "./Sidebar.data";

export default function SidebarItem({ item }: { item: SidebarItemType }) {
  return (
    <NavLink to={item.to} end={item.to === "/dashboard"}>
      {({ isActive }) => (
        <div
          className={[
            "h-13 w-full",
            "rounded-2xl",
            "flex items-center",
            "transition-all duration-300",
            isActive
              ? "bg-blue-600/10 shadow-[0_10px_26px_rgba(37,99,235,0.12)]"
              : "hover:bg-slate-900/5",
          ].join(" ")}
        >
          {/* icon */}
          <div className="w-18 shrink-0 flex items-center justify-center">
            <div
              className={[
                "w-11 h-11 rounded-3xl",
                "flex items-center justify-center",
                "transition-all duration-300",
                isActive
                  ? "bg-blue-600/15 shadow-[0_12px_28px_rgba(37,99,235,0.30)]"
                  : "bg-white/80 shadow-[0_6px_18px_rgba(15,23,42,0.10)]",
              ].join(" ")}
            >
              <item.icon
                size={20}
                className={[
                  "transition-colors duration-300",
                  isActive ? "text-blue-600" : "text-slate-700",
                ].join(" ")}
              />
            </div>
          </div>

          {/* label */}
          <div className="min-w-0 flex-1 pr-4">
            <span
              className={[
                "block truncate font-medium text-sm",
                "opacity-0 translate-x-2",
                "group-hover:opacity-100 group-hover:translate-x-0",
                "transition-all duration-300",
                isActive ? "text-blue-700" : "text-slate-700",
              ].join(" ")}
            >
              {item.label}
            </span>
          </div>
        </div>
      )}
    </NavLink>
  );
}
