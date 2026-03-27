"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { AdminShell } from "@/components/admin/admin-shell";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useDebounce } from "@/hooks/use-debounce";
import { Plus, Search, ChevronLeft, ChevronRight, Pencil, Eye, Trash2, ArrowUpDown, Star } from "lucide-react";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";

interface DBProduct {
  id: string;
  name: string;
  slug: string;
  price_per_m2: number | null;
  active: boolean;
  featured: boolean;
  badge: string | null;
  created_at: string;
  updated_at: string;
  categories: { name: string; slug: string } | null;
  product_variants: { id: string; color: string; stock_m2: number }[];
  product_images: { url: string; sort_order: number }[];
}

type SortField = "updated_at" | "created_at" | "name" | "price_per_m2";
type SortDir = "asc" | "desc";

const PAGE_SIZE = 20;

export default function AdminProductosPage() {
  const [products, setProducts] = useState<DBProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterActive, setFilterActive] = useState<"all" | "active" | "inactive">("all");
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [categories, setCategories] = useState<{ name: string; slug: string }[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);
  const [sortField, setSortField] = useState<SortField>("updated_at");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [filterEditFrom, setFilterEditFrom] = useState("");
  const [filterEditTo, setFilterEditTo] = useState("");

  useEffect(() => {
    loadCategories();
    loadProducts();
  }, []);

  useEffect(() => {
    setPage(0);
    loadProducts();
  }, [debouncedSearch, filterCategory, filterActive, filterEditFrom, filterEditTo]);

  useEffect(() => {
    loadProducts();
  }, [page, sortField, sortDir]);

  const loadCategories = async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("categories")
      .select("name, slug")
      .order("name");
    if (data) setCategories(data);
  };

  const loadProducts = async () => {
    setLoading(true);
    const supabase = createClient();

    let query = supabase
      .from("products")
      .select(`
        id, name, slug, price_per_m2, active, featured, badge, created_at, updated_at,
        categories (name, slug),
        product_variants (id, color, stock_m2),
        product_images (url, sort_order)
      `, { count: "exact" });

    if (debouncedSearch) {
      query = query.ilike("name", `%${debouncedSearch}%`);
    }
    if (filterCategory) {
      const { data: cat } = await supabase
        .from("categories")
        .select("id")
        .eq("slug", filterCategory)
        .single();
      if (cat) query = query.eq("category_id", cat.id);
    }
    if (filterActive === "active") query = query.eq("active", true);
    if (filterActive === "inactive") query = query.eq("active", false);
    if (filterEditFrom) query = query.gte("updated_at", filterEditFrom + "T00:00:00");
    if (filterEditTo) query = query.lte("updated_at", filterEditTo + "T23:59:59");

    query = query
      .order(sortField, { ascending: sortDir === "asc" })
      .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

    const { data, count } = await query;

    // Supabase returns FK joins as arrays; cast to our normalized interface
    if (data) setProducts(data as unknown as DBProduct[]);
    if (count !== null) setTotal(count);
    setLoading(false);
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

  const SortButton = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <button
      onClick={() => handleSort(field)}
      className="inline-flex items-center gap-1 font-medium text-brand-gray-dark hover:text-brand-black"
    >
      {children}
      <ArrowUpDown className={cn("h-3 w-3", sortField === field ? "text-brand-red" : "opacity-40")} />
    </button>
  );

  const formatDate = (dateStr: string) => {
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

  const confirmDelete = async (id: string) => {
    const supabase = createClient();
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      toast.error("Error al eliminar el producto");
    } else {
      toast.success("Producto eliminado");
    }
    loadProducts();
  };

  const toggleActive = async (id: string, currentActive: boolean) => {
    const supabase = createClient();
    await supabase.from("products").update({ active: !currentActive }).eq("id", id);
    loadProducts();
  };

  const toggleFeatured = async (id: string, currentFeatured: boolean) => {
    const supabase = createClient();
    const { error } = await supabase.from("products").update({ featured: !currentFeatured }).eq("id", id);
    if (error) {
      toast.error("Error al actualizar destacado");
    } else {
      toast.success(currentFeatured ? "Producto quitado de destacados" : "Producto marcado como destacado");
    }
    loadProducts();
  };

  return (
    <AdminShell>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-[var(--font-heading)] text-2xl font-bold text-brand-black">
              Productos
            </h1>
            <p className="mt-1 text-sm text-brand-gray-dark">
              {total} productos en el catálogo
            </p>
          </div>
          <Link
            href="/admin/productos/nuevo"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-red px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-red-dark"
          >
            <Plus className="h-4 w-4" />
            Nuevo producto
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 rounded-lg border border-brand-gray bg-white p-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-gray-dark" />
            <input
              type="text"
              placeholder="Buscar productos…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-brand-gray bg-white py-2 pl-10 pr-3 text-sm outline-none focus:border-brand-red"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
          >
            <option value="">Todas las categorías</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
          <select
            value={filterActive}
            onChange={(e) => setFilterActive(e.target.value as typeof filterActive)}
            className="rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
          >
            <option value="all">Todos</option>
            <option value="active">Activos</option>
            <option value="inactive">Inactivos</option>
          </select>
          <div className="flex items-center gap-2">
            <label className="text-xs text-brand-gray-dark whitespace-nowrap">Editado desde</label>
            <input
              type="date"
              value={filterEditFrom}
              onChange={(e) => setFilterEditFrom(e.target.value)}
              className="rounded-lg border border-brand-gray bg-white px-2 py-2 text-sm outline-none focus:border-brand-red"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs text-brand-gray-dark whitespace-nowrap">hasta</label>
            <input
              type="date"
              value={filterEditTo}
              onChange={(e) => setFilterEditTo(e.target.value)}
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
                  <th className="px-4 py-3 text-xs"><SortButton field="name">Producto</SortButton></th>
                  <th className="hidden px-4 py-3 text-xs font-medium text-brand-gray-dark sm:table-cell">Categoría</th>
                  <th className="px-4 py-3 text-xs"><SortButton field="price_per_m2">Precio</SortButton></th>
                  <th className="hidden px-4 py-3 text-xs font-medium text-brand-gray-dark md:table-cell">Variantes</th>
                  <th className="hidden px-4 py-3 text-xs font-medium text-brand-gray-dark md:table-cell">Estado</th>
                  <th className="hidden px-4 py-3 text-xs lg:table-cell"><SortButton field="updated_at">Última edición</SortButton></th>
                  <th className="px-4 py-3 text-xs font-medium text-brand-gray-dark">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-gray">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-brand-gray-dark">
                      Cargando productos…
                    </td>
                  </tr>
                ) : products.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center">
                      <p className="text-brand-gray-dark">No se encontraron productos</p>
                      <Link
                        href="/admin/productos/nuevo"
                        className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-brand-red hover:text-brand-red-dark"
                      >
                        <Plus className="h-4 w-4" />
                        Crear el primero
                      </Link>
                    </td>
                  </tr>
                ) : (
                  products.map((product) => {
                    const mainImage = product.product_images?.[0]?.url;
                    const totalStock = product.product_variants?.reduce((sum, v) => sum + (v.stock_m2 || 0), 0) || 0;

                    return (
                      <tr key={product.id} className="hover:bg-brand-cream/50">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            {mainImage && (
                              <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-md bg-brand-cream">
                                <Image src={mainImage} alt="" fill className="object-cover" />
                              </div>
                            )}
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                <p className="truncate font-medium text-brand-black">{product.name}</p>
                                <button
                                  onClick={() => toggleFeatured(product.id, product.featured)}
                                  title={product.featured ? "Quitar de destacados" : "Marcar como destacado"}
                                  className="flex-shrink-0"
                                >
                                  <Star className={cn("h-4 w-4 transition-colors", product.featured ? "fill-amber-400 text-amber-400" : "text-brand-gray hover:text-amber-400")} />
                                </button>
                              </div>
                              <p className="truncate text-xs text-brand-gray-dark">{product.slug}</p>
                            </div>
                          </div>
                        </td>
                        <td className="hidden px-4 py-3 sm:table-cell">
                          <span className="text-brand-gray-dark">
                            {product.categories?.name || "—"}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {product.price_per_m2 ? (
                            <span className="font-medium text-brand-black">
                              {product.price_per_m2.toFixed(2).replace(".", ",")} €/m²
                            </span>
                          ) : (
                            <span className="text-xs text-brand-gray-dark">Bajo consulta</span>
                          )}
                        </td>
                        <td className="hidden px-4 py-3 md:table-cell">
                          <span className="text-brand-gray-dark">
                            {product.product_variants?.length || 0} · {totalStock.toLocaleString("es-ES")} m²
                          </span>
                        </td>
                        <td className="hidden px-4 py-3 md:table-cell">
                          <button
                            onClick={() => toggleActive(product.id, product.active)}
                            className={cn(
                              "rounded-full px-2.5 py-0.5 text-xs font-medium",
                              product.active
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            )}
                          >
                            {product.active ? "Activo" : "Inactivo"}
                          </button>
                        </td>
                        <td className="hidden px-4 py-3 lg:table-cell">
                          <span className="text-xs text-brand-gray-dark" title={new Date(product.updated_at).toLocaleString("es-ES")}>
                            {formatDate(product.updated_at)}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <Link
                              href={`/catalogo/${product.slug}`}
                              target="_blank"
                              className="rounded-lg p-1.5 text-brand-gray-dark transition-colors hover:bg-brand-cream hover:text-brand-black"
                              title="Ver en web"
                            >
                              <Eye className="h-4 w-4" />
                            </Link>
                            <Link
                              href={`/admin/productos/${product.id}`}
                              className="rounded-lg p-1.5 text-brand-gray-dark transition-colors hover:bg-brand-cream hover:text-brand-black"
                              title="Editar"
                            >
                              <Pencil className="h-4 w-4" />
                            </Link>
                            <button
                              onClick={() => setDeleteTarget({ id: product.id, name: product.name })}
                              className="rounded-lg p-1.5 text-brand-gray-dark transition-colors hover:bg-red-50 hover:text-brand-red"
                              title="Eliminar"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
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

      <ConfirmDialog
        open={!!deleteTarget}
        title="Eliminar producto"
        description={`¿Eliminar "${deleteTarget?.name}"? Esta acción no se puede deshacer.`}
        confirmLabel="Eliminar"
        variant="danger"
        onConfirm={() => { if (deleteTarget) confirmDelete(deleteTarget.id); setDeleteTarget(null); }}
        onCancel={() => setDeleteTarget(null)}
      />
    </AdminShell>
  );
}
