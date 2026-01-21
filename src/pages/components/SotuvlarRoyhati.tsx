import { useState } from "react";
import SalesCreateForm from "./SalesCreateForm";
import SalesList from "./SalesList";
import SotuvQoshishRight from "./SotuvQoshishRight";
type SalesFormValues = {
  klientNomi: string;
  klientId: number;
  sotuvId: number;
  tovarId: number;
  tovarNomi: string;
  sanasi: string;
  miqdori: number;
  narxi: number;
  status: string;
};
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

export default function SotuvlarRoyhati() {
  const [data, setData] = useState<Row[]>([
    {
      id: 1,
      klientNomi: "Alibekov K",
      klientId: "20202020",
      sotuvId: "0202020",
      tovarId: "20202020",
      tovarNomi: "Konteyner",
      sanasi: "18.10.2025",
      miqdori: "2000",
      narxi: "800 000",
      status: "Tasdiqlangan",
    },
    {
      id: 2,
      klientNomi: "Alijanov R",
      klientId: "20202020",
      sotuvId: "0202020",
      tovarId: "20202020",
      tovarNomi: "Vilka",
      sanasi: "14.04.2025",
      miqdori: "8000",
      narxi: "400 000",
      status: "Tasdiqlangan",
    },
    {
      id: 3,
      klientNomi: "Jasurov T",
      klientId: "20202020",
      sotuvId: "0202020",
      tovarId: "20202020",
      tovarNomi: "Tarelka",
      sanasi: "17.08.2025",
      miqdori: "7400",
      narxi: "890 000",
      status: "Tasdiqlangan",
    },
    {
      id: 4,
      klientNomi: "Behruzov W",
      klientId: "20202020",
      sotuvId: "0202020",
      tovarId: "20202020",
      tovarNomi: "Qoshiq",
      sanasi: "11.08.2025",
      miqdori: "7100",
      narxi: "100 000",
      status: "Tasdiqlangan",
    },
    {
      id: 5,
      klientNomi: "Behruzjonov M",
      klientId: "20202020",
      sotuvId: "0202020",
      tovarId: "20202020",
      tovarNomi: "Qoshiq",
      sanasi: "19.01.2025",
      miqdori: "7900",
      narxi: "10 000",
      status: "Tasdiqlangan",
    },
    {
      id: 6,
      klientNomi: "Baburov K",
      klientId: "20202020",
      sotuvId: "0202020",
      tovarId: "20202020",
      tovarNomi: "Konteyner",
      sanasi: "10.09.2025",
      miqdori: "700",
      narxi: "190 000",
      status: "Tasdiqlangan",
    },
    {
      id: 7,
      klientNomi: "Asadbekov A",
      klientId: "20202020",
      sotuvId: "0202020",
      tovarId: "20202020",
      tovarNomi: "Qoshiq",
      sanasi: "15.05.2025",
      miqdori: "5200",
      narxi: "790 000",
      status: "Tasdiqlangan",
    },
    {
      id: 8,
      klientNomi: "Kaliev K",
      klientId: "20202020",
      sotuvId: "0202020",
      tovarId: "20202020",
      tovarNomi: "Tarelka",
      sanasi: "01.02.2025",
      miqdori: "750",
      narxi: "790 000",
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
      tovarNomi: formData.tovarNomi,
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
    if (!confirm("O‘chirasizmi?")) return;
    setData((prev) => prev.filter((x) => x.id !== id));
  }

  return (
    <div className="container mx-auto px-8 w-full">
      <section className="bg-[#EBF0FA] border border-[#334F9D] rounded-3xl shadow-sm px-6  max-w-[1402px] my-8">
        <div className="flex items-center justify-between mb-4 mt-1">
          <h2 className="font-bold text-[28px] text-black">Sotuv Ro'yhati</h2>

          <SalesList onCreate={openCreate} />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left text-[#334F9D] text-[18px]">
                <th className="py-3 px-2 font-medium">S/N</th>
                <th className="py-3  font-medium">Sotuv ID</th>
                <th className="py-3 px-3 font-medium">Mijoz Nomi</th>
                <th className="py-3  font-medium">Mijoz ID</th>
                <th className="py-3 font-medium">Tovar Nomi</th>
                <th className="py-3 font-medium">Tovar ID</th>
                <th className="py-3 font-medium">Miqdori</th>
                <th className="py-3 px-2 font-medium">Narxi</th>
                <th className="py-3 px-2 font-medium">Sanasi</th>
                <th className="py-3 pr-4 font-medium text-right">Status</th>
                <th className="py-3 pr-12 font-medium text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {data.map((row, index) => (
                <tr
                  key={row.id}
                  className="border-t border-[#D0D0D0] text-sm text-black font-stretch-80%"
                >
                  <td className="py-4 px-4">
                    {String(index + 1).padStart(2, "0")}
                  </td>
                  <td className="py-4 px-2">{row.sotuvId}</td>
                  <td className="py-4 px-5">{row.klientNomi}</td>
                  <td className="py-4">{row.klientId}</td>
                  <td className="py-4 px-4">{row.tovarNomi}</td>
                  <td className="py-4">{row.tovarId}</td>
                  <td className="py-4 px-4">{row.miqdori}</td>
                  <td className="py-4 px-2">{row.narxi}</td>
                  <td className="py-4">{row.sanasi}</td>

                  <td className="py-4   text-right">
                    <span className="text-[#1C96C8]">{row.status}</span>
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
                      className="text-white cursor-pointer  bg-gradient-to-t from-[#D84040] to-[#8A0000] w-[70px] h-[28px] rounded-3xl"
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

      <SotuvQoshishRight open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <SalesCreateForm
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
      </SotuvQoshishRight>
    </div>
  );
}
