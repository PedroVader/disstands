"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { AdminShell } from "@/components/admin/admin-shell";
import { cn } from "@/lib/utils";
import {
  ChevronLeft, ChevronRight, Plus, MapPin, Calendar as CalendarIcon,
  Users, Package,
} from "lucide-react";

interface DBEvent {
  id: string;
  name: string;
  venue: string | null;
  city: string | null;
  start_date: string;
  end_date: string;
  setup_date: string | null;
  teardown_date: string | null;
  status: string;
  m2_total: number | null;
  notes: string | null;
  updated_at: string;
  clients: { company: string; contact_name: string } | null;
}

const STATUS_MAP: Record<string, { label: string; color: string; dot: string }> = {
  planificado: { label: "Planificado", color: "bg-blue-100 text-blue-700", dot: "bg-blue-500" },
  montaje: { label: "Montaje", color: "bg-yellow-100 text-yellow-700", dot: "bg-yellow-500" },
  activo: { label: "Activo", color: "bg-green-100 text-green-700", dot: "bg-green-500" },
  desmontaje: { label: "Desmontaje", color: "bg-orange-100 text-orange-700", dot: "bg-orange-500" },
  completado: { label: "Completado", color: "bg-gray-100 text-gray-600", dot: "bg-gray-400" },
  cancelado: { label: "Cancelado", color: "bg-red-100 text-red-700", dot: "bg-red-500" },
};

const MONTHS_ES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

const DAYS_ES = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

