import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

const tabs = [
  { label: "Kassa-Dashboard", to: "." },               // /moliya
  { label: "Kassa jadvali", to: "kassa" },   // /moliya/kassa
  { label: "Kunlik yopish", to: "kunlik-yopish" },
  { label: "Qarzdorlik", to: "qarzdorlik" },
] as const;

export default function Navbar3() {
  return (
    <div className="mx-auto container">
      <nav className="w-full max-w-[1402px] h-auto flex flex-wrap gap-2 border border-[#6049E3] rounded-3xl px-3 py-2 bg-muted mt-4">
        {tabs.map((t) => (
          <NavLink
            key={t.label}
            to={t.to}
            end={t.to === "."}
            className={({ isActive }) =>
              cn(
                "px-3 rounded-2xl text-sm font-medium transition-all flex items-center duration-200 h-7",
                !isActive && "text-black",
                isActive &&
                  "bg-gradient-to-r from-[#1C96C8] to-[#334F9D] text-white"
              )
            }
          >
            {t.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
