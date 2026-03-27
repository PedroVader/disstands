"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PortfolioCard } from "@/components/shared/portfolio-card";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n";
import type { PortfolioItem } from "@/types";

const CATEGORIES = ["Todos", "Ferias", "Comercial", "Contract"];

interface Props {
  items: PortfolioItem[];
}

export function PortfolioClient({ items }: Props) {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const { t } = useTranslation();

  const filtered = activeCategory === "Todos"
    ? items
    : items.filter((item) => item.category === activeCategory);

  const categoryLabels: Record<string, string> = {
    Todos: t.portfolio_page.filter_all,
    Ferias: "Ferias",
    Comercial: "Comercial",
    Contract: "Contract",
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-16">
        {/* Hero */}
        <section className="border-b border-brand-gray bg-brand-cream">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="font-[var(--font-heading)] text-4xl font-bold text-brand-black sm:text-5xl">
            {t.portfolio_page.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-brand-gray-dark">
            {t.portfolio_page.subtitle}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-medium transition-colors",
                activeCategory === cat
                  ? "bg-brand-black text-white"
                  : "bg-brand-cream text-brand-gray-dark hover:bg-brand-gray hover:text-brand-black"
              )}
            >
              {categoryLabels[cat] || cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <PortfolioCard key={item.id} item={item} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center text-brand-gray-dark">
            {t.portfolio_page.no_results}
          </div>
        )}

        {/* Stats */}
        <div className="mt-16 grid gap-6 rounded-xl bg-brand-black p-8 text-center sm:grid-cols-4 sm:p-12">
          {[
            { value: "+500", label: t.stats.stands },
            { value: "+23", label: t.stats.years },
            { value: "+50.000", label: t.stats.m2 },
            { value: "+15", label: t.stats.countries },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-[var(--font-heading)] text-3xl font-bold text-white sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-xl bg-brand-cream p-8 text-center sm:p-12">
          <h2 className="font-[var(--font-heading)] text-2xl font-bold text-brand-black sm:text-3xl">
            {t.portfolio_page.cta_title}
          </h2>
          <p className="mt-3 text-brand-gray-dark">
            {t.portfolio_page.cta_subtitle}
          </p>
          <a
            href="/contacto"
            className="mt-6 inline-block rounded-lg bg-brand-red px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-red-dark"
          >
            {t.portfolio_page.cta_button}
          </a>
        </div>
      </div>
      </main>
      <Footer />
    </>
  );
}
