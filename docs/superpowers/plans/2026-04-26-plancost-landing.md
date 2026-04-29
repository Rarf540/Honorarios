# PlanCost Landing Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir la landing page de PlanCost como segunda entrada Vite en el mismo repo, accesible en `/landing.html` en dev y como `dist/landing.html` en build.

**Architecture:** Dos archivos de datos (`themes.js`, `data.js`) + un componente React (`LandingPage.jsx`) con estilos 100% inline siguiendo el mismo patrón de `App.jsx`. Vite multi-entry para separar landing de la app existente sin tocar `App.jsx`.

**Tech Stack:** React 19, Vite 8, Vitest, @testing-library/react — sin dependencias adicionales de producción.

---

## Mapa de archivos

| Archivo | Acción | Responsabilidad |
|---------|--------|-----------------|
| `src/landing/themes.js` | Crear | Objetos DARK y LIGHT con todos los tokens de color |
| `src/landing/data.js` | Crear | Arrays MODULES (9 items) y PLANS (3 items) |
| `src/landing/LandingPage.jsx` | Crear | Componente principal con todas las secciones |
| `src/landing/LandingPage.test.jsx` | Crear | Tests de render, tema y tabs |
| `src/landing/main.jsx` | Crear | Entry point React para la landing |
| `landing.html` | Crear | Entry HTML de Vite para la landing |
| `vite.config.js` | Modificar | Agregar build multi-entry |
| `package.json` | Modificar | Agregar vitest + @testing-library/react |

---

## Task 1: Instalar dependencias de test y configurar Vitest

**Files:**
- Modify: `package.json`
- Modify: `vite.config.js`

- [ ] **Step 1: Instalar dependencias**

Desde `honorarios/`:
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

- [ ] **Step 2: Agregar script de test en package.json**

En `package.json`, agregar dentro de `"scripts"`:
```json
"test": "vitest run",
"test:watch": "vitest"
```

El bloque `scripts` completo queda:
```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "lint": "eslint .",
  "preview": "vite preview",
  "test": "vitest run",
  "test:watch": "vitest"
}
```

- [ ] **Step 3: Configurar Vitest en vite.config.js**

Reemplazar el contenido de `vite.config.js` con:
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test-setup.js',
  },
})
```

- [ ] **Step 4: Crear archivo de setup de tests**

Crear `src/test-setup.js`:
```js
import '@testing-library/jest-dom'
```

- [ ] **Step 5: Verificar que Vitest funciona**

```bash
cd honorarios && npm test
```

Resultado esperado: `No test files found` (sin errores de configuración).

- [ ] **Step 6: Commit**

```bash
git add package.json vite.config.js src/test-setup.js
git commit -m "chore: add vitest and testing-library setup"
```

---

## Task 2: Crear constantes de tema

**Files:**
- Create: `src/landing/themes.js`

- [ ] **Step 1: Crear el archivo**

Crear `src/landing/themes.js`:
```js
export const FONT = "'Century Gothic', CenturyGothic, AppleGothic, sans-serif";

export const DARK = {
  bg: "#0A0A0F",
  bgCard: "#0E0E17",
  bgBorder: "#2a2a3a",
  bgBorderLight: "rgba(179,179,200,0.07)",
  accent: "#C8A84B",
  accentBg: "rgba(200,168,75,0.1)",
  accentBorder: "rgba(200,168,75,0.3)",
  text: "#FFFFFF",
  textSec: "#888888",
  textMuted: "#666666",
  textDim: "#555555",
  btnPrimaryBg: "#C8A84B",
  btnPrimaryText: "#0A0A0F",
  navBg: "rgba(10,10,15,0.95)",
  navBorder: "#16161F",
  cardShadow: "0 0 60px rgba(200,168,75,0.08)",
  tabActiveBg: "#C8A84B",
  tabActiveText: "#0A0A0F",
  badgeBg: "#C8A84B",
  badgeText: "#0A0A0F",
  planPopularBorder: "#C8A84B",
  planPriceSub: "#555555",
  divider: "linear-gradient(to right, transparent, #2a2a3a, transparent)",
  ctaGradient: "linear-gradient(180deg, transparent, rgba(200,168,75,0.04))",
};

