"use client";

import { useState } from "react";
import Image from "next/image";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { ProductCard } from "@/components/shared/product-card";
import { useCart } from "@/hooks/use-cart";
import { useTranslation } from "@/i18n";
import { cn } from "@/lib/utils";
import { Minus, Plus, ShoppingCart, Check, Truck, ChevronLeft, ChevronRight, FileText, Download } from "lucide-react";
import type { Product } from "@/types";

interface Props {
  product: Product;
  related: Product[];
}

export function ProductDetailClient({ product, related }: Props) {
  const { addItem } = useCart();
  const { t } = useTranslation();

  const [selectedVariant, setSelectedVariant] = useState(0);
  const [m2, setM2] = useState(product.minM2);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState<"descripcion" | "specs" | "docs">("descripcion");
  const [added, setAdded] = useState(false);

  const variant = product.variants[selectedVariant];
  const lineTotal = m2 * product.priceFrom;

  const allImages = variant
    ? [variant.image, ...product.images.slice(1)].filter(Boolean)
    : product.images.filter(Boolean);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      variantId: variant.id,
      productName: product.name,
      variantColor: variant.color,
      image: variant.image,
      pricePerM2: product.priceFrom,
      m2,
      slug: product.slug,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-16">
        {/* Header */}
        <div className="border-b border-brand-gray bg-brand-cream">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <Breadcrumb
              items={[
                { label: "Inicio", href: "/" },
                { label: t.catalog.title, href: "/catalogo" },
                { label: product.category, href: `/catalogo?cat=${product.categorySlug}` },
                { label: product.name },
              ]}
            />
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Product layout */}
          <div className="lg:grid lg:grid-cols-[55%_45%] lg:gap-12">
            {/* LEFT: Gallery */}
            <div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-brand-cream">
                {allImages[activeImage] && (
                  <Image
                    src={allImages[activeImage]}
                    alt={`${product.name} - ${variant?.color || ""}`}
                    fill
                    className="object-cover"
                    priority
                  />
                )}
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImage((prev) => (prev === 0 ? allImages.length - 1 : prev - 1))}
                      className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 transition-colors hover:bg-white"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setActiveImage((prev) => (prev === allImages.length - 1 ? 0 : prev + 1))}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 transition-colors hover:bg-white"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>
              {/* Thumbnails */}
              {allImages.length > 1 && (
                <div className="mt-3 flex gap-2">
                  {allImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={cn(
                        "relative aspect-[4/3] w-20 overflow-hidden rounded-md border-2 transition-colors",
                        activeImage === i ? "border-brand-red" : "border-transparent hover:border-brand-gray"
                      )}
                    >
                      <Image src={img} alt="" fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT: Info */}
            <div className="mt-8 lg:mt-0">
              <p className="text-xs font-medium uppercase tracking-wider text-brand-gray-dark">
                {variant?.sku || ""} · {product.category}
              </p>
              <h1 className="mt-2 font-[var(--font-heading)] text-2xl font-bold text-brand-black sm:text-3xl">
                {product.name}
              </h1>
              {product.priceFrom > 0 ? (
                <p className="mt-2 font-[var(--font-heading)] text-2xl font-bold text-brand-red">
                  {t.products.from} {product.priceFrom.toFixed(2).replace(".", ",")} €/{product.unit}
                </p>
              ) : (
                <p className="mt-2 text-sm text-brand-gray-dark">
                  Consultar precio en{" "}
                  <a href="mailto:ventas@disstands.com" className="font-medium text-brand-red hover:underline">
                    ventas@disstands.com
                  </a>
                </p>
              )}
              <p className="mt-4 text-sm leading-relaxed text-brand-gray-dark">
                {product.description}
              </p>

              {/* Color selector */}
              {product.variants.length > 1 && (
                <div className="mt-6">
                  <p className="text-sm font-medium text-brand-black">
                    Color: <span className="text-brand-gray-dark">{variant?.color}</span>
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {product.variants.map((v, i) => (
                      <button
                        key={v.id}
                        onClick={() => {
                          setSelectedVariant(i);
                          setActiveImage(0);
                        }}
                        className={cn(
                          "h-10 w-10 overflow-hidden rounded-full border-2 transition-all",
                          selectedVariant === i
                            ? "border-brand-red scale-110 ring-2 ring-brand-red/30"
                            : "border-brand-gray hover:border-brand-black"
                        )}
                        style={
                          v.colorHex
                            ? { backgroundColor: v.colorHex }
                            : v.image
                              ? { backgroundImage: `url(${v.image})`, backgroundSize: "cover", backgroundPosition: "center" }
                              : { backgroundColor: "#ccc" }
                        }
                        title={v.color}
                      />
                    ))}
                  </div>
                </div>
              )}

              {product.priceFrom > 0 ? (
                <>
                  {/* m2 input */}
                  <div className="mt-6">
                    <p className="text-sm font-medium text-brand-black">
                      {t.wizard.m2}
                      <span className="ml-1 text-brand-gray-dark">(min. {product.minM2} m²)</span>
                    </p>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="flex items-center rounded-lg border border-brand-gray">
                        <button
                          onClick={() => setM2(Math.max(product.minM2, m2 - 1))}
                          className="flex h-10 w-10 items-center justify-center text-brand-gray-dark transition-colors hover:text-brand-black"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <input
                          type="number"
                          min={product.minM2}
                          value={m2}
                          onChange={(e) => setM2(Math.max(product.minM2, Number(e.target.value) || product.minM2))}
                          className="h-10 w-20 border-x border-brand-gray bg-transparent text-center text-sm font-medium text-brand-black outline-none"
                        />
                        <button
                          onClick={() => setM2(m2 + 1)}
                          className="flex h-10 w-10 items-center justify-center text-brand-gray-dark transition-colors hover:text-brand-black"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-lg font-bold text-brand-black">
                        Total: {lineTotal.toFixed(2).replace(".", ",")} €
                      </p>
                    </div>
                  </div>

                  {/* Add to cart */}
                  <button
                    onClick={handleAddToCart}
                    className={cn(
                      "mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-lg text-base font-medium text-white transition-all",
                      added
                        ? "bg-green-600"
                        : "bg-brand-red hover:bg-brand-red-dark"
                    )}
                  >
                    {added ? (
                      <>
                        <Check className="h-5 w-5" /> {t.products.add_to_cart}
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="h-5 w-5" /> {t.products.add_to_cart}
                      </>
                    )}
                  </button>

                  {/* Shipping info */}
                  <div className="mt-4 flex items-center gap-2 text-sm text-brand-gray-dark">
                    <Truck className="h-4 w-4" />
                    Envío en 24-48h · Stock disponible: {(variant?.stockM2 || 0).toLocaleString("es-ES")} m²
                  </div>
                </>
              ) : (
                <a
                  href={`mailto:ventas@disstands.com?subject=Consulta de precio: ${product.name}`}
                  className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-brand-red text-base font-medium text-white transition-colors hover:bg-brand-red-dark"
                >
                  Solicitar presupuesto
                </a>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-16 border-t border-brand-gray pt-8">
            <div className="flex gap-6 border-b border-brand-gray">
              {[
                { key: "descripcion", label: "Descripción" },
                { key: "specs", label: "Especificaciones" },
                { key: "docs", label: "Documentación" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as typeof activeTab)}
                  className={cn(
                    "pb-3 text-sm font-medium transition-colors",
                    activeTab === tab.key
                      ? "border-b-2 border-brand-red text-brand-red"
                      : "text-brand-gray-dark hover:text-brand-black"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="py-6">
              {activeTab === "descripcion" && (
                <div className="max-w-3xl space-y-4 text-sm leading-relaxed text-brand-gray-dark">
                  {(product.descriptionLong || product.description || "")
                    .split("\n\n")
                    .filter(Boolean)
                    .map((block: string, i: number) => {
                      const lines = block.split("\n").filter(Boolean);
                      const isHeading = lines[0] === lines[0].toUpperCase() && lines[0].length < 60 && !lines[0].startsWith("•");
                      if (isHeading && lines.length > 1) {
                        return (
                          <div key={i}>
                            <h3 className="mb-2 text-sm font-semibold text-brand-black">{lines[0]}</h3>
                            {lines.slice(1).map((line: string, j: number) => (
                              <p key={j} className={line.startsWith("•") ? "pl-2" : ""}>{line}</p>
                            ))}
                          </div>
                        );
                      }
                      return <p key={i}>{block.replace(/\n/g, " ")}</p>;
                    })}
                </div>
              )}
              {activeTab === "specs" && (
                <>
                  {(product.specifications && product.specifications.length > 0) ? (
                    <table className="w-full max-w-xl">
                      <tbody>
                        {product.specifications.map((spec) => (
                          <tr key={spec.id} className="border-b border-brand-gray">
                            <td className="py-3 pr-8 text-sm font-medium text-brand-black">{spec.label}</td>
                            <td className="py-3 text-sm text-brand-gray-dark">{spec.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : product.specs ? (
                    <table className="w-full max-w-xl">
                      <tbody>
                        {Object.entries(product.specs).map(([key, value]) => (
                          <tr key={key} className="border-b border-brand-gray">
                            <td className="py-3 pr-8 text-sm font-medium text-brand-black">{key}</td>
                            <td className="py-3 text-sm text-brand-gray-dark">{value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="text-sm text-brand-gray-dark">
                      No hay especificaciones disponibles para este producto.
                    </p>
                  )}
                </>
              )}
              {activeTab === "docs" && (
                <>
                  {(product.fichaTecnicaUrl || (product.documents && product.documents.length > 0)) ? (
                    <div className="max-w-xl space-y-3">
                      {product.fichaTecnicaUrl && (
                        <a
                          href={product.fichaTecnicaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-4 rounded-lg border border-brand-gray p-4 transition-colors hover:border-brand-red"
                        >
                          <FileText className="h-8 w-8 flex-shrink-0 text-brand-red" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-brand-black truncate">Ficha Técnica — {product.name}</p>
                            <p className="text-xs text-brand-gray-dark">PDF · Ficha técnica</p>
                          </div>
                          <Download className="h-5 w-5 flex-shrink-0 text-brand-gray-dark" />
                        </a>
                      )}
                      {product.documents?.map((doc) => (
                        <a
                          key={doc.id}
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-4 rounded-lg border border-brand-gray p-4 transition-colors hover:border-brand-red"
                        >
                          <FileText className="h-8 w-8 flex-shrink-0 text-brand-red" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-brand-black truncate">{doc.name}</p>
                            <p className="text-xs text-brand-gray-dark">
                              {doc.type === "certificado" && "Certificado"}
                              {doc.type === "manual" && "Manual"}
                              {doc.type === "otro" && "Documento"}
                              {doc.fileSize ? ` · ${(doc.fileSize / 1024).toFixed(0)} KB` : ""}
                            </p>
                          </div>
                          <Download className="h-5 w-5 flex-shrink-0 text-brand-gray-dark" />
                        </a>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-brand-gray-dark">
                      Documentación técnica disponible bajo petición. Contacta con nuestro equipo en{" "}
                      <a href="mailto:ventas@disstands.com" className="font-medium text-brand-red hover:underline">
                        ventas@disstands.com
                      </a>
                    </p>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Related products */}
          {related.length > 0 && (
            <div className="mt-12 border-t border-brand-gray pt-12">
              <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-brand-black">
                Productos relacionados
              </h2>
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
