"use client";

import { SectionWrapper } from "@/components/shared/section-wrapper";
import { SectionTitle } from "@/components/shared/section-title";
import { ServiceCard } from "@/components/shared/service-card";
import { services } from "@/data/services";
import { useTranslation } from "@/i18n";

export function ServicesSection() {
  const { t } = useTranslation();

  return (
    <SectionWrapper background="white" id="servicios">
      <SectionTitle
        title={t.services.title}
        subtitle={t.services.subtitle}
        colorScheme="light"
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </SectionWrapper>
  );
}
