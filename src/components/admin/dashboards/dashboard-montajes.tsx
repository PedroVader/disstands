"use client";

import {
  Wrench, CalendarDays, MapPin, Truck, Clock, CheckCircle,
} from "lucide-react";
import { KpiCard } from "../kpi-card";
import { ChartCard } from "../chart-card";
import {
  InstallationPieChart,
  M2AreaChart,
  EventsBarChart,
} from "../dashboard-charts";

export function DashboardMontajes() {
  return (
    <>
      {/* KPIs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Eventos activos" value="3" icon={Wrench} color="red" />
        <KpiCard label="Próximos (7 días)" value="5" icon={CalendarDays} color="amber" />
        <KpiCard label="m² por instalar" value="2.340" icon={MapPin} color="blue" />
        <KpiCard label="Completados (mes)" value="9" change={12} icon={CheckCircle} color="green" />
      </div>

      {/* Charts row 1 */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ChartCard title="m² instalados" subtitle="Últimos 6 meses">
          <M2AreaChart />
        </ChartCard>
        <ChartCard title="Estado de instalaciones" subtitle="Distribución actual">
          <InstallationPieChart />
        </ChartCard>
      </div>

      {/* Charts row 2 */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <ChartCard title="Eventos por mes" subtitle="Histórico">
          <EventsBarChart />
        </ChartCard>

        {/* Upcoming installations */}
        <ChartCard title="Próximas instalaciones" className="lg:col-span-2">
          <div className="space-y-3">
            {[
              { event: "MWC 2026", client: "Fira Barcelona", date: "20-22 Mar", m2: 450, status: "Montaje", city: "Barcelona" },
              { event: "Alimentaria 2026", client: "Stand Gourmet S.L.", date: "25-27 Mar", m2: 180, status: "Planificado", city: "Barcelona" },
              { event: "Showroom Adidas", client: "Adidas Spain", date: "1-3 Abr", m2: 320, status: "Planificado", city: "Madrid" },
              { event: "Feria del Mueble", client: "Grupo Habitat", date: "8-12 Abr", m2: 280, status: "Planificado", city: "Valencia" },
              { event: "Pop-up Desigual", client: "Desigual S.A.", date: "15 Abr", m2: 95, status: "Planificado", city: "Barcelona" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border border-brand-gray p-3 transition-colors hover:border-brand-red/30"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-cream">
                    <CalendarDays className="h-4 w-4 text-brand-red" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-brand-black">{item.event}</p>
                    <p className="text-xs text-brand-gray-dark">{item.client}</p>
                  </div>
                </div>
                <div className="hidden items-center gap-6 sm:flex">
                  <div className="flex items-center gap-1.5 text-xs text-brand-gray-dark">
                    <MapPin className="h-3 w-3" />
                    {item.city}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-brand-gray-dark">
                    <Clock className="h-3 w-3" />
                    {item.date}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-brand-gray-dark">
                    <Truck className="h-3 w-3" />
                    {item.m2} m²
                  </div>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    item.status === "Montaje"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-blue-100 text-blue-700"
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>
    </>
  );
}
