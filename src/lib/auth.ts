export const AUTH_KEY = "erp_auth"

export function isAuthenticated(): boolean {
  return localStorage.getItem(AUTH_KEY) === "true"
}

export function loginSuccess() {
  localStorage.setItem(AUTH_KEY, "true")
}

export function logout() {
  localStorage.removeItem(AUTH_KEY)
}
