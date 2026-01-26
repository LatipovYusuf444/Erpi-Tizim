export type VolumePayload = {
  value: number
  prev: number
}

const VOLUME_KEY = "app:volume"
const NOTIFIED_KEY = "app:volume_low_notified" // "1" bo'lsa qayta spam qilmaydi

export function getVolume(): number {
  const raw = localStorage.getItem(VOLUME_KEY)
  const n = raw ? Number(raw) : 70
  return Number.isFinite(n) ? Math.max(0, Math.min(100, n)) : 70
}

export function setVolume(next: number) {
  const prev = getVolume()
  const value = Math.max(0, Math.min(100, Math.round(next)))

  localStorage.setItem(VOLUME_KEY, String(value))
  window.dispatchEvent(new CustomEvent<VolumePayload>("app:volume_changed", { detail: { value, prev } }))
}

export function shouldFireLowVolumeNotification(prev: number, value: number) {
  // faqat yuqoridan pastga o'tganda 1 marta yuboradi
  const already = localStorage.getItem(NOTIFIED_KEY) === "1"
  if (already) return false

  const crossedDown = prev > 30 && value <= 30
  if (!crossedDown) return false

  localStorage.setItem(NOTIFIED_KEY, "1")
  return true
}

export function resetLowVolumeNotificationFlag() {
  localStorage.removeItem(NOTIFIED_KEY)
}
