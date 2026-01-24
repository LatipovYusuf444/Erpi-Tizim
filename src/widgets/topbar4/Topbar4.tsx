import { cn } from "@/lib/utils"
import Topbar4Top from "@/pages/components/Topbar4Top"
import Topbar4Top2 from "@/pages/components/Topbar4Top2"
import TopbarTop3 from "@/pages/components/TopbarTop3"
import { NavLink, Outlet } from "react-router-dom"

const tabs = [
  { label: "Qoldiqlash", to: "/ombor/qoldiqlash" },
  { label: "Kirim", to: "/ombor/kirim" },
  { label: "Ko‘chirish", to: "/ombor/kochirish" },
  { label: "Inventarizatsiya", to: "/ombor/inventarizatsiya" },
] as const

export default function Navbar4() {
  return (
    <div className="px-8">
      <nav className="w-full max-w-350.5 h-auto flex gap-2 border border-[#6049E3] rounded-3xl px-3 py-10 bg-muted mt-4">
        {tabs.map((t) => (
          <NavLink
            key={t.to}
            to={t.to}
            className={({ isActive }) =>
              cn(
                "px-3 h-7 rounded-2xl text-sm font-medium  flex items-center transition-all duration-200",
                isActive ? "bg-[#6049E3] text-white" : "text-black hover:bg-[#6049E3]/10"
              )
            }
          >
            {t.label}
          </NavLink>
        ))}
      </nav>
      <div className="flex">
        <div>
        <Topbar4Top />
        <Topbar4Top2 />
        </div>
        <TopbarTop3 />
      </div>
      <div className="mt-6">
        <Outlet />
      </div>
    </div>
  )
}
