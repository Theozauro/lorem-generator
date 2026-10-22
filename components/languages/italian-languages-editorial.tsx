import { EditorialSection, EditorialTable } from "@/components/homepage/italian-editorial";
import styles from "./languages-generator.module.css";

const faqItems = [
  ["Perché Lorem Ipsum non è sufficiente per testare un layout giapponese o cinese?", "Lorem Ipsum riproduce la densità e il ritmo di un testo basato sull’alfabeto latino. Giapponese e cinese utilizzano sistemi di scrittura e regole di spaziatura e ritorno a capo differenti, quindi un layout può comportarsi in modo diverso quando viene riempito con testo realistico."],
  ["Il giapponese e il cinese usano spazi tra le parole?", "Normalmente no. Per questo non bisogna aggiungere spazi artificiali solo per rendere il testo più simile all’italiano o all’inglese."],
  ["Qual è la differenza tra cinese semplificato e tradizionale per un layout?", "Cambiano i caratteri utilizzati e possono cambiare anche alcune convenzioni tipografiche a seconda del mercato. Per questo è utile testarli separatamente invece di considerarli una semplice sostituzione grafica."],
  ["Il coreano usa gli spazi?", "Sì. Il coreano moderno utilizza normalmente spazi tra gruppi di parole, quindi il comportamento del testo non coincide con quello del giapponese o del cinese."],
  ["Come vengono contate le parole nelle lingue asiatiche?", "Dipende dalla lingua. Nel giapponese il generatore utilizza la segmentazione linguistica del browser per individuare le unità testuali anche quando non sono presenti spazi tra le parole."],
  ["Posso usare questi testi come traduzione o contenuto definitivo?", "No. Sono testi segnaposto pensati per testare layout, interfacce e prototipi. Devono essere sostituiti con contenuti reali e revisionati prima della pubblicazione."],
] as const;

