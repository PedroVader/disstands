"use client";

import { SectionWrapper } from "@/components/shared/section-wrapper";
import { SectionTitle } from "@/components/shared/section-title";
import { BlogCard } from "@/components/shared/blog-card";
import { CtaButton } from "@/components/shared/cta-button";
import { blogPosts as mockBlogPosts } from "@/data/blog-posts";
import { useTranslation } from "@/i18n";
import type { BlogPost } from "@/types";

interface Props {
  data?: BlogPost[];
}

export function BlogPreview({ data }: Props) {
  const { t } = useTranslation();
  const posts = data && data.length > 0 ? data : mockBlogPosts;

  return (
    <SectionWrapper background="white" id="blog">
      <SectionTitle
        title={t.blog.title}
        subtitle={t.blog.subtitle}
        colorScheme="light"
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {posts.slice(0, 3).map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
      <div className="mt-12 text-center">
        <CtaButton variant="secondary" size="lg" href="/blog">
          {t.blog.cta}
        </CtaButton>
      </div>
    </SectionWrapper>
  );
}
