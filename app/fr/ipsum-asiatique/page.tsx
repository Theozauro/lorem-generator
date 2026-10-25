import type { Metadata } from "next";
import { LanguagesPage } from "@/components/languages/languages-page";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lorem-generator.com";
const path = "/fr/ipsum-asiatique/";
const title = "Générateur de texte en langues asiatiques";
const description = "Générez du texte en japonais, chinois simplifié, chinois traditionnel ou coréen pour tester des interfaces et mises en page multilingues avec un décompte précis.";

export const metadata: Metadata = {
  title,
  description,
  robots: { index: true, follow: true },
  alternates: { canonical: path, languages: { en: "/asian-ipsum/", it: "/it/ipsum-asiatico/", es: "/es/ipsum-asiatico/", fr: path, de: "/de/asiatisches-ipsum/", "pt-BR": "/pt-br/ipsum-asiatico/", nl: "/nl/aziatisch-ipsum/", pl: "/pl/azjatyckie-ipsum/" } },
  openGraph: {
    type: "website",
    url: `${siteUrl}${path}`,
    locale: "fr_FR",
    title,
    description,
    siteName: "lorem-generator.com",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og-image.png"] },
};

export default function FrenchAsianIpsumPage() {
  return <LanguagesPage locale="fr" />;
}
