"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { AdminShell } from "@/components/admin/admin-shell";
import { cn } from "@/lib/utils";
import {
  Search, ChevronLeft, ChevronRight, Plus, ArrowDownCircle,
  ArrowUpCircle, RotateCcw, Bookmark, Wrench, X, ArrowUpDown,
} from "lucide-react";
import { toast } from "sonner";
import { useDebounce } from "@/hooks/use-debounce";

interface Movement {
  id: string;
  type: string;
  m2: number;
  reason: string | null;
  created_at: string;
  updated_at: string;
  products: { name: string } | null;
  product_variants: { color: string } | null;
  profiles: { full_name: string } | null;
}

interface ProductOption {
  id: string;
  name: string;
  variants: { id: string; color: string }[];
}

const TYPE_MAP: Record<string, { label: string; color: string; icon: typeof ArrowDownCircle }> = {
  entrada: { label: "Entrada", color: "bg-green-100 text-green-700", icon: ArrowDownCircle },
  salida: { label: "Salida", color: "bg-red-100 text-red-700", icon: ArrowUpCircle },
  reserva: { label: "Reserva", color: "bg-yellow-100 text-yellow-700", icon: Bookmark },
  devolucion: { label: "Devolución", color: "bg-blue-100 text-blue-700", icon: RotateCcw },
  ajuste: { label: "Ajuste", color: "bg-gray-100 text-gray-700", icon: Wrench },
};

const PAGE_SIZE = 20;

