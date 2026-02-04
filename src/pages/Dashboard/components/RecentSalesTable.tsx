import React, { useMemo, useState } from "react"
import type { SaleRow } from "../data"

type Props = {
  rows: SaleRow[]
}

function money(n: number) {
  return `$${n.toFixed(2)}`
}

export default function RecentSalesTable({ rows }: Props) {
  const [page, setPage] = useState(1)
  const pageSize = 5
  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize))

  const pageRows = useMemo(() => {
    const start = (page - 1) * pageSize
    return rows.slice(start, start + pageSize)
  }, [page, rows])

  return (
    <div className="rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-4">
        <div className="text-sm font-extrabold text-slate-900">Recent Sales</div>
      </div>

      <div className="px-4 pb-4">
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-3 py-2 font-bold">Product Name</th>
                <th className="px-3 py-2 font-bold">Quantity</th>
                <th className="px-3 py-2 font-bold">Price</th>
                <th className="px-3 py-2 font-bold">Date</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {pageRows.map((r, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="px-3 py-2 text-slate-900 font-semibold">{r.productName}</td>
                  <td className="px-3 py-2 text-slate-700">{r.quantity}</td>
                  <td className="px-3 py-2 text-slate-700">{money(r.price)}</td>
                  <td className="px-3 py-2 text-slate-500">{r.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* pagination */}
        <div className="mt-3 flex items-center justify-end gap-2 text-xs">
          <button
            className="rounded-md border border-slate-200 px-2 py-1 hover:bg-slate-50 disabled:opacity-50"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            type="button"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              className={`rounded-md px-2 py-1 border ${p === page
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
              onClick={() => setPage(p)}
              type="button"
            >
              {p}
            </button>
          ))}

          <button
            className="rounded-md border border-slate-200 px-2 py-1 hover:bg-slate-50 disabled:opacity-50"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            type="button"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
