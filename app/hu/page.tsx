import HomePage from "@/components/homepage/home-page";
import { huHomepageCopy } from "@/components/homepage/homepage-copy/hu";

export default function HungarianHomePage() {
  return <HomePage locale="hu" copy={huHomepageCopy} />;
}
