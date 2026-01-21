import { Link } from "react-router-dom";
import { sidebarItems } from "./Sidebar.data";
import SidebarItem from "./SidebarItem";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {

  const navigate = useNavigate()

  const onLogout = () => {
    localStorage.removeItem("erp_auth")
    toast.info("Tizimdan chiqdingiz")
    navigate("/auth/login", { replace: true })
  }
  return (
    <aside
      className={[
        // ✅ sidebar flexda qisilib qolmasin
        "shrink-0",
        // layout
        "sticky top-4 h-[calc(100vh-2rem)]",
        "flex flex-col",
        // premium look
        "glass-strong rounded-[28px]",
        // ✅ default: icon-only, hover: full
        "w-[96px] hover:w-[292px]",
        // smooth width
        "transition-[width] duration-300 ease-out",
        // ✅ ichidagi narsalar chiqib ketmasin
        "overflow-hidden",
        // ✅ label animatsiya uchun group
        "group",
      ].join(" ")}
    >
      {/* Header */}
      <div className="px-4 pt-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-blue-600/90 shadow-[0_14px_34px_rgba(37,99,235,0.35)]" />

          {/* Text only when expanded */}
          <div className="min-w-0 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            <div className="font-semibold leading-5 truncate">ERP Admin</div>
            <div className="text-xs text-slate-500 truncate">Luxury UI</div>
          </div>
        </div>

        <div className="mt-6 px-1 text-xs font-semibold text-slate-400">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            HOME
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="mt-3 flex flex-col gap-2 px-3">
        {sidebarItems.map((it) => (
          <SidebarItem key={it.to} item={it} />
        ))}
      </nav>

      {/* Footer */}
      <div className="mt-auto px-4 pb-4">
        <div className="glass rounded-2xl p-3 flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl bg-slate-900/10" />

          {/* only expanded */}
          <div className="min-w-0 flex-1 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            <div className="text-sm font-semibold truncate">Mike</div>
            <div className="text-xs text-slate-500 truncate">Admin</div>
          </div>

<<<<<<< HEAD
          <Link to="/auth/login">
            <button onClick={onLogout} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs px-3 py-1.5 rounded-xl bg-slate-900/5 hover:bg-slate-900/10">
              Logout
            </button>
          </Link>
=======
          <button
            type="button"
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs px-3 py-1.5 rounded-xl bg-slate-900/5 hover:bg-slate-900/10"
          >
            Logout
          </button>
>>>>>>> d4c988bea0cd0745e9f253dcf81898afbda18f0c
        </div>
      </div>
    </aside>
  );
}
