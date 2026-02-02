import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { fetchOrders } from "@/api/ApiFunction";
import Loader from "@/pages/components/Loading";
import { Loader2 } from "lucide-react";
import { LangToggle } from "@/shared/i18n/LangToggle";
import { useTranslation } from "react-i18next";

type Row = {
  id: number;
  client_name: string;
  product_title: string;
  created_at: string;
  item_quantity: number;
  item_price: number;
  nds_percent: number;
  price_with_nds: number;
  total_price: number;
};

// ФЕЙК ДАННЫЕ (если backend off)
const FAKE_DATA: Row[] = [
  {
    id: 1,
    client_name: "Asilbek",
    product_title: "Konteyner",
    created_at: "2025-02-29T10:00:00Z",
    item_quantity: 280,
    item_price: 805200,
    nds_percent: 1.5,
    price_with_nds: 845000,
    total_price: 17910000,
  },
  {
    id: 2,
    client_name: "Sardor",
    product_title: "Paket",
    created_at: "2026-01-09T08:20:00Z",
    item_quantity: 14,
    item_price: 395010,
    nds_percent: 22,
    price_with_nds: 9986000,
    total_price: 3810000,
  },
  {
    id: 3,
    client_name: "Samandar",
    product_title: "Karton quti",
    created_at: "2025-12-22T12:45:00Z",
    item_quantity: 57,
    item_price: 855000,
    nds_percent: 19,
    price_with_nds: 920000,
    total_price: 2410000,
  },
];

export default function KunlikTopshirish() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onlyDate = (iso?: string) => (iso ? String(iso).slice(0, 10) : "-");

  const [data, setData] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(false); //  показываем что это фейк
  const [search, setSearch] = useState("");

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setIsFallback(false);

    fetchOrders()
      .then((items: any[]) => {
        if (!mounted) return;

        const rows: Row[] = items.map((item) => ({
          id: Number(item.id),
          client_name: String(item.client_name ?? ""),
          product_title: String(item.product_title ?? ""),
          created_at: String(item.created_at ?? ""),
          item_quantity: Number(item.item_quantity ?? 0),
          item_price: Number(item.item_price ?? 0),
          nds_percent: Number(item.nds_percent ?? 0),
          price_with_nds: Number(item.price_with_nds ?? 0),
          total_price: Number(item.total_price ?? 0),
        }));

        //  если с бэка пришло пусто — тоже можно показать фейк (опционально)
        if (rows.length === 0) {
          setData(FAKE_DATA);
          setIsFallback(true);
        } else {
          setData(rows);
        }
      })
      .catch(() => {
        if (!mounted) return;
        // backend не работает → подставляем фейк
        setData(FAKE_DATA);
        setIsFallback(true);
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const filteredData = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    if (!normalizedSearch) return data;

    return data.filter((row) => {
      const haystack = [
        row.client_name,
        row.product_title,
        row.created_at,
        String(row.item_quantity),
        String(row.item_price),
        String(row.nds_percent),
        String(row.price_with_nds),
        String(row.total_price),
        String(row.id),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalizedSearch);
    });
  }, [data, search]);

  return (
    <div className="container mx-auto px-8 w-full">
      <section className="bg-[#EBF0FA] border border-[#334F9D] rounded-3xl shadow-sm px-6 max-w-[1402px] my-8">
        <div className="flex items-center justify-between mb-4 mt-6">
          <div className="flex items-center gap-3">
            <h2 className="font-bold text-[28px] text-black">
              {t("kunlikYopish.kunlikYopish")}
            </h2>

            {/*  если бэк off — покажем маленький бейдж */}
            {isFallback && (
              <span className="text-xs px-3 py-1 rounded-full bg-white border border-[#334F9D] text-[#334F9D]">
                Demo (backend off)
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={t("salesList.searchPlaceholder")}
              className="w-[260px] h-[34px] rounded-3xl px-4 text-[15px] border border-[#334F9D] bg-white text-black outline-none focus:ring-2 focus:ring-[#1C96C8]"
            />
            <button
              onClick={() => navigate("/sotuv/sotuv-qoshish-form")}
              type="button"
              className="text-white cursor-pointer bg-gradient-to-l from-[#1C96C8] to-[#334F9D] w-[110px] h-[34px] rounded-3xl text-[19px] hover:bg-gradient-to-t"
            >
              {t("common.add")}
            </button>
            <LangToggle />
          </div>
        </div>

        {loading && (
          <div className="flex flex-col gap-4 items-center justify-center w-full h-[400px]">
            <Loader size={0.5} />
            <div className="flex flex-row gap-2">
              <p className="text-[#334F9D] text-[25px]">
                {t("salesList.loading")}
              </p>
              <Loader2 className="animate-spin mt-2 text-[#334F9D]" />
            </div>
          </div>
        )}

        {/*  error вообще не показываем, потому что мы подставляем FAKE_DATA */}

        {!loading && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left text-[#334F9D] text-[18px]">
                  <th className="py-3 text-center font-medium">
                    {t("table.sn")}
                  </th>
                  <th className="py-3 text-center font-medium">
                    {t("table.clientName")}
                  </th>
                  <th className="py-3 text-center font-medium">
                    {t("table.productName")}
                  </th>
                  <th className="py-3 text-center font-medium">
                    {t("table.quantity")}
                  </th>
                  <th className="py-3 text-center font-medium">
                    {t("table.price")}
                  </th>
                  <th className="py-3 text-center font-medium">
                    {t("table.ndsPercent")}
                  </th>
                  <th className="py-3 text-center font-medium">
                    {t("table.ndsPrice")}
                  </th>
                  <th className="py-3 text-center font-medium">
                    {t("table.totalPrice")}
                  </th>
                  <th className="py-3 text-center font-medium">
                    {t("table.date")}
                  </th>
                  <th className="py-3 text-center font-medium">
                    {t("common.actions")}
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredData.map((row, index) => (
                  <tr
                    key={row.id}
                    className="border-t border-[#D0D0D0] text-sm text-black"
                  >
                    <td className="py-4 text-center">
                      {String(index + 1).padStart(2, "0")}
                    </td>
                    <td className="py-4 text-center">{row.client_name}</td>
                    <td className="py-4 text-center">{row.product_title}</td>
                    <td className="py-4 text-center">{row.item_quantity}</td>
                    <td className="py-4 text-center">{row.item_price}</td>
                    <td className="py-4 text-center">{row.nds_percent}</td>
                    <td className="py-4 text-center">{row.price_with_nds}</td>
                    <td className="py-4 text-center">{row.total_price}</td>
                    <td className="py-4 text-center">
                      {onlyDate(row.created_at)}
                    </td>

                    <td className="py-4">
                      <div className="flex justify-center gap-2">
                        <button
                          type="button"
                          className="text-white cursor-pointer bg-gradient-to-t from-[#1C96C8] to-[#334F9D] hover:bg-gradient-to-b w-[80px] h-[30px] rounded-3xl"
                        >
                          {t("common.edit")}
                        </button>
                        <button
                          type="button"
                          className="text-white cursor-pointer bg-gradient-to-l from-[#1C96C8] to-[#334F9D] hover:bg-gradient-to-r w-[80px] h-[30px] rounded-3xl"
                        >
                          {t("common.delete")}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredData.length === 0 && (
                  <tr>
                    <td
                      colSpan={10}
                      className="text-center py-6 text-slate-500"
                    >
                      {data.length === 0
                        ? t("salesList.emptyNow")
                        : t("salesList.notFound")}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
