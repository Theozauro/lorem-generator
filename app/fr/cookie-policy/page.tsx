import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lorem-generator.com";

export const metadata: Metadata = {
  title: "Politique relative aux cookies | lorem-generator.com",
  description: "Politique relative aux cookies et au stockage local du navigateur de lorem-generator.com.",
  alternates: { canonical: "/fr/cookie-policy/", languages: { en: "/cookie-policy/", it: "/it/cookie-policy/", es: "/es/cookie-policy/", fr: "/fr/cookie-policy/", de: "/de/cookie-policy/", "pt-BR": "/pt-br/cookie-policy/", nl: "/nl/cookie-policy/", tr: "/tr/cookie-policy/", "x-default": "/" } },
  openGraph: {
    type: "website",
    url: `${siteUrl}/fr/cookie-policy/`,
    locale: "fr_FR",
    title: "Politique relative aux cookies | lorem-generator.com",
    description: "Politique relative aux cookies et au stockage local du navigateur de lorem-generator.com.",
    siteName: "lorem-generator.com",
  },
  twitter: { card: "summary", title: "Politique relative aux cookies | lorem-generator.com", description: "Politique relative aux cookies et au stockage local du navigateur de lorem-generator.com." },
  robots: { index: true, follow: true },
};

export default function FrenchCookiePolicyPage() {
  return <LegalPage language="fr" kind="cookies" />;
}
