export default function KassaPage() {
  const data = [
    {
      id: 1,
      hujjatNomi: "265413554",
      sana: "09.03.2023",
      masulShaxs: "Komil",
      summa: "30.000",
      status: "Tasdiqlangan",
    },
    {
      id: 2,
      hujjatNomi: "03555546544",
      sana: "28.10.2025",
      masulShaxs: "Laziz",
      summa: "428.100",
      status: "Qaytarilgan",
    },
    {
      id: 3,
      hujjatNomi: "1235554454",
      sana: "23.11.2023",
      masulShaxs: "Jasur",
      summa: "10.000",
      status: "Tasdiqlangan",
    },
    {
      id: 4,
      hujjatNomi: "1585545545",
      sana: "05.11.2025",
      masulShaxs: "Jas",
      summa: "412.000",
      status: "Tasdiqlangan",
    },
    {
      id: 5,
      hujjatNomi: "415154555555",
      sana: "09.10.2024",
      masulShaxs: "Farruh",
      summa: "202.000",
      status: "Qaytarilgan",
    },
    {
      id: 6,
      hujjatNomi: "41555455544",
      sana: "22.12.2022",
      masulShaxs: "Dilshod",
      summa: "2.000",
      status: "Tasdiqlangan",
    },
    {
      id: 7,
      hujjatNomi: "542156554",
      sana: "03.01.2025",
      masulShaxs: "sher",
      summa: "240.000",
      status: "Tasdiqlangan",
    },
    {
      id: 8,
      hujjatNomi: "854556514",
      sana: "02.11.2025",
      masulShaxs: "Saman",
      summa: "2.000",
      status: "Tasdiqlangan",
    },
    {
      id: 9,
      hujjatNomi: "861556554",
      sana: "22.11.2025",
      masulShaxs: "Sardor",
      summa: "28.000",
      status: "Tasdiqlangan",
    },
  ];
  return (
    <div className=" container mx-auto  ">
      <section className="bg-[#EBF0FA] border border-[#6049E3] rounded-2xl shadow-sm  max-w-[1400px]">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left text-sm text-[#334F9D]">
                <th className="py-3 px-2 font-medium">S/N</th>
                <th className="py-3 font-medium">Hujjat Raqami </th>
                <th className="py-3 px-4 font-medium">Sana</th>
                <th className="py-3 font-medium">Ma'sul Shaxs</th>
                <th className="py-3 font-medium">Summa</th>
                <th className="py-3 font-medium text-right">Status</th>
              </tr>
            </thead>

            <tbody>
              {data.map((row, index) => (
                <tr
                  key={row.id}
                  className="border-t border-[#D0D0D0] text-black font-stretch-80%  text-sm "
                >
                  <td className="py-4 px-4">
                    {String(index + 1).padStart(2, "0")}
                  </td>
                  <td className="py-4 px-2">{row.hujjatNomi}</td>
                  <td className="py-4 ">{row.sana}</td>
                  <td className="py-4 px-5">{row.masulShaxs}</td>
                  <td className="py-4 px-2">{row.summa}</td>
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
