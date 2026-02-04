import { useMemo, useState } from "react";

type Props = {
  onApply?: (payload: { range: "today" | "week" | "month"; date: string }) => void
}
const chipBase = "rounded-md px-2.5 py-1 text-xs font-semibold border transition"
const chipActive = "bg-slate-900 text-white border-slate-900"
const chipIdle = "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"

export default function FilterBar({ onApply }: Props) {
  const [range, setRange] = useState<"today" | "week" | "month">("month");

  const today = useMemo(() => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }, [])
  const [date, setDate] = useState(today);
  return (
    <div className="flex flex-col gap-3 rounded-xl bg-white/70 backdrop-blur border border-slate-200 p-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-slate-600">Filter by Date:</span>

        <button
          type="button"
          className={`${chipBase} ${range === "today" ? chipActive : chipIdle}`}
          onClick={() => setRange("today")}
        >
          Today
        </button>
        <button
          type="button"
          className={`${chipBase} ${range === "week" ? chipActive : chipIdle}`}
          onClick={() => setRange("week")}
        >
          Week
        </button>
        <button
          type="button"
          className={`${chipBase} ${range === "month" ? chipActive : chipIdle}`}
          onClick={() => setRange("month")}
        >
          Month
        </button>

        <div className="ml-2 flex items-center gap-2 rounded-md border border-slate-200 bg-white px-2 py-1">
          <span className="text-xs text-slate-500">📅</span>
          <input
            className="text-xs outline-none text-slate-700"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="flex-1" />

        <button
          type="button"
          onClick={() => onApply?.({ range, date })}
          className="rounded-md bg-slate-900 text-white px-3 py-2 text-xs font-semibold hover:opacity-95"
        >
          Apply Filters
        </button>
      </div>
    </div>
  )
}

