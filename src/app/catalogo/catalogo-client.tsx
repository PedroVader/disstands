"use client";

import { useState, useMemo } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { ProductCard } from "@/components/shared/product-card";
import { SlidersHorizontal, X } from "lucide-react";
import { useTranslation } from "@/i18n";
import { cn } from "@/lib/utils";
import type { Product, Category } from "@/types";

type SortOption = "relevancia" | "precio-asc" | "precio-desc" | "nombre";

const MAX_PRICE = 70;

interface Props {
  products: Product[];
  categories: Category[];
}

export function CatalogoClient({ products, categories }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, MAX_PRICE]);
  const [sort, setSort] = useState<SortOption>("relevancia");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const { t } = useTranslation();

  const filtered = useMemo(() => {
    let result = products;

    if (selectedCategory) {
      result = result.filter((p) => p.categorySlug === selectedCategory);
    }

    result = result.filter(
      (p) => p.priceFrom === 0 || (p.priceFrom >= priceRange[0] && p.priceFrom <= priceRange[1])
    );

    switch (sort) {
      case "precio-asc":
        result = [...result].sort((a, b) => a.priceFrom - b.priceFrom);
        break;
      case "precio-desc":
        result = [...result].sort((a, b) => b.priceFrom - a.priceFrom);
        break;
      case "nombre":
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [products, selectedCategory, priceRange, sort]);

  const hasFilters = selectedCategory || priceRange[0] > 0 || priceRange[1] < MAX_PRICE;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-16">
        {/* Header */}
        <div className="border-b border-brand-gray bg-brand-cream">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <Breadcrumb
              items={[
                { label: "Inicio", href: "/" },
                { label: t.catalog.title },
              ]}
            />
            <h1 className="font-[var(--font-heading)] text-3xl font-bold text-brand-black sm:text-4xl">
              {t.catalog.title}
            </h1>
            <p className="mt-2 text-brand-gray-dark">
              {t.catalog.showing} {filtered.length} {t.catalog.products}
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-8">
            {/* Mobile filter toggle */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="mb-4 inline-flex items-center gap-2 rounded-lg border border-brand-gray px-4 py-2 text-sm font-medium text-brand-black transition-colors hover:bg-brand-cream lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filtros
            </button>

            {/* Sidebar filters */}
            <div className={showMobileFilters ? "mb-6 lg:mb-0" : "hidden lg:block"}>
              <aside className="space-y-6">
                {hasFilters && (
                  <div>
                    <button
                      onClick={() => {
                        setSelectedCategory(null);
                        setPriceRange([0, MAX_PRICE]);
                      }}
                      className="inline-flex items-center gap-1 text-sm text-brand-red transition-colors hover:text-brand-red-dark"
                    >
                      <X className="h-3.5 w-3.5" />
                      {t.catalog.clear_filters}
                    </button>
                  </div>
                )}

                {/* Categories */}
                <div>
                  <h3 className="font-[var(--font-heading)] text-sm font-semibold uppercase tracking-wider text-brand-black">
                    {t.catalog.all_categories}
                  </h3>
                  <ul className="mt-3 space-y-1">
                    {categories.map((cat) => (
                      <li key={cat.id}>
                        <button
                          onClick={() =>
                            setSelectedCategory(selectedCategory === cat.slug ? null : cat.slug)
                          }
                          className={cn(
                            "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
                            selectedCategory === cat.slug
                              ? "bg-brand-red/10 text-brand-red font-medium"
                              : "text-brand-gray-dark hover:bg-brand-cream hover:text-brand-black"
                          )}
                        >
                          <span>{cat.name}</span>
                          <span className="text-xs">({cat.productCount})</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price range */}
                <div>
                  <h3 className="font-[var(--font-heading)] text-sm font-semibold uppercase tracking-wider text-brand-black">
                    {t.catalog.price_range} (€/m²)
                  </h3>
                  <div className="mt-3 space-y-3">
                    <input
                      type="range"
                      min={0}
                      max={MAX_PRICE}
                      step={0.5}
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], Number(e.target.value)])
                      }
                      className="w-full accent-brand-red"
                    />
                    <div className="flex items-center justify-between text-sm text-brand-gray-dark">
                      <span>{priceRange[0].toFixed(0)}€</span>
                      <span>hasta {priceRange[1].toFixed(0)}€</span>
                    </div>
                  </div>
                </div>
              </aside>

              {showMobileFilters && (
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="mt-4 inline-flex items-center gap-1 text-sm text-brand-gray-dark lg:hidden"
                >
                  <X className="h-3.5 w-3.5" />
                  Cerrar filtros
                </button>
              )}
            </div>

            {/* Product grid */}
            <div>
              {/* Sort bar */}
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-brand-gray-dark">
                  {filtered.length} {t.catalog.products}
                </p>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortOption)}
                  className="rounded-lg border border-brand-gray bg-white px-3 py-1.5 text-sm text-brand-black outline-none focus:border-brand-red"
                >
                  <option value="relevancia">Relevancia</option>
                  <option value="precio-asc">Precio: menor a mayor</option>
                  <option value="precio-desc">Precio: mayor a menor</option>
                  <option value="nombre">Nombre A-Z</option>
                </select>
              </div>

              {filtered.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {filtered.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center">
                  <p className="text-lg font-medium text-brand-black">
                    {t.catalog.no_results}
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                      setPriceRange([0, MAX_PRICE]);
                    }}
                    className="mt-4 text-sm font-medium text-brand-red transition-colors hover:text-brand-red-dark"
                  >
                    {t.catalog.clear_filters}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
