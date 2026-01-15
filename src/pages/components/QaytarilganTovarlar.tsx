import Navbar2 from "@/widgets/topbar_2/Topbar2";

export default function QaytarilganTovarlar() {
  const data = [
    {
      id: 1,
      klientNomi: "Alibekov K",
      klientId: "20202020",
      sotuvId: "0202020",
      tovarId: "20202020",
      tovarNomi: "tarelka",
      sanasi: "18.10.2025",
      miqdori: "2000",
      narxi: "800 000",
      status: "Brak",
    },
    {
      id: 2,
      klientNomi: "Alijanov R",
      klientId: "20202020",
      sotuvId: "0202020",
      tovarId: "20202020",
      tovarNomi: "Vilka",
      sanasi: "14.04.2025",
      miqdori: "8000",
      narxi: "400 000",
      status: "Singan",
    },
    {
      id: 3,
      klientNomi: "Jasurov T",
      klientId: "20202020",
      sotuvId: "0202020",
      tovarId: "20202020",
      tovarNomi: "Tarelka",
      sanasi: "17.08.2025",
      miqdori: "7400",
      narxi: "890 000",
      status: "Shikastlangan",
    },
    {
      id: 4,
      klientNomi: "Behruzov W",
      klientId: "20202020",
      sotuvId: "0202020",
      tovarId: "20202020",
      tovarNomi: "Qoshiq",
      sanasi: "11.08.2025",
      miqdori: "7100",
      narxi: "100 000",
      status: "Brak",
    },
    {
      id: 5,
      klientNomi: "Behruzjonov M",
      klientId: "20202020",
      sotuvId: "0202020",
      tovarId: "20202020",
      tovarNomi: "Qoshiq",
      sanasi: "19.01.2025",
      miqdori: "7900",
      narxi: "10 000",
      status: "Shikastlangan",
    },
    {
      id: 6,
      klientNomi: "Baburov K",
      klientId: "20202020",
      sotuvId: "0202020",
      tovarId: "20202020",
      tovarNomi: "Konteyner",
      sanasi: "10.09.2025",
      miqdori: "700",
      narxi: "190 000",
      status: "Shikastlangan",
    },
    {
      id: 7,
      klientNomi: "Asadbekov A",
      klientId: "20202020",
      sotuvId: "0202020",
      tovarId: "20202020",
      tovarNomi: "Qoshiq",
      sanasi: "15.05.2025",
      miqdori: "5200",
      narxi: "790 000",
      status: "Brak",
    },
    {
      id: 8,
      klientNomi: "Kaliev K",
      klientId: "20202020",
      sotuvId: "0202020",
      tovarId: "20202020",
      tovarNomi: "Tarelka",
      sanasi: "01.02.2025",
      miqdori: "750",
      narxi: "790 000",
      status: "Yetib kelmagan",
    },
    {
      id: 9,
      klientNomi: "Davronov L",
      klientId: "20202020",
      sotuvId: "0202020",
      tovarId: "20202020",
      tovarNomi: "Vilka",
      sanasi: "08.08.2025",
      miqdori: "8520",
      narxi: "495 000",
      status: "Brak",
    },
    {
      id: 10,
      klientNomi: "Roziyev N",
      klientId: "20202020",
      sotuvId: "0202020",
      tovarId: "20202020",
      tovarNomi: "Tarelka",
      sanasi: "08.12.2025",
      miqdori: "8550",
      narxi: "1 900 000",
      status: "Brak",
    },
  ];

  return (
    <div className=" container mx-auto px-8 ">
      <Navbar2 />

      <section className="bg-[#EBF0FA] border border-[#6049E3] rounded-2xl shadow-sm p-6 max-w-[1402px] my-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-black">Bugungi savdo</h2>

          <button className="w-[105px] rounded-full navbar2-button-color flex items-center justify-center text-2xl cursor-pointer">
            +
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left text-sm text-[#334F9D]">
                <th className="py-3 font-medium">S/N</th>
                <th className="py-3 font-medium">Sotuv ID</th>
                <th className="py-3 font-medium">Mijoz Nomi</th>
                <th className="py-3 font-medium">Mijoz ID</th>
                <th className="py-3 font-medium">Tovar Nomi</th>
                <th className="py-3 font-medium">Tovar ID</th>
                <th className="py-3 font-medium">Miqdori</th>
                <th className="py-3 font-medium">Narxi</th>
                <th className="py-3 font-medium">Sanasi</th>
                <th className="py-3 font-medium text-right">Status</th>
              </tr>
            </thead>

            <tbody>
              {data.map((row, index) => (
                <tr
                  key={row.id}
                  className="border-t border-[#D0D0D0]   text-sm text-black"
                >
                  <td className="py-4 ">
                    {String(index + 1).padStart(2, "0")}
                  </td>
                  <td className="py-4">{row.sotuvId}</td>
                  <td className="py-4 ">{row.klientNomi}</td>
                  <td className="py-4">{row.klientId}</td>
                  <td className="py-4">{row.tovarNomi}</td>
                  <td className="py-4">{row.tovarId}</td>
                  <td className="py-4">{row.miqdori}</td>
                  <td className="py-4">{row.narxi}</td>
                  <td className="py-4">{row.sanasi}</td>
                  <td className="py-4 text-right">
                    <button className="text-[#da1d1d] hover:underline">
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
