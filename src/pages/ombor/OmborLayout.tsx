import { NavLink, Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";

const links = [
  { to: "/ombor/qoldiqlash", label: "Qoldiqlash" },
  { to: "/ombor/kirim", label: "Kirim" },
  { to: "/ombor/kochirish", label: "Ko‘chirish" },
  { to: "/ombor/inventarizatsiya", label: "Inventarizatsiya" },
];

export default function OmborLayout() {
  return (
    <div className="px-8 space-y-8">
      {/* ✅ kapsula navbar */}
      <div className="relative rounded-3xl  border border-[#334F9D] px-3 py-2  ">
        <div className="">
          <nav className="flex flex-wrap items-center gap-2">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  cn(
                    "px-3 rounded-2xl text-sm font-medium transition-all flex items-center duration-200 h-7",
                    isActive
                      ? "bg-linear-to-r from-[#1C96C8] to-[#334F9D] text-white shadow-md"
                      : "text-black "
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
  );
}