export default function AdminInventarioPage() {
  const [movements, setMovements] = useState<Movement[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const [filterType, setFilterType] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [sortField, setSortField] = useState<"created_at" | "m2" | "type" | "updated_at">("updated_at");
  const [sortAsc, setSortAsc] = useState(false);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState<ProductOption[]>([]);
  const [saving, setSaving] = useState(false);

  // Form state
  const [formProductId, setFormProductId] = useState("");
  const [formVariantId, setFormVariantId] = useState("");
  const [formType, setFormType] = useState("entrada");
  const [formM2, setFormM2] = useState("");
  const [formReason, setFormReason] = useState("");

  const loadMovements = async () => {
    setLoading(true);
    const supabase = createClient();

    let query = supabase
      .from("inventory_movements")
      .select("id, type, m2, reason, created_at, updated_at, products(name), product_variants(color), profiles!inventory_movements_created_by_fkey(full_name)", { count: "exact" });

    if (debouncedSearch) {
      query = query.ilike("reason", `%${debouncedSearch}%`);
    }
    if (filterType) {
      query = query.eq("type", filterType);
    }
    if (dateFrom) {
      query = query.gte("created_at", dateFrom);
    }
    if (dateTo) {
      query = query.lte("created_at", dateTo + "T23:59:59");
    }

    query = query
      .order(sortField, { ascending: sortAsc })
      .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

    const { data, count } = await query;

    // Supabase returns FK joins as arrays; cast to our normalized interface
    if (data) setMovements(data as unknown as Movement[]);
    if (count !== null) setTotal(count);
    setLoading(false);
  };

  const loadProducts = async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("products")
      .select("id, name, product_variants(id, color)")
      .eq("active", true)
      .order("name");

    if (data) {
      setProducts(
        data.map((p) => ({
          id: p.id,
          name: p.name,
          variants: (p.product_variants as { id: string; color: string }[]) || [],
        }))
      );
    }
  };

  useEffect(() => {
    loadMovements();
    loadProducts();
  }, []);

  useEffect(() => {
    setPage(0);
    loadMovements();
  }, [debouncedSearch, filterType, dateFrom, dateTo, sortField, sortAsc]);

  useEffect(() => {
    loadMovements();
  }, [page]);

  const handleSave = async () => {
    if (!formProductId || !formM2) return;
    setSaving(true);

    const supabase = createClient();
    let userId: string | undefined;
    const { data: { user } } = await supabase.auth.getUser();
    userId = user?.id;

    // Dev mode fallback: no auth session, grab first profile
    if (!userId && process.env.NEXT_PUBLIC_DEV_ROLE) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("id")
        .limit(1)
        .single();
      userId = profile?.id;
    }

    const { error } = await supabase.from("inventory_movements").insert({
      product_id: formProductId,
      variant_id: formVariantId || null,
      type: formType,
      m2: parseFloat(formM2),
      reason: formReason.trim() || null,
      created_by: userId,
    });

    if (error) {
      toast.error("Error al registrar movimiento");
      setSaving(false);
      return;
    }

    toast.success("Movimiento registrado");
    // Reset form
    setFormProductId("");
    setFormVariantId("");
    setFormType("entrada");
    setFormM2("");
    setFormReason("");
    setShowForm(false);
    setSaving(false);
    loadMovements();
  };

  const toggleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  const totalPages = Math.ceil(total / PAGE_SIZE);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("es-ES", {
      day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
    });

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

  const selectedProduct = products.find((p) => p.id === formProductId);

  return (
    <AdminShell>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-[var(--font-heading)] text-2xl font-bold text-brand-black">
              Inventario
            </h1>
            <p className="mt-1 text-sm text-brand-gray-dark">
              {total} movimientos registrados
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-brand-red px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-red-dark"
          >
            <Plus className="h-4 w-4" />
            Nuevo movimiento
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 rounded-lg border border-brand-gray bg-white p-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-gray-dark" />
            <input
              type="text"
              placeholder="Buscar por motivo…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-brand-gray bg-white py-2 pl-10 pr-3 text-sm outline-none focus:border-brand-red"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
          >
            <option value="">Todos los tipos</option>
            {Object.entries(TYPE_MAP).map(([key, { label }]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
            title="Desde"
          />
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
            title="Hasta"
          />
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-lg border border-brand-gray bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-brand-gray bg-brand-cream text-left">
                  <th className="px-4 py-3 font-medium text-brand-gray-dark">
                    <button
                      onClick={() => toggleSort("type")}
                      className={cn("inline-flex items-center gap-1 hover:text-brand-black", sortField === "type" && "text-brand-black")}
                    >
                      Tipo
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </th>
                  <th className="px-4 py-3 font-medium text-brand-gray-dark">Producto</th>
                  <th className="hidden px-4 py-3 font-medium text-brand-gray-dark sm:table-cell">Variante</th>
                  <th className="px-4 py-3 text-right font-medium text-brand-gray-dark">
                    <button
                      onClick={() => toggleSort("m2")}
                      className={cn("inline-flex items-center gap-1 hover:text-brand-black ml-auto", sortField === "m2" && "text-brand-black")}
                    >
                      m²
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </th>
                  <th className="hidden px-4 py-3 font-medium text-brand-gray-dark md:table-cell">Motivo</th>
                  <th className="hidden px-4 py-3 font-medium text-brand-gray-dark lg:table-cell">Creado por</th>
                  <th className="hidden px-4 py-3 font-medium text-brand-gray-dark md:table-cell">
                    <button
                      onClick={() => toggleSort("created_at")}
                      className={cn("inline-flex items-center gap-1 hover:text-brand-black", sortField === "created_at" && "text-brand-black")}
                    >
                      Fecha
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </th>
                  <th className="hidden px-4 py-3 font-medium text-brand-gray-dark lg:table-cell">
                    <button
                      onClick={() => toggleSort("updated_at")}
                      className={cn("inline-flex items-center gap-1 hover:text-brand-black", sortField === "updated_at" && "text-brand-black")}
                    >
                      Última edición
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-gray">
                {loading ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-12 text-center text-brand-gray-dark">
                      Cargando movimientos…
                    </td>
                  </tr>
                ) : movements.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-12 text-center">
                      <p className="text-brand-gray-dark">No se encontraron movimientos</p>
                      <button
                        onClick={() => setShowForm(true)}
                        className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-brand-red hover:text-brand-red-dark"
                      >
                        <Plus className="h-4 w-4" />
                        Registrar el primero
                      </button>
                    </td>
                  </tr>
                ) : (
                  movements.map((mov) => {
                    const typeInfo = TYPE_MAP[mov.type] || { label: mov.type, color: "bg-gray-100 text-gray-700", icon: Wrench };
                    const Icon = typeInfo.icon;

                    return (
                      <tr key={mov.id} className="hover:bg-brand-cream/50">
                        <td className="px-4 py-3">
                          <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium", typeInfo.color)}>
                            <Icon className="h-3 w-3" />
                            {typeInfo.label}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-medium text-brand-black">
                          {mov.products?.name || "—"}
                        </td>
                        <td className="hidden px-4 py-3 text-brand-gray-dark sm:table-cell">
                          {mov.product_variants?.color || "—"}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <span className={cn(
                            "font-medium",
                            mov.type === "entrada" || mov.type === "devolucion"
                              ? "text-green-600"
                              : mov.type === "salida"
                              ? "text-red-600"
                              : "text-brand-black"
                          )}>
                            {mov.type === "entrada" || mov.type === "devolucion" ? "+" : mov.type === "salida" ? "−" : ""}
                            {mov.m2.toLocaleString("es-ES")} m²
                          </span>
                        </td>
                        <td className="hidden px-4 py-3 text-brand-gray-dark md:table-cell">
                          {mov.reason || "—"}
                        </td>
                        <td className="hidden px-4 py-3 text-brand-gray-dark lg:table-cell">
                          {mov.profiles?.full_name || "—"}
                        </td>
                        <td className="hidden px-4 py-3 text-brand-gray-dark md:table-cell">
                          {formatDate(mov.created_at)}
                        </td>
                        <td className="hidden px-4 py-3 lg:table-cell">
                          <span className="text-xs text-brand-gray-dark" title={new Date(mov.updated_at).toLocaleString("es-ES")}>
                            {formatRelativeDate(mov.updated_at)}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-brand-gray px-4 py-3">
              <p className="text-xs text-brand-gray-dark">
                Mostrando {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, total)} de {total}
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage(Math.max(0, page - 1))}
                  disabled={page === 0}
                  className="rounded-lg p-1.5 text-brand-gray-dark transition-colors hover:bg-brand-cream disabled:opacity-30"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="px-2 text-xs text-brand-gray-dark">
                  {page + 1} / {totalPages}
                </span>
                <button
                  onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
                  disabled={page >= totalPages - 1}
                  className="rounded-lg p-1.5 text-brand-gray-dark transition-colors hover:bg-brand-cream disabled:opacity-30"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* New Movement Form Drawer */}
      {showForm && (
        <>
          <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setShowForm(false)} />
          <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md overflow-y-auto bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-brand-gray p-5">
              <h2 className="font-[var(--font-heading)] text-lg font-bold text-brand-black">
                Nuevo movimiento
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="rounded-lg p-1.5 text-brand-gray-dark hover:bg-brand-cream"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 p-5">
              {/* Product */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-brand-black">Producto *</label>
                <select
                  value={formProductId}
                  onChange={(e) => {
                    setFormProductId(e.target.value);
                    setFormVariantId("");
                  }}
                  className="w-full rounded-lg border border-brand-gray px-3 py-2 text-sm outline-none focus:border-brand-red"
                >
                  <option value="">Seleccionar producto…</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              {/* Variant */}
              {selectedProduct && selectedProduct.variants.length > 0 && (
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-brand-black">Variante</label>
                  <select
                    value={formVariantId}
                    onChange={(e) => setFormVariantId(e.target.value)}
                    className="w-full rounded-lg border border-brand-gray px-3 py-2 text-sm outline-none focus:border-brand-red"
                  >
                    <option value="">Todas (general)</option>
                    {selectedProduct.variants.map((v) => (
                      <option key={v.id} value={v.id}>{v.color}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Type */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-brand-black">Tipo *</label>
                <select
                  value={formType}
                  onChange={(e) => setFormType(e.target.value)}
                  className="w-full rounded-lg border border-brand-gray px-3 py-2 text-sm outline-none focus:border-brand-red"
                >
                  {Object.entries(TYPE_MAP).map(([key, { label }]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>

              {/* M2 */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-brand-black">Cantidad (m²) *</label>
                <input
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={formM2}
                  onChange={(e) => setFormM2(e.target.value)}
                  className="w-full rounded-lg border border-brand-gray px-3 py-2 text-sm outline-none focus:border-brand-red"
                  placeholder="0.00"
                />
              </div>

              {/* Reason */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-brand-black">Motivo</label>
                <textarea
                  value={formReason}
                  onChange={(e) => setFormReason(e.target.value)}
                  rows={3}
                  className="w-full rounded-lg border border-brand-gray px-3 py-2 text-sm outline-none focus:border-brand-red"
                  placeholder="Descripción del movimiento…"
                />
              </div>

              {/* Submit */}
              <button
                onClick={handleSave}
                disabled={!formProductId || !formM2 || saving}
                className="w-full rounded-lg bg-brand-red px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-red-dark disabled:opacity-50"
              >
                {saving ? "Guardando…" : "Registrar movimiento"}
              </button>
            </div>
          </div>
        </>
      )}
    </AdminShell>
  );
}
