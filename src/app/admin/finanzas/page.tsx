"use client";

import { useEffect, useState, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import { AdminShell } from "@/components/admin/admin-shell";
import { cn } from "@/lib/utils";
import {
  Plus, Search, ChevronLeft, ChevronRight, TrendingUp, TrendingDown,
  DollarSign, Trash2, ArrowUpRight, ArrowDownRight, Eye, ExternalLink, X, Calendar, ArrowUpDown,
} from "lucide-react";
import { toast } from "sonner";
import { useDebounce } from "@/hooks/use-debounce";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import Link from "next/link";

interface FinanceEntry {
  id: string;
  type: "ingreso" | "gasto";
  category: string;
  description: string;
  amount: number;
  date: string;
  receipt_url: string | null;
  order_id: string | null;
  event_id: string | null;
  created_at: string;
  updated_at: string;
  profiles: { full_name: string } | null;
}

type SortField = "date" | "updated_at" | "amount" | "created_at";
type SortDir = "asc" | "desc";

const EXPENSE_CATEGORIES = [
  "Material", "Transporte", "Personal", "Alquiler", "Marketing",
  "Seguros", "Impuestos", "Mantenimiento", "Otros",
];

const INCOME_CATEGORIES = [
  "Venta producto", "Servicio instalación", "Alquiler material",
  "Consultoría", "Otros",
];

const PAGE_SIZE = 25;

export default function AdminFinanzasPage() {
  const [entries, setEntries] = useState<FinanceEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [filterType, setFilterType] = useState<"" | "ingreso" | "gasto">("");
  const [filterMonth, setFilterMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  });
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  // New entry form
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState<"ingreso" | "gasto">("ingreso");
  const [formCategory, setFormCategory] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formAmount, setFormAmount] = useState("");
  const [formDate, setFormDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [formReceiptUrl, setFormReceiptUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [selected, setSelected] = useState<FinanceEntry | null>(null);
  const [sortField, setSortField] = useState<SortField>("updated_at");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [editFrom, setEditFrom] = useState("");
  const [editTo, setEditTo] = useState("");

  useEffect(() => {
    loadEntries();
  }, []);

  useEffect(() => {
    setPage(0);
    loadEntries();
  }, [filterType, filterMonth, debouncedSearch, editFrom, editTo]);

  useEffect(() => {
    loadEntries();
  }, [page, sortField, sortDir]);

  const loadEntries = async () => {
    setLoading(true);
    const supabase = createClient();

    let query = supabase
      .from("finance_entries")
      .select(`
        *,
        profiles!finance_entries_created_by_fkey (full_name)
      `, { count: "exact" });

    if (filterType) query = query.eq("type", filterType);
    if (debouncedSearch) query = query.ilike("description", `%${debouncedSearch}%`);

    if (filterMonth) {
      const [y, m] = filterMonth.split("-");
      const start = `${y}-${m}-01`;
      const end = new Date(parseInt(y), parseInt(m), 0).toISOString().split("T")[0];
      query = query.gte("date", start).lte("date", end);
    }
    if (editFrom) query = query.gte("updated_at", editFrom + "T00:00:00");
    if (editTo) query = query.lte("updated_at", editTo + "T23:59:59");

    query = query
      .order(sortField, { ascending: sortDir === "asc" })
      .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

    const { data, count } = await query;
    // Supabase returns FK joins as arrays; cast to our normalized interface
    if (data) setEntries(data as unknown as FinanceEntry[]);
    if (count !== null) setTotal(count);
    setLoading(false);
  };

  // Summary stats
  const summary = useMemo(() => {
    const ingresos = entries.filter((e) => e.type === "ingreso").reduce((s, e) => s + e.amount, 0);
    const gastos = entries.filter((e) => e.type === "gasto").reduce((s, e) => s + e.amount, 0);
    return { ingresos, gastos, balance: ingresos - gastos };
  }, [entries]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("desc");
    }
  };

  const SortButton = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <button
      onClick={() => handleSort(field)}
      className="inline-flex items-center gap-1 font-medium text-brand-gray-dark hover:text-brand-black"
    >
      {children}
      <ArrowUpDown className={cn("h-3 w-3", sortField === field ? "text-brand-red" : "opacity-40")} />
    </button>
  );

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(amount);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!formCategory) { setError("Selecciona una categoría"); return; }
    if (!formDescription.trim()) { setError("Descripción obligatoria"); return; }
    if (!formAmount || parseFloat(formAmount) <= 0) { setError("Importe debe ser mayor que 0"); return; }

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

    const { error: insertError } = await supabase.from("finance_entries").insert({
      type: formType,
      category: formCategory,
      description: formDescription.trim(),
      amount: parseFloat(formAmount),
      date: formDate,
      receipt_url: formReceiptUrl.trim() || null,
      created_by: userId,
    });

    if (insertError) {
      setError(insertError.message);
      toast.error("Error al registrar entrada");
      setSaving(false);
      return;
    }

    toast.success("Entrada registrada");
    setShowForm(false);
    resetForm();
    setSaving(false);
    loadEntries();
  };

  const resetForm = () => {
    setFormCategory("");
    setFormDescription("");
    setFormAmount("");
    setFormDate(new Date().toISOString().split("T")[0]);
    setFormReceiptUrl("");
    setError("");
  };

  const confirmDelete = async (id: string) => {
    const supabase = createClient();
    const { error } = await supabase.from("finance_entries").delete().eq("id", id);
    if (error) {
      toast.error("Error al eliminar entrada");
      return;
    }
    toast.success("Entrada eliminada");
    loadEntries();
  };

  return (
    <AdminShell>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-[var(--font-heading)] text-2xl font-bold text-brand-black">Finanzas</h1>
            <p className="mt-1 text-sm text-brand-gray-dark">Control de ingresos y gastos</p>
          </div>
          <button
            onClick={() => { setShowForm(!showForm); resetForm(); }}
            className="inline-flex items-center gap-2 rounded-lg bg-brand-red px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-red-dark"
          >
            <Plus className="h-4 w-4" />
            Nuevo movimiento
          </button>
        </div>

        {/* Summary cards */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-brand-gray bg-white p-5">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100">
                <TrendingUp className="h-4 w-4 text-green-600" />
              </div>
              <p className="text-sm text-brand-gray-dark">Ingresos</p>
            </div>
            <p className="mt-2 font-[var(--font-heading)] text-2xl font-bold text-green-600">
              {formatCurrency(summary.ingresos)}
            </p>
          </div>
          <div className="rounded-lg border border-brand-gray bg-white p-5">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100">
                <TrendingDown className="h-4 w-4 text-red-600" />
              </div>
              <p className="text-sm text-brand-gray-dark">Gastos</p>
            </div>
            <p className="mt-2 font-[var(--font-heading)] text-2xl font-bold text-red-600">
              {formatCurrency(summary.gastos)}
            </p>
          </div>
          <div className="rounded-lg border border-brand-gray bg-white p-5">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                <DollarSign className="h-4 w-4 text-blue-600" />
              </div>
              <p className="text-sm text-brand-gray-dark">Balance</p>
            </div>
            <p className={cn(
              "mt-2 font-[var(--font-heading)] text-2xl font-bold",
              summary.balance >= 0 ? "text-green-600" : "text-red-600"
            )}>
              {formatCurrency(summary.balance)}
            </p>
          </div>
        </div>

        {/* New entry form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="rounded-lg border-2 border-brand-red/20 bg-white p-5">
            <h2 className="text-sm font-semibold text-brand-black">Nuevo movimiento</h2>

            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="text-xs font-medium text-brand-black">Tipo</label>
                <select
                  value={formType}
                  onChange={(e) => { setFormType(e.target.value as "ingreso" | "gasto"); setFormCategory(""); }}
                  className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
                >
                  <option value="ingreso">Ingreso</option>
                  <option value="gasto">Gasto</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-brand-black">Categoría *</label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
                >
                  <option value="">Seleccionar…</option>
                  {(formType === "ingreso" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES).map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-brand-black">Importe (€) *</label>
                <input
                  type="number"
                  value={formAmount}
                  onChange={(e) => setFormAmount(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
                  step="0.01"
                  min="0.01"
                  placeholder="0,00"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-brand-black">Fecha *</label>
                <input
                  type="date"
                  value={formDate}
                  onChange={(e) => setFormDate(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-medium text-brand-black">Descripción *</label>
                <input
                  type="text"
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
                  placeholder="Descripción del movimiento…"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-medium text-brand-black">URL justificante</label>
                <input
                  type="url"
                  value={formReceiptUrl}
                  onChange={(e) => setFormReceiptUrl(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
                  placeholder="https://…"
                />
              </div>
            </div>

            {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

            <div className="mt-4 flex items-center gap-3">
              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-brand-red px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-red-dark disabled:opacity-50"
              >
                {saving ? "Guardando…" : "Guardar"}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-lg border border-brand-gray px-4 py-2 text-sm font-medium text-brand-gray-dark transition-colors hover:bg-brand-cream"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}

        {/* Filters */}
        <div className="flex flex-col gap-3 rounded-lg border border-brand-gray bg-white p-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-gray-dark" />
            <input
              type="text"
              placeholder="Buscar por descripción…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-brand-gray bg-white py-2 pl-10 pr-3 text-sm outline-none focus:border-brand-red"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as "" | "ingreso" | "gasto")}
            className="rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
          >
            <option value="">Todos</option>
            <option value="ingreso">Ingresos</option>
            <option value="gasto">Gastos</option>
          </select>
          <input
            type="month"
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value)}
            className="rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
          />
          <div className="flex items-center gap-2">
            <label className="text-xs text-brand-gray-dark whitespace-nowrap">Editado</label>
            <input
              type="date"
              value={editFrom}
              onChange={(e) => setEditFrom(e.target.value)}
              className="rounded-lg border border-brand-gray bg-white px-2 py-2 text-sm outline-none focus:border-brand-red"
            />
            <input
              type="date"
              value={editTo}
              onChange={(e) => setEditTo(e.target.value)}
              className="rounded-lg border border-brand-gray bg-white px-2 py-2 text-sm outline-none focus:border-brand-red"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-lg border border-brand-gray bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-brand-gray bg-brand-cream text-left">
                  <th className="px-4 py-3 text-xs font-medium text-brand-gray-dark">Tipo</th>
                  <th className="px-4 py-3 text-xs font-medium text-brand-gray-dark">Descripción</th>
                  <th className="hidden px-4 py-3 text-xs font-medium text-brand-gray-dark sm:table-cell">Categoría</th>
                  <th className="px-4 py-3 text-right text-xs"><SortButton field="amount">Importe</SortButton></th>
                  <th className="hidden px-4 py-3 text-xs md:table-cell"><SortButton field="date">Fecha</SortButton></th>
                  <th className="hidden px-4 py-3 text-xs lg:table-cell"><SortButton field="updated_at">Última edición</SortButton></th>
                  <th className="hidden px-4 py-3 text-xs font-medium text-brand-gray-dark md:table-cell">Creado por</th>
                  <th className="px-4 py-3 text-xs font-medium text-brand-gray-dark"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-gray">
                {loading ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-12 text-center text-brand-gray-dark">Cargando…</td>
                  </tr>
                ) : entries.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-12 text-center">
                      <p className="text-brand-gray-dark">No hay movimientos</p>
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
                  entries.map((entry) => (
                    <tr key={entry.id} className="hover:bg-brand-cream/50">
                      <td className="px-4 py-3">
                        {entry.type === "ingreso" ? (
                          <span className="inline-flex items-center gap-1 text-green-600">
                            <ArrowUpRight className="h-3.5 w-3.5" /> Ingreso
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-red-600">
                            <ArrowDownRight className="h-3.5 w-3.5" /> Gasto
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-brand-black">{entry.description}</p>
                      </td>
                      <td className="hidden px-4 py-3 sm:table-cell">
                        <span className="text-brand-gray-dark">{entry.category}</span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className={cn(
                          "font-medium",
                          entry.type === "ingreso" ? "text-green-600" : "text-red-600"
                        )}>
                          {entry.type === "ingreso" ? "+" : "−"}{formatCurrency(entry.amount)}
                        </span>
                      </td>
                      <td className="hidden px-4 py-3 md:table-cell">
                        <span className="text-brand-gray-dark">
                          {new Date(entry.date).toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" })}
                        </span>
                      </td>
                      <td className="hidden px-4 py-3 lg:table-cell">
                        <span className="text-xs text-brand-gray-dark" title={new Date(entry.updated_at).toLocaleString("es-ES")}>
                          {formatRelativeDate(entry.updated_at)}
                        </span>
                      </td>
                      <td className="hidden px-4 py-3 md:table-cell">
                        <span className="text-brand-gray-dark">{entry.profiles?.full_name || "—"}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setSelected(entry)}
                            className="rounded-lg p-1.5 text-brand-gray-dark transition-colors hover:bg-brand-cream hover:text-brand-black"
                            title="Ver detalle"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(entry.id)}
                            className="rounded-lg p-1.5 text-brand-gray-dark transition-colors hover:bg-red-50 hover:text-brand-red"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-brand-gray px-4 py-3">
              <p className="text-xs text-brand-gray-dark">
                {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, total)} de {total}
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage(Math.max(0, page - 1))}
                  disabled={page === 0}
                  className="rounded-lg p-1.5 text-brand-gray-dark hover:bg-brand-cream disabled:opacity-30"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="px-2 text-xs text-brand-gray-dark">{page + 1} / {totalPages}</span>
                <button
                  onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
                  disabled={page >= totalPages - 1}
                  className="rounded-lg p-1.5 text-brand-gray-dark hover:bg-brand-cream disabled:opacity-30"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Detail Drawer */}
      {selected && (
        <>
          <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setSelected(null)} />
          <div className="fixed inset-y-0 right-0 z-50 w-full max-w-lg overflow-y-auto bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-brand-gray p-5">
              <h2 className="font-[var(--font-heading)] text-lg font-bold text-brand-black">
                Detalle del movimiento
              </h2>
              <button
                onClick={() => setSelected(null)}
                className="rounded-lg p-1.5 text-brand-gray-dark hover:bg-brand-cream"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6 p-5">
              {/* Type badge */}
              <div className="flex items-center gap-3">
                <span className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium",
                  selected.type === "ingreso"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                )}>
                  {selected.type === "ingreso" ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" />
                  )}
                  {selected.type === "ingreso" ? "Ingreso" : "Gasto"}
                </span>
                <span className="rounded-full bg-brand-cream px-3 py-1 text-sm font-medium text-brand-gray-dark">
                  {selected.category}
                </span>
              </div>

              {/* Amount */}
              <div>
                <p className="text-xs text-brand-gray-dark">Importe</p>
                <p className={cn(
                  "mt-1 font-[var(--font-heading)] text-3xl font-bold",
                  selected.type === "ingreso" ? "text-green-600" : "text-red-600"
                )}>
                  {selected.type === "ingreso" ? "+" : "\u2212"}
                  {new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(selected.amount)}
                </p>
              </div>

              {/* Description */}
              <div>
                <p className="text-xs text-brand-gray-dark">Descripci\u00f3n</p>
                <p className="mt-1 text-sm text-brand-black">{selected.description}</p>
              </div>

              {/* Date */}
              <div>
                <p className="text-xs text-brand-gray-dark">Fecha</p>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-brand-black">
                  <Calendar className="h-3.5 w-3.5 text-brand-gray-dark" />
                  {new Date(selected.date).toLocaleDateString("es-ES", {
                    weekday: "long", day: "numeric", month: "long", year: "numeric",
                  })}
                </p>
              </div>

              {/* Created by */}
              {selected.profiles?.full_name && (
                <div>
                  <p className="text-xs text-brand-gray-dark">Creado por</p>
                  <p className="mt-1 text-sm text-brand-black">{selected.profiles.full_name}</p>
                </div>
              )}

              {/* Receipt */}
              {selected.receipt_url && (
                <div>
                  <p className="text-xs text-brand-gray-dark">Justificante</p>
                  <a
                    href={selected.receipt_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-brand-red hover:text-brand-red-dark"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Ver justificante
                  </a>
                </div>
              )}

              {/* Linked order */}
              {selected.order_id && (
                <div>
                  <p className="text-xs text-brand-gray-dark">Pedido vinculado</p>
                  <Link
                    href={`/admin/pedidos/${selected.order_id}`}
                    className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-brand-red hover:text-brand-red-dark"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Ver pedido
                  </Link>
                </div>
              )}

              {/* Linked event */}
              {selected.event_id && (
                <div>
                  <p className="text-xs text-brand-gray-dark">Evento vinculado</p>
                  <Link
                    href={`/admin/calendario/${selected.event_id}`}
                    className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-brand-red hover:text-brand-red-dark"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Ver evento
                  </Link>
                </div>
              )}

              {/* Timestamp */}
              <div className="border-t border-brand-gray pt-4 text-xs text-brand-gray-dark">
                Registrado el {new Date(selected.created_at).toLocaleDateString("es-ES", {
                  day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        </>
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        title="Eliminar movimiento"
        description="¿Eliminar este movimiento financiero? Esta acción no se puede deshacer."
        confirmLabel="Eliminar"
        variant="danger"
        onConfirm={() => { if (deleteTarget) confirmDelete(deleteTarget); setDeleteTarget(null); }}
        onCancel={() => setDeleteTarget(null)}
      />
    </AdminShell>
  );
}
