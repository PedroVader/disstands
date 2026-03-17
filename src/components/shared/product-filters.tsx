"use client";

import { categories } from "@/data/categories";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface ProductFiltersProps {
  selectedCategory: string | null;
  onCategoryChange: (slug: string | null) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  maxPrice: number;
}

export function ProductFilters({
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  maxPrice,
}: ProductFiltersProps) {
  const hasFilters = selectedCategory || priceRange[0] > 0 || priceRange[1] < maxPrice;

  return (
    <aside className="space-y-6">
      {/* Active filters */}
      {hasFilters && (
        <div>
          <button
            onClick={() => {
              onCategoryChange(null);
              onPriceRangeChange([0, maxPrice]);
            }}
            className="inline-flex items-center gap-1 text-sm text-brand-red transition-colors hover:text-brand-red-dark"
          >
            <X className="h-3.5 w-3.5" />
            Limpiar filtros
          </button>
        </div>
      )}

      {/* Categories */}
      <div>
        <h3 className="font-[var(--font-heading)] text-sm font-semibold uppercase tracking-wider text-brand-black">
          Categorías
        </h3>
        <ul className="mt-3 space-y-1">
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() =>
                  onCategoryChange(selectedCategory === cat.slug ? null : cat.slug)
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
          Precio (€/m²)
        </h3>
        <div className="mt-3 space-y-3">
          <input
            type="range"
            min={0}
            max={maxPrice}
            step={0.5}
            value={priceRange[1]}
            onChange={(e) =>
              onPriceRangeChange([priceRange[0], Number(e.target.value)])
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
  );
}
