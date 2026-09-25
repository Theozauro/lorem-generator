import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lorem-generator.com";

export const metadata: Metadata = {
  title: "Informativa sui cookie | lorem-generator.com",
  description: "Informativa cookie e memoria locale per lorem-generator.com.",
  alternates: { canonical: "/it/cookie-policy/", languages: { en: "/cookie-policy/", it: "/it/cookie-policy/", es: "/es/cookie-policy/", fr: "/fr/cookie-policy/", de: "/de/cookie-policy/", "pt-BR": "/pt-br/cookie-policy/", "nl-NL": "/nl/cookie-policy/", tr: "/tr/cookie-policy/" } },
  openGraph: {
    type: "website",
    url: `${siteUrl}/it/cookie-policy/`,
    locale: "it_IT",
    title: "Informativa sui cookie | lorem-generator.com",
    description: "Informativa cookie e memoria locale per lorem-generator.com.",
    siteName: "lorem-generator.com",
  },
  twitter: {
    card: "summary",
    title: "Informativa sui cookie | lorem-generator.com",
    description: "Informativa cookie e memoria locale per lorem-generator.com.",
  },
  robots: { index: true, follow: true },
};

export default function ItalianCookiePolicyPage() { return <LegalPage language="it" kind="cookies" />; }
