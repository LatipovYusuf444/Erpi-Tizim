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

type ChartPoint = {
  month: "Jan" | "Feb" | "Mar" | "Apr" | "May" | "Jun" | "July" | "Aug";
  tovar1: number;
  tovar2: number;
  tovar3: number;
};

const data: ChartPoint[] = [
  { month: "Jan", tovar1: 15, tovar2: 50, tovar3: 15 },
  { month: "Feb", tovar1: 272, tovar2: 60, tovar3: 42 },
  { month: "Mar", tovar1: 80, tovar2: 228, tovar3: 38 },
  { month: "Apr", tovar1: 22, tovar2: 55, tovar3: 145 },
  { month: "May", tovar1: 125, tovar2: 82, tovar3: 62 },
  { month: "Jun", tovar1: 20, tovar2: 90, tovar3: 152 },
  { month: "July", tovar1: 125, tovar2: 120, tovar3: 40 },
  { month: "Aug", tovar1: 25, tovar2: 120, tovar3: 245 },
];

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-xl px-3 py-2 text-xs text-white bg-black/35 backdrop-blur">
      <div className="mb-1 font-semibold">{label}</div>
      <div className="space-y-1">
        {payload.map((p) => (
          <div key={p.name} className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: p.color }}
            />
            <span className="opacity-80">{p.name}</span>
            <span className="ml-auto font-semibold">{p.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SkyChart() {
  return (
    // ✅ fixed width olib tashlandi:
    // - w-full: parent qancha bo‘lsa shuncha
    // - max-w-full: hech qachon tashqariga chiqmaydi
    // - min-w-0: flex/grid ichida overflow bo‘lishini to‘xtatadi
    <section className="w-full max-w-full min-w-0 rounded-2xl mt-8">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#1C96C8] to-[#c1c6d1] p-6 -left-28.5 text-white">
        <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24  h-72 w-72 rounded-full bg-black/20 blur-3xl" />

        <div className="relative flex items-start justify-between">
          <div>
            <div className="text-[23px] font-semibold">Tovarlar reytingi</div>
            <div className="text-sm text-gray-300">Zakaz tushishi bo‘yicha</div>
          </div>
        </div>

        <div className="relative mt-4 h-[275px] w-full">
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
                tick={{ fill: "rgba(255,255,255,0.75)", fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />

              {/* ⚠️ Sizda domain 0..120 edi, lekin data 272/245 bor.
                  Shuning uchun chart "siqilib" ko‘rinishi mumkin.
                  UI o‘zgarmasin desangiz AUTO qoldiramiz: */}
              <YAxis
                tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                width={34}
              />

              <Tooltip content={<CustomTooltip />} />
              <Legend
                align="right"
                verticalAlign="top"
                iconType="circle"
                wrapperStyle={{ color: "rgba(255,255,255,0.85)", fontSize: 12 }}
              />
              <Line
                type="monotone"
                dataKey="tovar1"
                name="tovar 1"
                stroke="#05339C"
                strokeWidth={2.5}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="tovar2"
                name="tovar 2"
                stroke="#FA812F"
                strokeWidth={2.5}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="tovar3"
                name="tovar 3"
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
