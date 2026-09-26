import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lorem-generator.com";
const title = "Lorem Ipsum Generator — Tijdelijke tekst online";
const description = "Genereer Lorem Ipsum met een exact aantal woorden, alinea’s, zinnen of tekens. Kopieer tijdelijke tekst direct in je browser.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/nl/", languages: { en: "/", it: "/it/", es: "/es/", fr: "/fr/", de: "/de/", "pt-BR": "/pt-br/", nl: "/nl/", tr: "/tr/", "x-default": "/" } },
  openGraph: { type: "website", url: `${siteUrl}/nl/`, locale: "nl_NL", title, description, siteName: "lorem-generator.com", images: [{ url: "/og-image.png", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title, description, images: ["/og-image.png"] },
  robots: { index: true, follow: true },
};

export default function DutchLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
