import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

const tabs = [
  { label: "Sotuv qo'shish", to: "/SotuvQoshish" },
  { label: "Sotuvlar ro'yhati", to: "/SotuvlarRoyhati" },
  { label: "Tolov oynasi", to: "/TolovOynasi" },
  { label: "Qaytarilgan tovarlar", to: "/QaytarilganTovarlar" },
] as const;

export default function Navbar2() {
  return (
    <nav className=" w-full max-w-[1402px] h-auto flex gap-2 border border-[#6049E3] rounded-3xl px-3 py-2 bg-muted mt-4">
      {tabs.map((t) => (
        <NavLink
          to={t.to}
          key={t.to}
          className={({ isActive }) =>
            cn(
              "px-3 rounded-2xl text-sm font-medium  transition-all   flex items-center duration-200 h-7 ",
              !isActive && "text-black",
              isActive && "navbar2-button-color"
            )
          }
        >
          {t.label}
        </NavLink>
      ))}
    </nav>
  );
}
