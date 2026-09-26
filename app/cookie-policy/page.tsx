import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lorem-generator.com";

export const metadata: Metadata = {
  title: "Cookie Policy | lorem-generator.com",
  description: "Cookie and browser storage policy for lorem-generator.com.",
  alternates: { canonical: "/cookie-policy/", languages: { en: "/cookie-policy/", it: "/it/cookie-policy/", es: "/es/cookie-policy/", fr: "/fr/cookie-policy/", de: "/de/cookie-policy/", "pt-BR": "/pt-br/cookie-policy/", nl: "/nl/cookie-policy/", tr: "/tr/cookie-policy/" } },
  openGraph: {
    type: "website",
    url: `${siteUrl}/cookie-policy/`,
    locale: "en_US",
    title: "Cookie Policy | lorem-generator.com",
    description: "Cookie and browser storage policy for lorem-generator.com.",
    siteName: "lorem-generator.com",
  },
  twitter: {
    card: "summary",
    title: "Cookie Policy | lorem-generator.com",
    description: "Cookie and browser storage policy for lorem-generator.com.",
  },
  robots: { index: true, follow: true },
};

export default function CookiePolicyPage() { return <LegalPage language="en" kind="cookies" />; }
