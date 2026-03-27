"use client";

import {
  CalendarDays, Clock, MapPin, CheckCircle, AlertCircle,
} from "lucide-react";
import { KpiCard } from "../kpi-card";
import { ChartCard } from "../chart-card";

export function DashboardTrabajador() {
  return (
    <>
      {/* KPIs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <KpiCard label="Tareas pendientes" value="4" icon={AlertCircle} color="amber" />
        <KpiCard label="Eventos esta semana" value="2" icon={CalendarDays} color="red" />
        <KpiCard label="Completados (mes)" value="7" change={15} icon={CheckCircle} color="green" />
      </div>

      {/* Upcoming tasks / events */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ChartCard title="Mis tareas pendientes">
          <div className="space-y-3">
            {[
              { task: "Preparar material Moqueta Rib — 120 m²", event: "MWC 2026", priority: "Alta", date: "Hoy" },
              { task: "Verificar stock PVC Click", event: "Alimentaria", priority: "Media", date: "Mañana" },
              { task: "Cortar césped artificial — 85 m²", event: "Showroom Adidas", priority: "Media", date: "22 Mar" },
              { task: "Embalar losetas técnicas", event: "Feria del Mueble", priority: "Baja", date: "24 Mar" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-lg border border-brand-gray p-3"
              >
                <input type="checkbox" className="mt-1 h-4 w-4 rounded border-brand-gray accent-brand-red" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-brand-black">{item.task}</p>
                  <div className="mt-1 flex items-center gap-3">
                    <span className="text-xs text-brand-gray-dark">{item.event}</span>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      item.priority === "Alta"
                        ? "bg-red-100 text-red-700"
                        : item.priority === "Media"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-gray-100 text-gray-600"
                    }`}>
                      {item.priority}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-brand-gray-dark">
                      <Clock className="h-3 w-3" />
                      {item.date}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Próximos eventos">
          <div className="space-y-3">
            {[
              { event: "MWC 2026", date: "20-22 Mar 2026", city: "Barcelona", venue: "Fira Gran Via", role: "Instalación moqueta", m2: 450 },
              { event: "Alimentaria 2026", date: "25-27 Mar 2026", city: "Barcelona", venue: "Fira Montjuïc", role: "Corte y preparación", m2: 180 },
              { event: "Showroom Adidas", date: "1-3 Abr 2026", city: "Madrid", venue: "IFEMA", role: "Instalación césped", m2: 320 },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-lg border border-brand-gray p-4 transition-colors hover:border-brand-red/30"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-[var(--font-heading)] text-sm font-semibold text-brand-black">{item.event}</p>
                    <p className="mt-0.5 text-xs text-brand-red">{item.role}</p>
                  </div>
                  <span className="rounded-full bg-brand-cream px-2.5 py-0.5 text-xs font-medium text-brand-black">
                    {item.m2} m²
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-3 text-xs text-brand-gray-dark">
                  <div className="flex items-center gap-1">
                    <CalendarDays className="h-3 w-3" />
                    {item.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {item.city} — {item.venue}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Weekly summary */}
      <div className="mt-6">
        <ChartCard title="Resumen semanal">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: "Horas trabajadas", value: "32h" },
              { label: "m² instalados", value: "680" },
              { label: "Tareas completadas", value: "5" },
              { label: "Eventos asistidos", value: "2" },
            ].map((s) => (
              <div key={s.label} className="rounded-lg bg-brand-cream p-3 text-center">
                <p className="font-[var(--font-heading)] text-lg font-bold text-brand-black">{s.value}</p>
                <p className="mt-0.5 text-xs text-brand-gray-dark">{s.label}</p>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>
    </>
  );
}
