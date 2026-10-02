import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lorem-generator.com";
const title = "Polityka prywatności | lorem-generator.com";
const description = "Informacje o prywatności, danych i usługach zewnętrznych w lorem-generator.com.";
export const metadata: Metadata = { title, description, alternates: { canonical: "/pl/privacy-policy/" }, openGraph: { type: "website", url: `${siteUrl}/pl/privacy-policy/`, locale: "pl_PL", title, description, siteName: "lorem-generator.com" }, twitter: { card: "summary", title, description }, robots: { index: false, follow: true } };
export default function PolishPrivacyPolicyPage() { return <LegalPage language="pl" kind="privacy" />; }
