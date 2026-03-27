"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { AdminShell } from "@/components/admin/admin-shell";
import { ArrowLeft, Save, Trash2, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";

const STATUS_OPTIONS = [
  { value: "planificado", label: "Planificado" },
  { value: "montaje", label: "Montaje" },
  { value: "activo", label: "Activo" },
  { value: "desmontaje", label: "Desmontaje" },
  { value: "completado", label: "Completado" },
  { value: "cancelado", label: "Cancelado" },
];

interface LinkedOrder {
  id: string;
  order_number: string;
  status: string;
  total: number;
}

export default function EditarEventoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [linkedOrder, setLinkedOrder] = useState<LinkedOrder | null>(null);

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
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const loadEvent = async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("events")
      .select("*")
      .eq("id", id)
      .single();

    if (!data) {
      router.push("/admin/calendario");
      return;
    }

    setName(data.name);
    setVenue(data.venue || "");
    setCity(data.city || "");
    setStartDate(data.start_date);
    setEndDate(data.end_date);
    setSetupDate(data.setup_date || "");
    setTeardownDate(data.teardown_date || "");
    setStatus(data.status);
    setM2Total(data.m2_total != null ? String(data.m2_total) : "");
    setNotes(data.notes || "");

    // Fetch linked order
    if (data.order_id) {
      const { data: orderData } = await supabase
        .from("orders")
        .select("id, order_number, status, total")
        .eq("id", data.order_id)
        .single();
      if (orderData) setLinkedOrder(orderData as LinkedOrder);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadEvent();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) { setError("El nombre es obligatorio"); return; }
    if (!startDate) { setError("La fecha de inicio es obligatoria"); return; }
    if (!endDate) { setError("La fecha de fin es obligatoria"); return; }

    setSaving(true);
    const supabase = createClient();

    const { error: updateError } = await supabase
      .from("events")
      .update({
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
      })
      .eq("id", id);

    if (updateError) {
      setError(updateError.message);
      toast.error("Error al guardar evento");
      setSaving(false);
      return;
    }

    toast.success("Evento guardado");
    router.push("/admin/calendario");
  };

  const confirmDelete = async () => {
    const supabase = createClient();
    const { error } = await supabase.from("events").delete().eq("id", id);
    if (error) {
      toast.error("Error al eliminar evento");
      return;
    }
    toast.success("Evento eliminado");
    router.push("/admin/calendario");
  };

  if (loading) {
    return (
      <AdminShell>
        <div className="flex items-center justify-center py-20">
          <p className="text-brand-gray-dark">Cargando evento…</p>
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/calendario"
              className="rounded-lg p-1.5 text-brand-gray-dark transition-colors hover:bg-white hover:text-brand-black"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="font-[var(--font-heading)] text-2xl font-bold text-brand-black">
                Editar evento
              </h1>
              <p className="mt-0.5 text-sm text-brand-gray-dark">{name}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowDeleteConfirm(true)}
            className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
            Eliminar
          </button>
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
              {saving ? "Guardando…" : "Guardar cambios"}
            </button>
          </div>
        </form>

        {/* Linked Order */}
        {linkedOrder && (
          <div className="mx-auto w-full max-w-2xl rounded-lg border border-brand-gray bg-white p-5">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4 text-brand-gray-dark" />
              <h2 className="text-sm font-semibold text-brand-black">Pedido vinculado</h2>
            </div>
            <Link
              href={`/admin/pedidos/${linkedOrder.id}`}
              className="mt-3 flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-brand-cream"
            >
              <div>
                <p className="font-mono text-sm font-medium text-brand-black">{linkedOrder.order_number}</p>
                <span className="mt-0.5 inline-block rounded-full px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-700">
                  {linkedOrder.status}
                </span>
              </div>
              <p className="text-sm font-medium text-brand-black">
                {new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(linkedOrder.total)}
              </p>
            </Link>
          </div>
        )}
      </div>

      <ConfirmDialog
        open={showDeleteConfirm}
        title="Eliminar evento"
        description="¿Eliminar este evento? Esta acción no se puede deshacer."
        confirmLabel="Eliminar"
        variant="danger"
        onConfirm={() => { confirmDelete(); setShowDeleteConfirm(false); }}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </AdminShell>
  );
}
