-- ============================================
-- DISSTANDS CRM — Initial Schema
-- ============================================

-- 1. PROFILES (extends Supabase Auth)
-- ============================================
CREATE TABLE public.profiles (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email         TEXT NOT NULL,
  full_name     TEXT NOT NULL,
  role          TEXT NOT NULL DEFAULT 'trabajador'
                CHECK (role IN ('super_admin','ceo','ventas','contabilidad','montajes','trabajador')),
  avatar_url    TEXT,
  is_active     BOOLEAN DEFAULT false,  -- false until approved by super_admin
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Each user can read their own profile
CREATE POLICY "Users can read own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

-- Each user can update their own profile (but not role or is_active)
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Super admins and CEOs can read all profiles
CREATE POLICY "Admins can read all profiles" ON public.profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role IN ('super_admin', 'ceo')
    )
  );

-- Only super_admin can update any profile (role changes, activation)
CREATE POLICY "Super admin can update all profiles" ON public.profiles
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'super_admin'
    )
  );

-- 2. AUTO-CREATE PROFILE ON SIGNUP
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role, is_active)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    'trabajador',
    false
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 3. RESTRICT SIGNUP TO @disstands.com
-- ============================================
-- This function runs BEFORE a user is created in auth.users
-- It rejects any email that doesn't end with @disstands.com
CREATE OR REPLACE FUNCTION public.check_email_domain()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  IF NEW.email IS NULL OR NEW.email NOT LIKE '%@disstands.com' THEN
    RAISE EXCEPTION 'Solo emails @disstands.com pueden registrarse en la plataforma';
  END IF;
  RETURN NEW;
END;
$$;

-- NOTE: This trigger on auth.users requires running via Supabase SQL Editor
-- as it touches the auth schema directly
CREATE TRIGGER check_email_before_signup
  BEFORE INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.check_email_domain();

-- 4. CATEGORIES
-- ============================================
CREATE TABLE public.categories (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  slug          TEXT UNIQUE NOT NULL,
  description   TEXT,
  image_url     TEXT,
  parent_id     UUID REFERENCES public.categories(id),
  sort_order    INT DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Public read
CREATE POLICY "Anyone can read categories" ON public.categories
  FOR SELECT USING (true);

-- Only super_admin can modify
CREATE POLICY "Super admin can manage categories" ON public.categories
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'super_admin'
    )
  );

-- 5. PRODUCTS
-- ============================================
CREATE TABLE public.products (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  slug          TEXT UNIQUE NOT NULL,
  description   TEXT,
  description_long TEXT,
  category_id   UUID REFERENCES public.categories(id),
  price_per_m2  DECIMAL(10,2),
  min_m2        DECIMAL(10,2) DEFAULT 1,
  material      TEXT,
  thickness     TEXT,
  unit          TEXT DEFAULT 'm²',
  featured      BOOLEAN DEFAULT false,
  active        BOOLEAN DEFAULT true,
  badge         TEXT CHECK (badge IN ('Nuevo', 'Eco', 'Popular', NULL)),
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active products" ON public.products
  FOR SELECT USING (active = true);

CREATE POLICY "Admins can read all products" ON public.products
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role IN ('super_admin', 'ceo', 'ventas')
    )
  );

CREATE POLICY "Super admin can manage products" ON public.products
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'super_admin'
    )
  );

CREATE INDEX idx_products_category ON public.products(category_id);
CREATE INDEX idx_products_active ON public.products(active) WHERE active = true;
CREATE INDEX idx_products_slug ON public.products(slug);

-- 6. PRODUCT VARIANTS
-- ============================================
CREATE TABLE public.product_variants (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id    UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  color         TEXT NOT NULL,
  color_hex     TEXT,
  sku           TEXT,
  image_url     TEXT,
  stock_m2      DECIMAL(10,2) DEFAULT 0,
  reserved_m2   DECIMAL(10,2) DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read variants" ON public.product_variants
  FOR SELECT USING (true);

CREATE POLICY "Super admin can manage variants" ON public.product_variants
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'super_admin'
    )
  );

CREATE INDEX idx_variants_product ON public.product_variants(product_id);

-- 7. PRODUCT IMAGES
-- ============================================
CREATE TABLE public.product_images (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id    UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  url           TEXT NOT NULL,
  sort_order    INT DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read product images" ON public.product_images
  FOR SELECT USING (true);

CREATE POLICY "Super admin can manage images" ON public.product_images
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'super_admin'
    )
  );

-- 8. CLIENTS (ecommerce buyers - NOT system users)
-- ============================================
CREATE TABLE public.clients (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company       TEXT,
  contact_name  TEXT NOT NULL,
  email         TEXT NOT NULL,
  phone         TEXT,
  address       TEXT,
  city          TEXT,
  postal_code   TEXT,
  province      TEXT,
  nif           TEXT,
  notes         TEXT,
  total_spent   DECIMAL(10,2) DEFAULT 0,
  order_count   INT DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

-- Ventas, CEO and super_admin can see clients
CREATE POLICY "Sales team can read clients" ON public.clients
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role IN ('super_admin', 'ceo', 'ventas', 'contabilidad')
    )
  );

CREATE POLICY "Super admin and ventas can manage clients" ON public.clients
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role IN ('super_admin', 'ventas')
    )
  );

