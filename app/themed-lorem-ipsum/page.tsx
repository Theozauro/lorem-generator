import type { Metadata } from "next";
import { ThemedIpsumPage } from "@/components/homepage/themed-ipsum-page";
import { englishThemedPageConfig } from "@/components/homepage/themed-copy";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lorem-generator.com";
const path = "/themed-lorem-ipsum/";
const title = "Themed Lorem Ipsum Generator — Corporate, Tech, AI, Design, Fashion & Zombie";
const description = "Generate themed placeholder text for Corporate, Tech, AI, Design, Fashion and Zombie mockups, layouts and prototypes.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path, languages: { en: path, it: "/it/lorem-ipsum-a-tema/", es: "/es/lorem-ipsum-tematico/", de: "/de/lorem-ipsum-nach-themen/", "x-default": path } },
  robots: { index: true, follow: true },
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

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Themed Lorem Ipsum Generator",
  url: `${siteUrl}${path}`,
  inLanguage: "en",
  applicationCategory: "DesignApplication",
  operatingSystem: "Any",
  description,
  isAccessibleForFree: true,
  offers: { "@type": "Offer", price: 0 },
  featureList: [
    "Corporate Ipsum",
    "Tech Ipsum",
    "AI Ipsum",
    "Design Ipsum",
    "Fashion Ipsum",
    "Zombie Ipsum",
    "words and paragraphs mode",
    "sentence mode",
    "character mode",
  ],
};

export default function ThemedLoremIpsumPage() {
  return <>
    <ThemedIpsumPage config={englishThemedPageConfig} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
  </>;
}
