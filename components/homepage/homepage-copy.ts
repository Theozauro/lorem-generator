import { deHomepageCopy } from "./homepage-copy/de";
import { enHomepageCopy } from "./homepage-copy/en";
import { esHomepageCopy } from "./homepage-copy/es";
import { frHomepageCopy } from "./homepage-copy/fr";
import { itHomepageCopy } from "./homepage-copy/it";
import { nlHomepageCopy } from "./homepage-copy/nl";
import { ptbrHomepageCopy } from "./homepage-copy/pt-br";
import { trHomepageCopy } from "./homepage-copy/tr";
import type { HomepageCopy, HomepageLocale } from "./homepage-copy/types";

export type { HomepageCopy, HomepageLocale } from "./homepage-copy/types";

export const homepageCopy: Record<HomepageLocale, HomepageCopy> = {
  en: enHomepageCopy,
  it: itHomepageCopy,
  es: esHomepageCopy,
  fr: frHomepageCopy,
  de: deHomepageCopy,
  "pt-BR": ptbrHomepageCopy,
  "nl-NL": nlHomepageCopy,
  tr: trHomepageCopy,
};
