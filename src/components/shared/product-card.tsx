import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  className?: string;
}

const badgeColors: Record<string, string> = {
  Nuevo: "bg-brand-red text-white",
  Eco: "bg-green-600 text-white",
  Popular: "bg-brand-black text-white",
};

export function ProductCard({ product, className }: ProductCardProps) {
  return (
    <div
      className={cn(
        "group cursor-pointer overflow-hidden rounded-lg border border-brand-gray bg-white transition-shadow duration-300 hover:shadow-lg",
        className
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={product.image}
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
        <p className="mt-3 font-[var(--font-heading)] text-lg font-bold text-brand-red">
          Desde {product.priceFrom.toFixed(2).replace(".", ",")}€/{product.unit}
        </p>
      </div>
    </div>
  );
}
