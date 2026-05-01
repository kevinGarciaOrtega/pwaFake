import { useState, useEffect, useRef } from 'react'
import '../styles/hola-cambio.css'
import ConfirmarCambioPage from './ConfirmarCambioPage'

interface HolaCambioPageProps {
  onBack: () => void
  onInicio: () => void
}

type Modo = 'comprar' | 'vender'

const TC_ONLINE_COMPRA     = 3.5300
const TC_ONLINE_VENTA      = 3.5300
const TC_VENTANILLA_COMPRA = 3.7300
const TC_VENTANILLA_VENTA  = 3.7300
const COUNTDOWN_SECONDS    = 5 * 60

function CountdownCircle({ segundos, total }: { segundos: number; total: number }) {
  const r = 28
  const circunferencia = 2 * Math.PI * r
  const dashoffset = circunferencia * (1 - segundos / total)
  const mins = Math.floor(segundos / 60).toString().padStart(2, '0')
  const secs = (segundos % 60).toString().padStart(2, '0')

  return (
    <div className="countdown-wrapper" aria-live="polite" aria-label={`Válido por ${mins}:${secs} minutos`}>
      <svg width="72" height="72" viewBox="0 0 72 72" aria-hidden="true">
        <circle cx="36" cy="36" r={r} fill="none" stroke="#1e1e2e" strokeWidth="5" />
        <circle
          cx="36" cy="36" r={r}
          fill="none" stroke="#22d3ee" strokeWidth="5" strokeLinecap="round"
          strokeDasharray={circunferencia}
          strokeDashoffset={dashoffset}
          transform="rotate(-90 36 36)"
          style={{ transition: 'stroke-dashoffset 1s linear' }}
        />
      </svg>
      <div className="countdown-text">
        <span className="countdown-label">Válido por</span>
        <span className="countdown-time">{mins}:{secs} min.</span>
      </div>
    </div>
  )
}

