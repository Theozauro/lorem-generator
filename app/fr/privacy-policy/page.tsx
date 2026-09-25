import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lorem-generator.com";

export const metadata: Metadata = {
  title: "Politique de confidentialité | lorem-generator.com",
  description: "Politique de confidentialité de lorem-generator.com et de son générateur de Lorem Ipsum dans le navigateur.",
  alternates: { canonical: "/fr/privacy-policy/", languages: { en: "/privacy-policy/", it: "/it/privacy-policy/", es: "/es/privacy-policy/", fr: "/fr/privacy-policy/", de: "/de/privacy-policy/", "pt-BR": "/pt-br/privacy-policy/", "nl-NL": "/nl/privacy-policy/", tr: "/tr/privacy-policy/" } },
  openGraph: {
    type: "website",
    url: `${siteUrl}/fr/privacy-policy/`,
    locale: "fr_FR",
    title: "Politique de confidentialité | lorem-generator.com",
    description: "Politique de confidentialité de lorem-generator.com et de son générateur de Lorem Ipsum dans le navigateur.",
    siteName: "lorem-generator.com",
  },
  twitter: { card: "summary", title: "Politique de confidentialité | lorem-generator.com", description: "Politique de confidentialité de lorem-generator.com et de son générateur de Lorem Ipsum dans le navigateur." },
  robots: { index: true, follow: true },
};

export default function FrenchPrivacyPolicyPage() {
  return <LegalPage language="fr" kind="privacy" />;
}
