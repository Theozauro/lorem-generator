import { EditorialSection, EditorialTable } from "./italian-editorial";

const faqItems = [
  ["Mi a különbség a Lorem Ipsum és a tematikus Ipsum között?", "A hagyományos Lorem Ipsum semleges pszeudolatin szöveget használ. A tematikus Ipsum ezzel szemben egy adott iparághoz vagy kontextushoz kapcsolódó szókincset és kifejezéseket tartalmazó helykitöltő szöveget generál."],
  ["Kiválaszthatom a szöveg nyelvét?", "Igen. A magyar oldalon ugyanazt a témát és módot megtartva magyar vagy angol tematikus Ipsumot generálhatsz."],
  ["Pontosan meghatározott mennyiségű szöveget generálhatok?", "Igen. Beállíthatod a szavak és bekezdések számát, a mondatok számát vagy a karakterek pontos mennyiségét."],
  ["Mire használható a tematikus helykitöltő szöveg?", "Segít valószerűbb mockupok és prototípusok készítésében, különösen akkor, amikor a projektre jellemző szókincs hatással van a layout megjelenésére."],
  ["A tematikus szövegek végleges tartalomnak számítanak?", "Nem. Tervezéshez, teszteléshez és prototípuskészítéshez szánt ideiglenes tartalmak, amelyeket később végleges szövegre kell cserélni."],
];

export function HungarianThemedEditorial() {
  return <>
    <EditorialSection id="hungarian-themed-explanation" eyebrow="KONTEXTUSHOZ IGAZÍTOTT HELYKITÖLTŐ SZÖVEG" title="Mi az a tematikus Ipsum?" split>
      <p>A tematikus Ipsum egy adott iparág vagy kontextus köré épített helykitöltő szöveg. Ugyanazt az alapvető szerepet tölti be, mint a hagyományos Lorem Ipsum, de technológiához, mesterséges intelligenciához, designhoz, divathoz vagy üzleti környezethez kapcsolódó szókincset és kifejezéseket használ.</p>
      <p>Akkor hasznos, amikor a hagyományos pszeudolatin szöveg nem tükrözi elég jól a projektben később megjelenő tartalom jellegét. Egy SaaS-termék mockupja, egy AI-témájú landing page vagy egy divat-lookbook valószerűbb hatást kelt, ha a szöveg a végleges kontextushoz közelebb álló kifejezéseket használ.</p>
    </EditorialSection>
    <EditorialSection id="hungarian-themed-comparison" eyebrow="KLASSZIKUS VAGY TEMATIKUS" title="Klasszikus Lorem Ipsum vagy tematikus Ipsum?" split>
      <EditorialTable label="A klasszikus Lorem Ipsum és a tematikus Ipsum összehasonlítása" compact headers={["Klasszikus Lorem Ipsum", "Tematikus Ipsum"]} rows={[
        ["Semleges pszeudolatin szöveg", "Meghatározott kontextushoz kapcsolódó szöveg"],
        ["Ideális kompozíció és térköz tesztelésére", "Hasznos valószerűbb mockupokhoz"],
        ["Nem kapcsolódik meghatározott iparághoz", "Üzleti, Tech, AI, Design, Divat vagy Zombi terminológiát használ"],
        ["Általános tesztekhez megfelelő", "Kontextushoz kötött prototípusokhoz alkalmasabb"],
      ]} />
      <p>Mindkettő egy layout tesztelésére szolgál. A különbség a valószerűség szintjében rejlik: a klasszikus Lorem Ipsum semleges marad, míg a tematikus Ipsum jobban szimulálja azt a nyelvezetet, amely a végleges projektben is megjelenhet.</p>
    </EditorialSection>
    <EditorialSection id="hungarian-themed-quantity" eyebrow="JAVASOLT MENNYISÉGEK" title="Mennyi tematikus szöveget érdemes generálni?" split>
      <EditorialTable label="Javasolt tematikus szövegmennyiség felhasználási területenként" compact headers={["Felhasználás", "Javasolt mennyiség"]} rows={[
        ["UI-kártya", "100–150 karakter"], ["Hero vagy teaser", "150–250 karakter"],
        ["Termékmodul", "50–100 szó"], ["Landing page szakasz", "2–3 bekezdés"],
        ["Szerkesztőségi mockup", "3–5 bekezdés"], ["Hosszú formátumú prototípus", "250+ szó"],
      ]} />
    </EditorialSection>
    <section className="faq-section" aria-labelledby="hungarian-themed-faq-title">
      <div className="faq-heading"><span className="eyebrow">KÉRDÉSEK A TEMATIKUS IPSUMRÓL</span><h2 id="hungarian-themed-faq-title">GYIK a tematikus Ipsumról</h2></div>
      <div className="faq-list">{faqItems.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
    </section>
  </>;
}
