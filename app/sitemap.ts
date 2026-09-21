import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lorem-generator.com";
  return [
    { url: `${baseUrl}/`, changeFrequency: "monthly", priority: 1, alternates: { languages: { en: `${baseUrl}/`, it: `${baseUrl}/it/`, es: `${baseUrl}/es/`, fr: `${baseUrl}/fr/` } } },
    { url: `${baseUrl}/it/`, changeFrequency: "monthly", priority: 0.9, alternates: { languages: { en: `${baseUrl}/`, it: `${baseUrl}/it/`, es: `${baseUrl}/es/`, fr: `${baseUrl}/fr/` } } },
    { url: `${baseUrl}/es/`, changeFrequency: "monthly", priority: 0.9, alternates: { languages: { en: `${baseUrl}/`, it: `${baseUrl}/it/`, es: `${baseUrl}/es/`, fr: `${baseUrl}/fr/` } } },
    { url: `${baseUrl}/fr/`, changeFrequency: "monthly", priority: 0.9, alternates: { languages: { en: `${baseUrl}/`, it: `${baseUrl}/it/`, es: `${baseUrl}/es/`, fr: `${baseUrl}/fr/` } } },
    { url: `${baseUrl}/privacy-policy/`, changeFrequency: "yearly", priority: 0.3, alternates: { languages: { en: `${baseUrl}/privacy-policy/`, it: `${baseUrl}/it/privacy-policy/`, es: `${baseUrl}/es/privacy-policy/`, fr: `${baseUrl}/fr/privacy-policy/` } } },
    { url: `${baseUrl}/it/privacy-policy/`, changeFrequency: "yearly", priority: 0.3, alternates: { languages: { en: `${baseUrl}/privacy-policy/`, it: `${baseUrl}/it/privacy-policy/`, es: `${baseUrl}/es/privacy-policy/`, fr: `${baseUrl}/fr/privacy-policy/` } } },
    { url: `${baseUrl}/es/privacy-policy/`, changeFrequency: "yearly", priority: 0.3, alternates: { languages: { en: `${baseUrl}/privacy-policy/`, it: `${baseUrl}/it/privacy-policy/`, es: `${baseUrl}/es/privacy-policy/`, fr: `${baseUrl}/fr/privacy-policy/` } } },
    { url: `${baseUrl}/fr/privacy-policy/`, changeFrequency: "yearly", priority: 0.3, alternates: { languages: { en: `${baseUrl}/privacy-policy/`, it: `${baseUrl}/it/privacy-policy/`, es: `${baseUrl}/es/privacy-policy/`, fr: `${baseUrl}/fr/privacy-policy/` } } },
    { url: `${baseUrl}/cookie-policy/`, changeFrequency: "yearly", priority: 0.3, alternates: { languages: { en: `${baseUrl}/cookie-policy/`, it: `${baseUrl}/it/cookie-policy/`, es: `${baseUrl}/es/cookie-policy/`, fr: `${baseUrl}/fr/cookie-policy/` } } },
    { url: `${baseUrl}/it/cookie-policy/`, changeFrequency: "yearly", priority: 0.3, alternates: { languages: { en: `${baseUrl}/cookie-policy/`, it: `${baseUrl}/it/cookie-policy/`, es: `${baseUrl}/es/cookie-policy/`, fr: `${baseUrl}/fr/cookie-policy/` } } },
    { url: `${baseUrl}/es/cookie-policy/`, changeFrequency: "yearly", priority: 0.3, alternates: { languages: { en: `${baseUrl}/cookie-policy/`, it: `${baseUrl}/it/cookie-policy/`, es: `${baseUrl}/es/cookie-policy/`, fr: `${baseUrl}/fr/cookie-policy/` } } },
    { url: `${baseUrl}/fr/cookie-policy/`, changeFrequency: "yearly", priority: 0.3, alternates: { languages: { en: `${baseUrl}/cookie-policy/`, it: `${baseUrl}/it/cookie-policy/`, es: `${baseUrl}/es/cookie-policy/`, fr: `${baseUrl}/fr/cookie-policy/` } } },
  ];
}
