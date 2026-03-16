import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { BlogPost } from "@/types";

interface BlogCardProps {
  post: BlogPost;
  className?: string;
}

export function BlogCard({ post, className }: BlogCardProps) {
  return (
    <article
      className={cn(
        "group cursor-pointer overflow-hidden rounded-lg border border-brand-gray bg-white transition-shadow duration-300 hover:shadow-lg",
        className
      )}
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <Badge className="absolute top-3 left-3 border-0 bg-brand-red text-white text-xs">
          {post.category}
        </Badge>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-3 text-xs text-brand-gray-dark">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("es-ES", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
          <span>·</span>
          <span>{post.readTime}</span>
        </div>
        <h3 className="mt-2 font-[var(--font-heading)] text-lg font-semibold text-brand-black transition-colors group-hover:text-brand-red">
          {post.title}
        </h3>
        <p className="mt-2 text-sm text-brand-gray-dark line-clamp-2">
          {post.excerpt}
        </p>
      </div>
    </article>
  );
}
