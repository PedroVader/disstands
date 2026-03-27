"use client";

import { SectionWrapper } from "@/components/shared/section-wrapper";
import { SectionTitle } from "@/components/shared/section-title";
import { CategoryCard } from "@/components/shared/category-card";
import { categories as mockCategories } from "@/data/categories";
import { useTranslation } from "@/i18n";
import type { Category } from "@/types";

interface Props {
  data?: Category[];
}

export function CategoryNavigation({ data }: Props) {
  const { t } = useTranslation();
  const categories = data && data.length > 0 ? data : mockCategories;

  return (
    <SectionWrapper background="cream" id="categorias">
      <SectionTitle
        title={t.categories.title}
        subtitle={t.categories.subtitle}
        colorScheme="light"
      />
      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </SectionWrapper>
  );
}
