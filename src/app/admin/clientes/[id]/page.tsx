"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { AdminShell } from "@/components/admin/admin-shell";
import { cn } from "@/lib/utils";
import { ArrowLeft, Save, ShoppingCart, Building2, Trash2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";

interface ClientDetail {
  id: string;
  company: string | null;
  contact_name: string;
  email: string;
  phone: string | null;
  address: string | null;
  city: string | null;
  postal_code: string | null;
  province: string | null;
  nif: string | null;
  notes: string | null;
  total_spent: number;
  order_count: number;
  created_at: string;
}

interface ClientOrder {
  id: string;
  order_number: string;
  status: string;
  total: number;
  created_at: string;
}

const STATUS_BADGE: Record<string, string> = {
  pendiente: "bg-yellow-100 text-yellow-700",
  pagado: "bg-blue-100 text-blue-700",
  preparacion: "bg-indigo-100 text-indigo-700",
  enviado: "bg-purple-100 text-purple-700",
  instalado: "bg-teal-100 text-teal-700",
  completado: "bg-green-100 text-green-700",
  cancelado: "bg-red-100 text-red-700",
};

export default function AdminClienteDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [client, setClient] = useState<ClientDetail | null>(null);
  const [orders, setOrders] = useState<ClientOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Form state
  const [company, setCompany] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [province, setProvince] = useState("");
  const [nif, setNif] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    loadClient();
  }, [id]);

  const loadClient = async () => {
    const supabase = createClient();

    const { data } = await supabase
      .from("clients")
      .select("*")
      .eq("id", id)
      .single();

    if (!data) {
      router.push("/admin/clientes");
      return;
    }

    setClient(data as ClientDetail);
    setCompany(data.company || "");
    setContactName(data.contact_name);
    setEmail(data.email);
    setPhone(data.phone || "");
    setAddress(data.address || "");
    setCity(data.city || "");
    setPostalCode(data.postal_code || "");
    setProvince(data.province || "");
    setNif(data.nif || "");
    setNotes(data.notes || "");

    // Load client orders
    const { data: orderData } = await supabase
      .from("orders")
      .select("id, order_number, status, total, created_at")
      .eq("client_id", id)
      .order("created_at", { ascending: false })
      .limit(20);

    if (orderData) setOrders(orderData as ClientOrder[]);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!contactName.trim()) { setError("El nombre de contacto es obligatorio"); return; }
    if (!email.trim()) { setError("El email es obligatorio"); return; }

    setSaving(true);
    const supabase = createClient();

    const { error: updateError } = await supabase
      .from("clients")
      .update({
        company: company.trim() || null,
        contact_name: contactName.trim(),
        email: email.trim(),
        phone: phone.trim() || null,
        address: address.trim() || null,
        city: city.trim() || null,
        postal_code: postalCode.trim() || null,
        province: province.trim() || null,
        nif: nif.trim() || null,
        notes: notes.trim() || null,
      })
      .eq("id", id);

    if (updateError) {
      setError(updateError.message);
      toast.error("Error al guardar el cliente");
    } else {
      toast.success("Cliente guardado");
    }
    setSaving(false);
  };

  const handleDelete = async () => {
    const supabase = createClient();
    const { error } = await supabase.from("clients").delete().eq("id", id);
    if (error) {
      toast.error("Error al eliminar el cliente");
    } else {
      toast.success("Cliente eliminado");
      router.push("/admin/clientes");
    }
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(amount);

  if (loading) {
    return (
      <AdminShell>
        <div className="flex items-center justify-center py-20">
          <p className="text-brand-gray-dark">Cargando cliente…</p>
        </div>
      </AdminShell>
    );
  }

  if (!client) return null;

  return (
    <AdminShell>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link
            href="/admin/clientes"
            className="rounded-lg p-1.5 text-brand-gray-dark transition-colors hover:bg-white hover:text-brand-black"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="font-[var(--font-heading)] text-2xl font-bold text-brand-black">
              {client.contact_name}
            </h1>
            {client.company && (
              <p className="mt-0.5 flex items-center gap-1.5 text-sm text-brand-gray-dark">
                <Building2 className="h-3.5 w-3.5" />
                {client.company}
              </p>
            )}
          </div>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="ml-auto rounded-lg p-2 text-brand-gray-dark transition-colors hover:bg-red-50 hover:text-brand-red"
            title="Eliminar cliente"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6 lg:col-span-2">
            <div className="rounded-lg border border-brand-gray bg-white p-5">
              <h2 className="text-sm font-semibold text-brand-black">Datos de contacto</h2>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-brand-black">Nombre contacto *</label>
                  <input
                    type="text"
                    required
                    maxLength={200}
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-brand-black">Empresa</label>
                  <input
                    type="text"
                    maxLength={200}
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-brand-black">Email *</label>
                  <input
                    type="email"
                    required
                    maxLength={254}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-brand-black">Teléfono</label>
                  <input
                    type="tel"
                    maxLength={20}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-brand-black">NIF / CIF</label>
                  <input
                    type="text"
                    maxLength={20}
                    value={nif}
                    onChange={(e) => setNif(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-brand-gray bg-white p-5">
              <h2 className="text-sm font-semibold text-brand-black">Dirección</h2>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium text-brand-black">Dirección</label>
                  <input
                    type="text"
                    maxLength={200}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
                    placeholder="Calle, número, piso…"
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
                <div>
                  <label className="text-sm font-medium text-brand-black">Código postal</label>
                  <input
                    type="text"
                    maxLength={10}
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-brand-black">Provincia</label>
                  <input
                    type="text"
                    maxLength={200}
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-brand-gray bg-white p-5">
              <h2 className="text-sm font-semibold text-brand-black">Notas</h2>
              <textarea
                maxLength={5000}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="mt-3 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
                placeholder="Notas internas sobre el cliente…"
              />
            </div>

            {error && (
              <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">{error}</p>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-lg bg-brand-red px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-red-dark disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                {saving ? "Guardando…" : "Guardar cambios"}
              </button>
            </div>
          </form>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <div className="rounded-lg border border-brand-gray bg-white p-5">
              <h2 className="text-sm font-semibold text-brand-black">Resumen</h2>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-brand-gray-dark">Pedidos</p>
                  <p className="mt-0.5 text-xl font-bold text-brand-black">{client.order_count}</p>
                </div>
                <div>
                  <p className="text-xs text-brand-gray-dark">Total gastado</p>
                  <p className="mt-0.5 text-xl font-bold text-brand-black">{formatCurrency(client.total_spent)}</p>
                </div>
              </div>
              <p className="mt-4 text-xs text-brand-gray-dark">
                Cliente desde {new Date(client.created_at).toLocaleDateString("es-ES", { month: "long", year: "numeric" })}
              </p>
            </div>

            {/* Recent orders */}
            <div className="rounded-lg border border-brand-gray bg-white p-5">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-4 w-4 text-brand-gray-dark" />
                <h2 className="text-sm font-semibold text-brand-black">Últimos pedidos</h2>
              </div>

              {orders.length === 0 ? (
                <p className="mt-3 text-sm text-brand-gray-dark">Sin pedidos aún</p>
              ) : (
                <div className="mt-3 space-y-2">
                  {orders.slice(0, 10).map((order) => (
                    <Link
                      key={order.id}
                      href={`/admin/pedidos/${order.id}`}
                      className="flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-brand-cream"
                    >
                      <div>
                        <p className="font-mono text-xs font-medium text-brand-black">{order.order_number}</p>
                        <span className={cn(
                          "mt-0.5 inline-block rounded-full px-2 py-0.5 text-xs font-medium",
                          STATUS_BADGE[order.status] || "bg-gray-100 text-gray-700"
                        )}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-brand-black">{formatCurrency(order.total)}</p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ConfirmDialog
        open={showDeleteConfirm}
        title="Eliminar cliente"
        description={`¿Eliminar a "${client.contact_name}"? Se perderán todos sus datos. Esta acción no se puede deshacer.`}
        confirmLabel="Eliminar"
        variant="danger"
        onConfirm={() => { handleDelete(); setShowDeleteConfirm(false); }}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </AdminShell>
  );
}
