import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Status = "pending" | "sent" | "accepted";

type Form = {
  ingredientName: string;
  narxKg: string;    // numeric
  miqdorKg: string;  // numeric
  donaSoni: string;  // numeric
  sana: string;
  status: Status;
};

type FieldKey = keyof Form;

const initialForm: Form = {
  ingredientName: "",
  narxKg: "",
  miqdorKg: "",
  donaSoni: "",
  sana: "",
  status: "pending",
};

const LS_ROWS = "inv_rows_v1";

function lsGet<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}
function lsSet<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

const digitsOnly = (s: string) => s.replace(/[^\d]/g, "");
const isDigits = (s: string) => /^\d+$/.test(s.trim());
const makeId = () => `${Date.now()}_${Math.random().toString(16).slice(2)}`;

export default function IngredientQoshishPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState<Form>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});

  const required: Partial<Record<FieldKey, string>> = {
    ingredientName: "Ingredient nomini kiriting",
    narxKg: "Narx/kg ni kiriting",
    miqdorKg: "Miqdor (kg) ni kiriting",
    donaSoni: "Dona sonini kiriting",
    sana: "Sanani tanlang",
    status: "Status tanlang",
  };

  const validate = (data: Form) => {
    const e: Partial<Record<FieldKey, string>> = {};

    (Object.keys(required) as FieldKey[]).forEach((k) => {
      const v = data[k];
      if (!String(v).trim()) e[k] = required[k]!;
    });

    if (data.narxKg.trim() && !isDigits(data.narxKg)) e.narxKg = "Faqat raqam kiriting";
    if (data.miqdorKg.trim() && !isDigits(data.miqdorKg)) e.miqdorKg = "Faqat raqam kiriting";
    if (data.donaSoni.trim() && !isDigits(data.donaSoni)) e.donaSoni = "Faqat raqam kiriting";

    // dona 0 bo‘lmasin
    if (data.donaSoni.trim() && Number(data.donaSoni) === 0) e.donaSoni = "0 bo‘lmasin";

    return e;
  };

  const currentValidation = useMemo(() => validate(form), [form]);
  const isValid = useMemo(() => Object.keys(currentValidation).length === 0, [currentValidation]);

  const update = (key: keyof Form, value: any) => {
    setForm((p) => ({ ...p, [key]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete (next as any)[key];
      return next;
    });
  };

  const onNumericChange =
    (key: "narxKg" | "miqdorKg" | "donaSoni") =>
      (raw: string) => {
        if (raw && /[^\d]/.test(raw)) setErrors((p) => ({ ...p, [key]: "Faqat raqam kiriting" }));
        else
          setErrors((p) => {
            const n = { ...p };
            delete n[key];
            return n;
          });

        update(key, digitsOnly(raw));
      };

  const narxKg = Number(form.narxKg || 0);
  const miqdorKg = Number(form.miqdorKg || 0);
  const dona = Number(form.donaSoni || 0);

  const jamiPul = narxKg * miqdorKg;
  const birDonaNarx = dona > 0 ? jamiPul / dona : 0;

  const inputBase = "h-11 rounded-xl bg-white/95 border shadow-sm focus-visible:ring-0";
  const okBorder = "border-white/60 focus-visible:border-white";
  const errBorder = "border-[#FF6B6B] ring-2 ring-[#FF6B6B]/25";

  const selectContentClass =
    "z-[9999] bg-white text-slate-900 border border-slate-200 shadow-2xl rounded-xl";

  const fieldClass = (k: FieldKey) =>
    `${inputBase} ${errors[k] ? errBorder : okBorder} text-slate-900`;

  const errorText = (k: FieldKey) =>
    errors[k] ? <div className="mt-2 text-xs font-semibold text-[#FFE2E2]">{errors[k]}</div> : null;

  const reset = () => {
    setForm(initialForm);
    setErrors({});
    setSubmitting(false);
  };

  const onSubmit = async () => {
    const e = validate(form);
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }

    try {
      setSubmitting(true);

      const rows = lsGet<any[]>(LS_ROWS, []);

      const payload = {
        id: makeId(),
        kind: "ingredient",
        ingredientName: form.ingredientName,
        narxKg: form.narxKg,
        miqdorKg: form.miqdorKg,
        donaSoni: form.donaSoni,
        jamiPul: String(jamiPul),
        birDonaNarx: String(Math.round(birDonaNarx * 100) / 100),
        sana: form.sana,
        status: form.status,

        // jadval uchun
        title: form.ingredientName,
        miqdor: form.miqdorKg,
        narx: String(jamiPul),
      };

      const next = [payload, ...rows];
      lsSet(LS_ROWS, next);

      reset();
      navigate("/ombor/inventarizatsiya");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-[#1C96C8] to-[#334F9D] py-10 px-6">
      <div className="mx-auto w-full max-w-[1180px]">
        {/* top right tabs */}
        <div className="mb-6 flex justify-end">
          <div className="rounded-full border border-[#334F9D] p-1 bg-white">
            <button
              onClick={() => navigate("/ombor/inventarizatsiya/product-qoshish")}
              className="px-6 py-2 rounded-full font-semibold text-slate-600"
            >
              Product qo‘shish
            </button>
            <button
              onClick={() => navigate("/ombor/inventarizatsiya/ingredient-qoshish")}
              className="px-6 py-2 rounded-full font-semibold bg-linear-to-r from-[#1C96C8] to-[#334F9D] text-white"
            >
              Ingredient qo‘shish
            </button>
          </div>
        </div>

        <div className="rounded-[28px] bg-white/10 backdrop-blur-xl border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.25)] overflow-hidden">
          <div className="px-10 py-10 text-white">
            <div className="text-4xl font-bold tracking-tight">Ingredient qo‘shish</div>
            <div className="mt-2 text-white/85">
              Ingredient nomi, narxi, kg, miqdor va hisob-kitob
            </div>
          </div>

          <div className="bg-white/10 border-t border-white/15 px-10 py-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="min-w-0 md:col-span-2">
                <div className="text-sm font-semibold mb-2 text-white/90">Ingredient nomi</div>
                <Input
                  className={fieldClass("ingredientName")}
                  placeholder="Masalan: Un, Yog‘, Shakar..."
                  value={form.ingredientName}
                  onChange={(e) => update("ingredientName", e.target.value)}
                />
                {errorText("ingredientName")}
              </div>

              <div className="min-w-0">
                <div className="text-sm font-semibold mb-2 text-white/90">Narx / kg</div>
                <Input
                  className={fieldClass("narxKg")}
                  inputMode="numeric"
                  placeholder="Masalan: 12000"
                  value={form.narxKg}
                  onChange={(e) => onNumericChange("narxKg")(e.target.value)}
                />
                {errorText("narxKg")}
              </div>

              <div className="min-w-0">
                <div className="text-sm font-semibold mb-2 text-white/90">Miqdor (kg)</div>
                <Input
                  className={fieldClass("miqdorKg")}
                  inputMode="numeric"
                  placeholder="Masalan: 50"
                  value={form.miqdorKg}
                  onChange={(e) => onNumericChange("miqdorKg")(e.target.value)}
                />
                {errorText("miqdorKg")}
              </div>

              <div className="min-w-0">
                <div className="text-sm font-semibold mb-2 text-white/90">Dona soni</div>
                <Input
                  className={fieldClass("donaSoni")}
                  inputMode="numeric"
                  placeholder="Masalan: 100"
                  value={form.donaSoni}
                  onChange={(e) => onNumericChange("donaSoni")(e.target.value)}
                />
                {errorText("donaSoni")}
              </div>

              <div className="min-w-0">
                <div className="text-sm font-semibold mb-2 text-white/90">Sanasi</div>
                <Input
                  className={fieldClass("sana")}
                  type="date"
                  value={form.sana}
                  onChange={(e) => update("sana", e.target.value)}
                />
                {errorText("sana")}
              </div>

              <div className="min-w-0 md:col-span-2">
                <div className="text-sm font-semibold mb-2 text-white/90">Status</div>
                <Select value={form.status} onValueChange={(v: Status) => update("status", v)}>
                  <SelectTrigger className={`${fieldClass("status")} relative z-10`}>
                    <SelectValue placeholder="Status tanlang" />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    <SelectItem value="pending">Kutilmoqda</SelectItem>
                    <SelectItem value="sent">Yuborilgan</SelectItem>
                    <SelectItem value="accepted">Qabul qilingan</SelectItem>
                  </SelectContent>
                </Select>
                {errorText("status")}
              </div>
            </div>

            {/* hisob-kitob */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-white/20 bg-white/10 p-5 text-white">
                <div className="text-sm text-white/80">Jami ketgan pul</div>
                <div className="mt-2 text-3xl font-extrabold">{jamiPul || 0}</div>
              </div>
              <div className="rounded-2xl border border-white/20 bg-white/10 p-5 text-white">
                <div className="text-sm text-white/80">1 dona narxi</div>
                <div className="mt-2 text-3xl font-extrabold">{birDonaNarx || 0}</div>
              </div>
            </div>

            <div className="mt-10 flex items-center justify-end gap-3">
              <Button
                variant="outline"
                className="rounded-xl bg-white/90 hover:bg-white text-slate-900 border-white/40"
                onClick={reset}
              >
                Tozalash
              </Button>

              <Button
                disabled={!isValid || submitting}
                onClick={onSubmit}
                className={`rounded-xl text-white ${!isValid || submitting
                    ? "bg-white/30 cursor-not-allowed"
                    : "bg-[#0B2E7A] hover:opacity-95"
                  }`}
              >
                {submitting ? "Saqlanmoqda..." : "Saqlash"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}