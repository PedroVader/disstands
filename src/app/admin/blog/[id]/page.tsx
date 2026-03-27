"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { AdminShell } from "@/components/admin/admin-shell";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function AdminBlogEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [status, setStatus] = useState<"borrador" | "publicado">("borrador");
  const [publishedAt, setPublishedAt] = useState<string | null>(null);

  const loadPost = async () => {
    const supabase = createClient();
    const { data } = await supabase.from("blog_posts").select("*").eq("id", id).single();
    if (!data) { router.push("/admin/blog"); return; }

    setTitle(data.title);
    setSlug(data.slug);
    setContent(data.content);
    setExcerpt(data.excerpt || "");
    setCoverImage(data.cover_image || "");
    setSeoTitle(data.seo_title || "");
    setSeoDescription(data.seo_description || "");
    setStatus(data.status);
    setPublishedAt(data.published_at);
    setLoading(false);
  };

  useEffect(() => { loadPost(); }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!title.trim()) { setError("El título es obligatorio"); return; }
    if (!slug.trim()) { setError("El slug es obligatorio"); return; }
    if (!content.trim()) { setError("El contenido es obligatorio"); return; }

    setSaving(true);
    const supabase = createClient();

    const updateData: Record<string, unknown> = {
      title: title.trim(),
      slug: slug.trim(),
      content: content.trim(),
      excerpt: excerpt.trim() || null,
      cover_image: coverImage.trim() || null,
      seo_title: seoTitle.trim() || null,
      seo_description: seoDescription.trim() || null,
      status,
    };

    // Set published_at when publishing for the first time
    if (status === "publicado" && !publishedAt) {
      updateData.published_at = new Date().toISOString();
    }

    const { error: updateError } = await supabase.from("blog_posts").update(updateData).eq("id", id);

    if (updateError) {
      setError(updateError.message);
      toast.error("Error al guardar el artículo");
      setSaving(false);
      return;
    }

    toast.success("Artículo guardado");
    router.push("/admin/blog");
  };

  if (loading) {
    return (
      <AdminShell>
        <div className="flex items-center justify-center py-20">
          <p className="text-brand-gray-dark">Cargando artículo…</p>
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/blog" className="rounded-lg p-1.5 text-brand-gray-dark transition-colors hover:bg-white hover:text-brand-black">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="font-[var(--font-heading)] text-2xl font-bold text-brand-black">Editar artículo</h1>
            <p className="mt-0.5 text-sm text-brand-gray-dark">{title}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-lg border border-brand-gray bg-white p-5">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-brand-black">Título *</label>
                  <input
                    type="text"
                    required
                    maxLength={200}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-brand-black">Slug *</label>
                  <input
                    type="text"
                    required
                    maxLength={500}
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-brand-black">Extracto</label>
                  <textarea
                    maxLength={5000}
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    rows={2}
                    className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-brand-black">Contenido *</label>
                  <textarea
                    required
                    maxLength={50000}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={20}
                    className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 font-mono text-sm outline-none focus:border-brand-red"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-lg border border-brand-gray bg-white p-5">
              <h2 className="text-sm font-semibold text-brand-black">Publicación</h2>
              <div className="mt-4">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as "borrador" | "publicado")}
                  className="w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
                >
                  <option value="borrador">Borrador</option>
                  <option value="publicado">Publicado</option>
                </select>
                {publishedAt && (
                  <p className="mt-2 text-xs text-brand-gray-dark">
                    Publicado: {new Date(publishedAt).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}
                  </p>
                )}
              </div>
            </div>

            <div className="rounded-lg border border-brand-gray bg-white p-5">
              <h2 className="text-sm font-semibold text-brand-black">Imagen de portada</h2>
              <div className="mt-4">
                <input
                  type="url"
                  maxLength={500}
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  className="w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
                  placeholder="https://…"
                />
              </div>
            </div>

            <div className="rounded-lg border border-brand-gray bg-white p-5">
              <h2 className="text-sm font-semibold text-brand-black">SEO</h2>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="text-sm font-medium text-brand-black">Meta título</label>
                  <input
                    type="text"
                    maxLength={200}
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-brand-black">Meta descripción</label>
                  <textarea
                    maxLength={500}
                    value={seoDescription}
                    onChange={(e) => setSeoDescription(e.target.value)}
                    rows={3}
                    className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            {error && <p className="mb-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">{error}</p>}
            <div className="flex items-center justify-end gap-3">
              <Link href="/admin/blog" className="rounded-lg border border-brand-gray px-4 py-2.5 text-sm font-medium text-brand-gray-dark hover:bg-brand-cream">
                Cancelar
              </Link>
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-lg bg-brand-red px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-red-dark disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                {saving ? "Guardando…" : "Guardar cambios"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </AdminShell>
  );
}
