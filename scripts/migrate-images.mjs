#!/usr/bin/env node
/**
 * Migrate images from WordPress to Supabase Storage
 *
 * Usage: node scripts/migrate-images.mjs
 *
 * What it does:
 * 1. Fetches all unique WP image URLs from product_images, product_variants, categories, blog_posts, portfolio_items
 * 2. Downloads each image
 * 3. Uploads to Supabase Storage bucket "media"
 * 4. Updates all URLs in the database
 */

import { createClient } from "@supabase/supabase-js";
import { Readable } from "stream";

// ─── Config ──────────────────────────────────────────────────────────
const SUPABASE_URL = "https://srwybogqbmfhfmxjzaem.supabase.co";
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNyd3lib2dxYm1maGZteGp6YWVtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mzc0OTYzMywiZXhwIjoyMDg5MzI1NjMzfQ.B2-NuwhYGimWtDpH9d_3x_Gh6CcX63bIKmDyZdIaDxg";
const BUCKET = "media";
const CONCURRENCY = 8;
const STORAGE_BASE = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}`;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// ─── Helpers ─────────────────────────────────────────────────────────
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function sanitizeFilename(url) {
  try {
    const pathname = new URL(url).pathname;
    // Get filename from path, remove "watermarked_" prefix
    let name = pathname.split("/").pop() || "unknown.png";
    name = name.replace(/^watermarked_/, "");
    // Clean special chars
    name = name.replace(/[^a-zA-Z0-9._-]/g, "_");
    return name;
  } catch {
    return "unknown_" + Date.now() + ".png";
  }
}

function getStoragePath(url, table) {
  const filename = sanitizeFilename(url);
  // Organize by folder: products/, categories/, blog/, portfolio/
  return `${table}/${filename}`;
}

async function downloadImage(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, {
        signal: AbortSignal.timeout(30000),
        headers: { "User-Agent": "Disstands-Migration/1.0" }
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buffer = Buffer.from(await res.arrayBuffer());
      const contentType = res.headers.get("content-type") || "image/png";
      return { buffer, contentType };
    } catch (err) {
      if (i === retries - 1) throw err;
      await sleep(1000 * (i + 1));
    }
  }
}

async function uploadToStorage(path, buffer, contentType) {
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, buffer, {
      contentType,
      upsert: true,
    });
  if (error) throw error;
  return `${STORAGE_BASE}/${path}`;
}

// Run tasks with limited concurrency
async function parallelMap(items, fn, concurrency) {
  const results = [];
  let index = 0;

  async function worker() {
    while (index < items.length) {
      const i = index++;
      results[i] = await fn(items[i], i);
    }
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, () => worker()));
  return results;
}

// ─── Collect all URLs ────────────────────────────────────────────────
async function collectUrls() {
  const urlMap = new Map(); // oldUrl -> { table, storagePath }

  console.log("📦 Collecting image URLs from database...\n");

  // 1. product_images
  let offset = 0;
  const PAGE = 1000;
  let productImageCount = 0;
  while (true) {
    const { data } = await supabase
      .from("product_images")
      .select("url")
      .range(offset, offset + PAGE - 1);
    if (!data || data.length === 0) break;
    for (const row of data) {
      if (row.url && row.url.includes("disstands.com")) {
        if (!urlMap.has(row.url)) {
          urlMap.set(row.url, { table: "products", path: getStoragePath(row.url, "products") });
        }
        productImageCount++;
      }
    }
    offset += PAGE;
    if (data.length < PAGE) break;
  }
  console.log(`  product_images: ${productImageCount} references, ${[...urlMap.values()].filter(v => v.table === "products").length} unique`);

  // 2. product_variants (image field)
  offset = 0;
  let variantCount = 0;
  while (true) {
    const { data } = await supabase
      .from("product_variants")
      .select("image")
      .not("image", "is", null)
      .range(offset, offset + PAGE - 1);
    if (!data || data.length === 0) break;
    for (const row of data) {
      if (row.image && row.image.includes("disstands.com")) {
        if (!urlMap.has(row.image)) {
          urlMap.set(row.image, { table: "products", path: getStoragePath(row.image, "products") });
        }
        variantCount++;
      }
    }
    offset += PAGE;
    if (data.length < PAGE) break;
  }
  console.log(`  product_variants: ${variantCount} references`);

  // 3. categories (image_url)
  const { data: cats } = await supabase.from("categories").select("image_url");
  let catCount = 0;
  for (const row of (cats || [])) {
    if (row.image_url && row.image_url.includes("disstands.com")) {
      if (!urlMap.has(row.image_url)) {
        urlMap.set(row.image_url, { table: "categories", path: getStoragePath(row.image_url, "categories") });
      }
      catCount++;
    }
  }
  console.log(`  categories: ${catCount} references`);

  // 4. blog_posts (cover_image)
  const { data: blogs } = await supabase.from("blog_posts").select("cover_image");
  let blogCount = 0;
  for (const row of (blogs || [])) {
    if (row.cover_image && row.cover_image.includes("disstands.com")) {
      if (!urlMap.has(row.cover_image)) {
        urlMap.set(row.cover_image, { table: "blog", path: getStoragePath(row.cover_image, "blog") });
      }
      blogCount++;
    }
  }
  console.log(`  blog_posts: ${blogCount} references`);

  // 5. portfolio_items (cover_image)
  const { data: portfolio } = await supabase.from("portfolio_items").select("cover_image");
  let portfolioCount = 0;
  for (const row of (portfolio || [])) {
    if (row.cover_image && row.cover_image.includes("disstands.com")) {
      if (!urlMap.has(row.cover_image)) {
        urlMap.set(row.cover_image, { table: "portfolio", path: getStoragePath(row.cover_image, "portfolio") });
      }
      portfolioCount++;
    }
  }
  console.log(`  portfolio_items: ${portfolioCount} references`);

  console.log(`\n✅ Total unique images to migrate: ${urlMap.size}\n`);
  return urlMap;
}

// ─── Migrate images ──────────────────────────────────────────────────
async function migrateImages(urlMap) {
  const entries = [...urlMap.entries()];
  let success = 0;
  let failed = 0;
  const urlMapping = new Map(); // oldUrl -> newUrl

  console.log(`🚀 Starting migration of ${entries.length} images (concurrency: ${CONCURRENCY})...\n`);
  const startTime = Date.now();

  await parallelMap(entries, async ([oldUrl, { path }], i) => {
    try {
      const { buffer, contentType } = await downloadImage(oldUrl);
      const newUrl = await uploadToStorage(path, buffer, contentType);
      urlMapping.set(oldUrl, newUrl);
      success++;
      if (success % 50 === 0 || success === entries.length) {
        const elapsed = ((Date.now() - startTime) / 1000).toFixed(0);
        console.log(`  ✓ ${success}/${entries.length} uploaded (${elapsed}s)`);
      }
    } catch (err) {
      failed++;
      console.error(`  ✗ Failed: ${oldUrl.slice(-60)} — ${err.message}`);
    }
  }, CONCURRENCY);

  const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`\n📊 Upload complete: ${success} ok, ${failed} failed (${totalTime}s)\n`);
  return urlMapping;
}

// ─── Update database URLs ────────────────────────────────────────────
async function updateDatabase(urlMapping) {
  console.log("🔄 Updating database URLs...\n");
  let updated = 0;

  // 1. product_images
  let offset = 0;
  const PAGE = 500;
  while (true) {
    const { data } = await supabase
      .from("product_images")
      .select("id, url")
      .range(offset, offset + PAGE - 1);
    if (!data || data.length === 0) break;

    for (const row of data) {
      const newUrl = urlMapping.get(row.url);
      if (newUrl) {
        await supabase.from("product_images").update({ url: newUrl }).eq("id", row.id);
        updated++;
      }
    }
    offset += PAGE;
    if (data.length < PAGE) break;
  }
  console.log(`  product_images: ${updated} updated`);

  // 2. product_variants
  let varUpdated = 0;
  offset = 0;
  while (true) {
    const { data } = await supabase
      .from("product_variants")
      .select("id, image")
      .not("image", "is", null)
      .range(offset, offset + PAGE - 1);
    if (!data || data.length === 0) break;

    for (const row of data) {
      const newUrl = urlMapping.get(row.image);
      if (newUrl) {
        await supabase.from("product_variants").update({ image: newUrl }).eq("id", row.id);
        varUpdated++;
      }
    }
    offset += PAGE;
    if (data.length < PAGE) break;
  }
  console.log(`  product_variants: ${varUpdated} updated`);

  // 3. categories
  const { data: cats } = await supabase.from("categories").select("id, image_url");
  let catUpdated = 0;
  for (const row of (cats || [])) {
    const newUrl = urlMapping.get(row.image_url);
    if (newUrl) {
      await supabase.from("categories").update({ image_url: newUrl }).eq("id", row.id);
      catUpdated++;
    }
  }
  console.log(`  categories: ${catUpdated} updated`);

  // 4. blog_posts
  const { data: blogs } = await supabase.from("blog_posts").select("id, cover_image");
  let blogUpdated = 0;
  for (const row of (blogs || [])) {
    const newUrl = urlMapping.get(row.cover_image);
    if (newUrl) {
      await supabase.from("blog_posts").update({ cover_image: newUrl }).eq("id", row.id);
      blogUpdated++;
    }
  }
  console.log(`  blog_posts: ${blogUpdated} updated`);

  // 5. portfolio_items
  const { data: portfolio } = await supabase.from("portfolio_items").select("id, cover_image");
  let portfolioUpdated = 0;
  for (const row of (portfolio || [])) {
    const newUrl = urlMapping.get(row.cover_image);
    if (newUrl) {
      await supabase.from("portfolio_items").update({ cover_image: newUrl }).eq("id", row.id);
      portfolioUpdated++;
    }
  }
  console.log(`  portfolio_items: ${portfolioUpdated} updated`);

  console.log(`\n✅ Database updated!\n`);
}

// ─── Main ────────────────────────────────────────────────────────────
async function main() {
  console.log("═══════════════════════════════════════════════════");
  console.log("  Disstands Image Migration: WordPress → Supabase");
  console.log("═══════════════════════════════════════════════════\n");

  // Step 1: Collect URLs
  const urlMap = await collectUrls();

  if (urlMap.size === 0) {
    console.log("No images to migrate. Done!");
    return;
  }

  // Step 2: Download & upload
  const urlMapping = await migrateImages(urlMap);

  if (urlMapping.size === 0) {
    console.log("No images were uploaded successfully. Aborting database update.");
    return;
  }

  // Step 3: Update DB
  await updateDatabase(urlMapping);

  console.log("═══════════════════════════════════════════════════");
  console.log("  Migration complete! 🎉");
  console.log(`  ${urlMapping.size} images migrated to Supabase Storage`);
  console.log(`  Bucket: ${STORAGE_BASE}/`);
  console.log("═══════════════════════════════════════════════════\n");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
