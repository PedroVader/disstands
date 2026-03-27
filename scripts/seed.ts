/**
 * Seed script: inserts mock data (categories, products, blog posts, portfolio)
 * into Supabase.
 *
 * Usage:
 *   npx tsx scripts/seed.ts
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
 */

import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { resolve } from "path";

// Load .env.local
config({ path: resolve(__dirname, "../.env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL");
  process.exit(1);
}

// Use service role key if available (bypasses RLS), otherwise anon key
const supabase = createClient(supabaseUrl, serviceRoleKey || anonKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// ─── Import mock data ────────────────────────────────────────────────
// We use dynamic imports since the files use @/ alias
import { categories } from "../src/data/categories";
import { allProducts } from "../src/data/products";
import { blogPosts } from "../src/data/blog-posts";
import { portfolioItems } from "../src/data/portfolio";

async function seedCategories() {
  console.log(`\n📁 Seeding ${categories.length} categories...`);

  const rows = categories.map((c, i) => ({
    name: c.name,
    slug: c.slug,
    description: c.description,
    image_url: c.image,
    sort_order: i,
  }));

  const { data, error } = await supabase
    .from("categories")
    .upsert(rows, { onConflict: "slug" })
    .select("id, slug");

  if (error) {
    console.error("  ❌ Categories error:", error.message);
    return {};
  }

  console.log(`  ✓ ${data.length} categories upserted`);

  // Build slug → id map
  const slugToId: Record<string, string> = {};
  for (const row of data) {
    slugToId[row.slug] = row.id;
  }
  return slugToId;
}

async function seedProducts(categoryMap: Record<string, string>) {
  console.log(`\n📦 Seeding ${allProducts.length} products...`);

  let productCount = 0;
  let variantCount = 0;
  let imageCount = 0;

  // Process in batches of 20
  const BATCH = 20;
  for (let i = 0; i < allProducts.length; i += BATCH) {
    const batch = allProducts.slice(i, i + BATCH);

    const productRows = batch.map((p) => ({
      name: p.name,
      slug: p.slug,
      description: p.description,
      description_long: p.descriptionLong || null,
      category_id: categoryMap[p.categorySlug] || null,
      price_per_m2: p.priceFrom || null,
      min_m2: p.minM2 || 1,
      material: p.material || null,
      thickness: p.thickness || null,
      unit: p.unit || "m²",
      featured: p.featured || false,
      active: true,
      badge: p.badge || null,
    }));

    const { data: products, error } = await supabase
      .from("products")
      .upsert(productRows, { onConflict: "slug" })
      .select("id, slug");

    if (error) {
      console.error(`  ❌ Products batch ${i / BATCH + 1} error:`, error.message);
      continue;
    }

    productCount += products.length;

    // Build slug → product id map for this batch
    const slugToProductId: Record<string, string> = {};
    for (const p of products) {
      slugToProductId[p.slug] = p.id;
    }

    // Insert variants
    const variantRows: Array<Record<string, unknown>> = [];
    for (const p of batch) {
      const productId = slugToProductId[p.slug];
      if (!productId) continue;

      for (const v of p.variants) {
        variantRows.push({
          product_id: productId,
          color: v.color,
          color_hex: v.colorHex || null,
          sku: v.sku || null,
          image_url: v.image || null,
          stock_m2: v.stockM2 || 0,
        });
      }
    }

    if (variantRows.length > 0) {
      // Delete existing variants for these products first (upsert is complex with no unique key)
      const productIds = products.map((p) => p.id);
      await supabase
        .from("product_variants")
        .delete()
        .in("product_id", productIds);

      const { data: variants, error: vErr } = await supabase
        .from("product_variants")
        .insert(variantRows)
        .select("id");

      if (vErr) {
        console.error(`  ❌ Variants batch error:`, vErr.message);
      } else {
        variantCount += variants.length;
      }
    }

    // Insert images
    const imageRows: Array<Record<string, unknown>> = [];
    for (const p of batch) {
      const productId = slugToProductId[p.slug];
      if (!productId) continue;

      for (let idx = 0; idx < p.images.length; idx++) {
        imageRows.push({
          product_id: productId,
          url: p.images[idx],
          sort_order: idx,
        });
      }
    }

    if (imageRows.length > 0) {
      const productIds = products.map((p) => p.id);
      await supabase
        .from("product_images")
        .delete()
        .in("product_id", productIds);

      const { data: images, error: iErr } = await supabase
        .from("product_images")
        .insert(imageRows)
        .select("id");

      if (iErr) {
        console.error(`  ❌ Images batch error:`, iErr.message);
      } else {
        imageCount += images.length;
      }
    }
  }

  console.log(`  ✓ ${productCount} products, ${variantCount} variants, ${imageCount} images`);
}

async function seedBlogPosts() {
  console.log(`\n📝 Seeding ${blogPosts.length} blog posts...`);

  const rows = blogPosts.map((post) => ({
    title: post.title,
    slug: post.slug,
    content: `<p>${post.excerpt}</p><p>Contenido completo del artículo pendiente de importación.</p>`,
    excerpt: post.excerpt,
    cover_image: post.image,
    status: "publicado" as const,
    published_at: new Date(post.date).toISOString(),
  }));

  // Batch insert (Supabase limit ~1000)
  const { data, error } = await supabase
    .from("blog_posts")
    .upsert(rows, { onConflict: "slug" })
    .select("id");

  if (error) {
    console.error("  ❌ Blog posts error:", error.message);
    return;
  }

  console.log(`  ✓ ${data.length} blog posts upserted`);
}

async function seedPortfolio() {
  console.log(`\n🖼️  Seeding ${portfolioItems.length} portfolio items...`);

  const rows = portfolioItems.map((item) => ({
    title: item.title,
    slug: item.id, // use the id as slug since items don't have one
    client_name: item.client,
    year: item.year,
    cover_image: item.image,
    tags: [item.category],
    featured: true,
    status: "publicado" as const,
  }));

  const { data, error } = await supabase
    .from("portfolio_items")
    .upsert(rows, { onConflict: "slug" })
    .select("id");

  if (error) {
    console.error("  ❌ Portfolio error:", error.message);
    return;
  }

  console.log(`  ✓ ${data.length} portfolio items upserted`);
}

async function main() {
  console.log("🌱 Disstands Seed Script");
  console.log("========================");
  console.log(`URL: ${supabaseUrl}`);
  console.log(`Key: ${serviceRoleKey ? "service_role" : "anon"}`);

  const categoryMap = await seedCategories();
  await seedProducts(categoryMap);
  await seedBlogPosts();
  await seedPortfolio();

  console.log("\n✅ Seed complete!");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
