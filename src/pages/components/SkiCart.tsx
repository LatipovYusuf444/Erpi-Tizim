import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

type MonthKey = "jan" | "feb" | "mar" | "apr" | "may" | "jun" | "jul" | "aug";

type ChartPoint = {
  month: MonthKey;
  tovar1: number;
  tovar2: number;
  tovar3: number;
};

type TooltipPayloadItem = {
  name?: string;
  value?: number;
  color?: string;
  dataKey?: string;
};

function CustomTooltip({
  active,
  payload,
  label,
  t,
}: {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: MonthKey;
  t: (key: string) => string;
}) {
  if (!active || !payload?.length || !label) return null;

  return (
    <div className="rounded-xl px-3 py-2 text-xs text-white bg-black/35 backdrop-blur">
      <div className="mb-1 font-semibold">{t(`skiChart.months.${label}`)}</div>

      <div className="space-y-1">
        {payload.map((p, idx) => {
          const key = String(p.dataKey ?? p.name ?? idx);
          const labelName =
            p.dataKey === "tovar1"
              ? t("skiChart.tovar1")
              : p.dataKey === "tovar2"
                ? t("skiChart.tovar2")
                : p.dataKey === "tovar3"
                  ? t("skiChart.tovar3")
                  : String(p.name ?? "");

          return (
            <div key={key} className="flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: p.color }}
              />
              <span className="opacity-80">{labelName}</span>
              <span className="ml-auto font-semibold">{p.value ?? "-"}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function SkyChart() {
  const { t } = useTranslation();

  const data: ChartPoint[] = useMemo(
    () => [
      { month: "jan", tovar1: 15, tovar2: 50, tovar3: 15 },
      { month: "feb", tovar1: 272, tovar2: 60, tovar3: 42 },
      { month: "mar", tovar1: 80, tovar2: 228, tovar3: 38 },
      { month: "apr", tovar1: 22, tovar2: 55, tovar3: 145 },
      { month: "may", tovar1: 125, tovar2: 82, tovar3: 62 },
      { month: "jun", tovar1: 20, tovar2: 90, tovar3: 152 },
      { month: "jul", tovar1: 125, tovar2: 120, tovar3: 40 },
      { month: "aug", tovar1: 25, tovar2: 120, tovar3: 245 },
    ],
    [],
  );

  return (
    <section className="w-full max-w-full min-w-0 rounded-2xl mt-8 ">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#1C96C8] to-[#c1c6d1] p-6 text-white">
        <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 h-72 w-72 rounded-full bg-black/20 blur-3xl" />

        <div className="relative flex items-start justify-between">
          <div>
            <div className="text-[23px] font-semibold">
              {t("skiChart.title")}
            </div>
            <div className="text-sm text-gray-300">
              {t("skiChart.subtitle")}
            </div>
          </div>
        </div>

        <div className="relative  mt-4 h-[275px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 10, right: 12, left: 0, bottom: 0 }}
            >
              <CartesianGrid
                stroke="rgba(255,255,255,0.12)"
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="month"
                tickFormatter={(key) => t(`skiChart.months.${key}`)}
                tick={{ fill: "rgba(255,255,255,0.75)", fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                width={34}
              />

              <Tooltip
                content={({ active, payload, label }) => (
                  <CustomTooltip
                    active={active}
                    payload={payload as TooltipPayloadItem[]}
                    label={label as MonthKey}
                    t={t}
                  />
                )}
              />

              <Legend
                align="right"
                verticalAlign="top"
                iconType="circle"
                wrapperStyle={{ color: "rgba(255,255,255,0.85)", fontSize: 12 }}
                formatter={(value) => {
                  if (value === "tovar1") return t("skiChart.tovar1");
                  if (value === "tovar2") return t("skiChart.tovar2");
                  if (value === "tovar3") return t("skiChart.tovar3");
                  return String(value);
                }}
              />

              <Line
                type="monotone"
                dataKey="tovar1"
                stroke="#05339C"
                strokeWidth={2.5}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="tovar2"
                stroke="#FA812F"
                strokeWidth={2.5}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="tovar3"
                stroke="#E8D1C5"
                strokeWidth={2.5}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
