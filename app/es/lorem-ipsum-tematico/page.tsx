import type { Metadata } from "next";
import { ThemedIpsumPage } from "@/components/homepage/themed-ipsum-page";
import { spanishThemedPageConfig } from "@/components/homepage/themed-copy";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lorem-generator.com";
const path = "/es/lorem-ipsum-tematico/";
const title = "Generador de Lorem Ipsum temático — Corporate, Tech, IA, Diseño, Moda y Zombie";
const description = "Genera texto de prueba temático para Corporate, Tech, IA, Diseño, Moda y Zombie, en español o inglés, para mockups, layouts y prototipos.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path, languages: { en: "/themed-lorem-ipsum/", it: "/it/lorem-ipsum-a-tema/", es: path, de: "/de/lorem-ipsum-nach-themen/", "x-default": "/themed-lorem-ipsum/" } },
  robots: { index: true, follow: true },
  openGraph: { type: "website", url: `${siteUrl}${path}`, locale: "es_ES", title, description, siteName: "lorem-generator.com", images: [{ url: "/og-image.png", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title, description, images: ["/og-image.png"] },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Generador de Lorem Ipsum temático",
  url: `${siteUrl}${path}`,
  inLanguage: "es",
  applicationCategory: "DesignApplication",
  operatingSystem: "Any",
  description,
  isAccessibleForFree: true,
  offers: { "@type": "Offer", price: 0 },
  featureList: ["Corporate Ipsum", "Tech Ipsum", "IA Ipsum", "Ipsum de diseño", "Ipsum de moda", "Zombie Ipsum", "generación en español e inglés", "palabras y párrafos", "frases", "caracteres"],
};

export default function SpanishThemedLoremPage() {
  return <>
    <ThemedIpsumPage config={spanishThemedPageConfig} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
  </>;
}
