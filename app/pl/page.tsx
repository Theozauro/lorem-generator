import HomePage from "@/components/homepage/home-page";
import { plHomepageCopy } from "@/components/homepage/homepage-copy/pl";

export default function PolishHomePage() {
  return <HomePage locale="pl" copy={plHomepageCopy} />;
}
