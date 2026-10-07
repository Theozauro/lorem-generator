import type { Metadata } from "next";
import { AhrefsAnalytics } from "@/components/analytics/ahrefs-analytics";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://lorem-generator.com"),
  title: "Lorem Ipsum Generator — Free Online Placeholder Text Tool",
  description: "Generate Lorem Ipsum by exact words, paragraphs, sentences, or characters. Copy clean placeholder text instantly in your browser.",
  alternates: { canonical: "/", languages: { en: "/", it: "/it/", es: "/es/", fr: "/fr/", de: "/de/", "pt-BR": "/pt-br/", nl: "/nl/", tr: "/tr/", pl: "/pl/", hu: "/hu/", "x-default": "/" } },
  openGraph: {
    type: "website",
    url: "/",
    locale: "en_US",
    title: "Lorem Ipsum Generator — Free Online Placeholder Text Tool",
    description: "Generate Lorem Ipsum by exact words, paragraphs, sentences, or characters. Copy clean placeholder text instantly in your browser.",
    siteName: "lorem-generator.com",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lorem Ipsum Generator — Free Online Placeholder Text Tool",
    description: "Generate Lorem Ipsum by exact words, paragraphs, sentences, or characters. Copy clean placeholder text instantly in your browser.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  other: {
    "google-adsense-account": "ca-pub-2533538512095765",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "try{document.documentElement.lang=location.pathname.startsWith('/it')?'it':location.pathname.startsWith('/es')?'es':location.pathname.startsWith('/fr')?'fr':location.pathname.startsWith('/de')?'de':location.pathname.startsWith('/pt-br')?'pt-BR':location.pathname.startsWith('/nl')?'nl':location.pathname.startsWith('/tr')?'tr':location.pathname.startsWith('/pl')?'pl':location.pathname.startsWith('/hu')?'hu':'en';var theme=localStorage.getItem('lorem-theme');if(theme==='light'||theme==='dark')document.documentElement.dataset.theme=theme}catch(e){}" }} />
      </head>
      <body className="antialiased"><AhrefsAnalytics />{children}</body>
    </html>
  );
}
