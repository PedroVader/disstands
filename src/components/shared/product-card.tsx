"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn, safeImageUrl } from "@/lib/utils";
import { Product } from "@/types";
import { useTranslation } from "@/i18n";

interface ProductCardProps {
  product: Product;
  className?: string;
}

const badgeColors: Record<string, string> = {
  Nuevo: "bg-brand-red text-white",
  Eco: "bg-green-600 text-white",
  Popular: "bg-brand-black text-white",
  "Única en el Mundo": "bg-amber-500 text-white",
};

export function ProductCard({ product, className }: ProductCardProps) {
  const { t } = useTranslation();

  return (
    <Link
      href={`/catalogo/${product.slug}`}
      className={cn(
        "group block cursor-pointer overflow-hidden rounded-lg border border-brand-gray bg-white transition-shadow duration-300 hover:shadow-lg",
        className
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={safeImageUrl(product.image)}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <Badge
            className={cn(
              "absolute top-3 left-3 border-0 text-xs font-medium",
              badgeColors[product.badge]
            )}
          >
            {product.badge}
          </Badge>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-brand-gray-dark">
          {product.category}
        </p>
        <h3 className="mt-1 font-[var(--font-heading)] text-lg font-semibold text-brand-black">
          {product.name}
        </h3>
        <p className="mt-2 text-sm text-brand-gray-dark line-clamp-2">
          {product.description}
        </p>
        <div className="mt-3 flex items-center justify-between">
          {product.priceFrom > 0 ? (
            <p className="font-[var(--font-heading)] text-lg font-bold text-brand-red">
              {t.products.from} {product.priceFrom.toFixed(2).replace(".", ",")}€/{product.unit}
            </p>
          ) : (
            <p className="text-sm font-medium text-brand-gray-dark">
              Consultar precio en{" "}
              <span className="text-brand-red">ventas@disstands.com</span>
            </p>
          )}
          {product.variants.length > 1 && (
            <div className="flex -space-x-1">
              {product.variants.slice(0, 4).map((v) => (
                <span
                  key={v.id}
                  className="inline-block h-4 w-4 overflow-hidden rounded-full border-2 border-white bg-brand-cream"
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
              {product.variants.length > 4 && (
                <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-brand-cream text-[8px] font-bold text-brand-gray-dark">
                  +{product.variants.length - 4}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
