import { ExperienceHeader } from "@/components/homepage/italian-experience-header";
import { HomepageFooter } from "@/components/homepage/home-page";
import { homepageCopy } from "@/components/homepage/homepage-copy";
import { LanguagesGenerator } from "./languages-generator";
import { ItalianLanguagesEditorial } from "./italian-languages-editorial";
import { EnglishLanguagesEditorial } from "./english-languages-editorial";
import { SpanishLanguagesEditorial } from "./spanish-languages-editorial";
import { FrenchLanguagesEditorial } from "./french-languages-editorial";
import { englishLanguagesCopy, frenchLanguagesCopy, italianLanguagesCopy, spanishLanguagesCopy } from "./copy";
import styles from "./languages-generator.module.css";

export function LanguagesPage({ locale = "it" }: { locale?: "en" | "it" | "es" | "fr" }) {
  const isEnglish = locale === "en";
  const isSpanish = locale === "es";
  const isFrench = locale === "fr";
  const copy = homepageCopy[locale];
  const languagesCopy = isEnglish ? englishLanguagesCopy : isSpanish ? spanishLanguagesCopy : isFrench ? frenchLanguagesCopy : italianLanguagesCopy;
  return <main className={`site-shell ${styles.page}`} lang={locale}><div className="page-content italian-experience-page">
    <ExperienceHeader locale={locale} active="languages" copy={copy} />
    <section className="main-section" aria-labelledby="languages-title">
      <div className="title-row"><div className="brand-lockup"><h1 id="languages-title">{languagesCopy.title}<span className="title-period">.</span></h1></div></div>
      <p className="seo-intro">{languagesCopy.intro}</p>
      <LanguagesGenerator copy={languagesCopy} />
    </section>
    {isEnglish ? <EnglishLanguagesEditorial /> : isSpanish ? <SpanishLanguagesEditorial /> : isFrench ? <FrenchLanguagesEditorial /> : <ItalianLanguagesEditorial />}
    <HomepageFooter copy={copy} />
  </div></main>;
}
