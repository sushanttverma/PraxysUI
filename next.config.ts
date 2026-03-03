import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Don't expose the X-Powered-By: Next.js header
  poweredByHeader: false,

  // Enable image optimization with modern formats
  images: {
    formats: ["image/avif", "image/webp"],
  },

  // Tree-shake large packages to reduce bundle size
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },

  // Long-term caching for static font assets
  async headers() {
    return [
      {
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
