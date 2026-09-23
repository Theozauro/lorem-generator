import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lorem-generator.com";

export const metadata: Metadata = {
  title: "Política de Cookies | lorem-generator.com",
  description: "Política sobre cookies e armazenamento local do navegador no lorem-generator.com.",
  alternates: { canonical: "/pt-br/cookie-policy/", languages: { en: "/cookie-policy/", it: "/it/cookie-policy/", es: "/es/cookie-policy/", fr: "/fr/cookie-policy/", de: "/de/cookie-policy/", "pt-BR": "/pt-br/cookie-policy/" } },
  openGraph: { type: "website", url: `${siteUrl}/pt-br/cookie-policy/`, locale: "pt_BR", title: "Política de Cookies | lorem-generator.com", description: "Política sobre cookies e armazenamento local do navegador no lorem-generator.com.", siteName: "lorem-generator.com" },
  twitter: { card: "summary", title: "Política de Cookies | lorem-generator.com", description: "Política sobre cookies e armazenamento local do navegador no lorem-generator.com." },
  robots: { index: true, follow: true },
};

export default function BrazilianPortugueseCookiePolicyPage() {
  return <LegalPage language="pt-BR" kind="cookies" />;
}
