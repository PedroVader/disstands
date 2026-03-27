import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import {
  Award, Users, Globe, Calendar, MapPin, Phone, Mail,
  Truck, ShieldCheck, Ruler, Clock, CheckCircle,
} from "lucide-react";

export const metadata = {
  title: "Sobre Nosotros — Disstands",
  description:
    "Más de 23 años transformando espacios con pavimentos profesionales para ferias, eventos y espacios comerciales.",
};

const stats = [
  { icon: Calendar, value: "+23", label: "Años de experiencia" },
  { icon: Award, value: "+500", label: "Stands instalados" },
  { icon: Globe, value: "+15", label: "Países" },
  { icon: Users, value: "30+", label: "Profesionales" },
];

const values = [
  {
    icon: ShieldCheck,
    title: "Calidad garantizada",
    desc: "Trabajamos exclusivamente con fabricantes europeos certificados. Cada rollo, cada loseta, cada metro cuadrado cumple con los estándares más exigentes del sector.",
  },
  {
    icon: Clock,
    title: "Entrega en 24-48h",
    desc: "Stock permanente de más de 50 referencias en nuestro almacén. Cuando necesitas material, lo tienes mañana.",
  },
  {
    icon: Ruler,
    title: "Asesoramiento técnico",
    desc: "Nuestro equipo analiza cada proyecto para recomendar el pavimento ideal según el uso, el tráfico esperado y la estética deseada.",
  },
  {
    icon: Truck,
    title: "Servicio integral",
    desc: "Desde la selección del material hasta la instalación y recogida. Un solo interlocutor para todo el proceso.",
  },
];

const timeline = [
  {
    year: "2003",
    title: "Fundación",
    text: "Nace Disstands en Barberà del Vallès (Barcelona), especializándonos en moquetas para ferias y eventos.",
  },
  {
    year: "2008",
    title: "Primeras ferias internacionales",
    text: "Comenzamos a trabajar en el Mobile World Congress y Alimentaria, consolidando nuestra presencia en el sector ferial.",
  },
  {
    year: "2012",
    title: "Expansión del catálogo",
    text: "Incorporamos césped artificial, suelos PVC y losetas técnicas para cubrir todas las necesidades de pavimentación.",
  },
  {
    year: "2016",
    title: "Nuevo almacén logístico",
    text: "Apertura de un almacén de 2.000 m² en el Polígono Can Salvatella para garantizar stock inmediato.",
  },
  {
    year: "2020",
    title: "Digitalización",
    text: "Lanzamiento del ecommerce, sistema de gestión de pedidos y CRM interno para mejorar la experiencia del cliente.",
  },
  {
    year: "2024",
    title: "Hito: 50.000 m²",
    text: "Superamos los 50.000 m² instalados acumulados y consolidamos presencia en más de 15 países.",
  },
];

const clients = [
  "Mobile World Congress",
  "Fira Barcelona",
  "Desigual",
  "TV3",
  "Adidas",
  "ICE Barcelona",
  "IFEMA Madrid",
  "Alimentaria",
];

