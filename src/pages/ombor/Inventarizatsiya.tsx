import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

type Status = "pending" | "sent" | "accepted";
type Kind = "product" | "ingredient";

type BaseRow = {
  id: string;
  kind: Kind;
  title: string;        // product label yoki ingredient name
  miqdor: string;       // numeric string
  narx: string;         // numeric string (total yoki narx)
  sana: string;         // yyyy-mm-dd
  status: Status;
};

type ProductRow = BaseRow & {
  kind: "product";
  tovarId: string;
  omborQattan: string;
  omborQayerga: string;
  tolovTuri: string;
  nds: string;          // "12%"
  narxNdsBilan: string; // numeric string
};

type IngredientRow = BaseRow & {
  kind: "ingredient";
  ingredientName: string;
  narxKg: string;        // numeric string
  miqdorKg: string;      // numeric string
  donaSoni: string;      // numeric string
  jamiPul: string;       // numeric string
  birDonaNarx: string;   // numeric string
};

const LS_ROWS = "inv_rows_v1";

function lsGet<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}
function lsSet<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

const statusLabel: Record<Status, string> = {
  pending: "Kutilmoqda",
  sent: "Yuborilgan",
  accepted: "Qabul qilingan",
};

function StatusPill({ status }: { status: Status }) {
  const base =
    "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold";
  if (status === "pending")
    return (
      <span className={`${base} border-amber-300 bg-amber-50 text-amber-700`}>
        <span className="h-2 w-2 rounded-full bg-amber-500" />
        {statusLabel[status]}
      </span>
    );
  if (status === "sent")
    return (
      <span className={`${base} border-sky-300 bg-sky-50 text-sky-700`}>
        <span className="h-2 w-2 rounded-full bg-sky-500" />
        {statusLabel[status]}
      </span>
    );
  return (
    <span className={`${base} border-emerald-300 bg-emerald-50 text-emerald-700`}>
      <span className="h-2 w-2 rounded-full bg-emerald-500" />
      {statusLabel[status]}
    </span>
  );
}

export default function InventarizatsiyaPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Kind>("product");

  const [rows, setRows] = useState<(ProductRow | IngredientRow)[]>(
    () => lsGet<(ProductRow | IngredientRow)[]>(LS_ROWS, [])
  );

  const filtered = useMemo(() => rows.filter((r) => r.kind === tab), [rows, tab]);

  const updateStatus = (id: string, status: Status) => {
    const next = rows.map((r) => (r.id === id ? { ...r, status } : r));
    setRows(next);
    lsSet(LS_ROWS, next);
  };

  return (
    <div className="p-8">
      {/* top header */}
      <div className="flex items-start justify-between gap-6">
        <div>
          <div className="text-3xl font-bold text-slate-900">Inventarizatsiya</div>
          <div className="mt-1 text-slate-500">
            Product yoki Ingredient qo‘shilgan ma’lumotlar shu yerda turadi
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Qoldiqlashga o‘xshagan switch */}
          <div className="rounded-full border border-[#334F9D] p-1 bg-white">
            <button
              onClick={() => {
                setTab("product");
                navigate("/ombor/inventarizatsiya");
              }}
              className={[
                "px-5 py-2 rounded-full font-semibold",
                tab === "product"
                  ? "bg-linear-to-r from-[#1C96C8] to-[#334F9D] text-white"
                  : "text-slate-600",
              ].join(" ")}
            >
              Productlar
            </button>
            <button
              onClick={() => {
                setTab("ingredient");
                navigate("/ombor/inventarizatsiya");
              }}
              className={[
                "px-5 py-2 rounded-full font-semibold",
                tab === "ingredient"
                  ? "bg-linear-to-r from-[#1C96C8] to-[#334F9D] text-white"
                  : "text-slate-600",
              ].join(" ")}
            >
              Ingredientlar
            </button>
          </div>

          <button
            onClick={() =>
              navigate(
                tab === "product"
                  ? "/ombor/inventarizatsiya/product-qoshish"
                  : "/ombor/inventarizatsiya/ingredient-qoshish"
              )
            }
            className="rounded-xl bg-[#334F9D] px-6 py-3 font-semibold text-white shadow hover:opacity-95"
          >
            {tab === "product" ? "Product qo‘shish" : "Ingredient qo‘shish"}
          </button>
        </div>
      </div>

      {/* table */}
      <div className="mt-8 rounded-3xl border bg-white shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 text-slate-600">
            <tr className="text-left">
              <th className="px-6 py-5 font-semibold">S/N</th>
              <th className="px-6 py-5 font-semibold">{tab === "product" ? "Tovar ID" : "Ingredient"}</th>
              <th className="px-6 py-5 font-semibold">{tab === "product" ? "Shtab qattan" : "Narx/kg"}</th>
              <th className="px-6 py-5 font-semibold">{tab === "product" ? "Shtab qayerga" : "Miqdor (kg)"}</th>
              <th className="px-6 py-5 font-semibold">{tab === "product" ? "To‘lov turi" : "Dona"}</th>
              <th className="px-6 py-5 font-semibold">Narhi</th>
              <th className="px-6 py-5 font-semibold">Sana</th>
              <th className="px-6 py-5 font-semibold">Status</th>
              <th className="px-6 py-5 font-semibold">O‘zgartirish</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td className="px-6 py-10 text-slate-500" colSpan={9}>
                  Hozircha ma’lumot yo‘q.
                </td>
              </tr>
            ) : (
              filtered.map((r, idx) => (
                <tr key={r.id} className="border-t">
                  <td className="px-6 py-6 text-slate-700">{String(idx + 1).padStart(2, "0")}</td>

                  {r.kind === "product" ? (
                    <>
                      <td className="px-6 py-6 font-semibold text-slate-900">{r.tovarId}</td>
                      <td className="px-6 py-6 text-slate-700">{r.omborQattan}</td>
                      <td className="px-6 py-6 text-slate-700">{r.omborQayerga}</td>
                      <td className="px-6 py-6 text-slate-700">{r.tolovTuri}</td>
                      <td className="px-6 py-6 font-bold text-slate-900">{r.narxNdsBilan}</td>
                    </>
                  ) : (
                    <>
                      <td className="px-6 py-6 font-semibold text-slate-900">{r.ingredientName}</td>
                      <td className="px-6 py-6 text-slate-700">{r.narxKg}</td>
                      <td className="px-6 py-6 text-slate-700">{r.miqdorKg}</td>
                      <td className="px-6 py-6 text-slate-700">{r.donaSoni}</td>
                      <td className="px-6 py-6 font-bold text-slate-900">{r.jamiPul}</td>
                    </>
                  )}

                  <td className="px-6 py-6 text-slate-700">{r.sana}</td>

                  <td className="px-6 py-6">
                    <StatusPill status={r.status} />
                  </td>

                  <td className="px-6 py-6">
                    <select
                      className="h-10 rounded-xl border px-3 font-semibold text-slate-700"
                      value={r.status}
                      onChange={(e) => updateStatus(r.id, e.target.value as Status)}
                    >
                      <option value="pending">Kutilmoqda</option>
                      <option value="sent">Yuborilgan</option>
                      <option value="accepted">Qabul qilingan</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}