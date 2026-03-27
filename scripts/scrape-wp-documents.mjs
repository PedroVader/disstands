#!/usr/bin/env node
/**
 * Scrape PDF documents from WordPress product pages
 *
 * Usage:
 *   node scripts/scrape-wp-documents.mjs              # Save WP URLs directly
 *   node scripts/scrape-wp-documents.mjs --download   # Download PDFs to Supabase Storage
 *
 * What it does:
 * 1. Fetches all products from Supabase
 * 2. Scrapes each product's WordPress page for PDF links
 * 3. Inserts found documents into product_documents table
 * 4. Optionally downloads PDFs to Supabase Storage bucket "media"
 */

import { createClient } from "@supabase/supabase-js";

// ─── Config ──────────────────────────────────────────────────────────
const SUPABASE_URL = "https://srwybogqbmfhfmxjzaem.supabase.co";
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNyd3lib2dxYm1maGZteGp6YWVtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mzc0OTYzMywiZXhwIjoyMDg5MzI1NjMzfQ.B2-NuwhYGimWtDpH9d_3x_Gh6CcX63bIKmDyZdIaDxg";
const BUCKET = "media";
const WP_BASE = "https://www.disstands.com/producto";
const CONCURRENCY = 8;
const STORAGE_BASE = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}`;
const DOWNLOAD = process.argv.includes("--download");

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// ─── Helpers ─────────────────────────────────────────────────────────
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function pdfFilenameToName(filename) {
  // "FICHA-TECNICA-MOQUETA-LAS-VEGAS.pdf" → "Ficha Tecnica Moqueta Las Vegas"
  return filename
    .replace(/\.pdf$/i, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

async function fetchPage(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, {
        signal: AbortSignal.timeout(15000),
        headers: { "User-Agent": "Disstands-Scraper/1.0" },
      });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.text();
    } catch (err) {
      if (i === retries - 1) throw err;
      await sleep(1000 * (i + 1));
    }
  }
}

function extractPdfUrls(html) {
  // Match href attributes pointing to PDF files on disstands.com
  const regex = /href="(https?:\/\/[^"]*disstands\.com[^"]*\.pdf)"/gi;
  const urls = new Set();
  let match;
  while ((match = regex.exec(html)) !== null) {
    urls.add(match[1]);
  }
  return [...urls];
}

async function downloadPdf(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, {
        signal: AbortSignal.timeout(60000),
        headers: { "User-Agent": "Disstands-Scraper/1.0" },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buffer = Buffer.from(await res.arrayBuffer());
      return { buffer, size: buffer.length };
    } catch (err) {
      if (i === retries - 1) throw err;
      await sleep(1000 * (i + 1));
    }
  }
}

async function uploadToStorage(path, buffer) {
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, buffer, {
      contentType: "application/pdf",
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

// ─── Main ────────────────────────────────────────────────────────────
async function main() {
  console.log("═══════════════════════════════════════════════════");
  console.log("  Disstands WP Document Scraper");
  console.log(`  Mode: ${DOWNLOAD ? "Download to Supabase Storage" : "Save WP URLs directly"}`);
  console.log("═══════════════════════════════════════════════════\n");

  // 1. Get all products
  console.log("📦 Fetching products from Supabase...\n");
  const { data: products, error } = await supabase
    .from("products")
    .select("id, slug, name")
    .order("name");

  if (error || !products) {
    console.error("Error fetching products:", error?.message);
    process.exit(1);
  }

  console.log(`  Found ${products.length} products\n`);

  // 2. Scrape each product page
  console.log(`🔍 Scraping WordPress pages (concurrency: ${CONCURRENCY})...\n`);
  let totalDocs = 0;
  let totalProducts = 0;
  let skipped = 0;
  const startTime = Date.now();

  await parallelMap(products, async (product, i) => {
    const wpUrl = `${WP_BASE}/${product.slug}/`;
    try {
      const html = await fetchPage(wpUrl);
      if (!html) {
        skipped++;
        return;
      }

      const pdfUrls = extractPdfUrls(html);
      if (pdfUrls.length === 0) return;

      totalProducts++;

      for (let j = 0; j < pdfUrls.length; j++) {
        const pdfUrl = pdfUrls[j];
        const filename = new URL(pdfUrl).pathname.split("/").pop() || "document.pdf";
        const docName = pdfFilenameToName(filename);

        let finalUrl = pdfUrl;
        let fileSize = null;

        if (DOWNLOAD) {
          try {
            const { buffer, size } = await downloadPdf(pdfUrl);
            const storagePath = `documents/${product.slug}/${filename}`;
            finalUrl = await uploadToStorage(storagePath, buffer);
            fileSize = size;
          } catch (err) {
            console.error(`  ✗ Download failed: ${filename} — ${err.message}`);
            // Fall back to WP URL
          }
        }

        const { error: insertError } = await supabase
          .from("product_documents")
          .insert({
            product_id: product.id,
            name: docName,
            type: "ficha_tecnica",
            url: finalUrl,
            file_size: fileSize,
            sort_order: j,
          });

        if (insertError) {
          console.error(`  ✗ Insert failed for ${product.slug}: ${insertError.message}`);
        } else {
          totalDocs++;
        }
      }

      if ((i + 1) % 20 === 0) {
        const elapsed = ((Date.now() - startTime) / 1000).toFixed(0);
        console.log(`  Processed ${i + 1}/${products.length} products (${elapsed}s)`);
      }
    } catch (err) {
      console.error(`  ✗ Error scraping ${product.slug}: ${err.message}`);
    }
  }, CONCURRENCY);

  const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);

  console.log("\n═══════════════════════════════════════════════════");
  console.log("  Scraping complete!");
  console.log(`  Products with docs: ${totalProducts}`);
  console.log(`  Documents inserted: ${totalDocs}`);
  console.log(`  Products not found on WP: ${skipped}`);
  console.log(`  Time: ${totalTime}s`);
  console.log("═══════════════════════════════════════════════════\n");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
