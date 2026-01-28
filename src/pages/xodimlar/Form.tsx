import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Gender = "ayol" | "erkak"
type Role = "operator" | "manager" | "admin"
type Branch = "yunusobod" | "chilonzor" | "sergeli" | "andijon"

type EmployeePayload = {
  full_name: string
  passport_serial: string
  email: string
  phone: string
  extra_phone: string
  gender: Gender
  role: Role
  branch: Branch
  employee_id: string
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const genId = () => String(Math.floor(10000000 + Math.random() * 90000000))

// telefonni "998 99 123 45 67" ko‘rinishga keltirish (oddiy)
function formatUZPhone(v: string) {
  const digits = v.replace(/\D/g, "").slice(0, 12) // 998XXXXXXXXX
  if (!digits) return ""
  const parts = [
    digits.slice(0, 3), // 998
    digits.slice(3, 5), // 99
    digits.slice(5, 8), // 123
    digits.slice(8, 10), // 45
    digits.slice(10, 12), // 67
  ].filter(Boolean)
  return parts.join(" ")
}

export default function Form() {
  const navigate = useNavigate()

  const [form, setForm] = useState<EmployeePayload>({
    full_name: "",
    passport_serial: "",
    email: "",
    phone: "",
    extra_phone: "",
    gender: "ayol",
    role: "operator",
    branch: "yunusobod",
    employee_id: genId(),
  })

  const errors = useMemo(() => {
    const e: Partial<Record<keyof EmployeePayload, string>> = {}

    if (!form.full_name.trim()) e.full_name = "Ism majburiy"
    else if (form.full_name.trim().length < 3) e.full_name = "Kamida 3 ta belgi"

    if (!form.passport_serial.trim()) e.passport_serial = "Passport majburiy"
    else if (form.passport_serial.trim().length < 5) e.passport_serial = "Noto‘g‘ri format"

    if (!form.email.trim()) e.email = "Email majburiy"
    else if (!emailRegex.test(form.email.trim())) e.email = "Email noto‘g‘ri"

    const phoneDigits = form.phone.replace(/\D/g, "")
    if (!phoneDigits) e.phone = "Telefon majburiy"
    else if (phoneDigits.length < 12) e.phone = "Telefon to‘liq emas (998...)"

    const extraDigits = form.extra_phone.replace(/\D/g, "")
    if (form.extra_phone.trim() && extraDigits.length < 12) {
      e.extra_phone = "Qo‘shimcha telefon to‘liq emas"
    }

    return e
  }, [form])

  const hasErrors = Object.keys(errors).length > 0

  const set =
    <K extends keyof EmployeePayload>(k: K) =>
    (v: EmployeePayload[K]) =>
      setForm((p) => ({ ...p, [k]: v }))

  const onChangeInput =
    (k: keyof EmployeePayload) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value

      if (k === "phone" || k === "extra_phone") {
        setForm((p) => ({ ...p, [k]: formatUZPhone(val) }))
        return
      }

      setForm((p) => ({ ...p, [k]: val }))
    }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (hasErrors) {
      toast.error("Formani to‘g‘ri to‘ldiring")
      return
    }

    // ✅ Backendga ulashga tayyor joy:
    // 1) payloadni tayyorlaymiz (telefonni faqat raqamga aylantirib yuborish yaxshi)
    const payload = {
      ...form,
      phone: form.phone.replace(/\D/g, ""),
      extra_phone: form.extra_phone.replace(/\D/g, ""),
    }

    console.log("SEND TO API:", payload)

    // 2) Keyin shu yerda fetch/axios:
    // await api.post("/employees/", payload)

    toast.success("Xodim qo‘shildi ✅")
    navigate("/xodimlar", { replace: true })
  }

  return (
    <div className="min-h-[calc(100vh-2rem)] px-6 py-10">
      <div className="max-w-[980px] mx-auto">
        <form
          onSubmit={onSubmit}
          className="rounded-3xl bg-white/60 backdrop-blur-xl p-6 md:p-8
                     shadow-[0_22px_70px_-40px_rgba(2,6,23,0.35)]"
        >
          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
            <Field label="Ism" error={errors.full_name}>
              <Input
                value={form.full_name}
                onChange={onChangeInput("full_name")}
                placeholder="Ism Familiya..."
                className={inputLuxury(!!errors.full_name)}
              />
            </Field>

            <Field label="Pasport seriyasi" error={errors.passport_serial}>
              <Input
                value={form.passport_serial}
                onChange={onChangeInput("passport_serial")}
                placeholder="AD06240624"
                className={inputLuxury(!!errors.passport_serial)}
              />
            </Field>

            <Field label="Email manzil" error={errors.email}>
              <Input
                value={form.email}
                onChange={onChangeInput("email")}
                placeholder="Email@nomi.com"
                className={inputLuxury(!!errors.email)}
              />
            </Field>

            <Field label="Telefon raqami" error={errors.phone}>
              <Input
                value={form.phone}
                onChange={onChangeInput("phone")}
                placeholder="998 99 123 45 67"
                className={inputLuxury(!!errors.phone)}
              />
            </Field>

            <Field label="Jinsi">
              <Select value={form.gender} onValueChange={(v) => set("gender")(v as Gender)}>
                <SelectTrigger className={selectLuxury()}>
                  <SelectValue placeholder="Tanlang" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ayol">Ayol</SelectItem>
                  <SelectItem value="erkak">Erkak</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <Field label="Qo‘shimcha raqam" error={errors.extra_phone}>
              <Input
                value={form.extra_phone}
                onChange={onChangeInput("extra_phone")}
                placeholder="998 90 123 45 67"
                className={inputLuxury(!!errors.extra_phone)}
              />
            </Field>

            <Field label="Lavozimi">
              <Select value={form.role} onValueChange={(v) => set("role")(v as Role)}>
                <SelectTrigger className={selectLuxury()}>
                  <SelectValue placeholder="Tanlang" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="operator">Operator</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <Field label="Filial">
              <Select value={form.branch} onValueChange={(v) => set("branch")(v as Branch)}>
                <SelectTrigger className={selectLuxury()}>
                  <SelectValue placeholder="Tanlang" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yunusobod">Yunusobod</SelectItem>
                  <SelectItem value="chilonzor">Chilonzor</SelectItem>
                  <SelectItem value="sergeli">Sergeli</SelectItem>
                  <SelectItem value="andijon">Andijon</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <Field label="Xodim ID">
              <Input
                value={form.employee_id}
                readOnly
                className="h-12 rounded-xl bg-slate-100 border-slate-200 text-center text-slate-700"
              />
            </Field>

            {/* bo‘sh joy (rasmda o‘ng tomonda ko‘rinish uchun) */}
            <div className="hidden md:block" />
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col md:flex-row gap-3 md:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/xodimlar")}
              className="h-12 rounded-xl"
            >
              Orqaga
            </Button>

            <Button
              type="submit"
              disabled={hasErrors}
              className={[
                "h-12 rounded-xl text-white",
                "bg-[#2187BF] hover:bg-[#1b6f9d]",
                hasErrors ? "opacity-60 cursor-not-allowed" : "",
              ].join(" ")}
            >
              Saqlash
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

/* ---------------- UI helpers ---------------- */

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <div className="mb-2 text-sm font-medium text-slate-800">{label}</div>
      {children}
      {error ? <div className="mt-2 text-xs text-red-500">{error}</div> : null}
    </div>
  )
}

function inputLuxury(isError: boolean) {
  return [
    "h-12 rounded-xl",
    "bg-[#F6F7FB]",
    "border",
    isError ? "border-red-400" : "border-slate-200",
    "focus-visible:ring-2 focus-visible:ring-sky-400/30",
    "focus-visible:ring-offset-0",
  ].join(" ")
}

function selectLuxury() {
  return [
    "h-12 rounded-xl",
    "bg-[#F6F7FB]",
    "border border-slate-200",
    "focus:ring-2 focus:ring-sky-400/30",
  ].join(" ")
}
