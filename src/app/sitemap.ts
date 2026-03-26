import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://nicdemore.com",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
  // NOTE: /resume, /resume/anthropic, /resume/apple excluded intentionally — noindex pages
}
