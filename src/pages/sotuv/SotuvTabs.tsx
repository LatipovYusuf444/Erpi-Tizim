import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

const tabs = [
  { label: "Statistika", to: "/sotuv" },
  { label: "Sotuvlar ro'yhati", to: "/sotuv/sotuvlar-royhati" },
  { label: "Qaytarilgan tovarlar", to: "/sotuv/qaytarilgan-tovarlar" },
] as const;

export default function SotuvTabs() {
  return (
    <div className="w-full max-w-[1402px] mx-auto px-8 mt-4">
      <nav className="w-full flex flex-wrap gap-2 border border-[#6049E3] rounded-3xl px-3 py-2 bg-muted">
        {tabs.map((t) => (
          <NavLink
            key={t.to}
            to={t.to}
            end={t.to === "/sotuv"}
            className={({ isActive }) =>
              cn(
                "px-3 rounded-2xl text-sm font-medium transition-all flex items-center duration-200 h-7",
                !isActive && "text-black",
                isActive &&
                  "bg-gradient-to-r from-[#1C96C8] to-[#334F9D] text-white",
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
