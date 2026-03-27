import { getProductBySlug, getRelatedProducts } from "@/lib/supabase/queries";
import { allProducts } from "@/data/products";
import { ProductDetailClient } from "./product-detail-client";
import { notFound } from "next/navigation";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Try Supabase first, fallback to mock
  let product = await getProductBySlug(slug);
  let related = product
    ? await getRelatedProducts(product.categorySlug, product.id)
    : [];

  if (!product) {
    const mock = allProducts.find((p) => p.slug === slug);
    if (!mock) notFound();
    product = mock;
    related = allProducts
      .filter((p) => p.categorySlug === mock.categorySlug && p.id !== mock.id)
      .slice(0, 4);
  }

  return <ProductDetailClient product={product} related={related} />;
}
