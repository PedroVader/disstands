"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { AdminShell } from "@/components/admin/admin-shell";
import { cn } from "@/lib/utils";
import { useDebounce } from "@/hooks/use-debounce";
import { Search, ChevronLeft, ChevronRight, Eye, Plus, Building2, Mail, Phone, Trash2, ArrowUpDown } from "lucide-react";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { toast } from "sonner";

interface DBClient {
  id: string;
  company: string | null;
  contact_name: string;
  email: string;
  phone: string | null;
  city: string | null;
  province: string | null;
  nif: string | null;
  total_spent: number;
  order_count: number;
  created_at: string;
  updated_at: string;
}

type SortField = "updated_at" | "created_at" | "contact_name" | "total_spent";
type SortDir = "asc" | "desc";

const PAGE_SIZE = 20;

export default function AdminClientesPage() {
  const [clients, setClients] = useState<DBClient[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);
  const [sortField, setSortField] = useState<SortField>("updated_at");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [editFrom, setEditFrom] = useState("");
  const [editTo, setEditTo] = useState("");

  useEffect(() => {
    loadClients();
  }, []);

  useEffect(() => {
    setPage(0);
    loadClients();
  }, [debouncedSearch, editFrom, editTo]);

  useEffect(() => {
    loadClients();
  }, [page, sortField, sortDir]);

  const loadClients = async () => {
    setLoading(true);
    const supabase = createClient();

    let query = supabase
      .from("clients")
      .select("*", { count: "exact" });

    if (debouncedSearch) {
      query = query.or(`contact_name.ilike.%${debouncedSearch}%,company.ilike.%${debouncedSearch}%,email.ilike.%${debouncedSearch}%`);
    }
    if (editFrom) query = query.gte("updated_at", editFrom + "T00:00:00");
    if (editTo) query = query.lte("updated_at", editTo + "T23:59:59");

    query = query
      .order(sortField, { ascending: sortDir === "asc" })
      .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

    const { data, count } = await query;

    if (data) setClients(data as DBClient[]);
    if (count !== null) setTotal(count);
    setLoading(false);
  };

  const confirmDelete = async (id: string) => {
    const supabase = createClient();
    const { error } = await supabase.from("clients").delete().eq("id", id);
    if (error) {
      toast.error("Error al eliminar la marca");
    } else {
      toast.success("Marca eliminada");
    }
    loadClients();
  };

  const totalPages = Math.ceil(total / PAGE_SIZE);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("desc");
    }
  };

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

  return (
    <AdminShell>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-[var(--font-heading)] text-2xl font-bold text-brand-black">
              Marcas y Modelos
            </h1>
            <p className="mt-1 text-sm text-brand-gray-dark">
              {total} marcas registradas
            </p>
          </div>
          <Link
            href="/admin/marcas/nuevo"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-red px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-red-dark"
          >
            <Plus className="h-4 w-4" />
            Nueva marca
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 rounded-lg border border-brand-gray bg-white p-4 sm:flex-row sm:items-center sm:flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-gray-dark" />
            <input
              type="text"
              placeholder="Buscar por nombre, empresa o email…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-brand-gray bg-white py-2 pl-10 pr-3 text-sm outline-none focus:border-brand-red"
            />
          </div>
          <select
            value={`${sortField}:${sortDir}`}
            onChange={(e) => {
              const [f, d] = e.target.value.split(":") as [SortField, SortDir];
              setSortField(f);
              setSortDir(d);
            }}
            className="rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
          >
            <option value="updated_at:desc">Última edición (reciente)</option>
            <option value="updated_at:asc">Última edición (antigua)</option>
            <option value="created_at:desc">Creación (reciente)</option>
            <option value="created_at:asc">Creación (antigua)</option>
            <option value="contact_name:asc">Nombre (A-Z)</option>
            <option value="contact_name:desc">Nombre (Z-A)</option>
            <option value="total_spent:desc">Mayor gasto</option>
            <option value="total_spent:asc">Menor gasto</option>
          </select>
          <div className="flex items-center gap-2">
            <label className="text-xs text-brand-gray-dark whitespace-nowrap">Editado desde</label>
            <input
              type="date"
              value={editFrom}
              onChange={(e) => setEditFrom(e.target.value)}
              className="rounded-lg border border-brand-gray bg-white px-2 py-2 text-sm outline-none focus:border-brand-red"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs text-brand-gray-dark whitespace-nowrap">hasta</label>
            <input
              type="date"
              value={editTo}
              onChange={(e) => setEditTo(e.target.value)}
              className="rounded-lg border border-brand-gray bg-white px-2 py-2 text-sm outline-none focus:border-brand-red"
            />
          </div>
        </div>

        {/* Cards grid */}
        {loading ? (
          <div className="py-12 text-center text-brand-gray-dark">Cargando marcas…</div>
        ) : clients.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-brand-gray-dark">No se encontraron marcas</p>
            <Link
              href="/admin/marcas/nuevo"
              className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-brand-red hover:text-brand-red-dark"
            >
              <Plus className="h-4 w-4" />
              Crear el primero
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {clients.map((client) => (
              <div
                key={client.id}
                className="group relative rounded-lg border border-brand-gray bg-white p-5 transition-all hover:border-brand-red hover:shadow-md"
              >
                <Link href={`/admin/marcas/${client.id}`} className="absolute inset-0 z-0 rounded-lg" />

                <div className="relative z-10 pointer-events-none">
                  <div className="flex items-start justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-brand-black">
                        {client.contact_name}
                      </p>
                      {client.company && (
                        <div className="mt-1 flex items-center gap-1.5">
                          <Building2 className="h-3.5 w-3.5 flex-shrink-0 text-brand-gray-dark" />
                          <p className="truncate text-sm text-brand-gray-dark">{client.company}</p>
                        </div>
                      )}
                    </div>
                    <Eye className="h-4 w-4 flex-shrink-0 text-brand-gray-dark" />
                  </div>

                  <div className="mt-3 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-brand-gray-dark">
                      <Mail className="h-3 w-3" />
                      <span className="truncate">{client.email}</span>
                    </div>
                    {client.phone && (
                      <div className="flex items-center gap-1.5 text-xs text-brand-gray-dark">
                        <Phone className="h-3 w-3" />
                        <span>{client.phone}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-brand-gray pt-3">
                    <div>
                      <p className="text-xs text-brand-gray-dark">Pedidos</p>
                      <p className="font-medium text-brand-black">{client.order_count}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-brand-gray-dark">Total gastado</p>
                      <p className="font-medium text-brand-black">{formatCurrency(client.total_spent)}</p>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center justify-between text-xs text-brand-gray-dark/60">
                    {(client.city || client.province) ? (
                      <span>{[client.city, client.province].filter(Boolean).join(", ")}</span>
                    ) : <span />}
                    <span title={new Date(client.updated_at).toLocaleString("es-ES")}>
                      Editado {formatRelativeDate(client.updated_at)}
                    </span>
                  </div>
                </div>

                {/* Delete button - positioned in top right */}
                <button
                  onClick={(e) => { e.stopPropagation(); setDeleteTarget({ id: client.id, name: client.contact_name }); }}
                  className="absolute right-2 top-2 z-20 rounded-lg p-1.5 text-brand-gray-dark opacity-0 transition-all hover:bg-red-50 hover:text-brand-red group-hover:opacity-100"
                  title="Eliminar"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between rounded-lg border border-brand-gray bg-white px-4 py-3">
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
      <ConfirmDialog
        open={!!deleteTarget}
        title="Eliminar marca"
        description={`¿Eliminar "${deleteTarget?.name}"? Se perderán todos sus datos. Esta acción no se puede deshacer.`}
        confirmLabel="Eliminar"
        variant="danger"
        onConfirm={() => { if (deleteTarget) confirmDelete(deleteTarget.id); setDeleteTarget(null); }}
        onCancel={() => setDeleteTarget(null)}
      />
    </AdminShell>
  );
}
