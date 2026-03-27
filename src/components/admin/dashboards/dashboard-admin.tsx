"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  ShoppingCart, Euro, Package, CalendarDays, Users, TrendingUp,
  MessageSquare, RefreshCw,
} from "lucide-react";
import { KpiCard } from "../kpi-card";
import { ChartCard } from "../chart-card";
import {
  OrdersPieChart,
} from "../dashboard-charts";
import Link from "next/link";

interface KpiData {
  ordersToday: number;
  revenueMonth: number;
  activeProducts: number;
  eventsThisMonth: number;
  totalClients: number;
  pendingInquiries: number;
}

interface RecentOrder {
  id: string;
  order_number: string;
  total: number;
  status: string;
  created_at: string;
  clients: { company: string } | null;
}

interface RecentInquiry {
  id: string;
  type: string;
  name: string;
  created_at: string;
}

export function DashboardAdmin() {
  const [kpis, setKpis] = useState<KpiData | null>(null);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [recentInquiries, setRecentInquiries] = useState<RecentInquiry[]>([]);
  const [ordersByStatus, setOrdersByStatus] = useState<{ name: string; value: number }[]>([]);
  const [loading, setLoading] = useState(true);

  const loadDashboard = async () => {
    setLoading(true);
    const supabase = createClient();
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split("T")[0];
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split("T")[0];

    // Run all queries in parallel
    const [
      ordersToday,
      revenueMonth,
      activeProducts,
      eventsMonth,
      totalClients,
      pendingInquiries,
      recent,
      inquiriesRecent,
      statusCounts,
    ] = await Promise.all([
      // Orders created today
      supabase
        .from("orders")
        .select("id", { count: "exact", head: true })
        .gte("created_at", todayStart),

      // Revenue this month (sum of order totals with status != cancelado)
      supabase
        .from("orders")
        .select("total")
        .gte("created_at", `${monthStart}T00:00:00`)
        .neq("status", "cancelado"),

      // Active products count
      supabase
        .from("products")
        .select("id", { count: "exact", head: true })
        .eq("active", true),

      // Events this month
      supabase
        .from("events")
        .select("id", { count: "exact", head: true })
        .gte("start_date", monthStart)
        .lte("start_date", monthEnd),

      // Total clients
      supabase
        .from("clients")
        .select("id", { count: "exact", head: true }),

      // Pending inquiries (status = nuevo)
      supabase
        .from("inquiries")
        .select("id", { count: "exact", head: true })
        .eq("status", "nuevo"),

      // Recent orders
      supabase
        .from("orders")
        .select("id, order_number, total, status, created_at, clients(company)")
        .order("created_at", { ascending: false })
        .limit(5),

      // Recent inquiries
      supabase
        .from("inquiries")
        .select("id, type, name, created_at")
        .order("created_at", { ascending: false })
        .limit(3),

      // Orders by status (for pie chart)
      supabase
        .from("orders")
        .select("status"),
    ]);

    // Calculate revenue sum
    const revSum = (revenueMonth.data || []).reduce(
      (sum, o) => sum + (Number(o.total) || 0), 0
    );

    // Calculate status distribution
    const statusMap: Record<string, number> = {};
    for (const o of statusCounts.data || []) {
      statusMap[o.status] = (statusMap[o.status] || 0) + 1;
    }
    const STATUS_LABELS: Record<string, string> = {
      pendiente: "Pendiente",
      pagado: "Pagado",
      preparacion: "Preparación",
      enviado: "Enviado",
      instalado: "Instalado",
      completado: "Completado",
      cancelado: "Cancelado",
    };
    const statusData = Object.entries(statusMap).map(([key, value]) => ({
      name: STATUS_LABELS[key] || key,
      value,
    }));

    setKpis({
      ordersToday: ordersToday.count || 0,
      revenueMonth: revSum,
      activeProducts: activeProducts.count || 0,
      eventsThisMonth: eventsMonth.count || 0,
      totalClients: totalClients.count || 0,
      pendingInquiries: pendingInquiries.count || 0,
    });
    setRecentOrders((recent.data || []) as unknown as RecentOrder[]);
    setRecentInquiries((inquiriesRecent.data || []) as RecentInquiry[]);
    setOrdersByStatus(statusData);
    setLoading(false);
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

  const formatTimeAgo = (iso: string) => {
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Ahora";
    if (mins < 60) return `Hace ${mins} min`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `Hace ${hours}h`;
    const days = Math.floor(hours / 24);
    return `Hace ${days}d`;
  };

  const STATUS_BADGE: Record<string, string> = {
    pendiente: "bg-yellow-100 text-yellow-700",
    pagado: "bg-blue-100 text-blue-700",
    preparacion: "bg-indigo-100 text-indigo-700",
    enviado: "bg-purple-100 text-purple-700",
    instalado: "bg-teal-100 text-teal-700",
    completado: "bg-green-100 text-green-700",
    cancelado: "bg-red-100 text-red-700",
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-brand-gray-dark">Cargando dashboard…</p>
      </div>
    );
  }

  return (
    <>
      {/* Refresh */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={loadDashboard}
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-brand-gray-dark transition-colors hover:bg-white hover:text-brand-black"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Actualizar
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <KpiCard
          label="Pedidos hoy"
          value={String(kpis?.ordersToday ?? 0)}
          icon={ShoppingCart}
          color="red"
        />
        <KpiCard
          label="Ingresos mes"
          value={formatCurrency(kpis?.revenueMonth ?? 0)}
          icon={Euro}
          color="green"
        />
        <KpiCard
          label="Productos activos"
          value={String(kpis?.activeProducts ?? 0)}
          icon={Package}
          color="blue"
        />
        <KpiCard
          label="Eventos este mes"
          value={String(kpis?.eventsThisMonth ?? 0)}
          icon={CalendarDays}
          color="amber"
        />
        <KpiCard
          label="Clientes"
          value={String(kpis?.totalClients ?? 0)}
          icon={Users}
          color="default"
        />
        <KpiCard
          label="Consultas nuevas"
          value={String(kpis?.pendingInquiries ?? 0)}
          icon={MessageSquare}
          color="red"
        />
      </div>

      {/* Row 1: Orders pie + recent orders */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <ChartCard title="Pedidos por estado" subtitle="Distribución actual">
          {ordersByStatus.length > 0 ? (
            <OrdersPieChart data={ordersByStatus} />
          ) : (
            <p className="flex h-[280px] items-center justify-center text-sm text-brand-gray-dark">
              Sin pedidos
            </p>
          )}
        </ChartCard>

        <ChartCard title="Últimos pedidos" className="lg:col-span-2">
          {recentOrders.length === 0 ? (
            <p className="py-8 text-center text-sm text-brand-gray-dark">Sin pedidos recientes</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-brand-gray text-left">
                    <th className="pb-2 pr-4 text-xs font-medium text-brand-gray-dark">Pedido</th>
                    <th className="pb-2 pr-4 text-xs font-medium text-brand-gray-dark">Cliente</th>
                    <th className="pb-2 pr-4 text-xs font-medium text-brand-gray-dark">Estado</th>
                    <th className="pb-2 text-right text-xs font-medium text-brand-gray-dark">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-gray/50">
                  {recentOrders.map((o) => (
                    <tr key={o.id}>
                      <td className="py-2 pr-4">
                        <Link href={`/admin/pedidos/${o.id}`} className="font-mono text-brand-red hover:text-brand-red-dark">
                          {o.order_number}
                        </Link>
                      </td>
                      <td className="py-2 pr-4 text-brand-gray-dark">
                        {o.clients?.company || "—"}
                      </td>
                      <td className="py-2 pr-4">
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_BADGE[o.status] || "bg-gray-100 text-gray-700"}`}>
                          {o.status}
                        </span>
                      </td>
                      <td className="py-2 text-right font-medium text-brand-black">
                        {formatCurrency(o.total)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </ChartCard>
      </div>

      {/* Row 2: Recent activity */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ChartCard title="Consultas recientes">
          {recentInquiries.length === 0 ? (
            <p className="py-8 text-center text-sm text-brand-gray-dark">Sin consultas</p>
          ) : (
            <ul className="space-y-3">
              {recentInquiries.map((inq) => (
                <li key={inq.id} className="flex items-start justify-between gap-4">
                  <Link href="/admin/consultas" className="text-sm text-brand-black transition-colors hover:text-brand-red">
                    <span className={`mr-2 rounded-full px-2 py-0.5 text-xs font-medium ${inq.type === "contacto" ? "bg-indigo-100 text-indigo-700" : "bg-purple-100 text-purple-700"}`}>
                      {inq.type === "contacto" ? "Contacto" : "Feria"}
                    </span>
                    {inq.name}
                  </Link>
                  <span className="shrink-0 text-xs text-brand-gray-dark">{formatTimeAgo(inq.created_at)}</span>
                </li>
              ))}
            </ul>
          )}
        </ChartCard>

        <ChartCard title="Accesos rápidos">
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Nuevo pedido", href: "/admin/pedidos/nuevo", icon: ShoppingCart },
              { label: "Nuevo evento", href: "/admin/calendario/nuevo", icon: CalendarDays },
              { label: "Ver consultas", href: "/admin/consultas", icon: MessageSquare },
              { label: "Ver inventario", href: "/admin/inventario", icon: Package },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-lg border border-brand-gray p-3 text-sm font-medium text-brand-black transition-colors hover:border-brand-red hover:text-brand-red"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </div>
        </ChartCard>
      </div>
    </>
  );
}
