-- Portfolio items table
CREATE TABLE public.portfolio_items (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title         TEXT NOT NULL,
  slug          TEXT UNIQUE NOT NULL,
  description   TEXT,
  client_name   TEXT,
  venue         TEXT,
  city          TEXT,
  year          INT,
  m2_total      DECIMAL(10,2),
  cover_image   TEXT,
  gallery       TEXT[] DEFAULT '{}',
  tags          TEXT[] DEFAULT '{}',
  featured      BOOLEAN DEFAULT false,
  status        TEXT DEFAULT 'borrador' CHECK (status IN ('borrador','publicado')),
  event_id      UUID REFERENCES public.events(id),
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;

-- Public can read published items
CREATE POLICY "Anyone can read published portfolio" ON public.portfolio_items
  FOR SELECT USING (status = 'publicado');

-- Super admin can manage
CREATE POLICY "Super admin can manage portfolio" ON public.portfolio_items
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'super_admin'
    )
  );

CREATE TRIGGER set_portfolio_updated_at
  BEFORE UPDATE ON public.portfolio_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
