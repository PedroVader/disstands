"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { AdminShell } from "@/components/admin/admin-shell";
import { cn } from "@/lib/utils";
import {
  Search, ChevronLeft, ChevronRight, Mail, Phone,
  Building2, MessageSquare, Eye, X,
} from "lucide-react";
import { toast } from "sonner";
import { useDebounce } from "@/hooks/use-debounce";

interface Inquiry {
  id: string;
  type: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  topic: string | null;
  message: string | null;
  metadata: Record<string, unknown> | null;
  status: string;
  created_at: string;
}

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  nuevo: { label: "Nuevo", color: "bg-blue-100 text-blue-700" },
  leido: { label: "Leído", color: "bg-yellow-100 text-yellow-700" },
  respondido: { label: "Respondido", color: "bg-green-100 text-green-700" },
  cerrado: { label: "Cerrado", color: "bg-gray-100 text-gray-600" },
};

const TYPE_MAP: Record<string, { label: string; color: string }> = {
  contacto: { label: "Contacto", color: "bg-indigo-100 text-indigo-700" },
  monta_tu_feria: { label: "Monta tu Feria", color: "bg-purple-100 text-purple-700" },
};

const PAGE_SIZE = 20;

export default function AdminConsultasPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const [filterType, setFilterType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [updating, setUpdating] = useState(false);

  const loadInquiries = async () => {
    setLoading(true);
    const supabase = createClient();

    let query = supabase
      .from("inquiries")
      .select("*", { count: "exact" });

    if (debouncedSearch) {
      query = query.or(`name.ilike.%${debouncedSearch}%,email.ilike.%${debouncedSearch}%,company.ilike.%${debouncedSearch}%`);
    }
    if (filterType) {
      query = query.eq("type", filterType);
    }
    if (filterStatus) {
      query = query.eq("status", filterStatus);
    }

    query = query
      .order("created_at", { ascending: false })
      .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

    const { data, count } = await query;

    if (data) setInquiries(data as Inquiry[]);
    if (count !== null) setTotal(count);
    setLoading(false);
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  useEffect(() => {
    setPage(0);
    loadInquiries();
  }, [debouncedSearch, filterType, filterStatus]);

  useEffect(() => {
    loadInquiries();
  }, [page]);

  const updateStatus = async (id: string, newStatus: string) => {
    setUpdating(true);
    const supabase = createClient();
    const { error } = await supabase.from("inquiries").update({ status: newStatus }).eq("id", id);
    if (error) {
      toast.error("Error al actualizar estado");
      setUpdating(false);
      return;
    }
    setInquiries((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: newStatus } : i))
    );
    if (selected?.id === id) {
      setSelected({ ...selected, status: newStatus });
    }
    toast.success("Estado actualizado");
    setUpdating(false);
  };

  const openDetail = async (inquiry: Inquiry) => {
    setSelected(inquiry);
    if (inquiry.status === "nuevo") {
      await updateStatus(inquiry.id, "leido");
    }
  };

  const totalPages = Math.ceil(total / PAGE_SIZE);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("es-ES", {
      day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
    });

  return (
    <AdminShell>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div>
          <h1 className="font-[var(--font-heading)] text-2xl font-bold text-brand-black">
            Consultas
          </h1>
          <p className="mt-1 text-sm text-brand-gray-dark">
            {total} consultas recibidas
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 rounded-lg border border-brand-gray bg-white p-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-gray-dark" />
            <input
              type="text"
              placeholder="Buscar por nombre, email o empresa…"
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
            <option value="contacto">Contacto</option>
            <option value="monta_tu_feria">Monta tu Feria</option>
          </select>
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
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-lg border border-brand-gray bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-brand-gray bg-brand-cream text-left">
                  <th className="px-4 py-3 font-medium text-brand-gray-dark">Tipo</th>
                  <th className="px-4 py-3 font-medium text-brand-gray-dark">Nombre</th>
                  <th className="hidden px-4 py-3 font-medium text-brand-gray-dark sm:table-cell">Email</th>
                  <th className="hidden px-4 py-3 font-medium text-brand-gray-dark md:table-cell">Empresa</th>
                  <th className="px-4 py-3 font-medium text-brand-gray-dark">Estado</th>
                  <th className="hidden px-4 py-3 font-medium text-brand-gray-dark md:table-cell">Fecha</th>
                  <th className="px-4 py-3 font-medium text-brand-gray-dark">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-gray">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-brand-gray-dark">
                      Cargando consultas…
                    </td>
                  </tr>
                ) : inquiries.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-brand-gray-dark">
                      No se encontraron consultas
                    </td>
                  </tr>
                ) : (
                  inquiries.map((inquiry) => {
                    const type = TYPE_MAP[inquiry.type] || { label: inquiry.type, color: "bg-gray-100 text-gray-700" };
                    const status = STATUS_MAP[inquiry.status] || { label: inquiry.status, color: "bg-gray-100 text-gray-700" };

                    return (
                      <tr
                        key={inquiry.id}
                        className={cn(
                          "hover:bg-brand-cream/50",
                          inquiry.status === "nuevo" && "bg-blue-50/50"
                        )}
                      >
                        <td className="px-4 py-3">
                          <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", type.color)}>
                            {type.label}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={cn(
                            "text-brand-black",
                            inquiry.status === "nuevo" && "font-semibold"
                          )}>
                            {inquiry.name}
                          </span>
                        </td>
                        <td className="hidden px-4 py-3 text-brand-gray-dark sm:table-cell">
                          {inquiry.email}
                        </td>
                        <td className="hidden px-4 py-3 text-brand-gray-dark md:table-cell">
                          {inquiry.company || "—"}
                        </td>
                        <td className="px-4 py-3">
                          <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", status.color)}>
                            {status.label}
                          </span>
                        </td>
                        <td className="hidden px-4 py-3 text-brand-gray-dark md:table-cell">
                          {formatDate(inquiry.created_at)}
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => openDetail(inquiry)}
                            className="rounded-lg p-1.5 text-brand-gray-dark transition-colors hover:bg-brand-cream hover:text-brand-black"
                            title="Ver detalle"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
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

      {/* Detail Drawer */}
      {selected && (
        <>
          <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setSelected(null)} />
          <div className="fixed inset-y-0 right-0 z-50 w-full max-w-lg overflow-y-auto bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-brand-gray p-5">
              <h2 className="font-[var(--font-heading)] text-lg font-bold text-brand-black">
                Detalle de consulta
              </h2>
              <button
                onClick={() => setSelected(null)}
                className="rounded-lg p-1.5 text-brand-gray-dark hover:bg-brand-cream"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6 p-5">
              {/* Type & status */}
              <div className="flex items-center gap-3">
                <span className={cn(
                  "rounded-full px-3 py-1 text-xs font-medium",
                  TYPE_MAP[selected.type]?.color || "bg-gray-100 text-gray-700"
                )}>
                  {TYPE_MAP[selected.type]?.label || selected.type}
                </span>
                <select
                  value={selected.status}
                  onChange={(e) => updateStatus(selected.id, e.target.value)}
                  disabled={updating}
                  className="rounded-lg border border-brand-gray px-3 py-1.5 text-sm outline-none focus:border-brand-red disabled:opacity-50"
                >
                  {Object.entries(STATUS_MAP).map(([key, { label }]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>

              {/* Contact info */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-brand-black">Datos de contacto</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-brand-gray-dark" />
                    <span className="font-medium text-brand-black">{selected.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-brand-gray-dark" />
                    <a href={`mailto:${selected.email}`} className="text-brand-red hover:text-brand-red-dark">
                      {selected.email}
                    </a>
                  </div>
                  {selected.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-brand-gray-dark" />
                      <a href={`tel:${selected.phone}`} className="text-brand-red hover:text-brand-red-dark">
                        {selected.phone}
                      </a>
                    </div>
                  )}
                  {selected.company && (
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-brand-gray-dark" />
                      <span className="text-brand-black">{selected.company}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Topic */}
              {selected.topic && (
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-brand-black">Asunto</h3>
                  <p className="text-sm text-brand-gray-dark">{selected.topic}</p>
                </div>
              )}

              {/* Message */}
              {selected.message && (
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-brand-black">Mensaje</h3>
                  <p className="whitespace-pre-wrap rounded-lg bg-brand-cream p-3 text-sm text-brand-black">
                    {selected.message}
                  </p>
                </div>
              )}

              {/* Metadata (Monta tu Feria wizard data) */}
              {selected.metadata && Object.keys(selected.metadata).length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-brand-black">Datos del wizard</h3>
                  <div className="rounded-lg border border-brand-gray bg-brand-cream/50 p-3">
                    <dl className="space-y-2 text-sm">
                      {Object.entries(selected.metadata).map(([key, value]) => (
                        <div key={key} className="flex justify-between gap-4">
                          <dt className="text-brand-gray-dark">{key}</dt>
                          <dd className="text-right font-medium text-brand-black">
                            {typeof value === "object" ? JSON.stringify(value) : String(value)}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              )}

              {/* Date */}
              <div className="border-t border-brand-gray pt-4 text-xs text-brand-gray-dark">
                Recibida el {formatDate(selected.created_at)}
              </div>
            </div>
          </div>
        </>
      )}
    </AdminShell>
  );
}
