import type { Metadata } from "next";
import { LanguagesPage } from "@/components/languages/languages-page";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lorem-generator.com";
const path = "/pt-br/ipsum-asiatico/";
const title = "Ipsum Asiático: gerador de texto em japonês, chinês e coreano";
const description = "Gere texto em japonês, chinês simplificado, chinês tradicional ou coreano para testar interfaces e layouts multilíngues com contagens exatas.";

export const metadata: Metadata = {
  title,
  description,
  robots: { index: true, follow: true },
  alternates: { canonical: path, languages: { en: "/asian-ipsum/", it: "/it/ipsum-asiatico/", es: "/es/ipsum-asiatico/", fr: "/fr/ipsum-asiatique/", de: "/de/asiatisches-ipsum/", "pt-BR": path, nl: "/nl/aziatisch-ipsum/", pl: "/pl/azjatyckie-ipsum/" } },
  openGraph: {
    type: "website",
    url: `${siteUrl}${path}`,
    locale: "pt_BR",
    title,
    description,
    siteName: "lorem-generator.com",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og-image.png"] },
};

export default function BrazilianPortugueseAsianIpsumPage() {
  return <LanguagesPage locale="pt-BR" />;
}
