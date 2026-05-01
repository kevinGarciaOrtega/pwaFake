import '../styles/operacion-exitosa.css'

interface OperacionExitosaPageProps {
  modo: 'comprar' | 'vender'
  tengo: string
  quiero: string
  tcOnline: number
  cuentaCargo: string
  cuentaDestino: string
  onInicio: () => void
  onOtraOperacion: () => void
}

// Número completo de cuenta simulado
const NUMEROS_CUENTA: Record<string, string> = {
  '1': '008029065868',
  '2': '008027519454',
}
const NOMBRES_CUENTA: Record<string, string> = {
  '1': 'Cuenta Ahorro Digital',
  '2': 'Cuenta Sueldo Empleado',
}

function formatFecha(): string {
  const ahora = new Date()
  const dia = ahora.getDate().toString().padStart(2, '0')
  const meses = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic']
  const mes = meses[ahora.getMonth()]
  const anio = ahora.getFullYear()
  const mins = ahora.getMinutes().toString().padStart(2, '0')
  const ampm = ahora.getHours() >= 12 ? 'p.m.' : 'a.m.'
  const hora12 = (ahora.getHours() % 12 || 12).toString().padStart(2, '0')
  return `${dia} ${mes} ${anio} - ${hora12}:${mins} ${ampm}`
}

export default function OperacionExitosaPage({
  modo,
  tengo,
  quiero,
  tcOnline,
  cuentaCargo,
  cuentaDestino,
  onInicio,
  onOtraOperacion,
}: OperacionExitosaPageProps) {
  const tengoMoneda  = modo === 'comprar' ? 'S/'  : 'US$'
  const reciboMoneda = modo === 'comprar' ? 'US$' : 'S/'
  const fecha = formatFecha()

  const nombreCargo   = NOMBRES_CUENTA[cuentaCargo]   ?? 'Cuenta'
  const numeroCargo   = NUMEROS_CUENTA[cuentaCargo]   ?? ''
  const nombreDestino = NOMBRES_CUENTA[cuentaDestino] ?? 'Cuenta'
  const numeroDestino = NUMEROS_CUENTA[cuentaDestino] ?? ''

  return (
    <div className="exito-container">
      {/* Header logo */}
      <header className="exito-header">
        <h1 className="exito-logo">
          Ban<span className="exito-logo-accent">B</span>if
          <span className="exito-logo-dot" aria-hidden="true">·</span>
        </h1>
      </header>

      <main className="exito-main">
        {/* Ícono check */}
        <div className="exito-check-wrapper" aria-hidden="true">
          <div className="exito-check-circle">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <span className="exito-dot" aria-hidden="true" />
        </div>

        <p className="exito-titulo">¡Operación exitosa!</p>

        {/* Monedas */}
        <div className="exito-monedas" aria-label={`${tengoMoneda} a ${reciboMoneda}`}>
          <span className="exito-moneda-flag">{modo === 'comprar' ? '🇵🇪' : '🇺🇸'}</span>
          <span className="exito-moneda-label">{modo === 'comprar' ? 'SOL' : 'US$'}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="exito-arrow" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
          <span className="exito-moneda-flag">{modo === 'comprar' ? '🇺🇸' : '🇵🇪'}</span>
          <span className="exito-moneda-label">{modo === 'comprar' ? 'US$' : 'SOL'}</span>
        </div>

        <p className="exito-fecha">{fecha}</p>

        {/* Detalle de la operación */}
        <div className="exito-detalle">
          <div className="exito-fila">
            <span className="exito-fila-label">Tipo de cambio</span>
            <span className="exito-fila-valor">{tcOnline.toFixed(4)}</span>
          </div>
          <div className="exito-fila">
            <span className="exito-fila-label">Desde</span>
            <div className="exito-fila-cuenta">
              <span className="exito-cuenta-nombre">{nombreCargo}</span>
              <span className="exito-cuenta-numero">{numeroCargo}</span>
            </div>
          </div>
          <div className="exito-fila">
            <span className="exito-fila-label">Monto cargado</span>
            <span className="exito-fila-valor">{tengoMoneda} {parseFloat(tengo).toFixed(2)}</span>
          </div>
          <div className="exito-fila">
            <span className="exito-fila-label">Recibido en</span>
            <div className="exito-fila-cuenta">
              <span className="exito-cuenta-nombre">{nombreDestino}</span>
              <span className="exito-cuenta-numero">{numeroDestino}</span>
            </div>
          </div>
          <div className="exito-fila">
            <span className="exito-fila-label">Monto abonado</span>
            <span className="exito-fila-valor">{reciboMoneda} {parseFloat(quiero).toFixed(2)}</span>
          </div>

          {/* Botones dentro del card */}
          <button className="exito-otra-btn" onClick={onOtraOperacion}>
            Realizar otra operación
          </button>

          <button className="exito-compartir-btn" aria-label="Compartir comprobante">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
            </svg>
            Compartir
          </button>
        </div>
      </main>

      {/* Bottom nav */}
      <nav className="exito-bottom-nav" aria-label="Navegación">
        <button className="exito-nav-item active" onClick={onInicio} aria-label="Ir al inicio">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
          <span>Inicio</span>
        </button>
        <button className="exito-nav-item" aria-label="Productos">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
          </svg>
          <span>Productos</span>
        </button>
        <button className="exito-nav-item" aria-label="Operaciones frecuentes">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
          </svg>
          <span>Operaciones frecuentes</span>
        </button>
      </nav>
    </div>
  )
}
