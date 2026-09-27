import HomePage from "@/components/homepage/home-page";
import { enHomepageCopy } from "@/components/homepage/homepage-copy/en";

export default function Page() {
  return <HomePage locale="en" copy={enHomepageCopy} />;
}
