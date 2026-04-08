"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { AdminShell } from "@/components/admin/admin-shell";
import { cn } from "@/lib/utils";
import { useDebounce } from "@/hooks/use-debounce";
import { Search, ChevronLeft, ChevronRight, Eye, Plus, ArrowUpDown } from "lucide-react";

interface DBOrder {
  id: string;
  order_number: string;
  status: string;
  total: number;
  created_at: string;
  updated_at: string;
  notes: string | null;
  needs_install: boolean;
  clients: { company: string; contact_name: string } | null;
}

type SortField = "updated_at" | "created_at" | "total" | "order_number";
type SortDir = "asc" | "desc";

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  pendiente: { label: "Pendiente", color: "bg-yellow-100 text-yellow-700" },
  pagado: { label: "Pagado", color: "bg-blue-100 text-blue-700" },
  preparacion: { label: "Preparación", color: "bg-indigo-100 text-indigo-700" },
  enviado: { label: "Enviado", color: "bg-purple-100 text-purple-700" },
  instalado: { label: "Instalado", color: "bg-teal-100 text-teal-700" },
  completado: { label: "Completado", color: "bg-green-100 text-green-700" },
  cancelado: { label: "Cancelado", color: "bg-red-100 text-red-700" },
};

const PAGE_SIZE = 20;

export default function AdminPedidosPage() {
  const [orders, setOrders] = useState<DBOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const [filterStatus, setFilterStatus] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [sortField, setSortField] = useState<SortField>("updated_at");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [editFrom, setEditFrom] = useState("");
  const [editTo, setEditTo] = useState("");

  const loadOrders = async () => {
    setLoading(true);
    const supabase = createClient();

    let query = supabase
      .from("orders")
      .select(`
        id, order_number, status, total, created_at, updated_at, notes, needs_install,
        clients (company, contact_name)
      `, { count: "exact" });

    if (debouncedSearch) {
      query = query.or(`order_number.ilike.%${debouncedSearch}%`);
    }
    if (filterStatus) {
      query = query.eq("status", filterStatus);
    }
    if (dateFrom) {
      query = query.gte("created_at", dateFrom);
    }
    if (dateTo) {
      query = query.lte("created_at", dateTo + "T23:59:59");
    }
    if (editFrom) {
      query = query.gte("updated_at", editFrom + "T00:00:00");
    }
    if (editTo) {
      query = query.lte("updated_at", editTo + "T23:59:59");
    }

    query = query
      .order(sortField, { ascending: sortDir === "asc" })
      .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

    const { data, count } = await query;

    // Supabase returns FK joins as arrays; cast to our normalized interface
    if (data) setOrders(data as unknown as DBOrder[]);
    if (count !== null) setTotal(count);
    setLoading(false);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    setPage(0);
    loadOrders();
  }, [debouncedSearch, filterStatus, dateFrom, dateTo, editFrom, editTo]);

  useEffect(() => {
    loadOrders();
  }, [page, sortField, sortDir]);

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

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  };

  return (
    <AdminShell>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-[var(--font-heading)] text-2xl font-bold text-brand-black">
              Pedidos
            </h1>
            <p className="mt-1 text-sm text-brand-gray-dark">
              {total} pedidos en total
            </p>
          </div>
          <Link
            href="/admin/pedidos/nuevo"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-red px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-red-dark"
          >
            <Plus className="h-4 w-4" />
            Nuevo pedido
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 rounded-lg border border-brand-gray bg-white p-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-gray-dark" />
            <input
              type="text"
              placeholder="Buscar por nº pedido…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-brand-gray bg-white py-2 pl-10 pr-3 text-sm outline-none focus:border-brand-red"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
          >
            <option value="">Todos los estados</option>
            {Object.entries(STATUS_MAP).map(([key, { label }]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
          <div className="flex items-center gap-2">
            <label className="text-xs text-brand-gray-dark whitespace-nowrap">Creado</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="rounded-lg border border-brand-gray bg-white px-2 py-2 text-sm outline-none focus:border-brand-red"
            />
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="rounded-lg border border-brand-gray bg-white px-2 py-2 text-sm outline-none focus:border-brand-red"
            />
          </div>
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
                  <th className="px-4 py-3 text-xs"><SortButton field="order_number">Nº Pedido</SortButton></th>
                  <th className="hidden px-4 py-3 text-xs font-medium text-brand-gray-dark sm:table-cell">Marca</th>
                  <th className="px-4 py-3 text-xs font-medium text-brand-gray-dark">Estado</th>
                  <th className="px-4 py-3 text-xs"><SortButton field="total">Total</SortButton></th>
                  <th className="hidden px-4 py-3 text-xs font-medium text-brand-gray-dark md:table-cell">Instalación</th>
                  <th className="hidden px-4 py-3 text-xs md:table-cell"><SortButton field="created_at">Creación</SortButton></th>
                  <th className="hidden px-4 py-3 text-xs lg:table-cell"><SortButton field="updated_at">Última edición</SortButton></th>
                  <th className="px-4 py-3 text-xs font-medium text-brand-gray-dark">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-gray">
                {loading ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-12 text-center text-brand-gray-dark">
                      Cargando pedidos…
                    </td>
                  </tr>
                ) : orders.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-12 text-center">
                      <p className="text-brand-gray-dark">No se encontraron pedidos</p>
                      <Link
                        href="/admin/pedidos/nuevo"
                        className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-brand-red hover:text-brand-red-dark"
                      >
                        <Plus className="h-4 w-4" />
                        Crear el primero
                      </Link>
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => {
                    const status = STATUS_MAP[order.status] || {
                      label: order.status,
                      color: "bg-gray-100 text-gray-700",
                    };

                    return (
                      <tr key={order.id} className="hover:bg-brand-cream/50">
                        <td className="px-4 py-3">
                          <span className="font-mono font-medium text-brand-black">
                            {order.order_number}
                          </span>
                        </td>
                        <td className="hidden px-4 py-3 sm:table-cell">
                          <div className="min-w-0">
                            <p className="truncate font-medium text-brand-black">
                              {order.clients?.company || "—"}
                            </p>
                            <p className="truncate text-xs text-brand-gray-dark">
                              {order.clients?.contact_name || ""}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", status.color)}>
                            {status.label}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-medium text-brand-black">
                            {formatCurrency(order.total)}
                          </span>
                        </td>
                        <td className="hidden px-4 py-3 md:table-cell">
                          <span className={cn(
                            "rounded-full px-2 py-0.5 text-xs font-medium",
                            order.needs_install
                              ? "bg-indigo-100 text-indigo-700"
                              : "bg-gray-100 text-gray-600"
                          )}>
                            {order.needs_install ? "Sí" : "No"}
                          </span>
                        </td>
                        <td className="hidden px-4 py-3 md:table-cell">
                          <span className="text-brand-gray-dark">
                            {formatDate(order.created_at)}
                          </span>
                        </td>
                        <td className="hidden px-4 py-3 lg:table-cell">
                          <span className="text-xs text-brand-gray-dark" title={new Date(order.updated_at).toLocaleString("es-ES")}>
                            {formatRelativeDate(order.updated_at)}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <Link
                            href={`/admin/pedidos/${order.id}`}
                            className="rounded-lg p-1.5 text-brand-gray-dark transition-colors hover:bg-brand-cream hover:text-brand-black"
                            title="Ver detalle"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
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
    </AdminShell>
  );
}
