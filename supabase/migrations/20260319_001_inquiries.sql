-- ============================================
-- DISSTANDS CRM — Inquiries table
-- For contact form + monta tu feria wizard
-- ============================================

CREATE TABLE public.inquiries (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type          TEXT NOT NULL CHECK (type IN ('contacto', 'monta_tu_feria')),
  name          TEXT NOT NULL,
  email         TEXT NOT NULL,
  phone         TEXT,
  company       TEXT,
  topic         TEXT,
  message       TEXT,
  -- Monta tu feria specific fields stored as JSONB
  metadata      JSONB DEFAULT '{}',
  status        TEXT DEFAULT 'nuevo' CHECK (status IN ('nuevo', 'leido', 'respondido', 'cerrado')),
  created_at    TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Public can insert (forms)
CREATE POLICY "Anyone can create inquiries" ON public.inquiries
  FOR INSERT WITH CHECK (true);

-- Team can read
CREATE POLICY "Team can read inquiries" ON public.inquiries
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role IN ('super_admin', 'ceo', 'ventas')
    )
  );

-- Super admin can manage
CREATE POLICY "Super admin can manage inquiries" ON public.inquiries
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'super_admin'
    )
  );

CREATE INDEX idx_inquiries_type ON public.inquiries(type);
CREATE INDEX idx_inquiries_status ON public.inquiries(status);

-- Also allow anonymous inserts for orders (checkout doesn't require auth)
CREATE POLICY "Anyone can create clients" ON public.clients
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can create orders" ON public.orders
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can create order lines" ON public.order_lines
  FOR INSERT WITH CHECK (true);

-- Allow public read on clients by email (for upsert check)
CREATE POLICY "Anyone can read own client by email" ON public.clients
  FOR SELECT USING (true);

-- Allow update of clients (for checkout upsert)
CREATE POLICY "Anyone can update clients" ON public.clients
  FOR UPDATE USING (true);

-- Allow reading orders for order number generation
CREATE POLICY "Anyone can read order numbers" ON public.orders
  FOR SELECT USING (true);
