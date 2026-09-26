import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lorem-generator.com";

export const metadata: Metadata = {
  title: "Cookie-Richtlinie | lorem-generator.com",
  description: "Informationen zu Cookies und lokalem Browserspeicher auf lorem-generator.com.",
  alternates: { canonical: "/de/cookie-policy/", languages: { en: "/cookie-policy/", it: "/it/cookie-policy/", es: "/es/cookie-policy/", fr: "/fr/cookie-policy/", de: "/de/cookie-policy/", "pt-BR": "/pt-br/cookie-policy/", nl: "/nl/cookie-policy/", tr: "/tr/cookie-policy/", "x-default": "/" } },
  openGraph: { type: "website", url: `${siteUrl}/de/cookie-policy/`, locale: "de_DE", title: "Cookie-Richtlinie | lorem-generator.com", description: "Informationen zu Cookies und lokalem Browserspeicher auf lorem-generator.com.", siteName: "lorem-generator.com" },
  twitter: { card: "summary", title: "Cookie-Richtlinie | lorem-generator.com", description: "Informationen zu Cookies und lokalem Browserspeicher auf lorem-generator.com." },
  robots: { index: true, follow: true },
};

export default function GermanCookiePolicyPage() {
  return <LegalPage language="de" kind="cookies" />;
}
