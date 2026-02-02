import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Option = { value: string; label: string };
type Status = "pending" | "sent" | "accepted";

type SotuvForm = {
  tovarId: string;
  omborQattan: string;
  omborQayerga: string;
  miqdor: string;        // numeric string
  nds: string;           // like "12%"
  narxNdsBilan: string;  // numeric string
  sana: string;
  tolovTuri: string;
  status: Status;
};

type FieldKey =
  | "tovarId"
  | "omborQattan"
  | "omborQayerga"
  | "miqdor"
  | "nds"
  | "narxNdsBilan"
  | "tolovTuri"
  | "sana"
  | "status";

const initialForm: SotuvForm = {
  tovarId: "",
  omborQattan: "",
  omborQayerga: "",
  miqdor: "",
  nds: "",
  narxNdsBilan: "",
  sana: "",
  tolovTuri: "",
  status: "pending",
};

const LS_TOVAR = "inv_tovar_options_v1";
const LS_OMBOR = "inv_ombor_options_v1";
const LS_TT = "inv_tolov_options_v1";
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
const isNdsPercent = (s: string) => /^\s*\d{1,2}\s*%\s*$/.test(s);
const normalizeNds = (s: string) => s.replace(/\s+/g, "");

const makeId = () => `${Date.now()}_${Math.random().toString(16).slice(2)}`;

function getLabel(list: Option[], value: string) {
  return list.find((x) => x.value === value)?.label || value;
}

