"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Logo } from "@/components/shared/logo";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, Package, ShoppingCart, Users, Calendar,
  BarChart3, FileText, LogOut, Settings, Image, Menu, X,
  MessageSquare, Warehouse, Tag,
} from "lucide-react";

interface Profile {
  full_name: string;
  email: string;
  role: string;
  is_active: boolean;
}

const roleLabels: Record<string, string> = {
  super_admin: "Super Admin",
  ceo: "CEO",
  ventas: "Ventas",
  contabilidad: "Contabilidad",
  montajes: "Montajes",
  trabajador: "Trabajador",
};

const menuItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard, roles: ["super_admin", "ceo", "ventas", "contabilidad", "montajes"] },
  { label: "Productos", href: "/admin/productos", icon: Package, roles: ["super_admin", "ceo", "ventas"] },
  { label: "Categorías", href: "/admin/categorias", icon: Tag, roles: ["super_admin", "ceo"] },
  { label: "Pedidos", href: "/admin/pedidos", icon: ShoppingCart, roles: ["super_admin", "ceo", "ventas", "contabilidad", "montajes"] },
  { label: "Clientes", href: "/admin/clientes", icon: Users, roles: ["super_admin", "ceo", "ventas"] },
  { label: "Calendario", href: "/admin/calendario", icon: Calendar, roles: ["super_admin", "ceo", "ventas", "contabilidad", "montajes", "trabajador"] },
  { label: "Inventario", href: "/admin/inventario", icon: Warehouse, roles: ["super_admin", "ceo", "montajes"] },
  { label: "Consultas", href: "/admin/consultas", icon: MessageSquare, roles: ["super_admin", "ceo", "ventas"] },
  { label: "Finanzas", href: "/admin/finanzas", icon: BarChart3, roles: ["super_admin", "ceo", "contabilidad"] },
  { label: "Blog", href: "/admin/blog", icon: FileText, roles: ["super_admin"] },
  { label: "Portfolio", href: "/admin/portfolio", icon: Image, roles: ["super_admin"] },
  { label: "Configuración", href: "/admin/config", icon: Settings, roles: ["super_admin"] },
];

// Dev bypass: set NEXT_PUBLIC_DEV_ROLE in .env.local to skip auth
// e.g. NEXT_PUBLIC_DEV_ROLE=super_admin
const DEV_ROLE = process.env.NEXT_PUBLIC_DEV_ROLE;

export function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Dev bypass — skip Supabase auth entirely
    if (DEV_ROLE) {
      setProfile({
        full_name: `Dev (${roleLabels[DEV_ROLE] || DEV_ROLE})`,
        email: "dev@disstands.com",
        role: DEV_ROLE,
        is_active: true,
      });
      setLoading(false);
      return;
    }

    const load = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/admin/login"); return; }

      const { data } = await supabase
        .from("profiles")
        .select("full_name, email, role, is_active")
        .eq("id", user.id)
        .single();

      if (!data?.is_active) { router.push("/admin/pendiente"); return; }
      setProfile(data);
      setLoading(false);
    };
    load();
  }, [router]);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-brand-cream">
        <p className="text-brand-gray-dark">Cargando…</p>
      </div>
    );
  }

  if (!profile) return null;

  const visibleMenu = menuItems.filter((item) => item.roles.includes(profile.role));

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 flex h-full w-60 flex-col border-r border-brand-gray bg-white transition-transform duration-200 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-14 items-center justify-between border-b border-brand-gray px-4">
          <Link href="/admin"><Logo variant="dark" /></Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X className="h-5 w-5 text-brand-gray-dark" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3">
          <ul className="space-y-1">
            {visibleMenu.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-brand-red/10 text-brand-red"
                        : "text-brand-gray-dark hover:bg-brand-cream hover:text-brand-black"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-brand-gray p-3">
          <div className="rounded-lg bg-brand-cream p-3">
            <p className="text-sm font-medium text-brand-black">{profile.full_name}</p>
            <p className="text-xs text-brand-gray-dark">{roleLabels[profile.role]}</p>
          </div>
          <button
            onClick={handleLogout}
            className="mt-2 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-brand-gray-dark transition-colors hover:bg-brand-cream hover:text-brand-red"
          >
            <LogOut className="h-4 w-4" />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-60">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-brand-gray bg-white px-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-1.5 text-brand-gray-dark hover:bg-brand-cream lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex-1" />
          <span className="text-xs text-brand-gray-dark">{profile.email}</span>
        </header>

        {/* Page content */}
        <div className="p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
