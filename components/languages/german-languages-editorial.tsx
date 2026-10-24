import { EditorialSection, EditorialTable } from "@/components/homepage/italian-editorial";
import styles from "./languages-generator.module.css";

const faqItems = [
  ["Warum sollte ich Layouts mit asiatischen Schriftsystemen testen?", "Japanisch, Chinesisch und Koreanisch unterscheiden sich in Schriftzeichen, Wortabständen und Zeilenumbruch. Ein Layout, das mit lateinischem Text funktioniert, kann sich mit diesen Schriften anders verhalten."],
  ["Verwenden Japanisch und Chinesisch Leerzeichen zwischen Wörtern?", "In der Regel nicht. Künstlich eingefügte Leerzeichen würden das tatsächliche Umbruchverhalten verändern und den Layouttest weniger aussagekräftig machen."],
  ["Was ist der Unterschied zwischen vereinfachtem und traditionellem Chinesisch?", "Die Varianten verwenden unterschiedliche Han-Zeichen und können je nach Markt auch typografisch anders eingesetzt werden. Teste sie deshalb getrennt."],
  ["Verwendet Koreanisch Leerzeichen?", "Ja. Im modernen Koreanisch werden Wortgruppen üblicherweise durch Leerzeichen getrennt. Dadurch verhält es sich beim Umbruch anders als Japanisch und Chinesisch."],
  ["Wie zählt der Generator Wörter in diesen Sprachen?", "Die Zählweise richtet sich nach der gewählten Sprache. Für Japanisch nutzt der Generator die Sprachsegmentierung des Browsers, da Wörter im Fließtext meist nicht durch Leerzeichen getrennt sind."],
  ["Kann ich den generierten Text als Übersetzung verwenden?", "Nein. Der Text dient zum Testen von Oberflächen und Layouts. Er ersetzt keine Übersetzung und sollte vor der Veröffentlichung durch geprüfte Inhalte ersetzt werden."],
] as const;

