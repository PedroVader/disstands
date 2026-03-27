import Image from "next/image";
import { cn, safeImageUrl } from "@/lib/utils";
import { Category } from "@/types";

interface CategoryCardProps {
  category: Category;
  className?: string;
}

export function CategoryCard({ category, className }: CategoryCardProps) {
  return (
    <a
      href={`/catalogo?categoria=${category.slug}`}
      className={cn(
        "group relative block overflow-hidden rounded-lg transition-shadow duration-300 hover:shadow-xl",
        className
      )}
    >
      <div className="relative aspect-[3/2] overflow-hidden">
        <Image
          src={safeImageUrl(category.image)}
          alt={category.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 p-5">
          <h3 className="font-[var(--font-heading)] text-xl font-semibold text-white">
            {category.name}
          </h3>
          <p className="mt-1 text-sm text-white/70">
            {category.productCount} productos
          </p>
        </div>
      </div>
    </a>
  );
}
