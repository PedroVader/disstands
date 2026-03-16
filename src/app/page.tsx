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

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <TrustBar />
        <CategoryNavigation />
        <ServicesSection />
        <FeaturedProducts />
        <MontaTuFeriaCta />
        <PortfolioGallery />
        <StatsCounter />
        <BlogPreview />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
