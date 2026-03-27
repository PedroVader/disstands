-- ============================================
-- Fix missing write RLS policies
-- Events, order_lines, inventory_movements
-- ============================================

-- EVENTS: allow super_admin and montajes to manage
CREATE POLICY "Admin can manage events" ON public.events
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role IN ('super_admin', 'montajes')
    )
  );

-- ORDER_LINES: allow super_admin and ventas to manage
CREATE POLICY "Admin can manage order lines" ON public.order_lines
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role IN ('super_admin', 'ventas')
    )
  );

-- INVENTORY_MOVEMENTS: allow super_admin and montajes to manage
CREATE POLICY "Admin can manage inventory" ON public.inventory_movements
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role IN ('super_admin', 'montajes')
    )
  );
