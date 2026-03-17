import Image from "next/image";
import { CtaButton } from "@/components/shared/cta-button";
import { ScrollIndicator } from "@/components/shared/scroll-indicator";

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background photo */}
      <Image
        src="/hero-bg.jpg"
        alt="Tejidos de colores Disstands"
        fill
        priority
        className="object-cover blur-sm scale-105"
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
        <div className="max-w-3xl text-center lg:text-left">
          <p className="font-[var(--font-mono)] text-sm uppercase tracking-widest text-brand-red">
            Desde 2001 · Barcelona
          </p>
          <h1 className="mt-4 font-[var(--font-heading)] text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Pavimentos que{" "}
            <span className="text-brand-red">transforman</span>{" "}
            espacios
          </h1>
          <p className="mt-6 mx-auto max-w-xl text-lg leading-relaxed text-white/70 sm:text-xl lg:mx-0">
            Especialistas en moquetas, césped artificial, PVC y losetas para
            ferias, eventos y espacios comerciales en toda Europa.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
            <CtaButton variant="primary" size="lg" href="#contacto">
              Solicitar Presupuesto
            </CtaButton>
            <CtaButton variant="ghost" size="lg" href="#categorias">
              Ver Catálogo
            </CtaButton>
          </div>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
