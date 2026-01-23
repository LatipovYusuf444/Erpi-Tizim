import { useState } from "react"
import { toast } from "react-toastify"

type Ingredient = { name: string; qty: string }

export default function KirimForm() {
  const [supplier, setSupplier] = useState("")
  const [date, setDate] = useState("")
  const [kirimId, setKirimId] = useState("1002003")
  const [docNo, setDocNo] = useState("778899")
  const [product, setProduct] = useState("")
  const [qty, setQty] = useState("")
  const [note, setNote] = useState("")

  const [items, setItems] = useState<Ingredient[]>([
    { name: "Shakar", qty: "2 kg" },
    { name: "Un", qty: "5 kg" },
  ])

  const addRow = () => setItems((p) => [...p, { name: "", qty: "" }])
  const removeRow = (i: number) => setItems((p) => p.filter((_, idx) => idx !== i))

  const onSave = () => {
    if (!supplier.trim()) return toast.error("Ta’minotchi nomini kiriting")
    if (!date.trim()) return toast.error("Kirim sanasini kiriting")
    if (!product.trim()) return toast.error("Mahsulotni kiriting")
    if (!qty.trim()) return toast.error("Miqdor kiriting")

    const ok = items.every((x) => x.name.trim() && x.qty.trim())
    if (!ok) return toast.error("Ingredientlar to‘liq emas")

    toast.success("Kirim saqlandi ✅ (demo)")
  }

  return (
    <div className="relative rounded-3xl p-px bg-gradient-to-r from-[#6C63FF] to-[#00C2FF] shadow-xl">
      <div className="rounded-3xl bg-[#F6F8FF] p-10">
        <h1 className="text-3xl font-extrabold tracking-tight text-black">
          Kirim qo‘shish
        </h1>

        <div className="mt-10 grid grid-cols-12 gap-10">
          {/* LEFT */}
          <div className="col-span-12 lg:col-span-5 space-y-7">
            <Field label="Ta’minotchi nomi">
              <input className="inp" value={supplier} onChange={(e) => setSupplier(e.target.value)} placeholder="Firma / ism" />
            </Field>

            <Field label="Kirim sanasi">
              <div className="relative">
                <input className="inp pr-12" value={date} onChange={(e) => setDate(e.target.value)} placeholder="mm/dd/yyyy" />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 opacity-70">📅</span>
              </div>
            </Field>


            <div className="grid grid-cols-2 gap-8">
              <Field label="Kirim ID">
                <input className="inp" value={kirimId} onChange={(e) => setKirimId(e.target.value)} />
              </Field>
              <Field label="Hujjat №">
                <input className="inp" value={docNo} onChange={(e) => setDocNo(e.target.value)} />
              </Field>
            </div>

            <button
              type="button"
              onClick={onSave}
              className="w-full h-14 rounded-2xl text-white font-semibold text-lg bg-gradient-to-r from-[#334F9D] to-[#1C96C8] shadow-md"
            >
              Saqlash
            </button>
          </div>

          {/* RIGHT */}
          <div className="col-span-12 lg:col-span-7 space-y-7">
            <div className="grid grid-cols-2 gap-8">
              <Field label="Mahsulot">
                <input className="inp" value={product} onChange={(e) => setProduct(e.target.value)} placeholder="Tovar" />
              </Field>
              <Field label="Miqdori">
                <input className="inp" value={qty} onChange={(e) => setQty(e.target.value)} placeholder="Masalan: 20" />
              </Field>
            </div>

            <div className="rounded-2xl border border-[#D2D7E5] bg-white/40 p-5">
              <div className="flex items-center justify-between">
                <div className="text-lg font-semibold">Ingredientlar</div>
                <button
                  type="button"
                  onClick={addRow}
                  className="h-9 px-4 rounded-xl bg-[#6049E3] text-white text-sm font-semibold"
                >
                  + Qo‘shish
                </button>
              </div>

              <div className="mt-4 space-y-3">
                {items.map((it, i) => (
                  <div key={i} className="grid grid-cols-12 gap-3">
                    <input
                      className="inp col-span-7 bg-[#EEF2FF]"
                      placeholder="Ingredient nomi"
                      value={it.name}
                      onChange={(e) => {
                        const v = e.target.value
                        setItems((p) => p.map((x, idx) => (idx === i ? { ...x, name: v } : x)))
                      }}
                    />
                    <input
                      className="inp col-span-4 bg-[#EEF2FF]"
                      placeholder="Miqdor"
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
            </div>

            <Field label="Eslatma">
              <textarea
                className="inp min-h-[170px] resize-none"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Fikringiz..."
              />
            </Field>
          </div>
        </div>
      </div>

      <style>{`
        .inp{
          width:100%;
          height:52px;
          border-radius:14px;
          border:1px solid #D2D7E5;
          background:#EEF2FF;
          padding:0 16px;
          outline:none;
        }
        textarea.inp{ padding:12px 16px; height:auto; }
        .inp:focus{
          border-color:#6049E3;
          box-shadow:0 0 0 4px rgba(96,73,227,.12);
          background:#F2F5FF;
        }
      `}</style>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <div className="text-lg font-medium text-black">{label}</div>
      {children}
    </div>
  )
}
