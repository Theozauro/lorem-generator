import type { ReactNode } from "react";
import styles from "./italian-editorial.module.css";

export const italianHomepageFaqItems: [string, string][] = [
  ["Lorem Ipsum significa davvero qualcosa?", "Il testo moderno deriva dal latino classico, ma è stato modificato e riorganizzato nel tempo. Per questo assomiglia visivamente a un testo naturale senza formare un discorso coerente."],
  ["Qual è la differenza tra Lorem Ipsum, dummy text e placeholder text?", "Dummy text e placeholder text sono termini generici per indicare testo temporaneo usato in un layout. Lorem Ipsum è uno dei tipi di testo segnaposto più diffusi."],
];

export function EditorialSection({ id, eyebrow, title, children, split = false }: { id: string; eyebrow: string; title: string; children: ReactNode; split?: boolean }) {
  return <section className={`${split ? "about-section" : "seo-content"} ${styles.section}`} aria-labelledby={id}>
    <div className={split ? undefined : "seo-content-heading"}><span className="eyebrow">{eyebrow}</span><h2 id={id}>{title}</h2></div>
    <div className={`about-copy${split ? "" : ` ${styles.content}`}`}>{children}</div>
  </section>;
}

export function EditorialTable({ label, headers, rows, compact = false }: { label: string; headers: string[]; rows: string[][]; compact?: boolean }) {
  return <div className={styles.tableScroll} role="region" aria-label={label} tabIndex={0}>
    <table className={`${styles.table}${compact ? ` ${styles.compactTable}` : ""}`}>
      <caption className="sr-only">{label}</caption>
      <thead><tr>{headers.map(header => <th key={header} scope="col">{header}</th>)}</tr></thead>
      <tbody>{rows.map(([first, ...rest]) => <tr key={first}><th scope="row">{first}</th>{rest.map((cell, index) => <td key={index}>{cell}</td>)}</tr>)}</tbody>
    </table>
  </div>;
}

export function ItalianHomepageEditorial() {
  return <>
    <EditorialSection id="italian-quantity-guide" eyebrow="GUIDA RAPIDA" title="Quanto Lorem Ipsum usare?" split>
      <p>La quantità di testo segnaposto dipende dal componente che stai progettando. Per una card o un sottotitolo bastano poche righe; per una pagina editoriale servono invece più paragrafi per valutare ritmo, spaziatura e comportamento del layout.</p>
      <EditorialTable label="Quantità di Lorem Ipsum consigliate per caso d’uso" compact headers={["Caso d’uso", "Quantità consigliata", "Modalità"]} rows={[
        ["Microcopy o didascalia", "100–150 caratteri", "Caratteri"],
        ["Sottotitolo hero", "150–250 caratteri", "Caratteri"],
        ["Card prodotto o servizio", "50–80 parole", "Parole"],
        ["Blocco descrittivo", "circa 100 parole", "Parole"],
        ["Anteprima articolo", "150–250 parole", "Parole"],
        ["Sezione editoriale", "3–5 paragrafi", "Parole + paragrafi"],
        ["Layout long-form", "5–8 paragrafi", "Parole + paragrafi"],
      ]} />
      <p>Questi valori non sono regole rigide: servono come punto di partenza per simulare quantità realistiche di contenuto. Se devi verificare un vincolo preciso, usa invece la modalità Caratteri o imposta direttamente il numero di parole necessario.</p>
    </EditorialSection>
    <EditorialSection id="italian-content-testing" eyebrow="TESTARE IL CONTENUTO" title="Quando usare Lorem Ipsum e quando usare testo reale" split>
      <p>Lorem Ipsum è utile nelle prime fasi di progettazione, quando vuoi valutare struttura, tipografia, densità e comportamento dei componenti senza dipendere dal copy definitivo.</p>
      <div className={styles.listGrid}>
        <div><h3>Usa testo segnaposto per:</h3><ul>
          <li>wireframe e prototipi;</li><li>test responsive;</li><li>card, moduli e dashboard;</li><li>impaginazioni editoriali;</li><li>confronti tra diverse quantità di contenuto.</li>
        </ul></div>
        <div><h3>Passa invece al testo reale quando devi valutare:</h3><ul>
          <li>tono di voce;</li><li>comprensibilità;</li><li>gerarchie editoriali definitive;</li><li>lunghezze reali di nomi, CTA e messaggi;</li><li>accessibilità e qualità dell’esperienza finale.</li>
        </ul></div>
      </div>
      <p>Il Lorem Ipsum funziona meglio come strumento di progettazione temporaneo: aiuta a verificare il contenitore, mentre il copy reale serve a validare il prodotto finale.</p>
    </EditorialSection>
  </>;
}

