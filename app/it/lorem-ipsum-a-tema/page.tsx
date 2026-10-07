import type { Metadata } from "next";
import ItalianThemedPage from "@/components/homepage/italian-themed-page";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lorem-generator.com";
const path = "/it/lorem-ipsum-a-tema/";
const title = "Generatore Lorem Ipsum a tema — Corporate, Tech, AI, Design e Fashion";
const description = "Genera testo segnaposto a tema Corporate, Tech, AI, Design, Fashion e Zombie, in italiano o inglese, per mockup, layout e prototipi.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path, languages: { en: "/themed-lorem-ipsum/", it: path, es: "/es/lorem-ipsum-tematico/", de: "/de/lorem-ipsum-nach-themen/", "x-default": "/themed-lorem-ipsum/" } },
  robots: { index: true, follow: true },
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

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Generatore di Ipsum tematico",
  url: `${siteUrl}${path}`,
  inLanguage: "it",
  applicationCategory: "DesignApplication",
  operatingSystem: "Any",
  description,
  isAccessibleForFree: true,
  offers: { "@type": "Offer", price: 0 },
  featureList: [
    "generazione Corporate Ipsum",
    "Tech Ipsum",
    "AI Ipsum",
    "Design Ipsum",
    "Fashion Ipsum",
    "Zombie Ipsum",
    "contenuti in italiano e inglese",
    "generazione per parole, paragrafi, frasi e caratteri",
  ],
};

export default function ItalianThemedLoremPage() {
  return <>
    <ItalianThemedPage />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
  </>;
}
