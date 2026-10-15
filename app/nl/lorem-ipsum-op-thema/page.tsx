import type { Metadata } from "next";
import { ThemedIpsumPage } from "@/components/homepage/themed-ipsum-page";
import { dutchThemedPageConfig } from "@/components/homepage/themed-copy";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lorem-generator.com";
const path = "/nl/lorem-ipsum-op-thema/";
const title = "Lorem Ipsum-generator op thema — Corporate, Tech, AI, Design, Mode en Zombie";
const description = "Genereer thematische opvultekst voor Corporate, Tech, AI, Design, Mode en Zombie, in het Nederlands of Engels, voor mock-ups, layouts en prototypes.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: path,
    languages: {
      en: "/themed-lorem-ipsum/",
      it: "/it/lorem-ipsum-a-tema/",
      es: "/es/lorem-ipsum-tematico/",
      de: "/de/lorem-ipsum-nach-themen/",
      fr: "/fr/lorem-ipsum-thematique/",
      "pt-BR": "/pt-br/lorem-ipsum-tematico/",
      nl: path,
      pl: "/pl/lorem-ipsum-tematyczny/", tr: "/tr/tematik-lorem-ipsum/", "x-default": "/themed-lorem-ipsum/",
    },
  },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: `${siteUrl}${path}`,
    locale: "nl_NL",
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
  name: "Lorem Ipsum-generator op thema",
  url: `${siteUrl}${path}`,
  inLanguage: "nl",
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
    "Mode Ipsum",
    "Zombie Ipsum",
    "Genereren in het Nederlands en Engels",
    "Woorden en alinea's",
    "Zinnen",
    "Tekens",
  ],
};

export default function DutchThemedLoremPage() {
  return <>
    <ThemedIpsumPage config={dutchThemedPageConfig} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
  </>;
}
