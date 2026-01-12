import { cn } from "@/lib/utils";
import ChartCard from "@/pages/components/ChartCard";
import { NavLink, useLocation } from "react-router-dom";
import ChartCard2 from "@/pages/components/ChartCard2";
import ChartCard3 from "@/pages/components/ChartCard3";
import TodaySalesTable from "@/pages/components/Navbar2Table";

const tabs = [
  { label: "Sotuv qo'shish", to: "/SotuvQoshish" },
  { label: "Sotuvlar ro'yhati", to: "/SotuvlarRoyhati" },
  { label: "Tolov oynasi", to: "/TolovOynasi" },
  { label: "Qaytarilgan tovarlar", to: "/QaytarilganTovarlar" },
] as const;

type Navbar2Props = {
  defaultActiveTo?: (typeof tabs)[number]["to"];
};
export default function Navbar2({ defaultActiveTo }: Navbar2Props) {
  const { pathname } = useLocation();
  const hasActiveTab = tabs.some((t) => pathname.startsWith(t.to));
  return (
    <div className="px-8">
      <nav className=" w-full max-w-[1402px] h-auto flex gap-2 border border-[#6049E3] rounded-3xl px-3 py-2 bg-muted mt-4">
        {tabs.map((t) => {
          const isDefaultActive = !hasActiveTab && defaultActiveTo === t.to;
          return (
            <NavLink
              to={t.to}
              key={t.to}
              className={({ isActive }) =>
                cn(
                  "px-3 rounded-2xl text-sm font-medium  transition-all   flex items-center duration-200 h-7 ",
                  !isActive && !isDefaultActive && "text-black",
                  (isActive || isDefaultActive) && "navbar2-button-color"
                )
              }
            >
              {t.label}
            </NavLink>
          );
        })}
      </nav>
      {!hasActiveTab && (
        <div className="w-[1402px] h-[775px] bg-[#EBF0FA] border border-[#6049E3] rounded-2xl mt-[29px] ">
          <div className="flex flex-row gap-8 mx-auto container px-8 py-8">
            <ChartCard />
            <ChartCard2 />
            <ChartCard3 />
          </div>
          <div>
            <TodaySalesTable />
          </div>
        </div>
      )}
    </div>
  );
  function Topbar() {
    return <div className="text-black">Topbar2</div>;
  }
}
