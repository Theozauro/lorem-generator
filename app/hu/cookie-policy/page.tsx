import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lorem-generator.com";
const title = "Cookie-szabályzat | lorem-generator.com";
const description = "Információk a lorem-generator.com cookie-jairól és böngészőtárolójáról.";
export const metadata: Metadata = { title, description, alternates: { canonical: "/hu/cookie-policy/" }, openGraph: { type: "website", url: `${siteUrl}/hu/cookie-policy/`, locale: "hu_HU", title, description, siteName: "lorem-generator.com" }, twitter: { card: "summary", title, description }, robots: { index: false, follow: true } };
export default function HungarianCookiePolicyPage() { return <LegalPage language="hu" kind="cookies" />; }
