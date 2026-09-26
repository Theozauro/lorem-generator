import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lorem-generator.com";
const title = "Çerez Politikası | lorem-generator.com";
const description = "lorem-generator.com sitesindeki çerezler ve tarayıcı yerel depolaması hakkında bilgiler.";

export const metadata: Metadata = {
  title,
  description,
alternates: { canonical: "/tr/cookie-policy/" },
  openGraph: { type: "website", url: `${siteUrl}/tr/cookie-policy/`, locale: "tr_TR", title, description, siteName: "lorem-generator.com" },
  twitter: { card: "summary", title, description },
robots: { index: false, follow: true },
};

export default function TurkishCookiePolicyPage() {
  return <LegalPage language="tr" kind="cookies" />;
}
