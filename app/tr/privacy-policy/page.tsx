import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lorem-generator.com";
const title = "Gizlilik Politikası | lorem-generator.com";
const description = "lorem-generator.com ve tarayıcı tabanlı Lorem Ipsum oluşturucu için gizlilik politikası.";

export const metadata: Metadata = {
  title,
  description,
alternates: { canonical: "/tr/privacy-policy/" },
  openGraph: { type: "website", url: `${siteUrl}/tr/privacy-policy/`, locale: "tr_TR", title, description, siteName: "lorem-generator.com" },
  twitter: { card: "summary", title, description },
robots: { index: false, follow: true },
};

export default function TurkishPrivacyPolicyPage() {
  return <LegalPage language="tr" kind="privacy" />;
}