export default function HolaCambioPage({ onBack, onInicio }: HolaCambioPageProps) {
  // ── Todos los hooks primero, sin excepción ──────────────────
  const [modo, setModo]           = useState<Modo>('comprar')
  const [tengo, setTengo]         = useState('')
  const [quiero, setQuiero]       = useState('')
  const [segundos, setSegundos]   = useState(COUNTDOWN_SECONDS)
  const [enConfirmar, setEnConfirmar] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const hayMonto = tengo !== '' && parseFloat(tengo) > 0

  useEffect(() => {
    if (hayMonto) {
      setSegundos(COUNTDOWN_SECONDS)
      timerRef.current = setInterval(() => {
        setSegundos((s) => {
          if (s <= 1) { clearInterval(timerRef.current!); return 0 }
          return s - 1
        })
      }, 1000)
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
      setSegundos(COUNTDOWN_SECONDS)
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [hayMonto, modo])

  // ── Derivados (no son hooks) ────────────────────────────────
  const tcOnline     = modo === 'comprar' ? TC_ONLINE_VENTA     : TC_ONLINE_COMPRA
  const tcVentanilla = modo === 'comprar' ? TC_VENTANILLA_VENTA : TC_VENTANILLA_COMPRA
  const tengoMoneda  = modo === 'comprar' ? 'S/'  : 'US$'
  const quieroMoneda = modo === 'comprar' ? 'US$' : 'S/'
  const monedaAhorro = modo === 'comprar' ? 'US$' : 'S/'
  const tengoFlag    = modo === 'comprar' ? '🇵🇪'  : '🇺🇸'
  const quieroFlag   = modo === 'comprar' ? '🇺🇸'  : '🇵🇪'

  const calcularQuiero = (val: string, m: Modo) => {
    const num = parseFloat(val)
    if (isNaN(num) || num <= 0) return ''
    const tc = m === 'comprar' ? TC_ONLINE_VENTA : TC_ONLINE_COMPRA
    return m === 'comprar' ? (num / tc).toFixed(2) : (num * tc).toFixed(2)
  }

  const calcularTengo = (val: string, m: Modo) => {
    const num = parseFloat(val)
    if (isNaN(num) || num <= 0) return ''
    const tc = m === 'comprar' ? TC_ONLINE_VENTA : TC_ONLINE_COMPRA
    return m === 'comprar' ? (num * tc).toFixed(2) : (num / tc).toFixed(2)
  }

  const handleTengoChange = (val: string) => {
    const clean = val.replace(/[^0-9.]/g, '')
    setTengo(clean)
    setQuiero(calcularQuiero(clean, modo))
  }

  const handleQuieroChange = (val: string) => {
    const clean = val.replace(/[^0-9.]/g, '')
    setQuiero(clean)
    setTengo(calcularTengo(clean, modo))
  }

  const handleModoChange = (nuevoModo: Modo) => {
    setModo(nuevoModo)
    setTengo('')
    setQuiero('')
  }

  const calcularAhorro = (): string => {
    const num = parseFloat(tengo)
    if (isNaN(num) || num <= 0) return '0.00'
    if (modo === 'comprar') {
      return Math.abs(num / tcOnline - num / tcVentanilla).toFixed(2)
    } else {
      return Math.abs(num * tcOnline - num * tcVentanilla).toFixed(2)
    }
  }

  // ── Return condicional DESPUÉS de todos los hooks ───────────
  if (enConfirmar) {
    return (
      <ConfirmarCambioPage
        modo={modo}
        tengo={tengo}
        quiero={quiero}
        tcOnline={tcOnline}
        segundosRestantes={segundos}
        onBack={() => setEnConfirmar(false)}
        onInicio={onInicio}
        onOtraOperacion={() => {
          setEnConfirmar(false)
          setTengo('')
          setQuiero('')
        }}
      />
    )
  }

  return (
    <div className="cambio-container">
      <header className="cambio-header">
        <button className="cambio-back" onClick={onBack} aria-label="Volver al inicio">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </button>
        <h1 className="cambio-title">HOLA Cambio$</h1>
      </header>

      <main className="cambio-main">
        <p className="cambio-question">¿Qué vas a hacer?</p>

        <div className="cambio-toggle" role="group" aria-label="Seleccionar operación">
          <button
            className={`toggle-btn${modo === 'comprar' ? ' active' : ''}`}
            onClick={() => handleModoChange('comprar')}
            aria-pressed={modo === 'comprar'}
          >
            Comprar US$
          </button>
          <button
            className={`toggle-btn${modo === 'vender' ? ' active' : ''}`}
            onClick={() => handleModoChange('vender')}
            aria-pressed={modo === 'vender'}
          >
            Vender US$
          </button>
        </div>

        {/* Card Tengo */}
        <div className="cambio-card">
          <div className="cambio-flag" aria-hidden="true">{tengoFlag}</div>
          <div className="cambio-field">
            <label className="cambio-field-label" htmlFor="input-tengo">Tengo</label>
            <div className="cambio-input-row">
              <span className="cambio-currency">{tengoMoneda}</span>
              <input
                id="input-tengo"
                type="text"
                inputMode="decimal"
                className="cambio-input"
                placeholder="0"
                value={tengo}
                onChange={(e) => handleTengoChange(e.target.value)}
                aria-label={`Monto en ${tengoMoneda}`}
              />
            </div>
            <div className="cambio-divider" aria-hidden="true" />
          </div>
        </div>

        {/* Card Quiero */}
        <div className="cambio-card">
          <div className="cambio-flag" aria-hidden="true">{quieroFlag}</div>
          <div className="cambio-field">
            <label className="cambio-field-label" htmlFor="input-quiero">Quiero</label>
            <div className="cambio-input-row">
              <span className="cambio-currency">{quieroMoneda}</span>
              <input
                id="input-quiero"
                type="text"
                inputMode="decimal"
                className="cambio-input"
                placeholder="0"
                value={quiero}
                onChange={(e) => handleQuieroChange(e.target.value)}
                aria-label={`Monto en ${quieroMoneda}`}
              />
            </div>
            <div className="cambio-divider" aria-hidden="true" />
          </div>
        </div>

        {/* Panel TC o aviso */}
        {hayMonto ? (
          <div className="tc-panel" aria-live="polite">
            <div className="tc-panel-left">
              <p className="tc-online-label">Tipo de cambio online</p>
              <p className="tc-online-value">{tcOnline.toFixed(4)}</p>
              <p className="tc-ventanilla-label">
                Tipo de cambio ventanilla&nbsp;
                <span className="tc-ventanilla-value">{tcVentanilla.toFixed(4)}</span>
              </p>
            </div>
            <CountdownCircle segundos={segundos} total={COUNTDOWN_SECONDS} />
          </div>
        ) : (
          <div className="cambio-aviso" role="note">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
            <span>Este tipo de cambio no aplica para desembolsos.</span>
          </div>
        )}

        {/* Banner ahorro */}
        {hayMonto && (
          <div className="ahorro-banner" role="note">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75" />
            </svg>
            <span>
              ¡Ahorra{' '}
              <span className="ahorro-monto">{monedaAhorro} {calcularAhorro()}</span>
              {' '}usando la app en vez de ventanilla!
            </span>
          </div>
        )}
      </main>

      <footer className="cambio-footer">
        <button
          className={`continuar-btn${hayMonto ? ' enabled' : ''}`}
          disabled={!hayMonto}
          aria-disabled={!hayMonto}
          onClick={() => hayMonto && setEnConfirmar(true)}
        >
          Continuar
        </button>
      </footer>
    </div>
  )
}
