import { useState } from "react";
import Navbar2 from "@/widgets/topbar_2/Topbar2";
import SalesList from "./SalesList";

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
};

export default function SotuvlarRoyhati() {
  const initialData: Row[] = [
    {
      id: 1,
      klientNomi: "Alibekov K",
      klientId: "20202020",
      sotuvId: "0202020",
      tovarId: "20202020",
      tovarNomi: "tarelka",
      sanasi: "18.10.2025",
      miqdori: "2000",
      narxi: "800 000",
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
    },
    {
      id: 4,
      klientNomi: " Talinov T",
      klientId: "20202020",
      sotuvId: "0202020",
      tovarId: "20202020",
      tovarNomi: "Vilka",
      sanasi: "19.01.2025",
      miqdori: "7200",
      narxi: "120 000",
    },
    {
      id: 5,
      klientNomi: " Asilov J",
      klientId: "20202020",
      sotuvId: "0202020",
      tovarId: "20202020",
      tovarNomi: "Tarelka",
      sanasi: "29.08.2025",
      miqdori: "9200",
      narxi: "920 000",
    },
    {
      id: 6,
      klientNomi: "Velikov W",
      klientId: "20202020",
      sotuvId: "0202020",
      tovarId: "20202020",
      tovarNomi: "Tarelka",
      sanasi: "12.02.2025",
      miqdori: "42.000",
      narxi: "1 920 000",
    },
    {
      id: 7,
      klientNomi: "Werzadov W",
      klientId: "20202020",
      sotuvId: "0202020",
      tovarId: "20202020",
      tovarNomi: "Tarelka",
      sanasi: "22.02.2025",
      miqdori: "420.000",
      narxi: "1 120 000",
    },
  ];

  const [data, setData] = useState<Row[]>(initialData);
  const empty: Omit<Row, "id"> = {
    klientNomi: "",
    klientId: "",
    sotuvId: "",
    tovarId: "",
    tovarNomi: "",
    sanasi: "",
    miqdori: "",
    narxi: "",
  };
  const [form, setForm] = useState<Omit<Row, "id">>(empty);

  const [editingId, setEditingId] = useState<number | null>(null);

  const isEdit = editingId !== null;

  function change<K extends keyof typeof form>(key: K, val: (typeof form)[K]) {
    setForm((p) => ({ ...p, [key]: val }));
  }

  function addOrSave() {
    if (!form.klientNomi || !form.sotuvId || !form.tovarNomi) {
      alert("Kamida: Mijoz Nomi, Sotuv ID, Tovar Nomi to‘ldiring");
      return;
    }

    if (isEdit) {
      setData((prev) =>
        prev.map((r) => (r.id === editingId ? { id: r.id, ...form } : r))
      );
      setEditingId(null);
      setForm(empty);
      return;
    }

    const newRow: Row = { id: Date.now(), ...form };
    setData((prev) => [newRow, ...prev]);
    setForm(empty);
  }

  function startEdit(row: Row) {
    setEditingId(row.id);
    const { id, ...rest } = row;
    setForm(rest);
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(empty);
  }

  function removeRow(id: number) {
    if (!confirm("O‘chirasizmi?")) return;
    setData((prev) => prev.filter((x) => x.id !== id));
  }

  return (
    <div className="container mx-auto px-8">
      <Navbar2 />

      <section className="bg-[#EBF0FA] border border-[#6049E3] rounded-3xl shadow-sm p-6 max-w-[1402px] my-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-[28px]  text-black">Bugungi savdo</h2>{" "}
          <SalesList />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left text-sm text-slate-500">
                <th className="py-3 font-medium">S/N</th>
                <th className="py-3 font-medium">Sotuv ID</th>
                <th className="py-3 font-medium">Mijoz Nomi</th>
                <th className="py-3 font-medium">Mijoz ID</th>
                <th className="py-3 font-medium">Tovar Nomi</th>
                <th className="py-3 font-medium">Tovar ID</th>
                <th className="py-3 font-medium">Miqdori</th>
                <th className="py-3 font-medium">Narxi</th>
                <th className="py-3 font-medium">Sanasi</th>
                <th className="py-3 font-medium text-right">Status</th>
                <th className="py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {data.map((row, index) => (
                <tr
                  key={row.id}
                  className="border-t border-[#D0D0D0] text-sm text-slate-700"
                >
                  <td className="py-4">{String(index + 1).padStart(2, "0")}</td>
                  <td className="py-4">{row.sotuvId}</td>
                  <td className="py-4">{row.klientNomi}</td>
                  <td className="py-4">{row.klientId}</td>
                  <td className="py-4">{row.tovarNomi}</td>
                  <td className="py-4">{row.tovarId}</td>
                  <td className="py-4">{row.miqdori}</td>
                  <td className="py-4">{row.narxi}</td>
                  <td className="py-4">{row.sanasi}</td>

                  <td className="py-4 text-right">
                    <button
                      type="button"
                      className="text-[#1C96C8] hover:underline"
                    >
                      Tasdiqlangan
                    </button>
                  </td>

                  <td className="py-4 text-right space-x-3">
                    <button
                      type="button"
                      onClick={() => startEdit(row)}
                      className="text-green-700 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => removeRow(row.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {data.length === 0 && (
                <tr>
                  <td colSpan={12} className="text-center py-6 text-slate-400">
                    Hozircha yo‘q
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
