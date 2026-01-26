// import SalesList from "./SalesList";
import { useState } from "react";
// import SalesCreateFormNew from "./SalesCreateFormNew";
// import { useCreateSale } from "@/features/sales/sales.queries";
// import type { SaleFormValues } from "@/features/sales/sales.schema";
type Row = {
  id: number;
  klientNomi: string;
  tovarNomi: string;
  sanasi: string;
  miqdori: string;
  narxi: string;
  ndsFoyzi: string;
};

export default function SotuvlarRoyhati() {
  const [data] = useState<Row[]>([
    {
      id: 1,
      klientNomi: "Alibekov K",
      tovarNomi: "Konteyner",
      sanasi: "18.10.2025",
      miqdori: "2000",
      narxi: "800 000",
      ndsFoyzi: "12%",
    },
    {
      id: 2,
      klientNomi: "Alijanov R",
      tovarNomi: "Vilka",
      sanasi: "14.04.2025",
      miqdori: "8000",
      narxi: "400 000",
      ndsFoyzi: "1%",
    },
    {
      id: 3,
      klientNomi: "Jasurov T",
      tovarNomi: "Tarelka",
      sanasi: "17.08.2025",
      miqdori: "7400",
      narxi: "890 000",
      ndsFoyzi: "17%",
    },
    {
      id: 4,
      klientNomi: "Behruzov W",
      tovarNomi: "Qoshiq",
      sanasi: "11.08.2025",
      miqdori: "7100",
      narxi: "100 000",
      ndsFoyzi: "8%",
    },
    {
      id: 5,
      klientNomi: "Behruzjonov M",
      tovarNomi: "Qoshiq",
      sanasi: "19.01.2025",
      miqdori: "7900",
      narxi: "10 000",
      ndsFoyzi: "0.5%",
    },
    {
      id: 6,
      klientNomi: "Baburov K",
      tovarNomi: "Konteyner",
      sanasi: "10.09.2025",
      miqdori: "700",
      narxi: "190 000",
      ndsFoyzi: "17%",
    },
    {
      id: 7,
      klientNomi: "Asadbekov A",
      tovarNomi: "Qoshiq",
      sanasi: "15.05.2025",
      miqdori: "5200",
      narxi: "790 000",
      ndsFoyzi: "2%",
    },
    {
      id: 8,
      klientNomi: "Kaliev K",
      tovarNomi: "Tarelka",
      sanasi: "01.02.2025",
      miqdori: "750",
      narxi: "790 000",
      ndsFoyzi: "22%",
    },
  ]);

  const [editingRow, setEditingRow] = useState<Row | null>(null);

  function openEdit(row: Row) {
    setEditingRow(row);

    console.log("Edit row:", row);
  }

  return (
    <div className="container mx-auto px-8 w-full">
      <section className="bg-[#EBF0FA] border border-[#334F9D] rounded-3xl shadow-sm px-6 max-w-[1402px] my-8">
        <div className="flex items-center justify-between mb-4 mt-6">
          <h2 className="font-bold text-[28px] text-black">Sotuv Ro'yhati</h2>
          <button>Add</button>
        </div>

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
                  <td className="py-4 px-5">{row.klientNomi}</td>
                  <td className="py-4 px-4">{row.tovarNomi}</td>
                  <td className="py-4 px-4">{row.miqdori}</td>
                  <td className="py-4 px-2">{row.narxi}</td>
                  <td className="py-4 px-8">{row.ndsFoyzi}</td>
                  <td className="py-4">{row.sanasi}</td>
                  <td className="py-4 justify-center gap-2 flex">
                    <button
                      type="button"
                      onClick={() => openEdit(row)}
                      className="text-white cursor-pointer bg-gradient-to-t from-[#1C96C8] to-[#334F9D] w-[70px] h-[28px] rounded-3xl"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => removeRow(row.id)}
                      className="text-white cursor-pointer bg-gradient-to-l from-[#1C96C8] to-[#334F9D] w-[70px] h-[28px] rounded-3xl"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {data.length === 0 && (
                <tr>
                  <td colSpan={11} className="text-center py-6 text-slate-500">
                    Hozircha yo‘q
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {editingRow && (
          <div className="mt-4 text-sm text-slate-600">
            Editing: <b>{editingRow.klientNomi}</b> — {editingRow.tovarNomi}
          </div>
        )}
      </section>
    </div>
  );
}
