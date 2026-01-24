import { useEffect, useState } from "react"
import { addNotification, clearNotifications, getNotifications, type AppNotification } from "@/lib/notification-store"
import { getVolume, shouldFireLowVolumeNotification } from "@/lib/volume-store"
import { Link } from "react-router-dom"

export default function NotificationPage() {
    const [items, setItems] = useState<AppNotification[]>([])

    const refresh = () => setItems(getNotifications())

    useEffect(() => {
        refresh()

        const onChanged = () => refresh()
        window.addEventListener("app:notifications_changed", onChanged)

        const onVolume = (e: Event) => {
            const ce = e as CustomEvent<{ value: number; prev: number }>
            const { value, prev } = ce.detail

            if (shouldFireLowVolumeNotification(prev, value)) {
                addNotification({
                    title: "Ogohlantirish",
                    message: "Tavar 30 foizdan kam qold",
                })
            }
        }

        window.addEventListener("app:volume_changed", onVolume)

        // sahifa ochilganda ham tekshiradi (masalan avvaldan 30 past bo'lsa)
        const current = getVolume()
        if (current <= 30) {
            // prev ni 31 deb berib crossing kabi ishlatamiz (spam bo'lmasligi uchun flag bor)
            if (shouldFireLowVolumeNotification(31, current)) {
                addNotification({
                    title: "Ogohlantirish",
                    message: "Tavar 30 foizdan kam qold",
                })
            }
        }

        return () => {
            window.removeEventListener("app:notifications_changed", onChanged)
            window.removeEventListener("app:volume_changed", onVolume)
        }
    }, [])

    return (
        <div className="p-8">
            <Link to="/volume" className=" text-[18px] bg-[#6049E3] text-white px-3 py-1 rounded-3xl font-semibold mb-4 inline-block">
                Tovar foizi
            </Link>
            <div className="rounded-2xl border border-[#6049E3] bg-[#EBF0FA] p-6 max-w-full">
                <div className="flex items-center justify-between gap-4">
                    <h1 className="text-2xl font-bold">Notifications</h1>
                    <button
                        onClick={() => clearNotifications()}
                        className="h-10 px-4 rounded-xl bg-[#6049E3] text-white font-semibold"
                    >
                        Tozalash
                    </button>
                </div>

                <div className="mt-6 space-y-3">
                    {items.length === 0 && (
                        <div className="text-sm text-slate-600">
                            Hozircha notification yo‘q.
                        </div>
                    )}

                    {items.map((n) => (
                        <div key={n.id} className="rounded-xl border bg-white/60 p-4">
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <div className="font-semibold">{n.title}</div>
                                    <div className="text-sm text-slate-700 mt-1">{n.message}</div>
                                </div>
                                <div className="text-xs text-slate-500 whitespace-nowrap">
                                    {new Date(n.createdAt).toLocaleString()}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
