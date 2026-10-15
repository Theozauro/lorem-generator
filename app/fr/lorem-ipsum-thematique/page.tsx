import type { Metadata } from "next";
import { ThemedIpsumPage } from "@/components/homepage/themed-ipsum-page";
import { frenchThemedPageConfig } from "@/components/homepage/themed-copy";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lorem-generator.com";
const path = "/fr/lorem-ipsum-thematique/";
const title = "Générateur de Lorem Ipsum thématique — Corporate, Tech, IA, Design, Mode et Zombie";
const description = "Générez du texte de substitution thématique pour Corporate, Tech, IA, Design, Mode et Zombie, en français ou en anglais, pour vos maquettes, mises en page et prototypes.";

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
      fr: path,
      "pt-BR": "/pt-br/lorem-ipsum-tematico/",
      nl: "/nl/lorem-ipsum-op-thema/",
      pl: "/pl/lorem-ipsum-tematyczny/", tr: "/tr/tematik-lorem-ipsum/", hu: "/hu/tematikus-lorem-ipsum/", "x-default": "/themed-lorem-ipsum/",
    },
  },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: `${siteUrl}${path}`,
    locale: "fr_FR",
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
  name: "Générateur de Lorem Ipsum thématique",
  url: `${siteUrl}${path}`,
  inLanguage: "fr",
  applicationCategory: "DesignApplication",
  operatingSystem: "Any",
  description,
  isAccessibleForFree: true,
  offers: { "@type": "Offer", price: 0 },
  featureList: [
    "Corporate Ipsum",
    "Tech Ipsum",
    "IA Ipsum",
    "Design Ipsum",
    "Ipsum Mode",
    "Zombie Ipsum",
    "Génération en français et en anglais",
    "Génération par mots et paragraphes",
    "Génération par phrases",
    "Génération par caractères",
  ],
};

export default function FrenchThemedLoremPage() {
  return <>
    <ThemedIpsumPage config={frenchThemedPageConfig} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
  </>;
}
