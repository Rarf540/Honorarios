import { useState } from 'react'
import { FONT, DARK, LIGHT } from '../landing/themes'
import { supabase } from '../supabase'

const PLAN_LABELS = { free: 'Free', plus: 'Plus', premium: 'Premium' }
const PLAN_DESC = {
  free: 'Plan gratuito — funciones base incluidas',
  plus: 'Plan Plus — $9/mes · Cotizaciones ilimitadas + PDF',
  premium: 'Plan Premium — $19/mes · Todo Plus + IA integrada',
}

function getPlanFromURL() {
  const p = new URLSearchParams(window.location.search).get('plan') || 'free'
  return ['free', 'plus', 'premium'].includes(p) ? p : 'free'
}

export default function RegistroPage() {
  const [isDark, setIsDark] = useState(true)
  const T = isDark ? DARK : LIGHT

  const [plan, setPlan] = useState(getPlanFromURL)
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [estado, setEstado] = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!nombre.trim() || !email.trim()) return
    setEstado('loading')
    setErrorMsg('')
    if (!supabase) {
      setEstado('error')
      setErrorMsg('El formulario aún no está activo. Vuelve pronto.')
      return
    }
    const { error } = await supabase.from('waitlist').insert([{ nombre: nombre.trim(), email: email.trim(), plan }])
    if (error) {
      setEstado('error')
      setErrorMsg(error.code === '23505' ? 'Ese email ya está en la lista.' : 'Algo salió mal. Intenta de nuevo.')
    } else {
      setEstado('success')
    }
  }

  const s = {
    page: { fontFamily: FONT, background: T.bg, color: T.text, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' },
    themeBtn: { position: 'fixed', top: 12, right: 16, background: T.bgCard, border: `1px solid ${T.bgBorder}`, borderRadius: 20, padding: '5px 14px', fontSize: 11, color: T.textMuted, cursor: 'pointer', fontFamily: FONT },
    card: { background: T.bgCard, border: `1px solid ${T.bgBorder}`, borderRadius: 16, padding: '40px 48px', width: '100%', maxWidth: 460, boxShadow: T.cardShadow },
    logo: { fontSize: 15, fontWeight: 800, letterSpacing: '0.1em', color: T.accent, marginBottom: 28, textAlign: 'center' },
    badge: { display: 'inline-flex', alignItems: 'center', gap: 6, background: T.accentBg, border: `1px solid ${T.accentBorder}`, borderRadius: 20, padding: '4px 14px', fontSize: 11, color: T.accent, fontWeight: 600, marginBottom: 20 },
    title: { fontSize: 26, fontWeight: 800, color: T.text, marginBottom: 8, lineHeight: 1.2 },
    sub: { fontSize: 13, color: T.textMuted, lineHeight: 1.7, marginBottom: 28 },
    planRow: { display: 'flex', gap: 8, marginBottom: 24 },
    planBtn: (p) => ({
      flex: 1, padding: '8px 0', borderRadius: 8, fontSize: 12, fontWeight: 700,
      cursor: 'pointer', fontFamily: FONT,
      background: plan === p ? T.btnPrimaryBg : 'none',
      color: plan === p ? T.btnPrimaryText : T.textMuted,
      border: `1px solid ${plan === p ? T.btnPrimaryBg : T.bgBorder}`,
    }),
    planDesc: { fontSize: 11, color: T.accent, marginBottom: 24, minHeight: 16 },
    label: { fontSize: 11, fontWeight: 700, color: T.textSec, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6, display: 'block' },
    input: { width: '100%', background: T.bg, border: `1px solid ${T.bgBorder}`, borderRadius: 8, padding: '10px 14px', fontSize: 13, color: T.text, fontFamily: FONT, marginBottom: 16, boxSizing: 'border-box', outline: 'none' },
    btnSubmit: { width: '100%', background: T.btnPrimaryBg, color: T.btnPrimaryText, border: 'none', borderRadius: 8, padding: '13px 0', fontSize: 14, fontWeight: 700, cursor: estado === 'loading' ? 'wait' : 'pointer', fontFamily: FONT, marginTop: 8 },
    errorBox: { background: 'rgba(220,50,50,0.1)', border: '1px solid rgba(220,50,50,0.3)', borderRadius: 8, padding: '10px 14px', fontSize: 12, color: '#e05555', marginTop: 12 },
    backLink: { fontSize: 12, color: T.textMuted, cursor: 'pointer', background: 'none', border: 'none', fontFamily: FONT, marginTop: 20, display: 'block', textAlign: 'center' },
    successIcon: { fontSize: 48, marginBottom: 16, textAlign: 'center' },
    successTitle: { fontSize: 22, fontWeight: 800, color: T.text, marginBottom: 10, textAlign: 'center' },
    successSub: { fontSize: 13, color: T.textMuted, lineHeight: 1.7, textAlign: 'center', marginBottom: 28 },
  }

  if (estado === 'success') {
    return (
      <div style={s.page}>
        <button style={s.themeBtn} onClick={() => setIsDark(d => !d)}>{isDark ? '◑ Claro' : '◑ Oscuro'}</button>
        <div style={s.card}>
          <div style={s.logo}>PLANCOST</div>
          <div style={s.successIcon}>✓</div>
          <div style={s.successTitle}>¡Ya estás en la lista!</div>
          <p style={s.successSub}>Te avisamos cuando lancemos PlanCost. Mientras tanto, puedes probar la calculadora de honorarios.</p>
          <a href="/index.html" style={{ ...s.btnSubmit, display: 'block', textAlign: 'center', textDecoration: 'none' }}>
            Probar calculadora →
          </a>
          <a href="/landing.html" style={s.backLink}>← Volver a la landing</a>
        </div>
      </div>
    )
  }

  return (
    <div style={s.page}>
      <button style={s.themeBtn} onClick={() => setIsDark(d => !d)}>{isDark ? '◑ Claro' : '◑ Oscuro'}</button>
      <div style={s.card}>
        <div style={s.logo}>PLANCOST</div>
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <span style={s.badge}>Lista de espera</span>
        </div>
        <div style={s.title}>Reserva tu lugar</div>
        <p style={s.sub}>PlanCost está en desarrollo. Regístrate y serás de los primeros en acceder cuando lancemos.</p>

        <div style={s.planRow}>
          {['free', 'plus', 'premium'].map(p => (
            <button key={p} style={s.planBtn(p)} onClick={() => setPlan(p)}>
              {PLAN_LABELS[p]}
            </button>
          ))}
        </div>
        <div style={s.planDesc}>{PLAN_DESC[plan]}</div>

        <form onSubmit={handleSubmit}>
          <label style={s.label}>Nombre</label>
          <input
            style={s.input}
            type="text"
            placeholder="Tu nombre"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            required
          />
          <label style={s.label}>Email</label>
          <input
            style={s.input}
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <button style={s.btnSubmit} type="submit" disabled={estado === 'loading'}>
            {estado === 'loading' ? 'Guardando...' : 'Reservar mi lugar →'}
          </button>
          {estado === 'error' && <div style={s.errorBox}>{errorMsg}</div>}
        </form>

        <a href="/landing.html" style={s.backLink}>← Volver</a>
      </div>
    </div>
  )
}
