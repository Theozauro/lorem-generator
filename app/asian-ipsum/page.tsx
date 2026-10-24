import type { Metadata } from "next";
import { LanguagesPage } from "@/components/languages/languages-page";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lorem-generator.com";
const path = "/asian-ipsum/";
const title = "Asian-Language Placeholder Text Generator";
const description = "Generate Japanese, Simplified Chinese, Traditional Chinese and Korean placeholder text to test multilingual interfaces, layouts and prototypes with precise counts.";

export const metadata: Metadata = {
  title,
  description,
  robots: { index: true, follow: true },
  alternates: { canonical: path, languages: { en: path, it: "/it/ipsum-asiatico/", es: "/es/ipsum-asiatico/", fr: "/fr/ipsum-asiatique/", de: "/de/asiatisches-ipsum/" } },
  openGraph: {
    type: "website",
    url: `${siteUrl}${path}`,
    locale: "en_US",
    title,
    description,
    siteName: "lorem-generator.com",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return <LanguagesPage locale="en" />;
}
