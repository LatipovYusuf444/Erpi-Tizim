import ChartCard from "../components/ChartCard";
import OrdersCard from "../components/OrdersCard";
import StatCard from "../components/StatCard";


export default function DashboardPage() {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 lg:col-span-7">
        <OrdersCard />
      </div>

      

      <div className="col-span-12 lg:col-span-5 grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <StatCard title="Payments" value="12,389" hint="Last 7 days" badge="-3.8%" />
          <StatCard title="Products" value="432" hint="Last 7 days" badge="+26.5%" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <StatCard title="Latest Deal" value="$98,500" hint="Last 7 days" badge="86.5%" />
          <StatCard title="Customers" value="6,380" hint="Last 7 days" badge="+26.5%" />
        </div>
      </div>

      <div className="col-span-12">
        <ChartCard />
      </div>
    </div>
  );
}
