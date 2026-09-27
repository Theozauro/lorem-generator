import HomePage from "@/components/homepage/home-page";
import { deHomepageCopy } from "@/components/homepage/homepage-copy/de";

export default function GermanHomePage() {
  return <HomePage locale="de" copy={deHomepageCopy} />;
}
