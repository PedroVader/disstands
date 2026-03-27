"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BlogCard } from "@/components/shared/blog-card";
import { useTranslation } from "@/i18n";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { BlogPost } from "@/types";

const PAGE_SIZE = 9;

interface Props {
  posts: BlogPost[];
}

export function BlogListClient({ posts }: Props) {
  const { t, locale } = useTranslation();
  const [page, setPage] = useState(0);

  const sorted = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const featured = sorted[0];
  const rest = sorted.slice(1);
  const totalPages = Math.ceil(rest.length / PAGE_SIZE);
  const paginatedPosts = rest.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const dateLocale = locale === "ca" ? "ca-ES" : locale === "en" ? "en-GB" : "es-ES";

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-16">
        {/* Hero */}
        <section className="border-b border-brand-gray bg-brand-cream">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <h1 className="font-[var(--font-heading)] text-4xl font-bold text-brand-black sm:text-5xl">
              {t.blog_page.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-brand-gray-dark">
              {t.blog_page.subtitle}
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Featured post */}
          {featured && page === 0 && (
            <Link href={`/blog/${featured.slug}`} className="block">
              <article className="group grid gap-6 overflow-hidden rounded-xl border border-brand-gray bg-white transition-shadow hover:shadow-lg md:grid-cols-2">
                <div className="relative aspect-video overflow-hidden md:aspect-auto md:min-h-[320px]">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col justify-center p-6 md:p-8">
                  <span className="inline-block w-fit rounded-full bg-brand-red px-3 py-1 text-xs font-medium text-white">
                    {featured.category}
                  </span>
                  <h2 className="mt-4 font-[var(--font-heading)] text-2xl font-bold text-brand-black transition-colors group-hover:text-brand-red sm:text-3xl">
                    {featured.title}
                  </h2>
                  <p className="mt-3 text-brand-gray-dark">{featured.excerpt}</p>
                  <div className="mt-4 flex items-center gap-3 text-sm text-brand-gray-dark">
                    <time dateTime={featured.date}>
                      {new Date(featured.date).toLocaleDateString(dateLocale, {
                        day: "numeric", month: "long", year: "numeric",
                      })}
                    </time>
                    <span>·</span>
                    <span>{featured.readTime}</span>
                  </div>
                </div>
              </article>
            </Link>
          )}

          {/* Grid */}
          <div className={page === 0 ? "mt-12" : ""}>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <BlogCard post={post} />
                </Link>
              ))}
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-between rounded-lg border border-brand-gray bg-white px-4 py-3">
              <p className="text-xs text-brand-gray-dark">
                Mostrando {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, rest.length)} de {rest.length} artículos
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => { setPage(Math.max(0, page - 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  disabled={page === 0}
                  className="rounded-lg p-1.5 text-brand-gray-dark transition-colors hover:bg-brand-cream disabled:opacity-30"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => { setPage(i); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-medium transition-colors ${
                      page === i
                        ? "bg-brand-red text-white"
                        : "text-brand-gray-dark hover:bg-brand-cream"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => { setPage(Math.min(totalPages - 1, page + 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  disabled={page >= totalPages - 1}
                  className="rounded-lg p-1.5 text-brand-gray-dark transition-colors hover:bg-brand-cream disabled:opacity-30"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
