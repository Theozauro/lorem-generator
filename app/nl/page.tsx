import HomePage from "@/components/homepage/home-page";
import { nlHomepageCopy } from "@/components/homepage/homepage-copy/nl";

export default function DutchHomePage() {
  return <HomePage locale="nl-NL" copy={nlHomepageCopy} />;
}
