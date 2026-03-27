"use client";

import {
  Euro, TrendingUp, Receipt, CreditCard, ArrowUpRight, ArrowDownRight,
} from "lucide-react";
import { KpiCard } from "../kpi-card";
import { ChartCard } from "../chart-card";
import {
  FinanceAreaChart,
  ExpensePieChart,
  OrdersPieChart,
} from "../dashboard-charts";

export function DashboardContabilidad() {
  return (
    <>
      {/* KPIs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Ingresos mes" value="68.100 €" change={12} icon={ArrowUpRight} color="green" />
        <KpiCard label="Gastos mes" value="32.900 €" change={-3} icon={ArrowDownRight} color="red" />
        <KpiCard label="Beneficio neto" value="35.200 €" change={22} icon={TrendingUp} color="blue" />
        <KpiCard label="Facturas pendientes" value="8" change={-15} icon={Receipt} color="amber" />
      </div>

      {/* Main finance chart */}
      <div className="mt-6">
        <ChartCard title="Evolución financiera" subtitle="Ingresos, gastos y beneficio — últimos 6 meses">
          <FinanceAreaChart />
        </ChartCard>
      </div>

      {/* Charts row 2 */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <ChartCard title="Desglose de gastos" subtitle="Distribución porcentual">
          <ExpensePieChart />
        </ChartCard>
        <ChartCard title="Pedidos por estado" subtitle="Impacto en facturación">
          <OrdersPieChart />
        </ChartCard>

        {/* Pending invoices */}
        <ChartCard title="Facturas pendientes">
          <ul className="space-y-3">
            {[
              { client: "Grupo XYZ S.L.", amount: "4.320 €", date: "15/03/2026", status: "Vencida" },
              { client: "Eventos BCN", amount: "2.180 €", date: "18/03/2026", status: "Pendiente" },
              { client: "Feria Madrid", amount: "6.750 €", date: "20/03/2026", status: "Pendiente" },
              { client: "Stand Pro S.A.", amount: "1.890 €", date: "22/03/2026", status: "Pendiente" },
              { client: "Intermodal BCN", amount: "3.450 €", date: "25/03/2026", status: "Pendiente" },
            ].map((inv, i) => (
              <li key={i} className="flex items-center justify-between text-sm">
                <div>
                  <p className="font-medium text-brand-black">{inv.client}</p>
                  <p className="text-xs text-brand-gray-dark">Vence: {inv.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-brand-black">{inv.amount}</p>
                  <span className={`text-xs font-medium ${inv.status === "Vencida" ? "text-red-500" : "text-amber-500"}`}>
                    {inv.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </ChartCard>
      </div>

      {/* Summary cards */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-brand-gray bg-white p-5">
          <div className="flex items-center gap-3">
            <Euro className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-brand-gray-dark">Total cobrado (año)</p>
              <p className="mt-1 font-[var(--font-heading)] text-xl font-bold text-brand-black">339.800 €</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-brand-gray bg-white p-5">
          <div className="flex items-center gap-3">
            <CreditCard className="h-5 w-5 text-amber-500" />
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-brand-gray-dark">Pendiente de cobro</p>
              <p className="mt-1 font-[var(--font-heading)] text-xl font-bold text-brand-black">18.590 €</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-brand-gray bg-white p-5">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-brand-gray-dark">Margen bruto</p>
              <p className="mt-1 font-[var(--font-heading)] text-xl font-bold text-brand-black">51,7%</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
