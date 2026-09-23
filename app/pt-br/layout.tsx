import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lorem-generator.com";
const title = "Gerador de Lorem Ipsum — Texto de espaço reservado online";
const description = "Gere Lorem Ipsum com uma quantidade exata de palavras, parágrafos, frases ou caracteres. Copie texto de espaço reservado diretamente no navegador.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/pt-br/", languages: { en: "/", it: "/it/", es: "/es/", fr: "/fr/", de: "/de/", "pt-BR": "/pt-br/", "nl-NL": "/nl/" } },
  openGraph: { type: "website", url: `${siteUrl}/pt-br/`, locale: "pt_BR", title, description, siteName: "lorem-generator.com" },
  twitter: { card: "summary", title, description },
  robots: { index: true, follow: true },
};

export default function BrazilianPortugueseLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
