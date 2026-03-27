import { getProducts, getCategories } from "@/lib/supabase/queries";
import { allProducts as mockProducts } from "@/data/products";
import { CatalogoClient } from "./catalogo-client";

export default async function CatalogoPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <CatalogoClient
      products={products.length > 0 ? products : mockProducts}
      categories={categories}
    />
  );
}
