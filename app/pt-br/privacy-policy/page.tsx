import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lorem-generator.com";

export const metadata: Metadata = {
  title: "Política de Privacidade | lorem-generator.com",
  description: "Política de Privacidade do lorem-generator.com e de seu gerador de Lorem Ipsum no navegador.",
  alternates: { canonical: "/pt-br/privacy-policy/", languages: { en: "/privacy-policy/", it: "/it/privacy-policy/", es: "/es/privacy-policy/", fr: "/fr/privacy-policy/", de: "/de/privacy-policy/", "pt-BR": "/pt-br/privacy-policy/", nl: "/nl/privacy-policy/", tr: "/tr/privacy-policy/" } },
  openGraph: { type: "website", url: `${siteUrl}/pt-br/privacy-policy/`, locale: "pt_BR", title: "Política de Privacidade | lorem-generator.com", description: "Política de Privacidade do lorem-generator.com e de seu gerador de Lorem Ipsum no navegador.", siteName: "lorem-generator.com" },
  twitter: { card: "summary", title: "Política de Privacidade | lorem-generator.com", description: "Política de Privacidade do lorem-generator.com e de seu gerador de Lorem Ipsum no navegador." },
  robots: { index: true, follow: true },
};

export default function BrazilianPortuguesePrivacyPolicyPage() {
  return <LegalPage language="pt-BR" kind="privacy" />;
}
