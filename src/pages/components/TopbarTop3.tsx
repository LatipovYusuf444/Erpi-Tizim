export default function TopbarTop3() {
    const data = [
        {
            id: 1,
            name: "Pistolet",
            code: "20202020",
            price: "250 000",
            status: "chiqim",
        },
        {
            id: 2,
            name: "Diggle",
            code: "20202020",
            price: "210 000",
            status: "kirim",
        },
        {
            id: 3,
            name: "Glock",
            code: "20202020",
            price: "180 000",
            status: "kirim",
        },
        {
            id: 4,
            name: "Akm 47",
            code: "20202020",
            price: "356 000",
            status: "kirim",
        },
        {
            id: 5,
            name: "M416",
            code: "20202020",
            price: "330 000",
            status: "kirim",
        },
        {
            id: 6,
            name: "Pulimyot",
            code: "20202020",
            price: "567 000",
            status: "kirim",
        },
        {
            id: 7,
            name: "AWM",
            code: "20202020",
            price: "620 000",
            status: "kirim",
        },
        {
            id: 8,
            name: "Muxa",
            code: "20202020",
            price: "400 000",
            status: "kirim",
        },
        {
            id: 9,
            name: "Snaiper",
            code: "20202020",
            price: "900 000",
            status: "kirim",
        },
    ]

    return (
        <div className="w-200 h-full mx-auto">
            <div className="
        relative rounded-3xl p-px border border-black
        shadow-xl
      ">
                <div className="
          rounded-3xl bg-[#EBF0FA]
          px-6 py-5
        ">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                        Bugungi o‘zgarishlar
                    </h2>

                    <div className="max-h-148 overflow-y-auto pr-2 custom-scroll">
                        <table className="w-full text-sm">
                            <thead className="text-gray-500 border-b">
                                <tr>
                                    <th className="text-left py-3">S/N</th>
                                    <th className="text-left">Tovar</th>
                                    <th className="text-left">ID</th>
                                    <th className="text-left">Narxi</th>
                                    <th className="text-left">Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {data.map((item, index) => (
                                    <tr
                                        key={item.id}
                                        className="
                      border-b last:border-none
                      hover:bg-[#EEF2FF]
                      transition
                    "
                                    >
                                        <td className="py-4">{String(index + 1).padStart(2, "0")}</td>
                                        <td>{item.name}</td>
                                        <td>{item.code}</td>
                                        <td className="font-medium">{item.price}</td>
                                        <td>
                                            {item.status === "chiqim" ? (
                                                <span className="
                          px-3 py-1 rounded-full
                          text-xs font-medium
                          bg-orange-100 text-orange-600
                        ">
                                                    Chiqim
                                                </span>
                                            ) : (
                                                <span className="
                          px-3 py-1 rounded-full
                          text-xs font-medium
                          bg-green-100 text-green-600
                        ">
                                                    Kirim
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <style>{`
        .custom-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #6C63FF, #00C2FF);
          border-radius: 10px;
        }
      `}</style>
        </div>
    )
}
