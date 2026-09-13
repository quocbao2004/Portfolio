import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'

function Router() {
  if (window.location.pathname === '/login') {
    return <LoginPage />
  }

  return <HomePage />
}

export default Router
