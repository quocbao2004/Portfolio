import { useState, type FormEvent } from 'react'

import PortfolioHeader from '../components/layout/PortfolioHeader'
import { Button, TextField } from '../components/ui'
import useLogin from '../hooks/useLogin'

function LoginPage() {
  const { error, isLoading, login, message } = useLogin()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const result = await login({ username, password })

    if (result.ok) {
      window.location.href = '/'
    }
  }

  return (
    <div className="login-page">
      <PortfolioHeader />
      <main className="login-content">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-heading">
            <p>Super Admin Access</p>
            <h1>Login</h1>
          </div>

          <TextField
            label="Username"
            type="text"
            name="username"
            placeholder="super admin"
            autoComplete="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          {error ? <p className="form-message form-message-error">{error}</p> : null}
          {message ? <p className="form-message form-message-success">{message}</p> : null}

          <Button type="submit" fullWidth disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </main>
    </div>
  )
}

export default LoginPage
