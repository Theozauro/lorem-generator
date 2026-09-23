export function createSitemap(baseUrl = "https://lorem-generator.com") {
  const homeAlternates = { en: `${baseUrl}/`, it: `${baseUrl}/it/`, es: `${baseUrl}/es/`, fr: `${baseUrl}/fr/`, de: `${baseUrl}/de/`, "pt-BR": `${baseUrl}/pt-br/`, "nl-NL": `${baseUrl}/nl/` };
  const privacyAlternates = { en: `${baseUrl}/privacy-policy/`, it: `${baseUrl}/it/privacy-policy/`, es: `${baseUrl}/es/privacy-policy/`, fr: `${baseUrl}/fr/privacy-policy/`, de: `${baseUrl}/de/privacy-policy/`, "pt-BR": `${baseUrl}/pt-br/privacy-policy/`, "nl-NL": `${baseUrl}/nl/privacy-policy/` };
  const cookieAlternates = { en: `${baseUrl}/cookie-policy/`, it: `${baseUrl}/it/cookie-policy/`, es: `${baseUrl}/es/cookie-policy/`, fr: `${baseUrl}/fr/cookie-policy/`, de: `${baseUrl}/de/cookie-policy/`, "pt-BR": `${baseUrl}/pt-br/cookie-policy/`, "nl-NL": `${baseUrl}/nl/cookie-policy/` };
  return [
    ...Object.values(homeAlternates).map((url, index) => ({ url, changeFrequency: "monthly", priority: index === 0 ? 1 : 0.9, alternates: { languages: homeAlternates } })),
    ...Object.values(privacyAlternates).map(url => ({ url, changeFrequency: "yearly", priority: 0.3, alternates: { languages: privacyAlternates } })),
    ...Object.values(cookieAlternates).map(url => ({ url, changeFrequency: "yearly", priority: 0.3, alternates: { languages: cookieAlternates } })),
  ];
}
