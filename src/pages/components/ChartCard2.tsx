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
  { month: "Yan", value: 330000 },
  { month: "Fev", value: 540000 },
  { month: "Mart", value: 500000 },
  { month: "Apr", value: 420000 },
  { month: "May", value: 140000 },
  { month: "Iyun", value: 380000 },
  { month: "Iyul", value: 480000 },
  { month: "Avg", value: 430000 },
  { month: "Sen", value: 340000 },
  { month: "Oct", value: 210000 },
  { month: "Noy", value: 500000 },
  { month: "Dek", value: 600000 },
];

const chartConfig = {
  value: {
    label: "Tovar 1",
    color: "#3F9AAE",
  },
} satisfies ChartConfig;

const kTick = (v: number) => `${Math.round(v / 1000)}k`;

export default function ChartCard() {
  return (
    <section className="p-6 max-w-[360px] rounded-2xl bg-white">
      <div className="flex items-start justify-between">
        <div className="text-xl font-semibold text-[#3F9AAE]">2025-10-02</div>
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
