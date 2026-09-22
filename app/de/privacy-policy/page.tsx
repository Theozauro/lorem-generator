import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lorem-generator.com";

export const metadata: Metadata = {
  title: "Datenschutzerklärung | lorem-generator.com",
  description: "Datenschutzerklärung für lorem-generator.com und den browserbasierten Lorem-Ipsum-Generator.",
  alternates: { canonical: "/de/privacy-policy/", languages: { en: "/privacy-policy/", it: "/it/privacy-policy/", es: "/es/privacy-policy/", fr: "/fr/privacy-policy/", de: "/de/privacy-policy/" } },
  openGraph: { type: "website", url: `${siteUrl}/de/privacy-policy/`, locale: "de_DE", title: "Datenschutzerklärung | lorem-generator.com", description: "Datenschutzerklärung für lorem-generator.com und den browserbasierten Lorem-Ipsum-Generator.", siteName: "lorem-generator.com" },
  twitter: { card: "summary", title: "Datenschutzerklärung | lorem-generator.com", description: "Datenschutzerklärung für lorem-generator.com und den browserbasierten Lorem-Ipsum-Generator." },
  robots: { index: true, follow: true },
};

export default function GermanPrivacyPolicyPage() {
  return <LegalPage language="de" kind="privacy" />;
}
