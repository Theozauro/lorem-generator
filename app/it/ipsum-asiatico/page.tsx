import type { Metadata } from "next";
import { LanguagesPage } from "@/components/languages/languages-page";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lorem-generator.com";
const path = "/it/ipsum-asiatico/";
const title = "Generatore di testo segnaposto per lingue asiatiche";
const description = "Genera testo di prova in giapponese, cinese e coreano per verificare interfacce, layout e prototipi multilingua con conteggi precisi.";

export const metadata: Metadata = {
  title,
  description,
  robots: { index: true, follow: true },
  alternates: { canonical: path, languages: { en: "/asian-ipsum/", it: path, es: "/es/ipsum-asiatico/", fr: "/fr/ipsum-asiatique/", de: "/de/asiatisches-ipsum/", "pt-BR": "/pt-br/ipsum-asiatico/", nl: "/nl/aziatisch-ipsum/", pl: "/pl/azjatyckie-ipsum/", tr: "/tr/asya-ipsum/", hu: "/hu/azsiai-ipsum/" } },
  openGraph: {
    type: "website",
    url: `${siteUrl}${path}`,
    locale: "it_IT",
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

export default function Page() { return <LanguagesPage />; }
