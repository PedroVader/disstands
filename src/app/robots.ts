import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/checkout/", "/carrito/"],
      },
    ],
    sitemap: "https://www.disstands.com/sitemap.xml",
  };
}
