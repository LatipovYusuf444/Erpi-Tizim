import { useState } from "react"
import { toast } from "react-toastify"

type Ingredient = { name: string; qty: string }

export default function IngredientForm() {
  const [items, setItems] = useState<Ingredient[]>([
    { name: "Shakar", qty: "2 kg" },
    { name: "Un", qty: "5 kg" },
  ])

  const addRow = () => setItems((p) => [...p, { name: "", qty: "" }])
  const removeRow = (i: number) => setItems((p) => p.filter((_, idx) => idx !== i))

  const onSave = () => {
    const ok = items.every((x) => x.name.trim() && x.qty.trim())
    if (!ok) return toast.error("Hamma qatorni to‘ldir")
    toast.success("Ingredientlar saqlandi ✅ (demo)")
  }

  return (
    <div className="relative rounded-3xl p-px bg-gradient-to-r from-[#6C63FF] to-[#00C2FF] shadow-xl">
      <div className="rounded-3xl bg-[#F6F8FF] p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-extrabold tracking-tight text-black">
            Ingredient qo‘shish
          </h1>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={addRow}
              className="h-10 px-4 rounded-xl bg-[#6049E3] text-white text-sm font-semibold"
            >
              + Qo‘shish
            </button>

            <button
              type="button"
              onClick={onSave}
              className="h-10 px-4 rounded-xl bg-gradient-to-r from-[#334F9D] to-[#1C96C8] text-white text-sm font-semibold"
            >
              Saqlash
            </button>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {items.map((it, i) => (
            <div key={i} className="grid grid-cols-12 gap-3">
              <input
                className="inp col-span-7"
                placeholder="Ingredient nomi"
                value={it.name}
                onChange={(e) => {
                  const v = e.target.value
                  setItems((p) => p.map((x, idx) => (idx === i ? { ...x, name: v } : x)))
                }}
              />
              <input
                className="inp col-span-4"
                placeholder="Miqdor (masalan: 2 kg)"
                value={it.qty}
                onChange={(e) => {
                  const v = e.target.value
                  setItems((p) => p.map((x, idx) => (idx === i ? { ...x, qty: v } : x)))
                }}
              />
              <button
                type="button"
                onClick={() => removeRow(i)}
                className="col-span-1 h-12 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 font-bold"
              >
                ×
              </button>
            </div>
          ))}
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
            border-color:#6049E3;
            box-shadow:0 0 0 4px rgba(96,73,227,.12);
            background:#F2F5FF;
          }
        `}</style>
      </div>
    </div>
  )
}
