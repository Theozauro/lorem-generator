import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lorem-generator.com";
const title = "Lorem Ipsum Oluşturucu — Çevrim içi yer tutucu metin";
const description = "Mizanpajlar, prototipler ve tasarım çalışmaları için tam sayıda sözcük, paragraf, cümle veya karakter oluşturun. Yer tutucu metni tarayıcınızda hemen kopyalayın.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/tr/", languages: { en: "/", it: "/it/", es: "/es/", fr: "/fr/", de: "/de/", "pt-BR": "/pt-br/", nl: "/nl/", tr: "/tr/", "x-default": "/" } },
  openGraph: { type: "website", url: `${siteUrl}/tr/`, locale: "tr_TR", title, description, siteName: "lorem-generator.com" },
  twitter: { card: "summary", title, description },
  robots: { index: true, follow: true },
};

export default function TurkishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