export function ItalianLanguagesEditorial() {
  return <>
    <EditorialSection id="languages-layout" eyebrow="LAYOUT MULTILINGUA" title="Testare un layout multilingua" split>
      <p>Impaginare un’interfaccia in giapponese, cinese o coreano non significa semplicemente sostituire il testo latino con altri caratteri. Densità visiva, spaziatura, punteggiatura e ritorni a capo possono comportarsi in modo diverso e cambiare l’equilibrio di card, menu, pulsanti e pagine editoriali.</p>
      <p>Il testo segnaposto nella lingua selezionata permette di verificare il comportamento reale del layout prima che siano disponibili traduzioni e contenuti definitivi. È utile anche quando il team non ha familiarità con la lingua del progetto.</p>
    </EditorialSection>
    <EditorialSection id="languages-scripts" eyebrow="SCRITTURE ASIATICHE" title="Giapponese, cinese e coreano: cosa cambia nel layout" split>
      <EditorialTable label="Confronto tra scritture asiatiche e comportamento nel layout" compact headers={["Lingua", "Scrittura", "Spazi tra parole", "Da controllare"]} rows={[
        ["Giapponese", "Kanji, hiragana e katakana", "Normalmente no", "Ritorni a capo, punteggiatura, densità visiva"],
        ["Cinese semplificato", "Caratteri Han semplificati", "Normalmente no", "Larghezza dei caratteri, punteggiatura, testo misto"],
        ["Cinese tradizionale", "Caratteri Han tradizionali", "Normalmente no", "Densità, convenzioni regionali, wrapping"],
        ["Coreano", "Hangul, con eventuali elementi latini o Hanja", "Sì", "Spaziatura, lunghezza delle parole, wrapping"],
      ]} />
    </EditorialSection>
    <EditorialSection id="languages-japanese" eyebrow="GIAPPONESE — 日本語" title="Impaginare il testo giapponese" split>
      <p>Il giapponese combina normalmente kanji, hiragana e katakana nello stesso testo e non utilizza spazi tra le parole come l’italiano. Per questo un layout progettato con Lorem Ipsum può comportarsi in modo diverso quando viene riempito con contenuto giapponese.</p>
      <p>Quando testi un’interfaccia, controlla soprattutto i ritorni a capo, l’altezza delle righe e la posizione della punteggiatura. Evita di aggiungere manualmente spazi tra i caratteri per rendere il testo più leggibile: modificheresti il comportamento reale della lingua e otterresti un test poco rappresentativo.</p>
    </EditorialSection>
    <EditorialSection id="languages-simplified-chinese" eyebrow="CINESE SEMPLIFICATO — 简体中文" title="Testare layout con cinese semplificato" split>
      <p>Il cinese semplificato utilizza caratteri Han e normalmente non separa le parole con spazi. La densità del testo può quindi risultare molto diversa rispetto a una pagina progettata in italiano o inglese.</p>
      <p>Durante i test, controlla soprattutto i ritorni a capo, la punteggiatura, i componenti stretti e i blocchi che mescolano caratteri cinesi, numeri o parole latine. Non aggiungere spazi artificiali tra i caratteri e non ridurre automaticamente il font per far rientrare il testo.</p>
    </EditorialSection>
    <EditorialSection id="languages-traditional-chinese" eyebrow="CINESE TRADIZIONALE — 繁體中文" title="Cinese tradizionale: non è solo una variante grafica" split>
      <p>Il cinese tradizionale utilizza caratteri che possono risultare visivamente più complessi, ma la differenza rispetto al cinese semplificato non riguarda soltanto la forma dei glifi. Anche le convenzioni tipografiche possono variare tra mercati e contesti diversi.</p>
      <p>Per un mockup è quindi utile testare il cinese tradizionale separatamente invece di considerarlo una semplice sostituzione del semplificato. Controlla in particolare densità, punteggiatura, righe corte e componenti che mescolano caratteri cinesi, numeri e testo latino.</p>
    </EditorialSection>
    <EditorialSection id="languages-korean" eyebrow="COREANO — 한국어" title="Il coreano si comporta diversamente da giapponese e cinese" split>
      <p>Il coreano moderno utilizza principalmente Hangul e, a differenza del giapponese e del cinese, usa normalmente spazi tra gruppi di parole. Per questo non conviene applicare automaticamente al coreano le stesse regole usate per gli altri sistemi di scrittura asiatici.</p>
      <p>Nel testo coreano, conserva gli spazi presenti nel testo e verifica come le parole si distribuiscono su righe strette, pulsanti, menu e card. Controlla anche la combinazione di Hangul con numeri e termini latini, frequente nelle interfacce digitali.</p>
    </EditorialSection>
    <EditorialSection id="languages-checklist" eyebrow="CHECK DEL LAYOUT" title="Cosa controllare in un layout multilingua" split>
      <ul className={styles.checklist}>
        <li>Non inserire spazi a mano in giapponese o cinese.</li>
        <li>Controlla card, pulsanti e menu, non soltanto i paragrafi lunghi.</li>
        <li>Prova sempre larghezze mobili e righe molto corte.</li>
        <li>Verifica che punteggiatura e ritorni a capo non producano risultati visivamente anomali.</li>
        <li>Mantieni il corretto attributo <code>lang</code> nell’HTML.</li>
        <li>Usa il testo segnaposto per verificare il layout, non come traduzione o contenuto definitivo.</li>
      </ul>
    </EditorialSection>
    <EditorialSection id="languages-modes" eyebrow="QUANTITÀ E FORMATO" title="Parole, caratteri o frasi? Scegli anche quanti paragrafi generare." split>
      <EditorialTable label="Modalità di generazione e casi d’uso" compact headers={["Modalità", "Quando usarla"]} rows={[
        ["Parole + paragrafi", "Per simulare sezioni editoriali, descrizioni lunghe e pagine con più blocchi di contenuto."],
        ["Caratteri", "Per testare card, teaser, modali e componenti con limiti di spazio precisi."],
        ["Frasi", "Per descrizioni brevi, messaggi, moduli e blocchi di testo compatti."],
      ]} />
      <p>In lingue come il giapponese, dove gli spazi non indicano i confini delle parole, il generatore utilizza la segmentazione linguistica del browser per calcolare il numero richiesto.</p>
    </EditorialSection>
    <section className="faq-section" aria-labelledby="languages-faq-title">
      <div className="faq-heading"><span className="eyebrow">DOMANDE FREQUENTI</span><h2 id="languages-faq-title">Testo segnaposto per lingue asiatiche: FAQ</h2></div>
      <div className="faq-list">{faqItems.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
    </section>
  </>;
}
