"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { AdminShell } from "@/components/admin/admin-shell";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, X } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  sort_order: number;
  created_at: string;
  product_count: number;
}

interface FormData {
  name: string;
  slug: string;
  description: string;
  image_url: string;
  sort_order: number;
}

const emptyForm: FormData = {
  name: "",
  slug: "",
  description: "",
  image_url: "",
  sort_order: 0,
};

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function AdminCategoriasPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [slugManual, setSlugManual] = useState(false);

  // Delete state
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);

  // ─── Load categories ────────────────────────────────────────────────

  const loadCategories = async () => {
    setLoading(true);
    const supabase = createClient();

    const { data, error } = await supabase
      .from("categories")
      .select("id, name, slug, description, image_url, sort_order, created_at")
      .order("sort_order");

    if (error) {
      toast.error("Error al cargar categorías");
      setLoading(false);
      return;
    }

    // Get product counts per category
    const { data: products } = await supabase
      .from("products")
      .select("category_id");

    const countMap: Record<string, number> = {};
    for (const row of products || []) {
      const catId = (row as { category_id: string }).category_id;
      if (catId) {
        countMap[catId] = (countMap[catId] || 0) + 1;
      }
    }

    const mapped: Category[] = (data || []).map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      description: c.description,
      image_url: c.image_url,
      sort_order: c.sort_order ?? 0,
      created_at: c.created_at,
      product_count: countMap[c.id] || 0,
    }));

    setCategories(mapped);
    setLoading(false);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  // ─── Drawer helpers ─────────────────────────────────────────────────

  const openCreate = () => {
    setEditingId(null);
    setForm({ ...emptyForm, sort_order: categories.length });
    setSlugManual(false);
    setDrawerOpen(true);
  };

  const openEdit = (cat: Category) => {
    setEditingId(cat.id);
    setForm({
      name: cat.name,
      slug: cat.slug,
      description: cat.description || "",
      image_url: cat.image_url || "",
      sort_order: cat.sort_order,
    });
    setSlugManual(true);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setEditingId(null);
    setForm(emptyForm);
    setSlugManual(false);
  };

  const handleNameChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      name: value,
      slug: slugManual ? prev.slug : generateSlug(value),
    }));
  };

  const handleSlugChange = (value: string) => {
    setSlugManual(true);
    setForm((prev) => ({ ...prev, slug: value }));
  };

  // ─── Save ───────────────────────────────────────────────────────────

  const handleSave = async () => {
    if (!form.name.trim()) {
      toast.error("El nombre es obligatorio");
      return;
    }
    if (!form.slug.trim()) {
      toast.error("El slug es obligatorio");
      return;
    }

    setSaving(true);
    const supabase = createClient();

    const payload = {
      name: form.name.trim(),
      slug: form.slug.trim(),
      description: form.description.trim() || null,
      image_url: form.image_url.trim() || null,
      sort_order: form.sort_order,
    };

    if (editingId) {
      // Update
      const { error } = await supabase
        .from("categories")
        .update(payload)
        .eq("id", editingId);

      if (error) {
        toast.error("Error al actualizar la categoría");
        setSaving(false);
        return;
      }
      toast.success("Categoría actualizada");
    } else {
      // Create
      const { error } = await supabase
        .from("categories")
        .insert(payload);

      if (error) {
        toast.error("Error al crear la categoría");
        setSaving(false);
        return;
      }
      toast.success("Categoría creada");
    }

    setSaving(false);
    closeDrawer();
    loadCategories();
  };

  // ─── Delete ─────────────────────────────────────────────────────────

  const handleDeleteClick = (cat: Category) => {
    setDeleteTarget(cat);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    const supabase = createClient();
    const { error } = await supabase
      .from("categories")
      .delete()
      .eq("id", deleteTarget.id);

    if (error) {
      toast.error("Error al eliminar la categoría");
    } else {
      toast.success("Categoría eliminada");
    }

    setDeleteTarget(null);
    loadCategories();
  };

  // ─── Render ─────────────────────────────────────────────────────────

  return (
    <AdminShell>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-[var(--font-heading)] text-2xl font-bold text-brand-black">
              Categorías
            </h1>
            <p className="mt-1 text-sm text-brand-gray-dark">
              {categories.length} categorías en el catálogo
            </p>
          </div>
          <button
            onClick={openCreate}
            className="inline-flex items-center gap-2 rounded-lg bg-brand-red px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-red-dark"
          >
            <Plus className="h-4 w-4" />
            Nueva categoría
          </button>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-lg border border-brand-gray bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-brand-gray bg-brand-cream text-left">
                  <th className="px-4 py-3 font-medium text-brand-gray-dark">Orden</th>
                  <th className="px-4 py-3 font-medium text-brand-gray-dark">Nombre</th>
                  <th className="hidden px-4 py-3 font-medium text-brand-gray-dark sm:table-cell">Slug</th>
                  <th className="hidden px-4 py-3 font-medium text-brand-gray-dark md:table-cell">Descripción</th>
                  <th className="px-4 py-3 text-right font-medium text-brand-gray-dark">Productos</th>
                  <th className="px-4 py-3 font-medium text-brand-gray-dark">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-gray">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center text-brand-gray-dark">
                      Cargando categorías...
                    </td>
                  </tr>
                ) : categories.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center">
                      <p className="text-brand-gray-dark">No hay categorías</p>
                      <button
                        onClick={openCreate}
                        className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-brand-red hover:text-brand-red-dark"
                      >
                        <Plus className="h-4 w-4" />
                        Crear la primera
                      </button>
                    </td>
                  </tr>
                ) : (
                  categories.map((cat) => (
                    <tr key={cat.id} className="hover:bg-brand-cream/50">
                      <td className="px-4 py-3">
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-brand-cream text-xs font-medium text-brand-gray-dark">
                          {cat.sort_order}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-medium text-brand-black">
                        {cat.name}
                      </td>
                      <td className="hidden px-4 py-3 text-brand-gray-dark sm:table-cell">
                        <code className="rounded bg-brand-cream px-1.5 py-0.5 text-xs">
                          {cat.slug}
                        </code>
                      </td>
                      <td className="hidden max-w-xs truncate px-4 py-3 text-brand-gray-dark md:table-cell">
                        {cat.description || "—"}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                          {cat.product_count}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => openEdit(cat)}
                            className="rounded-lg p-1.5 text-brand-gray-dark transition-colors hover:bg-brand-cream hover:text-brand-black"
                            title="Editar"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(cat)}
                            className="rounded-lg p-1.5 text-brand-gray-dark transition-colors hover:bg-red-50 hover:text-brand-red"
                            title="Eliminar"
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
        </div>
      </div>

      {/* ─── Slide-out Drawer ─────────────────────────────────────────── */}
      {drawerOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/50" onClick={closeDrawer} />
          <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md overflow-y-auto bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-brand-gray p-5">
              <h2 className="font-[var(--font-heading)] text-lg font-bold text-brand-black">
                {editingId ? "Editar categoría" : "Nueva categoría"}
              </h2>
              <button
                onClick={closeDrawer}
                className="rounded-lg p-1.5 text-brand-gray-dark hover:bg-brand-cream"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 p-5">
              {/* Name */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-brand-black">
                  Nombre *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className="w-full rounded-lg border border-brand-gray px-3 py-2 text-sm outline-none focus:border-brand-red"
                  placeholder="Ej: Moquetas"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-brand-black">
                  Slug *
                </label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => handleSlugChange(e.target.value)}
                  className="w-full rounded-lg border border-brand-gray px-3 py-2 text-sm outline-none focus:border-brand-red"
                  placeholder="ej: moquetas"
                />
                <p className="mt-1 text-xs text-brand-gray-dark">
                  Se genera automáticamente desde el nombre. Puedes editarlo manualmente.
                </p>
              </div>

              {/* Description */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-brand-black">
                  Descripción
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full rounded-lg border border-brand-gray px-3 py-2 text-sm outline-none focus:border-brand-red"
                  placeholder="Descripción breve de la categoría..."
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-brand-black">
                  URL de imagen
                </label>
                <input
                  type="url"
                  value={form.image_url}
                  onChange={(e) => setForm((prev) => ({ ...prev, image_url: e.target.value }))}
                  className="w-full rounded-lg border border-brand-gray px-3 py-2 text-sm outline-none focus:border-brand-red"
                  placeholder="https://..."
                />
              </div>

              {/* Sort Order */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-brand-black">
                  Orden
                </label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={form.sort_order}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      sort_order: parseInt(e.target.value, 10) || 0,
                    }))
                  }
                  className="w-full rounded-lg border border-brand-gray px-3 py-2 text-sm outline-none focus:border-brand-red"
                  placeholder="0"
                />
                <p className="mt-1 text-xs text-brand-gray-dark">
                  Las categorías se ordenan de menor a mayor.
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 rounded-lg bg-brand-red px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-red-dark disabled:opacity-50"
                >
                  {saving
                    ? "Guardando..."
                    : editingId
                    ? "Guardar cambios"
                    : "Crear categoría"}
                </button>
                <button
                  onClick={closeDrawer}
                  className="rounded-lg border border-brand-gray px-4 py-2.5 text-sm font-medium text-brand-gray-dark transition-colors hover:bg-brand-cream"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ─── Delete Confirmation ──────────────────────────────────────── */}
      <ConfirmDialog
        open={!!deleteTarget}
        title="Eliminar categoría"
        description={
          deleteTarget?.product_count
            ? `La categoría "${deleteTarget.name}" tiene ${deleteTarget.product_count} producto(s) asociado(s). Eliminarla podría afectar esos productos. ¿Estás seguro?`
            : `¿Estás seguro de que quieres eliminar la categoría "${deleteTarget?.name}"? Esta acción no se puede deshacer.`
        }
        variant={deleteTarget?.product_count ? "warning" : "danger"}
        confirmLabel="Eliminar"
        cancelLabel="Cancelar"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </AdminShell>
  );
}
