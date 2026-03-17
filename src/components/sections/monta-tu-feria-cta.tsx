import Image from "next/image";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { CtaButton } from "@/components/shared/cta-button";
import { Sparkles } from "lucide-react";

export function MontaTuFeriaCta() {
  return (
    <SectionWrapper background="cream" className="overflow-hidden">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Text */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-red/10 px-4 py-1.5 text-sm font-medium text-brand-red">
            <Sparkles className="h-4 w-4" />
            Nuevo — Configurador IA
          </div>
          <h2 className="mt-6 font-[var(--font-heading)] text-3xl font-bold text-brand-black sm:text-4xl lg:text-5xl">
            Monta tu Feria
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-brand-gray-dark">
            Configura tu stand en minutos con nuestro asistente inteligente.
            Selecciona superficie, tipo de evento y presupuesto, y recibe una
            propuesta personalizada con los mejores pavimentos.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "Cálculo automático de material necesario",
              "Propuesta de colores y acabados",
              "Presupuesto instantáneo sin compromiso",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 text-sm text-brand-gray-dark"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-red text-[10px] text-white">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <CtaButton variant="primary" size="lg" href="#contacto">
              Probar Configurador
            </CtaButton>
          </div>
        </div>

        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
          <Image
            src="https://placehold.co/800x600/E5E5E5/6B6B6B?text=Configurador+IA"
            alt="Configurador de stands Disstands"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