-- 9. ORDERS
-- ============================================
CREATE TABLE public.orders (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number      TEXT UNIQUE NOT NULL,
  client_id         UUID NOT NULL REFERENCES public.clients(id),
  status            TEXT NOT NULL DEFAULT 'pendiente'
                    CHECK (status IN ('pendiente','pagado','preparacion',
                                      'enviado','instalado','completado','cancelado')),
  subtotal          DECIMAL(10,2) NOT NULL,
  shipping          DECIMAL(10,2) DEFAULT 0,
  total             DECIMAL(10,2) NOT NULL,
  tpv_order_id      TEXT,
  tpv_auth_code     TEXT,
  needs_install     BOOLEAN DEFAULT false,
  install_address   TEXT,
  install_date      DATE,
  notes             TEXT,
  created_at        TIMESTAMPTZ DEFAULT now(),
  updated_at        TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Team can read orders" ON public.orders
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role IN ('super_admin', 'ceo', 'ventas', 'contabilidad', 'montajes')
    )
  );

CREATE POLICY "Ventas and admin can manage orders" ON public.orders
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role IN ('super_admin', 'ventas')
    )
  );

CREATE INDEX idx_orders_client ON public.orders(client_id);
CREATE INDEX idx_orders_status ON public.orders(status);

-- 10. ORDER LINES
-- ============================================
CREATE TABLE public.order_lines (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id      UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id    UUID NOT NULL REFERENCES public.products(id),
  variant_id    UUID REFERENCES public.product_variants(id),
  m2            DECIMAL(10,2) NOT NULL,
  price_per_m2  DECIMAL(10,2) NOT NULL,
  line_total    DECIMAL(10,2) NOT NULL,
  created_at    TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.order_lines ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Team can read order lines" ON public.order_lines
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role IN ('super_admin', 'ceo', 'ventas', 'contabilidad', 'montajes')
    )
  );

CREATE INDEX idx_order_lines_order ON public.order_lines(order_id);

-- 11. EVENTS / CALENDAR
-- ============================================
CREATE TABLE public.events (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  venue         TEXT,
  city          TEXT,
  start_date    DATE NOT NULL,
  end_date      DATE NOT NULL,
  setup_date    DATE,
  teardown_date DATE,
  status        TEXT DEFAULT 'planificado'
                CHECK (status IN ('planificado','montaje','activo',
                                  'desmontaje','completado','cancelado')),
  client_id     UUID REFERENCES public.clients(id),
  order_id      UUID REFERENCES public.orders(id),
  m2_total      DECIMAL(10,2),
  notes         TEXT,
  created_by    UUID REFERENCES public.profiles(id),
  created_at    TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Team can read events" ON public.events
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role IN ('super_admin', 'ceo', 'ventas', 'montajes')
    )
  );

CREATE POLICY "Montajes can read assigned events" ON public.events
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'trabajador'
    )
    AND created_by = auth.uid()
  );

CREATE INDEX idx_events_dates ON public.events(start_date, end_date);

-- 12. BLOG POSTS
-- ============================================
CREATE TABLE public.blog_posts (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title           TEXT NOT NULL,
  slug            TEXT UNIQUE NOT NULL,
  content         TEXT NOT NULL,
  excerpt         TEXT,
  cover_image     TEXT,
  seo_title       TEXT,
  seo_description TEXT,
  status          TEXT DEFAULT 'borrador' CHECK (status IN ('borrador','publicado')),
  author_id       UUID REFERENCES public.profiles(id),
  published_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Anyone can read published posts
CREATE POLICY "Anyone can read published posts" ON public.blog_posts
  FOR SELECT USING (status = 'publicado');

-- Super admin can manage all posts
CREATE POLICY "Super admin can manage posts" ON public.blog_posts
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'super_admin'
    )
  );

CREATE INDEX idx_blog_slug ON public.blog_posts(slug);
CREATE INDEX idx_blog_status ON public.blog_posts(status);

-- 13. FINANCE
-- ============================================
CREATE TABLE public.finance_entries (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type          TEXT NOT NULL CHECK (type IN ('ingreso','gasto')),
  category      TEXT NOT NULL,
  description   TEXT NOT NULL,
  amount        DECIMAL(10,2) NOT NULL,
  date          DATE NOT NULL,
  order_id      UUID REFERENCES public.orders(id),
  event_id      UUID REFERENCES public.events(id),
  receipt_url   TEXT,
  created_by    UUID NOT NULL REFERENCES public.profiles(id),
  created_at    TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.finance_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Finance team can read" ON public.finance_entries
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role IN ('super_admin', 'ceo', 'contabilidad')
    )
  );

CREATE POLICY "Super admin can manage finance" ON public.finance_entries
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role IN ('super_admin', 'contabilidad')
    )
  );

CREATE INDEX idx_finance_date ON public.finance_entries(date);

-- 14. INVENTORY MOVEMENTS
-- ============================================
CREATE TABLE public.inventory_movements (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id    UUID NOT NULL REFERENCES public.products(id),
  variant_id    UUID REFERENCES public.product_variants(id),
  type          TEXT NOT NULL
                CHECK (type IN ('entrada','salida','reserva','devolucion','ajuste')),
  m2            DECIMAL(10,2) NOT NULL,
  reason        TEXT,
  order_id      UUID REFERENCES public.orders(id),
  event_id      UUID REFERENCES public.events(id),
  created_by    UUID NOT NULL REFERENCES public.profiles(id),
  created_at    TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.inventory_movements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Team can read inventory" ON public.inventory_movements
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role IN ('super_admin', 'ceo', 'montajes')
    )
  );

-- 15. UPDATED_AT TRIGGER
-- ============================================
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
