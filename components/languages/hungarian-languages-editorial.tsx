import { EditorialSection, EditorialTable } from "@/components/homepage/italian-editorial";
import styles from "./languages-generator.module.css";

const faqItems = [
  ["Miért érdemes ázsiai írásrendszerekkel is tesztelni az elrendezést?", "A japán, a kínai és a koreai szöveg karakterei, térközei és sortörései eltérnek a latin betűs szövegekétől. Emiatt ugyanaz a felület másképp viselkedhet, ha más írásrendszerű tartalommal jelenik meg."],
  ["A japán és a kínai szövegben vannak szóközök?", "A japánban és a kínaiban általában nem választják el szóközök a szavakat. A mesterségesen beszúrt szóközök megváltoztatnák a szöveg tördelését."],
  ["Mi a különbség az egyszerűsített és a hagyományos kínai között?", "A két változat eltérő kínai karaktereket használ, és a tipográfiai szokások is különbözhetnek a piacok szerint. Érdemes külön-külön ellenőrizni őket."],
  ["A koreai szövegben használnak szóközöket?", "Igen. A modern koreai szövegben a szókapcsolatokat általában szóköz választja el, ezért másképp tördelődik, mint a japán vagy a kínai."],
  ["Hogyan számolja a generátor a szavakat ezekben a nyelvekben?", "A számítás a kiválasztott nyelvhez igazodik. Japán szövegnél a böngésző nyelvi szegmentálása azonosítja az egységeket, mivel a szavak között rendszerint nincs szóköz."],
  ["Használhatom a generált szöveget fordításként vagy végleges tartalomként?", "Nem. A szöveg elrendezések és felületek tesztelésére szolgál. Közzététel előtt cseréld le ellenőrzött, valódi tartalomra."],
] as const;

export function HungarianLanguagesEditorial() {
  return <>
    <EditorialSection id="languages-layout" eyebrow="TÖBBNYELVŰ ELRENDEZÉSEK" title="Ázsiai írásrendszerek tesztelése a felületen" split>
      <p>A japán, a kínai és a koreai szöveg eltérően tölti ki a rendelkezésre álló teret. A karakterek sűrűsége, a központozás, a sortörés és a sorköz is befolyásolhatja a kártyák, menük, gombok és hosszabb tartalmi blokkok megjelenését.</p>
      <p>A kiválasztott nyelvű mintaszöveg segít ellenőrizni a tördelést és a térközöket a végleges lokalizáció előtt. Akkor is hasznos, ha a csapat még nem dolgozik rendszeresen az adott nyelvvel.</p>
    </EditorialSection>
    <EditorialSection id="languages-scripts" eyebrow="ÍRÁSRENDSZEREK" title="Japán, kínai és koreai: eltérő tördelési igények" split>
      <EditorialTable label="Az ázsiai írásrendszerek és a tördelés összehasonlítása" compact headers={["Nyelv", "Írás", "Szóközök", "Ellenőrizendő"]} rows={[
        ["Japán", "Kanji, hiragana és katakana", "Általában nincsenek", "Sortörés, központozás, vizuális sűrűség"],
        ["Egyszerűsített kínai", "Egyszerűsített han karakterek", "Általában nincsenek", "Karakterek szélessége, központozás, vegyes szöveg"],
        ["Hagyományos kínai", "Hagyományos han karakterek", "Általában nincsenek", "Sűrűség, regionális szokások, tördelés"],
        ["Koreai", "Hangul, esetenként hanja vagy latin betűk", "Igen", "Szóközök, sorhossz, tördelés"],
      ]} />
    </EditorialSection>
    <EditorialSection id="languages-japanese" eyebrow="JAPÁN — 日本語" title="Japán szöveg tördelésének ellenőrzése" split>
      <p>A japán szövegben kanji, hiragana és katakana is előfordul, a szavakat pedig általában nem választják el szóközök. Emiatt a latin betűs Lorem Ipsum alapján megfelelőnek tűnő elrendezés japán tartalommal máshogy viselkedhet.</p>
      <p>Figyeld a sortöréseket, a sorok magasságát és az írásjelek helyét. Ne szúrj be kézzel szóközöket a karakterek közé, mert ezzel megváltozna a nyelv természetes tördelése.</p>
    </EditorialSection>
    <EditorialSection id="languages-chinese" eyebrow="KÍNAI — 中文" title="Egyszerűsített és hagyományos kínai" split>
      <p>Az egyszerűsített és a hagyományos kínai eltérő han karaktereket használ. A karakterek sűrűsége és a regionális tipográfiai szokások szintén hatással lehetnek az elrendezésre.</p>
      <p>Vizsgáld meg külön mindkét változatot, különösen keskeny felületeken, központozásnál, valamint számokat és latin kifejezéseket tartalmazó szövegben.</p>
    </EditorialSection>
    <EditorialSection id="languages-korean" eyebrow="KOREAI — 한국어" title="A koreai tördelés külön ellenőrzése" split>
      <p>A modern koreai nyelv főként hangult használ, és a szókapcsolatok között rendszerint szóköz áll. Ezért a szöveg keskeny sorokban másképp tördelődik, mint a japán vagy a kínai.</p>
      <p>Ellenőrizd a szóközöket és a sortöréseket gombokban, menükben és kártyákon. A koreai szövegben számok és latin szakkifejezések is gyakran szerepelnek, ezért ezek együttállását is érdemes tesztelni.</p>
    </EditorialSection>
    <EditorialSection id="languages-checklist" eyebrow="ELRENDEZÉS-ELLENŐRZÉS" title="Mire figyelj többnyelvű felületeken?" split>
      <ul className={styles.checklist}>
        <li>Japán és kínai szövegben ne adj hozzá kézzel szóközöket.</li>
        <li>A hosszú bekezdések mellett kártyákat, gombokat és menüket is vizsgálj.</li>
        <li>Tesztelj mobilnézetben és keskeny szövegsorokkal is.</li>
        <li>Ellenőrizd a központozást, a sortöréseket és a sorközöket.</li>
        <li>A HTML-ben használd a szöveg nyelvének megfelelő <code>lang</code> attribútumot.</li>
        <li>A mintaszöveget elrendezésteszthez használd, ne fordításként vagy végleges tartalomként.</li>
      </ul>
    </EditorialSection>
    <EditorialSection id="languages-modes" eyebrow="MENNYISÉG ÉS FORMÁTUM" title="Szavak, karakterek vagy mondatok? A bekezdések számát is megadhatod." split>
      <EditorialTable label="Generálási módok és felhasználásuk" compact headers={["Mód", "Mikor hasznos?"]} rows={[
        ["Szavak", "Hosszabb leírások, szerkesztőségi blokkok és több bekezdéses oldalak teszteléséhez."],
        ["Karakterek", "Kártyák, rövid leírások és rögzített karakterszámú mezők ellenőrzéséhez."],
        ["Mondatok", "Rövid leírások, üzenetek, űrlapok és tömör szövegblokkok teszteléséhez."],
      ]} />
      <p>A japánhoz hasonló nyelveknél, ahol a szóközök nem jelölik a szavak határát, a generátor a böngésző nyelvi szegmentálását használja a kért szószám kiszámításához.</p>
    </EditorialSection>
    <section className="faq-section" aria-labelledby="languages-faq-title">
      <div className="faq-heading"><span className="eyebrow">GYAKORI KÉRDÉSEK</span><h2 id="languages-faq-title">Ázsiai mintaszövegek: gyakori kérdések</h2></div>
      <div className="faq-list">{faqItems.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
    </section>
  </>;
}
