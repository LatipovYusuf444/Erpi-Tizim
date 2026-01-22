import { useEffect, useState } from "react";

type Row = {
    id: number
    tovarId: string
    yetkazibBeruvchi: string
    qabulQiluvchi: string
    tovarNomi: string
    miqdori: number
    narhi: string
    sana: string
}

const STORAGE_KEY = "confirmed_rows"

export default function Navbar4() {
    const [confirmedIds, setConfirmedIds] = useState<number[]>([])

    // 🔹 demo data
    const data: Row[] = Array.from({ length: 10 }).map((_, i) => ({
        id: i + 1,
        tovarId: "20202020",
        yetkazibBeruvchi: "Jasmina",
        qabulQiluvchi: "Omina",
        tovarNomi: "Tarelka",
        miqdori: 1500,
        narhi: "1 000 000",
        sana: "20.09.25",
    }))

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) {
            setConfirmedIds(JSON.parse(saved))
        }
    }, [])

    const confirmRow = (id: number) => {
        if (confirmedIds.includes(id)) return

        const updated = [...confirmedIds, id]
        setConfirmedIds(updated)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    }

    const isConfirmed = (id: number) => confirmedIds.includes(id)

    return (
        <div className="px-8">
            <div className="max-w-full pt-10 mx-auto">
                <div className="rounded-3xl p-px bg-linear-to-r from-[#6C63FF] to-[#00C2FF] shadow-xl">
                    <div className="rounded-3xl bg-[#F6F8FF] max-h-134 overflow-auto">
                        <table className="w-full text-sm">
                            <thead className="sticky top-0 bg-[#F6F8FF] border-b text-gray-500">
                                <tr>
                                    <th className="px-6 py-4 text-left">S/N</th>
                                    <th className="px-6 py-4 text-left">Tovar ID</th>
                                    <th className="px-6 py-4 text-left">Yetkazib beruvchi</th>
                                    <th className="px-6 py-4 text-left">Qabul qiluvchi</th>
                                    <th className="px-6 py-4 text-left">Tovar nomi</th>
                                    <th className="px-6 py-4 text-left">Miqdori</th>
                                    <th className="px-6 py-4 text-left">Narhi</th>
                                    <th className="px-6 py-4 text-left">Sana</th>
                                    <th className="px-6 py-4 text-left">Status</th>
                                    <th className="px-6 py-4 text-left">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {data.map((row, index) => {
                                    const confirmed = isConfirmed(row.id)

                                    return (
                                        <tr
                                            key={row.id}
                                            className="border-b hover:bg-[#EEF2FF] transition"
                                        >
                                            <td className="px-6 py-4">
                                                {String(index + 1).padStart(2, "0")}
                                            </td>
                                            <td className="px-6 py-4">{row.tovarId}</td>
                                            <td className="px-6 py-4">{row.yetkazibBeruvchi}</td>
                                            <td className="px-6 py-4">{row.qabulQiluvchi}</td>
                                            <td className="px-6 py-4 font-medium">{row.tovarNomi}</td>
                                            <td className="px-6 py-4">{row.miqdori}</td>
                                            <td className="px-6 py-4 font-semibold">{row.narhi}</td>
                                            <td className="px-6 py-4">{row.sana}</td>

                                            {/* Status */}
                                            <td className="px-6 py-4">
                                                {confirmed ? (
                                                    <span className="text-green-600 font-semibold">
                                                        Tasdiqlangan
                                                    </span>
                                                ) : (
                                                    <span className="text-orange-500 font-semibold">
                                                        Tasdiqlanmagan
                                                    </span>
                                                )}
                                            </td>

                                            {/* Action */}
                                            <td className="px-6 py-4">
                                                <button
                                                    disabled={confirmed}
                                                    onClick={() => confirmRow(row.id)}
                                                    className={[
                                                        "px-4 py-1.5 rounded-lg text-xs font-semibold transition",
                                                        confirmed
                                                            ? "bg-green-100 text-green-700 cursor-not-allowed"
                                                            : "bg-blue-600 text-white hover:bg-blue-700",
                                                    ].join(" ")}
                                                >
                                                    {confirmed ? "Tasdiqlangan" : "Tasdiqlash"}
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}