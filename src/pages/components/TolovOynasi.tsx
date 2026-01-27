// import SalesCreateForm2 from "./SalesCreateForm2";
import SalesList from "./SalesList";
// import TolovOynasiRight from "./TolovOynasiRight";
import { useState } from "react";
import type { SalesFormValues } from "./SalesCreateForm";

type Row = {
  id: number;
  klientNomi: string;
  klientId: string;
  sotuvId: string;
  tovarId: string;
  tovarNomi: string;
  sanasi: string;
  miqdori: string;
  narxi: string;
  status: string;
};
export default function TolovOynasi() {
  const [data, setData] = useState<Row[]>([
    {
      id: 1,
      klientNomi: "Rasulov I",
      klientId: "20202020",
      sotuvId: "0202020",
      tovarId: "20202020",
      tovarNomi: "tarelka",
      sanasi: "19.12.2024",
      miqdori: "5000",
      narxi: "890 000",
      status: "Tasdiqlangan",
    },
    {
      id: 2,
      klientNomi: "Alibekov E",
      klientId: "20202020",
      sotuvId: "0202020",
      tovarId: "20202020",
      tovarNomi: "Vilka",
      sanasi: "10.04.2023",
      miqdori: "800",
      narxi: "410 000",
      status: "Tasdiqlangan",
    },
    {
      id: 3,
      klientNomi: "Tasibekov W",
      klientId: "20202020",
      sotuvId: "0202020",
      tovarId: "20202020",
      tovarNomi: "Tarelka",
      sanasi: "07.08.2025",
      miqdori: "700",
      narxi: "820 000",
      status: "Tasdiqlangan",
    },
    {
      id: 4,
      klientNomi: "Sobirov Q",
      klientId: "20202020",
      sotuvId: "0202020",
      tovarId: "20202020",
      tovarNomi: "Qoshiq",
      sanasi: "06.06.2022",
      miqdori: "200",
      narxi: "150 000",
      status: "Tasdiqlangan",
    },
    {
      id: 5,
      klientNomi: "Werhadov L",
      klientId: "20202020",
      sotuvId: "0202020",
      tovarId: "20202020",
      tovarNomi: "Qoshiq",
      sanasi: "14.01.2024",
      miqdori: "790",
      narxi: "180 000",
      status: "Tasdiqlangan",
    },
    {
      id: 6,
      klientNomi: "Besaliev F",
      klientId: "20202020",
      sotuvId: "0202020",
      tovarId: "20202020",
      tovarNomi: "Konteyner",
      sanasi: "30.01.2025",
      miqdori: "87 700",
      narxi: "1 990 000",
      status: "Tasdiqlangan",
    },
    {
      id: 7,
      klientNomi: "Amanbekov A",
      klientId: "20202020",
      sotuvId: "0202020",
      tovarId: "20202020",
      tovarNomi: "Qoshiq",
      sanasi: "25.05.2025",
      miqdori: "5500",
      narxi: "750 000",
      status: "Tasdiqlangan",
    },
    {
      id: 8,
      klientNomi: "Polatov H",
      klientId: "20202020",
      sotuvId: "0202020",
      tovarId: "20202020",
      tovarNomi: "Tarelka",
      sanasi: "27.07.2022",
      miqdori: "78 050",
      narxi: "7 100 000",
      status: "Tasdiqlangan",
    },
  ]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [editingRow, setEditingRow] = useState<Row | null>(null);
  function openCreate() {
    setMode("create");
    setEditingRow(null);
    setDrawerOpen(true);
  }
  function openEdit(row: Row) {
    setMode("edit");
    setEditingRow(row);
    setDrawerOpen(true);
  }
  function handleCreate(formData: SalesFormValues) {
    const newRow: Row = {
      id: Date.now(),
      klientNomi: formData.klientNomi,
      klientId: String(formData.klientId),
      sotuvId: String(formData.sotuvId),
      tovarId: String(formData.tovarId),
      tovarNomi: String(formData.tovarNomi),
      sanasi: formData.sanasi,
      miqdori: String(formData.miqdori),
      narxi: String(formData.narxi),
      status: formData.status,
    };
    setData((prev) => [newRow, ...prev]);
  }
  function handleUpdate(formData: SalesFormValues) {
    if (!editingRow) return;
    setData((prev) =>
      prev.map((r) =>
        r.id === editingRow.id
          ? {
              ...r,
              klientNomi: formData.klientNomi,
              klientId: String(formData.klientId),
              sotuvId: String(formData.sotuvId),
              tovarId: String(formData.tovarId),
              tovarNomi: formData.tovarNomi,
              sanasi: formData.sanasi,
              miqdori: String(formData.miqdori),
              narxi: String(formData.narxi),
              status: formData.status,
            }
          : r
      )
    );
  }
  function removeRow(id: number) {
    if (!confirm("O'chirasizmi?")) return;
    setData((prev) => prev.filter((x) => x.id !== id));
  }

  return (
    <div className=" container mx-auto px-8 ">
      <section className="bg-[#EBF0FA] border border-[#6049E3] rounded-3xl shadow-sm px-6 py-3 my-8 max-w-[1402px] ">
        <div className="flex items-center justify-between -mt-[9px] mb-3">
          <h2 className="text-[28px] font-bold text-black">Tolov Oynasi</h2>
          <SalesList onCreate={openCreate} />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left text-[18px] text-[#334F9D]">
                <th className="py-3 px-2 font-medium">S/N</th>
                <th className="py-3 font-medium">Sotuv ID</th>
                <th className="py-3 font-medium">Mijoz Nomi</th>
                <th className="py-3 px-2 font-medium">Mijoz ID</th>
                <th className="py-3 font-medium">Tovar Nomi</th>
                <th className="py-3 px-2 font-medium">Tovar ID</th>
                <th className="py-3 font-medium">Miqdori</th>
                <th className="py-3 font-medium">Narxi</th>
                <th className="py-3 px-2 font-medium">Sanasi</th>
                <th className="py-3 pr-4 font-medium text-right">Status</th>
                <th className="py-3 font-medium  flex justify-end pr-12">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {data.map((row, index) => (
                <tr
                  key={row.id}
                  className="border-t border-[#D0D0D0]   text-sm text-black"
                >
                  <td className="py-4 px-4">
                    {String(index + 1).padStart(2, "0")}
                  </td>
                  <td className="py-4">{row.sotuvId}</td>
                  <td className="py-4 px-4">{row.klientNomi}</td>
                  <td className="py-4 px-4">{row.klientId}</td>
                  <td className="py-4 px-5">{row.tovarNomi}</td>
                  <td className="py-4 px-2">{row.tovarId}</td>
                  <td className="py-4 px-3">{row.miqdori}</td>
                  <td className="py-4 ">{row.narxi}</td>
                  <td className="py-4 ">{row.sanasi}</td>
                  <td className="py-4   text-right">
                    <span className="text-[#1C96C8] ">{row.status}</span>
                  </td>
                  <td className="py-4 text-right space-x-3">
                    <button
                      type="button"
                      onClick={() => openEdit(row)}
                      className="text-white cursor-pointer bg-gradient-to-b from-[#3E7B27] to-[#387F39] w-[70px] h-[28px] rounded-3xl"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => removeRow(row.id)}
                      className="text-white cursor-pointer  bg-linear-to-t from-[#D84040] to-[#8A0000] w-[70px] h-[28px] rounded-3xl"
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
      </section>
      <TolovOynasiRight open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <SalesCreateForm2
          mode={mode}
          initialValues={
            editingRow
              ? {
                  klientNomi: editingRow.klientNomi,
                  klientId: Number(editingRow.klientId),
                  sotuvId: Number(editingRow.sotuvId),
                  tovarId: Number(editingRow.tovarId),
                  tovarNomi: editingRow.tovarNomi,
                  sanasi: editingRow.sanasi,
                  miqdori: Number(editingRow.miqdori),
                  narxi: Number(editingRow.narxi),
                  status: editingRow.status,
                }
              : undefined
          }
          onClose={() => setDrawerOpen(false)}
          onSubmitForm={(formData) => {
            if (mode === "edit") handleUpdate(formData);
            else handleCreate(formData);
          }}
        />
      </TolovOynasiRight>
    </div>
  );
}
