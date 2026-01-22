const ACCESS_KEY = "access_token"
const REFRESH_KEY = "refresh_token"

export function isAuthenticated() {
  return (
    localStorage.getItem("erp_auth") === "true" ||
    !!localStorage.getItem(ACCESS_KEY)
  )
}

export function setTokens(access: string, refresh?: string) {
  localStorage.setItem(ACCESS_KEY, access)
  if (refresh) localStorage.setItem(REFRESH_KEY, refresh)
  localStorage.setItem("erp_auth", "true")
}

export function clearAuth() {
  localStorage.removeItem("erp_auth")
  localStorage.removeItem(ACCESS_KEY)
  localStorage.removeItem(REFRESH_KEY)
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_KEY) || ""
}
