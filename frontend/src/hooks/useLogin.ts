import { useState } from 'react'

import { login } from '../services/authService'
import type { AuthUser, LoginInput } from '../types/auth'

type LoginState = {
  user: AuthUser | null
  isLoading: boolean
  error: string
  message: string
}

function useLogin() {
  const [state, setState] = useState<LoginState>({
    user: null,
    isLoading: false,
    error: '',
    message: '',
  })

  async function submitLogin(input: LoginInput) {
    setState((current) => ({
      ...current,
      isLoading: true,
      error: '',
      message: '',
    }))

    try {
      const result = await login(input)

      setState({
        user: result.user,
        isLoading: false,
        error: result.ok ? '' : result.message,
        message: result.ok ? result.message : '',
      })

      return result
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to login.'

      setState({
        user: null,
        isLoading: false,
        error: message,
        message: '',
      })

      return {
        ok: false,
        message,
        user: null,
      }
    }
  }

  return {
    ...state,
    login: submitLogin,
  }
}

export default useLogin
