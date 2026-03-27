import Image from "next/image";
import { cn, safeImageUrl } from "@/lib/utils";
import { PortfolioItem } from "@/types";

interface PortfolioCardProps {
  item: PortfolioItem;
  className?: string;
}

export function PortfolioCard({ item, className }: PortfolioCardProps) {
  return (
    <div
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-lg",
        className
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={safeImageUrl(item.image)}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <h3 className="font-[var(--font-heading)] text-xl font-semibold text-white text-center px-4">
            {item.title}
          </h3>
          <p className="mt-1 text-sm text-white/70">{item.client} · {item.year}</p>
        </div>
      </div>
    </div>
  );
}
