import { useEffect, useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"

import { toast } from "react-toastify"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const loginSchema = z.object({
  username: z.string().min(5, "Username kamida 5 ta harf bo‘lsin"),
  password: z.string().min(8, "Password kamida 8 ta harf yoki sondan iborat bo‘lsin"),
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
      document.body.removeChild(threeScript)
      document.body.removeChild(vantaScript)
    }
  }, [])

  // ===== LOGIN =====
  const onSubmit = async (values: LoginValues) => {
    setLoading(true)

    // ❗ vaqtinchalik to‘g‘ri login
    const CORRECT_USERNAME = "admin"
    const CORRECT_PASSWORD = "admin123"

    await new Promise((r) => setTimeout(r, 600))

    if (
      values.username === CORRECT_USERNAME &&
      values.password === CORRECT_PASSWORD
    ) {
      toast.success("Login tasdiqlandi ✅")

      // auth saqlaymiz
      localStorage.setItem("erp_auth", "true")

      navigate("/dashboard", { replace: true })
    } else {
      toast.error("Login yoki Parol noto‘g‘ri ❌")
    }

    setLoading(false)
  }


  return (
    <div className="relative w-full h-[742px] overflow-hidden">
      {/* 3D background */}
      <div ref={vantaRef} className="absolute inset-0 -z-10" />

      {/* Premium overlay */}
      <div className="absolute inset-0 -z-9 bg-gradient-to-r from-[#14ADD6]/50 to-[#384295]/70 backdrop-blur-[2px]" />

      <div className="flex justify-center items-center h-full">
        <div className="relative w-[900px] h-[600px] bg-white/10 backdrop-blur-md shadow-lg rounded-[50px]">
          <div className="flex -ml-5 items-center w-full h-full px-20">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col text-white gap-4 items-center"
            >
              <h1 className="font-serif text-white text-2xl mb-4">
                ERP tizimiga Xush kelibsiz
              </h1>

              <div className="w-[320px]">
                <Input
                  className="border pl-5 rounded-[24px] h-11"
                  placeholder="Username"
                  {...register("username")}
                />
                {errors.username && (
                  <p className="text-[13px] text-[#FFE2AF] mt-1">
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div className="w-[320px]">
                <Input
                  type="password"
                  className="border pl-5 rounded-[24px] h-11"
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
                className="mt-5 w-[320px] h-11 rounded-[24px] bg-gradient-to-r from-[#079dc7] to-[#0b1cb8]  text-white font-medium disabled:opacity-60"
              >
                {loading ? "Kutilmoqda..." : "Login"}
              </button>
            </form>

            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-[400px] h-[570px] rounded-[50px] bg-blue-500" />
          </div>
        </div>
      </div>
    </div>
  )
}
