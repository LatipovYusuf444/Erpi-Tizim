import { cn } from "@/lib/utils";
import ChartCard from "@/pages/components/ChartCard";
import ChartCard2 from "@/pages/components/ChartCard2";
import ChartCard3 from "@/pages/components/ChartCard3";
import TodaySalesTable from "@/pages/components/Navbar2Table";
import { NavLink, useLocation } from "react-router-dom";

const tabs = [
  { label: "Statistika", to: "/Statistika" },
  { label: "Sotuvlar ro'yhati", to: "/SotuvlarRoyhati" },
  { label: "SotuvQoshishForm", to: "/SotuvQoshishForm" },
  { label: "Qaytarilgan tovarlar", to: "/QaytarilganTovarlar" },
] as const;

type Navbar2Props = {
  defaultActiveTo?: (typeof tabs)[number]["to"];
};

export default function Navbar2({ defaultActiveTo }: Navbar2Props) {
  const { pathname } = useLocation();
  const hasActiveTab = tabs.some((t) => pathname.startsWith(t.to));

  return (
    <div className="px-8 ">
      <nav className="w-full max-w-[1402px] h-auto flex gap-2 border border-[#334F9D] rounded-3xl px-3 py-2 bg-muted mt-4">
    <div className="px-8">
      <nav className="w-full max-w-350.5 h-auto flex gap-2 border border-[#334F9D] rounded-3xl px-3 py-2 bg-muted mt-4">
        {tabs.map((t) => {
          const isDefaultActive = !hasActiveTab && defaultActiveTo === t.to;

          return (
            <NavLink
              key={t.to}
              to={t.to}
              className={({ isActive }) =>
                cn(
                  "px-3 rounded-2xl text-sm font-medium transition-all flex items-center duration-200 h-7 ",
                  !isActive && !isDefaultActive && "text-black",
                  (isActive || isDefaultActive) && "text-white"
                )
              }
            >
              {t.label}
            </NavLink>
          );
        })}
      </nav>

      {!hasActiveTab && (
        <div className="w-full max-w-[1402px] bg-[#EBF0FA] border border-[#334F9D] rounded-2xl mt-[29px] ">
          <div className="flex flex-row gap-8 mx-auto  container px-8 py-8">
        <div className="w-full max-w-350.5 bg-[#EBF0FA] border border-[#334F9D] rounded-2xl mt-7.25">
          <div className="flex flex-row gap-8 mx-auto container px-8 py-8">
            <ChartCard />
            <ChartCard2 />
            <ChartCard3 />
          </div>

          <div className="px-8 pb-8">
            <TodaySalesTable />
          </div>
        </div>
      )}
    </div>
  );
}
