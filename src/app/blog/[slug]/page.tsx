import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/supabase/queries";
import { blogPosts as mockPosts } from "@/data/blog-posts";
import { BlogCard } from "@/components/shared/blog-card";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

function sanitizeWpContent(html: string): string {
  return html
    // Remove inline styles from WP
    .replace(/\sstyle="[^"]*"/g, "")
    // Remove stray links with just "IR" text (WP button artifacts)
    .replace(/<a[^>]*>\s*IR\s*<\/a>/gi, "")
    // Convert standalone bold paragraphs that look like headings to h3
    .replace(/<p><strong>([^<]{10,80})<\/strong><\/p>/g, "<h3>$1</h3>")
    // Remove empty paragraphs
    .replace(/<p>\s*<\/p>/g, "")
    // Clean up extra whitespace
    .replace(/\n\s*\n/g, "\n");
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const result = await getBlogPostBySlug(slug);
  if (result) {
    return {
      title: `${result.post.title} — Blog Disstands`,
      description: result.post.excerpt,
    };
  }

  const mock = mockPosts.find((p) => p.slug === slug);
  if (!mock) return { title: "Artículo no encontrado" };
  return {
    title: `${mock.title} — Blog Disstands`,
    description: mock.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Try Supabase first
  const result = await getBlogPostBySlug(slug);
  let post = result?.post;
  let content = result?.content || "";
  let related: typeof mockPosts = [];

  if (post) {
    const allPosts = await getBlogPosts();
    related = allPosts.filter((p) => p.id !== post!.id).slice(0, 3);
  } else {
    // Fallback to mock
    const mock = mockPosts.find((p) => p.slug === slug);
    if (!mock) notFound();
    post = mock;
    related = mockPosts
      .filter((p) => p.id !== mock.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-16">
        {/* Hero image */}
        <div className="relative h-[300px] sm:h-[400px]">
        <img
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0">
          <div className="mx-auto max-w-3xl px-4 pb-8 sm:px-6">
            <span className="inline-block rounded-full bg-brand-red px-3 py-1 text-xs font-medium text-white">
              {post.category}
            </span>
            <h1 className="mt-3 font-[var(--font-heading)] text-2xl font-bold text-white sm:text-4xl">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        {/* Meta */}
        <div className="flex items-center gap-4 border-b border-brand-gray pb-6 text-sm text-brand-gray-dark">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 font-medium text-brand-black transition-colors hover:text-brand-red"
          >
            <ArrowLeft className="h-4 w-4" />
            Blog
          </Link>
          <span className="h-4 w-px bg-brand-gray" />
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("es-ES", {
                day: "numeric", month: "long", year: "numeric",
              })}
            </time>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Content */}
        <article className="blog-article prose prose-lg mt-8 max-w-none">
          {content ? (
            <div dangerouslySetInnerHTML={{ __html: sanitizeWpContent(content) }} />
          ) : (
            <>
              <p className="text-lg leading-relaxed text-brand-gray-dark">
                {post.excerpt}
              </p>
              <p>
                En Disstands, llevamos más de 23 años especializándonos en pavimentos y revestimientos
                para todo tipo de espacios. Desde ferias internacionales como el Mobile World Congress
                hasta showrooms de grandes marcas, nuestra experiencia nos avala.
              </p>
              <h2>La importancia de elegir el pavimento adecuado</h2>
              <p>
                El suelo es el primer punto de contacto visual y físico en cualquier espacio. Un pavimento
                bien elegido no solo transmite profesionalidad, sino que también mejora la experiencia del
                visitante y refuerza la identidad de marca.
              </p>
              <h2>Nuestra experiencia en el sector</h2>
              <p>
                Con más de 500 stands montados y presencia en más de 15 países, hemos aprendido que cada
                proyecto tiene necesidades únicas. Trabajamos con moquetas de alta gama, césped artificial,
                suelos PVC, losetas técnicas y mucho más.
              </p>
              <h2>Conclusión</h2>
              <p>
                Si estás planificando un evento, feria o renovación de espacio comercial, no dudes en
                contactarnos. Nuestro equipo de expertos te asesorará para encontrar la solución perfecta
                para tu proyecto.
              </p>
            </>
          )}
        </article>

        {/* CTA */}
        <div className="mt-12 rounded-xl bg-brand-cream p-8 text-center">
          <h3 className="font-[var(--font-heading)] text-xl font-bold text-brand-black">
            ¿Necesitas asesoramiento para tu proyecto?
          </h3>
          <p className="mt-2 text-brand-gray-dark">
            Nuestro equipo de expertos está listo para ayudarte.
          </p>
          <Link
            href="/contacto"
            className="mt-4 inline-block rounded-lg bg-brand-red px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-red-dark"
          >
            Contactar con Disstands
          </Link>
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-[var(--font-heading)] text-2xl font-bold text-brand-black">
              Artículos relacionados
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {related.map((p) => (
                <Link key={p.id} href={`/blog/${p.slug}`}>
                  <BlogCard post={p} />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      </main>
      <Footer />
    </>
  );
}
