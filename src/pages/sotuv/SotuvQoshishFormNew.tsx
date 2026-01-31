import React, { useEffect, useMemo, useRef, useState } from "react";
import { ChevronsDown, CircleFadingPlus, X } from "lucide-react";
import { Overlay, Card } from "@/pages/components/ModalCard";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
// ------------------ demo options ------------------
const options = ["Jasur", "Asad", "Wer", "Zoxid", "Rozmat"];
const options2 = ["New Rar", "W.web", "Streat.ko", "Query", "Start"];
const options3 = ["Kill bite", "H.web", "Lpik.crud", "Query J", "Www Staff"];
const options4 = ["Vilka", "Qoshiq", "Konteyner", "Paket"];

type ScreenDimProps = { show: boolean; onClick?: () => void };
function ScreenDim({ show, onClick }: ScreenDimProps) {
  if (!show) return null;
  return (
    <div
      className="fixed inset-0 z-[90] bg-black/10 backdrop-blur-[1px]"
      onMouseDown={onClick}
    />
  );
}

type HighlightWrapProps = { active: boolean; children: React.ReactNode };
function HighlightWrap({ active, children }: HighlightWrapProps) {
  return (
    <div
      className={[
        "relative transition-all duration-200",
        active ? "z-[100] rounded-xl p-3 ring-2 ring-[#D84040]" : "",
      ].join(" ")}
    >
      {children}
    </div>
  );
}

type HintBubbleProps = { show: boolean; text: string };
function HintBubble({ show, text }: HintBubbleProps) {
  if (!show) return null;
  return (
    <div className="absolute -bottom-14 left-0 z-[110] max-w-[260px] rounded-lg bg-[#D84040] px-4 py-2 text-sm text-white shadow-lg">
      {text}
    </div>
  );
}

export default function SotuvQoshishForm() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") navigate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  return (
    <div className="w-full h-[450px] py-4">
      <Overlay onMouseDown={() => navigate(-1)}>
        <Card onMouseDown={(e) => e.stopPropagation()}>
          <div className="content">
            <div className="flex items-center justify-between w-full h-auto gap-3">
              <div>
                <h2 className="text-[28px] text-white font-semibold">
                  {t("salesCreate.title")}
                </h2>
                <p className="text-white/80 text-sm">
                  {t("salesCreate.subtitle")}
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="p-2 rounded-xl bg-white/15 hover:bg-white/25 transition"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="scroll">
              <SotuvQoshishFormNew />
            </div>
          </div>
        </Card>
      </Overlay>
    </div>
  );
}

// ------------------ Form ------------------
type FocusError = "product" | "quantity" | "date" | null;

