import { useState } from 'react'
import '../styles/home.css'
import HolaCambioPage from './HolaCambioPage'

interface HomePageProps {
  usuario: string
  onLogout: () => void
}

type TabId = 'inicio' | 'plin' | 'qr' | 'mas'
type SubPage = 'home' | 'hola-cambio'

const ACCIONES = [
  {
    id: 'transferir',
    label: 'Transferir',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
  },
  {
    id: 'pagar',
    label: 'Pagar',
    bold: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
      </svg>
    ),
  },
  {
    id: 'hola-cambio',
    label: 'HOLA Cambio$',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 'operaciones',
    label: 'Operaciones frecuentes',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
      </svg>
    ),
  },
  {
    id: 'canje-puntos',
    label: 'Canje de Puntos',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
  {
    id: 'club-hola',
    label: 'ClubHOLA',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
      </svg>
    ),
  },
  {
    id: 'solicitar',
    label: 'Solicitar productos',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z" />
      </svg>
    ),
  },
]

const PRODUCTOS = [
  { id: 1, nombre: 'Cuenta Ahorro Digital', numero: '5868', saldo: 'S/ 1,250.00' },
  { id: 2, nombre: 'Cuenta Sueldo Empleado', numero: '9454', saldo: 'S/ 3,840.50' },
]

export default function HomePage({ usuario, onLogout }: HomePageProps) {
  const [activeTab, setActiveTab] = useState<TabId>('inicio')
  const [saldosVisibles, setSaldosVisibles] = useState(false)
  const [bannerVisible, setBannerVisible] = useState(true)
  const [subPage, setSubPage] = useState<SubPage>('home')

  // Sub-páginas
  if (subPage === 'hola-cambio') {
    return <HolaCambioPage onBack={() => setSubPage('home')} onInicio={() => setSubPage('home')} />
  }

  return (
    <div className="home-container">
      {/* Header */}
      <header className="home-header">
        <div className="home-header-top">
          <h1 className="home-logo">
            <span className="logo-bif-home">Bif</span>
            <span className="logo-dot" aria-hidden="true">·</span>
          </h1>
          <button className="para-ti-btn" aria-label="Para ti">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
            <span>Para ti</span>
          </button>
        </div>
        <p className="home-greeting">Hola, <strong>{usuario}</strong></p>
      </header>

      {/* Scrollable content */}
      <main className="home-main">

        {/* Banner promocional */}
        {bannerVisible && (
          <div className="promo-banner" role="region" aria-label="Promoción">
            <div className="promo-content">
              <p className="promo-text">
                Tu <span className="promo-highlight">opinión</span>
              </p>
              <div className="promo-pill">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
                <span>nos importa</span>
              </div>
              <p className="promo-sub">Queremos escucharte para mejorar tu experiencia.</p>
            </div>
            <div className="promo-img-wrapper">
              <div className="promo-img-placeholder" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <button
                className="promo-close"
                onClick={() => setBannerVisible(false)}
                aria-label="Cerrar banner"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {/* Dots */}
            <div className="promo-dots" aria-hidden="true">
              <span className="dot" />
              <span className="dot" />
              <span className="dot active" />
            </div>
          </div>
        )}

        {/* ¿Qué quieres hacer hoy? */}
        <section className="section-acciones">
          <div className="section-header">
            <h2 className="section-title">¿Qué quieres hacer hoy?</h2>
            <button className="section-toggle" aria-label="Colapsar sección">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
              </svg>
            </button>
          </div>
          <div className="acciones-grid">
            {ACCIONES.map((accion) => (
              <button
                key={accion.id}
                className="accion-item"
                aria-label={accion.label}
                onClick={() => {
                  if (accion.id === 'hola-cambio') setSubPage('hola-cambio')
                }}
              >
                <span className="accion-icon" aria-hidden="true">{accion.icon}</span>
                <span className={`accion-label${accion.bold ? ' bold' : ''}`}>
                  {accion.label}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Tus Productos */}
        <section className="section-productos">
          <div className="section-header">
            <div className="productos-title-row">
              <h2 className="section-title">Tus Productos</h2>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="chevron-right" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </div>
            <div className="productos-actions">
              <button
                className="icon-action-btn"
                onClick={() => setSaldosVisibles(!saldosVisibles)}
                aria-label={saldosVisibles ? 'Ocultar saldos' : 'Mostrar saldos'}
              >
                {saldosVisibles ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                )}
              </button>
              <button className="icon-action-btn" aria-label="Actualizar">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
              </button>
              <button className="icon-action-btn" aria-label="Editar productos">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
                </svg>
              </button>
            </div>
          </div>

          <div className="productos-grid">
            {PRODUCTOS.map((prod) => (
              <div key={prod.id} className="producto-card">
                <div className="producto-info">
                  <p className="producto-nombre">{prod.nombre}</p>
                  <p className="producto-numero">.... {prod.numero}</p>
                  {saldosVisibles && (
                    <p className="producto-saldo">{prod.saldo}</p>
                  )}
                </div>
                <button className="producto-share" aria-label="Compartir cuenta">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Spacer para el bottom nav */}
        <div style={{ height: '80px' }} />
      </main>

      {/* Bottom Navigation */}
      <nav className="home-bottom-nav" aria-label="Navegación principal">
        <button
          className={`bnav-item${activeTab === 'inicio' ? ' active' : ''}`}
          onClick={() => setActiveTab('inicio')}
          aria-label="Inicio"
          aria-current={activeTab === 'inicio' ? 'page' : undefined}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
          <span>Inicio</span>
        </button>

        <button
          className={`bnav-item${activeTab === 'plin' ? ' active' : ''}`}
          onClick={() => setActiveTab('plin')}
          aria-label="Plin"
          aria-current={activeTab === 'plin' ? 'page' : undefined}
        >
          <span className="plin-badge" aria-hidden="true">plin</span>
          <span>Plin</span>
        </button>

        {/* Botón central micrófono */}
        <div className="bnav-center">
          <button className="mic-btn" aria-label="Asistente de voz Beta">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
              <path d="M19 10v2a7 7 0 01-14 0v-2H3v2a9 9 0 008 8.94V23h2v-2.06A9 9 0 0021 12v-2h-2z" />
            </svg>
            <span className="beta-badge">Beta</span>
          </button>
        </div>

        <button
          className={`bnav-item${activeTab === 'qr' ? ' active' : ''}`}
          onClick={() => setActiveTab('qr')}
          aria-label="Pago QR"
          aria-current={activeTab === 'qr' ? 'page' : undefined}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <path strokeLinecap="round" d="M14 14h2v2h-2zM18 14h3M14 18v3M18 18h3v3h-3z" />
          </svg>
          <span>Pago QR</span>
        </button>

        <button
          className={`bnav-item${activeTab === 'mas' ? ' active' : ''}`}
          onClick={() => { setActiveTab('mas'); onLogout() }}
          aria-label="Más opciones"
          aria-current={activeTab === 'mas' ? 'page' : undefined}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
          <span>Más</span>
        </button>
      </nav>
    </div>
  )
}
