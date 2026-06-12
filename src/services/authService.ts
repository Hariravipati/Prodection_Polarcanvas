import ApiClient from './apiClient'

const authBase =
  import.meta.env.VITE_AUTH_BASE || 'http://40.192.63.90:3002'

const authClient = new ApiClient(authBase)

const decodeJwtPayload = (token: string) => {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`)
        .join('')
    )
    return JSON.parse(jsonPayload)
  } catch {
    return null
  }
}

const extractJwtToken = (res: any) =>
  res?.token ||
  res?.accessToken ||
  res?.access_token ||
  res?.jwt ||
  res?.authorization ||
  res?.bearerToken ||
  res?.data?.token ||
  res?.data?.accessToken ||
  res?.data?.access_token ||
  res?.data?.jwt ||
  res?.Data?.Token ||
  res?.Data?.AccessToken ||
  res?.result?.token ||
  res?.result?.accessToken ||
  res?.result?.access_token

export const saveAuthToken = (token: string) => {
  localStorage.setItem('authToken', token)
  localStorage.setItem('token', token)
}

export const clearAuthSession = () => {
  localStorage.removeItem('authToken')
  localStorage.removeItem('token')
  localStorage.removeItem('accessToken')
  localStorage.removeItem('user')
  sessionStorage.clear()

  document.cookie.split(';').forEach((cookie) => {
    const eqPos = cookie.indexOf('=')
    const name = eqPos > -1 ? cookie.slice(0, eqPos).trim() : cookie.trim()
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
  })
}

export const isAuthenticated = () => {
  const token = localStorage.getItem('authToken') || localStorage.getItem('token')
  if (!token) return false

  const payload = decodeJwtPayload(token)
  if (!payload?.exp) return true

  return Number(payload.exp) * 1000 > Date.now()
}

export const loginAdmin = (identifier: string, password: string) =>
  authClient
    .post(
      '/auth/login',
      { username: identifier, password },
      { headers: { 'Content-Type': 'application/json' } }
    )
    .then((res) => {
      const token = extractJwtToken(res)
      if (token) saveAuthToken(token)
      return token
    })

export default { loginAdmin, saveAuthToken, clearAuthSession, isAuthenticated }
