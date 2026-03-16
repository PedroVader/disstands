import { SectionWrapper } from "@/components/shared/section-wrapper";
import { SectionTitle } from "@/components/shared/section-title";
import { ServiceCard } from "@/components/shared/service-card";
import { services } from "@/data/services";

export function ServicesSection() {
  return (
    <SectionWrapper background="black" id="servicios">
      <SectionTitle
        title="Servicios"
        subtitle="Soluciones integrales adaptadas a cada tipo de proyecto"
        colorScheme="dark"
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </SectionWrapper>
  );
}
