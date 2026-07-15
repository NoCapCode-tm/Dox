import { getCurrentUser } from "../api/employeeApi"


export const getAuthSession = () => getCurrentUser()

export const isAuthenticated = () => Boolean(getAuthSession())
