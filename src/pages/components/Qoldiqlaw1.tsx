export default function Navbar4() {

  return (
    <div className="px-8">

      <div className="relative max-w-400 rounded-3xl p-px bg-linear-to-r from-[#6C63FF] to-[#00C2FF] shadow-xl">
        <div className="rounded-3xl bg-[#F6F8FF] p-10 min-h-110">
          <h1 className="text-4xl font-extrabold tracking-tight text-black">
            Product qo‘shish
          </h1>

          <div className="mt-14 grid grid-cols-12 gap-10">
            {/* LEFT */}
            <div className="col-span-12 lg:col-span-5 space-y-7">
              <Field label="Maxsulot">
                <input className="inp" placeholder="Maxsulot nomi" />
              </Field>

              <Field label="Topshirish muddati">
                <div className="relative">
                  <input type="date" className="inp pr-12" placeholder="mm/dd/yyyy" />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 opacity-70">📅</span>
                </div>
              </Field>

              <div className="grid grid-cols-2 gap-8">
                <Field label="Mijoz ID">
                  <input className="inp" defaultValue="7447474" />
                </Field>
                <Field label="Sotuv ID">
                  <input className="inp" defaultValue="8485867" />
                </Field>
              </div>

              <button className="w-full h-14 rounded-2xl text-white font-semibold text-lg bg-linear-to-r from-[#334F9D] to-[#1C96C8] shadow-md">
                Yaratish
              </button>
            </div>

            <div className="col-span-12 lg:col-span-7 space-y-7">
              <div className="grid grid-cols-2 gap-8">
                <Field label="Mahsulot">
                  <input className="inp" placeholder="Tovar" />
                </Field>
                <Field label="Miqdori">
                  <input className="inp" placeholder="Tanlang..." />
                </Field>
              </div>

              <Field label="Eslatma">
                <textarea className="inp min-h-62.5 resize-none" placeholder="Fikringiz..." />
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
        .inp:focus{
          border-color:#6049E3;
          box-shadow:0 0 0 4px rgba(96,73,227,.12);
          background:#F2F5FF;
        }
      `}</style>
      </div>

    </div>
  );
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <div className="text-lg font-medium text-black">{label}</div>
      {children}
    </div>
  )
}