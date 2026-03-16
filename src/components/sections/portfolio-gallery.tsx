import { SectionWrapper } from "@/components/shared/section-wrapper";
import { SectionTitle } from "@/components/shared/section-title";
import { PortfolioCard } from "@/components/shared/portfolio-card";
import { portfolioItems } from "@/data/portfolio";

export function PortfolioGallery() {
  return (
    <SectionWrapper background="cream" id="portfolio">
      <SectionTitle
        title="Portfolio"
        subtitle="Proyectos que hablan por sí solos. Ferias, eventos y espacios en toda Europa."
        colorScheme="light"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {portfolioItems.map((item) => (
          <PortfolioCard key={item.id} item={item} />
        ))}
      </div>
    </SectionWrapper>
  );
}
