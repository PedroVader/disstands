import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Briefcase, MapPin, Clock, Send } from "lucide-react";

export const metadata = {
  title: "Empleo — Disstands",
  description: "Únete al equipo de Disstands. Consulta nuestras ofertas de empleo.",
};

const perks = [
  "Horario flexible y jornada intensiva en verano",
  "Formación continua y plan de carrera",
  "Equipo joven y dinámico en crecimiento",
  "Oficinas en Barberà del Vallès con parking",
  "Participación en eventos y ferias internacionales",
  "Ambiente de trabajo colaborativo",
];

const openings = [
  {
    title: "Instalador/a de Pavimentos",
    area: "Montajes",
    location: "Barcelona + desplazamientos",
    type: "Jornada completa",
    description:
      "Buscamos instalador/a con experiencia en pavimentos para ferias y eventos. Se valora carnet de conducir y disponibilidad para viajar.",
  },
  {
    title: "Comercial de Ventas B2B",
    area: "Ventas",
    location: "Barcelona",
    type: "Jornada completa",
    description:
      "Responsable de la captación y gestión de cuentas corporativas. Se requiere experiencia en venta consultiva y sector ferial o construcción.",
  },
  {
    title: "Auxiliar de Almacén",
    area: "Logística",
    location: "Barberà del Vallès",
    type: "Jornada completa",
    description:
      "Gestión de stock, preparación de pedidos y carga de material. Se requiere carnet de carretillero y experiencia previa en almacén.",
  },
];

export default function EmpleoPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-16">
        {/* Hero */}
        <section className="border-b border-brand-gray bg-brand-cream">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <p className="text-sm font-medium uppercase tracking-wider text-brand-red">Empleo</p>
            <h1 className="mt-4 font-[var(--font-heading)] text-4xl font-bold text-brand-black sm:text-5xl">
              Trabaja con nosotros
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-brand-gray-dark">
              Únete a un equipo apasionado por transformar espacios. Buscamos personas con ganas
              de crecer en un sector dinámico e internacional.
            </p>
          </div>
        </section>

        {/* Perks */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="font-[var(--font-heading)] text-2xl font-bold text-brand-black">
            ¿Por qué Disstands?
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {perks.map((perk) => (
              <div
                key={perk}
                className="flex items-start gap-3 rounded-lg border border-brand-gray p-4"
              >
                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-brand-red" />
                <p className="text-sm text-brand-black">{perk}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Openings */}
        <section className="border-t border-brand-gray bg-brand-cream">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <h2 className="font-[var(--font-heading)] text-2xl font-bold text-brand-black">
              Ofertas abiertas
            </h2>
            <p className="mt-2 text-sm text-brand-gray-dark">
              {openings.length} posiciones disponibles actualmente
            </p>

            <div className="mt-8 space-y-4">
              {openings.map((job) => (
                <div
                  key={job.title}
                  className="rounded-lg border border-brand-gray bg-white p-6 transition-shadow hover:shadow-md"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="font-[var(--font-heading)] text-lg font-semibold text-brand-black">
                        {job.title}
                      </h3>
                      <div className="mt-2 flex flex-wrap gap-3 text-sm text-brand-gray-dark">
                        <span className="flex items-center gap-1">
                          <Briefcase className="h-3.5 w-3.5" />
                          {job.area}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {job.type}
                        </span>
                      </div>
                      <p className="mt-3 text-sm text-brand-gray-dark">{job.description}</p>
                    </div>
                    <a
                      href={`mailto:rrhh@disstands.com?subject=Candidatura: ${encodeURIComponent(job.title)}`}
                      className="flex-shrink-0 inline-flex items-center gap-2 rounded-lg bg-brand-red px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-red-dark"
                    >
                      <Send className="h-4 w-4" />
                      Aplicar
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Spontaneous application */}
        <section className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 lg:px-8">
          <h2 className="font-[var(--font-heading)] text-xl font-bold text-brand-black">
            ¿No encuentras tu perfil?
          </h2>
          <p className="mt-2 text-sm text-brand-gray-dark">
            Envíanos tu candidatura espontánea y te tendremos en cuenta para futuras vacantes.
          </p>
          <a
            href="mailto:rrhh@disstands.com?subject=Candidatura espontánea"
            className="mt-6 inline-flex items-center gap-2 rounded-lg border border-brand-gray px-5 py-2.5 text-sm font-medium text-brand-black transition-colors hover:bg-brand-cream"
          >
            <Send className="h-4 w-4" />
            Enviar CV a rrhh@disstands.com
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}
