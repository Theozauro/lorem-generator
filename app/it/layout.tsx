import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lorem-generator.com";

export const metadata: Metadata = {
  title: "Generatore Lorem Ipsum — Testo segnaposto online",
  description: "Genera parole, paragrafi, frasi o caratteri Lorem Ipsum online. Testo segnaposto pronto da copiare per layout, prototipi e progetti di design.",
  alternates: {
    canonical: "/it/",
    languages: { en: "/", it: "/it/", es: "/es/", fr: "/fr/", de: "/de/", "pt-BR": "/pt-br/", nl: "/nl/", tr: "/tr/", "x-default": "/" },
  },
  openGraph: {
    type: "website",
    url: `${siteUrl}/it/`,
    locale: "it_IT",
    title: "Generatore Lorem Ipsum — Testo segnaposto online",
    description: "Genera parole, paragrafi, frasi o caratteri Lorem Ipsum online. Testo segnaposto pronto da copiare per layout, prototipi e progetti di design.",
    siteName: "lorem-generator.com",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Generatore Lorem Ipsum — Testo segnaposto online",
    description: "Genera parole, paragrafi, frasi o caratteri Lorem Ipsum online. Testo segnaposto pronto da copiare per layout, prototipi e progetti di design.",
    images: ["/og-image.png"],
  },
};

export default function ItalianLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