export default function SobreNosotrosPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-16">
        {/* Hero */}
        <section className="border-b border-brand-gray bg-brand-black">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <p className="text-sm font-medium uppercase tracking-wider text-brand-red">
              Sobre Disstands
            </p>
            <h1 className="mt-4 font-[var(--font-heading)] text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              Pavimentos que<br />transforman espacios
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-400">
              Desde 2003 somos el partner de referencia en pavimentos para ferias, eventos y
              espacios comerciales. Combinamos experiencia artesanal con logística de precisión
              para que cada metro cuadrado cuente.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contacto"
                className="rounded-lg bg-brand-red px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-red-dark"
              >
                Solicitar presupuesto
              </Link>
              <Link
                href="/catalogo"
                className="rounded-lg border border-white/20 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                Ver catálogo
              </Link>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-b border-brand-gray bg-brand-cream">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <stat.icon className="mx-auto h-7 w-7 text-brand-red" />
                  <p className="mt-3 font-[var(--font-heading)] text-3xl font-bold text-brand-black sm:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-brand-gray-dark">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values / What sets us apart */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-[var(--font-heading)] text-2xl font-bold text-brand-black sm:text-3xl">
              Por qué elegirnos
            </h2>
            <p className="mt-3 mx-auto max-w-2xl text-brand-gray-dark">
              Más de dos décadas perfeccionando cada detalle para que tú te centres en lo importante.
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {values.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-brand-gray bg-white p-6 transition-all hover:border-brand-red hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-red/10">
                  <item.icon className="h-5 w-5 text-brand-red" />
                </div>
                <h3 className="mt-4 font-[var(--font-heading)] text-lg font-bold text-brand-black">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-gray-dark">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mission + What we do */}
        <section className="border-y border-brand-gray bg-brand-cream">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <h2 className="font-[var(--font-heading)] text-2xl font-bold text-brand-black">
                  Nuestra misión
                </h2>
                <p className="mt-4 text-brand-gray-dark leading-relaxed">
                  Proporcionar pavimentos de máxima calidad y un servicio integral —desde el
                  asesoramiento hasta la instalación— que permita a nuestros clientes crear espacios
                  memorables en ferias, eventos y entornos comerciales.
                </p>
                <p className="mt-4 text-brand-gray-dark leading-relaxed">
                  Creemos que el suelo es el primer punto de contacto en cualquier espacio.
                  Un pavimento bien elegido no solo transmite profesionalidad, sino que refuerza
                  la identidad de marca y mejora la experiencia del visitante.
                </p>
              </div>
              <div>
                <h2 className="font-[var(--font-heading)] text-2xl font-bold text-brand-black">
                  Qué hacemos
                </h2>
                <ul className="mt-4 space-y-3">
                  {[
                    "Moquetas de alta gama para ferias y eventos",
                    "Césped artificial para stands y espacios exteriores",
                    "Suelos PVC para uso comercial e industrial",
                    "Losetas técnicas desmontables",
                    "Adhesivos y accesorios de instalación",
                    "Servicio completo de montaje y desmontaje",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-red" />
                      <span className="text-sm text-brand-gray-dark">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <h2 className="text-center font-[var(--font-heading)] text-2xl font-bold text-brand-black sm:text-3xl">
            Nuestra historia
          </h2>
          <p className="mt-3 text-center text-brand-gray-dark">
            Más de 20 años creciendo junto a nuestros clientes.
          </p>

          <div className="mt-12 relative">
            {/* Center line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-brand-gray sm:left-1/2 sm:-translate-x-px" />

            <div className="space-y-10">
              {timeline.map((item, i) => (
                <div
                  key={item.year}
                  className={`relative flex gap-6 sm:gap-0 ${
                    i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-brand-red bg-white z-10">
                    <span className="h-2.5 w-2.5 rounded-full bg-brand-red" />
                  </div>

                  {/* Content */}
                  <div className={`ml-14 sm:ml-0 sm:w-1/2 ${i % 2 === 0 ? "sm:pr-12" : "sm:pl-12"}`}>
                    <div className="rounded-lg border border-brand-gray bg-white p-5 transition-all hover:shadow-md">
                      <span className="font-[var(--font-heading)] text-sm font-bold text-brand-red">
                        {item.year}
                      </span>
                      <h3 className="mt-1 font-medium text-brand-black">{item.title}</h3>
                      <p className="mt-1 text-sm text-brand-gray-dark">{item.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trusted by */}
        <section className="border-y border-brand-gray bg-brand-cream">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <h2 className="text-center font-[var(--font-heading)] text-xl font-bold text-brand-black">
              Confían en nosotros
            </h2>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
              {clients.map((client) => (
                <span
                  key={client}
                  className="rounded-full border border-brand-gray bg-white px-4 py-2 text-sm font-medium text-brand-gray-dark"
                >
                  {client}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Contact / Location */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="font-[var(--font-heading)] text-2xl font-bold text-brand-black">
                Dónde estamos
              </h2>
              <p className="mt-3 text-brand-gray-dark">
                Nuestra oficina principal está ubicada en Barberà del Vallès, Barcelona,
                con acceso directo a las principales infraestructuras feriales de Cataluña y España.
              </p>
              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-red" />
                  <div>
                    <p className="font-medium text-brand-black">Oficina principal</p>
                    <p className="text-sm text-brand-gray-dark">
                      Barberà del Vallès, Barcelona
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-red" />
                  <div>
                    <a href="tel:+34937297858" className="font-medium text-brand-black hover:text-brand-red">
                      +34 937 29 78 58
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-red" />
                  <div>
                    <a href="mailto:ventas@disstands.com" className="font-medium text-brand-black hover:text-brand-red">
                      ventas@disstands.com
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <a
                  href="https://maps.app.goo.gl/osm6xkovCLkeeDJp9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-brand-black px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
                >
                  <MapPin className="h-4 w-4" />
                  Ver en Google Maps
                </a>
              </div>
            </div>
            <div className="overflow-hidden rounded-xl border border-brand-gray">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2988.234!2d2.1226!3d41.5131!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4966b3b97e5d7%3A0x2b8b2c5c8e5f5a0a!2sBarbera%20del%20Valles%2C%20Barcelona!5e0!3m2!1ses!2ses!4v1"
                className="h-full min-h-[300px] w-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-brand-red">
          <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
            <h2 className="font-[var(--font-heading)] text-2xl font-bold text-white sm:text-3xl">
              ¿Tienes un proyecto en mente?
            </h2>
            <p className="mt-3 text-white/80">
              Cuéntanos qué necesitas y te asesoramos sin compromiso.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/contacto"
                className="rounded-lg bg-white px-6 py-3 text-sm font-medium text-brand-red transition-colors hover:bg-brand-cream"
              >
                Contactar
              </Link>
              <Link
                href="/catalogo"
                className="rounded-lg border border-white/30 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                Ver catálogo
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
