export default function Qarzdorlik() {
  const data = [
    {
      id: 1,
      kontragent: "265413554",
      qarzTuri: "Naqt",
      jamiQarz: "28.000",
      tolanganSumma: "3.000",
      qolganQarz: "25.000",
      muudati: "25.12.2025",
      ohirgiTolovSanasi: "28.01.2026",
      status: "Qabul Qilingan",
    },
    {
      id: 2,
      kontragent: "265413554",
      qarzTuri: "Naqt",
      jamiQarz: "28.000",
      tolanganSumma: "3.000",
      qolganQarz: "25.000",
      muudati: "25.12.2025",
      ohirgiTolovSanasi: "28.01.2026",
      status: "Qabul Qilingan",
    },
    {
      id: 3,
      kontragent: "56113554",
      qarzTuri: "Naqt",
      jamiQarz: "20.000",
      tolanganSumma: "13.000",
      qolganQarz: "7.000",
      muudati: "11.02.2025",
      ohirgiTolovSanasi: "08.03.2025",
      status: "Qabul Qilingan",
    },
    {
      id: 4,
      kontragent: "62113554",
      qarzTuri: "Karta",
      jamiQarz: "10.000",
      tolanganSumma: "3.000",
      qolganQarz: "7.000",
      muudati: "15.05.2025",
      ohirgiTolovSanasi: "08.08.2025",
      status: "Yuborilgan",
    },
    {
      id: 5,
      kontragent: "156487",
      qarzTuri: "Naqt",
      jamiQarz: "85.000",
      tolanganSumma: "13.000",
      qolganQarz: "72.000",
      muudati: "05.12.2024",
      ohirgiTolovSanasi: "08.03.2025",
      status: "Qabul Qilingan",
    },
    {
      id: 6,
      kontragent: "02315654",
      qarzTuri: "Naqt",
      jamiQarz: "44.000",
      tolanganSumma: "22.000",
      qolganQarz: "22.000",
      muudati: "18.08.2025",
      ohirgiTolovSanasi: "18.03.2026",
      status: "Yuborilgan",
    },
    {
      id: 7,
      kontragent: "1256554",
      qarzTuri: "Karta",
      jamiQarz: "28.000",
      tolanganSumma: "3.000",
      qolganQarz: "18.000",
      muudati: "05.01.2025",
      ohirgiTolovSanasi: "08.03.2026",
      status: "Qabul Qilingan",
    },
    {
      id: 8,
      kontragent: "15154854",
      qarzTuri: "Naqt",
      jamiQarz: "50.000",
      tolanganSumma: "20.000",
      qolganQarz: "30.000",
      muudati: "31.05.2025",
      ohirgiTolovSanasi: "08.03.2026",
      status: "Yuborilgan",
    },
    {
      id: 9,
      kontragent: "0584844",
      qarzTuri: "Naqt",
      jamiQarz: "800.000",
      tolanganSumma: "200.000",
      qolganQarz: "500.000",
      muudati: "19.09.2025",
      ohirgiTolovSanasi: "18.03.2026",
      status: "Yuborilgan",
    },
  ];

  return (
    <div className=" container mx-auto px-8 ">
      <section className="bg-[#EBF0FA] border border-[#6049E3] rounded-2xl shadow-sm p-6 max-w-[1402px] my-8">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left text-sm text-[#334F9D]">
                <th className="py-3 px-2 font-medium">S/N</th>
                <th className="py-3 font-medium">Kontragent </th>
                <th className="py-3 font-medium">Qarz Turi</th>
                <th className="py-3 font-medium">Jami Qarz</th>
                <th className="py-3 font-medium">To'langan Summa</th>
                <th className="py-3 font-medium">Qolgan Qarz</th>
                <th className="py-3 font-medium">Muddati</th>
                <th className="py-3 font-medium">O'xirgi To'lov Sanasi</th>

                <th className="py-3 font-medium text-right">Status</th>
              </tr>
            </thead>

            <tbody>
              {data.map((row, index) => (
                <tr
                  key={row.id}
                  className="border-t border-[#D0D0D0] text-black font-stretch-80%  text-sm "
                >
                  <td className="py-4 px-4  ">
                    {String(index + 1).padStart(2, "0")}
                  </td>
                  <td className="py-4  ">{row.kontragent}</td>
                  <td className="py-4 px-4">{row.qarzTuri}</td>
                  <td className="py-4 px-4">{row.jamiQarz}</td>
                  <td className="py-4 px-9">{row.tolanganSumma}</td>
                  <td className="py-4 px-4">{row.qolganQarz}</td>
                  <td className="py-4">{row.muudati}</td>
                  <td className="py-4 px-8">{row.ohirgiTolovSanasi}</td>
                  <td className="py-4 text-right">
                    <button className="text-[#1C96C8] hover:underline">
                      {row.status}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
