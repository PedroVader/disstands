import { createServerSupabaseClient } from "./server";
import type { Category, Product, ProductVariant, ProductSpecification, ProductDocument, BlogPost, PortfolioItem } from "@/types";

// ─── Categories ──────────────────────────────────────────────────────

export async function getCategories(): Promise<Category[]> {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("categories")
    .select("id, name, slug, description, image_url, sort_order")
    .order("sort_order");

  if (error || !data) return [];

  // Get product counts per category
  const { data: counts } = await supabase
    .from("products")
    .select("category_id")
    .eq("active", true);

  const countMap: Record<string, number> = {};
  for (const row of counts || []) {
    countMap[row.category_id] = (countMap[row.category_id] || 0) + 1;
  }

  return data.map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    description: c.description || "",
    image: c.image_url || "",
    productCount: countMap[c.id] || 0,
  }));
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("categories")
    .select("id, name, slug, description, image_url")
    .eq("slug", slug)
    .single();

  if (error || !data) return null;

  const { count } = await supabase
    .from("products")
    .select("id", { count: "exact", head: true })
    .eq("category_id", data.id)
    .eq("active", true);

  return {
    id: data.id,
    name: data.name,
    slug: data.slug,
    description: data.description || "",
    image: data.image_url || "",
    productCount: count || 0,
  };
}

// ─── Products ────────────────────────────────────────────────────────

function mapProduct(
  row: Record<string, unknown>,
  variants: Record<string, unknown>[],
  images: Record<string, unknown>[],
  categoryName: string,
  categorySlug: string,
  specifications?: Record<string, unknown>[],
  documents?: Record<string, unknown>[],
): Product {
  return {
    id: row.id as string,
    name: row.name as string,
    slug: row.slug as string,
    category: categoryName,
    categorySlug,
    priceFrom: Number(row.price_per_m2) || 0,
    unit: (row.unit as string) || "m\u00B2",
    image: images[0]?.url as string || "",
    images: images.map((i) => i.url as string),
    badge: (row.badge as Product["badge"]) || undefined,
    description: (row.description as string) || "",
    descriptionLong: (row.description_long as string) || undefined,
    material: (row.material as string) || undefined,
    thickness: (row.thickness as string) || undefined,
    minM2: Number(row.min_m2) || 1,
    featured: row.featured as boolean,
    fichaTecnicaUrl: (row.ficha_tecnica_url as string) || undefined,
    variants: variants.map((v) => ({
      id: v.id as string,
      color: v.color as string,
      colorHex: (v.color_hex as string) || "",
      sku: (v.sku as string) || "",
      stockM2: Number(v.stock_m2) || 0,
      image: (v.image_url as string) || "",
    })),
    specifications: specifications
      ? [...specifications]
          .sort((a, b) => (Number(a.sort_order) || 0) - (Number(b.sort_order) || 0))
          .map((s) => ({
            id: s.id as string,
            label: s.label as string,
            value: s.value as string,
          }))
      : undefined,
    documents: documents
      ? [...documents]
          .sort((a, b) => (Number(a.sort_order) || 0) - (Number(b.sort_order) || 0))
          .map((d) => ({
            id: d.id as string,
            name: d.name as string,
            type: d.type as ProductDocument["type"],
            url: d.url as string,
            fileSize: d.file_size ? Number(d.file_size) : undefined,
          }))
      : undefined,
  };
}