export function GermanLanguagesEditorial() {
  return <>
    <EditorialSection id="languages-layout" eyebrow="MEHRSPRACHIGES DESIGN" title="Oberflächen für mehrere Schriftsysteme testen" split>
      <p>Japanische, chinesische und koreanische Texte verändern die visuelle Dichte, den Zeilenumbruch und den Platzbedarf von Komponenten. Ein mehrsprachiger Layouttest hilft, Karten, Menüs, Schaltflächen und längere Textbereiche schon vor der finalen Lokalisierung zu prüfen.</p>
      <p>Blindtext in der gewählten Sprache macht typische Umbruch- und Abstandsprobleme sichtbar. Er ist auch hilfreich, wenn ein Team mit der Projektsprache nicht vertraut ist.</p>
    </EditorialSection>
    <EditorialSection id="languages-scripts" eyebrow="SCHRIFTSYSTEME" title="Japanisch, Chinesisch und Koreanisch im Vergleich" split>
      <EditorialTable label="Schriftsysteme und typische Layoutmerkmale" compact headers={["Sprache", "Schrift", "Wortabstände", "Im Layout prüfen"]} rows={[
        ["Japanisch", "Kanji, Hiragana und Katakana", "Meist keine", "Umbruch, Satzzeichen und Textdichte"],
        ["Vereinfachtes Chinesisch", "Vereinfachte Han-Zeichen", "Meist keine", "Zeichenbreite, Satzzeichen und gemischter Text"],
        ["Traditionelles Chinesisch", "Traditionelle Han-Zeichen", "Meist keine", "Dichte, regionale Konventionen und Umbruch"],
        ["Koreanisch", "Hangul, gelegentlich Hanja oder lateinischer Text", "Ja", "Wortabstände, Zeilenlänge und Umbruch"],
      ]} />
    </EditorialSection>
    <EditorialSection id="languages-japanese" eyebrow="JAPANISCH — 日本語" title="Layouts mit japanischem Text prüfen" split>
      <p>Japanisch kombiniert meist Kanji, Hiragana und Katakana. Wörter werden im Fließtext normalerweise nicht durch Leerzeichen getrennt. Deshalb kann sich ein mit Lorem Ipsum geprüftes Layout mit japanischem Text anders verhalten.</p>
      <p>Achte auf Zeilenumbrüche, Zeilenhöhe und die Position der Satzzeichen. Füge nicht manuell Leerzeichen zwischen Zeichen ein, denn dadurch würde der reale Schriftsatz verfälscht.</p>
    </EditorialSection>
    <EditorialSection id="languages-chinese" eyebrow="CHINESISCH — 中文" title="Beide chinesischen Schriftvarianten berücksichtigen" split>
      <p>Vereinfachtes und traditionelles Chinesisch unterscheiden sich nicht nur in der Form der Zeichen. Regionale typografische Konventionen und die Dichte der Zeichen können ebenfalls Einfluss auf ein Layout haben.</p>
      <p>Prüfe beide Varianten separat und achte besonders auf schmale Komponenten, Satzzeichen sowie die Kombination chinesischer Zeichen mit Zahlen und lateinischen Begriffen.</p>
    </EditorialSection>
    <EditorialSection id="languages-korean" eyebrow="KOREANISCH — 한국어" title="Koreanischen Text separat testen" split>
      <p>Modernes Koreanisch wird überwiegend mit Hangul geschrieben. Anders als Japanisch und Chinesisch enthält es gewöhnlich Leerzeichen zwischen Wortgruppen; das verändert die Verteilung des Textes auf schmalen Zeilen.</p>
      <p>Prüfe Abstände und Umbrüche in Schaltflächen, Menüs und Karten. Achte auch auf die Kombination von Hangul mit Zahlen und lateinischen Fachbegriffen, wie sie in digitalen Oberflächen häufig vorkommt.</p>
    </EditorialSection>
    <EditorialSection id="languages-checklist" eyebrow="LAYOUTPRÜFUNG" title="Worauf es bei mehrsprachigen Layouts ankommt" split>
      <ul className={styles.checklist}>
        <li>Füge in japanischen und chinesischen Texten keine Leerzeichen manuell ein.</li>
        <li>Prüfe nicht nur lange Absätze, sondern auch Karten, Schaltflächen und Menüs.</li>
        <li>Teste schmale Ansichten und besonders kurze Zeilen.</li>
        <li>Kontrolliere Satzzeichen, Umbrüche und die Höhe der Textzeilen.</li>
        <li>Verwende für jeden Text das passende HTML-Attribut <code>lang</code>.</li>
        <li>Nutze Blindtext für Layouttests, nicht als Übersetzung oder finalen Inhalt.</li>
      </ul>
    </EditorialSection>
    <EditorialSection id="languages-modes" eyebrow="MENGE UND FORMAT" title="Wörter, Zeichen oder Sätze? Lege auch die Absatzanzahl fest." split>
      <EditorialTable label="Generierungsmodi und ihre Verwendung" compact headers={["Modus", "Geeignet für"]} rows={[
        ["Wörter", "Redaktionelle Bereiche, Beschreibungen und Seiten mit mehreren Inhaltsblöcken."],
        ["Zeichen", "Karten, Vorschauen und Komponenten mit einer festen Zeichenbegrenzung."],
        ["Sätze", "Kurze Beschreibungen, Hinweise, Formulare und kompakte Textblöcke."],
      ]} />
      <p>In Sprachen wie Japanisch, in denen Leerzeichen Wörter nicht voneinander abgrenzen, verwendet der Generator die Sprachsegmentierung des Browsers für die Wortzählung.</p>
    </EditorialSection>
    <section className="faq-section" aria-labelledby="languages-faq-title">
      <div className="faq-heading"><span className="eyebrow">HÄUFIGE FRAGEN</span><h2 id="languages-faq-title">Asiatische Blindtexte: häufige Fragen</h2></div>
      <div className="faq-list">{faqItems.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
    </section>
  </>;
}
