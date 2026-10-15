import type { Metadata } from "next";
import { ThemedIpsumPage } from "@/components/homepage/themed-ipsum-page";
import { hungarianThemedPageConfig } from "@/components/homepage/themed-copy";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lorem-generator.com";
const path = "/hu/tematikus-lorem-ipsum/";
const title = "Tematikus Lorem Ipsum generátor — Üzleti, Tech, AI, Design, Divat és Zombi";
const description = "Generálj tematikus helykitöltő szöveget Üzleti, Tech, AI, Design, Divat és Zombi témákban magyarul vagy angolul, mockupokhoz, layoutokhoz és prototípusokhoz.";

export const metadata: Metadata = {
  title, description,
  alternates: { canonical: path, languages: {
    en: "/themed-lorem-ipsum/", it: "/it/lorem-ipsum-a-tema/", es: "/es/lorem-ipsum-tematico/",
    de: "/de/lorem-ipsum-nach-themen/", fr: "/fr/lorem-ipsum-thematique/",
    "pt-BR": "/pt-br/lorem-ipsum-tematico/", nl: "/nl/lorem-ipsum-op-thema/",
    pl: "/pl/lorem-ipsum-tematyczny/", tr: "/tr/tematik-lorem-ipsum/", hu: path,
    "x-default": "/themed-lorem-ipsum/",
  } },
  robots: { index: true, follow: true },
  openGraph: { type: "website", url: `${siteUrl}${path}`, locale: "hu_HU", title, description, siteName: "lorem-generator.com", images: [{ url: "/og-image.png", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title, description, images: ["/og-image.png"] },
};

const structuredData = {
  "@context": "https://schema.org", "@type": "WebApplication",
  name: "Tematikus Lorem Ipsum generátor", url: `${siteUrl}${path}`, inLanguage: "hu",
  applicationCategory: "DesignApplication", operatingSystem: "Any", description,
  isAccessibleForFree: true, offers: { "@type": "Offer", price: 0 },
  featureList: ["Üzleti Ipsum", "Tech Ipsum", "AI Ipsum", "Design Ipsum", "Divat Ipsum", "Zombi Ipsum", "Magyar és angol szöveggenerálás", "Szavak és bekezdések", "Mondatok", "Karakterek"],
};

export default function HungarianThemedLoremPage() {
  return <>
    <ThemedIpsumPage config={hungarianThemedPageConfig} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
  </>;
}
