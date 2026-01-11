const data = [
  {
    id: 1,
    client: "Alibekov K",
    clientId: "20202020",
    saleId: "20202020",
    time: "18:00",
    price: "800 000",
  },
  {
    id: 2,
    client: "Hakimov E",
    clientId: "20202020",
    saleId: "20202020",
    time: "14:00",
    price: "280 000",
  },
  {
    id: 3,
    client: "Jasurov J ",
    clientId: "20202020",
    saleId: "20202020",
    time: "1:00",
    price: "850 000",
  },
  {
    id: 4,
    client: "Werzodov W",
    clientId: "20202020",
    saleId: "20202020",
    time: "19:00",
    price: "500 000",
  },
];

export default function TodaySalesTable() {
  return (
    <section className="bg-white rounded-2xl shadow-sm p-6 max-w-[1325px] mx-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-black">Bugungi savdo</h2>

        <button className="w-[105px] rounded-full navbar2-button-color flex items-center justify-center text-2xl cursor-pointer">
          +
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left text-sm text-slate-500">
              <th className="py-3 font-medium">S/N</th>
              <th className="py-3 font-medium">Klient nomi</th>
              <th className="py-3 font-medium">Mijoz ID</th>
              <th className="py-3 font-medium">Sotuv ID</th>
              <th className="py-3 font-medium">Soati</th>
              <th className="py-3 font-medium">Narxi</th>
              <th className="py-3 font-medium text-right">Status</th>
            </tr>
          </thead>

          <tbody>
            {data.map((row, index) => (
              <tr
                key={row.id}
                className="border-t border-[#D0D0D0]   text-sm text-slate-700"
              >
                <td className="py-4 ">{String(index + 1).padStart(2, "0")}</td>
                <td className="py-4 ">{row.client}</td>
                <td className="py-4">{row.clientId}</td>
                <td className="py-4">{row.saleId}</td>
                <td className="py-4">{row.time}</td>
                <td className="py-4">{row.price}</td>
                <td className="py-4 text-right">
                  <button className="text-blue-500 hover:underline">
                    View more
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
