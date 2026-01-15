import Navbar2 from "@/widgets/topbar_2/Topbar2";

export default function TolovOynasi() {
  const data = [
    {
      id: 1,
      klientNomi: "Rasulov I",
      klientId: "20202020",
      sotuvId: "0202020",
      tovarId: "20202020",
      tovarNomi: "tarelka",
      sanasi: "19.12.2024",
      miqdori: "5000",
      narxi: "890 000",
    },
    {
      id: 2,
      klientNomi: "Alibekov E",
      klientId: "20202020",
      sotuvId: "0202020",
      tovarId: "20202020",
      tovarNomi: "Vilka",
      sanasi: "10.04.2023",
      miqdori: "800",
      narxi: "410 000",
    },
    {
      id: 3,
      klientNomi: "Tasibekov W",
      klientId: "20202020",
      sotuvId: "0202020",
      tovarId: "20202020",
      tovarNomi: "Tarelka",
      sanasi: "07.08.2025",
      miqdori: "700",
      narxi: "820 000",
    },
    {
      id: 4,
      klientNomi: "Sobirov Q",
      klientId: "20202020",
      sotuvId: "0202020",
      tovarId: "20202020",
      tovarNomi: "Qoshiq",
      sanasi: "06.06.2022",
      miqdori: "200",
      narxi: "150 000",
    },
    {
      id: 5,
      klientNomi: "Werhadov L",
      klientId: "20202020",
      sotuvId: "0202020",
      tovarId: "20202020",
      tovarNomi: "Qoshiq",
      sanasi: "14.01.2024",
      miqdori: "790",
      narxi: "180 000",
    },
    {
      id: 6,
      klientNomi: "Besaliev F",
      klientId: "20202020",
      sotuvId: "0202020",
      tovarId: "20202020",
      tovarNomi: "Konteyner",
      sanasi: "30.01.2025",
      miqdori: "87 700",
      narxi: "1 990 000",
    },
    {
      id: 7,
      klientNomi: "Amanbekov A",
      klientId: "20202020",
      sotuvId: "0202020",
      tovarId: "20202020",
      tovarNomi: "Qoshiq",
      sanasi: "25.05.2025",
      miqdori: "5500",
      narxi: "750 000",
    },
    {
      id: 8,
      klientNomi: "Polatov H",
      klientId: "20202020",
      sotuvId: "0202020",
      tovarId: "20202020",
      tovarNomi: "Tarelka",
      sanasi: "27.07.2022",
      miqdori: "78 050",
      narxi: "7 100 000",
    },
    {
      id: 9,
      klientNomi: "Davronov L",
      klientId: "20202020",
      sotuvId: "0202020",
      tovarId: "20202020",
      tovarNomi: "Vilka",
      sanasi: "08.08.2025",
      miqdori: "88 820",
      narxi: "995 000",
    },
    {
      id: 10,
      klientNomi: "Laniev V",
      klientId: "20202020",
      sotuvId: "0202020",
      tovarId: "20202020",
      tovarNomi: "Tarelka",
      sanasi: "08.12.2025",
      miqdori: "950",
      narxi: " 900 000",
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
                  </td>{" "}
                  <td className="py-4">{row.sotuvId}</td>
                  <td className="py-4 ">{row.klientNomi}</td>
                  <td className="py-4">{row.klientId}</td>
                  <td className="py-4">{row.tovarNomi}</td>
                  <td className="py-4">{row.tovarId}</td>
                  <td className="py-4">{row.miqdori}</td>
                  <td className="py-4">{row.narxi}</td>
                  <td className="py-4">{row.sanasi}</td>
                  <td className="py-4 text-right">
                    <button className="text-[#1C96C8] hover:underline">
                      Tasdiqlangan
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
