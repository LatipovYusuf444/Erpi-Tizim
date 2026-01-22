type Row = {
  id: number
  tovarId: string
  tovarNomi: string
  soni: number
  narhi: string
  status: "bor" | "kam" | "tugagan"
}
import { useEffect, useMemo, useState } from "react"
import { deliveryData, type DeliveryRow } from "@/data/delivery-data"

const formatSum = (n: number) => new Intl.NumberFormat("ru-RU").format(n)

const statusLabel = (s: DeliveryRow["status"]) => {
  switch (s) {
    case "yolda": return "Yo‘lda"
    case "qabul_qilingan": return "Qabul qilingan"
    case "kutilmoqda": return "Kutilmoqda"
    case "bekor_qilingan": return "Bekor qilingan"
    case "qaytarilgan": return "Qaytarilgan"
  }
}
const statusBadge = (s: DeliveryRow["status"]) => {
  switch (s) {
    case "qabul_qilingan": return "bg-emerald-50 text-emerald-700 ring-emerald-200"
    case "yolda": return "bg-sky-50 text-sky-700 ring-sky-200"
    case "kutilmoqda": return "bg-amber-50 text-amber-700 ring-amber-200"
    case "bekor_qilingan": return "bg-rose-50 text-rose-700 ring-rose-200"
    case "qaytarilgan": return "bg-violet-50 text-violet-700 ring-violet-200"
  }
}

const STATUS_OPTIONS: { value: "all" | DeliveryRow["status"]; label: string }[] = [
  { value: "all", label: "Barchasi" },
  { value: "yolda", label: "Yo‘lda" },
  { value: "qabul_qilingan", label: "Qabul qilingan" },
  { value: "kutilmoqda", label: "Kutilmoqda" },
  { value: "bekor_qilingan", label: "Bekor qilingan" },
  { value: "qaytarilgan", label: "Qaytarilgan" },
]

export default function Navbar4() {
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState<"all" | DeliveryRow["status"]>("all")
  const [page, setPage] = useState(1)
  const perPage = 10

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()

    return deliveryData.filter((r) => {
      const okStatus = status === "all" ? true : r.status === status
      if (!okStatus) return false
      if (!q) return true

      const haystack = [
        r.tovarId,
        r.dastavshik,
        r.qabulQiluvchi,
        r.tovarNomi,
        r.sana,
        statusLabel(r.status),
      ]
        .join(" ")
        .toLowerCase()

      return haystack.includes(q)
    })
  }, [query, status])

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))

  const pageData = useMemo(() => {
    const safePage = Math.min(Math.max(page, 1), totalPages)
    const start = (safePage - 1) * perPage
    return filtered.slice(start, start + perPage)
  }, [filtered, page, totalPages, perPage])

  useEffect(() => setPage(1), [query, status])

  const data: Row[] = Array.from({ length: 12 }).map((_, i) => ({
    id: i + 1,
    tovarId: "20202020",
    tovarNomi: "Tarelka",
    soni: 20,
    narhi: "1 000 000",
    status: i === 0 ? "bor" : "kam",
  }))
  return (
    <div className="px-8">

      <div className="max-w-full mt-10  mx-auto">
        <div className="relative rounded-3xl p-px bg-linear-to-r from-[#6C63FF] to-[#00C2FF] shadow-xl">
          <div className="rounded-3xl bg-[#F6F8FF]">
            <div className="px-6 pt-6 pb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Yetkazmalar ro‘yxati</h2>
                <p className="text-xs text-gray-500">Search + Filter + Pagination</p>
              </div>

              <div className="flex gap-3 w-full md:w-auto">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Qidirish: tovar, ID, dastavshik..."
                  className="w-full md:w-[320px] h-10 px-4 rounded-xl border border-[#DCE1FF] bg-white/60 outline-none focus:border-[#6C63FF]"
                />

                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="h-10 px-3 rounded-xl border border-[#DCE1FF] bg-white/60 outline-none focus:border-[#00C2FF]"
                >
                  {STATUS_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="max-h-120 overflow-auto rounded-3xl custom-scroll">
              <table className="w-full text-sm">
                <thead className="sticky top-0 z-10 bg-[#F6F8FF]/95 backdrop-blur border-y text-gray-500">
                  <tr>
                    <th className="px-6 py-4 text-left font-medium">S/N</th>
                    <th className="px-6 py-4 text-left font-medium">Tovar ID</th>
                    <th className="px-6 py-4 text-left font-medium">Dastavshik</th>
                    <th className="px-6 py-4 text-left font-medium">Qabul qiluvchi</th>
                    <th className="px-6 py-4 text-left font-medium">Tovar nomi</th>
                    <th className="px-6 py-4 text-left font-medium">Miqdori</th>
                    <th className="px-6 py-4 text-left font-medium">Narhi</th>
                    <th className="px-6 py-4 text-left font-medium">Sana</th>
                    <th className="px-6 py-4 text-left font-medium">Status</th>
                  </tr>
                </thead>

                <tbody className="text-gray-800">
                  {pageData.map((r, idx) => (
                    <tr
                      key={r.id}
                      className={[
                        "border-b last:border-none transition",
                        idx % 2 === 0 ? "bg-white/40" : "bg-transparent",
                        "hover:bg-[#EEF2FF]",
                      ].join(" ")}
                    >
                      <td className="px-6 py-4">
                        {String((page - 1) * perPage + idx + 1).padStart(2, "0")}
                      </td>
                      <td className="px-6 py-4">{r.tovarId}</td>
                      <td className="px-6 py-4">{r.dastavshik}</td>
                      <td className="px-6 py-4">{r.qabulQiluvchi}</td>
                      <td className="px-6 py-4 font-medium">{r.tovarNomi}</td>
                      <td className="px-6 py-4">{r.miqdori}</td>
                      <td className="px-6 py-4 font-semibold">{formatSum(r.narhi)}</td>
                      <td className="px-6 py-4">{r.sana}</td>
                      <td className="px-6 py-4">
                        <span
                          className={[
                            "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ring-1",
                            statusBadge(r.status),
                          ].join(" ")}
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
                          {statusLabel(r.status)}
                        </span>
                      </td>
                    </tr>
                  ))}

                  {pageData.length === 0 && (
                    <tr>
                      <td className="px-6 py-10 text-center text-gray-500" colSpan={9}>
                        Hech narsa topilmadi 😕
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-4 flex items-center justify-between">
              <div className="text-xs text-gray-500">
                {filtered.length} ta natija • {page}/{totalPages} sahifa
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className={[
                    "h-9 px-3 rounded-xl text-sm font-semibold transition",
                    page <= 1
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-white/70 hover:bg-white text-gray-800 border border-[#DCE1FF]",
                  ].join(" ")}
                >
                  Orqaga
                </button>

                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                  className={[
                    "h-9 px-3 rounded-xl text-sm font-semibold transition",
                    page >= totalPages
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-white/70 hover:bg-white text-gray-800 border border-[#DCE1FF]",
                  ].join(" ")}
                >
                  Keyingi
                </button>
              </div>
            </div>
          </div>
        </div>

        <style>{`
        .custom-scroll::-webkit-scrollbar { height: 8px; width: 8px; }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #6C63FF, #00C2FF);
          border-radius: 999px;
        }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
      `}</style>
      </div>
    </div>
  );
}