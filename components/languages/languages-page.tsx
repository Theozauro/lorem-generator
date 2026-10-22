import { ExperienceHeader } from "@/components/homepage/italian-experience-header";
import { HomepageFooter } from "@/components/homepage/home-page";
import { homepageCopy } from "@/components/homepage/homepage-copy";
import { LanguagesGenerator } from "./languages-generator";
import { ItalianLanguagesEditorial } from "./italian-languages-editorial";
import styles from "./languages-generator.module.css";

export function LanguagesPage() {
  const copy = homepageCopy.it;
  return <main className={`site-shell ${styles.page}`} lang="it"><div className="page-content italian-experience-page">
    <ExperienceHeader locale="it" active="languages" copy={copy} />
    <section className="main-section" aria-labelledby="languages-title">
      <div className="title-row"><div className="brand-lockup"><h1 id="languages-title">Generatore di testo in lingue asiatiche<span className="title-period">.</span></h1></div></div>
      <p className="seo-intro">Genera testo di prova nella lingua selezionata per testare interfacce, layout e prototipi multilingua. Verifica densità, ritorni a capo e spaziatura con conteggi precisi e output pronto da copiare.</p>
      <LanguagesGenerator />
    </section>
    <ItalianLanguagesEditorial />
    <HomepageFooter copy={copy} />
  </div></main>;
}
