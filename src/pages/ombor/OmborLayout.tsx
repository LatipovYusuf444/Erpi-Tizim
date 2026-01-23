import { NavLink, Outlet } from "react-router-dom"
import { cn } from "@/lib/utils"

const links = [
  { to: "/ombor/qoldiqlash", label: "Qoldiqlash" },
  { to: "/ombor/kirim", label: "Kirim" },
  { to: "/ombor/kochirish", label: "Ko‘chirish" },
  { to: "/ombor/inventarizatsiya", label: "Inventarizatsiya" },
]

export default function OmborLayout() {
  return (
    <div className="px-8 space-y-8">
      {/* ✅ kapsula navbar */}
      <div className="relative rounded-[28px] p-[2px] bg-gradient-to-r from-[#6C63FF] to-[#00C2FF]">
        <div className="rounded-[26px] bg-white px-3 py-3">
          <nav className="flex flex-wrap items-center gap-2">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  cn(
                    "h-10 px-5 rounded-full text-sm font-semibold transition-all duration-200",
                    isActive
                      ? "bg-[#6049E3] text-white shadow-md"
                      : "text-gray-700 hover:bg-slate-100"
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      <Outlet />
    </div>
  )
}
