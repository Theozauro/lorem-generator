import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lorem-generator.com";
  return [
    { url: `${baseUrl}/`, changeFrequency: "monthly", priority: 1, alternates: { languages: { en: `${baseUrl}/`, it: `${baseUrl}/it/` } } },
    { url: `${baseUrl}/it/`, changeFrequency: "monthly", priority: 0.9, alternates: { languages: { en: `${baseUrl}/`, it: `${baseUrl}/it/` } } },
    { url: `${baseUrl}/privacy-policy/`, changeFrequency: "yearly", priority: 0.3, alternates: { languages: { en: `${baseUrl}/privacy-policy/`, it: `${baseUrl}/it/privacy-policy/` } } },
    { url: `${baseUrl}/it/privacy-policy/`, changeFrequency: "yearly", priority: 0.3, alternates: { languages: { en: `${baseUrl}/privacy-policy/`, it: `${baseUrl}/it/privacy-policy/` } } },
    { url: `${baseUrl}/cookie-policy/`, changeFrequency: "yearly", priority: 0.3, alternates: { languages: { en: `${baseUrl}/cookie-policy/`, it: `${baseUrl}/it/cookie-policy/` } } },
    { url: `${baseUrl}/it/cookie-policy/`, changeFrequency: "yearly", priority: 0.3, alternates: { languages: { en: `${baseUrl}/cookie-policy/`, it: `${baseUrl}/it/cookie-policy/` } } },
  ];
}
