import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lorem-generator.com";

export const metadata: Metadata = {
  title: "Générateur de Lorem Ipsum — Texte de substitution gratuit en ligne",
  description: "Générez du Lorem Ipsum avec un nombre exact de mots, paragraphes, phrases ou caractères. Copiez instantanément du texte de substitution dans votre navigateur.",
  alternates: { canonical: "/fr/", languages: { en: "/", it: "/it/", es: "/es/", fr: "/fr/", de: "/de/" } },
  openGraph: {
    type: "website",
    url: `${siteUrl}/fr/`,
    locale: "fr_FR",
    title: "Générateur de Lorem Ipsum — Texte de substitution gratuit en ligne",
    description: "Générez du Lorem Ipsum avec un nombre exact de mots, paragraphes, phrases ou caractères.",
    siteName: "lorem-generator.com",
  },
  twitter: {
    card: "summary",
    title: "Générateur de Lorem Ipsum — Texte de substitution gratuit en ligne",
    description: "Générez du Lorem Ipsum avec un nombre exact de mots, paragraphes, phrases ou caractères. Copiez instantanément du texte de substitution dans votre navigateur.",
  },
  robots: { index: true, follow: true },
};

export default function FrenchLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
