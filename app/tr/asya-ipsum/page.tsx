import type { Metadata } from "next";
import { LanguagesPage } from "@/components/languages/languages-page";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lorem-generator.com";
const path = "/tr/asya-ipsum/";
const title = "Asya Ipsum Oluşturucu | Japonca, Çince ve Korece Metin";
const description = "Çok dilli arayüzleri test etmek için Japonca, Basitleştirilmiş Çince, Geleneksel Çince veya Korece metin oluşturun. Sözcük, karakter, cümle ve paragraf sayılarını belirleyin.";

export const metadata: Metadata = {
  title,
  description,
  robots: { index: true, follow: true },
  alternates: { canonical: path, languages: { en: "/asian-ipsum/", it: "/it/ipsum-asiatico/", es: "/es/ipsum-asiatico/", fr: "/fr/ipsum-asiatique/", de: "/de/asiatisches-ipsum/", "pt-BR": "/pt-br/ipsum-asiatico/", nl: "/nl/aziatisch-ipsum/", pl: "/pl/azjatyckie-ipsum/", tr: path, hu: "/hu/azsiai-ipsum/" } },
  openGraph: { type: "website", url: `${siteUrl}${path}`, locale: "tr_TR", title, description, siteName: "lorem-generator.com", images: [{ url: "/og-image.png", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title, description, images: ["/og-image.png"] },
};

export default function TurkishAsianIpsumPage() {
  return <LanguagesPage locale="tr" />;
}
