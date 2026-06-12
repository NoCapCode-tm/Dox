const AUTH_SESSION_KEY = 'emp-auth-session'

export const getAuthSession = () => localStorage.getItem(AUTH_SESSION_KEY)

export const isAuthenticated = () => Boolean(getAuthSession())

export const setAuthSession = (value = 'active') => {
    localStorage.setItem(AUTH_SESSION_KEY, value)
}

export const clearAuthSession = () => {
    localStorage.removeItem(AUTH_SESSION_KEY)
}

export { AUTH_SESSION_KEY }