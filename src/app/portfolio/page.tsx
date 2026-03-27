import { getPortfolioItems } from "@/lib/supabase/queries";
import { portfolioItems as mockPortfolio } from "@/data/portfolio";
import { PortfolioClient } from "./portfolio-client";

export default async function PortfolioPage() {
  const items = await getPortfolioItems();

  return <PortfolioClient items={items.length > 0 ? items : mockPortfolio} />;
}
