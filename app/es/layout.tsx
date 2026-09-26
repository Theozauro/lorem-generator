import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lorem-generator.com";

export const metadata: Metadata = {
  title: "Generador de Lorem Ipsum — Texto de relleno online",
  description: "Genera palabras, párrafos, frases o caracteres de Lorem Ipsum online. Texto de relleno listo para copiar para maquetas, prototipos y proyectos de diseño.",
  alternates: {
    canonical: "/es/",
    languages: { en: "/", it: "/it/", es: "/es/", fr: "/fr/", de: "/de/", "pt-BR": "/pt-br/", nl: "/nl/", tr: "/tr/", "x-default": "/" },
  },
  openGraph: {
    type: "website",
    url: `${siteUrl}/es/`,
    locale: "es_ES",
    title: "Generador de Lorem Ipsum — Texto de relleno online",
    description: "Genera palabras, párrafos, frases o caracteres de Lorem Ipsum online. Texto de relleno listo para copiar para maquetas, prototipos y proyectos de diseño.",
    siteName: "lorem-generator.com",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Generador de Lorem Ipsum — Texto de relleno online",
    description: "Genera palabras, párrafos, frases o caracteres de Lorem Ipsum online. Texto de relleno listo para copiar para maquetas, prototipos y proyectos de diseño.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function SpanishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
