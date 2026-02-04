import React, { useState } from "react"
import LineChart from "./LineChart"

type Props = {
  title?: string
  series: { label: string; value: number }[]
}

const tabBase =
  "rounded-md px-2 py-1 text-[10px] font-bold border transition"

const tabActive =
  "bg-slate-900 text-white border-slate-900"

const tabIdle =
  "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"

export default function SalesOverviewCard({ title = "Sales & Revenue Overview", series }: Props) {
  const [range, setRange] = useState<"1W" | "1M" | "3M" | "1Y">("1M")

  return (
    <div className="rounded-xl bg-white border border-slate-200 p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-extrabold text-slate-900">{title}</h3>

        <div className="flex items-center gap-1">
          {(["1W", "1M", "3M", "1Y"] as const).map((t) => (
            <button
              key={t}
              type="button"
              className={`${tabBase} ${range === t ? tabActive : tabIdle}`}
              onClick={() => setRange(t)}
              aria-label={`range ${t}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3">
        {/* hozircha range demo; keyin backenddan range bo‘yicha data almashtirasiz */}
        <LineChart data={series} />
      </div>
    </div>
  )
}
