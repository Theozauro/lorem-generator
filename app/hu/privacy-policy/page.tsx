import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lorem-generator.com";
const title = "Adatvédelmi szabályzat | lorem-generator.com";
const description = "Információk a lorem-generator.com adatvédelmi gyakorlatáról és külső szolgáltatásairól.";
export const metadata: Metadata = { title, description, alternates: { canonical: "/hu/privacy-policy/" }, openGraph: { type: "website", url: `${siteUrl}/hu/privacy-policy/`, locale: "hu_HU", title, description, siteName: "lorem-generator.com" }, twitter: { card: "summary", title, description }, robots: { index: false, follow: true } };
export default function HungarianPrivacyPolicyPage() { return <LegalPage language="hu" kind="privacy" />; }
