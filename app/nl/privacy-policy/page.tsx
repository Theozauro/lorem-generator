import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lorem-generator.com";
const title = "Privacybeleid | lorem-generator.com";
const description = "Privacybeleid van lorem-generator.com en de Lorem Ipsum Generator die lokaal in de browser werkt.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/nl/privacy-policy/", languages: { en: "/privacy-policy/", it: "/it/privacy-policy/", es: "/es/privacy-policy/", fr: "/fr/privacy-policy/", de: "/de/privacy-policy/", "pt-BR": "/pt-br/privacy-policy/", nl: "/nl/privacy-policy/", tr: "/tr/privacy-policy/" } },
  openGraph: { type: "website", url: `${siteUrl}/nl/privacy-policy/`, locale: "nl_NL", title, description, siteName: "lorem-generator.com" },
  twitter: { card: "summary", title, description },
  robots: { index: true, follow: true },
};

export default function DutchPrivacyPolicyPage() {
  return <LegalPage language="nl-NL" kind="privacy" />;
}
