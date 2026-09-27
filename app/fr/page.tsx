import HomePage from "@/components/homepage/home-page";
import { frHomepageCopy } from "@/components/homepage/homepage-copy/fr";

export default function FrenchPage() {
  return <HomePage locale="fr" copy={frHomepageCopy} />;
}
