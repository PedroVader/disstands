import { SectionWrapper } from "@/components/shared/section-wrapper";
import { SectionTitle } from "@/components/shared/section-title";
import { CategoryCard } from "@/components/shared/category-card";
import { categories } from "@/data/categories";

export function CategoryNavigation() {
  return (
    <SectionWrapper background="cream" id="categorias">
      <SectionTitle
        title="Nuestro Catálogo"
        subtitle="Encuentra el pavimento perfecto para tu proyecto. Más de 200 referencias en stock permanente."
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
