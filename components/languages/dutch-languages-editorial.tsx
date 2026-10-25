import { EditorialSection, EditorialTable } from "@/components/homepage/italian-editorial";
import styles from "./languages-generator.module.css";

const faqItems = [
  ["Waarom test ik een interface met Japanse, Chinese of Koreaanse tekst?", "Schriftsystemen verschillen in tekenvormen, woordspaties en regelafbreking. Daardoor kan een interface met Aziatische tekst anders uitlijnen dan met Latijnse tekst."],
  ["Gebruiken Japans en Chinees spaties tussen woorden?", "Meestal niet. Voeg daarom geen spaties tussen tekens toe: dat zou het werkelijke afbreekgedrag veranderen."],
  ["Wat is het verschil tussen vereenvoudigd en traditioneel Chinees?", "Beide varianten gebruiken andere Han-tekens. Ook de typografische conventies kunnen per regio verschillen, dus test ze afzonderlijk."],
  ["Gebruikt Koreaans spaties?", "Ja. In modern Koreaans staan er doorgaans spaties tussen woordgroepen. Dat beïnvloedt hoe de tekst op smalle regels afbreekt."],
  ["Hoe telt de generator woorden in deze talen?", "De telling hangt af van de gekozen taal. Voor Japans gebruikt de generator de taalherkenning van de browser, omdat woorden meestal niet met spaties worden gescheiden."],
  ["Kan ik de gegenereerde tekst als vertaling gebruiken?", "Nee. De tekst is bedoeld om interfaces en layouts te testen. Vervang deze vóór publicatie door vertaalde en gecontroleerde inhoud."],
] as const;

export function DutchLanguagesEditorial() {
  return <>
    <EditorialSection id="languages-layout" eyebrow="MEERTALIGE LAYOUTS" title="Interfaces met meerdere schriften testen" split>
      <p>Japanse, Chinese en Koreaanse tekst kan de visuele dichtheid, regelafbreking en benodigde ruimte van componenten veranderen. Met een meertalige layouttest controleer je kaarten, menu’s, knoppen en langere tekstblokken voordat de definitieve lokalisatie klaar is.</p>
      <p>Tekst in de gekozen taal maakt zichtbaar hoe regels en tussenruimtes zich gedragen. Dat is ook handig wanneer een team de projecttaal niet dagelijks gebruikt.</p>
    </EditorialSection>
    <EditorialSection id="languages-scripts" eyebrow="SCHRIFTSYSTEMEN" title="Japans, Chinees en Koreaans vergeleken" split>
      <EditorialTable label="Schriftsystemen en aandachtspunten voor layouts" compact headers={["Taal", "Schrift", "Spaties", "Controleer"]} rows={[
        ["Japans", "Kanji, hiragana en katakana", "Meestal niet", "Regelafbreking, leestekens en tekstdichtheid"],
        ["Vereenvoudigd Chinees", "Vereenvoudigde Han-tekens", "Meestal niet", "Tekenbreedte, leestekens en gemengde tekst"],
        ["Traditioneel Chinees", "Traditionele Han-tekens", "Meestal niet", "Dichtheid, regionale conventies en afbreking"],
        ["Koreaans", "Hangul, soms Hanja of Latijnse tekst", "Ja", "Woordspaties, regellengte en afbreking"],
      ]} />
    </EditorialSection>
    <EditorialSection id="languages-japanese" eyebrow="JAPANS — 日本語" title="Layouts met Japanse tekst testen" split>
      <p>Japans combineert doorgaans kanji, hiragana en katakana. Woorden worden in lopende tekst meestal niet door spaties gescheiden. Een layout die met Lorem Ipsum werkt, kan zich daarom anders gedragen met Japanse inhoud.</p>
      <p>Let op regelafbreking, regelhoogte en de positie van leestekens. Voeg geen spaties tussen tekens toe; daarmee zou je de natuurlijke tekstweergave veranderen.</p>
    </EditorialSection>
    <EditorialSection id="languages-chinese" eyebrow="CHINEES — 中文" title="Test beide Chinese schrijfvarianten" split>
      <p>Vereenvoudigd en traditioneel Chinees verschillen niet alleen in de vorm van de tekens. Regionale typografische conventies en tekstdichtheid kunnen eveneens invloed hebben op een interface.</p>
      <p>Test beide varianten afzonderlijk en let op smalle componenten, leestekens en combinaties van Chinese tekens met cijfers of Latijnse tekst.</p>
    </EditorialSection>
    <EditorialSection id="languages-korean" eyebrow="KOREAANS — 한국어" title="Koreaanse tekst afzonderlijk testen" split>
      <p>Modern Koreaans wordt vooral met Hangul geschreven. Anders dan Japans en Chinees gebruikt het doorgaans spaties tussen woordgroepen, wat de verdeling van tekst over korte regels beïnvloedt.</p>
      <p>Controleer de spatiëring en afbreking in knoppen, menu’s en kaarten. Let ook op combinaties van Hangul met cijfers en Latijnse vaktermen, die vaak voorkomen in digitale interfaces.</p>
    </EditorialSection>
    <EditorialSection id="languages-checklist" eyebrow="LAYOUTCONTROLE" title="Waar let je op bij meertalige layouts?" split>
      <ul className={styles.checklist}>
        <li>Voeg geen handmatige spaties toe in Japanse of Chinese tekst.</li>
        <li>Test ook kaarten, knoppen en menu’s, niet alleen lange alinea’s.</li>
        <li>Controleer smalle schermen en korte regels.</li>
        <li>Bekijk leestekens, regelafbreking en regelhoogte.</li>
        <li>Gebruik voor elke tekst het juiste HTML-attribuut <code>lang</code>.</li>
        <li>Gebruik de tekst voor layouttests, niet als vertaling of definitieve inhoud.</li>
      </ul>
    </EditorialSection>
    <EditorialSection id="languages-modes" eyebrow="HOEVEELHEID EN OPMAAK" title="Woorden, tekens of zinnen? Kies ook het aantal alinea’s." split>
      <EditorialTable label="Generatiemodi en waarvoor je ze gebruikt" compact headers={["Modus", "Geschikt voor"]} rows={[
        ["Woorden", "Redactionele onderdelen, beschrijvingen en pagina’s met meerdere tekstblokken."],
        ["Tekens", "Kaarten, previews en componenten met een vaste tekenlimiet."],
        ["Zinnen", "Korte beschrijvingen, meldingen, formulieren en compacte tekstblokken."],
      ]} />
      <p>Voor talen zoals Japans, waarin spaties geen woordgrenzen aangeven, gebruikt de generator de taalsegmentatie van de browser om woorden te tellen.</p>
    </EditorialSection>
    <section className="faq-section" aria-labelledby="languages-faq-title">
      <div className="faq-heading"><span className="eyebrow">VEELGESTELDE VRAGEN</span><h2 id="languages-faq-title">Aziatisch Ipsum: veelgestelde vragen</h2></div>
      <div className="faq-list">{faqItems.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
    </section>
  </>;
}
