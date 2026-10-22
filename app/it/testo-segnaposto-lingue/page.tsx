import type { Metadata } from "next";
import { LanguagesPage } from "@/components/languages/languages-page";

// Local prototype only: no production discovery/structured-data integration.
// Clear inherited Classic alternates rather than publishing false equivalents.
export const metadata: Metadata = {
  title: "Generatore di testo segnaposto per lingue asiatiche",
  robots: { index: false, follow: false },
  alternates: { canonical: null, languages: {} },
  openGraph: null,
  twitter: null,
};

export default function Page() { return <LanguagesPage />; }
