-- ============================================
-- Fix infinite recursion in profiles RLS
-- Problem: policies on "profiles" query "profiles" to check role
-- Solution: SECURITY DEFINER function bypasses RLS
-- ============================================

-- 1. Helper function — reads role without triggering RLS
CREATE OR REPLACE FUNCTION public.user_has_role(allowed_roles text[])
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = ANY(allowed_roles)
  )
$$;

-- 2. Drop recursive policies on profiles
DROP POLICY IF EXISTS "Admins can read all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Super admin can update all profiles" ON public.profiles;

-- 3. Recreate using helper function (no recursion)
CREATE POLICY "Admins can read all profiles" ON public.profiles
  FOR SELECT USING (
    public.user_has_role(ARRAY['super_admin', 'ceo'])
  );

CREATE POLICY "Super admin can update all profiles" ON public.profiles
  FOR UPDATE USING (
    public.user_has_role(ARRAY['super_admin'])
  );

-- 4. Also fix all other tables that query profiles in their policies
-- (these don't cause recursion but benefit from the cleaner helper)

-- CATEGORIES
DROP POLICY IF EXISTS "Super admin can manage categories" ON public.categories;
CREATE POLICY "Super admin can manage categories" ON public.categories
  FOR ALL USING (public.user_has_role(ARRAY['super_admin']));

-- PRODUCTS
DROP POLICY IF EXISTS "Admins can read all products" ON public.products;
CREATE POLICY "Admins can read all products" ON public.products
  FOR SELECT USING (public.user_has_role(ARRAY['super_admin', 'ceo', 'ventas']));

DROP POLICY IF EXISTS "Super admin can manage products" ON public.products;
CREATE POLICY "Super admin can manage products" ON public.products
  FOR ALL USING (public.user_has_role(ARRAY['super_admin']));

-- PRODUCT VARIANTS
DROP POLICY IF EXISTS "Super admin can manage variants" ON public.product_variants;
CREATE POLICY "Super admin can manage variants" ON public.product_variants
  FOR ALL USING (public.user_has_role(ARRAY['super_admin']));

-- PRODUCT IMAGES
DROP POLICY IF EXISTS "Super admin can manage images" ON public.product_images;
CREATE POLICY "Super admin can manage images" ON public.product_images
  FOR ALL USING (public.user_has_role(ARRAY['super_admin']));

-- CLIENTS
DROP POLICY IF EXISTS "Sales team can read clients" ON public.clients;
CREATE POLICY "Sales team can read clients" ON public.clients
  FOR SELECT USING (public.user_has_role(ARRAY['super_admin', 'ceo', 'ventas', 'contabilidad']));

DROP POLICY IF EXISTS "Super admin and ventas can manage clients" ON public.clients;
CREATE POLICY "Super admin and ventas can manage clients" ON public.clients
  FOR ALL USING (public.user_has_role(ARRAY['super_admin', 'ventas']));

-- ORDERS
DROP POLICY IF EXISTS "Team can read orders" ON public.orders;
CREATE POLICY "Team can read orders" ON public.orders
  FOR SELECT USING (public.user_has_role(ARRAY['super_admin', 'ceo', 'ventas', 'contabilidad', 'montajes']));

DROP POLICY IF EXISTS "Ventas and admin can manage orders" ON public.orders;
CREATE POLICY "Ventas and admin can manage orders" ON public.orders
  FOR ALL USING (public.user_has_role(ARRAY['super_admin', 'ventas']));

-- ORDER LINES
DROP POLICY IF EXISTS "Team can read order lines" ON public.order_lines;
CREATE POLICY "Team can read order lines" ON public.order_lines
  FOR SELECT USING (public.user_has_role(ARRAY['super_admin', 'ceo', 'ventas', 'contabilidad', 'montajes']));

DROP POLICY IF EXISTS "Admin can manage order lines" ON public.order_lines;
CREATE POLICY "Admin can manage order lines" ON public.order_lines
  FOR ALL USING (public.user_has_role(ARRAY['super_admin', 'ventas']));

-- EVENTS
DROP POLICY IF EXISTS "Team can read events" ON public.events;
CREATE POLICY "Team can read events" ON public.events
  FOR SELECT USING (public.user_has_role(ARRAY['super_admin', 'ceo', 'ventas', 'montajes']));

DROP POLICY IF EXISTS "Montajes can read assigned events" ON public.events;
CREATE POLICY "Montajes can read assigned events" ON public.events
  FOR SELECT USING (
    public.user_has_role(ARRAY['trabajador']) AND created_by = auth.uid()
  );

DROP POLICY IF EXISTS "Admin can manage events" ON public.events;
CREATE POLICY "Admin can manage events" ON public.events
  FOR ALL USING (public.user_has_role(ARRAY['super_admin', 'montajes']));

-- BLOG POSTS
DROP POLICY IF EXISTS "Super admin can manage posts" ON public.blog_posts;
CREATE POLICY "Super admin can manage posts" ON public.blog_posts
  FOR ALL USING (public.user_has_role(ARRAY['super_admin']));

-- FINANCE
DROP POLICY IF EXISTS "Finance team can read" ON public.finance_entries;
CREATE POLICY "Finance team can read" ON public.finance_entries
  FOR SELECT USING (public.user_has_role(ARRAY['super_admin', 'ceo', 'contabilidad']));

DROP POLICY IF EXISTS "Super admin can manage finance" ON public.finance_entries;
CREATE POLICY "Super admin can manage finance" ON public.finance_entries
  FOR ALL USING (public.user_has_role(ARRAY['super_admin', 'contabilidad']));

-- INVENTORY
DROP POLICY IF EXISTS "Team can read inventory" ON public.inventory_movements;
CREATE POLICY "Team can read inventory" ON public.inventory_movements
  FOR SELECT USING (public.user_has_role(ARRAY['super_admin', 'ceo', 'montajes']));

DROP POLICY IF EXISTS "Admin can manage inventory" ON public.inventory_movements;
CREATE POLICY "Admin can manage inventory" ON public.inventory_movements
  FOR ALL USING (public.user_has_role(ARRAY['super_admin', 'montajes']));

-- INQUIRIES
DROP POLICY IF EXISTS "Team can read inquiries" ON public.inquiries;
CREATE POLICY "Team can read inquiries" ON public.inquiries
  FOR SELECT USING (public.user_has_role(ARRAY['super_admin', 'ceo', 'ventas']));

DROP POLICY IF EXISTS "Super admin can manage inquiries" ON public.inquiries;
CREATE POLICY "Super admin can manage inquiries" ON public.inquiries
  FOR ALL USING (public.user_has_role(ARRAY['super_admin']));
