export interface Category {
  id: string;
  name: string;
  slug: string;
  productCount: number;
  image: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  priceFrom: number;
  unit: string;
  image: string;
  badge?: "Nuevo" | "Eco" | "Popular";
  description: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  client: string;
  year: number;
  image: string;
  category: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
}

export interface Stat {
  id: string;
  value: number;
  prefix?: string;
  suffix: string;
  label: string;
}

export interface TrustClient {
  id: string;
  name: string;
  logo: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: NavLink[];
}
