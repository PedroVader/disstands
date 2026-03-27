#!/usr/bin/env node
/**
 * Update database URLs from WordPress → Supabase Storage
 *
 * The images are already uploaded to Supabase Storage by migrate-images.mjs.
 * This script just updates the database references.
 */

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://srwybogqbmfhfmxjzaem.supabase.co";
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNyd3lib2dxYm1maGZteGp6YWVtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mzc0OTYzMywiZXhwIjoyMDg5MzI1NjMzfQ.B2-NuwhYGimWtDpH9d_3x_Gh6CcX63bIKmDyZdIaDxg";
const BUCKET = "media";
const STORAGE_BASE = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}`;
const PAGE = 500;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

function sanitizeFilename(url) {
  try {
    const pathname = new URL(url).pathname;
    let name = pathname.split("/").pop() || "unknown.png";
    name = name.replace(/^watermarked_/, "");
    name = name.replace(/[^a-zA-Z0-9._-]/g, "_");
    return name;
  } catch {
    return "unknown_" + Date.now() + ".png";
  }
}

function getStoragePath(url, table) {
  return `${table}/${sanitizeFilename(url)}`;
}

function getNewUrl(oldUrl, table) {
  return `${STORAGE_BASE}/${getStoragePath(oldUrl, table)}`;
}

async function verifyFileExists(path) {
  const { data } = await supabase.storage.from(BUCKET).list(
    path.split("/").slice(0, -1).join("/"),
    { search: path.split("/").pop() }
  );
  return data && data.length > 0;
}

async function main() {
  console.log("═══════════════════════════════════════════════════");
  console.log("  Update Database URLs: WordPress → Supabase");
  console.log("═══════════════════════════════════════════════════\n");

  // Verify a sample file exists in storage first
  const samplePath = "products/" + sanitizeFilename("https://www.disstands.com/wp-content/uploads/2024/12/watermarked_test.png");
  console.log("Verifying storage bucket has files...");
  const { data: files } = await supabase.storage.from(BUCKET).list("products", { limit: 5 });
  console.log(`  Found ${files?.length || 0} files in products/ folder`);
  if (!files || files.length === 0) {
    console.error("ERROR: No files found in storage. Run migrate-images.mjs first.");
    process.exit(1);
  }
  console.log(`  Sample: ${files[0].name}\n`);

  // 1. product_images (no offset — filter shrinks as we update)
  console.log("🔄 Updating product_images...");
  let updated = 0;
  let skipped = 0;
  while (true) {
    const { data } = await supabase
      .from("product_images")
      .select("id, url")
      .like("url", "%disstands.com%")
      .limit(PAGE);
    if (!data || data.length === 0) break;

    for (const row of data) {
      const newUrl = getNewUrl(row.url, "products");
      const { error } = await supabase.from("product_images").update({ url: newUrl }).eq("id", row.id);
      if (error) {
        skipped++;
      } else {
        updated++;
      }
    }
    console.log(`  ... ${updated} updated`);
  }
  console.log(`  ✓ product_images: ${updated} updated, ${skipped} skipped\n`);

  // 2. product_variants
  console.log("🔄 Updating product_variants...");
  let varUpdated = 0;
  while (true) {
    const { data } = await supabase
      .from("product_variants")
      .select("id, image")
      .not("image", "is", null)
      .like("image", "%disstands.com%")
      .limit(PAGE);
    if (!data || data.length === 0) break;

    for (const row of data) {
      const newUrl = getNewUrl(row.image, "products");
      await supabase.from("product_variants").update({ image: newUrl }).eq("id", row.id);
      varUpdated++;
    }
    console.log(`  ... ${varUpdated} updated`);
  }
  console.log(`  ✓ product_variants: ${varUpdated} updated\n`);

  // 3. categories
  console.log("🔄 Updating categories...");
  const { data: cats } = await supabase.from("categories").select("id, image_url").like("image_url", "%disstands.com%");
  let catUpdated = 0;
  for (const row of (cats || [])) {
    const newUrl = getNewUrl(row.image_url, "categories");
    await supabase.from("categories").update({ image_url: newUrl }).eq("id", row.id);
    catUpdated++;
  }
  console.log(`  ✓ categories: ${catUpdated} updated\n`);

  // 4. blog_posts
  console.log("🔄 Updating blog_posts...");
  const { data: blogs } = await supabase.from("blog_posts").select("id, cover_image").like("cover_image", "%disstands.com%");
  let blogUpdated = 0;
  for (const row of (blogs || [])) {
    const newUrl = getNewUrl(row.cover_image, "blog");
    await supabase.from("blog_posts").update({ cover_image: newUrl }).eq("id", row.id);
    blogUpdated++;
  }
  console.log(`  ✓ blog_posts: ${blogUpdated} updated\n`);

  // 5. portfolio_items
  console.log("🔄 Updating portfolio_items...");
  const { data: portfolio } = await supabase.from("portfolio_items").select("id, cover_image").like("cover_image", "%disstands.com%");
  let portfolioUpdated = 0;
  for (const row of (portfolio || [])) {
    const newUrl = getNewUrl(row.cover_image, "portfolio");
    await supabase.from("portfolio_items").update({ cover_image: newUrl }).eq("id", row.id);
    portfolioUpdated++;
  }
  console.log(`  ✓ portfolio_items: ${portfolioUpdated} updated\n`);

  const total = updated + varUpdated + catUpdated + blogUpdated + portfolioUpdated;
  console.log("═══════════════════════════════════════════════════");
  console.log(`  ✅ Done! ${total} URLs updated to Supabase Storage`);
  console.log(`  Base URL: ${STORAGE_BASE}/`);
  console.log("═══════════════════════════════════════════════════\n");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