function SotuvQoshishFormNew() {
  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(options[0]);

  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(options2[0]);

  const [open3, setOpen3] = useState(false);
  const [value3, setValue3] = useState(options3[0]);

  const [open4, setOpen4] = useState(false);
  const [value4, setValue4] = useState<string>("");

  const [value5, setValue5] = useState("");
  const [value6] = useState("");
  const [value7, setValue7] = useState("");
  const [open9, setOpen9] = useState(false);
  const [value10] = useState("");
  const [value11, setValue11] = useState<string>("");

  const ref1 = useRef<HTMLDivElement | null>(null);
  const ref2 = useRef<HTMLDivElement | null>(null);
  const ref3 = useRef<HTMLDivElement | null>(null);
  const ref4 = useRef<HTMLDivElement | null>(null);
  const ref9 = useRef<HTMLDivElement | null>(null);

  const productBoxRef = useRef<HTMLDivElement | null>(null);
  const quantityBoxRef = useRef<HTMLDivElement | null>(null);
  const dateBoxRef = useRef<HTMLDivElement | null>(null);

  const [focusError, setFocusError] = useState<FocusError>(null);

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
      if (!ref9.current?.contains(t)) setOpen9(false);
    };

    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const closeOthers = () => {
    setOpen1(false);
    setOpen2(false);
    setOpen3(false);
    setOpen4(false);
    setOpen9(false);
  };

  const focusAndScroll = (which: FocusError) => {
    setFocusError(which);
    closeOthers();

    const map: Record<
      Exclude<FocusError, null>,
      React.RefObject<HTMLDivElement | null>
    > = {
      product: productBoxRef,
      quantity: quantityBoxRef,
      date: dateBoxRef,
    };

    if (which) {
      map[which].current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const onSave = () => {
    if (!value4) return focusAndScroll("product");
    if (!value5) return focusAndScroll("quantity");
    if (!value10) return focusAndScroll("date");

    setFocusError(null);
    closeOthers();

    console.log({
      mijoz: value1,
      shtabFrom: value2,
      shtabTo: value3,
      mahsulot: value4,
      miqdor: value5,
      nds: value7,
      basePrice: value6,
      priceWithNds,
    });
  };
  const { t } = useTranslation();
  return (
    <div className="container mx-auto min-h-[392px] px-2 mt-4">
      <ScreenDim
        show={focusError !== null}
        onClick={() => setFocusError(null)}
      />

      <div className="rounded-3xl bg-white border border-white/50 p-4">
        <div className="grid grid-cols-4 gap-6">
          <div ref={ref1} className="relative">
            <label className="text-[18px] pl-8 text-slate-800">
              {t("salesCreate.client")}
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
                  setOpen1((v) => !v);
                  setOpen2(false);
                  setOpen3(false);
                  setOpen4(false);
                  setOpen9(false);
                }}
                className="w-full h-11 px-4 rounded-xl text-left bg-[#EBF0FA] border border-[#334F9D]
                           flex items-center justify-between"
              >
                <span className="text-slate-800">{value1}</span>
                <ChevronsDown
                  className="w-5 h-5 text-[#334F9D]"
                  strokeWidth={1}
                />
              </button>
            </div>

            {open1 && (
              <div className="absolute z-50 mt-2 w-full rounded-xl border border-[#334F9D] bg-white text-slate-800 overflow-hidden">
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
          <div ref={ref2} className="relative">
            <label className="text-[18px] pl-8 gap-2 text-slate-800">
              {t("salesCreate.staffFrom")}{" "}
              <span className="text-[16px] text-gray-600">
                {" "}
                {t("salesCreate.from")}
              </span>
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
                  setOpen9(false);
                }}
                className="w-full h-11 px-4 rounded-xl text-left bg-[#EBF0FA] border border-[#334F9D]
                           flex items-center justify-between text-slate-800"
              >
                <span className="text-slate-800">{value2}</span>
                <ChevronsDown
                  className="w-5 h-5 text-[#334F9D]"
                  strokeWidth={1}
                />
              </button>
            </div>

            {open2 && (
              <div className="absolute z-50 mt-2 w-full rounded-xl border border-[#334F9D] bg-white text-slate-800 shadow-lg overflow-hidden">
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
          <div ref={ref3} className="relative">
            <label className="text-[18px] pl-8 text-slate-800">
              {t("salesCreate.staffTo")}{" "}
              <span className="text-[16px] text-gray-600">
                {" "}
                {t("salesCreate.to")}
              </span>
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
                  setOpen9(false);
                }}
                className="w-full h-11 px-4 rounded-xl text-left bg-[#EBF0FA] border border-[#334F9D]
                           flex items-center justify-between"
              >
                <span className="text-slate-800">{value3}</span>
                <ChevronsDown
                  className="w-5 h-5 text-[#334F9D]"
                  strokeWidth={1}
                />
              </button>
            </div>

            {open3 && (
              <div className="absolute z-50 mt-2 w-full rounded-xl border border-[#334F9D] bg-white shadow-lg text-slate-800 overflow-hidden">
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
          <div ref={ref4} className="relative">
            <HighlightWrap active={focusError === "product"}>
              <div ref={productBoxRef} className="relative flex flex-col gap-2">
                <label className="text-[18px] text-slate-800">
                  {t("salesCreate.product")}
                </label>

                <button
                  type="button"
                  onClick={() => {
                    setOpen4((v) => !v);
                    setOpen1(false);
                    setOpen2(false);
                    setOpen3(false);
                    setOpen9(false);
                    setFocusError(null);
                  }}
                  className={[
                    "w-full h-11 px-4 rounded-xl bg-[#EBF0FA] border flex items-center justify-between",
                    focusError === "product"
                      ? "border-[#D84040]"
                      : "border-[#334F9D]",
                  ].join(" ")}
                >
                  <span className="text-slate-800">
                    {value4 || t("salesCreate.selectProduct")}
                  </span>
                  <ChevronsDown className="w-5 h-5 text-[#334F9D]" />
                </button>

                <HintBubble
                  show={focusError === "product"}
                  text={t("salesCreate.productRequired")}
                />

                {open4 && (
                  <div className="absolute z-50 mt-2 w-full rounded-xl border border-[#334F9D] bg-white shadow-lg text-slate-800 overflow-hidden">
                    {options4.map((op) => (
                      <button
                        key={op}
                        type="button"
                        onClick={() => {
                          setValue4(op);
                          setOpen4(false);
                          setFocusError(null);
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
            </HighlightWrap>
          </div>
          <HighlightWrap active={focusError === "quantity"}>
            <div
              ref={quantityBoxRef}
              className="relative flex flex-col gap-2 pl-8"
            >
              <label className="text-[18px] text-slate-800">
                {t("salesCreate.quantity")}
              </label>
              <input
                type="text"
                inputMode="decimal"
                value={value5}
                onChange={(e) => {
                  let v = e.target.value;
                  if (!/^\d*\.?\d*$/.test(v)) return;
                  if (v.length > 1 && v.startsWith("0") && !v.startsWith("0."))
                    v = v.replace(/^0+/, "");
                  setValue5(v);
                  if (v) setFocusError(null);
                }}
                placeholder="8 000"
                className={[
                  "w-full h-11 px-4 pr-10 rounded-xl cursor-pointer  text-slate-800 bg-[#EBF0FA] border outline-none focus:border-[#1C96C8]",
                  focusError === "quantity"
                    ? "border-[#D84040]"
                    : "border-[#334F9D]",
                ].join(" ")}
              />
              <HintBubble
                show={focusError === "quantity"}
                text={t("salesCreate.quantityRequired")}
              />
            </div>
          </HighlightWrap>
          <div className="relative flex flex-col gap-2 pl-8 ">
            <label className="text-[18px] text-slate-800">
              {t("salesCreate.price")}
            </label>
            <input
              type="text"
              inputMode="decimal"
              value={value11}
              onChange={(e) => {
                let v = e.target.value;
                if (!/^\d*\.?\d*$/.test(v)) return;
                if (v.length > 1 && v.startsWith("0") && !v.startsWith("0."))
                  v = v.replace(/^0+/, "");
                setValue11(v);
              }}
              placeholder="14 000"
              className="w-full h-11 px-4 pr-10 cursor-pointer rounded-xl text-slate-800 bg-[#EBF0FA]
               border border-[#334F9D] outline-none focus:border-[#1C96C8]"
            />
          </div>
          <div className="flex flex-col gap-2 pl-8">
            <label className="text-[18px] text-slate-800">
              {t("salesCreate.ndsPercent")}
            </label>
            <input
              type="text"
              inputMode="decimal"
              value={value7}
              onChange={(e) => {
                let v = e.target.value;
                if (!/^\d*\.?\d*$/.test(v)) return;
                if (v.length > 1 && v.startsWith("0") && !v.startsWith("0."))
                  v = v.replace(/^0+/, "");
                setValue7(v);
              }}
              placeholder="0.5 %"
              className="w-full h-11 px-4 pr-10 rounded-xl  cursor-pointer  bg-[#EBF0FA] border border-[#334F9D] outline-none text-slate-800 focus:border-[#1C96C8]"
            />
          </div>
          <div className="flex flex-col gap-2 pl-8">
            <label className="text-[18px] text-slate-800">
              {t("salesCreate.priceWithNds")}
              <span className="text-[15px] text-gray-600">
                {" "}
                {t("salesCreate.withNds")}
              </span>
            </label>
            <input
              type="text"
              value={priceWithNds}
              readOnly
              placeholder="—"
              className="max-w-full h-11 px-4  cursor-not-allowed rounded-xl bg-[#EBF0FA] border border-[#334F9D] text-[#334F9D] font-semibold outline-none"
            />
          </div>
          <div className="col-span-4 flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={closeOthers}
              className="px-5 py-2 rounded-xl border bg-linear-to-t from-[#1C96C8] to-[#334F9D] hover:bg-linear-to-b transition cursor-pointer text-white"
            >
              {t("common.closeSelects")}
            </button>

            <button
              type="button"
              onClick={onSave}
              className="px-6 py-2 rounded-xl bg-linear-to-l from-[#1C96C8] to-[#334F9D] hover:bg-linear-to-r transition cursor-pointer text-white"
            >
              {t("common.save")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
