import type { Metadata } from "next";
import { ThemedIpsumPage } from "@/components/homepage/themed-ipsum-page";
import { brazilianPortugueseThemedPageConfig } from "@/components/homepage/themed-copy";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lorem-generator.com";
const path = "/pt-br/lorem-ipsum-tematico/";
const title = "Gerador de Lorem Ipsum temático — Corporate, Tech, IA, Design, Moda e Zombie";
const description = "Gere texto de preenchimento temático para Corporate, Tech, IA, Design, Moda e Zombie, em português do Brasil ou inglês, para mockups, layouts e protótipos.";

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
      "pt-BR": path,
      nl: "/nl/lorem-ipsum-op-thema/",
      pl: "/pl/lorem-ipsum-tematyczny/", "x-default": "/themed-lorem-ipsum/",
    },
  },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: `${siteUrl}${path}`,
    locale: "pt_BR",
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
  name: "Gerador de Lorem Ipsum temático",
  url: `${siteUrl}${path}`,
  inLanguage: "pt-BR",
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
    "Ipsum de Moda",
    "Zombie Ipsum",
    "Geração em português do Brasil e inglês",
    "Geração por palavras e parágrafos",
    "Geração por frases",
    "Geração por caracteres",
  ],
};

export default function BrazilianPortugueseThemedLoremPage() {
  return <>
    <ThemedIpsumPage config={brazilianPortugueseThemedPageConfig} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
  </>;
}
