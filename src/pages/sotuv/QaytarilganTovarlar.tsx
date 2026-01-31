import { useState, useEffect } from "react";
import { fetchOrders } from "@/api/ApiFunction";
import Loader from "@/pages/components/Loading";
import { Loader2 } from "lucide-react";

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
  status: string;
};

export default function QaytarilganTovarlar() {
  const { t } = useTranslation();
  const onlyDate = (iso?: string) => (iso ? iso.slice(0, 10) : "-");
  const [data, setData] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchOrders()
      .then((item) => {
        const rows: Row[] = item.map((item) => ({
          id: item.id,
          client_name: item.client_name,
          product_title: item.product_title,
          created_at: String(item.created_at),
          item_quantity: Number(item.item_quantity),
          item_price: Number(item.item_price),
          nds_percent: Number(item.nds_percent),
          price_with_nds: Number(item.price_with_nds),
          total_price: Number(item.total_price),
          status: String(item.status),
        }));
// afasfafafaf
        setData(rows);
      })
      .catch((e) => {
        setError(e?.message ?? "Xatolik");
      })
      .finally(() => setLoading(false));
  }, []);

  const normalizedSearch = search.trim().toLowerCase();
  const filteredData = normalizedSearch
    ? data.filter((row) => {
        const haystack = [
          row.client_name,
          row.product_title,
          row.created_at,
          row.status,
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
      })
    : data;

  return (
    <div className="container mx-auto px-8 w-full">
      <section className="bg-[#EBF0FA] border border-[#334F9D] rounded-3xl shadow-sm px-6 max-w-[1402px] my-8">
        <div className="flex items-center justify-between mb-4 mt-6">
          <h2 className="font-bold text-[28px] text-black">
            {t("returned.qaytarilgan_tovarlar")}
          </h2>

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={t("returned.searchPlaceholder")}
            className="w-[260px] h-[34px] rounded-3xl px-4 text-[15px] border border-[#334F9D] bg-white text-black outline-none focus:ring-2 focus:ring-[#1C96C8]"
          />
        </div>
        {loading && (
          <div className="flex flex-col gap-4 items-center justify-center w-full h-[400px]">
            <Loader size={0.5} />

            <div className="flex flex-row gap-2">
              <p className="text-[#334F9D] text-[25px] ">
                {t("returned.loading")}
              </p>
              <Loader2 className="animate-spin mt-2 text-[#334F9D]" />
            </div>
          </div>
        )}
        {!loading && error && (
          <div className="text-center text-[#D84040] text-lg">
            {t("returned.errorApi")} {error}
          </div>
        )}
        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left text-[#334F9D] text-[18px]">
                  <th className="py-3 px-2 font-medium">S/N</th>
                  <th className="py-3 px-3 font-medium">
                    {t("table.clientName")}
                  </th>
                  <th className="py-3 font-medium">{t("table.productName")}</th>
                  <th className="py-3 font-medium">{t("table.quantity")}</th>
                  <th className="py-3 px-2 font-medium">{t("table.price")}</th>
                  <th className="py-3 px-2 font-medium">
                    {t("table.ndsPercent")}
                  </th>
                  <th className="py-3 px-2 font-medium">
                    {t("table.ndsPrice")}
                  </th>
                  <th className="py-3 px-2 font-medium">
                    {t("table.totalPrice")}
                  </th>
                  <th className="py-3 px-2 font-medium">Sanasi</th>
                  <th className="py-3 px-2 font-medium">{t("table.status")}</th>
                </tr>
              </thead>

              <tbody>
                {filteredData.map((row, index) => (
                  <tr
                    key={row.id}
                    className="border-t border-[#D0D0D0] text-sm text-black"
                  >
                    <td className="py-4 px-4">
                      {String(index + 1).padStart(2, "0")}
                    </td>
                    <td className="py-4 px-6">{row.client_name}</td>
                    <td className="py-4 px-1.5">{row.product_title}</td>
                    <td className="py-4 px-4">{row.item_quantity}</td>
                    <td className="py-4 px-3">{row.item_price}</td>
                    <td className="py-4 px-6">{row.nds_percent}</td>
                    <td className="py-4 px-5">{row.price_with_nds}</td>
                    <td className="py-4 px-8">{row.total_price}</td>
                    <td>{onlyDate(row.created_at)}</td>
                    <td className="py-4">{row.status}</td>
                  </tr>
                ))}

                {filteredData.length === 0 && (
                  <tr>
                    <td
                      colSpan={11}
                      className="text-center py-6 text-slate-500"
                    >
                      {data.length === 0 ? "Hozircha yo'q" : "Topilmadi"}
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
