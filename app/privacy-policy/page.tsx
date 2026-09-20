import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy | lorem-generator.com",
  description: "Privacy policy for lorem-generator.com and its browser-based Lorem Ipsum generator.",
  alternates: { canonical: "/privacy-policy/", languages: { en: "/privacy-policy/", it: "/it/privacy-policy/" } },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() { return <LegalPage language="en" kind="privacy" />; }
