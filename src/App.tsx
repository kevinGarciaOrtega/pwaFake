import { useState } from 'react'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'

type Session = { usuario: string } | null

export default function App() {
  const [session, setSession] = useState<Session>(null)

  const handleLogin = (usuario: string) => {
    setSession({ usuario })
  }

  const handleLogout = () => {
    setSession(null)
  }

  if (session) {
    return <HomePage usuario={session.usuario} onLogout={handleLogout} />
  }

  return <LoginPage onLogin={handleLogin} />
}
