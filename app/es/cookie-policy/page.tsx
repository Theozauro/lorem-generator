import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lorem-generator.com";

export const metadata: Metadata = {
  title: "Política de cookies | lorem-generator.com",
  description: "Política de cookies y almacenamiento local de lorem-generator.com.",
  alternates: { canonical: "/es/cookie-policy/", languages: { en: "/cookie-policy/", it: "/it/cookie-policy/", es: "/es/cookie-policy/", fr: "/fr/cookie-policy/", de: "/de/cookie-policy/", "pt-BR": "/pt-br/cookie-policy/" } },
  openGraph: {
    type: "website",
    url: `${siteUrl}/es/cookie-policy/`,
    locale: "es_ES",
    title: "Política de cookies | lorem-generator.com",
    description: "Política de cookies y almacenamiento local de lorem-generator.com.",
    siteName: "lorem-generator.com",
  },
  twitter: {
    card: "summary",
    title: "Política de cookies | lorem-generator.com",
    description: "Política de cookies y almacenamiento local de lorem-generator.com.",
  },
  robots: { index: true, follow: true },
};

export default function SpanishCookiePolicyPage() {
  return <LegalPage language="es" kind="cookies" />;
}
