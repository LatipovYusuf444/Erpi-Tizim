import { useMemo, useState } from "react";
import { toast } from "react-toastify";

type ProductRow = {
  id: string;
  name: string;
  qty: number;
  price: number;
};

const fmt = (n: number) => new Intl.NumberFormat("ru-RU").format(n);

export default function ProductForm() {
  const [form, setForm] = useState({ id: "", name: "", qty: 1, price: 0 });
  const [list, setList] = useState<ProductRow[]>([
    { id: "1001", name: "Stakan", qty: 120, price: 1500 },
    { id: "1002", name: "Tarelka", qty: 40, price: 3500 },
  ]);

  const canSave = useMemo(() => {
    return (
      form.id.trim() && form.name.trim() && form.qty > 0 && form.price >= 0
    );
  }, [form]);

  const onSave = () => {
    if (!canSave) return toast.error("Formani to‘liq to‘ldir");
    setList((p) => [
      { id: form.id, name: form.name, qty: form.qty, price: form.price },
      ...p,
    ]);
    setForm({ id: "", name: "", qty: 1, price: 0 });
    toast.success("Product qo‘shildi ✅");
  };

  return (
    <div className="relative rounded-3xl p-px border border-[#334F9D]  shadow-xl">
      <div className="rounded-3xl bg-[#F6F8FF] p-8">
        <h1 className="text-2xl font-extrabold tracking-tight text-black">
          Product qo‘shish
        </h1>

        <div className="mt-6 grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-5 space-y-4">
            <Field label="Tovar ID">
              <input
                className="inp"
                value={form.id}
                onChange={(e) => setForm((p) => ({ ...p, id: e.target.value }))}
                placeholder="1001"
              />
            </Field>

            <Field label="Tovar nomi">
              <input
                className="inp"
                value={form.name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, name: e.target.value }))
                }
                placeholder="Masalan: Stakan"
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Miqdori">
                <input
                  className="inp"
                  type="number"
                  value={form.qty}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, qty: Number(e.target.value) }))
                  }
                />
              </Field>
              <Field label="Narxi">
                <input
                  className="inp"
                  type="number"
                  value={form.price}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, price: Number(e.target.value) }))
                  }
                />
              </Field>
            </div>

            <button
              type="button"
              onClick={onSave}
              className="w-full h-12 rounded-2xl text-white font-semibold bg-linear-to-r from-[#1C96C8] cursor-pointer to-[#334F9D]  shadow-md disabled:opacity-60"
              disabled={!canSave}
            >
              Saqlash
            </button>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <div className="rounded-2xl bg-white/70 border border-white/60 overflow-hidden">
              <div className="px-4 py-3 text-sm font-semibold text-slate-800 border-b border-white/60">
                Productlar (demo ro‘yxat)
              </div>

              <div className="max-h-[340px] overflow-auto">
                <table className="w-full text-sm">
                  <thead className="sticky top-0 bg-slate-900/5 text-[#334F9D]">
                    <tr>
                      <th className="text-left px-4 py-2">ID</th>
                      <th className="text-left px-4 py-2">Nomi</th>
                      <th className="text-left px-4 py-2">Soni</th>
                      <th className="text-left px-4 py-2">Narxi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((r) => (
                      <tr key={r.id} className="border-t border-white/60">
                        <td className="px-4 py-2 text-slate-700">{r.id}</td>
                        <td className="px-4 py-2 font-medium text-slate-900">
                          {r.name}
                        </td>
                        <td className="px-4 py-2 text-slate-700">
                          {fmt(r.qty)}
                        </td>
                        <td className="px-4 py-2 text-slate-900 font-semibold">
                          {fmt(r.price)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          .inp{
            width:100%;
            height:48px;
            border-radius:14px;
            border:1px solid #D2D7E5;
            background:#EEF2FF;
            padding:0 14px;
            outline:none;
          }
          .inp:focus{
             border-color: #334F9D;
  box-shadow: 0 4px 6px rgba(51, 79, 157, 0.35);
          }
        `}</style>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="text-sm font-semibold text-slate-800">{label}</div>
      {children}
    </div>
  );
}
