import type { Metadata } from "next";
import { LanguagesPage } from "@/components/languages/languages-page";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lorem-generator.com";
const path = "/hu/azsiai-ipsum/";
const title = "Ázsiai Ipsum-generátor – Japán, kínai és koreai szöveg";
const description = "Generálj japán, egyszerűsített vagy hagyományos kínai, illetve koreai mintaszöveget többnyelvű felületek és elrendezések pontos teszteléséhez.";

export const metadata: Metadata = {
  title,
  description,
  robots: { index: true, follow: true },
  alternates: { canonical: path, languages: { en: "/asian-ipsum/", it: "/it/ipsum-asiatico/", es: "/es/ipsum-asiatico/", fr: "/fr/ipsum-asiatique/", de: "/de/asiatisches-ipsum/", "pt-BR": "/pt-br/ipsum-asiatico/", nl: "/nl/aziatisch-ipsum/", pl: "/pl/azjatyckie-ipsum/", tr: "/tr/asya-ipsum/", hu: path } },
  openGraph: {
    type: "website",
    url: `${siteUrl}${path}`,
    locale: "hu_HU",
    title,
    description,
    siteName: "lorem-generator.com",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og-image.png"] },
};

export default function HungarianAsianIpsumPage() {
  return <LanguagesPage locale="hu" />;
}
