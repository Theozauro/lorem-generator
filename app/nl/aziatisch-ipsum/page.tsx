import type { Metadata } from "next";
import { LanguagesPage } from "@/components/languages/languages-page";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lorem-generator.com";
const path = "/nl/aziatisch-ipsum/";
const title = "Aziatisch Ipsum-generator voor Japans, Chinees en Koreaans";
const description = "Genereer Japanse, Chinese of Koreaanse tekst om meertalige interfaces en layouts te testen. Kies woorden, tekens of zinnen en stel het aantal alinea’s in.";

export const metadata: Metadata = {
  title,
  description,
  robots: { index: true, follow: true },
  alternates: { canonical: path, languages: { en: "/asian-ipsum/", it: "/it/ipsum-asiatico/", es: "/es/ipsum-asiatico/", fr: "/fr/ipsum-asiatique/", de: "/de/asiatisches-ipsum/", "pt-BR": "/pt-br/ipsum-asiatico/", nl: path, pl: "/pl/azjatyckie-ipsum/" } },
  openGraph: { type: "website", url: `${siteUrl}${path}`, locale: "nl_NL", title, description, siteName: "lorem-generator.com", images: [{ url: "/og-image.png", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title, description, images: ["/og-image.png"] },
};

export default function DutchAsianIpsumPage() {
  return <LanguagesPage locale="nl" />;
}
