# PlanCost — Landing Page Design Spec

## Producto

**PlanCost** es una suite SaaS por suscripción dirigida a arquitectos e interioristas en Chile. Centraliza honorarios, presupuestos, proyectos, finanzas, clientes, proveedores y herramientas de IA en una sola plataforma.

---

## Estructura de la landing (narrativa de una página)

Secciones en orden:

1. Navbar
2. Hero
3. Funcionalidades (9 módulos con tabs interactivos)
4. Planes (split: título izquierda, cards derecha)
5. CTA final
6. Footer

---

## 1. Navbar

- Logo: `PLANCOST` — tipografía bold, color acento
- Links: Funciones · Planes · Para quién
- CTA: botón "Empezar gratis" — color primario
- Sticky con blur/transparencia al hacer scroll

---

## 2. Hero

**Layout:** grid 2 columnas — texto izquierda, mockup de app derecha.

**Texto:**
- Badge: "Suite profesional AEC"
- Título: *Gestiona tu estudio. Cobra lo que vale tu trabajo.*
- Subtítulo: descripción breve de la plataforma
- CTAs: "Empezar gratis →" (primario) + "Ver demo ↗" (ghost)

**Mockup derecha:** preview de la calculadora de honorarios con filas de servicios y total en UF.

---

## 3. Funcionalidades — 9 módulos con tabs

El visitante hace clic en cada tab y ve la descripción completa del módulo. Un módulo activo a la vez.

| Tab | Módulo | Descripción clave |
|-----|--------|-------------------|
| 📐 | Honorarios | Tarifas UF/m², servicios derivados (recepción/levantamiento), renders, mobiliario |
| 📋 | Presupuestos | Partidas, márgenes, materiales — ilimitados en Plus |
| 🗂️ | Proyectos | Etapas, documentos, estado por proyecto |
| 💰 | Finanzas | Ingresos/egresos por proyecto, flujo del estudio |
| 👥 | Clientes | Directorio de clientes y proveedores, vinculado a proyectos |
| 📄 | PDF | Exportación profesional con logo propio — Plus y Premium |
| 🤖 | Asistente IA | Búsqueda automática de ofertas en páginas de proveedores — Premium |
| 📷 | Escaneo | OCR de imágenes/pantallazos → ingreso automático a presupuesto — Premium |
| 📝 | Cuestionario | Formulario HTML descargable + link de respuesta del cliente — Premium |

### Módulo Cuestionario — detalle técnico

**Flujo del diseñador:**
1. Edita las 10 preguntas personalizables en la plataforma (tipo de pregunta libre)
2. Descarga el formulario como HTML autónomo
3. Envía el HTML al cliente (correo, WhatsApp, etc.)
4. Recibe el link de respuesta generado por el cliente y lo carga en la plataforma

**Flujo del cliente:**
1. Abre el HTML localmente en su navegador
2. Llena la sección de datos de contacto: nombre, domicilio, correo, teléfono
3. Responde las 10 preguntas del diseñador
4. Hace clic en "Enviar respuesta" → se genera un link único con los datos codificados
5. Envía ese link al diseñador

**Backend:**
- Al cargar el link, el agente de IA procesa la respuesta y guarda los datos en la base de datos del diseñador
- Los datos del cliente se agregan automáticamente al módulo de Clientes
- Las respuestas quedan vinculadas al proyecto correspondiente

---

## 4. Planes

**Layout:** grid 2 columnas — descripción/título a la izquierda, cards apiladas a la derecha.

| Plan | Precio | Incluye |
|------|--------|---------|
| Free | $0 | 3 presupuestos, calculadora de honorarios. Sin PDF, sin IA |
| Plus | $9/mes | Presupuestos ilimitados, PDF, proyectos, finanzas, clientes/proveedores |
| Premium | $19/mes | Todo lo de Plus + Asistente IA + Escaneo de imágenes + Cuestionario IA |

- Plan Plus destacado con badge "Popular" y borde color acento
- Botones diferenciados por plan: Free→dim, Plus→primario, Premium→outline

---

## 5. CTA Final

Sección centrada con gradiente sutil hacia el fondo.

- Título: *¿Listo para gestionar tu estudio como un pro?*
- Subtítulo: social proof breve
- Botón: "Crear cuenta gratis →"

---

## 6. Footer

- Logo + tagline
- Copyright

---

## Temas visuales

### Dark (default) — "Dark Gold"
- Fondo: `#0A0A0F`
- Acento principal: `#C8A84B`
- Texto primario: `#FFFFFF`
- Texto secundario: `#666`
- Cards: `#0E0E17`, borde `#2a2a3a`

### Light — "Light Ivory"
- Fondo: `#FAFAF8`
- Acento principal: `#B07D2E`
- Texto primario: `#2D1C06`
- Texto secundario: `#A08840`
- Cards: `#FFFFFF`, borde `rgba(160,130,60,0.2)`

Toggle de tema: botón fijo arriba a la derecha (◑ Claro / ◑ Oscuro).

---

## Tipografía

Century Gothic / CenturyGothic / AppleGothic / sans-serif — consistente con la app existente.

---

## Stack de implementación

- React 19 + Vite (mismo repo que la calculadora, en `/landing/` o como ruta nueva)
- Estilos inline con objeto de tema (mismo patrón que `App.jsx`)
- Sin dependencias externas adicionales para la landing

---

## Fuera de alcance (este spec)

- Autenticación / registro real
- Backend de suscripciones / pagos
- Página de dashboard post-login
- Versión mobile-first (se diseña desktop-first, responsive como mejora posterior)
