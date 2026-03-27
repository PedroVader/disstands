-- ============================================
-- Product Specifications & Documents
-- ============================================

-- 1. PRODUCT SPECIFICATIONS (key/value pairs)
-- ============================================
CREATE TABLE public.product_specifications (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id    UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  label         TEXT NOT NULL,
  value         TEXT NOT NULL,
  sort_order    INT DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.product_specifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read product specifications" ON public.product_specifications
  FOR SELECT USING (true);

CREATE POLICY "Super admin can manage specifications" ON public.product_specifications
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'super_admin'
    )
  );

CREATE INDEX idx_specifications_product ON public.product_specifications(product_id);

-- 2. PRODUCT DOCUMENTS (PDFs, fichas técnicas, etc.)
-- ============================================
CREATE TABLE public.product_documents (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id    UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  name          TEXT NOT NULL,
  type          TEXT NOT NULL DEFAULT 'ficha_tecnica'
                CHECK (type IN ('ficha_tecnica', 'certificado', 'manual', 'otro')),
  url           TEXT NOT NULL,
  file_size     INT,
  sort_order    INT DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.product_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read product documents" ON public.product_documents
  FOR SELECT USING (true);

CREATE POLICY "Super admin can manage documents" ON public.product_documents
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'super_admin'
    )
  );

CREATE INDEX idx_documents_product ON public.product_documents(product_id);
