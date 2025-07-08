import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable image optimization with modern formats
  images: {
    formats: ["image/avif", "image/webp"],
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
