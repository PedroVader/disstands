import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import {
  getSeoLandingBySlug,
  getAllSeoLandingSlugs,
  type FaqItem,
} from "@/data/seo-landings";
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ShoppingBag,
  Truck,
  ShieldCheck,
  Clock,
} from "lucide-react";

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

const CATEGORY_LABELS: Record<string, string> = {
  moquetas: "Moquetas",
  "cesped-artificial": "Césped Artificial",
  "suelo-pvc": "Suelos PVC",
  general: "Pavimentos",
};

const TRUST_ICONS = [
  { icon: Truck, text: "Envío a toda España" },
  { icon: ShieldCheck, text: "Garantía profesional" },
  { icon: Clock, text: "Entrega urgente disponible" },
  { icon: ShoppingBag, text: "Presupuesto sin compromiso" },
];

function FaqSection({ faqs }: { faqs: FaqItem[] }) {
  return (
    <section className="border-t border-brand-gray bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-[var(--font-heading)] text-2xl font-bold text-brand-black sm:text-3xl">
          Preguntas frecuentes
        </h2>
        <div className="mt-8 space-y-4">
          {faqs.map((faq, i) => (
            <details
              key={i}
              open
              className="group rounded-xl border border-brand-gray bg-brand-cream/50 transition-colors open:bg-brand-cream"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 text-sm font-semibold text-brand-black sm:text-base">
                {faq.question}
                <ChevronDown className="h-5 w-5 shrink-0 text-brand-gray-dark transition-transform group-open:rotate-180" />
              </summary>
              <div className="px-5 pb-4 text-sm leading-relaxed text-brand-gray-dark">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default async function SeoLandingPage({ params }: Props) {
  const { seoSlug } = await params;
  const landing = getSeoLandingBySlug(seoSlug);

  if (!landing) {
    notFound();
  }

  const categoryLabel = CATEGORY_LABELS[landing.category] || "Pavimentos";
  const defaultStats = [
    { value: "23+", label: "Años de experiencia" },
    { value: "500+", label: "Proyectos realizados" },
    { value: "60+", label: "Colores disponibles" },
    { value: "48h", label: "Entrega urgente" },
  ];
  const stats = landing.stats?.length ? landing.stats : defaultStats;

  const faqJsonLd = landing.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: landing.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }
    : null;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-16">
        {/* Schema.org FAQ */}
        {faqJsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          />
        )}

        {/* Hero */}
        <section className="relative bg-brand-black py-16 sm:py-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(227,6,19,0.08),transparent_60%)]" />
          <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="font-[var(--font-mono)] text-xs uppercase tracking-widest text-brand-red">
                {categoryLabel}
                {landing.city && ` — ${landing.city}`}
              </p>
              <h1 className="mt-4 font-[var(--font-heading)] text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                {landing.h1}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70 sm:text-xl">
                {landing.description}
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contacto"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-red px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-red-dark"
                >
                  Solicitar presupuesto gratis
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/catalogo"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Ver catálogo completo
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Trust bar */}
        <section className="border-b border-brand-gray bg-brand-cream">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-4 py-5 sm:grid-cols-4">
              {TRUST_ICONS.map((item, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <item.icon className="h-5 w-5 shrink-0 text-brand-red" />
                  <span className="text-xs font-medium text-brand-black sm:text-sm">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-brand-dark py-10">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="font-[var(--font-heading)] text-3xl font-bold text-brand-red sm:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-white/60 sm:text-sm">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main content */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-3">
              {/* Article */}
              <div className="lg:col-span-2">
                <div
                  className="blog-article"
                  dangerouslySetInnerHTML={{ __html: landing.content }}
                />
              </div>

              {/* Sidebar */}
              <aside className="space-y-6">
                {/* Advantages */}
                {landing.advantages && landing.advantages.length > 0 && (
                  <div className="rounded-xl border border-brand-gray bg-brand-cream/50 p-5">
                    <h3 className="font-[var(--font-heading)] text-sm font-bold uppercase tracking-wide text-brand-black">
                      ¿Por qué Disstands?
                    </h3>
                    <ul className="mt-4 space-y-3">
                      {landing.advantages.map((adv, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
                          <span className="text-sm text-brand-gray-dark">
                            {adv}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Related products */}
                {landing.relatedProducts &&
                  landing.relatedProducts.length > 0 && (
                    <div className="rounded-xl border border-brand-gray bg-white p-5">
                      <h3 className="font-[var(--font-heading)] text-sm font-bold uppercase tracking-wide text-brand-black">
                        Productos destacados
                      </h3>
                      <div className="mt-4 space-y-3">
                        {landing.relatedProducts.map((product, i) => (
                          <Link
                            key={i}
                            href={`/catalogo/${product.slug}`}
                            className="group flex items-center justify-between rounded-lg border border-brand-gray px-3.5 py-3 transition-colors hover:border-brand-red hover:bg-brand-cream/50"
                          >
                            <div>
                              <p className="text-sm font-medium text-brand-black group-hover:text-brand-red">
                                {product.name}
                              </p>
                              <p className="text-xs text-brand-gray-dark">
                                Desde {product.price}
                              </p>
                            </div>
                            <ArrowRight className="h-4 w-4 text-brand-gray-dark group-hover:text-brand-red" />
                          </Link>
                        ))}
                      </div>
                      <Link
                        href="/catalogo"
                        className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-brand-red hover:underline"
                      >
                        Ver catálogo completo
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  )}

                {/* Quick contact */}
                <div className="rounded-xl bg-brand-black p-5 text-white">
                  <h3 className="font-[var(--font-heading)] text-sm font-bold uppercase tracking-wide">
                    Contacto rápido
                  </h3>
                  <div className="mt-4 space-y-3">
                    <a
                      href="tel:+34937297858"
                      className="flex items-center gap-2.5 text-sm text-white/80 transition-colors hover:text-brand-red"
                    >
                      <Phone className="h-4 w-4 text-brand-red" />
                      +34 937 29 78 58
                    </a>
                    <a
                      href="mailto:info@disstands.com"
                      className="flex items-center gap-2.5 text-sm text-white/80 transition-colors hover:text-brand-red"
                    >
                      <Mail className="h-4 w-4 text-brand-red" />
                      info@disstands.com
                    </a>
                    <div className="flex items-center gap-2.5 text-sm text-white/60">
                      <MapPin className="h-4 w-4 text-brand-red" />
                      Barcelona, España
                    </div>
                  </div>
                  <Link
                    href="/contacto"
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-brand-red px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-red-dark"
                  >
                    Pedir presupuesto
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* FAQs */}
        {landing.faqs && landing.faqs.length > 0 && (
          <FaqSection faqs={landing.faqs} />
        )}

        {/* Bottom CTA */}
        <section className="bg-brand-red py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="font-[var(--font-heading)] text-2xl font-bold text-white sm:text-3xl">
              ¿Necesitas {categoryLabel.toLowerCase()}
              {landing.city ? ` en ${landing.city}` : ""}?
            </h2>
            <p className="mt-3 text-base text-white/80 sm:text-lg">
              Solicita tu presupuesto sin compromiso. Te respondemos en menos de
              24 horas.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-3.5 text-sm font-semibold text-brand-red transition-colors hover:bg-brand-cream"
              >
                Solicitar presupuesto
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="tel:+34937297858"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                <Phone className="h-4 w-4" />
                Llamar ahora
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
