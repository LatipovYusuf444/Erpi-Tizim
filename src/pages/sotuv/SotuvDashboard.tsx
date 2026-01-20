import ChartCard from "@/pages/components/ChartCard";
import ChartCard2 from "@/pages/components/ChartCard2";
import ChartCard3 from "@/pages/components/ChartCard3";
import TodaySalesTable from "@/pages/components/Navbar2Table";

export default function SotuvDashboard() {
  return (
    <div className="w-full max-w-[1402px] mx-auto px-8 mt-6">
      <div className="bg-[#EBF0FA] border border-[#6049E3] rounded-2xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ChartCard />
          <ChartCard2 />
          <ChartCard3 />
        </div>

        <div className="mt-6">
          <TodaySalesTable />
        </div>
      </div>
    </div>
  );
}
