import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Cookie policy | lorem-generator.com",
  description: "Informativa cookie e memoria locale per lorem-generator.com.",
  alternates: { canonical: "/it/cookie-policy/", languages: { en: "/cookie-policy/", it: "/it/cookie-policy/" } },
  robots: { index: true, follow: true },
};

export default function ItalianCookiePolicyPage() { return <LegalPage language="it" kind="cookies" />; }
