import { ExperienceHeader } from "@/components/homepage/italian-experience-header";
import { HomepageFooter } from "@/components/homepage/home-page";
import { homepageCopy } from "@/components/homepage/homepage-copy";
import { LanguagesGenerator } from "./languages-generator";
import { ItalianLanguagesEditorial } from "./italian-languages-editorial";
import { EnglishLanguagesEditorial } from "./english-languages-editorial";
import { englishLanguagesCopy, italianLanguagesCopy } from "./copy";
import styles from "./languages-generator.module.css";

export function LanguagesPage({ locale = "it" }: { locale?: "en" | "it" }) {
  const isEnglish = locale === "en";
  const copy = homepageCopy[locale];
  return <main className={`site-shell ${styles.page}`} lang={locale}><div className="page-content italian-experience-page">
    <ExperienceHeader locale={locale} active="languages" copy={copy} />
    <section className="main-section" aria-labelledby="languages-title">
      <div className="title-row"><div className="brand-lockup"><h1 id="languages-title">{isEnglish ? "Asian-Language Placeholder Text Generator" : "Generatore di testo in lingue asiatiche"}<span className="title-period">.</span></h1></div></div>
      <p className="seo-intro">{isEnglish ? "Generate placeholder text in Japanese, Chinese or Korean to test multilingual interfaces, layouts and prototypes. Check visual density, line breaks and spacing with precise counts and copy-ready output." : "Genera testo di prova nella lingua selezionata per testare interfacce, layout e prototipi multilingua. Verifica densità, ritorni a capo e spaziatura con conteggi precisi e output pronto da copiare."}</p>
      <LanguagesGenerator copy={isEnglish ? englishLanguagesCopy : italianLanguagesCopy} />
    </section>
    {isEnglish ? <EnglishLanguagesEditorial /> : <ItalianLanguagesEditorial />}
    <HomepageFooter copy={copy} />
  </div></main>;
}
