import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://lorem-generator.com"),
  title: "Lorem Ipsum Generator — Free Online Placeholder Text Tool",
  description: "Generate Lorem Ipsum by exact words, paragraphs, sentences, or characters. Copy clean placeholder text instantly in your browser.",
  alternates: { canonical: "/", languages: { en: "/", it: "/it/", es: "/es/", fr: "/fr/", de: "/de/" } },
  openGraph: {
    type: "website",
    url: "/",
    locale: "en_US",
    title: "Lorem Ipsum Generator — Free Online Placeholder Text Tool",
    description: "Generate Lorem Ipsum by exact words, paragraphs, sentences, or characters. Copy clean placeholder text instantly in your browser.",
    siteName: "lorem-generator.com",
  },
  twitter: {
    card: "summary",
    title: "Lorem Ipsum Generator — Free Online Placeholder Text Tool",
    description: "Generate Lorem Ipsum by exact words, paragraphs, sentences, or characters. Copy clean placeholder text instantly in your browser.",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: "try{document.documentElement.lang=location.pathname.startsWith('/it')?'it':location.pathname.startsWith('/es')?'es':location.pathname.startsWith('/fr')?'fr':location.pathname.startsWith('/de')?'de':'en';var theme=localStorage.getItem('lorem-theme');if(theme==='light'||theme==='dark')document.documentElement.dataset.theme=theme}catch(e){}" }} /></head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
