import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { TrustBar } from "@/components/sections/trust-bar";
import { CategoryNavigation } from "@/components/sections/category-navigation";
import { ServicesSection } from "@/components/sections/services-section";
import { FeaturedProducts } from "@/components/sections/featured-products";
import { MontaTuFeriaCta } from "@/components/sections/monta-tu-feria-cta";
import { PortfolioGallery } from "@/components/sections/portfolio-gallery";
import { StatsCounter } from "@/components/sections/stats-counter";
import { BlogPreview } from "@/components/sections/blog-preview";
import { CtaBanner } from "@/components/sections/cta-banner";
import {
  getCategories,
  getProducts,
  getBlogPosts,
  getPortfolioItems,
} from "@/lib/supabase/queries";

export default async function Home() {
  const [categories, featuredProducts, blogPosts, portfolioItems] =
    await Promise.all([
      getCategories(),
      getProducts({ featured: true, limit: 4 }),
      getBlogPosts({ limit: 3 }),
      getPortfolioItems(),
    ]);

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <TrustBar />
        <CategoryNavigation data={categories} />
        <ServicesSection />
        <FeaturedProducts data={featuredProducts} />
        <MontaTuFeriaCta />
        <PortfolioGallery data={portfolioItems} />
        <StatsCounter />
        <BlogPreview data={blogPosts} />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
