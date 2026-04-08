"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { AdminShell } from "@/components/admin/admin-shell";
import { ArrowLeft, Save, Plus, X } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function AdminPortfolioNuevoPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [clientName, setClientName] = useState("");
  const [venue, setVenue] = useState("");
  const [city, setCity] = useState("");
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const [m2Total, setM2Total] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [gallery, setGallery] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [featured, setFeatured] = useState(false);
  const [status, setStatus] = useState<"borrador" | "publicado">("borrador");

  const generateSlug = (text: string) =>
    text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!slug || slug === generateSlug(title)) setSlug(generateSlug(value));
  };

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !tags.includes(t)) { setTags([...tags, t]); setTagInput(""); }
  };

  const removeTag = (tag: string) => setTags(tags.filter((t) => t !== tag));

  const addGalleryImage = () => setGallery([...gallery, ""]);
  const updateGalleryImage = (i: number, url: string) => {
    const updated = [...gallery];
    updated[i] = url;
    setGallery(updated);
  };
  const removeGalleryImage = (i: number) => setGallery(gallery.filter((_, idx) => idx !== i));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!title.trim()) { setError("El título es obligatorio"); return; }
    if (!slug.trim()) { setError("El slug es obligatorio"); return; }

    setSaving(true);
    const supabase = createClient();

    const { error: insertError } = await supabase.from("portfolio_items").insert({
      title: title.trim(),
      slug: slug.trim(),
      description: description.trim() || null,
      client_name: clientName.trim() || null,
      venue: venue.trim() || null,
      city: city.trim() || null,
      year: year ? parseInt(year) : null,
      m2_total: m2Total ? parseFloat(m2Total) : null,
      cover_image: coverImage.trim() || null,
      gallery: gallery.filter((u) => u.trim()),
      tags,
      featured,
      status,
    });

    if (insertError) { setError(insertError.message); toast.error("Error al crear portfolio"); setSaving(false); return; }
    toast.success("Portfolio creado");
    router.push("/admin/portfolio");
  };

  return (
    <AdminShell>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/portfolio" className="rounded-lg p-1.5 text-brand-gray-dark transition-colors hover:bg-white hover:text-brand-black">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="font-[var(--font-heading)] text-2xl font-bold text-brand-black">Nuevo proyecto</h1>
            <p className="mt-0.5 text-sm text-brand-gray-dark">Añade un proyecto al portfolio</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            {/* Basic info */}
            <div className="rounded-lg border border-brand-gray bg-white p-5">
              <h2 className="text-sm font-semibold text-brand-black">Información del proyecto</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium text-brand-black">Título *</label>
                  <input type="text" required maxLength={200} value={title} onChange={(e) => handleTitleChange(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
                    placeholder="Stand MWC 2026" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium text-brand-black">Slug *</label>
                  <input type="text" required maxLength={500} value={slug} onChange={(e) => setSlug(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red" />
                </div>
                <div>
                  <label className="text-sm font-medium text-brand-black">Marca</label>
                  <input type="text" maxLength={200} value={clientName} onChange={(e) => setClientName(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
                    placeholder="Nombre de la marca" />
                </div>
                <div>
                  <label className="text-sm font-medium text-brand-black">Recinto / Venue</label>
                  <input type="text" maxLength={200} value={venue} onChange={(e) => setVenue(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
                    placeholder="Fira Barcelona" />
                </div>
                <div>
                  <label className="text-sm font-medium text-brand-black">Ciudad</label>
                  <input type="text" maxLength={200} value={city} onChange={(e) => setCity(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
                    placeholder="Barcelona" />
                </div>
                <div>
                  <label className="text-sm font-medium text-brand-black">Año</label>
                  <input type="number" value={year} onChange={(e) => setYear(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
                    min={2000} max={2030} />
                </div>
                <div>
                  <label className="text-sm font-medium text-brand-black">m² totales</label>
                  <input type="number" value={m2Total} onChange={(e) => setM2Total(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
                    step="0.01" min={0} />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium text-brand-black">Descripción</label>
                  <textarea maxLength={5000} value={description} onChange={(e) => setDescription(e.target.value)} rows={5}
                    className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
                    placeholder="Descripción del proyecto…" />
                </div>
              </div>
            </div>

            {/* Gallery */}
            <div className="rounded-lg border border-brand-gray bg-white p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-brand-black">Galería ({gallery.length})</h2>
                <button type="button" onClick={addGalleryImage}
                  className="inline-flex items-center gap-1 text-xs font-medium text-brand-red hover:text-brand-red-dark">
                  <Plus className="h-3.5 w-3.5" /> Añadir imagen
                </button>
              </div>
              <div className="mt-4 space-y-2">
                {gallery.map((url, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input type="url" maxLength={500} value={url} onChange={(e) => updateGalleryImage(i, e.target.value)}
                      className="flex-1 rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
                      placeholder="https://…" />
                    <button type="button" onClick={() => removeGalleryImage(i)}
                      className="p-1.5 text-brand-gray-dark hover:text-brand-red">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                {gallery.length === 0 && (
                  <p className="py-4 text-center text-sm text-brand-gray-dark">Sin imágenes de galería</p>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="rounded-lg border border-brand-gray bg-white p-5">
              <h2 className="text-sm font-semibold text-brand-black">Publicación</h2>
              <div className="mt-4 space-y-4">
                <select value={status} onChange={(e) => setStatus(e.target.value as "borrador" | "publicado")}
                  className="w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red">
                  <option value="borrador">Borrador</option>
                  <option value="publicado">Publicado</option>
                </select>
                <div className="flex items-center justify-between">
                  <label className="text-sm text-brand-black">Destacado</label>
                  <button type="button" onClick={() => setFeatured(!featured)}
                    className={`relative h-6 w-11 rounded-full transition-colors ${featured ? "bg-green-500" : "bg-brand-gray"}`}>
                    <span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${featured ? "translate-x-5" : ""}`} />
                  </button>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-brand-gray bg-white p-5">
              <h2 className="text-sm font-semibold text-brand-black">Imagen de portada</h2>
              <input type="url" maxLength={500} value={coverImage} onChange={(e) => setCoverImage(e.target.value)}
                className="mt-3 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
                placeholder="https://…" />
            </div>

            <div className="rounded-lg border border-brand-gray bg-white p-5">
              <h2 className="text-sm font-semibold text-brand-black">Etiquetas</h2>
              <div className="mt-3 flex gap-2">
                <input type="text" maxLength={200} value={tagInput} onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
                  className="flex-1 rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
                  placeholder="Añadir etiqueta" />
                <button type="button" onClick={addTag}
                  className="rounded-lg bg-brand-cream px-3 py-2 text-sm font-medium text-brand-black hover:bg-brand-gray">
                  +
                </button>
              </div>
              {tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {tags.map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-1 rounded-full bg-brand-cream px-2 py-0.5 text-xs text-brand-black">
                      {tag}
                      <button type="button" onClick={() => removeTag(tag)} className="text-brand-gray-dark hover:text-brand-red">
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-3">
            {error && <p className="mb-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">{error}</p>}
            <div className="flex items-center justify-end gap-3">
              <Link href="/admin/portfolio" className="rounded-lg border border-brand-gray px-4 py-2.5 text-sm font-medium text-brand-gray-dark hover:bg-brand-cream">
                Cancelar
              </Link>
              <button type="submit" disabled={saving}
                className="inline-flex items-center gap-2 rounded-lg bg-brand-red px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-red-dark disabled:opacity-50">
                <Save className="h-4 w-4" />
                {saving ? "Guardando…" : "Crear proyecto"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </AdminShell>
  );
}
