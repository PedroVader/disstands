"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { AdminShell } from "@/components/admin/admin-shell";
import { ArrowLeft, Plus, Trash2, Save, GripVertical, Sparkles, Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface CategoryOption {
  id: string;
  name: string;
  slug: string;
}

interface VariantInput {
  color: string;
  sku: string;
  image_url: string;
  stock_m2: number;
}

interface ImageInput {
  url: string;
  sort_order: number;
}

interface SpecInput {
  label: string;
  value: string;
}

interface DocInput {
  name: string;
  type: string;
  url: string;
}

export default function AdminProductoNuevoPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [generatingAI, setGeneratingAI] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionLong, setDescriptionLong] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [pricePerM2, setPricePerM2] = useState("");
  const [active, setActive] = useState(true);
  const [featured, setFeatured] = useState(false);
  const [oferta, setOferta] = useState(false);
  const [badge, setBadge] = useState("");
  const [fichaTecnicaUrl, setFichaTecnicaUrl] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [variants, setVariants] = useState<VariantInput[]>([
    { color: "Natural", sku: "", image_url: "", stock_m2: 0 },
  ]);
  const [images, setImages] = useState<ImageInput[]>([
    { url: "", sort_order: 0 },
  ]);
  const [specs, setSpecs] = useState<SpecInput[]>([]);
  const [docs, setDocs] = useState<DocInput[]>([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("categories")
      .select("id, name, slug")
      .order("name");
    if (data) setCategories(data);
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const handleNameChange = (value: string) => {
    setName(value);
    if (!slug || slug === generateSlug(name)) {
      setSlug(generateSlug(value));
    }
  };

  const addVariant = () => {
    setVariants([...variants, { color: "", sku: "", image_url: "", stock_m2: 0 }]);
  };

  const removeVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const updateVariant = (index: number, field: keyof VariantInput, value: string | number) => {
    const updated = [...variants];
    updated[index] = { ...updated[index], [field]: value };
    setVariants(updated);
  };

  const addImage = () => {
    setImages([...images, { url: "", sort_order: images.length }]);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const updateImage = (index: number, field: keyof ImageInput, value: string | number) => {
    const updated = [...images];
    updated[index] = { ...updated[index], [field]: value };
    setImages(updated);
  };

  const addSpec = () => setSpecs([...specs, { label: "", value: "" }]);
  const removeSpec = (index: number) => setSpecs(specs.filter((_, i) => i !== index));
  const updateSpec = (index: number, field: keyof SpecInput, value: string) => {
    const updated = [...specs];
    updated[index] = { ...updated[index], [field]: value };
    setSpecs(updated);
  };

  const addDoc = () => setDocs([...docs, { name: "", type: "ficha_tecnica", url: "" }]);
  const removeDoc = (index: number) => setDocs(docs.filter((_, i) => i !== index));
  const updateDoc = (index: number, field: keyof DocInput, value: string) => {
    const updated = [...docs];
    updated[index] = { ...updated[index], [field]: value };
    setDocs(updated);
  };

  const handleGenerateAI = async () => {
    setGeneratingAI(true);
    try {
      const catName = categories.find((c) => c.id === categoryId)?.name || "";
      const variantNames = variants.map((v) => v.color).filter(Boolean);

      const res = await fetch("/api/ai/generate-product-doc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName: name,
          description: descriptionLong || description,
          category: catName,
          variants: variantNames,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        toast.error(json.error || "Error al generar con IA");
        return;
      }

      const ai = json.data;
      if (ai.descripcion_comercial) {
        setDescription(ai.descripcion_comercial.substring(0, 500));
        setDescriptionLong(ai.descripcion_comercial);
      }
      if (ai.seo_title) setMetaTitle(ai.seo_title);
      if (ai.seo_description) setMetaDescription(ai.seo_description);

      let richContent = ai.descripcion_comercial || "";
      if (ai.ventajas?.length) {
        richContent += "\n\nVENTAJAS PRINCIPALES\n" + ai.ventajas.map((v: string) => `• ${v}`).join("\n");
      }
      if (ai.aplicaciones?.length) {
        richContent += "\n\nAPLICACIONES\n" + ai.aplicaciones.map((a: string) => `• ${a}`).join("\n");
      }
      if (ai.instrucciones_instalacion) {
        richContent += "\n\nINSTALACIÓN\n" + ai.instrucciones_instalacion;
      }
      if (ai.mantenimiento) {
        richContent += "\n\nMANTENIMIENTO\n" + ai.mantenimiento;
      }
      if (ai.certificaciones?.length) {
        richContent += "\n\nCERTIFICACIONES\n" + ai.certificaciones.join(", ");
      }
      setDescriptionLong(richContent);

      // Populate specs from AI response
      if (ai.especificaciones?.length) {
        setSpecs(ai.especificaciones.map((s: { label: string; value: string }) => ({
          label: s.label,
          value: s.value,
        })));
      }

      toast.success(`Ficha generada con IA (${json.model})`);
    } catch {
      toast.error("Error de conexión con la IA");
    } finally {
      setGeneratingAI(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) { setError("El nombre es obligatorio"); return; }
    if (!slug.trim()) { setError("El slug es obligatorio"); return; }
    if (!categoryId) { setError("Selecciona una categoría"); return; }

    setSaving(true);
    const supabase = createClient();

    // Create product
    const { data: product, error: productError } = await supabase
      .from("products")
      .insert({
        name: name.trim(),
        slug: slug.trim(),
        description: description.trim() || null,
        description_long: descriptionLong.trim() || null,
        category_id: categoryId,
        price_per_m2: pricePerM2 ? parseFloat(pricePerM2) : null,
        active,
        featured,
        oferta,
        badge: badge.trim() || null,
        ficha_tecnica_url: fichaTecnicaUrl.trim() || null,
        meta_title: metaTitle.trim() || null,
        meta_description: metaDescription.trim() || null,
      })
      .select("id")
      .single();

    if (productError) {
      setError(productError.message);
      toast.error("Error al crear el producto");
      setSaving(false);
      return;
    }

    // Insert variants
    const validVariants = variants.filter((v) => v.color.trim());
    if (validVariants.length > 0) {
      await supabase.from("product_variants").insert(
        validVariants.map((v) => ({
          product_id: product.id,
          color: v.color.trim(),
          sku: v.sku.trim() || null,
          image_url: v.image_url.trim() || null,
          stock_m2: v.stock_m2,
        }))
      );
    }

    // Insert images
    const validImages = images.filter((img) => img.url.trim());
    if (validImages.length > 0) {
      await supabase.from("product_images").insert(
        validImages.map((img, i) => ({
          product_id: product.id,
          url: img.url.trim(),
          sort_order: i,
        }))
      );
    }

    // Insert specifications
    const validSpecs = specs.filter((s) => s.label.trim() && s.value.trim());
    if (validSpecs.length > 0) {
      await supabase.from("product_specifications").insert(
        validSpecs.map((s, i) => ({
          product_id: product.id,
          label: s.label.trim(),
          value: s.value.trim(),
          sort_order: i,
        }))
      );
    }

    // Insert documents
    const validDocs = docs.filter((d) => d.name.trim() && d.url.trim());
    if (validDocs.length > 0) {
      await supabase.from("product_documents").insert(
        validDocs.map((d, i) => ({
          product_id: product.id,
          name: d.name.trim(),
          type: d.type,
          url: d.url.trim(),
          sort_order: i,
        }))
      );
    }

    toast.success("Producto creado");
    router.push("/admin/productos");
  };

  return (
    <AdminShell>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link
            href="/admin/productos"
            className="rounded-lg p-1.5 text-brand-gray-dark transition-colors hover:bg-white hover:text-brand-black"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="font-[var(--font-heading)] text-2xl font-bold text-brand-black">
              Nuevo producto
            </h1>
            <p className="mt-0.5 text-sm text-brand-gray-dark">
              Rellena los campos para crear un producto
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-3">
          {/* Main info */}
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-lg border border-brand-gray bg-white p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-brand-black">Información básica</h2>
                <button
                  type="button"
                  onClick={handleGenerateAI}
                  disabled={generatingAI || !name.trim()}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                  {generatingAI ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Sparkles className="h-3.5 w-3.5" />
                  )}
                  {generatingAI ? "Generando…" : "Generar con IA"}
                </button>
              </div>

              <div className="mt-4 space-y-4">
                <div>
                  <label className="text-sm font-medium text-brand-black">Nombre *</label>
                  <input
                    type="text"
                    required
                    maxLength={200}
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
                    placeholder="Moqueta Las Vegas"
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
                    placeholder="moqueta-las-vegas"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-brand-black">Descripción breve</label>
                  <textarea
                    maxLength={500}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
                    placeholder="Resumen corto para tarjetas y listados"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-brand-black">Descripción completa</label>
                  <textarea
                    maxLength={10000}
                    value={descriptionLong}
                    onChange={(e) => setDescriptionLong(e.target.value)}
                    rows={12}
                    className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm leading-relaxed outline-none focus:border-brand-red"
                    placeholder="Descripción detallada, especificaciones, ventajas, aplicaciones… (se puede generar con IA)"
                  />
                  <p className="mt-1 text-xs text-brand-gray-dark">
                    {descriptionLong.length} / 10.000 caracteres
                  </p>
                </div>
              </div>
            </div>

            {/* Variants */}
            <div className="rounded-lg border border-brand-gray bg-white p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-brand-black">Variantes</h2>
                <button
                  type="button"
                  onClick={addVariant}
                  className="inline-flex items-center gap-1 text-xs font-medium text-brand-red hover:text-brand-red-dark"
                >
                  <Plus className="h-3.5 w-3.5" /> Añadir variante
                </button>
              </div>

              <div className="mt-4 space-y-3">
                {variants.map((v, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-lg border border-brand-gray p-3">
                    <GripVertical className="mt-5 h-4 w-4 flex-shrink-0 text-brand-gray-dark" />
                    <div className="grid flex-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                      <div>
                        <label className="text-xs text-brand-gray-dark">Color</label>
                        <input
                          type="text"
                          maxLength={200}
                          value={v.color}
                          onChange={(e) => updateVariant(i, "color", e.target.value)}
                          className="mt-0.5 w-full rounded border border-brand-gray bg-white px-2 py-1.5 text-sm outline-none focus:border-brand-red"
                          placeholder="Rojo"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-brand-gray-dark">SKU</label>
                        <input
                          type="text"
                          maxLength={100}
                          value={v.sku}
                          onChange={(e) => updateVariant(i, "sku", e.target.value)}
                          className="mt-0.5 w-full rounded border border-brand-gray bg-white px-2 py-1.5 text-sm outline-none focus:border-brand-red"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-brand-gray-dark">Stock (m²)</label>
                        <input
                          type="number"
                          min={0}
                          step="0.01"
                          value={v.stock_m2}
                          onChange={(e) => updateVariant(i, "stock_m2", parseFloat(e.target.value) || 0)}
                          className="mt-0.5 w-full rounded border border-brand-gray bg-white px-2 py-1.5 text-sm outline-none focus:border-brand-red"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-brand-gray-dark">URL imagen</label>
                        <input
                          type="url"
                          maxLength={500}
                          value={v.image_url}
                          onChange={(e) => updateVariant(i, "image_url", e.target.value)}
                          className="mt-0.5 w-full rounded border border-brand-gray bg-white px-2 py-1.5 text-sm outline-none focus:border-brand-red"
                          placeholder="https://..."
                        />
                      </div>
                    </div>
                    {variants.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeVariant(i)}
                        className="mt-5 p-1 text-brand-gray-dark hover:text-brand-red"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Images */}
            <div className="rounded-lg border border-brand-gray bg-white p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-brand-black">Imágenes</h2>
                <button
                  type="button"
                  onClick={addImage}
                  className="inline-flex items-center gap-1 text-xs font-medium text-brand-red hover:text-brand-red-dark"
                >
                  <Plus className="h-3.5 w-3.5" /> Añadir imagen
                </button>
              </div>

              <div className="mt-4 space-y-3">
                {images.map((img, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-lg border border-brand-gray p-3">
                    <div className="flex-1">
                      <label className="text-xs text-brand-gray-dark">URL de imagen</label>
                      <input
                        type="url"
                        maxLength={500}
                        value={img.url}
                        onChange={(e) => updateImage(i, "url", e.target.value)}
                        className="mt-0.5 w-full rounded border border-brand-gray bg-white px-2 py-1.5 text-sm outline-none focus:border-brand-red"
                        placeholder="https://…"
                      />
                    </div>
                    {images.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        className="mt-4 p-1 text-brand-gray-dark hover:text-brand-red"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Specifications */}
            <div className="rounded-lg border border-brand-gray bg-white p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-brand-black">
                  Especificaciones ({specs.length})
                </h2>
                <button
                  type="button"
                  onClick={addSpec}
                  className="inline-flex items-center gap-1 text-xs font-medium text-brand-red hover:text-brand-red-dark"
                >
                  <Plus className="h-3.5 w-3.5" /> Añadir especificación
                </button>
              </div>

              <div className="mt-4 space-y-3">
                {specs.length === 0 && (
                  <p className="py-4 text-center text-sm text-brand-gray-dark">
                    Sin especificaciones. Añade manualmente o genera con IA.
                  </p>
                )}
                {specs.map((s, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-lg border border-brand-gray p-3">
                    <div className="grid flex-1 gap-3 sm:grid-cols-2">
                      <div>
                        <label className="text-xs text-brand-gray-dark">Propiedad</label>
                        <input
                          type="text"
                          maxLength={200}
                          value={s.label}
                          onChange={(e) => updateSpec(i, "label", e.target.value)}
                          className="mt-0.5 w-full rounded border border-brand-gray bg-white px-2 py-1.5 text-sm outline-none focus:border-brand-red"
                          placeholder="Material"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-brand-gray-dark">Valor</label>
                        <input
                          type="text"
                          maxLength={500}
                          value={s.value}
                          onChange={(e) => updateSpec(i, "value", e.target.value)}
                          className="mt-0.5 w-full rounded border border-brand-gray bg-white px-2 py-1.5 text-sm outline-none focus:border-brand-red"
                          placeholder="Polipropileno"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeSpec(i)}
                      className="mt-5 p-1 text-brand-gray-dark hover:text-brand-red"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Documents */}
            <div className="rounded-lg border border-brand-gray bg-white p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-brand-black">
                  Documentación ({docs.length})
                </h2>
                <button
                  type="button"
                  onClick={addDoc}
                  className="inline-flex items-center gap-1 text-xs font-medium text-brand-red hover:text-brand-red-dark"
                >
                  <Plus className="h-3.5 w-3.5" /> Añadir documento
                </button>
              </div>

              <div className="mt-4 space-y-3">
                {docs.length === 0 && (
                  <p className="py-4 text-center text-sm text-brand-gray-dark">
                    Sin documentos. Añade fichas técnicas, certificados o manuales.
                  </p>
                )}
                {docs.map((d, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-lg border border-brand-gray p-3">
                    <div className="grid flex-1 gap-3 sm:grid-cols-3">
                      <div>
                        <label className="text-xs text-brand-gray-dark">Nombre</label>
                        <input
                          type="text"
                          maxLength={200}
                          value={d.name}
                          onChange={(e) => updateDoc(i, "name", e.target.value)}
                          className="mt-0.5 w-full rounded border border-brand-gray bg-white px-2 py-1.5 text-sm outline-none focus:border-brand-red"
                          placeholder="Ficha técnica"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-brand-gray-dark">Tipo</label>
                        <select
                          value={d.type}
                          onChange={(e) => updateDoc(i, "type", e.target.value)}
                          className="mt-0.5 w-full rounded border border-brand-gray bg-white px-2 py-1.5 text-sm outline-none focus:border-brand-red"
                        >
                          <option value="ficha_tecnica">Ficha técnica</option>
                          <option value="certificado">Certificado</option>
                          <option value="manual">Manual</option>
                          <option value="otro">Otro</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-brand-gray-dark">URL</label>
                        <input
                          type="url"
                          maxLength={500}
                          value={d.url}
                          onChange={(e) => updateDoc(i, "url", e.target.value)}
                          className="mt-0.5 w-full rounded border border-brand-gray bg-white px-2 py-1.5 text-sm outline-none focus:border-brand-red"
                          placeholder="https://…"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeDoc(i)}
                      className="mt-5 p-1 text-brand-gray-dark hover:text-brand-red"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="rounded-lg border border-brand-gray bg-white p-5">
              <h2 className="text-sm font-semibold text-brand-black">Publicación</h2>

              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm text-brand-black">Activo</label>
                  <button
                    type="button"
                    onClick={() => setActive(!active)}
                    className={`relative h-6 w-11 rounded-full transition-colors ${active ? "bg-green-500" : "bg-brand-gray"}`}
                  >
                    <span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${active ? "translate-x-5" : ""}`} />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm text-brand-black">Destacado</label>
                  <button
                    type="button"
                    onClick={() => setFeatured(!featured)}
                    className={`relative h-6 w-11 rounded-full transition-colors ${featured ? "bg-green-500" : "bg-brand-gray"}`}
                  >
                    <span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${featured ? "translate-x-5" : ""}`} />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm text-brand-black">Oferta</label>
                  <button
                    type="button"
                    onClick={() => setOferta(!oferta)}
                    className={`relative h-6 w-11 rounded-full transition-colors ${oferta ? "bg-amber-500" : "bg-brand-gray"}`}
                  >
                    <span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${oferta ? "translate-x-5" : ""}`} />
                  </button>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-brand-gray bg-white p-5">
              <h2 className="text-sm font-semibold text-brand-black">Organización</h2>

              <div className="mt-4 space-y-4">
                <div>
                  <label className="text-sm font-medium text-brand-black">Categoría *</label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
                  >
                    <option value="">Seleccionar…</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-brand-black">Badge</label>
                  <select
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
                  >
                    <option value="">Sin badge</option>
                    <option value="Nuevo">Nuevo</option>
                    <option value="Eco">Eco</option>
                    <option value="Popular">Popular</option>
                    <option value="Usado">Usado</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-brand-gray bg-white p-5">
              <h2 className="text-sm font-semibold text-brand-black">Precio</h2>
              <div className="mt-4">
                <label className="text-sm font-medium text-brand-black">Precio base (€/m²)</label>
                <input
                  type="number"
                  value={pricePerM2}
                  onChange={(e) => setPricePerM2(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
                  step="0.01"
                  min={0}
                  placeholder="Dejar vacío = bajo consulta"
                />
              </div>
            </div>

            <div className="rounded-lg border border-brand-gray bg-white p-5">
              <h2 className="text-sm font-semibold text-brand-black">Ficha Técnica</h2>
              <div className="mt-4">
                <label className="text-sm font-medium text-brand-black">URL del PDF</label>
                <input
                  type="url"
                  value={fichaTecnicaUrl}
                  onChange={(e) => setFichaTecnicaUrl(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
                  placeholder="https://www.disstands.com/wp-content/uploads/..."
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
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
                    placeholder="Título para Google"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-brand-black">Meta descripción</label>
                  <textarea
                    maxLength={500}
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    rows={3}
                    className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
                    placeholder="Descripción para Google"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom actions */}
          <div className="lg:col-span-3">
            {error && (
              <p className="mb-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">{error}</p>
            )}
            <div className="flex items-center justify-end gap-3">
              <Link
                href="/admin/productos"
                className="rounded-lg border border-brand-gray px-4 py-2.5 text-sm font-medium text-brand-gray-dark transition-colors hover:bg-brand-cream"
              >
                Cancelar
              </Link>
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-lg bg-brand-red px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-red-dark disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                {saving ? "Guardando…" : "Crear producto"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </AdminShell>
  );
}
