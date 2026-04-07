import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "www.disstands.com",
      },
      {
        protocol: "https",
        hostname: "disstands.com",
      },
      {
        protocol: "https",
        hostname: "srwybogqbmfhfmxjzaem.supabase.co",
      },
    ],
  },
  async redirects() {
    return [
      // ========================================
      // Pattern-based redirects (WooCommerce → Next.js)
      // ========================================

      // Products: /producto/slug → /catalogo/slug
      {
        source: "/producto/:slug",
        destination: "/catalogo/:slug",
        permanent: true,
      },
      // Blog posts: /noticias/slug → /blog/slug
      {
        source: "/noticias/:slug",
        destination: "/blog/:slug",
        permanent: true,
      },
      // Categories: /categoria-producto/slug → /catalogo?categoria=slug
      {
        source: "/categoria-producto/:slug",
        destination: "/catalogo?categoria=:slug",
        permanent: true,
      },
      // Nested categories: /categoria-producto/parent/child → /catalogo?categoria=child
      {
        source: "/categoria-producto/:parent/:slug",
        destination: "/catalogo?categoria=:slug",
        permanent: true,
      },

      // ========================================
      // Individual page redirects
      // ========================================

      // Shop pages
      {
        source: "/tienda",
        destination: "/catalogo",
        permanent: true,
      },
      {
        source: "/shop",
        destination: "/catalogo",
        permanent: true,
      },

      // Contact
      {
        source: "/contacto-moquetas-barcelona",
        destination: "/contacto",
        permanent: true,
      },

      // Team / About
      {
        source: "/equipo-disstands",
        destination: "/sobre-nosotros",
        permanent: true,
      },

      // Account
      {
        source: "/mi-cuenta",
        destination: "/admin/login",
        permanent: true,
      },

      // Old checkout
      {
        source: "/finalizar-compra-old",
        destination: "/checkout",
        permanent: true,
      },
      {
        source: "/finalizar-compra-2",
        destination: "/checkout",
        permanent: true,
      },

      // Survey
      {
        source: "/encuesta",
        destination: "/contacto",
        permanent: true,
      },
      {
        source: "/gracias-encuesta",
        destination: "/contacto",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
