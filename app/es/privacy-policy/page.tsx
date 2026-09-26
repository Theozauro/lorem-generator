import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lorem-generator.com";

export const metadata: Metadata = {
  title: "Política de privacidad | lorem-generator.com",
  description: "Política de privacidad de lorem-generator.com y su generador de Lorem Ipsum en el navegador.",
alternates: { canonical: "/es/privacy-policy/" },
  openGraph: {
    type: "website",
    url: `${siteUrl}/es/privacy-policy/`,
    locale: "es_ES",
    title: "Política de privacidad | lorem-generator.com",
    description: "Política de privacidad de lorem-generator.com y su generador de Lorem Ipsum en el navegador.",
    siteName: "lorem-generator.com",
  },
  twitter: {
    card: "summary",
    title: "Política de privacidad | lorem-generator.com",
    description: "Política de privacidad de lorem-generator.com y su generador de Lorem Ipsum en el navegador.",
  },
robots: { index: false, follow: true },
};

export default function SpanishPrivacyPolicyPage() {
  return <LegalPage language="es" kind="privacy" />;
}
