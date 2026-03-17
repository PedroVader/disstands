"use client";

import { useParams } from "next/navigation";
import { useState, useMemo } from "react";
import Image from "next/image";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { ProductCard } from "@/components/shared/product-card";
import { CtaButton } from "@/components/shared/cta-button";
import { useCart } from "@/hooks/use-cart";
import { allProducts } from "@/data/products";
import { cn } from "@/lib/utils";
import { Minus, Plus, ShoppingCart, Check, Truck, ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = allProducts.find((p) => p.slug === slug);
  const { addItem } = useCart();

  const [selectedVariant, setSelectedVariant] = useState(0);
  const [m2, setM2] = useState(product?.minM2 ?? 1);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState<"descripcion" | "specs" | "docs">("descripcion");
  const [added, setAdded] = useState(false);

  const related = useMemo(() => {
    if (!product) return [];
    return allProducts
      .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-screen items-center justify-center bg-white pt-16">
          <div className="text-center">
            <p className="font-[var(--font-heading)] text-6xl font-bold text-brand-red">404</p>
            <p className="mt-4 text-lg text-brand-gray-dark">Producto no encontrado</p>
            <CtaButton variant="primary" className="mt-6" href="/catalogo">
              Volver al catálogo
            </CtaButton>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const variant = product.variants[selectedVariant];
  const lineTotal = m2 * product.priceFrom;

  const allImages = variant
    ? [variant.image, ...product.images.slice(1)]
    : product.images;

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
                { label: "Catálogo", href: "/catalogo" },
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
                <Image
                  src={allImages[activeImage]}
                  alt={`${product.name} - ${variant.color}`}
                  fill
                  className="object-cover"
                  priority
                />
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
                {variant.sku} · {product.category}
              </p>
              <h1 className="mt-2 font-[var(--font-heading)] text-2xl font-bold text-brand-black sm:text-3xl">
                {product.name}
              </h1>
              <p className="mt-2 font-[var(--font-heading)] text-2xl font-bold text-brand-red">
                Desde {product.priceFrom.toFixed(2).replace(".", ",")} €/{product.unit}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-brand-gray-dark">
                {product.description}
              </p>

              {/* Color selector */}
              {product.variants.length > 1 && (
                <div className="mt-6">
                  <p className="text-sm font-medium text-brand-black">
                    Color: <span className="text-brand-gray-dark">{variant.color}</span>
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
                          "h-10 w-10 rounded-full border-2 transition-all",
                          selectedVariant === i
                            ? "border-brand-red scale-110 ring-2 ring-brand-red/30"
                            : "border-brand-gray hover:border-brand-black"
                        )}
                        style={{ backgroundColor: v.colorHex }}
                        title={v.color}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* m² input */}
              <div className="mt-6">
                <p className="text-sm font-medium text-brand-black">
                  Metros cuadrados
                  <span className="ml-1 text-brand-gray-dark">(mín. {product.minM2} m²)</span>
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
                    <Check className="h-5 w-5" /> Añadido al carrito
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5" /> Añadir al carrito
                  </>
                )}
              </button>

              {/* Shipping info */}
              <div className="mt-4 flex items-center gap-2 text-sm text-brand-gray-dark">
                <Truck className="h-4 w-4" />
                Envío en 24-48h · Stock disponible: {variant.stockM2.toLocaleString("es-ES")} m²
              </div>
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
                <p className="max-w-3xl text-sm leading-relaxed text-brand-gray-dark">
                  {product.descriptionLong || product.description}
                </p>
              )}
              {activeTab === "specs" && product.specs && (
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
              )}
              {activeTab === "docs" && (
                <p className="text-sm text-brand-gray-dark">
                  Documentación técnica disponible bajo petición. Contacta con nuestro equipo.
                </p>
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
