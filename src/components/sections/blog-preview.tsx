import { SectionWrapper } from "@/components/shared/section-wrapper";
import { SectionTitle } from "@/components/shared/section-title";
import { BlogCard } from "@/components/shared/blog-card";
import { CtaButton } from "@/components/shared/cta-button";
import { blogPosts } from "@/data/blog-posts";

export function BlogPreview() {
  return (
    <SectionWrapper background="white" id="blog">
      <SectionTitle
        title="Blog"
        subtitle="Guías, tendencias y consejos sobre pavimentos profesionales"
        colorScheme="light"
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {blogPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
      <div className="mt-12 text-center">
        <CtaButton variant="secondary" size="lg" href="/blog">
          Ir al blog
        </CtaButton>
      </div>
    </SectionWrapper>
  );
}
