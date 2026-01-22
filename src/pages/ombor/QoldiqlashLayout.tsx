import { NavLink, Outlet } from "react-router-dom"
import { cn } from "@/lib/utils"

const links = [
  { to: "/ombor/qoldiqlash/product", label: "Product qo‘shish" },
  { to: "/ombor/qoldiqlash/ingredient", label: "Ingredient qo‘shish" },
]

export default function QoldiqlashLayout() {
  return (
    <div className="space-y-6">
      {/* ✅ ICHKI NAV – sub card */}
      <div className="rounded-2xl bg-slate-50 border border-slate-200 p-2">
        <nav className="flex gap-2">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                cn(
                  "h-10 px-4 rounded-xl text-sm font-semibold transition-all",
                  isActive
                    ? "bg-white text-black border border-[#6C63FF] shadow-sm"
                    : "text-gray-600 hover:bg-white"
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Product / Ingredient form shu yerda */}
      <Outlet />
    </div>
  )
}
