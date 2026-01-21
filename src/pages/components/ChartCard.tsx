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
  { month: "Yan", value: 730000 },
  { month: "Fev", value: 540000 },
  { month: "Mart", value: 500000 },
  { month: "Apr", value: 420000 },
  { month: "May", value: 440000 },
  { month: "Iyun", value: 680000 },
  { month: "Iyul", value: 500000 },
  { month: "Avg", value: 430000 },
  { month: "Sen", value: 240000 },
  { month: "Oct", value: 540000 },
  { month: "Noy", value: 300000 },
  { month: "Dek", value: 600000 },
];

const chartConfig = {
  value: {
    label: "Tovar 1",
    color: "#007E6E",
  },
} satisfies ChartConfig;

const kTick = (v: number) => `${Math.round(v / 1000)}k`;

export default function ChartCard() {
  return (
    <section className="p-6 max-w-[360px] rounded-2xl bg-white">
      <div className="flex items-start justify-between">
        <div className="text-xl font-semibold text-[#007E6E]">2025-02-11</div>
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
            wrapperStyle={{ paddingBottom: 4 }}
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
