import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lorem-generator.com";
const title = "Cookiebeleid | lorem-generator.com";
const description = "Beleid voor cookies en lokale browseropslag op lorem-generator.com.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/nl/cookie-policy/", languages: { en: "/cookie-policy/", it: "/it/cookie-policy/", es: "/es/cookie-policy/", fr: "/fr/cookie-policy/", de: "/de/cookie-policy/", "pt-BR": "/pt-br/cookie-policy/", nl: "/nl/cookie-policy/", tr: "/tr/cookie-policy/", "x-default": "/" } },
  openGraph: { type: "website", url: `${siteUrl}/nl/cookie-policy/`, locale: "nl_NL", title, description, siteName: "lorem-generator.com" },
  twitter: { card: "summary", title, description },
  robots: { index: true, follow: true },
};

export default function DutchCookiePolicyPage() {
  return <LegalPage language="nl-NL" kind="cookies" />;
}
