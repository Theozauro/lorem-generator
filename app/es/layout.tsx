import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lorem-generator.com";

export const metadata: Metadata = {
  title: "Generador de Lorem Ipsum — Texto de relleno online",
  description: "Genera palabras, párrafos, frases o caracteres de Lorem Ipsum online. Texto de relleno listo para copiar para maquetas, prototipos y proyectos de diseño.",
  alternates: {
    canonical: "/es/",
    languages: { en: "/", it: "/it/", es: "/es/" },
  },
  openGraph: {
    type: "website",
    url: `${siteUrl}/es/`,
    locale: "es_ES",
    title: "Generador de Lorem Ipsum — Texto de relleno online",
    description: "Genera palabras, párrafos, frases o caracteres de Lorem Ipsum online.",
    siteName: "lorem-generator.com",
  },
  twitter: {
    card: "summary",
    title: "Generador de Lorem Ipsum — Texto de relleno online",
    description: "Genera palabras, párrafos, frases o caracteres de Lorem Ipsum online. Texto de relleno listo para copiar para maquetas, prototipos y proyectos de diseño.",
  },
  robots: { index: true, follow: true },
};

export default function SpanishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
