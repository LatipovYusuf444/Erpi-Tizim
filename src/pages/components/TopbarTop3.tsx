export default function TopbarTop3() {
    const data = [
        {
            id: 1,
            name: "Tovar nomi",
            code: "20202020",
            price: "250 000",
            status: "chiqim",
        },
        {
            id: 2,
            name: "Tovar nomi",
            code: "20202020",
            price: "250 000",
            status: "kirim",
        },
        {
            id: 3,
            name: "Tovar nomi",
            code: "20202020",
            price: "250 000",
            status: "kirim",
        },
        {
            id: 4,
            name: "Tovar nomi",
            code: "20202020",
            price: "250 000",
            status: "kirim",
        },
        {
            id: 5,
            name: "Tovar nomi",
            code: "20202020",
            price: "250 000",
            status: "kirim",
        },
        {
            id: 6,
            name: "Tovar nomi",
            code: "20202020",
            price: "250 000",
            status: "kirim",
        },
        {
            id: 7,
            name: "Tovar nomi",
            code: "20202020",
            price: "250 000",
            status: "kirim",
        },
        {
            id: 8,
            name: "Tovar nomi",
            code: "20202020",
            price: "250 000",
            status: "kirim",
        },
        {
            id: 9,
            name: "Tovar nomi",
            code: "20202020",
            price: "250 000",
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
