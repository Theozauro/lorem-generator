import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lorem-generator.com";

export const metadata: Metadata = {
  title: "Informativa privacy | lorem-generator.com",
  description: "Informativa privacy per lorem-generator.com e il suo generatore Lorem Ipsum nel browser.",
alternates: { canonical: "/it/privacy-policy/" },
  openGraph: {
    type: "website",
    url: `${siteUrl}/it/privacy-policy/`,
    locale: "it_IT",
    title: "Informativa privacy | lorem-generator.com",
    description: "Informativa privacy per lorem-generator.com e il suo generatore Lorem Ipsum nel browser.",
    siteName: "lorem-generator.com",
  },
  twitter: {
    card: "summary",
    title: "Informativa privacy | lorem-generator.com",
    description: "Informativa privacy per lorem-generator.com e il suo generatore Lorem Ipsum nel browser.",
  },
robots: { index: false, follow: true },
};

export default function ItalianPrivacyPolicyPage() { return <LegalPage language="it" kind="privacy" />; }
