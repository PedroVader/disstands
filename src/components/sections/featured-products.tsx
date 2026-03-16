import { SectionWrapper } from "@/components/shared/section-wrapper";
import { SectionTitle } from "@/components/shared/section-title";
import { ProductCard } from "@/components/shared/product-card";
import { CtaButton } from "@/components/shared/cta-button";
import { featuredProducts } from "@/data/products";

export function FeaturedProducts() {
  return (
    <SectionWrapper background="white" id="productos">
      <SectionTitle
        title="Productos Destacados"
        subtitle="Los pavimentos más solicitados por nuestros clientes profesionales"
        colorScheme="light"
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="mt-12 text-center">
        <CtaButton variant="secondary" size="lg" href="#categorias">
          Ver catálogo completo
        </CtaButton>
      </div>
    </SectionWrapper>
  );
}
