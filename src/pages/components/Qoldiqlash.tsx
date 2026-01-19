import { cn } from "@/lib/utils";
import { NavLink, useLocation } from "react-router-dom";
type Row = {
    id: number
    tovarId: string
    tovarNomi: string
    soni: number
    narhi: string
    status: "bor" | "kam" | "tugagan"
}

const statusUI = (s: Row["status"]) => {
    if (s === "bor")
        return "bg-emerald-50 text-emerald-700 ring-emerald-200"
    if (s === "kam")
        return "bg-amber-50 text-amber-700 ring-amber-200"
    return "bg-rose-50 text-rose-700 ring-rose-200"
}

const statusLabel = (s: Row["status"]) => {
    if (s === "bor") return "Bor"
    if (s === "kam") return "Kam qolgan"
    return "Tugagan"
}

const tabs = [
    { label: "Qoldiqlash", to: "/Qoldiqlash" },
    { label: "Kirim", to: "/Kirim" },
    { label: "Ko‘chirish", to: "/Kochirish" },
    { label: "Inventarizatsiya", to: "/Inventarizatsiya" },
] as const;

type Navbar2Props = {
    defaultActiveTo?: (typeof tabs)[number]["to"];
};
export default function Navbar4({ defaultActiveTo }: Navbar2Props) {
    const data: Row[] = Array.from({ length: 12 }).map((_, i) => ({
        id: i + 1,
        tovarId: "20202020",
        tovarNomi: "Tarelka",
        soni: 20,
        narhi: "1 000 000",
        status: i === 0 ? "bor" : "kam",
    }))
    const { pathname } = useLocation();
    const hasActiveTab = tabs.some((t) => pathname.startsWith(t.to));
    return (
        <div className="px-8">
            <nav className=" w-full max-w-350.5 h-auto flex gap-2 border border-[#6049E3] rounded-3xl px-3 py-2 bg-muted mt-4">
                {tabs.map((t) => {
                    const isDefaultActive = !hasActiveTab && defaultActiveTo === t.to;
                    return (
                        <NavLink
                            to={t.to}
                            key={t.to}
                            className={({ isActive }) =>
                                cn(
                                    "px-3 rounded-2xl text-sm font-medium  transition-all   flex items-center duration-200 h-7 ",
                                    !isActive && !isDefaultActive && "text-black",
                                    (isActive || isDefaultActive) && "navbar2-button-color"
                                )
                            }
                        >
                            {t.label}
                        </NavLink>
                    );
                })}
            </nav>
            <div className="max-w-full mt-10 mx-auto">
      <div className="relative rounded-3xl p-px bg-linear-to-r from-[#6C63FF] to-[#00C2FF] shadow-xl">
        <div className="rounded-3xl bg-[#F6F8FF]">
          <div className="max-h-150 overflow-auto rounded-3xl custom-scroll">
            <table className="w-full text-sm">
              <thead className="sticky top-0 z-10 pb-10 bg-[#F6F8FF]/95 backdrop-blur border-b">
                <tr className="text-gray-500">
                  <th className="text-left px-6 py-4 font-medium">S/N</th>
                  <th className="text-left px-6 py-4 font-medium">Tovar ID</th>
                  <th className="text-left px-6 py-4 font-medium">Tovar nomi</th>
                  <th className="text-left px-6 py-4 font-medium">Soni</th>
                  <th className="text-left px-6 py-4 font-medium">Narhi</th>
                  <th className="text-left px-6 py-4 font-medium">Status</th>
                </tr>
              </thead>

              <tbody className="text-gray-800">
                {data.map((r, idx) => (
                  <tr
                    key={r.id}
                    className={[
                      "border-b last:border-none transition",
                      idx % 2 === 0 ? "bg-white/40" : "bg-transparent",
                      "hover:bg-[#EEF2FF]",
                    ].join(" ")}
                  >
                    <td className="px-6 py-4">
                      {String(idx + 1).padStart(2, "0")}
                    </td>
                    <td className="px-6 py-4">{r.tovarId}</td>
                    <td className="px-6 py-4 font-medium">{r.tovarNomi}</td>
                    <td className="px-6 py-4">{r.soni}</td>
                    <td className="px-6 py-4 font-semibold">{r.narhi}</td>
                    <td className="px-6 py-4">
                      <span
                        className={[
                          "inline-flex items-center gap-2",
                          "px-3 py-1 rounded-full text-xs font-semibold",
                          "ring-1",
                          statusUI(r.status),
                        ].join(" ")}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
                        {statusLabel(r.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 text-xs text-gray-500">
            Jami: <span className="font-semibold text-gray-700">{data.length}</span> ta tovar
          </div>
        </div>
      </div>

      <style>{`
        .custom-scroll::-webkit-scrollbar { height: 8px; width: 8px; }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #6C63FF, #00C2FF);
          border-radius: 999px;
        }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
      `}</style>
    </div>
            {!hasActiveTab && (
                <div className="w-350.5 h-193.75 bg-[#EBF0FA] border border-[#6049E3] rounded-2xl mt-7.25 ">
                    <div className="flex flex-row gap-8 mx-auto container px-8 py-8">
                        <h1>Hello</h1>
                    </div>
                </div>
            )}
        </div>
    );
}