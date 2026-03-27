"use client";

import {
  ShoppingCart, Euro, Users, Target, TrendingUp, Package,
} from "lucide-react";
import { KpiCard } from "../kpi-card";
import { ChartCard } from "../chart-card";
import {
  DailyOrdersChart,
  TopProductsBarChart,
  SalesByCategoryPieChart,
  RevenueAreaChart,
} from "../dashboard-charts";
import Link from "next/link";

export function DashboardVentas() {
  return (
    <>
      {/* KPIs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Pedidos esta semana" value="32" change={14} icon={ShoppingCart} color="red" />
        <KpiCard label="Ventas mes" value="68.100 €" change={12} icon={Euro} color="green" />
        <KpiCard label="Objetivo mensual" value="78%" change={5} icon={Target} color="amber" />
        <KpiCard label="Nuevos clientes" value="12" change={20} icon={Users} color="blue" />
      </div>

      {/* Charts row 1 */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ChartCard title="Evolución de ventas" subtitle="Ingresos últimos 6 meses">
          <RevenueAreaChart />
        </ChartCard>
        <ChartCard title="Pedidos esta semana" subtitle="Pedidos y m² por día">
          <DailyOrdersChart />
        </ChartCard>
      </div>

      {/* Charts row 2 */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <ChartCard title="Top 5 productos" subtitle="Por m² vendidos">
          <TopProductsBarChart />
        </ChartCard>
        <ChartCard title="Ventas por categoría" subtitle="Distribución porcentual">
          <SalesByCategoryPieChart />
        </ChartCard>

        {/* Pending tasks */}
        <ChartCard title="Pendientes de gestión">
          <ul className="space-y-3">
            {[
              { text: "3 presupuestos pendientes de envío", icon: "📋" },
              { text: "Pedido #1243 — confirmar pago", icon: "💳" },
              { text: "Cliente Intermodal BCN — seguimiento", icon: "📞" },
              { text: "Restock alerta: PVC Click (23 m²)", icon: "⚠️" },
              { text: "5 consultas web sin responder", icon: "✉️" },
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-brand-black">
                <span>{item.icon}</span>
                {item.text}
              </li>
            ))}
          </ul>
        </ChartCard>
      </div>

      {/* Quick actions */}
      <div className="mt-6">
        <ChartCard title="Accesos rápidos">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Nuevo pedido", href: "/admin/pedidos", icon: ShoppingCart },
              { label: "Nuevo cliente", href: "/admin/clientes/nuevo", icon: Users },
              { label: "Catálogo", href: "/admin/productos", icon: Package },
              { label: "Informes", href: "/admin/finanzas", icon: TrendingUp },
            ].map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="flex flex-col items-center gap-2 rounded-lg border border-brand-gray p-4 text-center transition-all hover:border-brand-red hover:shadow-sm"
              >
                <action.icon className="h-5 w-5 text-brand-red" />
                <span className="text-xs font-medium text-brand-black">{action.label}</span>
              </Link>
            ))}
          </div>
        </ChartCard>
      </div>
    </>
  );
}
