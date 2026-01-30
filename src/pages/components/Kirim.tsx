import { useEffect, useMemo, useState } from "react";
import axios from "axios";

type Unit = "PIECE";

type ProductRow = {
  id: number;
  title: string;
  description: string;
  quantity: string;
  unit: Unit;
  cost_price: string;
  price_without_nds: string;
  nds_percent: string;
};

const STORAGE_KEY = "confirmed_rows";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  timeout: 8000, // ⬅️ uzoq kutmasin
});

export default function Kirim() {
  const [rows, setRows] = useState<ProductRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [confirmedIds, setConfirmedIds] = useState<number[]>([]);

  // ✅ confirmed larni localStorage dan olish
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setConfirmedIds(JSON.parse(saved));
    } catch {
      // ignore
    }
  }, []);

  // ✅ backend’dan data olish
  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        setLoading(true);
        setError("");

        const res = await api.get("/api/v1/catalog/product/", {
          signal: controller.signal,
          // token kerak bo‘lsa:
          // headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
        });

        const list: ProductRow[] = Array.isArray(res.data)
          ? res.data
          : res.data?.results ?? [];

        setRows(list);
      } catch (e: any) {
        // abort bo‘lsa jim
        if (axios.isCancel?.(e) || e?.name === "CanceledError") return;

        // ✅ eng muhim: REFUSED ni alohida ushla
        if (e?.code === "ERR_NETWORK" || String(e?.message).includes("Network Error")) {
          setError(
            "Backend ishlamayapti: 127.0.0.1:8000 ga ulanib bo‘lmadi (runserver yoqilmagan bo‘lishi mumkin)."
          );
          return;
        }

        const status = e?.response?.status;
        const detail = e?.response?.data?.detail;
        setError(`(${status || "NO_STATUS"}) ${detail || e?.message || "Xatolik"}`);
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, []);

  const confirmRow = (id: number) => {
    if (confirmedIds.includes(id)) return;
    const updated = [...confirmedIds, id];
    setConfirmedIds(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const isConfirmed = (id: number) => confirmedIds.includes(id);

  const empty = useMemo(() => !loading && rows.length === 0, [loading, rows.length]);

  return (
    <div className="px-8">
      <div className="max-w-full pt-10 mx-auto">
        <div className="rounded-3xl p-px bg-linear-to-r from-[#6C63FF] to-[#00C2FF] shadow-xl">
          <div className="rounded-3xl bg-[#F6F8FF] max-h-134 overflow-auto">
            <div className="px-6 py-4">
              {loading && <div className="text-sm text-gray-500">Yuklanmoqda...</div>}
              {error && <div className="text-sm text-red-600">{error}</div>}
            </div>

            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-[#F6F8FF] border-b text-gray-500">
                <tr>
                  <th className="px-6 py-4 text-left">S/N</th>
                  <th className="px-6 py-4 text-left">Title</th>
                  <th className="px-6 py-4 text-left">Description</th>
                  <th className="px-6 py-4 text-left">Quantity</th>
                  <th className="px-6 py-4 text-left">Unit</th>
                  <th className="px-6 py-4 text-left">Cost</th>
                  <th className="px-6 py-4 text-left">Price (no NDS)</th>
                  <th className="px-6 py-4 text-left">NDS %</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                {rows.map((row, index) => {
                  const confirmed = isConfirmed(row.id);

                  return (
                    <tr key={row.id} className="border-b hover:bg-[#EEF2FF] transition">
                      <td className="px-6 py-4">{String(index + 1).padStart(2, "0")}</td>
                      <td className="px-6 py-4 font-medium">{row.title}</td>
                      <td className="px-6 py-4">{row.description}</td>
                      <td className="px-6 py-4">{row.quantity}</td>
                      <td className="px-6 py-4">{row.unit}</td>
                      <td className="px-6 py-4">{row.cost_price}</td>
                      <td className="px-6 py-4">{row.price_without_nds}</td>
                      <td className="px-6 py-4">{row.nds_percent}</td>

                      <td className="px-6 py-4">
                        {confirmed ? (
                          <span className="text-green-600 font-semibold">Tasdiqlangan</span>
                        ) : (
                          <span className="text-orange-500 font-semibold">Tasdiqlanmagan</span>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <button
                          disabled={confirmed}
                          onClick={() => confirmRow(row.id)}
                          className={[
                            "px-4 py-1.5 rounded-lg text-xs font-semibold transition",
                            confirmed
                              ? "bg-green-100 text-green-700 cursor-not-allowed"
                              : "bg-[#334F9D] text-white hover:opacity-90",
                          ].join(" ")}
                        >
                          {confirmed ? "Tasdiqlangan" : "Tasdiqlash"}
                        </button>
                      </td>
                    </tr>
                  );
                })}

                {empty && (
                  <tr>
                    <td className="px-6 py-8 text-gray-500" colSpan={10}>
                      Hozircha ma’lumot yo‘q
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* 🔻 eng muhim eslatma */}
            {error.includes("Backend ishlamayapti") && (
              <div className="px-6 pb-6 text-xs text-gray-600">
                Backendni yoqish: <span className="font-mono">python manage.py runserver 127.0.0.1:8000</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
