import { MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/lib/constants";

export function CtaBanner() {
  return (
    <section id="contacto" className="bg-brand-red py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-[var(--font-heading)] text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
          ¿Listo para transformar tu espacio?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
          Cuéntanos tu proyecto y recibe un presupuesto personalizado en menos
          de 24 horas. Sin compromiso.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-white px-8 text-base font-medium text-brand-red transition-colors hover:bg-brand-cream"
          >
            <Phone className="h-5 w-5" />
            Contactar
          </a>
          <a
            href={`https://wa.me/${siteConfig.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white bg-transparent px-8 text-base font-medium text-white transition-colors hover:bg-white/10"
          >
            <MessageCircle className="h-5 w-5" />
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
