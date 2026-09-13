export type AuthUser = {
  id: string
  username: string
  email: string
  isSuperAdmin: boolean
}

export type LoginInput = {
  username: string
  password: string
}

export type LoginResult = {
  ok: boolean
  message: string
  user: AuthUser | null
}
