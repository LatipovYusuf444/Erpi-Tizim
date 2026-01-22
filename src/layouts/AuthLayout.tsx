import { Outlet } from "react-router-dom"
import { useEffect, useRef } from "react"

function loadScriptOnce(src: string, id: string) {
  return new Promise<void>((resolve, reject) => {
    const existing = document.getElementById(id) as HTMLScriptElement | null
    if (existing) {
      // oldin yuklangan bo‘lsa
      if ((existing as any)._loaded) return resolve()
      existing.addEventListener("load", () => resolve(), { once: true })
      existing.addEventListener("error", () => reject(), { once: true })
      return
    }

    const s = document.createElement("script")
    s.id = id
    s.src = src
    s.async = true

    s.addEventListener(
      "load",
      () => {
        ; (s as any)._loaded = true
        resolve()
      },
      { once: true }
    )
    s.addEventListener("error", () => reject(), { once: true })

    document.body.appendChild(s)
  })
}

export default function AuthLayout() {
  const vantaRef = useRef<HTMLDivElement | null>(null)
  const vantaEffectRef = useRef<any>(null)

  useEffect(() => {
    let cancelled = false

    const init = async () => {
      // ✅ 1) Ikkalasi ham tayyor bo‘lsin
      await loadScriptOnce(
        "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js",
        "three-r134"
      )
      await loadScriptOnce(
        "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.waves.min.js",
        "vanta-waves"
      )

      if (cancelled) return
      if (!vantaRef.current) return

      // ✅ 2) Oldingi effect bo‘lsa destroy qilib qayta init
      vantaEffectRef.current?.destroy?.()
      vantaEffectRef.current = null

      // @ts-ignore
      if (window.VANTA) {
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

    init().catch(() => { })

    return () => {
      cancelled = true
      // ✅ scriptlarni O‘CHIRMAYMIZ
      // faqat effectni tozalaymiz
      vantaEffectRef.current?.destroy?.()
      vantaEffectRef.current = null
    }
  }, [])

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div ref={vantaRef} className="absolute inset-0 -z-10" />

      <div className="absolute inset-0 -z-9 bg-gradient-to-r from-[#14ADD6]/20 to-[#384295]/70 backdrop-blur-[10px]" />

      <div className="relative z-10 min-h-screen w-full">
        <Outlet />
      </div>
    </div>
  )
}
