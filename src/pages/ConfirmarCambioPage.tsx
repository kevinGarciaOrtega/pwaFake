import { useState, useEffect, useRef } from 'react'
import '../styles/confirmar-cambio.css'
import OperacionExitosaPage from './OperacionExitosaPage'

interface ConfirmarCambioPageProps {
  modo: 'comprar' | 'vender'
  tengo: string
  quiero: string
  tcOnline: number
  segundosRestantes: number
  onBack: () => void
  onInicio: () => void
  onOtraOperacion: () => void
}

const CUENTAS = [
  { id: '1', nombre: 'Cuenta Ahorro Digital',  numero: '.... 5868' },
  { id: '2', nombre: 'Cuenta Sueldo Empleado', numero: '.... 9454' },
]

function CountdownCircle({ segundos, total }: { segundos: number; total: number }) {
  const r = 14
  const circunferencia = 2 * Math.PI * r
  const dashoffset = circunferencia * (1 - segundos / total)
  const mins = Math.floor(segundos / 60).toString().padStart(2, '0')
  const secs = (segundos % 60).toString().padStart(2, '0')

  return (
    <div className="cc-countdown" aria-live="polite" aria-label={`Válido por ${mins}:${secs} minutos`}>
      <div className="cc-countdown-text">
        <span className="cc-countdown-label">Válido por</span>
        <span className="cc-countdown-time">{mins}:{secs} min.</span>
      </div>
      <svg width="36" height="36" viewBox="0 0 36 36" aria-hidden="true">
        <circle cx="18" cy="18" r={r} fill="none" stroke="#1e293b" strokeWidth="3" />
        <circle
          cx="18" cy="18" r={r}
          fill="none" stroke="#22d3ee" strokeWidth="3" strokeLinecap="round"
          strokeDasharray={circunferencia}
          strokeDashoffset={dashoffset}
          transform="rotate(-90 18 18)"
          style={{ transition: 'stroke-dashoffset 1s linear' }}
        />
      </svg>
    </div>
  )
}