function MiniModal({
  title,
  placeholder,
  open,
  onClose,
  onSubmit,
}: {
  title: string;
  placeholder: string;
  open: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
}) {
  const [name, setName] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-[420px] max-w-[92vw] rounded-2xl bg-white shadow-2xl p-5">
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold text-slate-900">{title}</div>
          <button
            className="h-9 w-9 rounded-xl border hover:bg-slate-50 flex items-center justify-center"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4">
          <Input
            className="h-11 rounded-xl"
            placeholder={placeholder}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <Button variant="outline" className="rounded-xl" onClick={onClose}>
            Bekor
          </Button>
          <Button
            className="rounded-xl bg-[#334F9D] text-white"
            onClick={() => {
              const v = name.trim();
              if (!v) return;
              onSubmit(v);
              setName("");
              onClose();
            }}
          >
            Qo‘shish
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function ProductQoshishPage() {
  const navigate = useNavigate();

  // ✅ demo backenddan kelgandek
  const demoTovarlar: Option[] = [
    { value: "101", label: "Tarelka (25sm) — 100 dona" },
    { value: "102", label: "Vilka — plastik (qora)" },
    { value: "103", label: "Stakan 200ml — shaffof" },
    { value: "104", label: "Paket — katta" },
  ];
  const demoOmborlar: Option[] = [
    { value: "A", label: "A — Asosiy ombor" },
    { value: "B", label: "B — Sklad" },
    { value: "C", label: "C — Sex ombori" },
  ];
  const demoTolov: Option[] = [
    { value: "cash", label: "Naqd" },
    { value: "bank", label: "Bank" },
    { value: "card", label: "Karta" },
  ];

  // ✅ options localStorage bilan
  const [tovarlar, setTovarlar] = useState<Option[]>(
    () => lsGet<Option[]>(LS_TOVAR, demoTovarlar)
  );
  const [omborlar, setOmborlar] = useState<Option[]>(
    () => lsGet<Option[]>(LS_OMBOR, demoOmborlar)
  );
  const [tolovTurlari] = useState<Option[]>(
    () => lsGet<Option[]>(LS_TT, demoTolov)
  );

  const [form, setForm] = useState<SotuvForm>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});

  // modals
  const [addTovarOpen, setAddTovarOpen] = useState(false);
  const [addOmborFromOpen, setAddOmborFromOpen] = useState(false);
  const [addOmborToOpen, setAddOmborToOpen] = useState(false);

  const required: Partial<Record<FieldKey, string>> = {
    tovarId: "Tovar tanlang",
    omborQattan: "Shtab qattan tanlang",
    omborQayerga: "Shtab qayerga tanlang",
    miqdor: "Miqdorni kiriting",
    nds: "NDS foizini kiriting (masalan: 12%)",
    narxNdsBilan: "Narxni kiriting",
    tolovTuri: "To‘lov turini tanlang",
    sana: "Sanani tanlang",
    status: "Status tanlang",
  };

  const validate = (data: SotuvForm) => {
    const e: Partial<Record<FieldKey, string>> = {};

    (Object.keys(required) as FieldKey[]).forEach((k) => {
      const v = data[k] as any;
      if (typeof v === "string") {
        if (!v.trim()) e[k] = required[k]!;
      } else {
        if (!v) e[k] = required[k]!;
      }
    });

    if (data.miqdor.trim() && !isDigits(data.miqdor)) e.miqdor = "Faqat raqam kiriting";
    if (data.narxNdsBilan.trim() && !isDigits(data.narxNdsBilan))
      e.narxNdsBilan = "Faqat raqam kiriting";
    if (data.nds.trim() && !isNdsPercent(data.nds))
      e.nds = "NDS foizi % bilan bo‘lsin (masalan: 12%)";

    return e;
  };

  const currentValidation = useMemo(() => validate(form), [form]);
  const isValid = useMemo(() => Object.keys(currentValidation).length === 0, [currentValidation]);

  const update = (key: keyof SotuvForm, value: any) => {
    setForm((p) => ({ ...p, [key]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete (next as any)[key];
      return next;
    });
  };

  const onNumericChange =
    (key: "miqdor" | "narxNdsBilan") =>
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

  const onNdsChange = (raw: string) => {
    update("nds", raw);
    if (!raw.trim()) {
      setErrors((p) => ({ ...p, nds: required.nds! }));
      return;
    }
    if (!isNdsPercent(raw)) setErrors((p) => ({ ...p, nds: "NDS foizi % bilan bo‘lsin (masalan: 12%)" }));
    else
      setErrors((p) => {
        const n = { ...p };
        delete n.nds;
        return n;
      });
  };

  const reset = () => {
    setForm(initialForm);
    setErrors({});
    setSubmitting(false);
  };

  // ✅ style
  const inputBase = "h-11 rounded-xl bg-white/95 border shadow-sm focus-visible:ring-0";
  const okBorder = "border-white/60 focus-visible:border-white";
  const errBorder = "border-[#FF6B6B] ring-2 ring-[#FF6B6B]/25";
  const selectContentClass =
    "z-[9999] bg-white text-slate-900 border border-slate-200 shadow-2xl rounded-xl";

  const triggerClass = (k: FieldKey) =>
    `${inputBase} ${errors[k] ? errBorder : okBorder} text-slate-900`;

  const errorText = (k: FieldKey) =>
    errors[k] ? <div className="mt-2 text-xs font-semibold text-[#FFE2E2]">{errors[k]}</div> : null;

  const addOption = (key: "tovar" | "ombor", label: string) => {
    const opt: Option = { value: makeId(), label };
    if (key === "tovar") {
      const next = [opt, ...tovarlar];
      setTovarlar(next);
      lsSet(LS_TOVAR, next);
      update("tovarId", opt.value);
      return;
    }
    const next = [opt, ...omborlar];
    setOmborlar(next);
    lsSet(LS_OMBOR, next);
  };

  const onSubmit = async () => {
    const e = validate({ ...form, nds: normalizeNds(form.nds) });
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }

    try {
      setSubmitting(true);

      const rows = lsGet<any[]>(LS_ROWS, []);

      const payload = {
        id: makeId(),
        kind: "product",
        tovarId: form.tovarId,
        omborQattan: form.omborQattan,
        omborQayerga: form.omborQayerga,
        tolovTuri: form.tolovTuri,
        miqdor: form.miqdor,
        nds: normalizeNds(form.nds),
        narxNdsBilan: form.narxNdsBilan,
        sana: form.sana,
        status: form.status,

        // jadvalda ko‘rsatish uchun
        title: getLabel(tovarlar, form.tovarId),
        narx: form.narxNdsBilan,
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
        {/* top right tabs (screenshotdagidek) */}


        <div className="rounded-[28px] bg-white/10 backdrop-blur-xl border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.25)] overflow-hidden">
          <div className="px-10 py-10 text-white">
            <div className="text-4xl font-bold tracking-tight">Product qo‘shish</div>
            <div className="mt-2 text-white/85">
              Tovar, ombor, miqdor va to‘lov ma’lumotlarini kiriting
            </div>
          </div>

          <div className="bg-white/10 border-t border-white/15 px-10 py-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* TOVAR + */}
              <div className="min-w-0">
                <div className="text-sm font-semibold mb-2 text-white/90">Tovar</div>
                <div className="flex gap-2">
                  <div className="min-w-0 flex-1">
                    <Select value={form.tovarId} onValueChange={(v) => update("tovarId", v)}>
                      <SelectTrigger className={`${triggerClass("tovarId")} relative z-10`}>
                        <SelectValue placeholder="Tovar tanlang" />
                      </SelectTrigger>
                      <SelectContent className={selectContentClass}>
                        {tovarlar.map((o) => (
                          <SelectItem key={o.value} value={o.value}>
                            {o.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errorText("tovarId")}
                  </div>

                  <button
                    type="button"
                    title="Yangi tovar qo‘shish"
                    onClick={() => setAddTovarOpen(true)}
                    className={`h-11 w-11 shrink-0 rounded-xl border ${
                      errors.tovarId ? "border-[#FF6B6B]" : "border-white/60"
                    } bg-white/95 hover:bg-white transition flex items-center justify-center`}
                  >
                    <Plus className="w-5 h-5 text-slate-900" />
                  </button>
                </div>
              </div>

              {/* SHTAB QATTAN + */}
              <div className="min-w-0">
                <div className="text-sm font-semibold mb-2 text-white/90">Shtab qattan</div>
                <div className="flex gap-2">
                  <div className="min-w-0 flex-1">
                    <Select value={form.omborQattan} onValueChange={(v) => update("omborQattan", v)}>
                      <SelectTrigger className={`${triggerClass("omborQattan")} relative z-10`}>
                        <SelectValue placeholder="Ombor tanlang" />
                      </SelectTrigger>
                      <SelectContent className={selectContentClass}>
                        {omborlar.map((o) => (
                          <SelectItem key={o.value} value={o.value}>
                            {o.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errorText("omborQattan")}
                  </div>

                  <button
                    type="button"
                    title="Yangi shtab qo‘shish"
                    onClick={() => setAddOmborFromOpen(true)}
                    className={`h-11 w-11 shrink-0 rounded-xl border ${
                      errors.omborQattan ? "border-[#FF6B6B]" : "border-white/60"
                    } bg-white/95 hover:bg-white transition flex items-center justify-center`}
                  >
                    <Plus className="w-5 h-5 text-slate-900" />
                  </button>
                </div>
              </div>

              {/* SHTAB QAYERGA + */}
              <div className="min-w-0">
                <div className="text-sm font-semibold mb-2 text-white/90">Shtab qayerga</div>
                <div className="flex gap-2">
                  <div className="min-w-0 flex-1">
                    <Select value={form.omborQayerga} onValueChange={(v) => update("omborQayerga", v)}>
                      <SelectTrigger className={`${triggerClass("omborQayerga")} relative z-10`}>
                        <SelectValue placeholder="Ombor tanlang" />
                      </SelectTrigger>
                      <SelectContent className={selectContentClass}>
                        {omborlar.map((o) => (
                          <SelectItem key={o.value} value={o.value}>
                            {o.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errorText("omborQayerga")}
                  </div>

                  <button
                    type="button"
                    title="Yangi shtab qo‘shish"
                    onClick={() => setAddOmborToOpen(true)}
                    className={`h-11 w-11 shrink-0 rounded-xl border ${
                      errors.omborQayerga ? "border-[#FF6B6B]" : "border-white/60"
                    } bg-white/95 hover:bg-white transition flex items-center justify-center`}
                  >
                    <Plus className="w-5 h-5 text-slate-900" />
                  </button>
                </div>
              </div>

              {/* TOLOV */}
              <div className="min-w-0">
                <div className="text-sm font-semibold mb-2 text-white/90">To‘lov turi</div>
                <Select value={form.tolovTuri} onValueChange={(v) => update("tolovTuri", v)}>
                  <SelectTrigger className={`${triggerClass("tolovTuri")} relative z-10`}>
                    <SelectValue placeholder="To‘lov tanlang" />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    {tolovTurlari.map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errorText("tolovTuri")}
              </div>

              {/* MIQDOR */}
              <div className="min-w-0">
                <div className="text-sm font-semibold mb-2 text-white/90">Miqdori</div>
                <Input
                  className={`${inputBase} ${errors.miqdor ? errBorder : okBorder} text-slate-900`}
                  inputMode="numeric"
                  placeholder="Masalan: 8000"
                  value={form.miqdor}
                  onChange={(e) => onNumericChange("miqdor")(e.target.value)}
                />
                {errorText("miqdor")}
              </div>

              {/* NDS */}
              <div className="min-w-0">
                <div className="text-sm font-semibold mb-2 text-white/90">NDS foizi</div>
                <Input
                  className={`${inputBase} ${errors.nds ? errBorder : okBorder} text-slate-900`}
                  inputMode="text"
                  placeholder="Masalan: 12%"
                  value={form.nds}
                  onChange={(e) => onNdsChange(e.target.value)}
                />
                {errorText("nds")}
              </div>

              {/* NARX */}
              <div className="min-w-0">
                <div className="text-sm font-semibold mb-2 text-white/90">Narxi (NDS bilan)</div>
                <Input
                  className={`${inputBase} ${errors.narxNdsBilan ? errBorder : okBorder} text-slate-900`}
                  inputMode="numeric"
                  placeholder="Masalan: 150000"
                  value={form.narxNdsBilan}
                  onChange={(e) => onNumericChange("narxNdsBilan")(e.target.value)}
                />
                {errorText("narxNdsBilan")}
              </div>

              {/* SANA */}
              <div className="min-w-0">
                <div className="text-sm font-semibold mb-2 text-white/90">Sanasi</div>
                <Input
                  className={`${inputBase} ${errors.sana ? errBorder : okBorder} text-slate-900`}
                  type="date"
                  value={form.sana}
                  onChange={(e) => update("sana", e.target.value)}
                />
                {errorText("sana")}
              </div>

              {/* STATUS */}
              <div className="min-w-0 md:col-span-2">
                <div className="text-sm font-semibold mb-2 text-white/90">Status</div>
                <Select value={form.status} onValueChange={(v: Status) => update("status", v)}>
                  <SelectTrigger className={`${triggerClass("status")} relative z-10`}>
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
                className={`rounded-xl text-white ${
                  !isValid || submitting
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

      {/* MODALS */}
      <MiniModal
        open={addTovarOpen}
        onClose={() => setAddTovarOpen(false)}
        title="Yangi tovar qo‘shish"
        placeholder="Masalan: Qoshiq — yog‘och"
        onSubmit={(name) => addOption("tovar", name)}
      />

      <MiniModal
        open={addOmborFromOpen}
        onClose={() => setAddOmborFromOpen(false)}
        title="Yangi shtab qo‘shish"
        placeholder="Masalan: D — Yangi ombor"
        onSubmit={(name) => {
          addOption("ombor", name);
          // o‘sha yangi qo‘shilganni tanlatib qo‘yamiz
          const last = lsGet<Option[]>(LS_OMBOR, omborlar);
          update("omborQattan", last[0]?.value || "");
        }}
      />

      <MiniModal
        open={addOmborToOpen}
        onClose={() => setAddOmborToOpen(false)}
        title="Yangi shtab qo‘shish"
        placeholder="Masalan: E — Yangi sex"
        onSubmit={(name) => {
          addOption("ombor", name);
          const last = lsGet<Option[]>(LS_OMBOR, omborlar);
          update("omborQayerga", last[0]?.value || "");
        }}
      />
    </div>
  );
}