import { useEffect, useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const loginSchema = z.object({
  username: z.string().min(5, "Username kamida 5 ta harf bo‘lsin"),
  password: z
    .string()
    .min(8, "Password kamida 8 ta harf yoki sondan iborat bo‘lsin"),
})

type LoginValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const vantaRef = useRef<HTMLDivElement | null>(null)
  const vantaEffectRef = useRef<any>(null)

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  })

  const { register, handleSubmit, formState } = form
  const { errors } = formState

  // ===== VANTA =====
  useEffect(() => {
    const threeScript = document.createElement("script")
    threeScript.src =
      "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
    threeScript.async = true

    const vantaScript = document.createElement("script")
    vantaScript.src =
      "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.waves.min.js"
    vantaScript.async = true

    document.body.appendChild(threeScript)
    document.body.appendChild(vantaScript)

    vantaScript.onload = () => {
      // @ts-ignore
      if (window.VANTA && vantaRef.current && !vantaEffectRef.current) {
        // @ts-ignore
        vantaEffectRef.current = window.VANTA.WAVES({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          scale: 1,
          scaleMobile: 1,
          color: 0x14add6,
          backgroundColor: 0x384295,
          highlightColor: 0x14add6,
          shininess: 95,
          waveHeight: 20.5,
          waveSpeed: 1.2,
          zoom: 1.08,
        })
      }
    }

    return () => {
      vantaEffectRef.current?.destroy?.()
      if (document.body.contains(threeScript)) document.body.removeChild(threeScript)
      if (document.body.contains(vantaScript)) document.body.removeChild(vantaScript)
    }
  }, [])

  // ===== LOGIN =====
  const onSubmit = async (values: LoginValues) => {
    setLoading(true)

    const CORRECT_USERNAME = "admin"
    const CORRECT_PASSWORD = "admin123"

    await new Promise((r) => setTimeout(r, 600))

    if (values.username === CORRECT_USERNAME && values.password === CORRECT_PASSWORD) {
      toast.success("Login tasdiqlandi ✅")
      localStorage.setItem("erp_auth", "true")
      navigate("/dashboard", { replace: true })
    } else {
      toast.error("Login yoki Parol noto‘g‘ri ❌")
    }

    setLoading(false)
  }

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* 3D background */}
      <div ref={vantaRef} className="absolute inset-0 -z-10" />

      {/* Premium overlay */}
      <div className="absolute inset-0 -z-9 bg-gradient-to-r from-[#14ADD6]/50 to-[#384295]/70 backdrop-blur-[2px]" />

      <div className="min-h-screen w-full flex items-center justify-center px-4 py-10">
        <div
          className="
            relative w-full max-w-[900px]
            rounded-[32px] sm:rounded-[50px]
            bg-white/10 backdrop-blur-md shadow-lg
            overflow-hidden
          "
        >
          {/* ichki wrapper */}
          <div className="relative flex flex-col md:flex-row items-stretch md:items-center min-h-[560px] md:min-h-[600px]">
            {/* FORM SIDE */}
            <div className="relative z-10 flex-1 flex items-center justify-center p-6 sm:p-10 md:p-14">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-[360px] flex flex-col text-white gap-4 items-center"
              >
                <h1 className="font-serif text-white text-xl sm:text-2xl md:text-3xl mb-2 text-center">
                  ERP tizimiga Xush kelibsiz
                </h1>

                <div className="w-full">
                  <Input
                    className="border pl-5 rounded-[24px] h-11 w-full bg-white/10 text-white placeholder:text-white/60"
                    placeholder="Username"
                    {...register("username")}
                  />
                  {errors.username && (
                    <p className="text-[13px] text-[#FFE2AF] mt-1">
                      {errors.username.message}
                    </p>
                  )}
                </div>

                <div className="w-full">
                  <Input
                    type="password"
                    className="border pl-5 rounded-[24px] h-11 w-full bg-white/10 text-white placeholder:text-white/60"
                    placeholder="Password"
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="text-[13px] text-[#FFE2AF] mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <button
                  disabled={loading}
                  className="mt-3 w-full h-11 rounded-[24px] bg-gradient-to-r from-[#079dc7] to-[#0b1cb8] text-white font-medium disabled:opacity-60"
                >
                  {loading ? "Kutilmoqda..." : "Login"}
                </button>
              </form>
            </div>

            {/* RIGHT DECOR SIDE */}
            {/* RIGHT DECOR SIDE */}
            <div className="relative md:w-[420px] md:p-0 hidden md:block">
              <div
                className="
              absolute right-6 top-1/2 -translate-y-1/2
              h-[570px] w-[400px]
              rounded-[50px]
            bg-blue-500/90"
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
