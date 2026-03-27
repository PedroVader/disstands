"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { AdminShell } from "@/components/admin/admin-shell";
import { ArrowLeft, Save, Sparkles, Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function AdminBlogNuevoPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [status, setStatus] = useState<"borrador" | "publicado">("borrador");
  const [aiTopic, setAiTopic] = useState("");
  const [generating, setGenerating] = useState(false);

  const generateSlug = (text: string) =>
    text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!slug || slug === generateSlug(title)) setSlug(generateSlug(value));
  };

  const handleGenerateAI = async () => {
    const topic = aiTopic.trim() || title.trim();
    if (!topic) {
      toast.error("Escribe un tema o título para generar el artículo");
      return;
    }
    setGenerating(true);
    try {
      const res = await fetch("/api/ai/generate-blog-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        toast.error(data.error || "Error al generar");
        setGenerating(false);
        return;
      }
      const d = data.data;
      if (d.title) { setTitle(d.title); setSlug(generateSlug(d.title)); }
      if (d.content) setContent(d.content);
      if (d.excerpt) setExcerpt(d.excerpt);
      if (d.seoTitle) setSeoTitle(d.seoTitle);
      if (d.seoDescription) setSeoDescription(d.seoDescription);
      toast.success("Artículo generado con IA");
    } catch {
      toast.error("Error de conexión con la IA");
    }
    setGenerating(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!title.trim()) { setError("El título es obligatorio"); return; }
    if (!slug.trim()) { setError("El slug es obligatorio"); return; }
    if (!content.trim()) { setError("El contenido es obligatorio"); return; }

    setSaving(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { error: insertError } = await supabase.from("blog_posts").insert({
      title: title.trim(),
      slug: slug.trim(),
      content: content.trim(),
      excerpt: excerpt.trim() || null,
      cover_image: coverImage.trim() || null,
      seo_title: seoTitle.trim() || null,
      seo_description: seoDescription.trim() || null,
      status,
      author_id: user?.id,
      published_at: status === "publicado" ? new Date().toISOString() : null,
    });

    if (insertError) {
      setError(insertError.message);
      toast.error("Error al crear el artículo");
      setSaving(false);
      return;
    }

    toast.success("Artículo creado");
    router.push("/admin/blog");
  };

  return (
    <AdminShell>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/blog" className="rounded-lg p-1.5 text-brand-gray-dark transition-colors hover:bg-white hover:text-brand-black">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="font-[var(--font-heading)] text-2xl font-bold text-brand-black">Nuevo artículo</h1>
            <p className="mt-0.5 text-sm text-brand-gray-dark">Escribe y publica un artículo en el blog</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            {/* AI Generator */}
            <div className="rounded-lg border-2 border-dashed border-purple-300 bg-purple-50/50 p-5">
              <div className="flex items-center gap-2 text-purple-700">
                <Sparkles className="h-5 w-5" />
                <h2 className="text-sm font-semibold">Generar con IA</h2>
              </div>
              <p className="mt-1 text-xs text-purple-600/70">
                Escribe el tema y la IA generará título, contenido, extracto y SEO automáticamente.
              </p>
              <div className="mt-3 flex gap-2">
                <input
                  type="text"
                  value={aiTopic}
                  onChange={(e) => setAiTopic(e.target.value)}
                  placeholder="Ej: Cómo elegir la moqueta perfecta para tu stand"
                  className="flex-1 rounded-lg border border-purple-200 bg-white px-3 py-2 text-sm outline-none focus:border-purple-500"
                />
                <button
                  type="button"
                  onClick={handleGenerateAI}
                  disabled={generating}
                  className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-700 disabled:opacity-50"
                >
                  {generating ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Generando…</>
                  ) : (
                    <><Sparkles className="h-4 w-4" /> Generar</>
                  )}
                </button>
              </div>
            </div>

            <div className="rounded-lg border border-brand-gray bg-white p-5">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-brand-black">Título *</label>
                  <input
                    type="text"
                    required
                    maxLength={200}
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
                    placeholder="Título del artículo"
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
                    placeholder="Resumen breve del artículo…"
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
                    placeholder="Contenido del artículo (Markdown o HTML)…"
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
                {saving ? "Guardando…" : "Crear artículo"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </AdminShell>
  );
}
