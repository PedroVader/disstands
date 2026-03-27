"use client";

import { SectionWrapper } from "@/components/shared/section-wrapper";
import { SectionTitle } from "@/components/shared/section-title";
import { PortfolioCard } from "@/components/shared/portfolio-card";
import { portfolioItems as mockPortfolio } from "@/data/portfolio";
import { useTranslation } from "@/i18n";
import type { PortfolioItem } from "@/types";

interface Props {
  data?: PortfolioItem[];
}

export function PortfolioGallery({ data }: Props) {
  const { t } = useTranslation();
  const items = data && data.length > 0 ? data : mockPortfolio;

  return (
    <SectionWrapper background="cream" id="portfolio">
      <SectionTitle
        title={t.portfolio.title}
        subtitle={t.portfolio.subtitle}
        colorScheme="light"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <PortfolioCard key={item.id} item={item} />
        ))}
      </div>
    </SectionWrapper>
  );
}
