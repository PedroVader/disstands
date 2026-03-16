# DISSTANDS — Arquitectura de Producto v1.0

> **Documento técnico interno** · Fast Horizons · Marzo 2026 · Confidencial
>
> Este documento define la arquitectura completa de la plataforma Disstands: ecommerce de pavimentos feriales, panel de administración, herramienta "Monta tu Feria" con IA, y plan de migración desde WordPress.

---

## 1. Principios Fundamentales

La plataforma se rige por 5 principios que no se negocian:

1. **Sin registro público.** Nadie externo puede crearse una cuenta. Los usuarios del panel se crean exclusivamente por invitación del administrador. Los clientes del ecommerce compran como invitados — no necesitan cuenta.
2. **Cada rol ve solo lo suyo.** Los permisos se aplican a nivel de base de datos (Row Level Security), no solo de interfaz. Un instalador no puede ver precios aunque manipule la URL.
3. **WordPress desaparece por completo.** No conviven dos sistemas. Se migra todo y se apaga. Cero dependencia del sistema antiguo.
4. **La IA es funcional, no decorativa.** Cada integración de IA resuelve un problema concreto y medible: chatbot que cualifica, planos que se generan, contenido SEO que se posiciona.
5. **MVP primero.** Se lanza lo esencial y se itera. No se construye nada que no se vaya a usar en los próximos 3 meses.

---

## 2. Stack Tecnológico

| Capa | Tecnología | Justificación |
|------|-----------|---------------|
| Frontend | Next.js 14+ (App Router, TypeScript) | SSR para SEO, React ecosystem, rutas dinámicas |
| Estilos | Tailwind CSS + shadcn/ui | Rápido, consistente, responsive |
| Backend / API | Next.js API Routes + tRPC | Full-stack en un proyecto, type-safe end-to-end |
| Base de datos | PostgreSQL (Supabase) | Auth, RLS, real-time, storage incluido |
| Auth | Supabase Auth + RLS | Solo invitación, permisos a nivel de BD |
| Pagos | TPV Virtual (Redsys / Santander) | Pasarela bancaria española, PCI compliant, sin comisiones de plataforma |
| IA | Claude API (vía Trovald) | Chatbot, planos, contenido SEO |
| Email | Resend + React Email | Transaccional y marketing |
| Storage | Supabase Storage | Imágenes, PDFs, CADs, fotos de montaje |
| Hosting | Vercel | Deploy automático, CDN, edge functions |
| Analytics | Plausible o PostHog | Privacy-first, eventos custom |

---

## 3. Identidad Visual y Diseño

### 3.1. Paleta de colores

```
┌─────────────────────────────────────────────────┐
│              PALETA DISSTANDS                    │
├─────────────────────────────────────────────────┤
│                                                 │
│   NEGRO        #0A0A0A    → Fondo principal     │
│   NEGRO SUAVE  #1A1A1A    → Fondos secundarios  │
│   BLANCO       #FFFFFF    → Texto principal      │
│   BLANCO CREMA #F5F5F5    → Fondos claros       │
│   ROJO         #E30613    → Acento, CTAs, hover  │
│   ROJO OSCURO  #B80510    → Hover sobre rojo     │
│   GRIS CLARO   #E5E5E5    → Bordes, separadores │
│   GRIS MEDIO   #6B6B6B    → Texto secundario     │
│                                                 │
│   Modo oscuro: fondo negro, texto blanco,       │
│   acentos rojos.                                │
│                                                 │
│   Modo claro: fondo blanco, texto negro,        │
│   acentos rojos.                                │
│                                                 │
│   El rojo SOLO se usa para:                     │
│   - Botones CTA principales                     │
│   - Hover states                                │
│   - Badges y notificaciones                     │
│   - Detalles de marca (logo, iconos key)        │
│   NUNCA para fondos grandes ni texto largo.     │
│                                                 │
└─────────────────────────────────────────────────┘
```

### 3.2. Tipografía

Para posicionar Disstands como marca global, se necesitan fuentes con carácter propio que no sean las genéricas de siempre (nada de Inter, Roboto, Montserrat).

**Headings → Clash Display (Indian Type Foundry)**
- Geométrica, bold, con personalidad industrial.
- Transmite fuerza, modernidad y escala.
- Gratuita para web (Google Fonts no, pero CDN disponible via Fontshare).
- Alternativa gratuita si hay problemas de licencia: **Syne** (Google Fonts).

**Body → General Sans (Indian Type Foundry)**
- Limpia, profesional, excelente legibilidad en pantalla.
- Familia completa de pesos (300-700).
- Soporta caracteres latinos extendidos (ES, CA, EN, DE).
- Alternativa gratuita: **Outfit** (Google Fonts).

**Monospace (código, datos técnicos) → JetBrains Mono**
- Para tablas de specs, fichas técnicas, m², precios.

```
Jerarquía tipográfica:
─────────────────────────────────────────
H1    Clash Display Bold      40-48px
H2    Clash Display Semibold  32-36px
H3    Clash Display Medium    24-28px
Body  General Sans Regular    16-18px
Small General Sans Regular    14px
Label General Sans Medium     12-13px (uppercase, tracking +0.05em)
─────────────────────────────────────────
```

### 3.3. Principios de diseño

1. **Contraste fuerte.** Negro sobre blanco o blanco sobre negro. Sin grises ambiguos. El rojo es el acento que guía la mirada.
2. **Espacios amplios.** Mucho padding, mucho margen. El producto (las moquetas, los stands) son visuales — necesitan respirar.
3. **Fotografía real.** Nada de stock genérico. Fotos de instalaciones reales, ferias reales, producto real. Esto diferencia de la competencia.
4. **Micro-interacciones.** Hover suaves en productos, transiciones de página, loading states con la marca. Detalles premium.
5. **Mobile-first.** El 63% de las impresiones vienen de móvil (dato de GSC). Todo se diseña primero para pantalla pequeña.

### 3.4. Aplicación por sección

| Sección | Fondo | Estilo |
|---------|-------|--------|
| Home hero | Negro #0A0A0A | Texto blanco grande, CTA rojo, foto de instalación a sangre |
| Catálogo | Blanco #FFFFFF | Grid limpio, cards con sombra sutil, filtros minimalistas |
| Ficha producto | Blanco | Foto grande izquierda, specs derecha, CTA rojo "Añadir" |
| Monta tu Feria | Negro | Wizard paso a paso, plano generado sobre fondo oscuro |
| Blog | Blanco #F5F5F5 | Tipografía editorial, imágenes grandes, lectura cómoda |
| Panel Admin | Gris claro #F5F5F5 | UI funcional, sin decoración, foco en datos |
| Footer | Negro #0A0A0A | Logo blanco, links organizados, rojo en hover |

---

## 4. Autenticación y Seguridad

### 3.1. Política de acceso

```
┌─────────────────────────────────────────────────────┐
│                  ACCESO A LA PLATAFORMA              │
├─────────────────────────────────────────────────────┤
│                                                     │
│   WEB PÚBLICA (/)                                   │
│   ✅ Cualquier visitante                            │
│   ✅ Sin login                                      │
│   ✅ Catálogo, blog, portfolio, contacto            │
│   ✅ Ecommerce (compra como invitado)               │
│   ✅ Monta tu Feria (wizard IA)                     │
│   ✅ Chatbot IA                                     │
│   ❌ NO hay botón de registro                       │
│   ❌ NO hay "crear cuenta"                          │
│   ❌ NO hay login público                           │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│   PANEL ADMIN (/admin)                              │
│   🔒 Solo usuarios invitados por el admin           │
│   🔒 Login en /admin/login (oculto, sin enlace)     │
│   🔒 Magic link por email (sin contraseña)          │
│   🔒 RLS en cada tabla de la BD                     │
│   🔒 Middleware Next.js verifica sesión + rol        │
│   ❌ NO hay registro                                │
│   ❌ NO hay "olvidé mi contraseña" público          │
│   ❌ NO hay OAuth / Google login                    │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### 3.2. Flujo de alta de usuario (solo admin)

```
Admin abre /admin/config/usuarios
        │
        ▼
Pulsa "Nuevo usuario"
        │
        ▼
Introduce: email + nombre + rol
        │
        ▼
Sistema crea cuenta en Supabase Auth
+ fila en tabla profiles (role, org_id)
        │
        ▼
Se envía magic link al email del usuario
        │
        ▼
