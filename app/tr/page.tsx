import HomePage from "@/components/homepage/home-page";
import { trHomepageCopy } from "@/components/homepage/homepage-copy/tr";

export default function TurkishHomePage() {
  return <HomePage locale="tr" copy={trHomepageCopy} />;
}
