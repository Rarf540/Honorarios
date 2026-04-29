import { useState } from 'react'
import { FONT, DARK, LIGHT } from './themes'
import { MODULES, PLANS } from './data'

export default function LandingPage() {
  const [isDark, setIsDark] = useState(true)
  const [activeTab, setActiveTab] = useState('honorarios')
  const T = isDark ? DARK : LIGHT

  const activeModule = MODULES.find(m => m.id === activeTab)

  const s = {
    page: { fontFamily: FONT, background: T.bg, color: T.text, minHeight: '100vh' },
    themeBtn: {
      position: 'fixed', top: 12, right: 16, zIndex: 100,
      background: T.bgCard, border: `1px solid ${T.bgBorder}`,
      borderRadius: 20, padding: '5px 14px', fontSize: 11,
      color: T.textMuted, cursor: 'pointer', fontFamily: FONT,
    },
    nav: {
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '18px 48px', borderBottom: `1px solid ${T.navBorder}`,
      position: 'sticky', top: 0, background: T.navBg,
      backdropFilter: 'blur(12px)', zIndex: 50,
    },
    logo: { fontSize: 16, fontWeight: 800, letterSpacing: '0.1em', color: T.accent },
    navLinks: { display: 'flex', alignItems: 'center', gap: 28 },
    navLink: { color: T.textMuted, fontSize: 13, cursor: 'pointer', border: 'none', background: 'none', fontFamily: FONT },
    navCta: {
      background: T.btnPrimaryBg, color: T.btnPrimaryText,
      fontSize: 12, fontWeight: 700, padding: '8px 18px',
      borderRadius: 6, cursor: 'pointer', border: 'none', fontFamily: FONT,
    },
    hero: {
      display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48,
      alignItems: 'center', padding: '80px 48px',
      maxWidth: 1100, margin: '0 auto',
    },
    badge: {
      display: 'inline-flex', alignItems: 'center', gap: 6,
      background: T.accentBg, border: `1px solid ${T.accentBorder}`,
      borderRadius: 20, padding: '4px 12px', fontSize: 11,
      color: T.accent, fontWeight: 600, letterSpacing: '0.08em', marginBottom: 20,
    },
    heroTitle: { fontSize: 38, fontWeight: 800, lineHeight: 1.15, color: T.text, marginBottom: 16 },
    heroSub: { fontSize: 15, color: T.textMuted, lineHeight: 1.7, marginBottom: 32, maxWidth: 400 },
    heroActions: { display: 'flex', gap: 12, alignItems: 'center' },
    btnPrimary: {
      background: T.btnPrimaryBg, color: T.btnPrimaryText,
      fontSize: 13, fontWeight: 700, padding: '12px 24px',
      borderRadius: 8, cursor: 'pointer', border: 'none', fontFamily: FONT,
    },
    btnGhost: { color: T.textSec, fontSize: 13, cursor: 'pointer', border: 'none', background: 'none', fontFamily: FONT },
    mockup: {
      background: T.bgCard, border: `1px solid ${T.bgBorder}`,
      borderRadius: 14, padding: 20, boxShadow: T.cardShadow,
    },
    mockupHeader: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16 },
    mockupRow: {
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      background: T.bg, borderRadius: 6, padding: '8px 12px', marginBottom: 6,
    },
    mockupLabel: { fontSize: 11, color: T.textSec },
    mockupVal: { fontSize: 11, fontWeight: 600, color: T.accent },
    mockupTotal: {
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      background: T.accentBg, border: `1px solid ${T.accent}`,
      borderRadius: 6, padding: '10px 12px', marginTop: 8,
    },
    section: { padding: '80px 48px', maxWidth: 1100, margin: '0 auto' },
    sectionLabel: {
      fontSize: 11, fontWeight: 700, letterSpacing: '0.15em',
      textTransform: 'uppercase', color: T.accent, marginBottom: 10,
    },
    sectionTitle: { fontSize: 28, fontWeight: 800, color: T.text, marginBottom: 14, lineHeight: 1.2 },
    sectionSub: { fontSize: 14, color: T.textMuted, lineHeight: 1.7, maxWidth: 500, marginBottom: 40 },
    tabs: { display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 },
    tabContent: {
      background: T.bgCard, border: `1px solid ${T.accent}`,
      borderRadius: 12, padding: 28, display: 'flex', gap: 24, alignItems: 'flex-start',
    },
    tabIcon: {
      background: T.accentBg, borderRadius: 10,
      padding: 14, fontSize: 24, flexShrink: 0,
    },
    tabTitle: { fontSize: 16, fontWeight: 700, color: T.accent, marginBottom: 8 },
    tabDesc: { fontSize: 13, color: T.textSec, lineHeight: 1.7, marginBottom: 14 },
    tabChips: { display: 'flex', gap: 8, flexWrap: 'wrap' },
    chip: {
      background: T.bg, border: `1px solid ${T.bgBorder}`,
      borderRadius: 4, padding: '3px 10px', fontSize: 11, color: T.accent,
    },
    divider: { height: 1, background: T.divider, margin: '0 48px' },
    pricingLayout: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' },
    pricingCards: { display: 'flex', flexDirection: 'column', gap: 12 },
    ctaSection: { textAlign: 'center', padding: '80px 48px', background: T.ctaGradient },
    ctaTitle: { fontSize: 32, fontWeight: 800, color: T.text, marginBottom: 14 },
    ctaSub: { fontSize: 14, color: T.textMuted, marginBottom: 32 },
    footer: {
      borderTop: `1px solid ${T.navBorder}`, padding: '28px 48px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    },
  }

  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  function irARegistro(plan) {
    window.location.href = `/registro.html?plan=${plan}`
  }

  function tabStyle(id) {
    const active = activeTab === id
    return {
      border: `1px solid ${active ? T.tabActiveBg : T.bgBorder}`,
      background: active ? T.tabActiveBg : 'none',
      color: active ? T.tabActiveText : T.textMuted,
      fontSize: 12, padding: '6px 14px', borderRadius: 20,
      cursor: 'pointer', fontFamily: FONT,
      fontWeight: active ? 700 : 400,
    }
  }

  function planCardStyle(plan) {
    return {
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      background: T.bgCard, borderRadius: 10, padding: '18px 22px',
      border: `1px solid ${plan.popular ? T.planPopularBorder : T.bgBorder}`,
    }
  }

  function planBtnStyle(variant) {
    if (variant === 'primary') return { background: T.btnPrimaryBg, color: T.btnPrimaryText, border: 'none' }
    if (variant === 'outline') return { background: 'none', border: `1px solid ${T.accent}`, color: T.accent }
    return { background: 'none', border: `1px solid ${T.bgBorder}`, color: T.textMuted }
  }

  const MOCK_ROWS = [
    { label: 'Diseño de arquitectura', val: '36.0 UF' },
    { label: 'Permiso de edificación', val: '24.0 UF' },
    { label: 'Diseño de interiores', val: '36.0 UF' },
    { label: 'Renders y animaciones', val: '8.2 UF', dim: true },
  ]

  return (
    <div style={s.page}>
      {/* Theme toggle */}
      <button style={s.themeBtn} onClick={() => setIsDark(d => !d)}>
        {isDark ? '◑ Claro' : '◑ Oscuro'}
      </button>

      {/* Navbar */}
      <nav style={s.nav}>
        <div style={s.logo}>PLANCOST</div>
        <div style={s.navLinks}>
          <button style={s.navLink} onClick={() => scrollTo('funciones')}>Funciones</button>
          <button style={s.navLink} onClick={() => scrollTo('planes')}>Planes</button>
          <button style={s.navLink} onClick={() => scrollTo('funciones')}>Para quién</button>
          <button style={s.navCta} onClick={() => irARegistro('free')}>Empezar gratis</button>
        </div>
      </nav>

      {/* Hero */}
      <div style={s.hero}>
        <div>
          <div style={s.badge}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: T.accent, display: 'inline-block' }} />
            Suite profesional AEC
          </div>
          <h1 style={s.heroTitle}>
            Gestiona tu estudio.<br />
            Cobra lo que vale<br />
            <span style={{ color: T.accent }}>tu trabajo.</span>
          </h1>
          <p style={s.heroSub}>
            Calcula tarifas, gestiona obras y controla tus ingresos. Todo lo que tu estudio necesita, en un solo lugar.
          </p>
          <div style={s.heroActions}>
            <button style={s.btnPrimary} onClick={() => irARegistro('free')}>Empezar gratis →</button>
            <button style={s.btnGhost} onClick={() => window.location.href = '/index.html'}>Ver demo ↗</button>
          </div>
        </div>
        <div style={s.mockup}>
          <div style={s.mockupHeader}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff5f57' }} />
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#febc2e' }} />
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#28c840' }} />
            <span style={{ fontSize: 11, color: T.textDim, marginLeft: 6, fontFamily: FONT }}>Calculadora de tarifas</span>
          </div>
          <div style={{ ...s.mockupRow }}>
            <span style={s.mockupLabel}>Superficie</span>
            <span style={{ ...s.mockupVal, color: T.textSec }}>120 m²</span>
          </div>
          {MOCK_ROWS.map(row => (
            <div key={row.label} style={{ ...s.mockupRow, opacity: row.dim ? 0.5 : 1 }}>
              <span style={s.mockupLabel}>{row.label}</span>
              <span style={s.mockupVal}>{row.val}</span>
            </div>
          ))}
          <div style={s.mockupTotal}>
            <span style={{ fontSize: 12, fontWeight: 700, color: T.accent, fontFamily: FONT }}>Total profesional</span>
            <span style={{ fontSize: 16, fontWeight: 800, color: T.accent, fontFamily: FONT }}>104.2 UF</span>
          </div>
        </div>
      </div>

      <div style={s.divider} />

      {/* Funcionalidades */}
      <section id="funciones" style={s.section}>
        <div style={s.sectionLabel}>Funcionalidades</div>
        <h2 style={s.sectionTitle}>Una plataforma,<br />nueve módulos</h2>
        <p style={s.sectionSub}>Cada herramienta diseñada para el flujo de trabajo de arquitectos e interioristas.</p>
        <div style={s.tabs}>
          {MODULES.map(m => (
            <button key={m.id} style={tabStyle(m.id)} onClick={() => setActiveTab(m.id)}>
              {m.icon} {m.label}
            </button>
          ))}
        </div>
        {activeModule && (
          <div style={s.tabContent}>
            <div style={s.tabIcon}>{activeModule.icon}</div>
            <div>
              <div style={s.tabTitle}>{activeModule.title}</div>
              <div style={s.tabDesc}>{activeModule.desc}</div>
              <div style={s.tabChips}>
                {activeModule.chips.map(chip => (
                  <span key={chip} style={s.chip}>{chip}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      <div style={s.divider} />

      {/* Planes */}
      <section id="planes" style={s.section}>
        <div style={s.pricingLayout}>
          <div>
            <div style={s.sectionLabel}>Planes</div>
            <h2 style={s.sectionTitle}>Empieza gratis,<br />crece cuando<br />quieras</h2>
            <p style={{ ...s.sectionSub, marginBottom: 0, marginTop: 14 }}>
              Sin compromisos. Cambia de plan en cualquier momento. Todas las funciones base incluidas desde el primer día.
            </p>
          </div>
          <div style={s.pricingCards}>
            {PLANS.map(plan => (
              <div key={plan.id} style={planCardStyle(plan)}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: plan.popular ? T.accent : T.textSec, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8, fontFamily: FONT }}>
                    {plan.name}
                    {plan.popular && (
                      <span style={{ background: T.badgeBg, color: T.badgeText, fontSize: 9, fontWeight: 700, padding: '2px 8px', borderRadius: 10, fontFamily: FONT }}>
                        Popular
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: 11, color: T.textDim, lineHeight: 1.6, fontFamily: FONT }}>
                    {plan.features.join(' · ')}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: T.text, fontFamily: FONT }}>
                    {plan.price}
                    <span style={{ fontSize: 11, fontWeight: 400, color: T.planPriceSub }}>{plan.period}</span>
                  </div>
                  <button style={{ ...planBtnStyle(plan.btnVariant), marginTop: 8, fontSize: 11, fontWeight: 700, padding: '6px 16px', borderRadius: 6, cursor: 'pointer', fontFamily: FONT, display: 'block' }} onClick={() => irARegistro(plan.id)}>
                    {plan.btnLabel}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={s.divider} />

      {/* CTA final */}
      <div style={s.ctaSection}>
        <h2 style={s.ctaTitle}>¿Listo para gestionar<br />tu estudio como un pro?</h2>
        <p style={s.ctaSub}>Únete a arquitectos e interioristas que ya usan PlanCost.</p>
        <button style={{ ...s.btnPrimary, fontSize: 14, padding: '14px 32px' }} onClick={() => irARegistro('free')}>Crear cuenta gratis →</button>
      </div>

      {/* Footer */}
      <footer style={s.footer}>
        <div style={{ ...s.logo }}>PLANCOST</div>
        <div style={{ fontSize: 11, color: T.textDim, fontFamily: FONT }}>© 2026 PlanCost · Para arquitectos e interioristas</div>
      </footer>
    </div>
  )
}
