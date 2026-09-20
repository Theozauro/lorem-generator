import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Cookie Policy | lorem-generator.com",
  description: "Cookie and browser storage policy for lorem-generator.com.",
  alternates: { canonical: "/cookie-policy/", languages: { en: "/cookie-policy/", it: "/it/cookie-policy/" } },
  robots: { index: true, follow: true },
};

export default function CookiePolicyPage() { return <LegalPage language="en" kind="cookies" />; }
