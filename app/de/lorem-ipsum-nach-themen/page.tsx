import type { Metadata } from "next";
import { ThemedIpsumPage } from "@/components/homepage/themed-ipsum-page";
import { germanThemedPageConfig } from "@/components/homepage/themed-copy";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lorem-generator.com";
const path = "/de/lorem-ipsum-nach-themen/";
const title = "Thematischer Lorem-Ipsum-Generator — Corporate, Tech, KI, Design, Fashion & Zombie";
const description = "Erzeuge thematischen Blindtext für Corporate, Tech, KI, Design, Fashion und Zombie auf Deutsch oder Englisch für Mockups, Layouts und Prototypen.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path, languages: { en: "/themed-lorem-ipsum/", it: "/it/lorem-ipsum-a-tema/", es: "/es/lorem-ipsum-tematico/", de: path, "x-default": "/themed-lorem-ipsum/" } },
  robots: { index: true, follow: true },
  openGraph: { type: "website", url: `${siteUrl}${path}`, locale: "de_DE", title, description, siteName: "lorem-generator.com", images: [{ url: "/og-image.png", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title, description, images: ["/og-image.png"] },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Thematischer Lorem-Ipsum-Generator",
  url: `${siteUrl}${path}`,
  inLanguage: "de",
  applicationCategory: "DesignApplication",
  operatingSystem: "Any",
  description,
  isAccessibleForFree: true,
  offers: { "@type": "Offer", price: 0 },
  featureList: ["Corporate Ipsum", "Tech Ipsum", "KI Ipsum", "Design Ipsum", "Fashion Ipsum", "Zombie Ipsum", "Inhalte auf Deutsch und Englisch", "Generierung nach Wörtern, Absätzen, Sätzen und Zeichen"],
};

export default function GermanThemedLoremPage() {
  return <>
    <ThemedIpsumPage config={germanThemedPageConfig} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
  </>;
}
