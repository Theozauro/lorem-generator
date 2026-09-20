import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Informativa privacy | lorem-generator.com",
  description: "Informativa privacy per lorem-generator.com e il suo generatore Lorem Ipsum nel browser.",
  alternates: { canonical: "/it/privacy-policy/", languages: { en: "/privacy-policy/", it: "/it/privacy-policy/" } },
  robots: { index: true, follow: true },
};

export default function ItalianPrivacyPolicyPage() { return <LegalPage language="it" kind="privacy" />; }
