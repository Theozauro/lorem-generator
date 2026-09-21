import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lorem-generator.com";

export const metadata: Metadata = {
  title: "Privacy Policy | lorem-generator.com",
  description: "Privacy policy for lorem-generator.com and its browser-based Lorem Ipsum generator.",
  alternates: { canonical: "/privacy-policy/", languages: { en: "/privacy-policy/", it: "/it/privacy-policy/" } },
  openGraph: {
    type: "website",
    url: `${siteUrl}/privacy-policy/`,
    locale: "en_US",
    title: "Privacy Policy | lorem-generator.com",
    description: "Privacy policy for lorem-generator.com and its browser-based Lorem Ipsum generator.",
    siteName: "lorem-generator.com",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy | lorem-generator.com",
    description: "Privacy policy for lorem-generator.com and its browser-based Lorem Ipsum generator.",
  },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() { return <LegalPage language="en" kind="privacy" />; }
