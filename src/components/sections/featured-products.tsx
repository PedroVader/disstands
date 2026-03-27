"use client";

import { SectionWrapper } from "@/components/shared/section-wrapper";
import { SectionTitle } from "@/components/shared/section-title";
import { ProductCard } from "@/components/shared/product-card";
import { CtaButton } from "@/components/shared/cta-button";
import { featuredProducts as mockFeatured } from "@/data/products";
import { useTranslation } from "@/i18n";
import type { Product } from "@/types";

interface Props {
  data?: Product[];
}

export function FeaturedProducts({ data }: Props) {
  const { t } = useTranslation();
  const products = data && data.length > 0 ? data : mockFeatured;

  return (
    <SectionWrapper background="white" id="productos">
      <SectionTitle
        title={t.products.title}
        subtitle={t.products.subtitle}
        colorScheme="light"
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="mt-12 text-center">
        <CtaButton variant="secondary" size="lg" href="#categorias">
          {t.products.cta}
        </CtaButton>
      </div>
    </SectionWrapper>
  );
}
