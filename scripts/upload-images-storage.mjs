/**
 * Upload essential images to Supabase Storage
 *
 * Usage: node scripts/upload-images-storage.mjs
 *
 * Requires: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_SERVICE_KEY in .env.local
 */

import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import { config } from "dotenv";

config({ path: ".env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY,
);

const BUCKET = "images";
const PUBLIC_IMAGES = path.resolve("public/images");

// Mime types
const MIME = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".gif": "image/gif",
};

async function ensureBucket() {
  const { data: buckets } = await supabase.storage.listBuckets();
  const exists = buckets?.some((b) => b.name === BUCKET);
  if (!exists) {
    const { error } = await supabase.storage.createBucket(BUCKET, {
      public: true,
      allowedMimeTypes: Object.values(MIME),
      fileSizeLimit: 10 * 1024 * 1024, // 10MB
    });
    if (error) {
      console.error("Failed to create bucket:", error.message);
      process.exit(1);
    }
    console.log(`✓ Created bucket "${BUCKET}"`);
  } else {
    console.log(`✓ Bucket "${BUCKET}" exists`);
  }
}

async function uploadFile(localPath, storagePath) {
  const ext = path.extname(localPath).toLowerCase();
  const contentType = MIME[ext] || "application/octet-stream";
  const fileBuffer = fs.readFileSync(localPath);

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, fileBuffer, {
      contentType,
      upsert: true,
    });

  if (error) {
    console.error(`  ✗ ${storagePath}: ${error.message}`);
    return null;
  }

  const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(storagePath);
  console.log(`  ✓ ${storagePath}`);
  return urlData.publicUrl;
}

async function uploadDirectory(dir, prefix) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const results = {};

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const subResults = await uploadDirectory(fullPath, `${prefix}/${entry.name}`);
      Object.assign(results, subResults);
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (MIME[ext]) {
        const storagePath = `${prefix}/${entry.name}`;
        const url = await uploadFile(fullPath, storagePath);
        if (url) {
          const localRef = `/images${storagePath.replace(/^site/, "")}`;
          results[localRef] = url;
        }
      }
    }
  }

  return results;
}

async function main() {
  console.log("Uploading images to Supabase Storage...\n");

  await ensureBucket();

  // Upload each directory
  const folders = ["categories", "logos", "portfolio", "wizard"];
  const allMappings = {};

  // Upload logo
  console.log("\n📁 logo-disstands.png");
  const logoUrl = await uploadFile(
    path.join(PUBLIC_IMAGES, "logo-disstands.png"),
    "site/logo-disstands.png",
  );
  if (logoUrl) allMappings["/images/logo-disstands.png"] = logoUrl;

  for (const folder of folders) {
    const dirPath = path.join(PUBLIC_IMAGES, folder);
    if (!fs.existsSync(dirPath)) {
      console.log(`\n⚠ Skipping ${folder} (not found)`);
      continue;
    }
    console.log(`\n📁 ${folder}/`);
    const mappings = await uploadDirectory(dirPath, `site/${folder}`);
    Object.assign(allMappings, mappings);
  }

  // Write mapping file
  const mappingPath = path.resolve("scripts/image-url-mapping.json");
  fs.writeFileSync(mappingPath, JSON.stringify(allMappings, null, 2));
  console.log(`\n✅ Done! ${Object.keys(allMappings).length} images uploaded.`);
  console.log(`📄 URL mapping saved to: ${mappingPath}`);
}

main().catch(console.error);
