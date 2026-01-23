import React, { useMemo, useState } from "react"
import { useDashboard } from "./useDashboard"
import type {
  DashboardCustomer,
  DashboardProductRank,
  DashboardResponse,
  DashboardSaleRow,
  DashboardStat,
} from "@/shared/types/dashboard"

// ---------- utils ----------
const fmt = (n: number) => new Intl.NumberFormat("ru-RU").format(n)

function CardShell({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={[
        "rounded-2xl bg-white/75 backdrop-blur-xl border border-white/60",
        "shadow-[0_10px_24px_rgba(15,23,42,0.08)]",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  )
}

// ---------- Donut (SVG) + percent ----------
function DonutChart({
  data,
  size = 150,
  stroke = 18,
}: {
  data: DashboardProductRank[]
  size?: number
  stroke?: number
}) {
  const safe = Array.isArray(data) ? data : []
  const total = safe.reduce((s, d) => s + (d?.value ?? 0), 0) || 1

  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r

  const top = [...safe].sort((a, b) => (b?.value ?? 0) - (a?.value ?? 0))[0]
  const topPct = Math.round((((top?.value ?? 0) / total) * 100) || 0)

  let acc = 0

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(148,163,184,0.35)"
          strokeWidth={stroke}
        />

        {/* segments */}
        {safe.map((d, i) => {
          const v = d?.value ?? 0
          const portion = v / total
          const dash = portion * c
          const gap = c - dash
          const offset = c * acc
          acc += portion

          return (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={d.color ?? "#3b82f6"}
              strokeWidth={stroke}
              strokeDasharray={`${dash} ${gap}`}
              strokeDashoffset={-offset}
              strokeLinecap="round"
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
          )
        })}

        {/* hole */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r - stroke / 2}
          fill="white"
          opacity={0.95}
        />
      </svg>

      {/* center percent */}
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <div className="text-2xl font-extrabold text-slate-800">
            {topPct}%
          </div>
          <div className="text-[11px] text-slate-500 leading-4">Eng ko‘p</div>
        </div>
      </div>
    </div>
  )
}

// ✅ DEMO fallback (hech qachon undefined bo‘lmaydi)
const demoData: DashboardResponse = {
  stats: [
    { title: "Jami buyurtmalar soni", value: 250 },
    { title: "Tayyor buyurtmalar", value: 250 },
    { title: "Jarayondagi buyurtmalar", value: 250 },
    { title: "Kutilishdagi buyurtmalar", value: 250 },
    { title: "Bekor qilingan buyurtmalar", value: 250 },
  ],
  productRank: [
    { label: "Total applications", value: 500, color: "#16a34a" },
    { label: "Qoshimcha yuk", value: 80, color: "#f59e0b" },
    { label: "Stakan", value: 370, color: "#22c55e" },
    { label: "Tarelka", value: 50, color: "#ef4444" },
  ],
  customers: [
    {
      sn: "01",
      name: "Ustaboy Oyshanov",
      id: "20202020",
      phone: "99 999 99 99",
      status: "plus",
      amount: 250_000,
    },
    {
      sn: "02",
      name: "Ustaboy Oyshanov",
      id: "20202020",
      phone: "99 999 99 99",
      status: "neutral",
      amount: 0,
    },
  ],
  warehouse: [
    { title: "Tovar 1", value: 3000, tone: "text-slate-800" },
    { title: "Tovar 2", value: 1500, tone: "text-slate-800" },
    { title: "Tovar 3", value: 350, tone: "text-rose-500" },
  ],
  sales: Array.from({ length: 14 }).map((_, idx) => ({
    sn: String(idx + 1).padStart(2, "0"),
    client: "Yusuf Latipov",
    clientId: "20202020",
    saleId: "20202020",
    time: "11:00",
    price: 200_000,
    status: "pending",
  })),
}

export default function DashboardPage() {
  const q = useDashboard()

  // ✅ data kelmasa ham DEMO ishlaydi
  const d: DashboardResponse =
    (q.data as DashboardResponse) ??
    (q.isError ? demoData : demoData) // har doim demoData bor

  // percent util
  const totalRank = d.productRank.reduce((s, x) => s + x.value, 0) || 1
  const pct = (v: number) => Math.round((v / totalRank) * 100)

  const [query, setQuery] = useState("")

  const filteredSales = useMemo(() => {
    const text = query.trim().toLowerCase()
    if (!text) return d.sales
    return d.sales.filter(
      (r) =>
        r.client.toLowerCase().includes(text) ||
        r.clientId.includes(text) ||
        r.saleId.includes(text)
    )
  }, [query, d.sales])

  const onAdd = () =>
    alert("➕ Yangi sotuv qo‘shish (keyin drawer/modal ulaymiz)")

  const onViewMore = (row: DashboardSaleRow) =>
    alert(
      `View more:\nClient: ${row.client}\nSale ID: ${row.saleId}\nPrice: ${fmt(
        row.price
      )}`
    )

  const statusBadge = (c: DashboardCustomer) => {
    if (c.status === "plus")
      return <span className="text-amber-400 font-semibold">{fmt(c.amount)}</span>
    if (c.status === "minus")
      return (
        <span className="text-rose-500 font-semibold">
          -{fmt(Math.abs(c.amount))}
        </span>
      )
    return <span className="text-emerald-500 font-semibold">0</span>
  }

  return (
    <div className="w-full">
      {/* mini banner */}
      {q.isLoading && (
        <div className="mb-3 text-xs text-slate-500">Dashboard yuklanmoqda...</div>
      )}
      {q.isError && (
        <div className="mb-3 text-xs text-rose-600">
          Backenddan data kelmadi — demo data ko‘rsatilyapti.
        </div>
      )}

      {/* Top stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {d.stats.map((s: DashboardStat, i: number) => (
          <CardShell key={i} className="px-5 py-4">
            <div className="text-sm font-semibold text-slate-800">{s.value}</div>
            <div className="text-[11px] text-slate-500 mt-1">{s.title}</div>
          </CardShell>
        ))}
      </div>

      {/* Middle row */}
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-[1fr_1.25fr_0.55fr] gap-5">
        {/* Mahsulotlar reytingi */}
        <CardShell className="p-4">
          <div className="text-sm font-semibold text-slate-800">
            Mahsulotlar reytingi
          </div>

          <div className="mt-4 flex items-center gap-5">
            {/* legend + percent */}
            <div className="flex-1 space-y-2 text-xs text-slate-600">
              {d.productRank.map((p: DashboardProductRank, idx: number) => (
                <div key={idx} className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: p.color ?? "#3b82f6" }}
                  />
                  <span className="min-w-[140px]">{p.label}</span>

                  <span className="ml-auto flex items-center gap-2">
                    <span className="text-slate-500">{pct(p.value)}%</span>
                    <span className="font-semibold text-slate-800">{p.value}</span>
                  </span>
                </div>
              ))}
            </div>

            {/* donut */}
            <div className="shrink-0">
              <DonutChart data={d.productRank} size={150} stroke={18} />
            </div>
          </div>
        </CardShell>

        {/* Aktiv mijozlar */}
        <CardShell className="p-4">
          <div className="text-sm font-semibold text-slate-800">Aktiv mijozlar</div>

          <div className="mt-4 overflow-hidden rounded-xl border border-white/60">
            <table className="w-full text-xs">
              <thead className="bg-slate-900/5 text-slate-600">
                <tr>
                  <th className="text-left px-3 py-2 font-semibold w-[56px]">S/N</th>
                  <th className="text-left px-3 py-2 font-semibold">Mijoz nomi</th>
                  <th className="text-left px-3 py-2 font-semibold">ID</th>
                  <th className="text-left px-3 py-2 font-semibold">Telefon raqami</th>
                  <th className="text-left px-3 py-2 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {d.customers.map((c) => (
                  <tr key={c.sn} className="border-t border-white/60">
                    <td className="px-3 py-2 text-slate-600">{c.sn}</td>
                    <td className="px-3 py-2 text-slate-800 font-medium">{c.name}</td>
                    <td className="px-3 py-2 text-slate-600">{c.id}</td>
                    <td className="px-3 py-2 text-slate-600">{c.phone}</td>
                    <td className="px-3 py-2">{statusBadge(c)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardShell>

        {/* Ombordagi tovarlar */}
        <CardShell className="p-4">
          <div className="inline-flex items-center justify-center px-3 py-1 rounded-xl bg-gradient-to-r from-[#1C96C8] to-[#334F9D] text-white text-xs font-semibold">
            Ombordagi tovarlar
          </div>

          <div className="mt-4 flex flex-col gap-3">
            {d.warehouse.map((w, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-white/70 border border-white/60 shadow-[0_10px_20px_rgba(15,23,42,0.06)] px-4 py-3"
              >
                <div
                  className={["text-lg font-bold leading-5", w.tone ?? ""].join(" ")}
                >
                  {fmt(w.value)}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">{w.title}</div>
              </div>
            ))}
          </div>
        </CardShell>
      </div>

      {/* Bottom */}
      <CardShell className="mt-5 p-4">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold text-slate-800">Bugungi savdo</div>

          <button
            type="button"
            onClick={onAdd}
            className="h-9 w-14 rounded-xl bg-gradient-to-r from-[#1C96C8] to-[#334F9D] text-white text-xl grid place-items-center shadow-[0_12px_26px_rgba(51,79,157,0.25)]"
            aria-label="Add"
          >
            +
          </button>
        </div>

        <div className="mt-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Qidirish (mijoz / ID / sotuv ID)..."
            className="w-full h-9 rounded-xl bg-white/70 border border-white/60 px-3 text-sm outline-none focus:ring-2 focus:ring-blue-400/30"
          />
        </div>

        <div className="mt-4 rounded-xl overflow-hidden border border-white/60">
          <div className="max-h-[260px] overflow-auto">
            <table className="w-full text-xs">
              <thead className="sticky top-0 bg-slate-900/5 text-slate-600">
                <tr>
                  <th className="text-left px-3 py-2 font-semibold w-[60px]">S/N</th>
                  <th className="text-left px-3 py-2 font-semibold">Klient nomi</th>
                  <th className="text-left px-3 py-2 font-semibold">Mijoz ID</th>
                  <th className="text-left px-3 py-2 font-semibold">Sotuv ID</th>
                  <th className="text-left px-3 py-2 font-semibold">Soati</th>
                  <th className="text-left px-3 py-2 font-semibold">Narxi</th>
                  <th className="text-left px-3 py-2 font-semibold">Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredSales.map((r) => (
                  <tr key={r.sn} className="border-t border-white/60">
                    <td className="px-3 py-2 text-slate-600">{r.sn}</td>
                    <td className="px-3 py-2 text-slate-800 font-medium">{r.client}</td>
                    <td className="px-3 py-2 text-slate-600">{r.clientId}</td>
                    <td className="px-3 py-2 text-slate-600">{r.saleId}</td>
                    <td className="px-3 py-2 text-slate-600">{r.time}</td>
                    <td className="px-3 py-2 text-slate-800 font-semibold">{fmt(r.price)}</td>
                    <td className="px-3 py-2">
                      <button
                        type="button"
                        onClick={() => onViewMore(r)}
                        className="text-blue-600 hover:underline"
                      >
                        View more
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredSales.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-3 py-8 text-center text-slate-500">
                      Hech narsa topilmadi
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="p-2 flex justify-end">
            <div className="h-16 w-2 rounded-full bg-slate-900/10 relative">
              <div className="h-6 w-2 rounded-full bg-blue-600/50 absolute top-4" />
            </div>
          </div>
        </div>
      </CardShell>
    </div>
  )
}