export const LIGHT = {
  bg: "#FAFAF8",
  bgCard: "#FFFFFF",
  bgBorder: "rgba(160,130,60,0.2)",
  bgBorderLight: "rgba(160,130,60,0.1)",
  accent: "#B07D2E",
  accentBg: "rgba(176,125,46,0.1)",
  accentBorder: "rgba(176,125,46,0.3)",
  text: "#2D1C06",
  textSec: "#A08840",
  textMuted: "#A08840",
  textDim: "#A08840",
  btnPrimaryBg: "#2D1C06",
  btnPrimaryText: "#FAFAF8",
  navBg: "rgba(250,250,248,0.95)",
  navBorder: "#F0EAE0",
  cardShadow: "0 4px 30px rgba(160,130,60,0.12)",
  tabActiveBg: "#2D1C06",
  tabActiveText: "#FAFAF8",
  badgeBg: "#2D1C06",
  badgeText: "#FAFAF8",
  planPopularBorder: "#B07D2E",
  planPriceSub: "#A08840",
  divider: "linear-gradient(to right, transparent, rgba(160,130,60,0.2), transparent)",
  ctaGradient: "linear-gradient(180deg, transparent, rgba(176,125,46,0.05))",
};
```

- [ ] **Step 2: Commit**

```bash
git add src/landing/themes.js
git commit -m "feat(landing): add Dark Gold and Light Ivory theme constants"
```

---

## Task 3: Crear constantes de datos

**Files:**
- Create: `src/landing/data.js`

- [ ] **Step 1: Crear el archivo**

Crear `src/landing/data.js`:
```js
export const MODULES = [
  {
    id: "honorarios",
    icon: "📐",
    label: "Honorarios",
    title: "Calculadora de Honorarios",
    desc: "Define tus tarifas en UF por m² para cada servicio. Recepción y levantamiento se calculan automáticamente como factor del Permiso de Edificación. Incluye renders, mobiliario personalizado y bundles de producción.",
    chips: ["✓ 5 servicios", "✓ UF + CLP", "✓ Renders", "✓ Mobiliario"],
  },
  {
    id: "presupuestos",
    icon: "📋",
    label: "Presupuestos",
    title: "Presupuestos profesionales",
    desc: "Crea y edita presupuestos completos con materiales, mano de obra y partidas personalizadas. Aplica márgenes y genera documentos listos para presentar al cliente.",
    chips: ["✓ Partidas", "✓ Márgenes", "✓ Materiales", "✓ Ilimitados en Plus"],
  },
  {
    id: "proyectos",
    icon: "🗂️",
    label: "Proyectos",
    title: "Control de Proyectos",
    desc: "Registra el avance de cada proyecto por etapas. Vincula presupuestos, clientes y documentos. Ten siempre claro qué está pendiente, en curso y terminado.",
    chips: ["✓ Etapas", "✓ Documentos", "✓ Estado"],
  },
  {
    id: "finanzas",
    icon: "💰",
    label: "Finanzas",
    title: "Control de Finanzas",
    desc: "Registra ingresos y egresos por proyecto. Visualiza el flujo financiero de tu estudio y controla lo cobrado versus lo pendiente.",
    chips: ["✓ Ingresos", "✓ Egresos", "✓ Por proyecto"],
  },
  {
    id: "clientes",
    icon: "👥",
    label: "Clientes",
    title: "Registro de Clientes y Proveedores",
    desc: "Centraliza el directorio de contactos. Vincula clientes a proyectos y registra proveedores con sus productos habituales.",
    chips: ["✓ Clientes", "✓ Proveedores", "✓ Vinculado a proyectos"],
  },
  {
    id: "pdf",
    icon: "📄",
    label: "PDF",
    title: "Exportación a PDF",
    desc: "Genera presupuestos y cotizaciones en PDF con tu nombre o logo, listos para enviar al cliente. Formato profesional con detalle de partidas y totales.",
    chips: ["✓ Diseño profesional", "✓ Logo propio", "✓ Plan Plus y Premium"],
  },
  {
    id: "ia",
    icon: "🤖",
    label: "Asistente IA",
    title: "Asistente IA",
    desc: "Busca automáticamente las últimas ofertas y productos nuevos en las páginas de tus proveedores favoritos. Siempre actualizado sin tener que revisar cada sitio manualmente.",
    chips: ["✓ Multi-proveedor", "✓ Precios actualizados", "✓ Solo Premium"],
  },
  {
    id: "escaneo",
    icon: "📷",
    label: "Escaneo",
    title: "Escaneo de Imágenes",
    desc: "Fotografía o sube pantallazos con productos y precios. La IA reconoce los artículos y los ingresa automáticamente a tu presupuesto. Ideal para catálogos y cotizaciones de proveedores.",
    chips: ["✓ OCR inteligente", "✓ Ingreso automático", "✓ Solo Premium"],
  },
  {
    id: "cuestionario",
    icon: "📝",
    label: "Cuestionario",
    title: "Cuestionario de Cliente",
    desc: "Crea un cuestionario personalizado con hasta 10 preguntas. Descárgalo como HTML y envíaselo al cliente. El cliente lo responde y genera un link — la IA guarda todo en tu base de datos automáticamente.",
    chips: ["✓ 10 preguntas editables", "✓ HTML descargable", "✓ Link de respuesta", "✓ IA guarda en tu BD"],
  },
];

