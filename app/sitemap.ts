import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lorem-generator.com";
  const homeAlternates = { en: `${baseUrl}/`, it: `${baseUrl}/it/`, es: `${baseUrl}/es/`, fr: `${baseUrl}/fr/`, de: `${baseUrl}/de/`, "pt-BR": `${baseUrl}/pt-br/` };
  const privacyAlternates = { en: `${baseUrl}/privacy-policy/`, it: `${baseUrl}/it/privacy-policy/`, es: `${baseUrl}/es/privacy-policy/`, fr: `${baseUrl}/fr/privacy-policy/`, de: `${baseUrl}/de/privacy-policy/`, "pt-BR": `${baseUrl}/pt-br/privacy-policy/` };
  const cookieAlternates = { en: `${baseUrl}/cookie-policy/`, it: `${baseUrl}/it/cookie-policy/`, es: `${baseUrl}/es/cookie-policy/`, fr: `${baseUrl}/fr/cookie-policy/`, de: `${baseUrl}/de/cookie-policy/`, "pt-BR": `${baseUrl}/pt-br/cookie-policy/` };
  return [
    ...Object.values(homeAlternates).map((url, index) => ({ url, changeFrequency: "monthly" as const, priority: index === 0 ? 1 : 0.9, alternates: { languages: homeAlternates } })),
    ...Object.values(privacyAlternates).map(url => ({ url, changeFrequency: "yearly" as const, priority: 0.3, alternates: { languages: privacyAlternates } })),
    ...Object.values(cookieAlternates).map(url => ({ url, changeFrequency: "yearly" as const, priority: 0.3, alternates: { languages: cookieAlternates } })),
  ];
}