El usuario hace clic → accede al panel
Solo ve las secciones de su rol
```

### 3.3. Roles y permisos

| Rol | Dashboard | Productos | Pedidos | Inventario | Calendario | Finanzas | Config |
|-----|-----------|-----------|---------|------------|------------|----------|--------|
| **Admin** | ✅ | ✅ CRUD | ✅ todo | ✅ todo | ✅ todo | ✅ todo | ✅ |
| **Comercial** | ✅ parcial | ✅ solo ver | ✅ crear/editar | ❌ | ✅ ver | ❌ | ❌ |
| **Logística** | ✅ parcial | ✅ solo ver | ✅ solo ver estado | ✅ todo | ✅ todo | ❌ | ❌ |
| **Instalador** | ❌ | ❌ | ❌ | ❌ | ✅ solo sus eventos | ❌ | ❌ |

**Implementación:** Cada tabla tiene políticas RLS en Supabase. El middleware de Next.js (`middleware.ts`) intercepta todas las rutas `/admin/*` y verifica:

1. Sesión activa en Supabase Auth.
2. Rol del usuario en `profiles`.
3. Permiso para la ruta solicitada.

Si falla cualquier check → redirect a `/admin/login`.

---

## 5. Arquitectura de Rutas

### 5.1. Estructura de idiomas

```
Idioma por defecto: Español (sin prefijo)
Idiomas adicionales: Catalán (/ca/), Inglés (/en/)

disstands.com/                    → Español (default)
disstands.com/ca/                 → Catalán
disstands.com/en/                 → English

El panel admin NO tiene prefijo de idioma.
El panel admin NO se traduce (solo uso interno en español).
```

**¿Por qué subcarpetas y no subdominios?**
- Google recomienda subcarpetas para SEO multiidioma.
- Toda la autoridad SEO se acumula en un solo dominio.
- Next.js tiene i18n routing nativo en App Router.
- No hay que configurar DNS, SSL ni cookies por separado.

**Etiquetas hreflang en cada página:**
```html
<link rel="alternate" hreflang="es" href="https://disstands.com/catalogo/" />
<link rel="alternate" hreflang="ca" href="https://disstands.com/ca/cataleg/" />
<link rel="alternate" hreflang="en" href="https://disstands.com/en/catalog/" />
<link rel="alternate" hreflang="x-default" href="https://disstands.com/catalogo/" />
```

### 5.2. Rutas públicas — Español (default, sin prefijo)

```
/                          → Home (landing, hero, servicios, CTA)
/catalogo                  → Grid de productos con filtros
/catalogo/[slug]           → Ficha de producto (fotos, specs, carrito)
/monta-tu-feria            → Wizard IA (formulario + plano + presupuesto)
/carrito                   → Resumen de compra
/checkout                  → Datos + pago TPV Virtual (Redsys)
/checkout/confirmacion     → Pedido confirmado
/blog                      → Listado de artículos SEO
/blog/[slug]               → Artículo individual
/portfolio                 → Galería de trabajos realizados
/contacto                  → Formulario + WhatsApp + chatbot
/equipo                    → Página de equipo
/legal/privacidad          → Política de privacidad
/legal/condiciones         → Términos y condiciones
```

### 5.3. Rutas públicas — Catalán (/ca/)

```
/ca/                       → Inici
/ca/cataleg                → Catàleg de productes
/ca/cataleg/[slug]         → Fitxa de producte
/ca/munta-la-teva-fira     → Wizard IA en català
/ca/cistella               → Cistella de compra
/ca/blog                   → Blog en català
/ca/blog/[slug]            → Article
/ca/portfolio              → Treballs realitzats
/ca/contacte               → Formulari + WhatsApp + chatbot
```

### 5.4. Rutas públicas — English (/en/)

```
/en/                       → Home
/en/catalog                → Product catalog
/en/catalog/[slug]         → Product page
/en/build-your-fair        → AI Wizard
/en/cart                   → Shopping cart
/en/blog                   → Blog in English
/en/blog/[slug]            → Article
/en/portfolio              → Our work
/en/contact                → Contact + WhatsApp + chatbot
```

### 5.5. Rutas privadas — Panel admin (sin idioma)

```
/admin/login               → Login por magic link (SIN enlace público)

/admin                     → Dashboard (métricas, alertas, calendario)
/admin/productos           → Listado de productos
/admin/productos/nuevo     → Crear producto
/admin/productos/[id]      → Editar producto
/admin/pedidos             → Listado de pedidos
/admin/pedidos/[id]        → Detalle de pedido
/admin/inventario          → Stock por producto/variante
/admin/inventario/movimientos → Historial de entradas/salidas
/admin/calendario          → Vista mes/semana de eventos
/admin/calendario/[id]     → Detalle de evento/feria
/admin/finanzas            → Balance, gráficas, ingresos vs gastos
/admin/finanzas/nuevo      → Registrar ingreso o gasto
/admin/clientes            → Listado de clientes
/admin/clientes/[id]       → Ficha de cliente + historial
/admin/blog                → Editor de artículos
/admin/blog/[id]           → Editar artículo
/admin/landings            → Listado de landing pages SEO
/admin/landings/nueva      → Crear landing (wizard con IA)
/admin/landings/[id]       → Editar landing
/admin/portfolio           → Gestión de trabajos/fotos
/admin/config              → Datos empresa, tarifas base
/admin/config/usuarios     → Gestión de usuarios (solo admin)
```

### 5.6. Slugs de productos — Estrategia multi-idioma

Los slugs de producto se mantienen en español en todos los idiomas para no multiplicar URLs:

```
/catalogo/moqueta-las-vegas/         → Ficha en español
/ca/cataleg/moqueta-las-vegas/       → Ficha en catalán (mismo slug)
/en/catalog/moqueta-las-vegas/       → Ficha en inglés (mismo slug)
```

Solo se traduce la UI (botones, descripciones, filtros, textos de la ficha). El slug no cambia. Esto simplifica enormemente la gestión de 273 productos.

---

## 6. Schema de Base de Datos

### 6.1. Auth y Usuarios

```sql
-- Extiende Supabase Auth. NO tiene registro público.
CREATE TABLE profiles (
  id            UUID PRIMARY KEY REFERENCES auth.users(id),
  email         TEXT NOT NULL,
  full_name     TEXT NOT NULL,
  role          TEXT NOT NULL CHECK (role IN ('admin','comercial','logistica','instalador')),
  avatar_url    TEXT,
  is_active     BOOLEAN DEFAULT true,
  created_at    TIMESTAMPTZ DEFAULT now()
);

-- RLS: cada usuario solo lee su propio perfil. Admin lee todos.
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
```

### 6.2. Catálogo de Productos

```sql
CREATE TABLE categories (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  slug          TEXT UNIQUE NOT NULL,
  description   TEXT,
  image_url     TEXT,
  parent_id     UUID REFERENCES categories(id),
  sort_order    INT DEFAULT 0
);

CREATE TABLE products (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  slug          TEXT UNIQUE NOT NULL,
  description   TEXT,
  category_id   UUID REFERENCES categories(id),
  price_per_m2  DECIMAL(10,2) NOT NULL,
  min_m2        DECIMAL(10,2) DEFAULT 1,
  material      TEXT,               -- "moqueta", "vinilo", "cesped", "tarima"
  thickness     TEXT,               -- "3mm", "5mm", "7mm"
  colors        TEXT[],             -- ["#C0392B", "#2E86C1", "#27AE60"]
  images        TEXT[],             -- URLs en Supabase Storage
  featured      BOOLEAN DEFAULT false,
  active        BOOLEAN DEFAULT true,
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE product_variants (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id    UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  color         TEXT NOT NULL,
  sku           TEXT UNIQUE,
  stock_m2      DECIMAL(10,2) DEFAULT 0,   -- m² disponibles reales
  reserved_m2   DECIMAL(10,2) DEFAULT 0,   -- m² asignados a pedidos
  created_at    TIMESTAMPTZ DEFAULT now()
);

-- Índices
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_active ON products(active) WHERE active = true;
CREATE INDEX idx_variants_product ON product_variants(product_id);
CREATE INDEX idx_variants_sku ON product_variants(sku);
```

### 6.3. Clientes y Pedidos

```sql
-- Clientes del ecommerce. NO son usuarios del sistema.
-- Se crean automáticamente al comprar.
CREATE TABLE clients (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company       TEXT,
  contact_name  TEXT NOT NULL,
  email         TEXT NOT NULL,
  phone         TEXT,
  address       TEXT,
  city          TEXT,
  nif           TEXT,
  notes         TEXT,
  total_spent   DECIMAL(10,2) DEFAULT 0,
  order_count   INT DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE orders (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number      TEXT UNIQUE NOT NULL,    -- DIS-2026-0001
  client_id         UUID NOT NULL REFERENCES clients(id),
  status            TEXT NOT NULL DEFAULT 'pendiente'
                    CHECK (status IN ('pendiente','pagado','preparacion',
                                      'enviado','instalado','completado','cancelado')),
  subtotal          DECIMAL(10,2) NOT NULL,
  shipping          DECIMAL(10,2) DEFAULT 0,
  total             DECIMAL(10,2) NOT NULL,
  tpv_order_id      TEXT,                    -- ID de operación Redsys
  tpv_auth_code     TEXT,                    -- Código de autorización del banco
  needs_install     BOOLEAN DEFAULT false,   -- ¿necesita instalación?
  install_address   TEXT,                     -- dirección de la feria/evento
  install_date      DATE,
  notes             TEXT,
  created_at        TIMESTAMPTZ DEFAULT now(),
  updated_at        TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE order_lines (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id      UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id    UUID NOT NULL REFERENCES products(id),
  variant_id    UUID REFERENCES product_variants(id),
  m2            DECIMAL(10,2) NOT NULL,
  price_per_m2  DECIMAL(10,2) NOT NULL,     -- precio snapshot (no cambia si sube)
  line_total    DECIMAL(10,2) NOT NULL,
  created_at    TIMESTAMPTZ DEFAULT now()
);

-- Índices
CREATE INDEX idx_orders_client ON orders(client_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_order_lines_order ON order_lines(order_id);
```

### 6.4. Calendario y Eventos

```sql
CREATE TABLE events (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,               -- "MWC 2026"
  venue         TEXT,                        -- "Fira Barcelona"
  city          TEXT,
  start_date    DATE NOT NULL,
  end_date      DATE NOT NULL,
  setup_date    DATE,                        -- día de montaje
  teardown_date DATE,                        -- día de desmontaje
  status        TEXT DEFAULT 'planificado'
                CHECK (status IN ('planificado','montaje','activo',
                                  'desmontaje','completado','cancelado')),
  client_id     UUID REFERENCES clients(id),
  order_id      UUID REFERENCES orders(id),
  m2_total      DECIMAL(10,2),               -- m² contratados
  material_notes TEXT,
  team_notes    TEXT,
  notes         TEXT,
  created_by    UUID REFERENCES profiles(id),
  created_at    TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE event_photos (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id      UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  image_url     TEXT NOT NULL,
  caption       TEXT,
  is_portfolio  BOOLEAN DEFAULT false,       -- si true, se muestra en /portfolio
  uploaded_by   UUID REFERENCES profiles(id),
  created_at    TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_events_dates ON events(start_date, end_date);
CREATE INDEX idx_events_status ON events(status);
```

### 6.5. Inventario

```sql
CREATE TABLE inventory_movements (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id    UUID NOT NULL REFERENCES products(id),
  variant_id    UUID REFERENCES product_variants(id),
  type          TEXT NOT NULL
                CHECK (type IN ('entrada','salida','reserva','devolucion','ajuste')),
  m2            DECIMAL(10,2) NOT NULL,      -- positivo = entra, negativo = sale
  reason        TEXT,                        -- "Compra proveedor X", "Instalación MWC"
  order_id      UUID REFERENCES orders(id),
  event_id      UUID REFERENCES events(id),
  created_by    UUID NOT NULL REFERENCES profiles(id),
  created_at    TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE stock_alerts (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id    UUID NOT NULL REFERENCES products(id),
  variant_id    UUID REFERENCES product_variants(id),
  min_m2        DECIMAL(10,2) NOT NULL,      -- alerta si stock baja de esto
  is_active     BOOLEAN DEFAULT true
);

-- Trigger: actualiza stock_m2 en product_variants al insertar movimiento
-- (se implementa como función PostgreSQL + trigger)
```

### 6.6. Finanzas (Ganancias y Gastos)

```sql
CREATE TABLE finance_categories (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,               -- "Material", "Transporte", "Personal"
  type          TEXT NOT NULL CHECK (type IN ('ingreso','gasto')),
  color         TEXT,                        -- hex para gráficas
  icon          TEXT                         -- emoji o icono
);

CREATE TABLE finance_entries (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type          TEXT NOT NULL CHECK (type IN ('ingreso','gasto')),
  category_id   UUID REFERENCES finance_categories(id),
  description   TEXT NOT NULL,
  amount        DECIMAL(10,2) NOT NULL,      -- siempre positivo
  date          DATE NOT NULL,
  order_id      UUID REFERENCES orders(id),  -- vincular a pedido (opcional)
  event_id      UUID REFERENCES events(id),  -- vincular a evento (opcional)
  receipt_url   TEXT,                        -- foto del justificante
  created_by    UUID NOT NULL REFERENCES profiles(id),
  created_at    TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_finance_date ON finance_entries(date);
CREATE INDEX idx_finance_type ON finance_entries(type);
```

### 6.7. Blog y Portfolio

```sql
CREATE TABLE blog_posts (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title           TEXT NOT NULL,
  slug            TEXT UNIQUE NOT NULL,
  content         TEXT NOT NULL,              -- MDX o HTML
  excerpt         TEXT,
  cover_image     TEXT,
  seo_title       TEXT,
  seo_description TEXT,
  status          TEXT DEFAULT 'borrador' CHECK (status IN ('borrador','publicado')),
  author_id       UUID REFERENCES profiles(id),
  published_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE portfolio_items (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title         TEXT NOT NULL,
  description   TEXT,
  images        TEXT[],
  event_id      UUID REFERENCES events(id),
  featured      BOOLEAN DEFAULT false,
  sort_order    INT DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT now()
);
```

### 6.8. IA — Chatbot y Monta tu Feria

```sql
CREATE TABLE chat_sessions (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id    TEXT NOT NULL,               -- cookie o fingerprint anónimo
  client_id     UUID REFERENCES clients(id), -- si se identifica después
  status        TEXT DEFAULT 'activa' CHECK (status IN ('activa','cerrada','convertida')),
  lead_score    INT DEFAULT 0,               -- 0-100, calculado por IA
  started_at    TIMESTAMPTZ DEFAULT now(),
  ended_at      TIMESTAMPTZ
);

CREATE TABLE chat_messages (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id    UUID NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,
  role          TEXT NOT NULL CHECK (role IN ('user','assistant')),
  content       TEXT NOT NULL,
  created_at    TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE fair_planner_sessions (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id    TEXT NOT NULL,
  inputs_json   JSONB NOT NULL,              -- datos del wizard completo
  plan_json     JSONB,                       -- plano generado por IA
  quote_total   DECIMAL(10,2),
  converted     BOOLEAN DEFAULT false,       -- si acabó en pedido
  order_id      UUID REFERENCES orders(id),
  created_at    TIMESTAMPTZ DEFAULT now()
);
```

---

## 7. Flujo del Ecommerce

```
Visitante llega a /catalogo
        │
        ▼
Navega productos (filtros: tipo, color, precio, uso)
        │
        ▼
Entra en /catalogo/[slug] → ficha de producto
Elige color (variante) + introduce m²
Ve precio en tiempo real
        │
        ▼
Pulsa "Añadir al carrito"
(carrito en localStorage, NO requiere cuenta)
        │
        ▼
/carrito → revisa productos, m², subtotal
        │
        ▼
/checkout
Introduce: nombre, email, teléfono, empresa (opcional)
Dirección de entrega O datos de feria (si necesita instalación)
        │
        ▼
Pago con TPV Virtual (Redsys / Santander)
        │
        ▼
Notificación del TPV confirma el pago
        │
        ├── Se crea/actualiza registro en tabla clients
        ├── Se crea order + order_lines
        ├── Se reserva stock (reserved_m2 += m²)
        ├── Se crea inventory_movement tipo "reserva"
        ├── Se envía email de confirmación (Resend)
        └── Aparece en /admin/pedidos como "pagado"

        ❌ En NINGÚN momento se pide crear cuenta
        ❌ NO hay login para comprar
        ❌ NO hay "mi cuenta" para el comprador
```

---

## 8. Flujo "Monta tu Feria"

```
Visitante entra en /monta-tu-feria
        │
        ▼
PASO 1 — Datos básicos
  ├── Nombre de la feria
  ├── Recinto / ciudad
  ├── Fechas (montaje, evento, desmontaje)
  └── Tipo de actividad (exposición, food, showroom...)
        │
        ▼
PASO 2 — Medidas del stand
  ├── Largo x ancho (metros)
  ├── Esquinas abiertas (1, 2, 3 o 4 lados)
  ├── ¿Necesita tarima? ¿Zonas diferenciadas?
  └── Opción: subir plano/CAD (DXF, PDF, imagen)
        │
        ▼
PASO 3 — Selección de moqueta
  ├── Tipo de material (del catálogo)
  ├── Color
  └── La IA sugiere el material óptimo según tipo de feria
        │
        ▼
PASO 4 — La IA genera el plano
  ├── Claude API recibe los inputs → devuelve JSON estructurado
  ├── El frontend renderiza en SVG:
  │     ├── Vista cenital del stand
  │     ├── Zonas coloreadas por tipo de material
  │     ├── m² por zona
  │     ├── Pasillos y puntos de entrada
  │     └── Leyenda de materiales
  └── Se guarda en fair_planner_sessions.plan_json
        │
        ▼
PASO 5 — Presupuesto instantáneo
  ├── Desglose: material (m² × precio), transporte, montaje, desmontaje
  ├── El cliente ajusta opciones → se recalcula en tiempo real
  └── Total visible con IVA y sin IVA
        │
        ▼
PASO 6 — Acción
  ├── "Solicitar presupuesto formal" → se guarda + notifica al admin
  ├── "Contratar ahora" → pasa al checkout del TPV Virtual
  └── "Guardar y volver luego" → email con enlace único
```

---

## 9. Panel de Administración — Detalle

### 8.1. Dashboard (`/admin`)

- Ventas del día / semana / mes (gráfica de barras).
- Pedidos pendientes de gestión (contador + lista).
- Productos con stock bajo (alertas activas).
- Próximos 5 eventos en el calendario.
- Balance rápido: ingresos vs gastos del mes.
- Últimas sesiones del chatbot con lead_score alto.

### 8.2. Productos (`/admin/productos`)

- Listado con búsqueda, filtros por categoría y estado.
- Crear producto: nombre, slug (auto), descripción, categoría, precio/m², m² mínimo, material, grosor.
- Subir múltiples fotos con drag & drop (Supabase Storage).
- Variantes por color: cada una con SKU y stock propio.
- Marcar como destacado (aparece en home).
- Desactivar sin borrar (deja de aparecer en catálogo).
- Edición masiva: cambiar precio o categoría de varios a la vez.

### 8.3. Pedidos (`/admin/pedidos`)

- Listado con filtro por estado, fecha, cliente.
- Detalle: datos del cliente, líneas del pedido, m² totales, pago TPV.
- Cambiar estado manualmente (preparación → enviado → instalado → completado).
- Vincular pedido a un evento del calendario.
- Notas internas.

### 8.4. Inventario (`/admin/inventario`)

- Vista general: producto + variante + m² disponibles + m² reservados.
- Semáforo: verde (OK), amarillo (cerca del mínimo), rojo (bajo mínimo).
- Registrar entrada: m², proveedor, coste (se registra como gasto en finanzas).
- Registrar salida: m², motivo, evento vinculado.
- Historial de movimientos por producto con filtro de fechas.
- Configurar alertas: m² mínimo por variante.

### 8.5. Calendario (`/admin/calendario`)

- Vista mes y semana con eventos codificados por color (estado).
- Crear evento: nombre de feria, recinto, ciudad, fechas (montaje/evento/desmontaje).
- Vincular a cliente y pedido.
- Añadir notas: material necesario, equipo asignado, instrucciones especiales.
- Subir fotos del montaje (se marcan como portfolio si se quiere).
- Vista de timeline: ver solapamientos entre ferias.

### 8.6. Finanzas (`/admin/finanzas`)

- Registrar ingreso: importe, categoría, descripción, pedido vinculado (opcional).
- Registrar gasto: importe, categoría (material, transporte, personal, alquiler, marketing, otro).
- Subir justificante (foto del ticket o factura PDF).
- Vista mensual: gráfica de barras ingresos vs gastos.
- Balance acumulado y desglose por categoría.
- Filtros por fecha, tipo, categoría.
- Exportar a CSV (para el gestor/asesor).

### 8.7. Clientes (`/admin/clientes`)

- Listado con búsqueda por nombre, empresa, email.
- Ficha: datos de contacto + historial de pedidos + eventos vinculados.
- Total gastado y número de pedidos (calculado automáticamente).
- Notas internas del comercial.

### 9.8. Blog (`/admin/blog`)

- Listado de artículos con filtro por estado, categoría, idioma.
- Estados: borrador / publicado / programado.
- Programar publicación con fecha y hora.
- Editor visual con bloques: texto, imagen, galería, CTA, producto destacado, FAQ.
- Campos SEO por artículo: title, meta description, slug, OG image.
- Selector de idioma: escribir artículo en ES, CA o EN (o los 3).
- Vinculación automática de hreflang entre versiones del mismo artículo.
- Categorías y etiquetas para organizar el blog.
- Vista previa en tiempo real antes de publicar.

**Generación con IA:**
- Botón "Generar con IA": introduces un tema o keyword y la IA genera un borrador completo.
- La IA incluye: título SEO, meta description, estructura H2/H3, contenido, FAQ schema, y CTAs internos.
- El borrador se genera como borrador editable — nunca se publica directamente.
- Opción de generar variantes en los 3 idiomas desde un mismo briefing.
- La IA conoce el catálogo de productos y puede enlazar a fichas relevantes automáticamente.

### 9.9. Generador de Landing Pages SEO (`/admin/landings`)

Este es un módulo clave. Permite crear landings optimizadas para SEO sin tocar código.

**Tipos de landing que se pueden crear:**

```
┌─────────────────────────────────────────────────────────┐
│           TIPOS DE LANDING PAGE                          │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  📍 LOCAL                                               │
│     "Moquetas en [ciudad/barrio]"                       │
│     Auto-genera: H1, intro, servicios, mapa,            │
│     testimonios zona, CTA, schema LocalBusiness          │
│                                                         │
│  🏷️ PRODUCTO/SERVICIO                                   │
│     "Moqueta ferial barata", "Suelo vinílico clínicas"  │
│     Auto-genera: H1, comparativa, specs, FAQ,            │
│     productos relacionados del catálogo, CTA             │
│                                                         │
│  🆚 COMPARATIVA                                         │
│     "Moqueta vs vinilo", "Laminado o vinílico"          │
│     Auto-genera: tabla comparativa, pros/contras,        │
│     recomendación por caso de uso, CTA                   │
│                                                         │
│  📚 GUÍA                                                │
│     "Guía completa moquetas 2026", "Cómo elegir..."    │
│     Auto-genera: índice, secciones, imágenes,            │
│     FAQ schema, productos recomendados, CTA              │
│                                                         │
│  🎪 EVENTO/FERIA                                        │
│     "Moqueta MWC 2026", "Pavimentos Fira Barcelona"    │
│     Auto-genera: contexto del evento, servicios,         │
│     portfolio de trabajos en esa feria, CTA              │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Flujo de creación de una landing:**

```
Admin abre /admin/landings/nueva
        │
        ▼
Selecciona tipo: local / producto / comparativa / guía / evento
        │
        ▼
Introduce datos mínimos:
  - Local: ciudad + barrio (opcional)
  - Producto: keyword principal + producto del catálogo
  - Comparativa: producto A vs producto B
  - Guía: tema + keywords objetivo
  - Evento: nombre de feria + año
        │
        ▼
Pulsa "Generar con IA"
        │
        ▼
La IA genera la landing completa:
  - Título H1 optimizado
  - Meta title + meta description
  - Slug SEO-friendly
  - Contenido estructurado (H2, H3, párrafos)
  - FAQ section (schema FAQ automático)
  - CTAs con enlaces a productos del catálogo
  - Schema markup (LocalBusiness, Product, FAQPage)
  - Alt text de imágenes
        │
        ▼
El admin revisa, edita lo que quiera, y publica.
Se genera automáticamente en los 3 idiomas si se quiere.
        │
        ▼
La landing se indexa y empieza a rankear.
```

**Campos de cada landing:**

- URL / slug (editable, sugerido por IA).
- Título H1.
- Meta title (máx 60 caracteres, con contador).
- Meta description (máx 155 caracteres, con contador).
- Contenido principal (editor de bloques).
- FAQ (pares pregunta/respuesta, schema automático).
- Productos relacionados (selección del catálogo).
- Imagen destacada.
- Idioma (ES / CA / EN) + vinculación hreflang.
- Estado: borrador / publicado.
- Puntuación SEO en tiempo real (semáforo: keyword en H1, meta length, alt images, internal links).

**Tabla en BD:**

```sql
CREATE TABLE landing_pages (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type            TEXT NOT NULL CHECK (type IN ('local','producto','comparativa','guia','evento')),
  title           TEXT NOT NULL,
  slug            TEXT UNIQUE NOT NULL,
  meta_title      TEXT,
  meta_description TEXT,
  content         JSONB NOT NULL,          -- bloques del editor
  faq             JSONB,                   -- [{question, answer}]
  related_products UUID[],                 -- IDs de productos del catálogo
  cover_image     TEXT,
  locale          TEXT NOT NULL DEFAULT 'es' CHECK (locale IN ('es','ca','en')),
  hreflang_es     UUID REFERENCES landing_pages(id),
  hreflang_ca     UUID REFERENCES landing_pages(id),
  hreflang_en     UUID REFERENCES landing_pages(id),
  schema_type     TEXT,                    -- 'LocalBusiness', 'FAQPage', etc.
  schema_data     JSONB,                   -- schema markup generado
  status          TEXT DEFAULT 'borrador' CHECK (status IN ('borrador','publicado')),
  seo_score       INT DEFAULT 0,           -- 0-100, calculado automáticamente
  city            TEXT,                    -- para landings locales
  neighborhood    TEXT,                    -- para landings locales
  target_keyword  TEXT,                    -- keyword principal objetivo
  author_id       UUID REFERENCES profiles(id),
  published_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_landings_locale ON landing_pages(locale);
CREATE INDEX idx_landings_type ON landing_pages(type);
CREATE INDEX idx_landings_status ON landing_pages(status);
CREATE INDEX idx_landings_slug ON landing_pages(slug);
```

### 9.10. Configuración (`/admin/config`)

- Datos de la empresa (nombre, NIF, dirección, logo).
- Tarifas base de transporte e instalación.
- Gestión de usuarios (**solo admin**): crear, desactivar, cambiar rol.
- Categorías de finanzas personalizables.

---

## 10. Seguridad — Resumen

```
┌───────────────────────────────────────────────────────────┐
│                     REGLAS DE SEGURIDAD                    │
├───────────────────────────────────────────────────────────┤
│                                                           │
│  ❌  NO existe registro público en NINGÚN sitio           │
│  ❌  NO existe /register, /signup, /crear-cuenta          │
│  ❌  NO hay OAuth, Google Login ni login social            │
│  ❌  NO hay "recuperar contraseña" accesible al público   │
│  ❌  Los clientes del ecommerce NO tienen cuenta           │
│                                                           │
│  ✅  Solo el admin puede crear usuarios                    │
│  ✅  Login por magic link (sin contraseña)                 │
│  ✅  /admin/login NO tiene enlace en la web pública        │
│  ✅  Middleware verifica sesión + rol en cada request       │
│  ✅  RLS en PostgreSQL: cada rol solo lee sus datos         │
│  ✅  TPV Virtual (Redsys) maneja los pagos (PCI compliant)   │
│  ✅  Supabase Storage con políticas por bucket              │
│  ✅  HTTPS obligatorio (Vercel)                            │
│  ✅  Rate limiting en API routes                            │
│  ✅  Sanitización de inputs (tRPC + Zod)                   │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

---

## 11. Migración de WordPress

### 11.1. Qué se migra

| Contenido | Origen WP | Destino | Método |
|-----------|-----------|---------|--------|
| Páginas estáticas | WP Pages | Rutas Next.js | Reescritura con diseño nuevo |
| Blog completo | WP Posts | Tabla `blog_posts` | Export XML → script de importación |
| Imágenes | wp-content/uploads | Supabase Storage | Descarga masiva + subida por script |
| SEO (titles, metas) | Yoast / RankMath | Campos en `blog_posts` | Export CSV → mapeo |
| URLs | Estructura WP | Next.js routes | Redirects 301 en `next.config.js` |
| Formularios | Contact Form 7 | Formularios propios + chatbot | Recreación mejorada |
| Productos (si hay) | WooCommerce | Tablas `products` + `variants` | Export CSV → script de carga |

### 11.2. Proceso de migración

```
SEMANA 1 — Auditoría
  ├── Inventario completo de URLs (screaming frog o sitemap)
  ├── Export de contenido (WP All Export o WP CLI)
  ├── Mapeo URL antigua → URL nueva
  ├── Identificar las 20 páginas con más tráfico (GSC)
  └── Documentar plugins activos y sus funciones

SEMANA 2-3 — Preparación de datos
  ├── Script de importación de blog posts a Supabase
  ├── Script de descarga + subida de imágenes a Storage
  ├── Migración de datos SEO
  ├── Carga de productos en el catálogo nuevo
  └── Setup de redirects 301 (fichero completo)

SEMANA 4 — Testing
  ├── Verificar todas las URLs redirigen correctamente
  ├── Comprobar que el blog renderiza bien
  ├── Test de Core Web Vitals (Lighthouse)
  ├── Test en móvil
  └── Staging con tráfico parcial (Cloudflare Workers 10-20%)

CUTOVER — Día D
  ├── Apuntar disstands.com a Vercel
  ├── Activar redirects 301
  ├── Verificar en Google Search Console
  ├── Solicitar re-indexación de las 20 páginas top
  ├── Monitoring: tráfico, 404s, posiciones
  └── Apagar WordPress y hosting antiguo (backup archivado)
```

### 11.3. Checklist post-migración

- [ ] 0 errores 404 en las URLs principales.
- [ ] Google Search Console sin errores de cobertura.
- [ ] Core Web Vitals ≥ 90 en todas las páginas.
- [ ] Tráfico orgánico estable (comparar 2 semanas pre vs post).
- [ ] Todos los formularios funcionan y llegan notificaciones.
- [ ] Chatbot IA operativo.
- [ ] Ecommerce: flujo completo de compra testeado.
- [ ] WordPress completamente apagado.

---

## 12. Fases del Proyecto

### FASE 1 — MVP (5 meses)

```
MES 1 ─── Base + Migración
  ├── Auditoría WordPress
  ├── Setup: Next.js + Supabase + Vercel + TPV Virtual (Redsys)
  ├── Schema de BD + RLS
  ├── Migración de contenido (blog, imágenes, SEO)
  └── Diseño visual (wireframes + mockups)

MES 2 ─── Web Pública + Ecommerce
  ├── Home, páginas de servicio, portfolio
  ├── Catálogo con fichas, filtros, búsqueda
  ├── Carrito + checkout con TPV Virtual
  ├── Blog migrado con SEO preservado
  └── Contacto con formulario mejorado

MES 3 ─── Panel Admin
  ├── Dashboard con métricas
  ├── CRUD productos con variantes y fotos
  ├── Gestión de pedidos
  ├── Inventario con movimientos y alertas
  ├── Calendario virtual de eventos
  ├── Finanzas: ingresos y gastos
  └── Gestión de usuarios (solo admin)

MES 4 ─── IA + Monta tu Feria
  ├── Chatbot IA en web pública
  ├── Wizard "Monta tu Feria" con plano IA
  ├── Presupuesto automático desde wizard
  ├── Contenido SEO asistido por IA
  └── Integración chatbot → CRM (lead_score)

MES 5 ─── Cutover + Lanzamiento
  ├── Testing completo de todos los flujos
  ├── Redirects 301
  ├── Activación en disstands.com
  ├── Verificación GSC
  ├── Formación del equipo
  ├── Apagado WordPress
  └── Monitoring intensivo 2 semanas
```

### FASE 2 — Escala (2027+)

- CRM con pipeline visual y scoring IA.
- Emails automáticos post-feria personalizados.
- Portal privado para clientes (sus pedidos y fotos).
- Asignación automática de personal (disponibilidad + zona).
- Optimización de rutas de transporte.
- Web multi-idioma (ES/EN/FR/DE).
- App móvil para instaladores.
- Módulo de facturación.

---

## 13. Wireframes — Página a Página

> Cada sección describe exactamente qué componentes tiene, en qué orden, con qué contenido y qué comportamiento. Para construir directamente desde VSCode con Next.js + Tailwind.

### 13.1. HOME (`/`)

La home es la primera impresión. Fondo negro dominante, tipografía grande, fotos reales de instalaciones. Debe transmitir: somos una marca global, profesional, con experiencia real.

```
┌──────────────────────────────────────────────────────────────┐
│  NAVBAR (sticky, fondo negro, h-16)                          │
│  ┌──────┐                                    ┌────────────┐  │
│  │ LOGO │  Catálogo  Monta tu Feria  Blog    │ Contacto ● │  │
│  └──────┘                                    └────────────┘  │
│  (Logo blanco, links blanco/gris, CTA rojo)                  │
│  Selector idioma: ES | CA | EN (desplegable, esquina dcha)   │
│  Carrito: icono con badge contador (si hay items)            │
│  En móvil: hamburguesa → drawer lateral                      │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│  HERO (h-screen, fondo #0A0A0A, padding generoso)            │
│                                                              │
│  Claim principal (Clash Display Bold, 48-64px, blanco):      │
│  "Pavimentos que transforman espacios"                       │
│                                                              │
│  Subtítulo (General Sans, 18-20px, gris #6B6B6B):           │
│  "Moquetas, vinilos y césped artificial para ferias,         │
│   eventos y espacios comerciales. Desde Barcelona            │
│   al mundo."                                                 │
│                                                              │
│  2 botones:                                                  │
│  [Ver catálogo →] (rojo #E30613, texto blanco, px-8 py-3)   │
│  [Monta tu feria] (borde blanco, texto blanco, ghost btn)    │
│                                                              │
│  Imagen/video: foto real de instalación ferial a gran        │
│  escala. Posición derecha en desktop, debajo en móvil.       │
│  O video loop silencioso de montaje ferial (5-10s).          │
│                                                              │
│  Scroll indicator: flecha sutil animada abajo                │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│  CLIENTES / TRUST BAR (fondo #1A1A1A, py-8)                 │
│                                                              │
│  "Confían en nosotros" (General Sans, 13px, gris, uppercase) │
│                                                              │
│  Logos en fila horizontal con scroll automático:             │
│  Desigual, TV3, MWC, Fira Barcelona, ICE Barcelona...       │
│  (Logos en blanco/gris sobre fondo oscuro, opacity 0.6,      │
│   hover opacity 1)                                           │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│  SERVICIOS (fondo #0A0A0A, py-20)                            │
│                                                              │
│  Título sección (Clash Display, 32px, blanco):               │
│  "Qué hacemos"                                               │
│                                                              │
│  Grid 3 columnas (1 col en móvil):                           │
│                                                              │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐            │
│  │ 📦 Ferias   │ │ 🏢 Comercial│ │ 🏥 Contract │            │
│  │             │ │             │ │             │            │
│  │ Moquetas e  │ │ Pavimentos  │ │ Suelos para │            │
│  │ instalación │ │ para tiendas│ │ hospitales, │            │
│  │ para stands │ │ y oficinas  │ │ clínicas,   │            │
│  │ y eventos   │ │             │ │ gimnasios   │            │
│  │             │ │             │ │             │            │
│  │ [Ver más →] │ │ [Ver más →] │ │ [Ver más →] │            │
│  └─────────────┘ └─────────────┘ └─────────────┘            │
│                                                              │
│  Cards: fondo #1A1A1A, borde 1px #2A2A2A, radius-lg,        │
│  padding 2rem. Hover: borde rojo sutil, translateY(-2px).    │
│  Icono: SVG línea blanca, 32px. No emojis en producción.     │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│  PRODUCTOS DESTACADOS (fondo #FFFFFF, py-20)                 │
│  (Cambio a fondo blanco para contraste)                      │
│                                                              │
│  Título (Clash Display, 32px, negro):                        │
│  "Productos destacados"                                      │
│                                                              │
│  Grid 4 columnas (2 en móvil):                               │
│                                                              │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│  │ [FOTO]   │ │ [FOTO]   │ │ [FOTO]   │ │ [FOTO]   │        │
│  │ Moqueta  │ │ Césped   │ │ PVC Las  │ │ Loseta   │        │
│  │ Las Vegas│ │ Bredis   │ │ Vegas    │ │ Econyl   │        │
│  │ Desde    │ │ Desde    │ │ Desde    │ │ Desde    │        │
│  │ X€/m²   │ │ X€/m²   │ │ X€/m²   │ │ X€/m²   │        │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘        │
│                                                              │
│  Cards: fondo blanco, sombra sutil, radius-lg.               │
│  Foto: aspect-ratio 4/3, object-cover.                       │
│  Nombre: General Sans Medium, 15px, negro.                   │
│  Precio: General Sans, 14px, gris.                           │
│  Hover: sombra más pronunciada, imagen zoom 1.03.            │
│                                                              │
│  Botón centrado abajo:                                       │
│  [Ver todo el catálogo →] (negro, texto blanco)              │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│  MONTA TU FERIA — CTA (fondo negro #0A0A0A, py-24)          │
│                                                              │
│  Layout: 2 columnas. Izquierda texto, derecha mockup.        │
│                                                              │
│  Título (Clash Display, 36px, blanco):                       │
│  "Diseña tu stand en minutos"                                │
│                                                              │
│  Subtítulo (General Sans, 16px, gris):                       │
│  "Nuestra herramienta con IA genera un plano de tu stand     │
│   con los materiales óptimos y un presupuesto instantáneo."  │
│                                                              │
│  [Empezar ahora →] (rojo #E30613, grande, px-10 py-4)       │
│                                                              │
│  Derecha: screenshot/mockup del wizard o plano generado.     │
│  En móvil: texto arriba, imagen abajo.                       │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│  PORTFOLIO (fondo #F5F5F5, py-20)                            │
│                                                              │
│  Título (Clash Display, 32px, negro):                        │
│  "Nuestros trabajos"                                         │
│                                                              │
│  Grid masonry o 3 columnas con fotos de instalaciones.       │
│  Cada foto: hover overlay negro 60% + texto blanco           │
│  con nombre del evento y año.                                │
│                                                              │
│  Máximo 6-9 fotos en home. Link a /portfolio para más.       │
│                                                              │
│  [Ver todos los proyectos →] (link negro, underline)         │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│  CIFRAS (fondo #0A0A0A, py-16)                               │
│                                                              │
│  4 columnas centradas (2 en móvil):                          │
│                                                              │
│  +500         +23          +50.000       +15                 │
│  stands       años         m² instalados países              │
│  montados     experiencia                                    │
│                                                              │
│  Números: Clash Display Bold, 48px, rojo #E30613.            │
│  Labels: General Sans, 14px, gris, uppercase.                │
│  Animación: counter que sube al hacer scroll (IntersectionObserver). │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│  BLOG PREVIEW (fondo #FFFFFF, py-20)                         │
│                                                              │
│  Título (Clash Display, 32px, negro):                        │
│  "Últimos artículos"                                         │
│                                                              │
│  Grid 3 columnas (1 en móvil):                               │
│  3 últimos posts del blog.                                   │
│  Card: imagen cover, título, excerpt 2 líneas, fecha.        │
│  Hover: título se pone rojo.                                 │
│                                                              │
│  [Ir al blog →] (link negro)                                 │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│  CTA FINAL (fondo rojo #E30613, py-16)                       │
│                                                              │
│  Texto centrado (Clash Display, 28px, blanco):               │
│  "¿Tienes un proyecto? Hablemos."                            │
│                                                              │
│  2 botones:                                                  │
│  [Contactar] (blanco, texto rojo)                            │
│  [WhatsApp] (borde blanco, texto blanco, ghost)              │
│                                                              │
│  Única sección con fondo rojo en toda la web.                │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│  FOOTER (fondo #0A0A0A, py-16, border-top 1px #1A1A1A)      │
│                                                              │
│  4 columnas:                                                 │
│                                                              │
│  Col 1: Logo blanco + descripción corta 2 líneas             │
│  Col 2: Productos (Moquetas, Césped, PVC, Losetas...)        │
│  Col 3: Empresa (Equipo, Portfolio, Blog, Contacto)          │
│  Col 4: Legal (Privacidad, Condiciones, Cookies)             │
│                                                              │
│  Links: General Sans 14px, gris #6B6B6B, hover rojo.         │
│                                                              │
│  Separador 1px #1A1A1A.                                      │
│                                                              │
│  Bottom: "© 2026 Disstands. Todos los derechos reservados."  │
│  + iconos RRSS (Instagram, LinkedIn) en gris, hover blanco.  │
│                                                              │
│  En móvil: 1 columna, todo stack vertical.                   │
└──────────────────────────────────────────────────────────────┘
```

**Componentes compartidos de la Home:**

- `Navbar` — reutilizable en todas las páginas. Props: transparent (home hero) o solid (resto).
- `Footer` — reutilizable en todas las páginas.
- `ProductCard` — reutilizable en catálogo.
- `BlogCard` — reutilizable en blog.
- `SectionTitle` — Clash Display + subtítulo opcional, reutilizable.
- `CTAButton` — variantes: primary (rojo), secondary (negro), ghost (borde).
- `LanguageSwitcher` — desplegable ES/CA/EN.
- `ChatbotWidget` — flotante esquina inferior derecha, en todas las páginas públicas.

### 13.2. CATÁLOGO (`/catalogo`)

```
NAVBAR (solid negro)

┌──────────────────────────────────────────────────────────────┐
│  HEADER CATÁLOGO (fondo #F5F5F5, py-12)                      │
│                                                              │
│  Breadcrumb: Inicio > Catálogo (General Sans 13px, gris)     │
│  Título: "Catálogo" (Clash Display, 36px, negro)             │
│  Subtítulo: "273 productos disponibles" (General Sans, gris) │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│  FILTROS + GRID                                              │
│                                                              │
│  Sidebar izquierda (240px, desktop) / drawer (móvil):        │
│  - Categorías (checkbox list con contadores)                 │
│    □ Moquetas (87)                                           │
│    □ Césped artificial (32)                                   │
│    □ PVC / Vinílico (49)                                     │
│    □ Losetas (14)                                            │
│    □ Caucho / Deportivo (13)                                 │
│    □ Jardines verticales (17)                                │
│    □ Accesorios (35)                                         │
│    □ Adhesivos (12)                                          │
│  - Uso (Ferial, Comercial, Residencial, Deportivo, Sanitario)│
│  - Rango precio €/m² (slider doble)                          │
│  - Colores (circulos de color clickables)                    │
│  - Botón "Limpiar filtros"                                   │
│                                                              │
│  Grid derecha (3 cols desktop, 2 tablet, 1 móvil):           │
│  - Barra superior: ordenar por (Relevancia, Precio ↑↓,      │
│    Nombre, Más reciente) + vista grid/lista toggle           │
│  - ProductCards con: foto, nombre, precio/m², badge          │
│    "Nuevo" o "Oferta" si aplica                              │
│  - Paginación o infinite scroll                              │
│                                                              │
│  Fondo: blanco. Cards: sombra sutil, radius-lg.              │
│  Sin resultados: "No hay productos con estos filtros"        │
│  + botón limpiar filtros.                                    │
└──────────────────────────────────────────────────────────────┘

FOOTER
```

### 13.3. FICHA DE PRODUCTO (`/catalogo/[slug]`)

```
NAVBAR

┌──────────────────────────────────────────────────────────────┐
│  FICHA (fondo blanco, py-12)                                 │
│                                                              │
│  Breadcrumb: Inicio > Catálogo > Moquetas > [Producto]       │
│                                                              │
│  Layout 2 columnas (stack en móvil):                         │
│                                                              │
│  IZQUIERDA (55%):                                            │
│  - Galería de imágenes: foto principal grande +               │
│    thumbnails debajo (click para cambiar).                   │
│  - Zoom on hover (desktop).                                  │
│  - Swipe en móvil.                                           │
│                                                              │
│  DERECHA (45%):                                              │
│  - Nombre (Clash Display, 28px, negro)                       │
│  - SKU y categoría (General Sans, 13px, gris)                │
│  - Precio: "Desde X,XX €/m²" (Clash Display, 24px, rojo)    │
│  - Descripción corta (General Sans, 15px, 3-4 líneas)       │
│  - Selector de color (círculos, click selecciona)            │
│  - Input m²: campo numérico con + / - buttons               │
│    Mínimo: X m² | Debajo: "Total: XX,XX €" (cálculo live)   │
│  - [Añadir al carrito] (botón rojo grande, full width)       │
│  - [Solicitar muestra] (ghost button negro)                  │
│  - Info envío: "Envío en 24-48h" + icono camión             │
│                                                              │
│  DEBAJO (full width):                                        │
│  - Tabs: Descripción | Especificaciones | Documentación      │
│    - Descripción: texto largo del producto                    │
│    - Specs: tabla (Material, Grosor, Peso, Clase uso,        │
│      Ignifugo, Antideslizante, Reciclable...)                │
│    - Docs: PDFs descargables (ficha técnica, certificados)   │
│                                                              │
│  - Productos relacionados (grid 4 cols de ProductCards)       │
└──────────────────────────────────────────────────────────────┘

FOOTER
```

### 13.4. BLOG (`/blog`)

```
NAVBAR

┌──────────────────────────────────────────────────────────────┐
│  HEADER (fondo #F5F5F5, py-12)                               │
│  Título: "Blog" (Clash Display, 36px)                        │
│  Subtítulo: "Guías, tendencias y casos reales"               │
│  Buscador: input con icono lupa                              │
│  Filtro por categoría: pills horizontales                    │
│  (Todos | Moquetas | Césped | PVC | Eventos | Guías)         │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│  FEATURED POST (primer artículo, grande)                     │
│  Layout 2 cols: imagen izq (60%) + texto dcha (40%)          │
│  Badge categoría (pill rojo), título grande, excerpt, fecha  │
│  [Leer artículo →]                                           │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│  GRID ARTÍCULOS (fondo blanco)                               │
│  3 columnas (1 en móvil)                                     │
│  BlogCard: cover image (16:9), categoría pill, título,       │
│  excerpt 2 líneas, fecha + tiempo lectura.                   │
│  Hover: imagen zoom 1.03, título rojo.                       │
│  Paginación: números + prev/next.                            │
└──────────────────────────────────────────────────────────────┘

FOOTER
```

### 13.5. ARTÍCULO BLOG (`/blog/[slug]`)

```
NAVBAR

┌──────────────────────────────────────────────────────────────┐
│  ARTICLE (max-width 720px centrado, py-12)                   │
│                                                              │
│  Breadcrumb: Blog > [Categoría] > [Título]                   │
│  Categoría pill + fecha + tiempo lectura                     │
│  H1 (Clash Display, 36px, negro)                             │
│  Cover image (full width, radius-lg, aspect 16:9)            │
│                                                              │
│  Contenido:                                                  │
│  - Tipografía editorial: General Sans 17px, line-height 1.8  │
│  - H2: Clash Display 24px, margin-top 2.5rem                │
│  - H3: Clash Display 20px                                    │
│  - Imágenes en contenido: full width, radius-md              │
│  - Listas: bullet rojos                                      │
│  - Links: rojo, underline on hover                           │
│  - Blockquotes: borde izquierdo rojo 3px, fondo #F5F5F5      │
│                                                              │
│  Sidebar (sticky, solo desktop, derecha):                    │
│  - Tabla de contenidos (auto-generada de H2s)                │
│  - CTA "Monta tu feria" mini                                │
│  - Productos relacionados (2-3 mini cards)                   │
│                                                              │
│  Al final del artículo:                                      │
│  - Tags / categorías                                         │
│  - CTA banner: "¿Necesitas moqueta para tu evento?"          │
│  - Artículos relacionados (3 BlogCards)                      │
│                                                              │
│  Schema: Article + FAQPage si tiene FAQ section              │
└──────────────────────────────────────────────────────────────┘

FOOTER
```

### 13.6. MONTA TU FERIA (`/monta-tu-feria`)

```
NAVBAR

┌──────────────────────────────────────────────────────────────┐
│  WIZARD (fondo #0A0A0A, full height, centrado)               │
│                                                              │
│  Progress bar: 6 pasos, rojo el actual, gris los demás       │
│  ● ─── ○ ─── ○ ─── ○ ─── ○ ─── ○                            │
│                                                              │
│  PASO 1: Datos de la feria                                   │
│  Card fondo #1A1A1A, max-width 640px centrado.               │
│  - Nombre de la feria (input text)                           │
│  - Recinto / ciudad (input text con autocompletado)          │
│  - Fechas montaje / evento / desmontaje (date pickers)       │
│  - Tipo actividad (select: Exposición, Food, Showroom,       │
│    Congreso, Desfile, Otro)                                  │
│  [Siguiente →] (rojo)                                        │
│                                                              │
│  PASO 2: Medidas del stand                                   │
│  - Largo x Ancho (inputs numéricos, metros)                  │
│  - Esquinas abiertas (selector visual: 1, 2, 3, 4 lados)    │
│  - ¿Tarima? (toggle sí/no)                                   │
│  - ¿Zonas diferenciadas? (toggle + inputs si sí)             │
│  - Subir plano (drag & drop, acepta DXF, PDF, JPG, PNG)     │
│  Preview: rectángulo proporcional con m² calculados           │
│                                                              │
│  PASO 3: Selección de material                               │
│  - Grid de materiales del catálogo (mini cards clickables)    │
│  - La IA sugiere: "Recomendado para tu tipo de feria: ..."   │
│  - Selector de color                                          │
│                                                              │
│  PASO 4: Plano generado por IA                               │
│  - Visualización SVG: vista cenital del stand                │
│  - Zonas coloreadas por material                              │
│  - Labels con m² por zona                                     │
│  - Leyenda de materiales y colores                            │
│  - Botón "Regenerar" si no convence                           │
│                                                              │
│  PASO 5: Presupuesto                                         │
│  - Desglose en tabla:                                        │
│    Material: X m² × X €/m² = X €                             │
│    Transporte: X €                                           │
│    Montaje: X €                                              │
│    Desmontaje: X €                                           │
│    ──────────────                                            │
│    Subtotal: X €                                             │
│    IVA (21%): X €                                            │
│    TOTAL: X €                                                │
│  - Ajustar opciones: cambiar material, quitar/añadir tarima  │
│  - Se recalcula en tiempo real                                │
│                                                              │
│  PASO 6: Acción                                              │
│  - 3 opciones:                                               │
│    [Solicitar presupuesto formal] (rojo, principal)           │
│    [Contratar ahora] (negro)                                 │
│    [Guardar y volver luego] (ghost, envía email con enlace)  │
│  - Campos: nombre, email, teléfono, empresa                  │
└──────────────────────────────────────────────────────────────┘

FOOTER
```

### 13.7. CONTACTO (`/contacto`)

```
NAVBAR

┌──────────────────────────────────────────────────────────────┐
│  CONTACTO (fondo blanco, py-16)                              │
│                                                              │
│  Layout 2 columnas:                                          │
│                                                              │
│  IZQUIERDA:                                                  │
│  Título: "Hablemos" (Clash Display, 36px)                    │
│  Subtítulo: "Cuéntanos qué necesitas y te respondemos        │
│  en menos de 24 horas."                                      │
│                                                              │
│  Formulario:                                                 │
│  - Nombre (input)                                            │
│  - Email (input)                                             │
│  - Teléfono (input, opcional)                                │
│  - Empresa (input, opcional)                                 │
│  - Tipo consulta (select: Presupuesto ferial, Compra         │
│    online, Instalación, Otro)                                │
│  - Mensaje (textarea, 4 líneas)                              │
│  - [Enviar mensaje] (rojo)                                   │
│  - Check RGPD: "Acepto la política de privacidad"            │
│                                                              │
│  DERECHA:                                                    │
│  - Datos de contacto:                                        │
│    📞 Teléfono                                               │
│    ✉️ Email                                                   │
│    📍 Dirección (Sabadell, Barcelona)                         │
│  - Botón WhatsApp (verde, grande)                            │
│  - Horario de atención                                       │
│  - Mapa embed (Google Maps, Sabadell)                        │
└──────────────────────────────────────────────────────────────┘

FOOTER
```

### 13.8. CARRITO (`/carrito`)

```
NAVBAR

┌──────────────────────────────────────────────────────────────┐
│  CARRITO (fondo #F5F5F5, py-12)                              │
│                                                              │
│  Título: "Tu carrito" (Clash Display, 28px)                  │
│  "(3 productos)"                                             │
│                                                              │
│  Layout 2 cols (65% items + 35% resumen):                    │
│                                                              │
│  ITEMS (cada uno en card blanca):                            │
│  ┌──────────────────────────────────────────┐                │
│  │ [IMG] Moqueta Las Vegas - Rojo           │                │
│  │       12 m² × 8,50 €/m² = 102,00 €      │                │
│  │       [- 12 +]          [🗑 Eliminar]     │                │
│  └──────────────────────────────────────────┘                │
│                                                              │
│  RESUMEN (card blanca, sticky en desktop):                   │
│  Subtotal: XXX €                                             │
│  Envío: Calculado en checkout                                │
│  ──────────────────                                          │
│  Total estimado: XXX €                                       │
│  (IVA incluido)                                              │
│                                                              │
│  [Finalizar compra →] (rojo, full width)                     │
│  [Seguir comprando] (link negro)                             │
│                                                              │
│  Carrito vacío: ilustración + "Tu carrito está vacío"        │
│  + [Ir al catálogo →]                                        │
└──────────────────────────────────────────────────────────────┘

FOOTER
```

### 13.9. CHECKOUT (`/checkout`)

```
NAVBAR (simplificado, solo logo + volver al carrito)

┌──────────────────────────────────────────────────────────────┐
│  CHECKOUT (fondo blanco, py-12)                              │
│                                                              │
│  2 columnas (60% form + 40% resumen pedido):                 │
│                                                              │
│  FORMULARIO:                                                 │
│  Sección 1: Datos de contacto                                │
│  - Nombre, email, teléfono, empresa (opcional), NIF (opc)    │
│                                                              │
│  Sección 2: Entrega                                          │
│  - Radio: "Envío a dirección" / "Instalación en feria"       │
│  - Si envío: dirección, ciudad, CP, provincia                │
│  - Si feria: nombre feria, recinto, fechas, dirección        │
│                                                              │
│  Sección 3: Notas (textarea opcional)                        │
│                                                              │
│  Sección 4: Pago                                             │
│  - Resumen del pedido                                        │
│  - [Pagar XXX €] (rojo, grande)                              │
│  - → Redirige al TPV Virtual (Redsys/Santander)             │
│  - Check RGPD + condiciones de compra                        │
│                                                              │
│  RESUMEN (sticky):                                           │
│  - Lista de items (mini, con foto)                            │
│  - Subtotal + envío + IVA + Total                            │
│                                                              │
│  ❌ NO hay campo de crear cuenta                              │
│  ❌ NO hay login                                              │
│  ❌ Compra siempre como invitado                              │
└──────────────────────────────────────────────────────────────┘
```

### 13.10. PORTFOLIO (`/portfolio`)

```
NAVBAR

┌──────────────────────────────────────────────────────────────┐
│  PORTFOLIO (fondo #F5F5F5, py-12)                            │
│                                                              │
│  Título: "Nuestros trabajos" (Clash Display, 36px)           │
│  Subtítulo: "Más de 500 stands montados en 23 años"         │
│                                                              │
│  Filtro: pills (Todos | Ferias | Eventos | Comercial |       │
│  Deportivo)                                                  │
│                                                              │
│  Grid masonry (3 cols desktop, 2 tablet, 1 móvil):           │
│  Fotos de instalaciones reales.                              │
│  Hover: overlay negro 60% + nombre evento + año + ubicación  │
│  Click: lightbox con galería completa del evento.            │
└──────────────────────────────────────────────────────────────┘

FOOTER
```

### 13.11. Componentes globales

```
CHATBOT WIDGET
- Flotante esquina inferior derecha, z-index alto.
- Botón circular rojo #E30613, 56px, icono chat blanco.
- Click: abre panel lateral 380px (desktop) o fullscreen (móvil).
- Header: "Asistente Disstands" + botón cerrar.
- Chat: burbujas. Usuario = gris derecha. Bot = blanco izquierda.
- Input: campo texto + botón enviar rojo.
- Presente en TODAS las páginas públicas.
- NO presente en /admin/*.

COOKIE BANNER
- Barra inferior, fondo #1A1A1A, texto blanco.
- "Usamos cookies propias..." + [Aceptar] rojo + [Configurar] ghost.
- Diseño minimalista, no modal intrusivo.

LANGUAGE SWITCHER
- En navbar, esquina derecha.
- Desplegable: ES 🇪🇸 | CA | EN 🇬🇧
- Al cambiar: redirige a la ruta equivalente en el idioma.
- Recuerda preferencia en localStorage.

404 PAGE
- Fondo negro, centrado.
- "404" (Clash Display, 120px, rojo).
- "Página no encontrada" (General Sans, 18px, gris).
- [Volver al inicio →] (botón rojo).
```

---

## 14. Estructura de Ficheros del Proyecto

```
disstands/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (es)/                     # Español (default, sin prefijo URL)
│   │   │   ├── page.tsx              # /
│   │   │   ├── catalogo/
│   │   │   │   ├── page.tsx          # /catalogo
│   │   │   │   └── [slug]/page.tsx   # /catalogo/[slug]
│   │   │   ├── monta-tu-feria/
│   │   │   │   └── page.tsx
│   │   │   ├── carrito/page.tsx
│   │   │   ├── checkout/
│   │   │   │   ├── page.tsx
│   │   │   │   └── confirmacion/page.tsx
│   │   │   ├── blog/
│   │   │   ├── portfolio/
│   │   │   ├── contacto/
│   │   │   └── equipo/
│   │   ├── ca/                       # Catalán (/ca/...)
│   │   │   ├── page.tsx              # /ca/
│   │   │   ├── cataleg/
│   │   │   ├── munta-la-teva-fira/
│   │   │   ├── cistella/
│   │   │   ├── blog/
│   │   │   ├── portfolio/
│   │   │   └── contacte/
│   │   ├── en/                       # English (/en/...)
│   │   │   ├── page.tsx              # /en/
│   │   │   ├── catalog/
│   │   │   ├── build-your-fair/
│   │   │   ├── cart/
│   │   │   ├── blog/
│   │   │   ├── portfolio/
│   │   │   └── contact/
│   │   ├── admin/                    # Panel privado (sin idioma)
│   │   │   ├── login/page.tsx
│   │   │   ├── page.tsx              # Dashboard
│   │   │   ├── productos/
│   │   │   ├── pedidos/
│   │   │   ├── inventario/
│   │   │   ├── calendario/
│   │   │   ├── finanzas/
│   │   │   ├── clientes/
│   │   │   ├── blog/
│   │   │   ├── landings/             # Generador de landings SEO
│   │   │   ├── portfolio/
│   │   │   └── config/
│   │   ├── api/                      # API Routes
│   │   │   ├── trpc/[trpc]/route.ts
│   │   │   ├── webhooks/redsys/route.ts
│   │   │   └── chat/route.ts         # Streaming chatbot
│   │   ├── layout.tsx
│   │   └── middleware.ts             # Auth + role check + i18n detect
│   ├── i18n/                         # Internacionalización
│   │   ├── config.ts                 # Idiomas soportados, default
│   │   ├── dictionaries/
│   │   │   ├── es.json               # Traducciones español
│   │   │   ├── ca.json               # Traducciones catalán
│   │   │   └── en.json               # Traducciones inglés
│   │   └── get-dictionary.ts         # Helper para cargar traducciones
│   ├── server/
│   │   ├── routers/                  # tRPC routers
│   │   │   ├── products.ts
│   │   │   ├── orders.ts
│   │   │   ├── inventory.ts
│   │   │   ├── events.ts
│   │   │   ├── finance.ts
│   │   │   ├── clients.ts
│   │   │   ├── blog.ts
│   │   │   ├── landings.ts           # CRUD landing pages SEO
│   │   │   └── users.ts
│   │   ├── services/
│   │   │   ├── ai.service.ts         # Claude API (vía Trovald)
│   │   │   ├── email.service.ts      # Resend
│   │   │   ├── redsys.service.ts
│   │   │   └── storage.service.ts    # Supabase Storage
│   │   └── trpc.ts                   # tRPC init + context
│   ├── components/
│   │   ├── ui/                       # shadcn/ui components
│   │   ├── public/                   # Componentes web pública
│   │   ├── admin/                    # Componentes panel
│   │   └── shared/                   # Compartidos
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts             # Browser client
│   │   │   ├── server.ts             # Server client
│   │   │   └── admin.ts              # Service role client
│   │   ├── redsys.ts
│   │   ├── utils.ts
│   │   └── constants.ts
│   └── types/
│       └── index.ts                  # Tipos compartidos
├── supabase/
│   ├── migrations/                   # SQL migrations
│   └── seed.sql                      # Datos iniciales
├── public/
│   └── fonts/                        # Clash Display + General Sans
│       ├── ClashDisplay-Variable.woff2
│       └── GeneralSans-Variable.woff2
├── next.config.js                    # Redirects 301 + i18n config
├── tailwind.config.ts                # Colores marca + fuentes custom
├── tsconfig.json
└── package.json
```

---

## 15. Inventario Completo de URLs — Sitemap WordPress

> Datos extraídos del sitemap XML de disstands.com (Yoast SEO). Total: **475 URLs** distribuidas en 4 sitemaps.

### 15.1. Resumen por tipo

| Tipo | Cantidad | URL origen (WP) | URL destino (Next.js) | Redirect |
|------|----------|-----------------|----------------------|----------|
| Home + páginas | 12 | `/`, `/equipo-disstands/`, etc. | Misma ruta o equivalente | 301 individual |
| Landings SEO | 55 | `/moqueta-por-metros/`, etc. | Misma ruta | 301 1:1 |
| Landings locales | 50 | `/moquetas-sabadell/`, etc. | Misma ruta | 301 1:1 |
| Blog (noticias) | 54 | `/noticias/[slug]` | `/blog/[slug]` | 301 masivo |
| Productos (WooCommerce) | 273 | `/producto/[slug]` | `/catalogo/[slug]` | 301 masivo |
| Categorías | 34 | `/categoria-producto/[slug]` | `/catalogo?categoria=[slug]` | 301 masivo |
| **TOTAL** | **475** (+3 a eliminar) | | | |

### 15.2. URLs a ELIMINAR (sin redirect, devolver 410 Gone)

```
/mi-cuenta/                → No habrá cuentas públicas
/finalizar-compra-old/     → Checkout viejo obsoleto
/finalizar-compra-2/       → Checkout duplicado obsoleto
```

### 15.3. URLs DUPLICADAS a consolidar

```
/moquetas-eixample/              ← consolidar con →  /moquetas-eixample-barcelona/
/moquetas-barrio-collblanc/      ← consolidar con →  /instalacion-y-venta-de-moquetas-en-el-collblanc-disstands/
/moquetas-barcelona-2/           ← eliminar, redirigir a →  /moquetas-barcelona/
```

### 15.4. Redirects masivos (next.config.js)

```javascript
// next.config.js
module.exports = {
  async redirects() {
    return [
      // Blog: /noticias/* → /blog/*
      {
        source: '/noticias/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
      // Productos: /producto/* → /catalogo/*
      {
        source: '/producto/:slug',
        destination: '/catalogo/:slug',
        permanent: true,
      },
      // Categorías: /categoria-producto/* → /catalogo?categoria=*
      {
        source: '/categoria-producto/:slug',
        destination: '/catalogo?categoria=:slug',
        permanent: true,
      },
      // Categorías anidadas
      {
        source: '/categoria-producto/:parent/:slug',
        destination: '/catalogo?categoria=:slug',
        permanent: true,
      },
      // Tienda/shop → catálogo
      { source: '/tienda', destination: '/catalogo', permanent: true },
      { source: '/tienda/', destination: '/catalogo', permanent: true },
      { source: '/shop', destination: '/catalogo', permanent: true },
      { source: '/shop/', destination: '/catalogo', permanent: true },
      // Carrito viejo
      { source: '/carrito', destination: '/carrito', permanent: true },
      // Páginas eliminadas
      { source: '/mi-cuenta', destination: '/', permanent: true },
      { source: '/mi-cuenta/', destination: '/', permanent: true },
      { source: '/finalizar-compra-old', destination: '/catalogo', permanent: true },
      { source: '/finalizar-compra-old/', destination: '/catalogo', permanent: true },
      { source: '/finalizar-compra-2', destination: '/catalogo', permanent: true },
      { source: '/finalizar-compra-2/', destination: '/catalogo', permanent: true },
      // Duplicadas
      { source: '/moquetas-barcelona-2/', destination: '/moquetas-barcelona/', permanent: true },
      { source: '/moquetas-eixample/', destination: '/moquetas-eixample-barcelona/', permanent: true },
      { source: '/moquetas-barrio-collblanc/', destination: '/instalacion-y-venta-de-moquetas-en-el-collblanc-disstands/', permanent: true },
    ];
  },
};
```

---

## 16. URLs Completas — Páginas y Landings

### 16.1. Páginas principales (12 URLs)

| URL WordPress | Destino Next.js | Imgs | Última mod. | Notas |
|--------------|----------------|------|-------------|-------|
| `/` | `/` | 15 | 2026-03-09 | Home — rediseñar |
| `/equipo-disstands/` | `/equipo` | 4 | 2025-10-08 | Página de equipo |
| `/contacto-moquetas-barcelona/` | `/contacto` | 1 | 2026-02-12 | Formulario + chatbot |
| `/blog/` | `/blog` | 0 | 2026-02-12 | Listado blog |
| `/tienda/` | `/catalogo` | 0 | 2025-12-10 | Redirect a catálogo |
| `/shop/` | `/catalogo` | 0 | 2026-03-05 | Redirect a catálogo |
| `/carrito/` | `/carrito` | 1 | 2025-10-08 | Carrito nuevo |
| `/encuesta/` | `/encuesta` | 10 | 2026-03-04 | Mantener o eliminar |
| `/gracias-encuesta/` | `/encuesta/gracias` | 0 | 2026-03-04 | Thank you page |
| `/mi-cuenta/` | **ELIMINAR** | 0 | 2024-08-06 | No hay cuentas públicas |
| `/finalizar-compra-old/` | **ELIMINAR** | 0 | 2025-06-25 | Checkout obsoleto |
| `/finalizar-compra-2/` | **ELIMINAR** | 0 | 2025-10-08 | Checkout duplicado |

### 16.2. Landings SEO — Producto/Servicio (55 URLs)

| URL | Imgs | Última mod. |
|-----|------|-------------|
| `/suelo-vinilico/` | 0 | 2025-11-26 |
| `/cesped-artificial/` | 1 | 2026-02-12 |
| `/preparacion-suelos/` | 0 | 2025-12-12 |
| `/losetas-de-moqueta/` | 0 | 2025-12-15 |
| `/venta-instalacion-moquetas/` | 1 | 2025-12-17 |
| `/que-son-las-moquetas/` | 1 | 2025-12-18 |
| `/moqueta-por-metros/` | 1 | 2025-10-14 |
| `/moqueta-barata-economica/` | 3 | 2026-01-07 |
| `/comprar-moqueta-online/` | 1 | 2026-02-04 |
| `/moqueta-ferial-unica-barcelona/` | 1 | 2025-11-05 |
| `/moqueta-velour-alta-densidad/` | 2 | 2025-10-09 |
| `/moqueta-modular/` | 1 | 2026-01-29 |
| `/moqueta-nautica/` | 1 | 2026-01-29 |
| `/moqueta-sostenible/` | 1 | 2026-02-12 |
| `/moqueta-ecologica-para-eventos-internacionales-y-de-alta-exigencia/` | 1 | 2026-01-07 |
| `/moqueta-ecologica-eventos-reciclable/` | 1 | 2026-02-12 |
| `/moqueta-dilour-eco/` | 1 | 2026-01-07 |
| `/moqueta-precio-metro-cuadrado/` | 1 | 2026-02-12 |
| `/guia-completa-moquetas-2026/` | 1 | 2026-02-03 |
| `/pasta-autonivelante/` | 1 | 2026-02-03 |
| `/alfombra-a-medida-barcelona/` | 0 | 2026-02-04 |
| `/cesped-artificial-barcelona/` | 0 | 2026-02-12 |
| `/suelo-imitacion-madera/` | 0 | 2026-02-12 |
| `/suelo-vinilico-hospitales/` | 1 | 2026-02-12 |
| `/venta-moquetas-y-pvc/` | 1 | 2026-01-19 |
| `/moquetas-barcelona-2/` | 1 | 2026-01-29 |
| `/suelo-pvc-vinilico-barcelona/` | 1 | 2025-12-09 |
| `/suelo-pvc-locales-comerciales/` | 1 | 2025-11-24 |
| `/instalacion-suelos-gimnasios-barcelona/` | 1 | 2025-11-24 |
| `/suelo-vinilico-clinicas-consultas-medicas/` | 1 | 2025-11-25 |
| `/suelo-laminado-o-vinilico-cual-es-mas-barato/` | 0 | 2025-11-26 |
| `/linoleo-vs-pvc-diferencias-cual-es-mejor/` | 1 | 2025-12-11 |
| `/proteccion-suelos-obras/` | 1 | 2025-11-24 |
| `/tipos-suelos-gimnasios-guia-completa/` | 1 | 2025-11-11 |
| `/mejores-moquetas-2025-top-3/` | 1 | 2025-11-20 |
| `/moqueta-roja-eventos-barcelona/` | 1 | 2025-11-20 |
| `/moqueta-gris-para-eventos-en-barcelona-disstands/` | 1 | 2025-11-21 |
| `/moqueta-suelo-eventos-barcelona/` | 1 | 2025-11-21 |
| `/moqueta-leroy-merlin-precio/` | 1 | 2025-11-21 |
| `/moquetas-leroy-merlin/` | 1 | 2025-10-10 |
| `/moqueta-ferial-barata-leroy-merlin/` | 1 | 2025-10-10 |
| `/moqueta-navidad/` | 0 | 2025-11-27 |
| `/moquetas-oficinas-barcelona/` | 1 | 2026-02-17 |

### 16.3. Landings Locales — SEO Geográfico (50 URLs)

#### Barcelona — Barrios y distritos

| URL | Imgs | Última mod. |
|-----|------|-------------|
| `/moquetas-en-ciutat-vella/` | 1 | 2025-10-06 |
| `/moquetas-eixample-barcelona/` | 0 | 2025-10-14 |
| `/moquetas-les-corts-barcelona-instalacion/` | 1 | 2025-10-14 |
| `/moquetas-horta-guinardo/` | 1 | 2025-10-16 |
| `/moquetas-nou-barris-barcelona/` | 1 | 2025-10-21 |
| `/moquetas-sants-barcelona/` | 1 | 2026-02-24 |
| `/moquetas-barrio-antiga-esquerra-eixample-barcelona/` | 1 | 2026-02-25 |
| `/instalacion-y-venta-de-moquetas-en-raval/` | 1 | 2025-10-21 |
| `/instalacion-y-venta-de-moquetas-en-barrio-gotic/` | 1 | 2025-10-21 |
| `/instalacion-y-venta-de-moquetas-en-sant-pere-disstands/` | 1 | 2025-10-21 |
| `/instalacion-y-venta-de-moquetas-en-el-font-pienc-disstands/` | 1 | 2025-10-21 |
| `/instalacion-y-venta-de-moquetas-sant-antoni-disstands/` | 1 | 2025-10-23 |
| `/moquetas-barrio-el-born-barcelona/` | 1 | 2025-10-23 |
| `/instalacion-de-moquetas-en-poblenou-disstands/` | 1 | 2025-10-23 |
| `/instalacion-y-venta-de-moquetas-en-el-collblanc-disstands/` | 1 | 2025-10-28 |
| `/instalacion-y-venta-de-moqueta-la-torrassa-disstands/` | 1 | 2025-10-28 |
| `/instalacion-de-moquetas-en-santa-ulalia-disstands/` | 1 | 2025-10-28 |
| `/instalacion-de-moquetas-en-hostafrancs/` | 1 | 2025-10-29 |
| `/instalacion-de-moquetas-en-la-bordeta-disstands/` | 1 | 2025-10-29 |
| `/moquetas-la-verneda-i-la-pau-barcelona/` | 1 | 2025-10-30 |
| `/instalacion-y-venta-de-moquetas-en-la-barceloneta-disstands/` | 1 | 2025-11-06 |
| `/instalacion-y-venta-de-moquetas-en-plaza-cataluna-disstands/` | 1 | 2025-12-04 |
| `/instalacion-y-venta-de-moquetas-en-poblesec-disstands/` | 1 | 2025-12-17 |

#### Área metropolitana Barcelona

| URL | Imgs | Última mod. |
|-----|------|-------------|
| `/moquetas-en-badalona-instalacion-y-venta-profesional/` | 1 | 2025-10-06 |
| `/moquetas-hospitalet/` | 1 | 2026-02-25 |
| `/moquetas-barrio-gran-via-sud-hospitalet/` | 1 | 2025-10-23 |
| `/moqueta-sant-adria-besos/` | 1 | 2025-11-03 |
| `/moquetas-el-masnou/` | 1 | 2026-02-12 |
| `/moquetas-el-prat-de-llobregat/` | 1 | 2026-02-19 |
| `/moquetas-esplugues-de-llobregat/` | 1 | 2026-02-20 |
| `/moquetas-santa-coloma-de-gramenet/` | 1 | 2026-02-20 |
| `/moquetas-cornella-barcelona-instalacion/` | 1 | 2026-02-24 |
| `/tu-especialista-de-moquetas-en-valldoreix-disstands/` | 1 | 2025-11-03 |
| `/tu-especialista-de-moquetas-en-premia-de-mar/` | 1 | 2025-11-03 |
| `/instalacion-de-moquetas-en-sant-cugat/` | 1 | 2025-10-14 |

#### Cataluña — Ciudades

| URL | Imgs | Última mod. |
|-----|------|-------------|
| `/moquetas-sabadell-disstands/` | 1 | 2025-12-22 |
| `/moquetas-terrassa/` | 1 | 2026-02-25 |
| `/moquetas-mataro/` | 1 | 2026-02-25 |
| `/moquetas-reus-disstands/` | 1 | 2025-10-15 |
| `/moquetas-lleida/` | 0 | 2025-09-10 |
| `/moquetas-girona/` | 0 | 2025-09-26 |
| `/moquetas-tarragona/` | 0 | 2025-12-17 |
| `/moquetas-valles-occidental-disstands/` | 1 | 2026-02-25 |

#### Madrid

| URL | Imgs | Última mod. |
|-----|------|-------------|
| `/venta-moquetas-madrid/` | 1 | 2026-02-25 |
| `/instalacion-moquetas-madrid/` | 1 | 2025-10-14 |
| `/moqueta-sol-madrid/` | 0 | 2025-10-02 |
| `/moqueta-chamartin-madrid/` | 1 | 2025-10-02 |
| `/moqueta-salamanca-madrid/` | 1 | 2025-10-02 |

#### Césped artificial — Locales

| URL | Imgs | Última mod. |
|-----|------|-------------|
| `/cesped-artificial-girona/` | 0 | 2025-12-03 |
| `/instalacion-y-venta-de-cesped-artificial-en-lleida-disstands/` | 0 | 2025-12-03 |
| `/instalacion-y-venta-de-cesped-artificial-en-sabadell-disstands/` | 0 | 2025-12-03 |
| `/instalacion-y-venta-de-cesped-artificial-en-lleida-badalona/` | 0 | 2025-12-04 |
| `/instalacion-y-venta-de-cesped-artificial-en-gracia/` | 0 | 2025-12-04 |
| `/instalacion-y-venta-de-cesped-artificial-en-hospitalet-de-llobregat-disstands/` | 0 | 2026-02-12 |
| `/instalacion-y-venta-de-cesped-artificial-en-barcelona-disstands/` | 0 | 2026-02-12 |

#### Andorra

| URL | Imgs | Última mod. |
|-----|------|-------------|
| `/instalacion-de-moquetas-en-andorra-disstands/` | 1 | 2025-12-23 |

---

## 17. URLs Blog — /noticias/ (54 artículos)

Todos se migran con redirect masivo: `/noticias/:slug` → `/blog/:slug`

| URL (sin dominio, /noticias/) | Imgs | Última mod. |
|------------------------------|------|-------------|
| `la-evolucion-del-revestimiento-de-suelos-en-eventos-de-alto-nivel/` | 0 | 2025-06-06 |
| `5-aprendizajes-tras-montar-mas-de-500-stands-feriales/` | 0 | 2025-06-06 |
| `asi-construimos-el-escenario-para-tu-cara-me-suena/` | 0 | 2025-06-06 |
| `caso-real-con-desigual-montando-un-evento-impactante/` | 0 | 2025-06-06 |
| `transformando-espacios-con-disstands/` | 0 | 2025-06-06 |
| `pvc-decorativo-vs-suelos-tecnicos/` | 0 | 2025-06-06 |
| `la-moqueta-perfecta-para-un-evento-corporativo/` | 0 | 2025-06-06 |
| `las-claves-tecnicas-detras-de-un-stand-modular-exitoso/` | 0 | 2025-06-06 |
| `errores-comunes-que-hemos-visto-en-eventos-y-como-evitarlos/` | 1 | 2025-08-22 |
| `moqueta-las-vegas-poliamida/` | 2 | 2025-08-28 |
| `pavimentos-mwc-barcelona-instalacion-profesional/` | 2 | 2025-08-28 |
| `rollos-caucho-antideslizante-pavimentos-industriales/` | 1 | 2025-08-29 |
| `documentacion-instalacion-moquetas-eventos-corporativos/` | 1 | 2025-09-01 |
| `moqueta-salsdis-eventos-ferias-premium/` | 1 | 2025-09-01 |
| `cesped-artificial-para-eventos-creando-espacios-con-estilo/` | 2 | 2025-09-01 |
| `cesped-artificial-18mm-colores/` | 1 | 2025-09-01 |
| `moqueta-ecologica-eventos/` | 1 | 2025-09-03 |
| `moqueta-exterior-eventos-aire-libre-disstands/` | 1 | 2025-09-03 |
| `limpieza-profesional-de-alfombras-y-moquetas-guia-completa-para-mantener-tus-textiles-impecables/` | 1 | 2025-09-03 |
| `normativa-ignifuga-moquetas/` | 2 | 2025-09-04 |
| `renovacion-oficinas-preico-juridicos-moqueta-antibacteriana/` | 1 | 2025-09-05 |
| `moquetas-espacios-comerciales-guia-completa/` | 2 | 2025-09-05 |
| `problemas-comprar-moquetas-online-solucion/` | 2 | 2025-09-08 |
| `comprar-moqueta-por-metros/` | 2 | 2025-09-09 |
| `moquetas-feriales-baratas-disstands/` | 2 | 2025-09-12 |
| `moquetas-barcelona-instalacion-profesional-eventos/` | 2 | 2025-09-16 |
| `por-que-las-grandes-marcas-confian-en-disstands-para-sus-eventos-clave/` | 1 | 2025-09-16 |
| `como-optimizar-la-logistica-de-montaje-para-eventos-internacionales/` | 1 | 2025-09-16 |
| `que-tipo-de-loseta-es-mas-resistente-para-ferias-y-exposiciones/` | 0 | 2025-09-16 |
| `moqueta-vs-otros-suelos-stands/` | 2 | 2025-09-17 |
| `moquetas-premium-barcelona-desfile-desigual/` | 2 | 2025-09-23 |
| `moquetas-invierno-ahorro-calefaccion/` | 2 | 2025-09-26 |
| `instalacion-pvc-plato-tv3-barcelona/` | 2 | 2025-09-26 |
| `guia-elegir-pavimento-pvc/` | 2 | 2025-09-30 |
| `tendencias-2025-en-diseno-de-stands-para-ferias-y-congresos/` | 1 | 2025-10-07 |
| `tipos-moqueta-eventos-ferias-comparativa/` | 2 | 2025-10-08 |
| `salon-nautico-barcelona-2025-moqueta-ferial/` | 2 | 2025-10-09 |
| `moqueta-profesional-vs-leroy-merlin/` | 2 | 2025-10-14 |
| `moquetas-para-bodas-guia-esencial/` | 2 | 2025-11-06 |
| `moquetas-feriales-ecologicas-reciclaje-reutilizacion/` | 2 | 2025-11-07 |
| `suelo-pvc-impreso-adidas-messi-barcelona/` | 2 | 2025-11-19 |
| `fordis-suelo-vinilico-hospitales/` | 1 | 2025-12-10 |
| `que-es-el-linoleo-guia-completa/` | 1 | 2025-12-11 |
| `diferencia-entre-moqueta-y-alfombra/` | 2 | 2025-12-19 |
| `suelos-para-bodas/` | 1 | 2026-01-07 |
| `precio-presupuesto-cesped-artificial/` | 1 | 2026-01-07 |
| `moqueta-ecologica-efecto-espejo-ice-barcelona-2026/` | 0 | 2026-01-22 |
| `mi-historia-23-anos-transformando-espacios-para-eventos-premium/` | 1 | 2026-02-12 |
| `como-cortar-moqueta-con-cutter/` | 2 | 2026-02-12 |
| `moquetas-barcelona-proveedor-local/` | 1 | 2026-02-12 |
| `moqueta-mwc-2026-barcelona-mobile-world-congress/` | 1 | 2026-02-13 |
| `cesped-artificial-ventacesped-division-especializada/` | 1 | 2026-02-16 |
| `como-quitar-pegamento-cinta-adhesiva/` | 1 | 2026-03-09 |
| `como-colocar-suelo-vinilico/` | 0 | 2026-03-09 |

---

## 18. URLs Productos — /producto/ (273 productos WooCommerce)

Todos se migran con redirect masivo: `/producto/:slug` → `/catalogo/:slug`

> **Nota:** Se listan los 273 slugs agrupados por categoría de producto. Los datos (nombre, precio, descripción, imágenes, variantes) se importan desde export CSV de WooCommerce a las tablas `products` + `product_variants`.

### Moquetas feriales y eventos

```
moqueta-velour-lumdis-400
moqueta-poliamida-51
moqueta-poliamida-51-contract
moqueta-teidedis
moqueta-noadis
moqueta-galadis-diamond
moqueta-dianadis-herringbone
moqueta-nordicadis-chevron
moqueta-crossdis
moqueta-zerbodis-sin-goma-eco
moqueta-tipo-pelo-twisdis-ignifuga
moqueta-pelo-profundo-confort-saxonydis
moqueta-terciopelo-estampado-shinidis
moqueta-terciopelo-estampado-hi-decodis
moqueta-impresa-decodis-pelo-punzonado-900gr
moqueta-platidis-bucle-poliamida-juta
moqueta-sostenible-reciclada-econyl
moqueta-velvedis-design-c-aterciopelada
moqueta-velvedis-aterciopelada
moqueta-timelediss-tipo-rizo-ignifuga
moquetas-ignifugas-sin-goma-boradis
moqueta-melandis-ignifuga-reciclable
moquetas-exterior-resistentes-agua
moqueta-saxony-rizada-poliamida-10-3mm-cfls1
moqueta-pigalldis-tipo-rizo-ignifuga-sin-goma
moquetas-alpadis-interior-exterior-stainsafe
moqueta-fibra-cortada-confortable
moquetas-koidis-lujo-poliamida-antron
moqueta-zenidis-lana-lujo
moqueta-deadis
moqueta-saxony-poliamida
moqueta-dividis-velours-poliamida
moqueta-musdis
moqueta-impresa-personalizada-ferias-las-vegas-lumdis-600
moqueta-las-vegas-impresa-personalizada
oferta-moqueta-las-vegas-ferias
moqueta-ignifuga-eventos-salsdis
moqueta-resordis
moqueta-ferial-personalizada
moqueta-terciopelo-dolcevidis
nobledis
moqueta-forudis-poliamida
moqueta-saxony-rizada-bfl-s1
moqueta-cortada-premium-acustica
moquetas-ecologicas-eco-kontradis-poliamida-regenerada
moquetas-ekilibridis-poliester-halcyon-residencial
moqueta-lunadis
moqueta-modular-sostenible-econyl
moqueta-modular-sostenible
moqueta-tecnica-comercial-cobaldis
moqueta-sisal-natural-bucle
moqueta-polipropileno-resistente
moqueta-soho-tecnica-poliamida
moqueta-natural-martinidis-coleccion
moqueta-serenis
moqueta-galadis
moquetas-iridiscentes-sunridis
moqueta-canutillo-clase-33-bfl-s1
moqueta-lana-natural-premium
moqueta-sweedis-saxony-poliamida
moqueta-saxony-resistente
moqueta-saxony-bfl-s1-poliamida
moqueta-agadis
moquetas-pet-reciclado-sostenibles-auradis
moqueta-revexdis-eventos
moquetas-alpadis-tipo-sisal-interior-exterior
moqueta-purpurina
moqueta-ecologica-eventos
moqueta-ferial-colores-especiales
moqueta-velour-lux
moqueta-ferial-ecologica
moqueta-oceadis
moqueta-nexdis-velours-poliamida
moqueta-okawitdis-twister-yute
moqueta-erodis-velluto
moqueta-lana-virgen-premium
moqueta-las-vegas-domestica
moqueta-las-vegas
compredis-moqueta-contract-monocromatica
moqueta-ambiendis-econyl-sostenible
moqueta-efecto-sisal-okawitdis
moqueta-lasdis-inspiracion-sisal
moqueta-bucle-crossdis
sisal-lasdis-domestico
moquetas-impresas-ignifugas
telas-impresas-ignifugas-personalizables
tela-twisdis-fluo
okawitdis-juta-tela
```

### Losetas de moqueta

```
moqueta-loseta-econyl-regenerada-8mm
moqueta-loseta-econyl-ecologica-l480
moqueta-loseta-econyl-level-cut-loop-8-4mm
moqueta-loseta-econyl-greenlabel-bfls1
moqueta-loseta-econyl-sostenible-8-5mm
moqueta-loseta-profesional-tramondis
loseta-moqueta-modular-intensivo
loseta-stonedis
loseta-ingrodis-minituft
loseta-maximidis
loseta-macdis
moqueta-lardis-loseta-oficinas
loseta-foredis
losetas-modulares-elemendis
```

### Césped artificial

```
cesped-artificial-multisport-25mm
cesped-nautica-y-piscinas-giardidis
cesped-play-kids
cesped-maderis-50mm
cesped-paldis-40mm
cesped-toridis-40mm
cesped-artificial-toridis-40mm-paisajismo-premium
cesped-artificial-sadis-30mm
cesped-artificial-utredis-35mm
cesped-artificial-romdis-45mm
cesped-artificial-monkey-24mm
cesped-capridis-8mm
cesped-artificial-mondis-40mm
cesped-artificial-premium-paisajismo-viserdis-45mm
cesped-artificial-para-pistas-de-padel-12-mm
cesped-artificial-elbedis-23mm
cesped-londis-20mm
cesped-greendis-7mm
cesped-elbedis-23mm-oferta
cesped-artificial-piscinas
cesped-prada-25mm
cesped-infantil-colores-24mm
cesped-summer-8mm
cesped-greendis-7mm-oferta
cesped-artificial-decorativo-elbe
cesped-artificial-ligero-paisajismo
cesped-artificial-bredis-30mm
cesped-summer-18mm
cesped-artificial-monkdis-green
cesped-bredis-30mm-oferta
cesped-artificial-10mm-resistente
danudis-cesped-premium
```

### PVC y suelos vinílicos

```
suelo-vinilico-en-rollo-pradis
pvc-mipoldis-evodis
pvc-muradis-club
pvc-fardis-digital-domestico
suelo-vinilico-antibacteriano-silver-k
suelo-vinilico-estampado-vanidis
suelo-vinilico-pvc-pixeldis
pavimento-vinilico-trafico-intenso
suelo-vinilico-modular-antibacteriano
pvc-acousdis-suelo-vinilico-acustico
zedis-revestimiento-textil-vinilico-clase-33
pvc-vinilico-textura-tejida
suelo-vinilico-comercial-pvc-unidis
pvc-twisdis
pvc-fardis-digital
pvc-klasidis
pvc-lundis-piedra
pvc-lundis-wood
suelo-vinilico-efecto-marmol-continuo
mipoldis-plandis
suelo-vinilico-taralidis-liber-trafico-intenso
suelo-vinilico-acustico-alto-confort
pvc-premium-contact
suelo-vinilico-heterogeneo-taraladis-impression
mipoldis-accord
pvc-mipoldis-clasidis
suelo-vinilico-homogeneo-antibacteriano-mipoldis-afinidis
suelo-vinilico-las-vegas-brillo
pvc-las-vegas-brillo-impresion
pvc-studio-prest
pvc-expodis-eventos
suelo-vinilico-espiga-haya
suelo-vinilico-homogeneo-fordis
pvc-impreso
pvc-estandar-impreso
pvc-metalizado-impreso-oro-plata-eventos
pvc-oro-y-plata-espejo
pvc-oro-y-plata-casidis-mate-aspecto-rugoso
pvc-oro-y-plata-aspecto-liso-brillo
suelo-vinilico-portatil-alto-brillo-eventos
pvc-bindis-stone
pvc-artic
pvc-imitacion-cemento
mipolam-troplan-homogeneo
revestimiento-vinilo-tejido-naturaldis
revestimiento-mural-vinilico-muradis
revestimiento-vinilico-tecnico-higienico
twisdis-bosco
leathdis-revestimiento-efecto-cuero
```

### Suelos caucho y deportivos

```
placas-de-caucho-22mm
loseta-caucho-50x50-exterior-parques
espuma-puzzle-tatami
suelo-abotonado-antideslizante-por-metros
rollo-caucho-antideslizante-alveolar
suelo-caucho-negro-rollo-gimnasios
suelo-caucho-sportdis-optimus-epdm
goma-versadis-pavimento-tecnico-antideslizante
pavimento-deportivo-epdm-ignifugo-sportdis
suelo-sportdis-color-fr-ignifugo
suelo-sportdis-uni-classic-epdm
rampas-borde-esquina-sportdis-fr
suelo-caucho-sportdis-puzzle-2-0
```

### Suelos laminados y SPC

```
suelo-spc-disstands-easy-avellana
suelo-parquet-click
suelo-spc-disstands-easy-miel
suelo-spc-disstands-easy-natural-madera-real-5-5mm-hidrofugo
suelo-laminado-disstands-plus-5-ac5
suelo-vinilico-imitacion-madera-bindis-wood
```

### Linóleo

```
suelo-linoleo-marmol-marmorette
suelo-linoleo-natural-etrusdis
suelo-linoleo-marmol-marmorette-2-5-mm
suelo-linoleo-marmol-marmoredis-3-2-mm
```

### Jardines verticales

```
jardin-vertical-versadis
jardin-vertical-alhamdis-100x100
jardin-vertical-medellis-100x100
jardin-vertical-musdis-50x50
jardin-vertical-bobodis-100x100
jardin-vertical-retirdis
jardin-vertical-pukekurdis-50x50
jardin-vertical-tarandis
jardin-vertical-villandis
jardin-vertical-aranjudis-100x100
jardin-vertical-alcazdis-100x100
jardin-vertical-alambdis-100x100
jardin-vertical-botandis-100x100
jardin-vertical-artificial-tamardis
jardin-vertical-mirabdis-100x100
jardin-vertical-artificial-rodas
jardin-vertical-pradis-50x50
```

### Accesorios, adhesivos y perfilería

```
espuma-base-cesped-artificial-10mm
alfombra-vinilo-viendis
cuter-profesional-moqueta
cinta-union-cesped-artificial
perfil-curvo-aluminio-r-a45
perfil-aluminio-a30-acabado-recto-curvo
perfil-adonizado-ae45-aluminio-anodizado-mate-recto
perfil-aluminio-ae30-recto-curvo
perfil-moqueta-r-ae30
perfil-acero-inoxidable-e30
perfil-acero-inoxidable-curvo
perfil-aluminio-a30-recto
tubos-carton-sostenible-envio
piquetas-fijacion-cesped-artificial
retales-revestimiento-textil-alta-calidad
felpudo-coco-23-mm
felpudo-coco-20-mm
felpudo-coco-17-mm
adhesivo-cesped-artificial-deco-green
bostik-msp-turbo-adhesivo-agarre-inmediato
cola-contacto-spray-bostik-neofix
adhesivo-multiusos-suelos-a300-multi-floor
stix-a340-lvt-project
adhesivo-moquetas-removibles-bostik-fix-a320-tack
imprimacion-multiusos-grip-a500-multi
cola-acrilica-revestimientos-stix-a800-premium
cola-contacto-uso-general-bostik-contact-1465
adhesivo-suelos-flexibles-stix-a100-project
cinta-enmascarar-profesional
cinta-americana-multiuso
cinta-azul-doble-cara-removible-dd890
cinta-adhesiva-doble-cara-moqueta
pasta-autonivelante-secado-rapido-bostik-sl-c990-sprinter
autonivelante-pavimentos-interiores-sl-c340-level-plus
pasta-autonivelante-alta-resistencia-sl-c510-pro
film-polietileno-g300-reciclado-300
arena-de-silice
lamina-acustica-10mm-distands-suelos
lamina-acustica-polietileno-5mm-impacto
espuma-sundis-20mm-2
espuma-sundis-20mm
fieltro-sintetico-disstands-200g-m²
fieltro-sintetico-5mm-800g-disstands
fieltro-sintetico-3mm-500g
rodapie-espumado-blanco-hidrofugo-12cm
pavimento-pvc-zig-entrada
barreras-ignifugas-contra-fuego-firedis-block-tagdis-50
```

---

## 19. URLs Categorías — /categoria-producto/ (34 categorías)

Redirect masivo: `/categoria-producto/:slug` → `/catalogo?categoria=:slug`

| Categoría | URL slug |
|-----------|---------|
| Accesorios | `accesorios` |
| Adhesivos y colas | `adhesivos-y-colas` |
| Alfombras moquetas coco vinílico | `alfombras-moquetas-coco-vinilico` |
| Autonivelante | `autonivelante` |
| Césped artificial | `cesped-artificial` |
| Cintas adhesivas | `cintas-adhesivas` |
| Doméstico | `domestico` |
| Espuma pavimentos | `espuma-pavimentos` |
| Espumas underlay | `espumas-underlay` |
| Imitación cuero | `imitacion-cuero` |
| Jardines verticales | `jardines-verticales` |
| Moquetas | `moquetas` |
| Moquetas nauticas Barcelona | `moquetas-nauticas-barcelona` |
| Moquetas personalizadas Barcelona | `moquetas-personalizadas-barcelona` |
| Náutica y piscina | `nautica-y-piscina` |
| Parquet | `parquet` |
| Parquet LVT | `parquet-lvt` |
| Pavimentos contract | `pavimentos-contract` |
| Pavimentos eventos | `pavimentos-moquetas-eventos` |
| Pavimentos hospitales | `pavimentos-hospitales` |
| Perfiles | `perfiles` |
| PVC | `pvc` |
| Sisal | `moqueta-de-sisal` |
| Suelos caucho | `suelos-caucho-barcelona` |
| Suelos caucho (sub) | `suelos-caucho-barcelona/suelos-caucho` |
| Suelos deportivos | `suelos-deportivos` |
| Suelos feriales PVC accesorios | `suelos-feriales-pvc-accesorios` |
| Suelos oficinas | `suelos-oficinas` |
| Suelos oficinas diseño | `suelos-oficinas/suelos-oficinas-diseno` |
| Pavimentos lujo Barcelona | `moquetas/pavimentos-lujo-barcelona` |
| Suelos náuticos alta gama | `moquetas-nauticas-barcelona/suelos-nauticos-alta-gama` |
| Tela vinilo filtro | `tela-vinilo-filtro` |
| Accesorios montaje pavimentos | `accesorios-montaje-pavimentos` |
| Accesorios moquetas vegas velour | `accesorios-moquetas-vegas-velour` |

---

> **Fast Horizons** · Pedro · [pedro@fasthorizons.com](mailto:pedro@fasthorizons.com)
>
> Este documento es confidencial y está destinado exclusivamente al equipo de desarrollo del proyecto Disstands.