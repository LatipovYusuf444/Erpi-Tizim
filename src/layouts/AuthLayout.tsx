import { Outlet } from "react-router-dom"
import { useEffect, useRef } from "react"

export default function AuthLayout() {
  const vantaRef = useRef<HTMLDivElement | null>(null)
  const vantaEffectRef = useRef<any>(null)

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

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* 3D background */}
      <div ref={vantaRef} className="absolute inset-0 -z-10" />

      {/* Premium overlay */}
      <div className="absolute inset-0 -z-9 bg-gradient-to-r from-[#14ADD6]/20 to-[#384295]/70 backdrop-blur-[10px]" />

      {/* Auth pages */}
      <div className="relative z-10 min-h-screen w-full">
        <Outlet />
      </div>
    </div>
  )
}