export async function getProducts(opts?: {
  categorySlug?: string;
  featured?: boolean;
  limit?: number;
}): Promise<Product[]> {
  const supabase = await createServerSupabaseClient();

  let query = supabase
    .from("products")
    .select(`
      *,
      category:categories(name, slug),
      product_variants(id, color, color_hex, sku, image_url, stock_m2),
      product_images(url, sort_order)
    `)
    .eq("active", true)
    .order("created_at", { ascending: false });

  if (opts?.featured) {
    query = query.eq("featured", true);
  }

  if (opts?.limit) {
    query = query.limit(opts.limit);
  }

  const { data, error } = await query;

  if (error || !data) return [];

  let products = data
    .filter((row: Record<string, unknown>) => {
      if (!opts?.categorySlug) return true;
      const cat = row.category as { slug: string } | null;
      return cat?.slug === opts.categorySlug;
    })
    .map((row: Record<string, unknown>) => {
      const cat = row.category as { name: string; slug: string } | null;
      const variants = (row.product_variants as Record<string, unknown>[]) || [];
      const images = ((row.product_images as Record<string, unknown>[]) || []).sort(
        (a, b) => (Number(a.sort_order) || 0) - (Number(b.sort_order) || 0)
      );
      return mapProduct(row, variants, images, cat?.name || "", cat?.slug || "");
    });

  // If no images from product_images, use first variant image
  products = products.map((p) => {
    if (!p.image && p.variants.length > 0) {
      return { ...p, image: p.variants[0].image, images: [p.variants[0].image] };
    }
    return p;
  });

  return products;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      category:categories(name, slug),
      product_variants(id, color, color_hex, sku, image_url, stock_m2),
      product_images(url, sort_order),
      product_specifications(id, label, value, sort_order),
      product_documents(id, name, type, url, file_size, sort_order)
    `)
    .eq("slug", slug)
    .eq("active", true)
    .single();

  if (error || !data) return null;

  const row = data as Record<string, unknown>;
  const cat = row.category as { name: string; slug: string } | null;
  const variants = (row.product_variants as Record<string, unknown>[]) || [];
  const images = ((row.product_images as Record<string, unknown>[]) || []).sort(
    (a, b) => (Number(a.sort_order) || 0) - (Number(b.sort_order) || 0)
  );
  const specifications = (row.product_specifications as Record<string, unknown>[]) || [];
  const documents = (row.product_documents as Record<string, unknown>[]) || [];

  const product = mapProduct(row, variants, images, cat?.name || "", cat?.slug || "", specifications, documents);

  if (!product.image && product.variants.length > 0) {
    product.image = product.variants[0].image;
    product.images = [product.variants[0].image];
  }

  return product;
}

export async function getRelatedProducts(
  categorySlug: string,
  excludeId: string,
  limit = 4,
): Promise<Product[]> {
  const products = await getProducts({ categorySlug, limit: limit + 1 });
  return products.filter((p) => p.id !== excludeId).slice(0, limit);
}

// ─── Blog Posts ──────────────────────────────────────────────────────

function mapBlogPost(row: Record<string, unknown>): BlogPost {
  const publishedAt = row.published_at as string;
  return {
    id: row.id as string,
    title: row.title as string,
    slug: row.slug as string,
    excerpt: (row.excerpt as string) || "",
    category: ((row.tags as string[]) || [])[0] || "General",
    date: publishedAt ? new Date(publishedAt).toISOString().split("T")[0] : "",
    readTime: `${Math.max(3, Math.ceil(((row.content as string) || "").length / 1000))} min`,
    image: (row.cover_image as string) || "",
  };
}

export async function getBlogPosts(opts?: { limit?: number }): Promise<BlogPost[]> {
  const supabase = await createServerSupabaseClient();

  let query = supabase
    .from("blog_posts")
    .select("*")
    .eq("status", "publicado")
    .order("published_at", { ascending: false });

  if (opts?.limit) {
    query = query.limit(opts.limit);
  }

  const { data, error } = await query;
  if (error || !data) return [];

  return data.map((row) => mapBlogPost(row as Record<string, unknown>));
}

export async function getBlogPostBySlug(slug: string): Promise<{
  post: BlogPost;
  content: string;
} | null> {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "publicado")
    .single();

  if (error || !data) return null;

  const row = data as Record<string, unknown>;
  return {
    post: mapBlogPost(row),
    content: (row.content as string) || "",
  };
}

// ─── Portfolio ───────────────────────────────────────────────────────

export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("portfolio_items")
    .select("*")
    .eq("status", "publicado")
    .order("year", { ascending: false });

  if (error || !data) return [];

  return data.map((row) => ({
    id: (row as Record<string, unknown>).id as string,
    title: (row as Record<string, unknown>).title as string,
    client: ((row as Record<string, unknown>).client_name as string) || "",
    year: (row as Record<string, unknown>).year as number,
    image: ((row as Record<string, unknown>).cover_image as string) || "",
    category: (((row as Record<string, unknown>).tags as string[]) || [])[0] || "Ferias",
  }));
}