export default function AdminCalendarioPage() {
  const [events, setEvents] = useState<DBEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"calendar" | "list">("calendar");
  const [filterStatus, setFilterStatus] = useState("");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const loadEvents = async () => {
    setLoading(true);
    const supabase = createClient();

    // Fetch events in a 2-month window around current month
    const startRange = new Date(year, month - 1, 1).toISOString().split("T")[0];
    const endRange = new Date(year, month + 2, 0).toISOString().split("T")[0];

    let query = supabase
      .from("events")
      .select(`
        id, name, venue, city, start_date, end_date, setup_date, teardown_date,
        status, m2_total, notes, updated_at,
        clients (company, contact_name)
      `)
      .gte("end_date", startRange)
      .lte("start_date", endRange)
      .order("start_date");

    const { data } = await query;
    // Supabase returns FK joins as arrays; cast to our normalized interface
    if (data) setEvents(data as unknown as DBEvent[]);
    setLoading(false);
  };

  useEffect(() => {
    loadEvents();
  }, [year, month]);

  // Calendar grid calculations
  const calendarDays = useMemo(() => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // Monday = 0, Sunday = 6
    let startDow = firstDay.getDay() - 1;
    if (startDow < 0) startDow = 6;

    const days: { date: Date; isCurrentMonth: boolean }[] = [];

    // Previous month padding
    for (let i = startDow - 1; i >= 0; i--) {
      const d = new Date(year, month, -i);
      days.push({ date: d, isCurrentMonth: false });
    }

    // Current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true });
    }

    // Next month padding to complete 6 weeks
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
    }

    return days;
  }, [year, month]);

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    return events.filter((e) => {
      return dateStr >= e.start_date && dateStr <= e.end_date;
    });
  };

  const filteredEvents = filterStatus
    ? events.filter((e) => e.status === filterStatus)
    : events;

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const goToday = () => setCurrentDate(new Date());

  const formatRelativeDate = (dateStr: string) => {
    const d = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    if (diffMins < 1) return "Ahora";
    if (diffMins < 60) return `Hace ${diffMins} min`;
    if (diffHours < 24) return `Hace ${diffHours}h`;
    if (diffDays < 7) return `Hace ${diffDays}d`;
    return d.toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "2-digit" });
  };

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  return (
    <AdminShell>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-[var(--font-heading)] text-2xl font-bold text-brand-black">
              Calendario
            </h1>
            <p className="mt-1 text-sm text-brand-gray-dark">
              Eventos y ferias programados
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setView(view === "calendar" ? "list" : "calendar")}
              className="rounded-lg border border-brand-gray px-3 py-2 text-sm font-medium text-brand-gray-dark transition-colors hover:bg-brand-cream"
            >
              {view === "calendar" ? "Vista lista" : "Vista calendario"}
            </button>
            <Link
              href="/admin/calendario/nuevo"
              className="inline-flex items-center gap-2 rounded-lg bg-brand-red px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-red-dark"
            >
              <Plus className="h-4 w-4" />
              Nuevo evento
            </Link>
          </div>
        </div>

        {/* Month navigation */}
        <div className="flex items-center justify-between rounded-lg border border-brand-gray bg-white p-4">
          <div className="flex items-center gap-2">
            <button
              onClick={prevMonth}
              className="rounded-lg p-1.5 text-brand-gray-dark transition-colors hover:bg-brand-cream"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <h2 className="min-w-[180px] text-center font-[var(--font-heading)] text-lg font-semibold text-brand-black">
              {MONTHS_ES[month]} {year}
            </h2>
            <button
              onClick={nextMonth}
              className="rounded-lg p-1.5 text-brand-gray-dark transition-colors hover:bg-brand-cream"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={goToday}
              className="rounded-lg border border-brand-gray px-3 py-1.5 text-xs font-medium text-brand-gray-dark transition-colors hover:bg-brand-cream"
            >
              Hoy
            </button>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="rounded-lg border border-brand-gray bg-white px-3 py-1.5 text-xs outline-none focus:border-brand-red"
            >
              <option value="">Todos los estados</option>
              {Object.entries(STATUS_MAP).map(([key, { label }]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
        </div>

        {view === "calendar" ? (
          /* Calendar grid */
          <div className="overflow-hidden rounded-lg border border-brand-gray bg-white">
            {/* Day headers */}
            <div className="grid grid-cols-7 border-b border-brand-gray bg-brand-cream">
              {DAYS_ES.map((day) => (
                <div key={day} className="px-2 py-2 text-center text-xs font-medium text-brand-gray-dark">
                  {day}
                </div>
              ))}
            </div>

            {/* Day cells */}
            <div className="grid grid-cols-7">
              {calendarDays.map((day, i) => {
                const dateStr = day.date.toISOString().split("T")[0];
                const dayEvents = getEventsForDate(day.date).filter(
                  (e) => !filterStatus || e.status === filterStatus
                );
                const isToday = dateStr === todayStr;

                return (
                  <div
                    key={i}
                    className={cn(
                      "min-h-[100px] border-b border-r border-brand-gray p-1.5",
                      !day.isCurrentMonth && "bg-brand-cream/50",
                      i % 7 === 6 && "border-r-0"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={cn(
                          "flex h-6 w-6 items-center justify-center rounded-full text-xs",
                          isToday
                            ? "bg-brand-red font-medium text-white"
                            : day.isCurrentMonth
                            ? "text-brand-black"
                            : "text-brand-gray-dark"
                        )}
                      >
                        {day.date.getDate()}
                      </span>
                    </div>

                    <div className="mt-1 space-y-0.5">
                      {dayEvents.slice(0, 3).map((event) => {
                        const status = STATUS_MAP[event.status];
                        return (
                          <Link
                            key={event.id}
                            href={`/admin/calendario/${event.id}`}
                            className="flex items-center gap-1 rounded px-1 py-0.5 text-[10px] leading-tight hover:bg-brand-cream cursor-pointer"
                            title={`${event.name} — ${status?.label || event.status}`}
                          >
                            <span className={cn("h-1.5 w-1.5 flex-shrink-0 rounded-full", status?.dot || "bg-gray-400")} />
                            <span className="truncate text-brand-black">{event.name}</span>
                          </Link>
                        );
                      })}
                      {dayEvents.length > 3 && (
                        <p className="px-1 text-[10px] text-brand-gray-dark">
                          +{dayEvents.length - 3} más
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* List view */
          <div className="space-y-3">
            {loading ? (
              <div className="py-12 text-center text-brand-gray-dark">Cargando eventos…</div>
            ) : filteredEvents.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-brand-gray-dark">No hay eventos para este período</p>
                <Link
                  href="/admin/calendario/nuevo"
                  className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-brand-red hover:text-brand-red-dark"
                >
                  <Plus className="h-4 w-4" />
                  Crear el primero
                </Link>
              </div>
            ) : (
              filteredEvents.map((event) => {
                const status = STATUS_MAP[event.status] || {
                  label: event.status,
                  color: "bg-gray-100 text-gray-700",
                  dot: "bg-gray-400",
                };

                return (
                  <Link
                    key={event.id}
                    href={`/admin/calendario/${event.id}`}
                    className="block rounded-lg border border-brand-gray bg-white p-5 transition-all hover:border-brand-red hover:shadow-sm"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-brand-black">{event.name}</h3>
                          <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", status.color)}>
                            {status.label}
                          </span>
                        </div>

                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-brand-gray-dark">
                          <div className="flex items-center gap-1">
                            <CalendarIcon className="h-3.5 w-3.5" />
                            <span>
                              {new Date(event.start_date).toLocaleDateString("es-ES", { day: "numeric", month: "short" })}
                              {" — "}
                              {new Date(event.end_date).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" })}
                            </span>
                          </div>

                          {(event.venue || event.city) && (
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3.5 w-3.5" />
                              <span>{[event.venue, event.city].filter(Boolean).join(", ")}</span>
                            </div>
                          )}

                          {event.m2_total && (
                            <div className="flex items-center gap-1">
                              <Package className="h-3.5 w-3.5" />
                              <span>{event.m2_total.toLocaleString("es-ES")} m²</span>
                            </div>
                          )}

                          {event.clients && (
                            <div className="flex items-center gap-1">
                              <Users className="h-3.5 w-3.5" />
                              <span>{event.clients.company || event.clients.contact_name}</span>
                            </div>
                          )}
                        </div>

                        {/* Setup/teardown dates */}
                        {(event.setup_date || event.teardown_date) && (
                          <div className="mt-2 flex gap-4 text-xs text-brand-gray-dark">
                            {event.setup_date && (
                              <span>Montaje: {new Date(event.setup_date).toLocaleDateString("es-ES", { day: "numeric", month: "short" })}</span>
                            )}
                            {event.teardown_date && (
                              <span>Desmontaje: {new Date(event.teardown_date).toLocaleDateString("es-ES", { day: "numeric", month: "short" })}</span>
                            )}
                          </div>
                        )}
                        <div className="mt-2 text-xs text-brand-gray-dark/60" title={new Date(event.updated_at).toLocaleString("es-ES")}>
                          Editado {formatRelativeDate(event.updated_at)}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        )}
      </div>
    </AdminShell>
  );
}
