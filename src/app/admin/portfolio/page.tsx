"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { AdminShell } from "@/components/admin/admin-shell";
import { cn } from "@/lib/utils";
import { Plus, Pencil, Trash2, Eye, MapPin, Calendar, ArrowUpDown } from "lucide-react";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";

interface DBPortfolio {
  id: string;
  title: string;
  slug: string;
  client_name: string | null;
  venue: string | null;
  city: string | null;
  year: number | null;
  m2_total: number | null;
  cover_image: string | null;
  featured: boolean;
  status: string;
  tags: string[];
  created_at: string;
  updated_at: string;
}

type SortField = "updated_at" | "year" | "created_at" | "title";
type SortDir = "asc" | "desc";

export default function AdminPortfolioPage() {
  const [items, setItems] = useState<DBPortfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string } | null>(null);
  const [sortField, setSortField] = useState<SortField>("updated_at");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [editFrom, setEditFrom] = useState("");
  const [editTo, setEditTo] = useState("");

  useEffect(() => { loadItems(); }, []);
  useEffect(() => { loadItems(); }, [filterStatus, sortField, sortDir, editFrom, editTo]);

  const loadItems = async () => {
    setLoading(true);
    const supabase = createClient();

    let query = supabase
      .from("portfolio_items")
      .select("*");

    if (filterStatus) query = query.eq("status", filterStatus);
    if (editFrom) query = query.gte("updated_at", editFrom + "T00:00:00");
    if (editTo) query = query.lte("updated_at", editTo + "T23:59:59");

    query = query.order(sortField, { ascending: sortDir === "asc" });

    const { data } = await query;
    if (data) setItems(data as DBPortfolio[]);
    setLoading(false);
  };

  const confirmDelete = async (id: string) => {
    const supabase = createClient();
    await supabase.from("portfolio_items").delete().eq("id", id);
    loadItems();
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

  const toggleFeatured = async (id: string, current: boolean) => {
    const supabase = createClient();
    await supabase.from("portfolio_items").update({ featured: !current }).eq("id", id);
    loadItems();
  };

  return (
    <AdminShell>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-[var(--font-heading)] text-2xl font-bold text-brand-black">Portfolio</h1>
            <p className="mt-1 text-sm text-brand-gray-dark">{items.length} proyectos</p>
          </div>
          <Link
            href="/admin/portfolio/nuevo"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-red px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-red-dark"
          >
            <Plus className="h-4 w-4" />
            Nuevo proyecto
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 rounded-lg border border-brand-gray bg-white p-4 sm:flex-row sm:items-center sm:flex-wrap">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
          >
            <option value="">Todos</option>
            <option value="borrador">Borradores</option>
            <option value="publicado">Publicados</option>
          </select>
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
            <option value="year:desc">Año (reciente)</option>
            <option value="year:asc">Año (antiguo)</option>
            <option value="title:asc">Título (A-Z)</option>
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

        {/* Grid */}
        {loading ? (
          <div className="py-12 text-center text-brand-gray-dark">Cargando portfolio…</div>
        ) : items.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-brand-gray-dark">No hay proyectos aún</p>
            <Link
              href="/admin/portfolio/nuevo"
              className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-brand-red hover:text-brand-red-dark"
            >
              <Plus className="h-4 w-4" />
              Crear el primero
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <div key={item.id} className="group overflow-hidden rounded-lg border border-brand-gray bg-white transition-all hover:border-brand-red hover:shadow-md">
                {/* Cover */}
                <div className="relative aspect-[16/10] bg-brand-cream">
                  {item.cover_image ? (
                    <Image src={item.cover_image} alt={item.title} fill className="object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-brand-gray-dark">
                      Sin imagen
                    </div>
                  )}

                  {/* Overlay actions */}
                  <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/0 opacity-0 transition-all group-hover:bg-black/40 group-hover:opacity-100">
                    <Link
                      href={`/admin/portfolio/${item.id}`}
                      className="rounded-lg bg-white p-2 text-brand-black transition-colors hover:bg-brand-cream"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => setDeleteTarget({ id: item.id, title: item.title })}
                      className="rounded-lg bg-white p-2 text-brand-red transition-colors hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex gap-1">
                    <span className={cn(
                      "rounded-full px-2 py-0.5 text-xs font-medium",
                      item.status === "publicado"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    )}>
                      {item.status === "publicado" ? "Publicado" : "Borrador"}
                    </span>
                    {item.featured && (
                      <span className="rounded-full bg-brand-red px-2 py-0.5 text-xs font-medium text-white">
                        Destacado
                      </span>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="font-medium text-brand-black">{item.title}</h3>

                  <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-brand-gray-dark">
                    {item.client_name && <span>{item.client_name}</span>}
                    {(item.venue || item.city) && (
                      <span className="flex items-center gap-0.5">
                        <MapPin className="h-3 w-3" />
                        {[item.venue, item.city].filter(Boolean).join(", ")}
                      </span>
                    )}
                    {item.year && (
                      <span className="flex items-center gap-0.5">
                        <Calendar className="h-3 w-3" />
                        {item.year}
                      </span>
                    )}
                    {item.m2_total && <span>{item.m2_total.toLocaleString("es-ES")} m²</span>}
                  </div>

                  {item.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {item.tags.map((tag) => (
                        <span key={tag} className="rounded bg-brand-cream px-1.5 py-0.5 text-[10px] text-brand-gray-dark">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-3 flex items-center justify-between border-t border-brand-gray pt-3">
                    <button
                      onClick={() => toggleFeatured(item.id, item.featured)}
                      className={cn(
                        "text-xs font-medium transition-colors",
                        item.featured ? "text-brand-red" : "text-brand-gray-dark hover:text-brand-red"
                      )}
                    >
                      {item.featured ? "★ Destacado" : "☆ Destacar"}
                    </button>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-brand-gray-dark/60" title={new Date(item.updated_at).toLocaleString("es-ES")}>
                        Editado {formatRelativeDate(item.updated_at)}
                      </span>
                      <Link
                        href={`/admin/portfolio/${item.id}`}
                        className="text-xs font-medium text-brand-gray-dark transition-colors hover:text-brand-black"
                      >
                        Editar →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ConfirmDialog
        open={!!deleteTarget}
        title="Eliminar proyecto"
        description={`¿Eliminar "${deleteTarget?.title}"? Esta acción no se puede deshacer.`}
        confirmLabel="Eliminar"
        variant="danger"
        onConfirm={() => { if (deleteTarget) confirmDelete(deleteTarget.id); setDeleteTarget(null); }}
        onCancel={() => setDeleteTarget(null)}
      />
    </AdminShell>
  );
}
