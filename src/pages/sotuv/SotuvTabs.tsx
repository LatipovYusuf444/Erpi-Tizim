import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const tabs = [
  { labelKey: "sotuvTabs.stats", to: "/sotuv" },
  { labelKey: "sotuvTabs.salesList", to: "/sotuv/sotuvlar-royhati" },
  { labelKey: "sotuvTabs.returned", to: "/sotuv/qaytarilgan-tovarlar" },
] as const;

export default function SotuvTabs() {
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-[1402px] mx-auto px-8 mt-4">
      <nav className="w-full flex flex-wrap gap-2 border border-[#6049E3] rounded-3xl px-3 py-2 bg-muted">
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.to === "/sotuv"}
            className={({ isActive }) =>
              cn(
                "px-3 rounded-2xl text-sm font-medium transition-all flex items-center duration-200 h-7",
                !isActive && "text-black",
                isActive &&
                  "bg-gradient-to-r from-[#1C96C8] to-[#334F9D] text-white",
              )
            }
          >
            {t(tab.labelKey)}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
