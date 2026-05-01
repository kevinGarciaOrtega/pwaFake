import { useState } from 'react'
import heroImg from '../assets/hero.png'
import '../styles/login.css'

interface LoginPageProps {
  onLogin: (usuario: string) => void
}

const CREDENCIALES = {
  usuario: 'admin',
  clave: '1234',
  nombre: 'ROBERT',
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [documento, setDocumento] = useState('')
  const [recordar, setRecordar] = useState(false)
  const [clave, setClave] = useState('')
  const [mostrarClave, setMostrarClave] = useState(false)
  const [error, setError] = useState('')

  const handleIngresar = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (
      documento === CREDENCIALES.usuario &&
      clave === CREDENCIALES.clave
    ) {
      onLogin(CREDENCIALES.nombre)
    } else {
      setError('Documento o clave incorrectos. Intenta con admin / 1234')
    }
  }

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <button className="menu-btn" aria-label="Menú">
          <span className="hamburger" />
          <span className="hamburger" />
          <span className="hamburger" />
        </button>
        <h1 className="logo">
          Ban<span className="logo-accent">B</span>if
          <span className="logo-dot" aria-hidden="true">·</span>
        </h1>
        <button className="whatsapp-btn" aria-label="Contactar por WhatsApp">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </button>
      </header>

      {/* Hero Image */}
      <div className="hero-wrapper">
        <img src={heroImg} alt="Bienvenido a BanBif" className="hero-img" />
        <div className="hero-overlay" aria-hidden="true" />
      </div>

      {/* Login Card */}
      <main className="login-card">
        <form onSubmit={handleIngresar} noValidate>
          {/* Campo Documento */}
          <div className="input-group">
            <span className="input-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </span>
            <input
              id="documento"
              type="text"
              placeholder="Documento de identidad"
              value={documento}
              onChange={(e) => setDocumento(e.target.value)}
              autoComplete="username"
              aria-label="Documento de identidad"
            />
          </div>

          {/* Recordar documento */}
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={recordar}
              onChange={(e) => setRecordar(e.target.checked)}
            />
            <span className="checkbox-custom" aria-hidden="true" />
            <span>Recordar documento</span>
          </label>

          {/* Campo Clave */}
          <div className="input-group">
            <span className="input-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </span>
            <input
              id="clave"
              type={mostrarClave ? 'text' : 'password'}
              placeholder="Clave digital"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              autoComplete="current-password"
              aria-label="Clave digital"
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setMostrarClave(!mostrarClave)}
              aria-label={mostrarClave ? 'Ocultar clave' : 'Mostrar clave'}
            >
              {mostrarClave ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )}
            </button>
          </div>

          {/* Error */}
          {error && (
            <p className="error-msg" role="alert">{error}</p>
          )}

          {/* Recuperar clave */}
          <div className="recover-link-wrapper">
            <a href="#" className="recover-link">Recuperar clave</a>
          </div>

          {/* Botones de acción */}
          <div className="action-row">
            <button type="button" className="biometric-btn" aria-label="Ingresar con biometría facial">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v.375" />
              </svg>
            </button>
            <button type="submit" className="ingresar-btn">
              Ingresar
            </button>
          </div>
        </form>

        {/* Registro */}
        <p className="register-text">
          ¿No tienes una cuenta?{' '}
          <a href="#" className="register-link">Regístrate aquí</a>
        </p>
      </main>

      {/* Bottom Navigation */}
      <nav className="bottom-nav" aria-label="Accesos rápidos">
        <button className="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
          </svg>
          <span>Token Digital</span>
        </button>
        <button className="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l2.5 2.5" />
          </svg>
          <span>Plin</span>
        </button>
        <button className="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <path strokeLinecap="round" d="M14 14h2v2h-2zM18 14h3M14 18v3M18 18h3v3h-3z" />
          </svg>
          <span>Pago QR</span>
        </button>
        <button className="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
          <span>Bloquear tarjeta</span>
        </button>
        <button className="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
          </svg>
          <span>Club HOLA</span>
        </button>
      </nav>
    </div>
  )
}
