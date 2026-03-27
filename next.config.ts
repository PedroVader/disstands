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
};

export default nextConfig;
