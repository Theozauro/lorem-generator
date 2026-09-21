import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lorem-generator.com";

export const metadata: Metadata = {
  title: "Generatore Lorem Ipsum — Testo segnaposto online",
  description: "Genera parole, paragrafi, frasi o caratteri Lorem Ipsum online. Testo segnaposto pronto da copiare per layout, prototipi e progetti di design.",
  alternates: {
    canonical: "/it/",
    languages: { en: "/", it: "/it/", es: "/es/" },
  },
  openGraph: {
    type: "website",
    url: `${siteUrl}/it/`,
    locale: "it_IT",
    title: "Generatore Lorem Ipsum — Testo segnaposto online",
    description: "Genera parole, paragrafi, frasi o caratteri Lorem Ipsum online.",
    siteName: "lorem-generator.com",
  },
  twitter: {
    card: "summary",
    title: "Generatore Lorem Ipsum — Testo segnaposto online",
    description: "Genera parole, paragrafi, frasi o caratteri Lorem Ipsum online. Testo segnaposto pronto da copiare per layout, prototipi e progetti di design.",
  },
};

export default function ItalianLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