export const PLANS = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "",
    features: ["3 presupuestos", "Calculadora de honorarios", "Sin PDF", "Sin IA"],
    popular: false,
    btnVariant: "dim",
    btnLabel: "Empezar →",
  },
  {
    id: "plus",
    name: "Plus",
    price: "$9",
    period: "/mes",
    features: ["Presupuestos ilimitados", "PDF", "Proyectos", "Finanzas", "Clientes y proveedores"],
    popular: true,
    btnVariant: "primary",
    btnLabel: "Elegir Plus →",
  },
  {
    id: "premium",
    name: "Premium",
    price: "$19",
    period: "/mes",
    features: ["Todo lo de Plus", "Asistente IA", "Escaneo de imágenes", "Cuestionario IA"],
    popular: false,
    btnVariant: "outline",
    btnLabel: "Elegir Premium →",
  },
];
```

- [ ] **Step 2: Commit**

```bash
git add src/landing/data.js
git commit -m "feat(landing): add modules and plans data"
```

---

## Task 4: Tests de LandingPage (escribir primero, fallarán)

**Files:**
- Create: `src/landing/LandingPage.test.jsx`

- [ ] **Step 1: Crear el archivo de tests**

Crear `src/landing/LandingPage.test.jsx`:
```jsx
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import LandingPage from './LandingPage'

