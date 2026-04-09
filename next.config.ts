import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  async redirects() {
    return [
      // nicdemore.ai → nicdemore.com (301 permanent)
      {
        source: "/:path*",
        has: [{ type: "host", value: "nicdemore.ai" }],
        destination: "https://nicdemore.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.nicdemore.ai" }],
        destination: "https://nicdemore.com/:path*",
        permanent: true,
      },
      // nicholasdemore.com → nicdemore.com (301 permanent)
      {
        source: "/:path*",
        has: [{ type: "host", value: "nicholasdemore.com" }],
        destination: "https://nicdemore.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.nicholasdemore.com" }],
        destination: "https://nicdemore.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
