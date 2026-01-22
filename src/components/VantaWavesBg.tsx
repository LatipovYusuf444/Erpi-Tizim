import { useEffect, useRef } from "react"
import * as THREE from "three"
import WAVES from "vanta/dist/vanta.waves.min"

type VantaEffect = { destroy: () => void }

export default function VantaWavesBg() {
  const elRef = useRef<HTMLDivElement | null>(null)
  const effectRef = useRef<VantaEffect | null>(null)

  useEffect(() => {
    if (!elRef.current || effectRef.current) return

    effectRef.current = WAVES({
      el: elRef.current,
      THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200,
      minWidth: 200,
      color: 0x14add6,
      shininess: 95,
      waveHeight: 20.5,
      waveSpeed: 1.2,
      zoom: 1.08,
    })

    return () => {
      effectRef.current?.destroy()
      effectRef.current = null
    }
  }, [])

  return <div ref={elRef} className="absolute inset-0" />
}
