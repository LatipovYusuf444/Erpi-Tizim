import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Status = "pending" | "sent" | "accepted";

type InventoryRow = {
  id: string;
  tovarId: string;
  yuboruvchi: string;
  qabulQiluvchi: string;
  tovarNomi: string;
  miqdori: number;
  narhi: string;
  sana: string;
  status: Status;
};

type ProductData = {
  tovarId: string;
  tovarLabel?: string;

  omborQattan: string;
  omborQattanLabel?: string;

  omborQayerga: string;
  omborQayergaLabel?: string;

  miqdor: string;
  nds: string;
  narxNdsBilan: string;
  sana: string;

  tolovTuri: string;
  tolovTuriLabel?: string;

  status?: Status;
};

const LS_KEY = "inventarizatsiya_rows";

export default function Inventarizatsiya() {
  const navigate = useNavigate();
  const location = useLocation();

  const demoRows: InventoryRow[] = useMemo(
    () => [
      {
        id: "demo-1",
        tovarId: "20202020",
        yuboruvchi: "Jasmina",
        qabulQiluvchi: "Omina",
        tovarNomi: "Tarelka (25sm) — 100 dona",
        miqdori: 1500,
        narhi: "1 000 000",
        sana: "20.09.25",
        status: "sent",
      },
      {
        id: "demo-2",
        tovarId: "33001122",
        yuboruvchi: "Sardor",
        qabulQiluvchi: "Dilshod",
        tovarNomi: "Vilka — plastik (qora)",
        miqdori: 800,
        narhi: "420 000",
        sana: "19.09.25",
        status: "accepted",
      },
      {
        id: "demo-3",
        tovarId: "88440011",
        yuboruvchi: "Madina",
        qabulQiluvchi: "Zuhra",
        tovarNomi: "Stakan 200ml — shaffof",
        miqdori: 2400,
        narhi: "780 000",
        sana: "19.09.25",
        status: "pending",
      },
    ],
    []
  );

  const [rows, setRows] = useState<InventoryRow[]>([]);

  const readLS = (): InventoryRow[] => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  const writeLS = (data: InventoryRow[]) => {
    localStorage.setItem(LS_KEY, JSON.stringify(data));
  };

  useEffect(() => {
    const saved = readLS();
    if (saved.length > 0) setRows(saved);
    else {
      setRows(demoRows);
      writeLS(demoRows);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [demoRows]);

  // ✅ add new row from ProductQoshishPage
  useEffect(() => {
    const state = location.state as { productData?: ProductData } | undefined;
    const pd = state?.productData;
    if (!pd) return;

    const newRow: InventoryRow = {
      id: makeId(),
      tovarId: pd.tovarId || "—",
      yuboruvchi: pd.omborQattanLabel || pd.omborQattan || "—",
      qabulQiluvchi: pd.omborQayergaLabel || pd.omborQayerga || "—",
      tovarNomi: pd.tovarLabel || "—",
      miqdori: Number(pd.miqdor || 0),
      narhi: pd.narxNdsBilan ? formatMoney(pd.narxNdsBilan) : "—",
      sana: pd.sana ? formatDate(pd.sana) : "—",
      status: pd.status || "pending",
    };

    setRows((prev) => {
      const updated = [newRow, ...prev];
      writeLS(updated);
      return updated;
    });

    navigate(location.pathname, { replace: true, state: null });
  }, [location.pathname, location.state, navigate]);

  // ✅ status change handler (select)
  const changeStatus = (id: string, status: Status) => {
    setRows((prev) => {
      const updated = prev.map((r) => (r.id === id ? { ...r, status } : r));
      writeLS(updated);
      return updated;
    });
  };

  const selectContentClass =
    "z-[9999] bg-white text-slate-900 border border-slate-200 shadow-2xl rounded-xl";
  const triggerClass =
    "h-10 rounded-full border border-slate-200 bg-white px-4 text-xs font-semibold";

  return (
    <div className="px-8 py-6">
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="flex items-center justify-between gap-4 mb-5">
          <div>
            <h1 className="text-2xl font-semibold text-slate-800">Inventarizatsiya</h1>
            <p className="text-sm text-slate-500 mt-1">
              Product qo‘shilgandan keyin kelgan ma’lumotlar shu yerda chiqadi
            </p>
          </div>

          <Button
            className="rounded-xl bg-[#334F9D] text-white hover:opacity-95"
            onClick={() => navigate("/ombor/qoldiqlash/product")}
          >
            Yana product qo‘shish
          </Button>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="overflow-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-500 border-b">
                <tr>
                  <Th>S/N</Th>
                  <Th>Tovar ID</Th>
                  <Th>Yuboruvchi</Th>
                  <Th>Qabul qiluvchi</Th>
                  <Th>Tovar nomi</Th>
                  <Th>Miqdori</Th>
                  <Th>Narhi</Th>
                  <Th>Sana</Th>
                  <Th>Status</Th>
                </tr>
              </thead>

              <tbody>
                {rows.map((r, idx) => (
                  <tr key={r.id} className="border-b last:border-b-0 hover:bg-slate-50/60 transition">
                    <Td className="text-slate-700">{String(idx + 1).padStart(2, "0")}</Td>
                    <Td className="text-slate-800">{r.tovarId}</Td>
                    <Td className="text-slate-800">{r.yuboruvchi}</Td>
                    <Td className="text-slate-800">{r.qabulQiluvchi}</Td>
                    <Td className="font-semibold text-slate-900">{r.tovarNomi}</Td>
                    <Td className="text-slate-800">{r.miqdori}</Td>
                    <Td className="font-semibold text-slate-900">{r.narhi}</Td>
                    <Td className="text-slate-800">{r.sana}</Td>

                    {/* ✅ SELECT STATUS */}
                    <Td>
                      <Select value={r.status} onValueChange={(v: Status) => changeStatus(r.id, v)}>
                        <SelectTrigger className={triggerClass}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className={selectContentClass}>
                          <SelectItem value="pending">Kutilmoqda</SelectItem>
                          <SelectItem value="sent">Yuborilgan</SelectItem>
                          <SelectItem value="accepted">Qabul qilingan</SelectItem>
                        </SelectContent>
                      </Select>
                    </Td>
                  </tr>
                ))}

                {rows.length === 0 && (
                  <tr>
                    <td className="px-6 py-10 text-center text-slate-500" colSpan={9}>
                      Hozircha ma’lumot yo‘q
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

/* table helpers */
function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-6 py-4 text-left font-medium whitespace-nowrap">{children}</th>;
}
function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-6 py-5 align-middle ${className}`}>{children}</td>;
}

/* helpers */
function makeId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
function formatDate(iso: string) {
  const [y, m, d] = iso.split("-");
  if (!y || !m || !d) return iso;
  return `${d}.${m}.${y.slice(-2)}`;
}
function formatMoney(x: string) {
  const n = String(x).replace(/\s+/g, "");
  if (!/^\d+(\.\d+)?$/.test(n)) return x;
  const [int, dec] = n.split(".");
  const withSpace = int.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return dec ? `${withSpace}.${dec}` : withSpace;
}