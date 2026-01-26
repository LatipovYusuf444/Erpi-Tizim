import { useState, useRef, useEffect } from "react";
import { ChevronsDown, CircleFadingPlus } from "lucide-react";
import { useMemo } from "react";

const options = ["Jasur", "Asad", "Wer", "Zoxid", "Rozmat"];
const options2 = ["New Rar", "W.web", "Streat.ko", "Query", "Start"];
const options3 = ["Kill bite", "H.web", "Lpik.crud", "Query J", "Www Staff"];
const options4 = ["Vilka", "Qoshiq", "Konteyner", "Paket"];
const options8 = ["Singan", "Shikastlangan", "Brak"];
const options9 = ["Naqd", "Karta", "Bank"];

export default function SotuvQoshishFormNew() {
  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(options[0]);

  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(options2[0]);

  const [open3, setOpen3] = useState(false);
  const [value3, setValue3] = useState(options3[0]);

  const [open4, setOpen4] = useState(false);
  const [value4, setValue4] = useState(options4[0]);

  const [open9, setOpen9] = useState(false);
  const [value9, setValue9] = useState(options9[0]);

  const [open8, setOpen8] = useState(false);

  const [value8, setValue8] = useState(options8[0]);
  const [value10, setValue10] = useState("");

  const [value7, setValue7] = useState("");
  const [value6, setValue6] = useState("");
  const [value5, setValue5] = useState("");

  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const ref3 = useRef<HTMLDivElement>(null);
  const ref4 = useRef<HTMLDivElement>(null);
  const ref8 = useRef<HTMLDivElement>(null);
  const ref9 = useRef<HTMLDivElement>(null);

  const priceWithNds = useMemo(() => {
    const price = Number(value6);
    const nds = Number(value7);

    if (!price || !nds) return "";

    return (price + (price * nds) / 100).toFixed(2);
  }, [value6, value7]);
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      const t = e.target as Node;

      if (!ref1.current?.contains(t)) setOpen1(false);
      if (!ref2.current?.contains(t)) setOpen2(false);
      if (!ref3.current?.contains(t)) setOpen3(false);
      if (!ref4.current?.contains(t)) setOpen4(false);
    };

    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div className="container mx-auto min-h-[392px] px-4 mt-8 ">
      <div className="grid grid-cols-4 gap-6">
        {/* 1 */}
        <div ref={ref1} className="relative">
          <label className="text-[18px] pl-8">Mijoz</label>

          <div className="flex items-center gap-2 mt-2">
            <button
              type="button"
              className="cursor-pointer text-[#334F9D] hover:text-[#1C96C8] transition-colors"
            >
              <CircleFadingPlus className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => {
                setOpen1((v) => !v);
                setOpen2(false);
                setOpen3(false);
                setOpen4(false);
              }}
              className="w-full h-11 px-4 rounded-xl text-left bg-[#EBF0FA] border border-[#334F9D]
                         flex items-center justify-between"
            >
              <span>{value1}</span>
              <ChevronsDown
                className="w-5 h-5 text-[#334F9D]"
                strokeWidth={1}
              />
            </button>
          </div>

          {open1 && (
            <div className="absolute z-50 mt-2 w-full rounded-xl border border-[#334F9D] bg-white shadow-lg overflow-hidden">
              {options.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    setValue1(opt);
                    setOpen1(false);
                  }}
                  className={`w-full text-left px-4 py-2 hover:bg-slate-100 ${
                    opt === value1
                      ? "bg-[#EBF0FA] text-[#334F9D] font-semibold"
                      : ""
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
        {/* 2 */}
        <div ref={ref2} className="relative">
          <label className="text-[18px] pl-8">
            Shtab <span className="text-[16px] text-gray-600"> qattan</span>
          </label>

          <div className="flex items-center gap-2 mt-2">
            <button
              type="button"
              className="cursor-pointer text-[#334F9D] hover:text-[#1C96C8] transition-colors"
            >
              <CircleFadingPlus className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => {
                setOpen2((v) => !v);
                setOpen1(false);
                setOpen3(false);
                setOpen4(false);
              }}
              className="w-full h-11 px-4 rounded-xl text-left bg-[#EBF0FA] border border-[#334F9D]
                         flex items-center justify-between"
            >
              <span>{value2}</span>
              <ChevronsDown
                className="w-5 h-5 text-[#334F9D]"
                strokeWidth={1}
              />
            </button>
          </div>

          {open2 && (
            <div className="absolute z-50 mt-2 w-full rounded-xl border border-[#334F9D] bg-white shadow-lg overflow-hidden">
              {options2.map((op) => (
                <button
                  key={op}
                  type="button"
                  onClick={() => {
                    setValue2(op);
                    setOpen2(false);
                  }}
                  className={`w-full text-left px-4 py-2 hover:bg-slate-100 ${
                    op === value2
                      ? "bg-[#EBF0FA] text-[#334F9D] font-semibold"
                      : ""
                  }`}
                >
                  {op}
                </button>
              ))}
            </div>
          )}
        </div>
        {/* 3 */}
        <div ref={ref3} className="relative">
          <label className="text-[18px] pl-8">
            Shtab <span className="text-[16px] text-gray-600"> qayerga</span>
          </label>

          <div className="flex items-center gap-2 mt-2">
            <button
              type="button"
              className="cursor-pointer text-[#334F9D] hover:text-[#1C96C8] transition-colors"
            >
              <CircleFadingPlus className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => {
                setOpen3((v) => !v);
                setOpen1(false);
                setOpen2(false);
                setOpen4(false);
              }}
              className="w-full h-11 px-4 rounded-xl text-left bg-[#EBF0FA] border border-[#334F9D]
                         flex items-center justify-between"
            >
              <span>{value3}</span>
              <ChevronsDown
                className="w-5 h-5 text-[#334F9D]"
                strokeWidth={1}
              />
            </button>
          </div>

          {open3 && (
            <div className="absolute z-50 mt-2 w-full rounded-xl border border-[#334F9D] bg-white shadow-lg overflow-hidden">
              {options3.map((op) => (
                <button
                  key={op}
                  type="button"
                  onClick={() => {
                    setValue3(op);
                    setOpen3(false);
                  }}
                  className={`w-full text-left px-4 py-2 hover:bg-slate-100 ${
                    op === value3
                      ? "bg-[#EBF0FA] text-[#334F9D] font-semibold"
                      : ""
                  }`}
                >
                  {op}
                </button>
              ))}
            </div>
          )}
        </div>
        {/* 4 */}
        <div ref={ref4} className="relative">
          <label className="text-[18px] pl-8">Mahsulot</label>

          <div className="flex items-center gap-2 mt-2">
            <button
              type="button"
              className="cursor-pointer text-[#334F9D] hover:text-[#1C96C8] transition-colors"
            >
              <CircleFadingPlus className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => {
                setOpen4((v) => !v);
                setOpen1(false);
                setOpen2(false);
                setOpen3(false);
              }}
              className="w-full h-11 px-4 rounded-xl text-left bg-[#EBF0FA] border border-[#334F9D]
                         flex items-center justify-between"
            >
              <span>{value4}</span>
              <ChevronsDown
                className="w-5 h-5 text-[#334F9D]"
                strokeWidth={1}
              />
            </button>
          </div>

          {open4 && (
            <div className="absolute z-50 mt-2 w-full rounded-xl border border-[#334F9D] bg-white shadow-lg overflow-hidden">
              {options4.map((op) => (
                <button
                  key={op}
                  type="button"
                  onClick={() => {
                    setValue4(op);
                    setOpen4(false);
                  }}
                  className={`w-full text-left px-4 py-2 hover:bg-slate-100 ${
                    op === value4
                      ? "bg-[#EBF0FA] text-[#334F9D] font-semibold"
                      : ""
                  }`}
                >
                  {op}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 pl-8">
          <label className=" text-[18px]" htmlFor="  ">
            Miqdori
          </label>
          <input
            type="text"
            inputMode="decimal"
            value={value5}
            onChange={(e) => {
              let v = e.target.value;

              if (!/^\d*\.?\d*$/.test(v)) return;

              if (v.length > 1 && v.startsWith("0") && !v.startsWith("0.")) {
                v = v.replace(/^0+/, "");
              }

              setValue5(v);
            }}
            placeholder="8 000"
            className="w-full h-11 px-4 pr-10 rounded-xl bg-[#EBF0FA]
    border border-[#334F9D] outline-none
    focus:border-[#1C96C8]"
          />
        </div>

        <div className="flex flex-col gap-2 pl-8">
          <label className=" text-[18px]" htmlFor="  ">
            Narxi
          </label>
          <input
            type="text"
            inputMode="decimal"
            value={value6}
            onChange={(e) => {
              let v = e.target.value;

              if (!/^\d*\.?\d*$/.test(v)) return;

              if (v.length > 1 && v.startsWith("0") && !v.startsWith("0.")) {
                v = v.replace(/^0+/, "");
              }

              setValue6(v);
            }}
            placeholder="2 400"
            className="w-full h-11 px-4 pr-10 rounded-xl bg-[#EBF0FA]
    border border-[#334F9D] outline-none
    focus:border-[#1C96C8]"
          />
        </div>
        <div className="flex flex-col gap-2 pl-8">
          <label className=" text-[18px]" htmlFor="  ">
            NDS Foyzi
          </label>
          <input
            type="text"
            inputMode="decimal"
            value={value7}
            onChange={(e) => {
              let v = e.target.value;

              if (!/^\d*\.?\d*$/.test(v)) return;

              if (v.length > 1 && v.startsWith("0") && !v.startsWith("0.")) {
                v = v.replace(/^0+/, "");
              }

              setValue7(v);
            }}
            placeholder="0.5 %"
            className="w-full h-11 px-4 pr-10 rounded-xl bg-[#EBF0FA]
    border border-[#334F9D] outline-none
    focus:border-[#1C96C8] focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-2 pl-8">
          <label className="text-[18px]">
            Narxi <span className="text-[16px] text-gray-600"> NDS bilan</span>
          </label>
          <input
            type="text"
            value={priceWithNds}
            readOnly
            placeholder="—"
            className="max-w-full h-11 px-4 rounded-xl bg-[#EBF0FA]
      border border-[#334F9D] text-[#334F9D]  font-semibold outline-none"
          />
        </div>

        <div ref={ref8} className="relative">
          <label className="text-[18px] pl-8">Statusi</label>

          <div className="flex items-center gap-2 mt-2">
            <button
              type="button"
              className="cursor-pointer text-[#334F9D] hover:text-[#1C96C8] transition-colors"
            >
              <CircleFadingPlus className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => {
                setOpen8((v) => !v);
                setOpen1(false);
                setOpen2(false);
                setOpen3(false);
                setOpen4(false);
              }}
              className="w-full h-11 px-4 rounded-xl text-left bg-[#EBF0FA] border border-[#334F9D]
                         flex items-center justify-between"
            >
              <span>{value8}</span>
              <ChevronsDown
                className="w-5 h-5 text-[#334F9D]"
                strokeWidth={1}
              />
            </button>
          </div>

          {open8 && (
            <div className="absolute z-50 mt-2 w-full rounded-xl border border-[#334F9D] bg-white shadow-lg overflow-hidden">
              {options8.map((op) => (
                <button
                  key={op}
                  type="button"
                  onClick={() => {
                    setValue8(op);
                    setOpen8(false);
                  }}
                  className={`w-full text-left px-4 py-2 hover:bg-slate-100 ${
                    op === value8
                      ? "bg-[#EBF0FA] text-[#334F9D] font-semibold"
                      : ""
                  }`}
                >
                  {op}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 pl-8">
          <label className="text-[18px]">Sanasi</label>

          <input
            type="date"
            value={value10}
            onChange={(e) => setValue10(e.target.value)}
            className="w-full h-11 px-4 rounded-xl bg-[#EBF0FA]
               border border-[#334F9D] outline-none
               focus:border-[#1C96C8]"
          />
        </div>

        <div ref={ref9} className="relative">
          <label className="text-[18px] pl-8">To'lov turi</label>

          <div className="flex items-center gap-2 mt-2">
            <button
              type="button"
              className="cursor-pointer text-[#334F9D] hover:text-[#1C96C8] transition-colors"
            >
              <CircleFadingPlus className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => {
                setOpen9((v) => !v);
                setOpen1(false);
                setOpen2(false);
                setOpen3(false);
                setOpen4(false);
                setOpen8(false);
              }}
              className="w-full h-11 px-4 rounded-xl text-left bg-[#EBF0FA] border border-[#334F9D]
                         flex items-center justify-between"
            >
              <span>{value9}</span>
              <ChevronsDown
                className="w-5 h-5 text-[#334F9D]"
                strokeWidth={1}
              />
            </button>
          </div>

          {open9 && (
            <div className="absolute z-50 mt-2 w-full rounded-xl border border-[#334F9D] bg-white shadow-lg overflow-hidden">
              {options9.map((op) => (
                <button
                  key={op}
                  type="button"
                  onClick={() => {
                    setValue9(op);
                    setOpen9(false);
                  }}
                  className={`w-full text-left px-4 py-2 hover:bg-slate-100 ${
                    op === value9
                      ? "bg-[#EBF0FA] text-[#334F9D] font-semibold"
                      : ""
                  }`}
                >
                  {op}
                </button>
              ))}
            </div>
          )}
        </div>
        <div>
          <button>Add</button>
          <button></button>
        </div>
      </div>
    </div>
  );
}
