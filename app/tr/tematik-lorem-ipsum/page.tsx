import type { Metadata } from "next";
import { ThemedIpsumPage } from "@/components/homepage/themed-ipsum-page";
import { turkishThemedPageConfig } from "@/components/homepage/themed-copy";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lorem-generator.com";
const path = "/tr/tematik-lorem-ipsum/";
const title = "Tematik Lorem Ipsum Oluşturucu — Kurumsal, Teknoloji, Yapay Zekâ, Tasarım, Moda ve Zombi";
const description = "Kurumsal, Teknoloji, Yapay Zekâ, Tasarım, Moda ve Zombi temalarında Türkçe veya İngilizce yer tutucu metinler üretin; mockup, layout ve prototipler için kullanın.";

export const metadata: Metadata = {
  title, description,
  alternates: { canonical: path, languages: {
    en: "/themed-lorem-ipsum/", it: "/it/lorem-ipsum-a-tema/", es: "/es/lorem-ipsum-tematico/",
    de: "/de/lorem-ipsum-nach-themen/", fr: "/fr/lorem-ipsum-thematique/",
    "pt-BR": "/pt-br/lorem-ipsum-tematico/", nl: "/nl/lorem-ipsum-op-thema/",
    pl: "/pl/lorem-ipsum-tematyczny/", tr: path, hu: "/hu/tematikus-lorem-ipsum/", "x-default": "/themed-lorem-ipsum/",
  } },
  robots: { index: true, follow: true },
  openGraph: { type: "website", url: `${siteUrl}${path}`, locale: "tr_TR", title, description, siteName: "lorem-generator.com", images: [{ url: "/og-image.png", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title, description, images: ["/og-image.png"] },
};

const structuredData = {
  "@context": "https://schema.org", "@type": "WebApplication",
  name: "Tematik Lorem Ipsum Oluşturucu", url: `${siteUrl}${path}`, inLanguage: "tr",
  applicationCategory: "DesignApplication", operatingSystem: "Any", description,
  isAccessibleForFree: true, offers: { "@type": "Offer", price: 0 },
  featureList: ["Kurumsal Ipsum", "Teknoloji Ipsum", "Yapay Zekâ Ipsum", "Tasarım Ipsum", "Moda Ipsum", "Zombi Ipsum", "Türkçe ve İngilizce metin üretimi", "Kelime ve paragraf modu", "Cümle modu", "Karakter modu"],
};

export default function TurkishThemedLoremPage() {
  return <>
    <ThemedIpsumPage config={turkishThemedPageConfig} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
  </>;
}
