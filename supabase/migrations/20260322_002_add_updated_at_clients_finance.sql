-- Add updated_at to clients
ALTER TABLE public.clients ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();
UPDATE public.clients SET updated_at = created_at WHERE updated_at IS NULL;

-- Add updated_at to finance_entries
ALTER TABLE public.finance_entries ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();
UPDATE public.finance_entries SET updated_at = created_at WHERE updated_at IS NULL;

-- Auto-update trigger function (reuse if exists)
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers
DROP TRIGGER IF EXISTS trg_clients_updated_at ON public.clients;
CREATE TRIGGER trg_clients_updated_at
  BEFORE UPDATE ON public.clients
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_finance_entries_updated_at ON public.finance_entries;
CREATE TRIGGER trg_finance_entries_updated_at
  BEFORE UPDATE ON public.finance_entries
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
