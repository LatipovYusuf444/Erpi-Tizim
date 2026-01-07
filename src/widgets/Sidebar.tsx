import { NavLink } from "react-router-dom";
import { sidebarItems } from "./Sidebar.data";

export default function Sidebar() {
  return (
    <aside className="glass-strong p-4 h-[calc(100vh-2rem)] sticky top-4">
      <div className="flex items-center gap-2 px-2">
        <div className="h-10 w-10 rounded-2xl bg-blue-600/90" />
        <div>
          <div className="font-semibold leading-5">ERPI Admin</div>
          <div className="text-xs text-slate-500">Luxury UI</div>
        </div>
      </div>

      <div className="mt-6 text-xs font-semibold text-slate-400 px-2">HOME</div>

      <nav className="mt-2 flex flex-col gap-1">
        {sidebarItems.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            className={({ isActive }) =>
              [
                "flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition",
                isActive ? "bg-blue-600/10 text-blue-700" : "hover:bg-slate-900/5 text-slate-700",
              ].join(" ")
            }
          >
            <it.icon size={18} />
            {it.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto pt-6">
        <div className="glass p-3 flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-slate-900/10" />
          <div className="flex-1">
            <div className="text-sm font-semibold">Mike</div>
            <div className="text-xs text-slate-500">Admin</div>
          </div>
          <button className="text-xs px-2 py-1 rounded-lg bg-slate-900/5 hover:bg-slate-900/10">
            Logout
            {/* TODO: backend auth logout */}
          </button>
        </div>
      </div>
    </aside>
  );
}
