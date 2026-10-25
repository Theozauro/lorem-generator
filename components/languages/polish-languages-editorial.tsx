import { EditorialSection, EditorialTable } from "@/components/homepage/italian-editorial";
import styles from "./languages-generator.module.css";

const faqItems = [
  ["Po co testować interfejsy tekstem japońskim, chińskim lub koreańskim?", "Różne systemy pisma wpływają na gęstość tekstu, łamanie wierszy i odstępy. Test z wybranym językiem pomaga sprawdzić, jak zachowują się przyciski, karty, menu i dłuższe bloki treści."],
  ["Czy w języku japońskim i chińskim używa się spacji między słowami?", "Zazwyczaj nie. Dodawanie spacji między znakami zmieniałoby naturalny wygląd tekstu i utrudniało ocenę rzeczywistego łamania wierszy."],
  ["Czym różni się chiński uproszczony od tradycyjnego?", "Oba warianty korzystają z odmiennych zestawów znaków Han. Mogą też różnić się konwencjami typograficznymi, dlatego warto sprawdzać je osobno."],
  ["Czy w języku koreańskim stosuje się spacje?", "Tak. Współczesny koreański zwykle oddziela spacjami grupy wyrazów, co wpływa na łamanie tekstu w wąskich elementach interfejsu."],
  ["Jak generator liczy słowa w tych językach?", "Sposób liczenia zależy od wybranego języka. W przypadku japońskiego generator używa segmentacji językowej przeglądarki, ponieważ tekst zwykle nie zawiera spacji między słowami."],
  ["Czy mogę użyć wygenerowanego tekstu jako tłumaczenia?", "Nie. Tekst służy do testowania układu i interfejsu, a nie jako tłumaczenie ani treść do publikacji. Przed wdrożeniem zastąp go sprawdzonym tekstem."],
] as const;

export function PolishLanguagesEditorial() {
  return <>
    <EditorialSection id="languages-layout" eyebrow="UKŁADY WIELOJĘZYCZNE" title="Testowanie interfejsów w różnych systemach pisma" split>
      <p>Tekst japoński, chiński i koreański może zmieniać wizualną gęstość treści, sposób łamania wierszy i ilość miejsca potrzebnego komponentom. Test wielojęzycznego układu pomaga sprawdzić karty, menu, przyciski i dłuższe bloki jeszcze przed przygotowaniem finalnej lokalizacji.</p>
      <p>Tekst w wybranym języku pozwala ocenić zachowanie odstępów i podziału wierszy. Przydaje się również wtedy, gdy zespół nie pracuje z tym językiem na co dzień.</p>
    </EditorialSection>
    <EditorialSection id="languages-scripts" eyebrow="SYSTEMY PISMA" title="Japoński, chiński i koreański w układzie strony" split>
      <EditorialTable label="Systemy pisma i kwestie ważne dla układu" compact headers={["Język", "Pismo", "Spacje", "Co sprawdzić"]} rows={[
        ["Japoński", "Kanji, hiragana i katakana", "Zwykle brak", "Łamanie wierszy, interpunkcję i gęstość tekstu"],
        ["Chiński uproszczony", "Uproszczone znaki Han", "Zwykle brak", "Szerokość znaków, interpunkcję i tekst mieszany"],
        ["Chiński tradycyjny", "Tradycyjne znaki Han", "Zwykle brak", "Gęstość, konwencje regionalne i łamanie wierszy"],
        ["Koreański", "Hangul, czasem Hanja lub alfabet łaciński", "Tak", "Odstępy między słowami i długość wierszy"],
      ]} />
    </EditorialSection>
    <EditorialSection id="languages-japanese" eyebrow="JAPOŃSKI — 日本語" title="Sprawdzanie układu z tekstem japońskim" split>
      <p>W języku japońskim zwykle łączy się kanji, hiraganę i katakanę. W tekście ciągłym słowa na ogół nie są oddzielane spacjami, dlatego układ sprawdzony na tekście łacińskim może zachowywać się inaczej.</p>
      <p>Zwróć uwagę na łamanie wierszy, wysokość linii i położenie znaków interpunkcyjnych. Nie wstawiaj ręcznie spacji między znaki — zmieniłoby to naturalny wygląd tekstu.</p>
    </EditorialSection>
    <EditorialSection id="languages-chinese" eyebrow="CHIŃSKI — 中文" title="Testowanie obu wariantów pisma chińskiego" split>
      <p>Chiński uproszczony i tradycyjny różnią się używanymi znakami Han. Różne mogą być również lokalne konwencje typograficzne, które wpływają na wygląd interfejsu.</p>
      <p>Testuj oba warianty osobno. Sprawdź wąskie komponenty, interpunkcję oraz połączenia znaków chińskich z liczbami i tekstem łacińskim.</p>
    </EditorialSection>
    <EditorialSection id="languages-korean" eyebrow="KOREAŃSKI — 한국어" title="Testowanie tekstu koreańskiego" split>
      <p>Współczesny język koreański zapisuje się przede wszystkim alfabetem hangul. W odróżnieniu od japońskiego i chińskiego zwykle używa się w nim spacji między grupami wyrazów, co wpływa na podział tekstu w wąskich wierszach.</p>
      <p>Sprawdź odstępy i łamanie wierszy w przyciskach, menu oraz kartach. Zwróć też uwagę na połączenia hangulu z liczbami i terminami łacińskimi, często spotykane w interfejsach cyfrowych.</p>
    </EditorialSection>
    <EditorialSection id="languages-checklist" eyebrow="KONTROLA UKŁADU" title="Co sprawdzić w wielojęzycznym interfejsie?" split>
      <ul className={styles.checklist}>
        <li>Nie dodawaj ręcznie spacji do tekstu japońskiego ani chińskiego.</li>
        <li>Testuj karty, przyciski i menu, nie tylko długie akapity.</li>
        <li>Sprawdzaj wąskie ekrany i krótkie wiersze.</li>
        <li>Kontroluj interpunkcję, łamanie wierszy i wysokość linii.</li>
        <li>Ustawiaj właściwy atrybut HTML <code>lang</code> dla każdego tekstu.</li>
        <li>Używaj tekstu do testowania układu, nie jako tłumaczenia ani finalnej treści.</li>
      </ul>
    </EditorialSection>
    <EditorialSection id="languages-modes" eyebrow="ILOŚĆ I FORMAT" title="Słowa, znaki czy zdania? Wybierz także liczbę akapitów." split>
      <EditorialTable label="Tryby generatora i ich zastosowania" compact headers={["Tryb", "Zastosowanie"]} rows={[
        ["Słowa", "Do opisów, treści redakcyjnych i stron z wieloma blokami tekstu."],
        ["Znaki", "Do kart, podglądów i elementów z limitem znaków."],
        ["Zdania", "Do krótkich opisów, komunikatów, formularzy i zwięzłych bloków tekstu."],
      ]} />
      <p>W językach takich jak japoński, w których spacje nie wyznaczają granic słów, generator korzysta z segmentacji językowej przeglądarki.</p>
    </EditorialSection>
    <section className="faq-section" aria-labelledby="languages-faq-title">
      <div className="faq-heading"><span className="eyebrow">CZĘSTE PYTANIA</span><h2 id="languages-faq-title">Ipsum azjatyckie — najczęstsze pytania</h2></div>
      <div className="faq-list">{faqItems.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
    </section>
  </>;
}
