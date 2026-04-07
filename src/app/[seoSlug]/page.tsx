import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { getSeoLandingBySlug, getAllSeoLandingSlugs } from "@/data/seo-landings";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";

interface Props {
  params: Promise<{ seoSlug: string }>;
}

export async function generateStaticParams() {
  return getAllSeoLandingSlugs().map((slug) => ({ seoSlug: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { seoSlug } = await params;
  const landing = getSeoLandingBySlug(seoSlug);
  if (!landing) return {};

  return {
    title: landing.title,
    description: landing.description,
    openGraph: {
      title: landing.title,
      description: landing.description,
      type: "website",
      locale: "es_ES",
    },
    alternates: {
      canonical: `https://www.disstands.com/${landing.slug}`,
    },
  };
}

export default async function SeoLandingPage({ params }: Props) {
  const { seoSlug } = await params;
  const landing = getSeoLandingBySlug(seoSlug);

  if (!landing) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-16">
        {/* Hero */}
        <section className="bg-brand-black py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <p className="font-[var(--font-mono)] text-xs uppercase tracking-widest text-brand-red">
              {landing.category === "moquetas" && "Moquetas"}
              {landing.category === "cesped-artificial" && "Césped Artificial"}
              {landing.category === "suelo-pvc" && "Suelos PVC"}
              {landing.category === "general" && "Pavimentos"}
              {landing.city && ` — ${landing.city}`}
            </p>
            <h1 className="mt-4 font-[var(--font-heading)] text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              {landing.h1}
            </h1>
            <p className="mt-4 text-lg text-white/70">
              {landing.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-red px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-red-dark"
              >
                Solicitar presupuesto
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/catalogo"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Ver catálogo
              </Link>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div
              className="blog-article"
              dangerouslySetInnerHTML={{ __html: landing.content }}
            />
          </div>
        </section>

        {/* CTA Contact */}
        <section className="border-t border-brand-gray bg-brand-cream py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-[var(--font-heading)] text-2xl font-bold text-brand-black">
              ¿Necesitas un presupuesto?
            </h2>
            <p className="mt-2 text-brand-gray-dark">
              Contacta con nosotros y te asesoraremos sin compromiso.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <a
                href="tel:+34937297858"
                className="flex items-center gap-3 rounded-lg border border-brand-gray bg-white px-4 py-3 text-sm text-brand-black transition-colors hover:border-brand-red"
              >
                <Phone className="h-5 w-5 text-brand-red" />
                +34 937 29 78 58
              </a>
              <a
                href="mailto:info@disstands.com"
                className="flex items-center gap-3 rounded-lg border border-brand-gray bg-white px-4 py-3 text-sm text-brand-black transition-colors hover:border-brand-red"
              >
                <Mail className="h-5 w-5 text-brand-red" />
                info@disstands.com
              </a>
              <div className="flex items-center gap-3 rounded-lg border border-brand-gray bg-white px-4 py-3 text-sm text-brand-gray-dark">
                <MapPin className="h-5 w-5 text-brand-red" />
                Barcelona, España
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
