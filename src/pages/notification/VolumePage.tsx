import { useEffect, useState } from "react"
import { getVolume, resetLowVolumeNotificationFlag, setVolume } from "@/lib/volume-store"
import { Link } from "react-router-dom"

export default function VolumePage() {
  const [volume, setVol] = useState(70)

  useEffect(() => {
    setVol(getVolume())
  }, [])

  return (
    <div className="p-8">
        <Link   to="/notifications" className=" text-[18px] bg-[#6049E3] text-white px-3 py-1 rounded-3xl font-semibold mb-4 inline-block">
            Notifications
        </Link> 
      <div className="rounded-2xl border border-[#6049E3] bg-[#EBF0FA] p-6 max-w-180">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">Volume</h1>
          <div className="text-sm font-semibold tabular-nums">
            {volume}%
          </div>
        </div>

        <div className="mt-6">
          <input
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={(e) => {
              const v = Number(e.target.value)
              setVol(v)

              // agar 30 dan yuqoriga qaytsa, keyin yana pastga tushganda yana notification bersin
              if (v > 30) resetLowVolumeNotificationFlag()

              setVolume(v)
            }}
            className="w-full"
          />

          <p className="mt-3 text-sm text-slate-600">
            Agar volume 30% yoki pastga tushsa Notification sahifasiga xabar qo‘shiladi.
          </p>
        </div>
      </div>
    </div>
  )
}
