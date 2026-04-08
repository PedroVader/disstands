"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { AdminShell } from "@/components/admin/admin-shell";
import { cn } from "@/lib/utils";
import {
  ArrowLeft, Package, User, Calendar, FileText,
  ChevronDown, Truck, CheckCircle, XCircle, CreditCard, Wrench, Printer, MapPin,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface LinkedEvent {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  venue: string | null;
  status: string;
}

interface OrderLine {
  id: string;
  m2: number;
  price_per_m2: number;
  line_total: number;
  products: { name: string } | null;
  product_variants: { color: string } | null;
}

interface OrderDetail {
  id: string;
  order_number: string;
  status: string;
  subtotal: number;
  shipping: number;
  total: number;
  notes: string | null;
  needs_install: boolean;
  install_address: string | null;
  install_date: string | null;
  tpv_order_id: string | null;
  tpv_auth_code: string | null;
  created_at: string;
  updated_at: string;
  clients: { id: string; company: string; contact_name: string; email: string; phone: string | null } | null;
  order_lines: OrderLine[];
}

const STATUS_FLOW = [
  { key: "pendiente", label: "Pendiente", icon: FileText, color: "text-yellow-500" },
  { key: "pagado", label: "Pagado", icon: CreditCard, color: "text-blue-500" },
  { key: "preparacion", label: "Preparación", icon: Package, color: "text-indigo-500" },
  { key: "enviado", label: "Enviado", icon: Truck, color: "text-purple-500" },
  { key: "instalado", label: "Instalado", icon: Wrench, color: "text-teal-500" },
  { key: "completado", label: "Completado", icon: CheckCircle, color: "text-green-500" },
  { key: "cancelado", label: "Cancelado", icon: XCircle, color: "text-red-500" },
];

const STATUS_BADGE: Record<string, string> = {
  pendiente: "bg-yellow-100 text-yellow-700",
  pagado: "bg-blue-100 text-blue-700",
  preparacion: "bg-indigo-100 text-indigo-700",
  enviado: "bg-purple-100 text-purple-700",
  instalado: "bg-teal-100 text-teal-700",
  completado: "bg-green-100 text-green-700",
  cancelado: "bg-red-100 text-red-700",
};

export default function AdminPedidoDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [notes, setNotes] = useState("");
  const [linkedEvents, setLinkedEvents] = useState<LinkedEvent[]>([]);

  useEffect(() => {
    loadOrder();
  }, [id]);

  const loadOrder = async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("orders")
      .select(`
        *,
        clients (id, company, contact_name, email, phone),
        order_lines (id, m2, price_per_m2, line_total, products(name), product_variants(color))
      `)
      .eq("id", id)
      .single();

    if (!data) {
      router.push("/admin/pedidos");
      return;
    }

    // Supabase returns FK joins as arrays; cast to our normalized interface
    setOrder(data as unknown as OrderDetail);
    setNotes(data.notes || "");

    // Fetch linked events
    const { data: eventData } = await supabase
      .from("events")
      .select("id, name, start_date, end_date, venue, status")
      .eq("order_id", id);
    if (eventData) setLinkedEvents(eventData as LinkedEvent[]);

    setLoading(false);
  };

  const updateStatus = async (newStatus: string) => {
    if (!order) return;
    setUpdating(true);
    setShowStatusMenu(false);

    const supabase = createClient();
    const { error } = await supabase.from("orders").update({ status: newStatus }).eq("id", order.id);
    if (error) {
      toast.error("Error al actualizar estado");
      setUpdating(false);
      return;
    }
    setOrder({ ...order, status: newStatus });
    toast.success("Estado actualizado");
    setUpdating(false);
  };

  const saveNotes = async () => {
    if (!order) return;
    setUpdating(true);
    const supabase = createClient();
    const { error } = await supabase.from("orders").update({ notes: notes.trim() || null }).eq("id", order.id);
    if (error) {
      toast.error("Error al guardar notas");
      setUpdating(false);
      return;
    }
    toast.success("Notas guardadas");
    setUpdating(false);
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("es-ES", {
      day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit",
    });

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(amount);

  if (loading) {
    return (
      <AdminShell>
        <div className="flex items-center justify-center py-20">
          <p className="text-brand-gray-dark">Cargando pedido…</p>
        </div>
      </AdminShell>
    );
  }

  if (!order) return null;

  const currentStatusIndex = STATUS_FLOW.findIndex((s) => s.key === order.status);

  return (
    <AdminShell>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/pedidos"
              className="rounded-lg p-1.5 text-brand-gray-dark transition-colors hover:bg-white hover:text-brand-black"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="font-[var(--font-heading)] text-2xl font-bold text-brand-black">
                Pedido {order.order_number}
              </h1>
              <p className="mt-0.5 text-sm text-brand-gray-dark">
                Creado el {formatDate(order.created_at)}
              </p>
            </div>
          </div>

          {/* Print + Status changer */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-lg border border-brand-gray px-4 py-2 text-sm font-medium text-brand-gray-dark transition-colors hover:bg-brand-cream hover:text-brand-black"
              title="Imprimir / PDF"
            >
              <Printer className="h-4 w-4" />
              Imprimir
            </button>

            {/* Status changer */}
            <div className="relative">
              <button
                onClick={() => setShowStatusMenu(!showStatusMenu)}
                disabled={updating}
                className={cn(
                  "inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                  STATUS_BADGE[order.status] || "bg-gray-100 text-gray-700"
                )}
              >
                {STATUS_FLOW.find((s) => s.key === order.status)?.label || order.status}
                <ChevronDown className="h-4 w-4" />
              </button>

              {showStatusMenu && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowStatusMenu(false)} />
                  <div className="absolute right-0 z-50 mt-2 w-48 rounded-lg border border-brand-gray bg-white py-1 shadow-lg">
                    {STATUS_FLOW.map((s) => (
                      <button
                        key={s.key}
                        onClick={() => updateStatus(s.key)}
                        className={cn(
                          "flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors hover:bg-brand-cream",
                          order.status === s.key ? "font-medium text-brand-black" : "text-brand-gray-dark"
                        )}
                      >
                        <s.icon className={cn("h-4 w-4", s.color)} />
                        {s.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Status timeline */}
        <div className="overflow-x-auto rounded-lg border border-brand-gray bg-white p-4">
          <div className="flex min-w-[600px] items-center justify-between">
            {STATUS_FLOW.filter((s) => s.key !== "cancelado").map((step, i, arr) => {
              const stepIndex = STATUS_FLOW.findIndex((s) => s.key === step.key);
              const isCompleted = currentStatusIndex >= stepIndex && order.status !== "cancelado";
              const isCurrent = order.status === step.key;

              return (
                <div key={step.key} className="flex flex-1 items-center">
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full",
                        isCurrent
                          ? "bg-brand-red text-white"
                          : isCompleted
                          ? "bg-green-500 text-white"
                          : "bg-brand-gray text-brand-gray-dark"
                      )}
                    >
                      <step.icon className="h-4 w-4" />
                    </div>
                    <span className={cn(
                      "text-xs",
                      isCurrent ? "font-medium text-brand-black" : "text-brand-gray-dark"
                    )}>
                      {step.label}
                    </span>
                  </div>
                  {i < arr.length - 1 && (
                    <div className={cn(
                      "mx-2 h-0.5 flex-1",
                      isCompleted && currentStatusIndex > stepIndex ? "bg-green-500" : "bg-brand-gray"
                    )} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Order lines */}
          <div className="lg:col-span-2">
            <div className="rounded-lg border border-brand-gray bg-white">
              <div className="border-b border-brand-gray px-5 py-3">
                <h2 className="text-sm font-semibold text-brand-black">
                  Líneas del pedido ({order.order_lines?.length || 0})
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-brand-gray bg-brand-cream/50">
                      <th className="px-5 py-2.5 text-left font-medium text-brand-gray-dark">Producto</th>
                      <th className="px-5 py-2.5 text-right font-medium text-brand-gray-dark">Cantidad (m²)</th>
                      <th className="px-5 py-2.5 text-right font-medium text-brand-gray-dark">Precio unit.</th>
                      <th className="px-5 py-2.5 text-right font-medium text-brand-gray-dark">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-gray">
                    {(order.order_lines || []).length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-5 py-8 text-center text-brand-gray-dark">
                          Sin líneas de pedido
                        </td>
                      </tr>
                    ) : (
                      order.order_lines.map((line) => (
                        <tr key={line.id}>
                          <td className="px-5 py-3">
                            <p className="font-medium text-brand-black">{line.products?.name || "—"}</p>
                            {line.product_variants?.color && (
                              <p className="text-xs text-brand-gray-dark">{line.product_variants.color}</p>
                            )}
                          </td>
                          <td className="px-5 py-3 text-right">{line.m2.toLocaleString("es-ES")}</td>
                          <td className="px-5 py-3 text-right">{formatCurrency(line.price_per_m2)}</td>
                          <td className="px-5 py-3 text-right font-medium">{formatCurrency(line.line_total)}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                  <tfoot className="border-t-2 border-brand-gray">
                    <tr>
                      <td colSpan={3} className="px-5 py-2 text-right text-brand-gray-dark">Subtotal</td>
                      <td className="px-5 py-2 text-right">{formatCurrency(order.subtotal)}</td>
                    </tr>
                    <tr>
                      <td colSpan={3} className="px-5 py-2 text-right text-brand-gray-dark">Envío</td>
                      <td className="px-5 py-2 text-right">{order.shipping === 0 ? "Gratis" : formatCurrency(order.shipping)}</td>
                    </tr>
                    <tr>
                      <td colSpan={3} className="px-5 py-2 text-right font-semibold text-brand-black">Total</td>
                      <td className="px-5 py-2 text-right font-semibold text-brand-black">{formatCurrency(order.total)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Notes */}
            <div className="mt-6 rounded-lg border border-brand-gray bg-white p-5" data-no-print>
              <h2 className="text-sm font-semibold text-brand-black">Notas internas</h2>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="mt-3 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
                placeholder="Notas sobre el pedido (solo visibles internamente)…"
              />
              <div className="mt-2 flex justify-end">
                <button
                  onClick={saveNotes}
                  disabled={updating}
                  className="rounded-lg bg-brand-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-dark disabled:opacity-50"
                >
                  Guardar notas
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Linked Events */}
            {linkedEvents.length > 0 && (
              <div className="rounded-lg border border-brand-gray bg-white p-5">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-brand-gray-dark" />
                  <h2 className="text-sm font-semibold text-brand-black">Eventos vinculados</h2>
                </div>
                <div className="mt-3 space-y-2">
                  {linkedEvents.map((event) => (
                    <Link
                      key={event.id}
                      href={`/admin/calendario/${event.id}`}
                      className="block rounded-lg p-2 transition-colors hover:bg-brand-cream"
                    >
                      <p className="font-medium text-brand-black">{event.name}</p>
                      <div className="mt-0.5 flex items-center gap-2 text-xs text-brand-gray-dark">
                        {event.venue && (
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {event.venue}
                          </span>
                        )}
                        <span>
                          {new Date(event.start_date).toLocaleDateString("es-ES", { day: "numeric", month: "short" })}
                          {" – "}
                          {new Date(event.end_date).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" })}
                        </span>
                      </div>
                      <span className={cn(
                        "mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium",
                        event.status === "completado" ? "bg-green-100 text-green-700" :
                        event.status === "activo" ? "bg-blue-100 text-blue-700" :
                        event.status === "cancelado" ? "bg-red-100 text-red-700" :
                        "bg-yellow-100 text-yellow-700"
                      )}>
                        {event.status}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Client */}
            <div className="rounded-lg border border-brand-gray bg-white p-5">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-brand-gray-dark" />
                <h2 className="text-sm font-semibold text-brand-black">Marca</h2>
              </div>
              {order.clients ? (
                <div className="mt-3 space-y-1.5 text-sm">
                  <p className="font-medium text-brand-black">{order.clients.company}</p>
                  <p className="text-brand-gray-dark">{order.clients.contact_name}</p>
                  <p className="text-brand-gray-dark">{order.clients.email}</p>
                  {order.clients.phone && <p className="text-brand-gray-dark">{order.clients.phone}</p>}
                  <Link
                    href={`/admin/marcas/${order.clients.id}`}
                    className="mt-2 inline-block text-xs font-medium text-brand-red hover:text-brand-red-dark"
                  >
                    Ver ficha de la marca →
                  </Link>
                </div>
              ) : (
                <p className="mt-3 text-sm text-brand-gray-dark">Sin marca asociada</p>
              )}
            </div>

            {/* Installation */}
            {order.needs_install && (
              <div className="rounded-lg border border-brand-gray bg-white p-5">
                <div className="flex items-center gap-2">
                  <Wrench className="h-4 w-4 text-brand-gray-dark" />
                  <h2 className="text-sm font-semibold text-brand-black">Instalación</h2>
                </div>
                <div className="mt-3 space-y-1.5 text-sm">
                  {order.install_address ? (
                    <p className="text-brand-black">{order.install_address}</p>
                  ) : (
                    <p className="text-brand-gray-dark">Sin dirección de instalación</p>
                  )}
                  {order.install_date && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5 text-brand-gray-dark" />
                      <p className="text-brand-black">
                        {new Date(order.install_date).toLocaleDateString("es-ES", {
                          weekday: "long", day: "numeric", month: "long", year: "numeric",
                        })}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Payment */}
            {(order.tpv_order_id || order.tpv_auth_code) && (
              <div className="rounded-lg border border-brand-gray bg-white p-5">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-brand-gray-dark" />
                  <h2 className="text-sm font-semibold text-brand-black">Pago TPV</h2>
                </div>
                <div className="mt-3 space-y-1.5 text-sm">
                  {order.tpv_order_id && (
                    <div className="flex justify-between">
                      <span className="text-brand-gray-dark">ID Pedido</span>
                      <span className="font-mono text-brand-black">{order.tpv_order_id}</span>
                    </div>
                  )}
                  {order.tpv_auth_code && (
                    <div className="flex justify-between">
                      <span className="text-brand-gray-dark">Código auth</span>
                      <span className="font-mono text-brand-black">{order.tpv_auth_code}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Dates */}
            <div className="rounded-lg border border-brand-gray bg-white p-5">
              <h2 className="text-sm font-semibold text-brand-black">Fechas</h2>
              <div className="mt-2 space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-brand-gray-dark">Creado</span>
                  <span className="text-brand-black">{formatDate(order.created_at)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-gray-dark">Actualizado</span>
                  <span className="text-brand-black">{formatDate(order.updated_at)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
