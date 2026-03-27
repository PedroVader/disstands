"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { AdminShell } from "@/components/admin/admin-shell";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";

const STATUS_OPTIONS = [
  { value: "planificado", label: "Planificado" },
  { value: "montaje", label: "Montaje" },
  { value: "activo", label: "Activo" },
  { value: "desmontaje", label: "Desmontaje" },
  { value: "completado", label: "Completado" },
  { value: "cancelado", label: "Cancelado" },
];

export default function NuevoEventoPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [venue, setVenue] = useState("");
  const [city, setCity] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [setupDate, setSetupDate] = useState("");
  const [teardownDate, setTeardownDate] = useState("");
  const [status, setStatus] = useState("planificado");
  const [m2Total, setM2Total] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) { setError("El nombre es obligatorio"); return; }
    if (!startDate) { setError("La fecha de inicio es obligatoria"); return; }
    if (!endDate) { setError("La fecha de fin es obligatoria"); return; }

    setSaving(true);
    const supabase = createClient();

    const { error: insertError } = await supabase.from("events").insert({
      name: name.trim(),
      venue: venue.trim() || null,
      city: city.trim() || null,
      start_date: startDate,
      end_date: endDate,
      setup_date: setupDate || null,
      teardown_date: teardownDate || null,
      status,
      m2_total: m2Total ? parseFloat(m2Total) : null,
      notes: notes.trim() || null,
    });

    if (insertError) {
      setError(insertError.message);
      toast.error("Error al crear evento");
      setSaving(false);
      return;
    }

    toast.success("Evento creado");
    router.push("/admin/calendario");
  };

  return (
    <AdminShell>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/calendario"
            className="rounded-lg p-1.5 text-brand-gray-dark transition-colors hover:bg-white hover:text-brand-black"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="font-[var(--font-heading)] text-2xl font-bold text-brand-black">
              Nuevo evento
            </h1>
            <p className="mt-0.5 text-sm text-brand-gray-dark">
              Añade un nuevo evento o feria al calendario
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mx-auto w-full max-w-2xl space-y-6">
          <div className="rounded-lg border border-brand-gray bg-white p-5">
            <h2 className="text-sm font-semibold text-brand-black">Información del evento</h2>
            <div className="mt-4 space-y-4">
              <div>
                <label className="text-sm font-medium text-brand-black">Nombre del evento *</label>
                <input
                  type="text"
                  required
                  maxLength={200}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
                  placeholder="MWC 2026"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-brand-black">Recinto</label>
                  <input
                    type="text"
                    maxLength={200}
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
                    placeholder="Fira Barcelona"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-brand-black">Ciudad</label>
                  <input
                    type="text"
                    maxLength={200}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
                    placeholder="Barcelona"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-brand-gray bg-white p-5">
            <h2 className="text-sm font-semibold text-brand-black">Fechas</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-brand-black">Fecha inicio *</label>
                <input
                  type="date"
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-brand-black">Fecha fin *</label>
                <input
                  type="date"
                  required
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-brand-black">Fecha montaje</label>
                <input
                  type="date"
                  value={setupDate}
                  onChange={(e) => setSetupDate(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-brand-black">Fecha desmontaje</label>
                <input
                  type="date"
                  value={teardownDate}
                  onChange={(e) => setTeardownDate(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
                />
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-brand-gray bg-white p-5">
            <h2 className="text-sm font-semibold text-brand-black">Detalles</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-brand-black">Estado</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
                >
                  {STATUS_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-brand-black">m² totales</label>
                <input
                  type="number"
                  value={m2Total}
                  onChange={(e) => setM2Total(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
                  placeholder="0"
                  min={0}
                  step="0.01"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="text-sm font-medium text-brand-black">Notas</label>
              <textarea
                maxLength={5000}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
                placeholder="Notas adicionales sobre el evento…"
              />
            </div>
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">{error}</p>
          )}

          <div className="flex items-center justify-end gap-3">
            <Link
              href="/admin/calendario"
              className="rounded-lg border border-brand-gray px-4 py-2.5 text-sm font-medium text-brand-gray-dark hover:bg-brand-cream"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-lg bg-brand-red px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-red-dark disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              {saving ? "Guardando…" : "Crear evento"}
            </button>
          </div>
        </form>
      </div>
    </AdminShell>
  );
}
