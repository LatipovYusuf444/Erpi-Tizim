import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

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
  miqdor: string;
  nds: string;
  narxNdsBilan: string;
  sana: string;
  tolovTuri: string;
  status: Status; // ✅ NEW
};

type Props = {
  tovarlar?: Option[];
  omborlar?: Option[];
  tolovTurlari?: Option[];
  redirectTo?: string;
};

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

const getLabel = (list: Option[], value: string) =>
  list.find((x) => x.value === value)?.label || value;

export default function ProductQoshishPage({
  tovarlar = [
    { value: "1", label: "Vilka" },
    { value: "2", label: "Tarelka" },
    { value: "3", label: "Paket" },
  ],
  omborlar = [
    { value: "A", label: "A - Asosiy ombor" },
    { value: "B", label: "B - Sklad" },
    { value: "New Rar", label: "New Rar" },
    { value: "Kill bite", label: "Kill bite" },
  ],
  tolovTurlari = [
    { value: "cash", label: "Naqd" },
    { value: "bank", label: "Bank" },
  ],
  redirectTo = "/ombor/inventarizatsiya",
}: Props) {
  const navigate = useNavigate();

  const [form, setForm] = useState<SotuvForm>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const fieldClass =
    "h-11 rounded-xl bg-white border border-slate-300 focus-visible:ring-0 focus-visible:border-slate-400";
  const selectContentClass =
    "z-[9999] bg-white text-slate-900 border border-slate-200 shadow-2xl rounded-xl";

  const isValid = useMemo(() => {
    return (
      !!form.tovarId &&
      !!form.omborQattan &&
      !!form.omborQayerga &&
      !!form.miqdor &&
      !!form.tolovTuri &&
      !!form.sana &&
      !!form.status
    );
  }, [form]);

  const update = (key: keyof SotuvForm, value: any) => {
    setForm((p) => ({ ...p, [key]: value }));
  };

  const reset = () => {
    setForm(initialForm);
    setError("");
    setSubmitting(false);
  };

  const onSubmit = async () => {
    if (!isValid) {
      setError("Iltimos, majburiy maydonlarni to‘ldiring.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      const payload = {
        ...form,
        tovarLabel: getLabel(tovarlar, form.tovarId),
        omborQattanLabel: getLabel(omborlar, form.omborQattan),
        omborQayergaLabel: getLabel(omborlar, form.omborQayerga),
        tolovTuriLabel: getLabel(tolovTurlari, form.tolovTuri),
      };

      navigate(redirectTo, { state: { productData: payload } });
      reset();
    } catch (e: any) {
      setError(e?.response?.data?.detail || e?.message || "Xatolik yuz berdi");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="px-8 py-6">
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="rounded-3xl p-px bg-linear-to-r from-[#1C96C8] to-[#334F9D] shadow-xl">
          <div className="rounded-3xl bg-white overflow-visible">
            <div className="rounded-t-3xl p-8 bg-linear-to-r from-[#1C96C8] to-[#334F9D] text-white">
              <div className="text-3xl font-semibold">Product qo‘shish</div>
              <div className="text-white/85 text-sm mt-1">
                Tovar, ombor, miqdor va to‘lov ma’lumotlarini kiriting
              </div>
            </div>

            <div className="p-8">
              {error && (
                <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                <Field label="Tovar">
                  <div className="flex gap-2">
                    <Select value={form.tovarId} onValueChange={(v) => update("tovarId", v)}>
                      <SelectTrigger className={`${fieldClass} relative z-10`}>
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

                    <button
                      type="button"
                      title="Inventarizatsiya"
                      onClick={() => navigate("/ombor/inventarizatsiya")}
                      className="h-11 w-11 shrink-0 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 transition flex items-center justify-center"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </Field>

                <Field label="Shtab qattan">
                  <Select value={form.omborQattan} onValueChange={(v) => update("omborQattan", v)}>
                    <SelectTrigger className={`${fieldClass} relative z-10`}>
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
                </Field>

                <Field label="Shtab qayerga">
                  <Select value={form.omborQayerga} onValueChange={(v) => update("omborQayerga", v)}>
                    <SelectTrigger className={`${fieldClass} relative z-10`}>
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
                </Field>

                <Field label="To‘lov turi">
                  <Select value={form.tolovTuri} onValueChange={(v) => update("tolovTuri", v)}>
                    <SelectTrigger className={`${fieldClass} relative z-10`}>
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
                </Field>

                <Field label="Miqdori">
                  <Input
                    className={fieldClass}
                    inputMode="decimal"
                    placeholder="Masalan: 8000"
                    value={form.miqdor}
                    onChange={(e) => update("miqdor", e.target.value)}
                  />
                </Field>

                <Field label="NDS foizi">
                  <Input
                    className={fieldClass}
                    inputMode="decimal"
                    placeholder="Masalan: 12"
                    value={form.nds}
                    onChange={(e) => update("nds", e.target.value)}
                  />
                </Field>

                <Field label="Narxi (NDS bilan)">
                  <Input
                    className={fieldClass}
                    inputMode="decimal"
                    placeholder="Masalan: 150000"
                    value={form.narxNdsBilan}
                    onChange={(e) => update("narxNdsBilan", e.target.value)}
                  />
                </Field>

                <Field label="Sanasi">
                  <Input
                    className={fieldClass}
                    type="date"
                    value={form.sana}
                    onChange={(e) => update("sana", e.target.value)}
                  />
                </Field>

                {/* ✅ STATUS */}
                <Field label="Status">
                  <Select value={form.status} onValueChange={(v: Status) => update("status", v)}>
                    <SelectTrigger className={`${fieldClass} relative z-10`}>
                      <SelectValue placeholder="Status tanlang" />
                    </SelectTrigger>
                    <SelectContent className={selectContentClass}>
                      <SelectItem value="pending">Kutilmoqda</SelectItem>
                      <SelectItem value="sent">Yuborilgan</SelectItem>
                      <SelectItem value="accepted">Qabul qilingan</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              </div>

              <div className="mt-10 flex items-center justify-end gap-3">
                <Button variant="outline" className="rounded-xl" onClick={reset}>
                  Tozalash
                </Button>

                <Button
                  disabled={!isValid || submitting}
                  onClick={onSubmit}
                  className="rounded-xl bg-[#334F9D] text-white hover:opacity-95"
                >
                  {submitting ? "Saqlanmoqda..." : "Saqlash"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <div className="text-sm font-medium text-slate-700 mb-2">{label}</div>
      {children}
    </div>
  );
}