describe('LandingPage', () => {
  it('renders the logo', () => {
    render(<LandingPage />)
    expect(screen.getAllByText('PLANCOST').length).toBeGreaterThan(0)
  })

  it('renders all 9 module tabs', () => {
    render(<LandingPage />)
    const tabLabels = ['Honorarios','Presupuestos','Proyectos','Finanzas',
      'Clientes','PDF','Asistente IA','Escaneo','Cuestionario']
    tabLabels.forEach(label => {
      expect(screen.getByText(label, { exact: false })).toBeInTheDocument()
    })
  })

  it('shows Honorarios content by default', () => {
    render(<LandingPage />)
    expect(screen.getByText('Calculadora de Honorarios')).toBeInTheDocument()
  })

  it('switches module content when tab is clicked', () => {
    render(<LandingPage />)
    fireEvent.click(screen.getByText('Presupuestos', { exact: false }))
    expect(screen.getByText('Presupuestos profesionales')).toBeInTheDocument()
  })

  it('renders all 3 plan names', () => {
    render(<LandingPage />)
    expect(screen.getByText('Free')).toBeInTheDocument()
    expect(screen.getByText('Plus')).toBeInTheDocument()
    expect(screen.getByText('Premium')).toBeInTheDocument()
  })

  it('shows Popular badge on Plus plan', () => {
    render(<LandingPage />)
    expect(screen.getByText('Popular')).toBeInTheDocument()
  })

  it('toggles to light theme when button is clicked', () => {
    render(<LandingPage />)
    const toggleBtn = screen.getByRole('button', { name: /claro/i })
    fireEvent.click(toggleBtn)
    expect(screen.getByRole('button', { name: /oscuro/i })).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Ejecutar tests para confirmar que fallan**

```bash
cd honorarios && npm test
```

Resultado esperado: `Cannot find module './LandingPage'` — confirma que los tests están bien escritos y esperando la implementación.

- [ ] **Step 3: Commit**

```bash
git add src/landing/LandingPage.test.jsx
git commit -m "test(landing): add LandingPage tests (red)"
```

---

## Task 5: Implementar LandingPage

**Files:**
- Create: `src/landing/LandingPage.jsx`

- [ ] **Step 1: Crear el componente**

Crear `src/landing/LandingPage.jsx`:
```jsx
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
          <button style={s.navLink}>Funciones</button>
          <button style={s.navLink}>Planes</button>
          <button style={s.navLink}>Para quién</button>
          <button style={s.navCta}>Empezar gratis</button>
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
            Honorarios, presupuestos, proyectos y finanzas para arquitectos e interioristas. Todo en una plataforma.
          </p>
          <div style={s.heroActions}>
            <button style={s.btnPrimary}>Empezar gratis →</button>
            <button style={s.btnGhost}>Ver demo ↗</button>
          </div>
        </div>
        <div style={s.mockup}>
          <div style={s.mockupHeader}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff5f57' }} />
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#febc2e' }} />
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#28c840' }} />
            <span style={{ fontSize: 11, color: T.textDim, marginLeft: 6, fontFamily: FONT }}>Calculadora de honorarios</span>
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
            <span style={{ fontSize: 12, fontWeight: 700, color: T.accent, fontFamily: FONT }}>Total honorarios</span>
            <span style={{ fontSize: 16, fontWeight: 800, color: T.accent, fontFamily: FONT }}>104.2 UF</span>
          </div>
        </div>
      </div>

      <div style={s.divider} />

      {/* Funcionalidades */}
      <section style={s.section}>
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
      <section style={s.section}>
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
                  <button style={{ ...planBtnStyle(plan.btnVariant), marginTop: 8, fontSize: 11, fontWeight: 700, padding: '6px 16px', borderRadius: 6, cursor: 'pointer', fontFamily: FONT, display: 'block' }}>
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
        <button style={{ ...s.btnPrimary, fontSize: 14, padding: '14px 32px' }}>Crear cuenta gratis →</button>
      </div>

      {/* Footer */}
      <footer style={s.footer}>
        <div style={{ ...s.logo }}>PLANCOST</div>
        <div style={{ fontSize: 11, color: T.textDim, fontFamily: FONT }}>© 2026 PlanCost · Para arquitectos e interioristas</div>
      </footer>
    </div>
  )
}
```

- [ ] **Step 2: Ejecutar los tests — deben pasar**

```bash
cd honorarios && npm test
```

Resultado esperado:
```
✓ renders the logo
✓ renders all 9 module tabs
✓ shows Honorarios content by default
✓ switches module content when tab is clicked
✓ renders all 3 plan names
✓ shows Popular badge on Plus plan
✓ toggles to light theme when button is clicked

Test Files  1 passed (1)
Tests       7 passed (7)
```

- [ ] **Step 3: Commit**

```bash
git add src/landing/LandingPage.jsx
git commit -m "feat(landing): implement LandingPage component (green)"
```

---

## Task 6: Crear entry point y configurar Vite multi-entry

**Files:**
- Create: `src/landing/main.jsx`
- Create: `landing.html`
- Modify: `vite.config.js`

- [ ] **Step 1: Crear src/landing/main.jsx**

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import LandingPage from './LandingPage'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LandingPage />
  </StrictMode>
)
```

- [ ] **Step 2: Crear landing.html en la raíz del proyecto**

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="PlanCost — Suite profesional para arquitectos e interioristas" />
    <title>PlanCost</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/landing/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 3: Actualizar vite.config.js con multi-entry**

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        landing: resolve(__dirname, 'landing.html'),
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test-setup.js',
  },
})
```

- [ ] **Step 4: Verificar en dev — abrir la landing**

```bash
cd honorarios && npm run dev
```

Abrir en el navegador: `http://localhost:5173/landing.html`

Verificar que se ve la landing completa con:
- Navbar con logo PLANCOST
- Hero con mockup de la calculadora
- 9 tabs de funcionalidades clickeables
- Sección de planes en split
- CTA final y footer
- Toggle de tema funcional

- [ ] **Step 5: Verificar que la app existente sigue intacta**

Abrir: `http://localhost:5173/` — debe mostrar la calculadora de honorarios sin cambios.

- [ ] **Step 6: Verificar el build de producción**

```bash
cd honorarios && npm run build
```

Resultado esperado: sin errores, y en `dist/` aparecen `index.html` y `landing.html`.

- [ ] **Step 7: Commit final**

```bash
git add src/landing/main.jsx landing.html vite.config.js
git commit -m "feat(landing): add Vite multi-entry for landing page"
```

---

## Self-Review

**Cobertura del spec:**
- ✅ Navbar con logo, links y CTA sticky
- ✅ Hero split: texto + mockup calculadora
- ✅ 9 módulos con tabs interactivos
- ✅ Módulo Cuestionario con descripción del flujo (landing solo — el flujo real es out of scope)
- ✅ Planes en layout split izquierda/derecha
- ✅ Free ($0) / Plus ($9/mes) / Premium ($19/mes)
- ✅ Plus con badge Popular y borde acento
- ✅ Botones diferenciados por plan
- ✅ CTA final con gradiente
- ✅ Footer
- ✅ Tema Dark Gold + Light Ivory
- ✅ Toggle fijo ◑ Claro / ◑ Oscuro
- ✅ Tipografía Century Gothic
- ✅ Estilos 100% inline (mismo patrón App.jsx)
- ✅ Sin nuevas dependencias de producción
- ✅ App existente intacta

**Out of scope confirmado:** autenticación, pagos, backend del cuestionario, mobile-first.
