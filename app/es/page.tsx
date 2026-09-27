import HomePage from "@/components/homepage/home-page";
import { esHomepageCopy } from "@/components/homepage/homepage-copy/es";

export default function SpanishPage() {
  return <HomePage locale="es" copy={esHomepageCopy} />;
}
