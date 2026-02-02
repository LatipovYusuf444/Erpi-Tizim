import { useEffect, useMemo, useState } from "react";
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

// ✅ ФЕЙК ДАННЫЕ (если backend off)
const FAKE_DATA: Row[] = [
  {
    id: 101,
    client_name: "Laziz",
    product_title: "Paket",
    created_at: "2025-11-05T08:20:00Z",
    item_quantity: 10,
    item_price: 390000,
    nds_percent: 2,
    price_with_nds: 336000,
    total_price: 3360000,
    status: "Qaytarilgan",
  },
  {
    id: 102,
    client_name: "Komil",
    product_title: "Konteyner",
    created_at: "2025-10-28T10:00:00Z",
    item_quantity: 20,
    item_price: 850000,
    nds_percent: 12,
    price_with_nds: 896000,
    total_price: 17920000,
    status: "Singan",
  },
  {
    id: 103,
    client_name: "Jasur",
    product_title: "Karton quti",
    created_at: "2025-12-02T12:45:00Z",
    item_quantity: 5,
    item_price: 500000,
    nds_percent: 19,
    price_with_nds: 560000,
    total_price: 2800000,
    status: "Brak",
  },
  {
    id: 203,
    client_name: "Fozil",
    product_title: "Paket",
    created_at: "2024-12-08T12:45:00Z",
    item_quantity: 58,
    item_price: 542000,
    nds_percent: 7,
    price_with_nds: 780000,
    total_price: 290000,
    status: "Shikastlangan",
  },
];

export default function QaytarilganTovarlar() {
  const { t } = useTranslation();

  const onlyDate = (iso?: string) => (iso ? String(iso).slice(0, 10) : "-");

  const [data, setData] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(false); //  флаг фейк-режима
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
          status: String(item.status ?? ""),
        }));

        //  Если пусто — подставим фейк
        if (rows.length === 0) {
          setData(FAKE_DATA);
          setIsFallback(true);
        } else {
          setData(rows);
        }
      })
      .catch(() => {
        if (!mounted) return;
        //  Backend off → фейк
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
    });
  }, [data, search]);

  return (
    <div className="container mx-auto px-8 w-full">
      <section className="bg-[#EBF0FA] border border-[#334F9D] rounded-3xl shadow-sm px-6 max-w-[1402px] my-8">
        <div className="flex items-center justify-between mb-4 mt-6">
          <div className="flex items-center gap-3">
            <h2 className="font-bold text-[28px] text-black">
              {t("returned.qaytarilgan_tovarlar")}
            </h2>

            {/*  бейдж если backend off */}
            {isFallback && (
              <span className="text-xs px-3 py-1 rounded-full bg-white border border-[#334F9D] text-[#334F9D]">
                Demo (backend off)
              </span>
            )}
          </div>

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
              <p className="text-[#334F9D] text-[25px]">
                {t("returned.loading")}
              </p>
              <Loader2 className="animate-spin mt-2 text-[#334F9D]" />
            </div>
          </div>
        )}

        {/*  error не показываем, потому что мы подставляем FAKE_DATA */}

        {!loading && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left text-[#334F9D] text-[18px]">
                  <th className="py-3  font-medium  text-center">
                    {t("table.sn")}
                  </th>
                  <th className="py-3 font-medium  text-center">
                    {t("table.clientName")}
                  </th>
                  <th className="py-3 font-medium text-center">
                    {t("table.productName")}
                  </th>
                  <th className="py-3 font-medium  text-center">
                    {t("table.quantity")}
                  </th>
                  <th className="py-3  font-medium text-center">
                    {t("table.price")}
                  </th>
                  <th className="py-3  font-medium text-center">
                    {t("table.ndsPercent")}
                  </th>
                  <th className="py-3  font-medium text-center">
                    {t("table.ndsPrice")}
                  </th>
                  <th className="py-3  font-medium     text-center">
                    {t("table.totalPrice")}
                  </th>
                  <th className="py-3  font-medium text-center">
                    {t("table.date")}
                  </th>
                  <th className="py-3   font-medium text-center">
                    {t("table.status")}
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredData.map((row, index) => (
                  <tr
                    key={row.id}
                    className="border-t border-[#D0D0D0] text-sm text-black"
                  >
                    <td className="py-4 ">
                      {String(index + 1).padStart(2, "0")}
                    </td>
                    <td className="py-4  text-center">{row.client_name}</td>
                    <td className="py-4   text-center">{row.product_title}</td>
                    <td className="py-4   text-center">{row.item_quantity}</td>
                    <td className="py-4 text-center">{row.item_price}</td>
                    <td className="py-4   text-center">{row.nds_percent}</td>
                    <td className="py-4  text-center">{row.price_with_nds}</td>
                    <td className="py-4   text-center">{row.total_price}</td>
                    <td className="py-4  text-center">
                      {onlyDate(row.created_at)}
                    </td>
                    <td className=" text-[#1C96C8] text-center ">
                      {row.status}
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
                        ? t("returned.emptyNow")
                        : t("returned.notFound")}
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
