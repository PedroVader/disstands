"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { AdminShell } from "@/components/admin/admin-shell";
import { cn } from "@/lib/utils";
import { useDebounce } from "@/hooks/use-debounce";
import { Plus, Search, Pencil, Eye, Trash2, ChevronLeft, ChevronRight, ArrowUpDown } from "lucide-react";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";

interface DBBlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image: string | null;
  status: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  profiles: { full_name: string } | null;
}

type SortField = "updated_at" | "created_at" | "title";
type SortDir = "asc" | "desc";

const PAGE_SIZE = 20;

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<DBBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const [filterStatus, setFilterStatus] = useState("");
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string } | null>(null);
  const [sortField, setSortField] = useState<SortField>("updated_at");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [editFrom, setEditFrom] = useState("");
  const [editTo, setEditTo] = useState("");

  const loadPosts = async () => {
    setLoading(true);
    const supabase = createClient();

    let query = supabase
      .from("blog_posts")
      .select(`
        id, title, slug, excerpt, cover_image, status, published_at, created_at, updated_at,
        profiles!blog_posts_author_id_fkey (full_name)
      `, { count: "exact" });

    if (debouncedSearch) query = query.ilike("title", `%${debouncedSearch}%`);
    if (filterStatus) query = query.eq("status", filterStatus);
    if (editFrom) query = query.gte("updated_at", editFrom + "T00:00:00");
    if (editTo) query = query.lte("updated_at", editTo + "T23:59:59");

    query = query
      .order(sortField, { ascending: sortDir === "asc" })
      .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

    const { data, count } = await query;
    // Supabase returns FK joins as arrays; cast to our normalized interface
    if (data) setPosts(data as unknown as DBBlogPost[]);
    if (count !== null) setTotal(count);
    setLoading(false);
  };

  useEffect(() => { loadPosts(); }, []);

  useEffect(() => { setPage(0); loadPosts(); }, [debouncedSearch, filterStatus, editFrom, editTo]);

  useEffect(() => { loadPosts(); }, [page, sortField, sortDir]);

  const confirmDelete = async (id: string) => {
    const supabase = createClient();
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) {
      toast.error("Error al eliminar el artículo");
    } else {
      toast.success("Artículo eliminado");
    }
    loadPosts();
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
            <h1 className="font-[var(--font-heading)] text-2xl font-bold text-brand-black">Blog</h1>
            <p className="mt-1 text-sm text-brand-gray-dark">{total} artículos</p>
          </div>
          <Link
            href="/admin/blog/nuevo"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-red px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-red-dark"
          >
            <Plus className="h-4 w-4" />
            Nuevo artículo
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 rounded-lg border border-brand-gray bg-white p-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-gray-dark" />
            <input
              type="text"
              placeholder="Buscar artículos…"
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
            <option value="created_at:desc">Creación (reciente)</option>
            <option value="created_at:asc">Creación (antigua)</option>
            <option value="title:asc">Título (A-Z)</option>
            <option value="title:desc">Título (Z-A)</option>
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

        {/* Posts list */}
        {loading ? (
          <div className="py-12 text-center text-brand-gray-dark">Cargando artículos…</div>
        ) : posts.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-brand-gray-dark">No se encontraron artículos</p>
            <Link
              href="/admin/blog/nuevo"
              className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-brand-red hover:text-brand-red-dark"
            >
              <Plus className="h-4 w-4" />
              Crear el primero
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => (
              <div
                key={post.id}
                className="flex items-center gap-4 rounded-lg border border-brand-gray bg-white p-4 transition-all hover:border-brand-red/30 hover:shadow-sm"
              >
                {/* Cover */}
                {post.cover_image && (
                  <div className="relative hidden h-16 w-24 flex-shrink-0 overflow-hidden rounded-md bg-brand-cream sm:block">
                    <Image src={post.cover_image} alt="" fill className="object-cover" />
                  </div>
                )}

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate font-medium text-brand-black">{post.title}</h3>
                    <span className={cn(
                      "flex-shrink-0 rounded-full px-2 py-0.5 text-xs font-medium",
                      post.status === "publicado"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    )}>
                      {post.status === "publicado" ? "Publicado" : "Borrador"}
                    </span>
                  </div>
                  {post.excerpt && (
                    <p className="mt-1 line-clamp-1 text-sm text-brand-gray-dark">{post.excerpt}</p>
                  )}
                  <div className="mt-1.5 flex items-center gap-3 text-xs text-brand-gray-dark">
                    {post.profiles?.full_name && <span>{post.profiles.full_name}</span>}
                    <span>
                      {post.published_at
                        ? new Date(post.published_at).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" })
                        : new Date(post.created_at).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" })
                      }
                    </span>
                    <span className="text-brand-gray-dark/60" title={new Date(post.updated_at).toLocaleString("es-ES")}>
                      · Editado {formatRelativeDate(post.updated_at)}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                  <Link
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    className="rounded-lg p-1.5 text-brand-gray-dark transition-colors hover:bg-brand-cream hover:text-brand-black"
                    title="Ver en web"
                  >
                    <Eye className="h-4 w-4" />
                  </Link>
                  <Link
                    href={`/admin/blog/${post.id}`}
                    className="rounded-lg p-1.5 text-brand-gray-dark transition-colors hover:bg-brand-cream hover:text-brand-black"
                    title="Editar"
                  >
                    <Pencil className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => setDeleteTarget({ id: post.id, title: post.title })}
                    className="rounded-lg p-1.5 text-brand-gray-dark transition-colors hover:bg-red-50 hover:text-brand-red"
                    title="Eliminar"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between rounded-lg border border-brand-gray bg-white px-4 py-3">
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

      <ConfirmDialog
        open={!!deleteTarget}
        title="Eliminar artículo"
        description={`¿Eliminar "${deleteTarget?.title}"? No se puede deshacer.`}
        confirmLabel="Eliminar"
        variant="danger"
        onConfirm={() => { if (deleteTarget) confirmDelete(deleteTarget.id); setDeleteTarget(null); }}
        onCancel={() => setDeleteTarget(null)}
      />
    </AdminShell>
  );
}
