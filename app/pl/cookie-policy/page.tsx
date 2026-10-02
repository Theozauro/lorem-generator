import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lorem-generator.com";
const title = "Polityka cookies | lorem-generator.com";
const description = "Informacje o plikach cookie i pamięci przeglądarki używanych przez lorem-generator.com.";
export const metadata: Metadata = { title, description, alternates: { canonical: "/pl/cookie-policy/" }, openGraph: { type: "website", url: `${siteUrl}/pl/cookie-policy/`, locale: "pl_PL", title, description, siteName: "lorem-generator.com" }, twitter: { card: "summary", title, description }, robots: { index: false, follow: true } };
export default function PolishCookiePolicyPage() { return <LegalPage language="pl" kind="cookies" />; }
