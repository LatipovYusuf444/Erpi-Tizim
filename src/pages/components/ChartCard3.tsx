import {
  Bar,
  BarChart,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

import {
  ChartContainer,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartData = [
  { month: "Jan", value: 330000 },
  { month: "Feb", value: 540000 },
  { month: "Mar", value: 500000 },
  { month: "Apr", value: 420000 },
  { month: "May", value: 440000 },
  { month: "Jun", value: 380000 },
  { month: "Jul", value: 500000 },
  { month: "Aug", value: 430000 },
  { month: "Sep", value: 340000 },
  { month: "Oct", value: 540000 },
  { month: "Nov", value: 500000 },
  { month: "Dec", value: 600000 },
];

const chartConfig = {
  value: {
    label: "Tovar 1",
    color: "#53629E",
  },
} satisfies ChartConfig;

const kTick = (v: number) => `${Math.round(v / 1000)}k`;

export default function ChartCard() {
  return (
    <section className="p-6 w-[420px] rounded-2xl bg-white">
      <div className="flex items-start justify-between">
        <div className="text-xl font-semibold text-black">2025</div>
      </div>

      <ChartContainer config={chartConfig} className="mt-4 h-[220px] w-full">
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          barCategoryGap={18}
        >
          <CartesianGrid vertical={false} strokeDasharray="4 4" />

          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <YAxis
            tickFormatter={kTick}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            domain={[0, 600000]}
            ticks={[0, 100000, 200000, 300000, 400000, 500000, 600000]}
          />

          <Legend
            align="right"
            verticalAlign="top"
            iconType="circle"
            wrapperStyle={{ paddingBottom: 8 }}
          />

          <Tooltip content={<ChartTooltipContent />} />

          <Bar
            dataKey="value"
            fill="var(--color-value)"
            radius={100}
            barSize={10}
          />
        </BarChart>
      </ChartContainer>
    </section>
  );
}
