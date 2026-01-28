import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchOrders } from "@/pages/components/ApiOrders";

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

export default function SotuvlarRoyhati() {
  const navigate = useNavigate();
  const [data, setData] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
        }));

        setData(rows);
      })
      .catch((e) => {
        setError(e?.message ?? "Xatolik");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mx-auto px-8 w-full">
      <section className="bg-[#EBF0FA] border border-[#334F9D] rounded-3xl shadow-sm px-6 max-w-[1402px] my-8">
        <div className="flex items-center justify-between mb-4 mt-6">
          <h2 className="font-bold text-[28px] text-black">Sotuv Ro'yhati</h2>
          <button
            onClick={() => navigate("/sotuv/sotuv-qoshish-form")}
            type="button"
            className="text-white cursor-pointer bg-gradient-to-l from-[#1C96C8] to-[#334F9D] w-[110px] h-[34px] rounded-3xl text-[19px] hover:bg-gradient-to-t from-[#1C96C8] to-[#334F9D] "
          >
            Add
          </button>
        </div>
        {loading && (
          <div className="py-8 text-center text-slate-600">yuklanmoqda....</div>
        )}
        {!loading && error && (
          <div className="text-center text-red-700 text-lg">Xatolik{error}</div>
        )}
        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left text-[#334F9D] text-[18px]">
                  <th className="py-3 px-2 font-medium">S/N</th>
                  <th className="py-3 px-3 font-medium">Mijoz Nomi</th>
                  <th className="py-3 font-medium">Tovar Nomi</th>
                  <th className="py-3 font-medium">Miqdori</th>
                  <th className="py-3 px-2 font-medium">Narxi</th>
                  <th className="py-3 px-2 font-medium">NDS Foyzi</th>
                  <th className="py-3 px-2 font-medium">NDS Narxi</th>
                  <th className="py-3 px-2 font-medium">Umumiy Narxi</th>
                  <th className="py-3 px-2 font-medium">Sanasi</th>

                  <th className="py-3 pr-2 font-medium flex justify-center">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {data.map((row, index) => (
                  <tr
                    key={row.id}
                    className="border-t border-[#D0D0D0] text-sm text-black"
                  >
                    <td className="py-4 px-4">
                      {String(index + 1).padStart(2, "0")}
                    </td>
                    <td className="py-4 px-5">{row.client_name}</td>
                    <td className="py-4 px-4">{row.product_title}</td>
                    <td className="py-4 px-4">{row.item_quantity}</td>
                    <td className="py-4 px-2">{row.item_price}</td>
                    <td className="py-4 px-8">{row.nds_percent}</td>
                    <td className="py-4 px-8">{row.price_with_nds}</td>
                    <td className="py-4 px-8">{row.total_price}</td>
                    <td className="py-4">{row.created_at}</td>
                    <td className="py-4 justify-center gap-2 flex">
                      <button
                        type="button"
                        className="text-white cursor-pointer bg-gradient-to-t from-[#1C96C8] to-[#334F9D] hover:bg-gradient-to-b from-[#1C96C8] to-[#334F9D] w-[70px] h-[28px] rounded-3xl"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="text-white cursor-pointer bg-gradient-to-l from-[#1C96C8] to-[#334F9D] hover:bg-gradient-to-r from-[#1C96C8] to-[#334F9D] w-[70px] h-[28px] rounded-3xl"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {data.length === 0 && (
                  <tr>
                    <td
                      colSpan={11}
                      className="text-center py-6 text-slate-500"
                    >
                      Hozircha yo‘q
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
