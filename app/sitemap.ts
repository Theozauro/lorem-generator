import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lorem-generator.com";
  return [
    { url: `${baseUrl}/`, changeFrequency: "monthly", priority: 1, alternates: { languages: { en: `${baseUrl}/`, it: `${baseUrl}/it/` } } },
    { url: `${baseUrl}/it/`, changeFrequency: "monthly", priority: 0.9, alternates: { languages: { en: `${baseUrl}/`, it: `${baseUrl}/it/` } } },
  ];
}
