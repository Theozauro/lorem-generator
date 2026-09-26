import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lorem-generator.com";

export const metadata: Metadata = {
  title: "Générateur de Lorem Ipsum — Texte de substitution gratuit en ligne",
  description: "Générez du Lorem Ipsum avec un nombre exact de mots, paragraphes, phrases ou caractères. Copiez instantanément du texte de substitution dans votre navigateur.",
  alternates: { canonical: "/fr/", languages: { en: "/", it: "/it/", es: "/es/", fr: "/fr/", de: "/de/", "pt-BR": "/pt-br/", nl: "/nl/", tr: "/tr/", "x-default": "/" } },
  openGraph: {
    type: "website",
    url: `${siteUrl}/fr/`,
    locale: "fr_FR",
    title: "Générateur de Lorem Ipsum — Texte de substitution gratuit en ligne",
    description: "Générez du Lorem Ipsum avec un nombre exact de mots, paragraphes, phrases ou caractères. Copiez instantanément du texte de substitution dans votre navigateur.",
    siteName: "lorem-generator.com",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Générateur de Lorem Ipsum — Texte de substitution gratuit en ligne",
    description: "Générez du Lorem Ipsum avec un nombre exact de mots, paragraphes, phrases ou caractères. Copiez instantanément du texte de substitution dans votre navigateur.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function FrenchLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
