import HomePage from "@/components/homepage/home-page";
import { ptbrHomepageCopy } from "@/components/homepage/homepage-copy/pt-br";

export default function BrazilianPortuguesePage() {
  return <HomePage locale="pt-BR" copy={ptbrHomepageCopy} />;
}
