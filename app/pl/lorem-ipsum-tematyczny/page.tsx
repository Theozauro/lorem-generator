import type { Metadata } from "next";
import { ThemedIpsumPage } from "@/components/homepage/themed-ipsum-page";
import { polishThemedPageConfig } from "@/components/homepage/themed-copy";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lorem-generator.com";
const path = "/pl/lorem-ipsum-tematyczny/";
const title = "Generator tematycznego Lorem Ipsum — Corporate, Tech, AI, Design, Moda i Zombie";
const description = "Generuj tematyczny tekst zastępczy dla Corporate, Tech, AI, Design, Moda i Zombie, po polsku lub angielsku, do makiet, layoutów i prototypów.";

export const metadata: Metadata = {
  title, description,
  alternates: {
    canonical: path,
    languages: {
      en: "/themed-lorem-ipsum/", it: "/it/lorem-ipsum-a-tema/",
      es: "/es/lorem-ipsum-tematico/", de: "/de/lorem-ipsum-nach-themen/",
      fr: "/fr/lorem-ipsum-thematique/", "pt-BR": "/pt-br/lorem-ipsum-tematico/",
      nl: "/nl/lorem-ipsum-op-thema/", pl: path, tr: "/tr/tematik-lorem-ipsum/", hu: "/hu/tematikus-lorem-ipsum/", "x-default": "/themed-lorem-ipsum/",
    },
  },
  robots: { index: true, follow: true },
  openGraph: { type: "website", url: `${siteUrl}${path}`, locale: "pl_PL", title, description, siteName: "lorem-generator.com", images: [{ url: "/og-image.png", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title, description, images: ["/og-image.png"] },
};

const structuredData = {
  "@context": "https://schema.org", "@type": "WebApplication",
  name: "Generator tematycznego Lorem Ipsum", url: `${siteUrl}${path}`, inLanguage: "pl",
  applicationCategory: "DesignApplication", operatingSystem: "Any", description,
  isAccessibleForFree: true, offers: { "@type": "Offer", price: 0 },
  featureList: ["Corporate Ipsum", "Tech Ipsum", "AI Ipsum", "Design Ipsum", "Moda Ipsum", "Zombie Ipsum", "Generowanie po polsku i po angielsku", "Słowa i akapity", "Zdania", "Znaki"],
};

export default function PolishThemedLoremPage() {
  return <>
    <ThemedIpsumPage config={polishThemedPageConfig} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
  </>;
}
