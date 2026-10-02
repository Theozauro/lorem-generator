import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lorem-generator.com";
const title = "Lorem Ipsum generátor — Ingyenes helykitöltő szöveg online";
const description = "Generálj Lorem Ipsum szöveget pontosan megadott számú szóval, bekezdéssel, mondattal vagy karakterrel. Másold a helykitöltő szöveget közvetlenül a böngészőből.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/hu/", languages: { en: "/", it: "/it/", es: "/es/", fr: "/fr/", de: "/de/", "pt-BR": "/pt-br/", nl: "/nl/", tr: "/tr/", pl: "/pl/", hu: "/hu/", "x-default": "/" } },
  openGraph: { type: "website", url: `${siteUrl}/hu/`, locale: "hu_HU", title, description, siteName: "lorem-generator.com", images: [{ url: "/og-image.png", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title, description, images: ["/og-image.png"] },
  robots: { index: true, follow: true },
};

export default function HungarianLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
