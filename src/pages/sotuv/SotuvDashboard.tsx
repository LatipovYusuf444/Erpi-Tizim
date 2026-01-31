import ChartCard from "@/pages/components/ChartCard";
import ChartCard2 from "@/pages/components/ChartCard2";
import ChartCard3 from "@/pages/components/ChartCard3";
import { LangToggle } from "@/shared/i18n/LangToggle";
import BarRaceChart from "@/pages/BarChard";
export default function SotuvDashboard() {
  return (
    <div className="w-full max-w-[1402px] mx-auto px-8 mt-6">
      <div className="bg-[#EBF0FA] border border-[#334F9D] rounded-2xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ChartCard />
          <ChartCard2 />
          <ChartCard3 />
        </div>
        {/* Til ozgartiriw knopkasi */}
        <LangToggle />
        {/* /////////////////////////// */}
        <div className="mt-6 max-w-[800px] max-h-[500px] rounded-2xl">
          <BarRaceChart />
        </div>
      </div>
    </div>
  );
}
