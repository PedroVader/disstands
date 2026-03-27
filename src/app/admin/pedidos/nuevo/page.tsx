"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { AdminShell } from "@/components/admin/admin-shell";
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface ClientOption {
  id: string;
  company: string;
  contact_name: string;
  email: string;
}

interface ProductOption {
  id: string;
  name: string;
  slug: string;
  price_per_m2: number;
  variants: { id: string; color: string }[];
}

interface OrderLine {
  productId: string;
  variantId: string;
  m2: number;
  pricePerM2: number;
}

const STATUS_OPTIONS = [
  { value: "pendiente", label: "Pendiente" },
  { value: "pagado", label: "Pagado" },
  { value: "preparacion", label: "Preparación" },
  { value: "enviado", label: "Enviado" },
  { value: "instalado", label: "Instalado" },
  { value: "completado", label: "Completado" },
  { value: "cancelado", label: "Cancelado" },
];

export default function NuevoPedidoPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [clients, setClients] = useState<ClientOption[]>([]);
  const [products, setProducts] = useState<ProductOption[]>([]);
  const [clientId, setClientId] = useState("");
  const [status, setStatus] = useState("pendiente");
  const [needsInstall, setNeedsInstall] = useState(false);
  const [installAddress, setInstallAddress] = useState("");
  const [installDate, setInstallDate] = useState("");
  const [notes, setNotes] = useState("");
  const [lines, setLines] = useState<OrderLine[]>([
    { productId: "", variantId: "", m2: 1, pricePerM2: 0 },
  ]);

  useEffect(() => {
    const load = async () => {
      const supabase = createClient();

      const { data: clientData } = await supabase
        .from("clients")
        .select("id, company, contact_name, email")
        .order("company");

      if (clientData) setClients(clientData as ClientOption[]);

      const { data: productData } = await supabase
        .from("products")
        .select("id, name, slug, price_per_m2, product_variants(id, color)")
        .eq("active", true)
        .order("name");

      // Supabase returns FK joins as arrays; cast to our normalized interface
      if (productData) setProducts(productData as unknown as ProductOption[]);
    };
    load();
  }, []);

  const addLine = () => {
    setLines([...lines, { productId: "", variantId: "", m2: 1, pricePerM2: 0 }]);
  };

  const removeLine = (index: number) => {
    if (lines.length <= 1) return;
    setLines(lines.filter((_, i) => i !== index));
  };

  const updateLine = (index: number, field: keyof OrderLine, value: string | number) => {
    setLines(
      lines.map((line, i) => {
        if (i !== index) return line;
        const updated = { ...line, [field]: value };
        // Auto-fill price when selecting product
        if (field === "productId") {
          const product = products.find((p) => p.id === value);
          if (product) {
            updated.pricePerM2 = product.price_per_m2;
            updated.variantId = product.variants?.[0]?.id || "";
          }
        }
        return updated;
      })
    );
  };

  const subtotal = lines.reduce((sum, l) => sum + l.m2 * l.pricePerM2, 0);
  const shipping = subtotal >= 500 ? 0 : 29.9;
  const total = subtotal + shipping;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!clientId) { setError("Selecciona un cliente"); return; }
    if (lines.some((l) => !l.productId || l.m2 <= 0)) {
      setError("Completa todas las líneas del pedido");
      return;
    }

    setSaving(true);
    const supabase = createClient();

    // Generate order number
    const year = new Date().getFullYear();
    const { data: lastOrder } = await supabase
      .from("orders")
      .select("order_number")
      .ilike("order_number", `DIS-${year}-%`)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    let seq = 1;
    if (lastOrder?.order_number) {
      const parts = lastOrder.order_number.split("-");
      const lastSeq = parseInt(parts[2], 10);
      if (!isNaN(lastSeq)) seq = lastSeq + 1;
    }
    const orderNumber = `DIS-${year}-${String(seq).padStart(4, "0")}`;

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        order_number: orderNumber,
        client_id: clientId,
        status,
        subtotal,
        shipping,
        total,
        needs_install: needsInstall,
        install_address: needsInstall ? installAddress : null,
        install_date: needsInstall && installDate ? installDate : null,
        notes: notes.trim() || null,
      })
      .select("id")
      .single();

    if (orderError || !order) {
      setError(orderError?.message || "Error al crear el pedido");
      toast.error("Error al crear el pedido");
      setSaving(false);
      return;
    }

    // Insert order lines
    const orderLines = lines.map((l) => ({
      order_id: order.id,
      product_id: l.productId,
      variant_id: l.variantId || null,
      m2: l.m2,
      price_per_m2: l.pricePerM2,
      line_total: l.m2 * l.pricePerM2,
    }));

    const { error: linesError } = await supabase.from("order_lines").insert(orderLines);

    if (linesError) {
      setError("Error al crear líneas: " + linesError.message);
      toast.error("Error al crear líneas del pedido");
      setSaving(false);
      return;
    }

    toast.success("Pedido creado");
    router.push("/admin/pedidos");
  };

  const getProductVariants = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    return product?.variants || [];
  };

  return (
    <AdminShell>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/pedidos"
            className="rounded-lg p-1.5 text-brand-gray-dark transition-colors hover:bg-white hover:text-brand-black"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="font-[var(--font-heading)] text-2xl font-bold text-brand-black">
              Nuevo pedido
            </h1>
            <p className="mt-0.5 text-sm text-brand-gray-dark">
              Crea un pedido manualmente
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mx-auto w-full max-w-3xl space-y-6">
          {/* Client & Status */}
          <div className="rounded-lg border border-brand-gray bg-white p-5">
            <h2 className="text-sm font-semibold text-brand-black">Cliente y estado</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-brand-black">Cliente *</label>
                <select
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
                >
                  <option value="">Seleccionar cliente…</option>
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.company || c.contact_name} — {c.email}
                    </option>
                  ))}
                </select>
              </div>
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
            </div>
          </div>

          {/* Order lines */}
          <div className="rounded-lg border border-brand-gray bg-white p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-brand-black">Productos</h2>
              <button
                type="button"
                onClick={addLine}
                className="inline-flex items-center gap-1 rounded-lg border border-brand-gray px-3 py-1.5 text-xs font-medium text-brand-gray-dark hover:bg-brand-cream"
              >
                <Plus className="h-3.5 w-3.5" />
                Añadir línea
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {lines.map((line, i) => (
                <div key={i} className="grid items-end gap-3 rounded-lg border border-brand-gray p-3 sm:grid-cols-12">
                  <div className="sm:col-span-4">
                    <label className="text-xs font-medium text-brand-gray-dark">Producto</label>
                    <select
                      value={line.productId}
                      onChange={(e) => updateLine(i, "productId", e.target.value)}
                      className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-2 py-1.5 text-sm outline-none focus:border-brand-red"
                    >
                      <option value="">Seleccionar…</option>
                      {products.map((p) => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-3">
                    <label className="text-xs font-medium text-brand-gray-dark">Variante</label>
                    <select
                      value={line.variantId}
                      onChange={(e) => updateLine(i, "variantId", e.target.value)}
                      className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-2 py-1.5 text-sm outline-none focus:border-brand-red"
                    >
                      <option value="">—</option>
                      {getProductVariants(line.productId).map((v) => (
                        <option key={v.id} value={v.id}>{v.color}</option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-medium text-brand-gray-dark">m²</label>
                    <input
                      type="number"
                      value={line.m2}
                      onChange={(e) => updateLine(i, "m2", parseFloat(e.target.value) || 0)}
                      className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-2 py-1.5 text-sm outline-none focus:border-brand-red"
                      min={0.1}
                      step={0.1}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-medium text-brand-gray-dark">€/m²</label>
                    <input
                      type="number"
                      value={line.pricePerM2}
                      onChange={(e) => updateLine(i, "pricePerM2", parseFloat(e.target.value) || 0)}
                      className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-2 py-1.5 text-sm outline-none focus:border-brand-red"
                      min={0}
                      step={0.01}
                    />
                  </div>
                  <div className="flex items-center justify-between sm:col-span-1">
                    <span className="text-sm font-medium text-brand-black">
                      {(line.m2 * line.pricePerM2).toFixed(2)} €
                    </span>
                    {lines.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeLine(i)}
                        className="rounded p-1 text-brand-gray-dark hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="mt-4 space-y-1 border-t border-brand-gray pt-4 text-sm">
              <div className="flex justify-between">
                <span className="text-brand-gray-dark">Subtotal</span>
                <span className="font-medium">{subtotal.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-gray-dark">Envío</span>
                <span className="font-medium">{shipping === 0 ? "Gratis" : `${shipping.toFixed(2)} €`}</span>
              </div>
              <div className="flex justify-between border-t border-brand-gray pt-2">
                <span className="font-semibold text-brand-black">Total</span>
                <span className="font-[var(--font-heading)] text-lg font-bold text-brand-red">{total.toFixed(2)} €</span>
              </div>
            </div>
          </div>

          {/* Installation */}
          <div className="rounded-lg border border-brand-gray bg-white p-5">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={needsInstall}
                onChange={(e) => setNeedsInstall(e.target.checked)}
                className="h-4 w-4 rounded border-brand-gray accent-brand-red"
              />
              <span className="text-sm font-medium text-brand-black">Necesita instalación</span>
            </label>

            {needsInstall && (
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-brand-black">Dirección de instalación</label>
                  <input
                    type="text"
                    maxLength={200}
                    value={installAddress}
                    onChange={(e) => setInstallAddress(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
                    placeholder="Fira Barcelona, Hall 2"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-brand-black">Fecha de instalación</label>
                  <input
                    type="date"
                    value={installDate}
                    onChange={(e) => setInstallDate(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Notes */}
          <div className="rounded-lg border border-brand-gray bg-white p-5">
            <label className="text-sm font-medium text-brand-black">Notas</label>
            <textarea
              maxLength={5000}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
              placeholder="Notas internas sobre el pedido…"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">{error}</p>
          )}

          <div className="flex items-center justify-end gap-3">
            <Link
              href="/admin/pedidos"
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
              {saving ? "Guardando…" : "Crear pedido"}
            </button>
          </div>
        </form>
      </div>
    </AdminShell>
  );
}
