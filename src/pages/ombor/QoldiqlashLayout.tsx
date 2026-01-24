import { NavLink, Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";

const links = [
  { to: "/ombor/qoldiqlash/product", label: "Product qo‘shish" },
  { to: "/ombor/qoldiqlash/ingredient", label: "Ingredient qo‘shish" },
];

export default function QoldiqlashLayout() {
  return (
    <div className="space-y-6">
      {/* ✅ ICHKI NAV – sub card */}
      <div className="w-full flex justify-end items-center -mt-4 mb-4">
        <div className="rounded-3xl bg-slate-50 border border-[#334F9D] transition-all   px-3 py-2 w-[309px] items-center justify-center flex">
          <nav className="flex gap-2">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  cn(
                    "px-3 rounded-3xl text-sm font-medium transition-all flex items-center w-auto h-7 ",
                    isActive
                      ? "bg-white text-black   bg-linear-to-r from-[#1C96C8] to-[#334F9D] text-white"
                      : "text-gray-600  "
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
      {/* Product / Ingredient form shu yerda */}
      <Outlet />
    </div>
  );
}
