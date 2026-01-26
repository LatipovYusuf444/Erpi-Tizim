export type AppNotification = {
  id: string
  title: string
  message: string
  createdAt: string
}

const KEY = "app:notifications"

export function getNotifications(): AppNotification[] {
  const raw = localStorage.getItem(KEY)
  if (!raw) return []
  try {
    const arr = JSON.parse(raw) as AppNotification[]
    return Array.isArray(arr) ? arr : []
  } catch {
    return []
  }
}

export function addNotification(n: Omit<AppNotification, "id" | "createdAt">) {
  const list = getNotifications()
  const item: AppNotification = {
    id: crypto.randomUUID?.() ?? String(Date.now()),
    title: n.title,
    message: n.message,
    createdAt: new Date().toISOString(),
  }
  localStorage.setItem(KEY, JSON.stringify([item, ...list]))
  window.dispatchEvent(new CustomEvent("app:notifications_changed"))
}

export function clearNotifications() {
  localStorage.removeItem(KEY)
  window.dispatchEvent(new CustomEvent("app:notifications_changed"))
}
