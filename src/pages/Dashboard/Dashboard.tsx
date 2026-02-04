import React, { useMemo, useState } from "react"
import FilterBar from "./components/FilterBar"
import StatCard from "./components/StatCard"
import SalesOverviewCard from "./components/SalesOverviewCard"
import MiniInfoCard from "./components/MiniInfoCard"
import RecentSalesTable from "./components/RecentSalesTable"
import { RECENT_SALES, SALES_SERIES, STATS } from "./data"
import type { UiState } from "./components/DashboardStateBar"
import DashboardStateBar from "./components/DashboardStateBar"

function Skeleton() {
  return (
    <div className="rounded-xl bg-white border border-slate-200 p-4">
      <div className="h-4 w-40 bg-slate-100 rounded" />
      <div className="mt-3 h-10 w-56 bg-slate-100 rounded" />
      <div className="mt-3 h-24 w-full bg-slate-100 rounded" />
    </div>
  )
}

export default function DashboardPage() {
  const [ui, setUi] = useState<UiState>("content")

  const userName = "John Doe"

  const content = useMemo(() => {
    if (ui === "loading") {
      return (
        <div className="grid gap-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2"><Skeleton /></div>
            <div className="grid gap-4"><Skeleton /><Skeleton /></div>
          </div>
          <Skeleton />
        </div>
      )
    }

    if (ui === "empty") {
      return (
        <div className="rounded-xl bg-white border border-slate-200 p-10 text-center">
          <div className="text-lg font-extrabold text-slate-900">No data yet</div>
          <div className="mt-2 text-sm text-slate-500">
            Filtrlarni o‘zgartirib ko‘ring yoki backenddan data kelishini tekshiring.
          </div>
        </div>
      )
    }

    if (ui === "error") {
      return (
        <div className="rounded-xl bg-white border border-slate-200 p-10">
          <div className="text-lg font-extrabold text-slate-900">Something went wrong</div>
          <div className="mt-2 text-sm text-slate-500">
            API error yoki internet muammo bo‘lishi mumkin.
          </div>
          <button
            type="button"
            onClick={() => setUi("loading")}
            className="mt-4 rounded-md bg-slate-900 text-white px-4 py-2 text-sm font-bold"
          >
            Retry
          </button>
        </div>
      )
    }

    // content
    return (
      <div className="grid gap-4">
        {/* stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {STATS.map((s) => (
            <StatCard key={s.title} title={s.title} value={s.value} sub={s.sub} />
          ))}
        </div>

        {/* chart + side cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <SalesOverviewCard series={SALES_SERIES} />
          </div>

          <div className="grid gap-4">
            <MiniInfoCard
              title="Low Stock Warnings"
              big="18"
              badgeText="Action Required"
              badgeType="danger"
              icon="🔔"
            />
            <MiniInfoCard
              title="Unpaid Orders"
              big="7"
              badgeText="Pending Payment"
              badgeType="neutral"
              icon="🧾"
            />
          </div>
        </div>

        {/* table */}
        <RecentSalesTable rows={RECENT_SALES} />
      </div>
    )
  }, [ui])

  return (
    <div className="min-h-screen bg-[#dbe8ef]">
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* top state buttons */}
        <DashboardStateBar state={ui} onChange={setUi} />

        {/* title */}
        <div className="mt-4">
          <h1 className="text-2xl font-extrabold text-slate-900">
            Welcome, {userName}!
          </h1>
        </div>

        {/* filters */}
        <div className="mt-4">
          <FilterBar onApply={(payload) => console.log("apply", payload)} />
        </div>

        {/* main */}
        <div className="mt-4">{content}</div>
      </div>
    </div>
  )
}
