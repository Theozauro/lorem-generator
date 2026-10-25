import type { Metadata } from "next";
import { LanguagesPage } from "@/components/languages/languages-page";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lorem-generator.com";
const path = "/es/ipsum-asiatico/";
const title = "Generador de texto en idiomas asiáticos";
const description = "Genera texto de prueba en japonés, chino simplificado, chino tradicional y coreano para revisar interfaces y diseños multilingües con cantidades exactas.";

export const metadata: Metadata = {
  title,
  description,
  robots: { index: true, follow: true },
  alternates: { canonical: path, languages: { en: "/asian-ipsum/", it: "/it/ipsum-asiatico/", es: path, fr: "/fr/ipsum-asiatique/", de: "/de/asiatisches-ipsum/", "pt-BR": "/pt-br/ipsum-asiatico/", nl: "/nl/aziatisch-ipsum/" } },
  openGraph: { type: "website", url: `${siteUrl}${path}`, locale: "es_ES", title, description, siteName: "lorem-generator.com", images: [{ url: "/og-image.png", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title, description, images: ["/og-image.png"] },
};

export default function SpanishAsianIpsumPage() {
  return <LanguagesPage locale="es" />;
}