export default function ConfirmarCambioPage({
  modo, tengo, quiero, tcOnline, segundosRestantes,
  onBack, onInicio, onOtraOperacion,
}: ConfirmarCambioPageProps) {
  // ── Hooks primero ───────────────────────────────────────────
  const [segundos, setSegundos]         = useState(segundosRestantes)
  const [cuentaCargo, setCuentaCargo]   = useState('')
  const [cuentaDestino, setCuentaDestino] = useState('')
  const [openCargo, setOpenCargo]       = useState(false)
  const [openDestino, setOpenDestino]   = useState(false)
  const [exitosa, setExitosa]           = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (segundos <= 0) return
    timerRef.current = setInterval(() => {
      setSegundos((s) => {
        if (s <= 1) { clearInterval(timerRef.current!); return 0 }
        return s - 1
      })
    }, 1000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [])

  // ── Derivados ───────────────────────────────────────────────
  const tengoMoneda  = modo === 'comprar' ? 'S/'  : 'US$'
  const reciboMoneda = modo === 'comprar' ? 'US$' : 'S/'
  const titulo       = modo === 'comprar' ? 'Comprar US$' : 'Vender US$'
  const puedeConfirmar = cuentaCargo !== '' && cuentaDestino !== ''

  const cuentaCargoLabel   = CUENTAS.find(c => c.id === cuentaCargo)
  const cuentaDestinoLabel = CUENTAS.find(c => c.id === cuentaDestino)

  // ── Return condicional después de todos los hooks ───────────
  if (exitosa) {
    return (
      <OperacionExitosaPage
        modo={modo}
        tengo={tengo}
        quiero={quiero}
        tcOnline={tcOnline}
        cuentaCargo={cuentaCargo}
        cuentaDestino={cuentaDestino}
        onInicio={onInicio}
        onOtraOperacion={onOtraOperacion}
      />
    )
  }

  return (
    <div className="cc-container">
      <header className="cc-header">
        <button className="cc-back" onClick={onBack} aria-label="Volver">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </button>
        <h1 className="cc-title">{titulo}</h1>
      </header>

      <main className="cc-main">
        {/* TC + countdown */}
        <div className="cc-tc-row">
          <div>
            <p className="cc-tc-label">Tipo de cambio online</p>
            <p className="cc-tc-value">{tcOnline.toFixed(4)}</p>
          </div>
          <CountdownCircle segundos={segundos} total={segundosRestantes} />
        </div>

        {/* Resumen */}
        <div className="cc-resumen">
          <div className="cc-resumen-col">
            <p className="cc-resumen-label">Tengo</p>
            <p className="cc-resumen-value">{tengoMoneda} {parseFloat(tengo).toFixed(2)}</p>
          </div>
          <div className="cc-resumen-divider" aria-hidden="true" />
          <div className="cc-resumen-col">
            <p className="cc-resumen-label">Recibo</p>
            <p className="cc-resumen-value">{reciboMoneda} {parseFloat(quiero).toFixed(2)}</p>
          </div>
        </div>

        {/* Desde */}
        <div className="cc-field-group">
          <label className="cc-field-label" id="label-cargo">Desde</label>
          <div className="cc-dropdown-wrapper">
            <button
              className={`cc-dropdown${openCargo ? ' open' : ''}`}
              onClick={() => { setOpenCargo(!openCargo); setOpenDestino(false) }}
              aria-haspopup="listbox"
              aria-expanded={openCargo}
              aria-labelledby="label-cargo"
            >
              <span className={cuentaCargo ? 'cc-dropdown-selected' : 'cc-dropdown-placeholder'}>
                {cuentaCargoLabel
                  ? `${cuentaCargoLabel.nombre} ${cuentaCargoLabel.numero}`
                  : 'Selecciona la cuenta de cargo'}
              </span>
              <svg className={`cc-chevron${openCargo ? ' rotated' : ''}`}
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            {openCargo && (
              <ul className="cc-dropdown-list" role="listbox" aria-labelledby="label-cargo">
                {CUENTAS.map((c) => (
                  <li key={c.id} role="option" aria-selected={cuentaCargo === c.id}
                    className={`cc-dropdown-item${cuentaCargo === c.id ? ' selected' : ''}`}
                    onClick={() => { setCuentaCargo(c.id); setOpenCargo(false) }}>
                    <span className="cc-item-nombre">{c.nombre}</span>
                    <span className="cc-item-numero">{c.numero}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Recibir en */}
        <div className="cc-field-group">
          <label className="cc-field-label" id="label-destino">Recibir en</label>
          <div className="cc-dropdown-wrapper">
            <button
              className={`cc-dropdown${openDestino ? ' open' : ''}`}
              onClick={() => { setOpenDestino(!openDestino); setOpenCargo(false) }}
              aria-haspopup="listbox"
              aria-expanded={openDestino}
              aria-labelledby="label-destino"
            >
              <span className={cuentaDestino ? 'cc-dropdown-selected' : 'cc-dropdown-placeholder'}>
                {cuentaDestinoLabel
                  ? `${cuentaDestinoLabel.nombre} ${cuentaDestinoLabel.numero}`
                  : 'Selecciona la cuenta de destino'}
              </span>
              <svg className={`cc-chevron${openDestino ? ' rotated' : ''}`}
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            {openDestino && (
              <ul className="cc-dropdown-list" role="listbox" aria-labelledby="label-destino">
                {CUENTAS.map((c) => (
                  <li key={c.id} role="option" aria-selected={cuentaDestino === c.id}
                    className={`cc-dropdown-item${cuentaDestino === c.id ? ' selected' : ''}`}
                    onClick={() => { setCuentaDestino(c.id); setOpenDestino(false) }}>
                    <span className="cc-item-nombre">{c.nombre}</span>
                    <span className="cc-item-numero">{c.numero}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>

      <footer className="cc-footer">
        <button
          className={`cc-confirmar-btn${puedeConfirmar ? ' enabled' : ''}`}
          disabled={!puedeConfirmar}
          aria-disabled={!puedeConfirmar}
          onClick={() => puedeConfirmar && setExitosa(true)}
        >
          Confirmar
        </button>
      </footer>
    </div>
  )
}
