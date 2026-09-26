import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lorem-generator.com";

export const metadata: Metadata = {
  title: "Lorem-Ipsum-Generator — Kostenloser Blindtext-Generator online",
  description: "Erzeuge Lorem Ipsum mit einer exakten Anzahl an Wörtern, Absätzen, Sätzen oder Zeichen. Kopiere Blindtext direkt in deinem Browser.",
  alternates: { canonical: "/de/", languages: { en: "/", it: "/it/", es: "/es/", fr: "/fr/", de: "/de/", "pt-BR": "/pt-br/", nl: "/nl/", tr: "/tr/", "x-default": "/" } },
  openGraph: {
    type: "website",
    url: `${siteUrl}/de/`,
    locale: "de_DE",
    title: "Lorem-Ipsum-Generator — Kostenloser Blindtext-Generator online",
    description: "Erzeuge Lorem Ipsum mit einer exakten Anzahl an Wörtern, Absätzen, Sätzen oder Zeichen. Kopiere Blindtext direkt in deinem Browser.",
    siteName: "lorem-generator.com",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lorem-Ipsum-Generator — Kostenloser Blindtext-Generator online",
    description: "Erzeuge Lorem Ipsum mit einer exakten Anzahl an Wörtern, Absätzen, Sätzen oder Zeichen. Kopiere Blindtext direkt in deinem Browser.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function GermanLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
