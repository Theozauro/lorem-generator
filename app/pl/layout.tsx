import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lorem-generator.com";
const title = "Generator Lorem Ipsum — Darmowy tekst zastępczy online";
const description = "Generuj Lorem Ipsum z dokładną liczbą słów, akapitów, zdań lub znaków. Kopiuj tekst zastępczy bezpośrednio w przeglądarce.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/pl/", languages: { en: "/", it: "/it/", es: "/es/", fr: "/fr/", de: "/de/", "pt-BR": "/pt-br/", nl: "/nl/", tr: "/tr/", pl: "/pl/", "x-default": "/" } },
  openGraph: { type: "website", url: `${siteUrl}/pl/`, locale: "pl_PL", title, description, siteName: "lorem-generator.com", images: [{ url: "/og-image.png", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title, description, images: ["/og-image.png"] },
  robots: { index: true, follow: true },
};

export default function PolishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