const themedFaqItems = [
  ["Qual è la differenza tra Lorem Ipsum e Ipsum tematico?", "Il Lorem Ipsum tradizionale usa testo pseudolatino neutro. L’Ipsum tematico genera invece testo segnaposto con vocaboli e frasi legati a un settore specifico."],
  ["Posso scegliere la lingua?", "Sì. Nella pagina italiana puoi generare Ipsum tematico in italiano o in inglese mantenendo lo stesso tema e la stessa modalità."],
  ["Posso generare una quantità esatta di testo?", "Sì. Puoi impostare parole e paragrafi, frasi oppure un numero preciso di caratteri."],
  ["A cosa serve il testo segnaposto tematico?", "È utile per creare mockup e prototipi più realistici, soprattutto quando il lessico del progetto influisce sull’aspetto del layout."],
  ["I testi tematici sono contenuti finali?", "No. Sono pensati come contenuto temporaneo per progettazione, test e prototipazione e vanno sostituiti con il copy definitivo."],
];

export function ItalianThemedEditorial() {
  return <>
    <EditorialSection id="italian-themed-explanation" eyebrow="TESTO SEGNAPOSTO CONTESTUALE" title="Cos’è l’Ipsum tematico?" split>
      <p>L’Ipsum tematico è testo segnaposto costruito attorno a un settore o a un contesto specifico. Mantiene la funzione del Lorem Ipsum tradizionale, ma utilizza vocaboli, espressioni e frasi legate a temi come tecnologia, intelligenza artificiale, design, moda o business.</p>
      <p>È utile quando un semplice testo pseudolatino non basta a simulare il tipo di contenuto che comparirà davvero nel progetto. Un mockup per un prodotto SaaS, una landing page AI o un lookbook fashion risultano più realistici quando il testo usa termini vicini al contesto finale.</p>
    </EditorialSection>
    <EditorialSection id="italian-themed-comparison" eyebrow="CLASSICO O TEMATICO" title="Lorem Ipsum classico o Ipsum tematico?" split>
      <EditorialTable label="Confronto tra Lorem Ipsum classico e Ipsum tematico" compact headers={["Lorem Ipsum classico", "Ipsum tematico"]} rows={[
        ["Testo pseudolatino neutro", "Testo legato a un contesto"],
        ["Ideale per verificare composizione e spazi", "Utile per mockup più realistici"],
        ["Non richiama un settore specifico", "Usa terminologia Corporate, Tech, AI, Design, Fashion o Zombie"],
        ["Ottimo per test generici", "Più adatto a prototipi contestuali"],
      ]} />
      <p>Entrambi servono a testare un layout. La differenza è nel livello di realismo: il Lorem Ipsum classico mantiene il contenuto neutro, mentre l’Ipsum tematico simula meglio il tipo di linguaggio che potrebbe comparire nel progetto finale.</p>
    </EditorialSection>
    <EditorialSection id="italian-themed-quantity" eyebrow="QUANTITÀ CONSIGLIATE" title="Quanto testo tematico generare?" split>
      <EditorialTable label="Quantità di testo tematico consigliate per caso d’uso" compact headers={["Caso d’uso", "Quantità consigliata"]} rows={[
        ["UI card", "100–150 caratteri"],
        ["Hero o teaser", "150–250 caratteri"],
        ["Modulo prodotto", "50–100 parole"],
        ["Sezione landing page", "2–3 paragrafi"],
        ["Mockup editoriale", "3–5 paragrafi"],
        ["Prototipo long-form", "250+ parole"],
      ]} />
    </EditorialSection>
    <section className="faq-section" aria-labelledby="italian-themed-faq-title">
      <div className="faq-heading"><span className="eyebrow">DOMANDE SULL’IPSUM TEMATICO</span><h2 id="italian-themed-faq-title">FAQ sull’Ipsum tematico</h2></div>
      <div className="faq-list">{themedFaqItems.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
    </section>
  </>;
}
