import type { Metadata } from "next";
import { LanguagesPage } from "@/components/languages/languages-page";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lorem-generator.com";
const path = "/pl/azjatyckie-ipsum/";
const title = "Generator tekstu w językach azjatyckich";
const description = "Generuj tekst po japońsku, chińsku uproszczonym lub tradycyjnym oraz koreańsku, aby sprawdzać wielojęzyczne interfejsy i układy z dokładnie określoną liczbą słów, znaków lub zdań.";

export const metadata: Metadata = {
  title,
  description,
  robots: { index: true, follow: true },
  alternates: { canonical: path, languages: { en: "/asian-ipsum/", it: "/it/ipsum-asiatico/", es: "/es/ipsum-asiatico/", fr: "/fr/ipsum-asiatique/", de: "/de/asiatisches-ipsum/", "pt-BR": "/pt-br/ipsum-asiatico/", nl: "/nl/aziatisch-ipsum/", pl: path } },
  openGraph: { type: "website", url: `${siteUrl}${path}`, locale: "pl_PL", title, description, siteName: "lorem-generator.com", images: [{ url: "/og-image.png", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title, description, images: ["/og-image.png"] },
};

export default function PolishAsianIpsumPage() {
  return <LanguagesPage locale="pl" />;
}
