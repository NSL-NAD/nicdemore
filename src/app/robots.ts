import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/resume",
    },
    sitemap: "https://nicdemore.com/sitemap.xml",
  };
}
