import Navbar2 from "@/widgets/topbar_2/Topbar2";
import { ReactSelectBox } from "./ReactSelect";

export default function SotuvQoshish() {
  return (
    <div className="mx-auto px-4 container">
      <Navbar2 />
      <div className="w-[1402px]  h-[606px] border border-[#6049E3] mt-[29px] rounded-3xl bg-[#EBF0FA]">
        <h1 className="font-bold text-[28px] p-4">Sotuv qo'shish</h1>
        <div className="grid grid-cols-3  px-4 mt-[56px]">
          <div className="flex flex-col gap-2">
            <h2>Mijoz nomi</h2>
            <input
              type="text"
              placeholder="Sizning ismingiz"
              className="border border-[#D0D0D0] rounded-xl max-w-[404px] min-h-[51px] flex items-center align-center px-4 justify-center outline-none focus:border-[#6049E3]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h2>Mahsulot</h2>
            <input
              type="text"
              placeholder="Tovar"
              className="border border-[#D0D0D0] rounded-xl max-w-[404px] min-h-[51px] flex items-center align-center px-4 justify-center outline-none focus:border-[#6049E3]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h2>Miqdori</h2>
            <ReactSelectBox />
          </div>
          <div className="flex gap-8">
            <div className="mt-4 gap-2 flex flex-col">
              <h2>Topshirish muddati</h2>

              <input
                type="date"
                id=""
                className="border border-[#D0D0D0] rounded-xl w-[404px] min-h-[51px] flex items-center align-center px-4 justify-center outline-none focus:border-[#6049E3]"
              />
            </div>
            <div className="flex flex-col gap-2 mt-4 col-span-2 pl-4">
              <h2>Eslatma</h2>
              <textarea
                placeholder="Fikringiz..."
                rows={8}
                className="border border-[#D0D0D0] rounded-xl min-w-[911px] min-h-[230px] px-5 outline-none focus:border-[#6049E3]  resize-none text-start
      align-top py-3"
              />
            </div>
          </div>
        </div>

        <div className="flex  -mt-[170px] ">
          <div className="flex flex-col gap-2  px-4">
            <h2>Mijoz ID</h2>
            <input
              type="number"
              placeholder="7447474"
              className="border border-[#D0D0D0] rounded-xl w-[187px] min-h-[51px] flex items-center align-center px-4 justify-center outline-none focus:border-[#6049E3]"
            />
          </div>
          <div className="flex flex-col gap-2 ] px-4">
            <h2>Sotuv ID</h2>
            <input
              type="number"
              placeholder="8485867"
              className="border border-[#D0D0D0] rounded-xl w-[187px] min-h-[51px] flex items-center align-center px-4 justify-center outline-none focus:border-[#6049E3]"
            />
          </div>
        </div>
        <button className=" rounded-xl mx-4 mt-8 min-w-[404px] min-h-[51px] flex items-center align-center px-4 justify-center outline-none focus:border-[#6049E3] cursor-pointer navbar2-button-color">
          Yaratish
        </button>
      </div>
    </div>
  );
}
