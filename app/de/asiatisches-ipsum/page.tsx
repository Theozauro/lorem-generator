import type { Metadata } from "next";
import { LanguagesPage } from "@/components/languages/languages-page";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lorem-generator.com";
const path = "/de/asiatisches-ipsum/";
const title = "Asiatisches Ipsum – Generator für japanischen, chinesischen und koreanischen Text";
const description = "Erzeuge japanischen, vereinfachten und traditionellen chinesischen oder koreanischen Blindtext für mehrsprachige Layouts und Prototypen – mit exakten Mengen.";

export const metadata: Metadata = {
  title,
  description,
  robots: { index: true, follow: true },
  alternates: { canonical: path, languages: { en: "/asian-ipsum/", it: "/it/ipsum-asiatico/", es: "/es/ipsum-asiatico/", fr: "/fr/ipsum-asiatique/", de: path, "pt-BR": "/pt-br/ipsum-asiatico/", nl: "/nl/aziatisch-ipsum/", pl: "/pl/azjatyckie-ipsum/" } },
  openGraph: {
    type: "website",
    url: `${siteUrl}${path}`,
    locale: "de_DE",
    title,
    description,
    siteName: "lorem-generator.com",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og-image.png"] },
};

export default function GermanAsianIpsumPage() {
  return <LanguagesPage locale="de" />;
}
