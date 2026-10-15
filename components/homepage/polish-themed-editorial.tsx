import { EditorialSection, EditorialTable } from "./italian-editorial";

const faqItems = [
  ["Jaka jest różnica między Lorem Ipsum a tematycznym Ipsum?", "Tradycyjne Lorem Ipsum wykorzystuje neutralny tekst pseudołaciński. Tematyczny Ipsum generuje natomiast tekst zastępczy ze słownictwem i frazami związanymi z określoną branżą lub kontekstem."],
  ["Czy mogę wybrać język?", "Tak. Na polskiej stronie możesz generować tematyczny Ipsum po polsku lub po angielsku, zachowując ten sam temat i tryb."],
  ["Czy mogę wygenerować dokładną ilość tekstu?", "Tak. Możesz ustawić liczbę słów i akapitów, zdań albo dokładną liczbę znaków."],
  ["Do czego służy tematyczny tekst zastępczy?", "Pomaga tworzyć bardziej realistyczne makiety i prototypy, szczególnie wtedy, gdy słownictwo związane z projektem wpływa na wygląd layoutu."],
  ["Czy teksty tematyczne są treścią finalną?", "Nie. To tymczasowa treść do projektowania, testowania i prototypowania. Przed publikacją należy ją zastąpić docelowym tekstem."],
];

export function PolishThemedEditorial() {
  return <>
    <EditorialSection id="polish-themed-explanation" eyebrow="KONTEKSTOWY TEKST ZASTĘPCZY" title="Czym jest tematyczny Ipsum?" split>
      <p>Tematyczny Ipsum to tekst zastępczy zbudowany wokół konkretnej branży lub kontekstu. Zachowuje funkcję tradycyjnego Lorem Ipsum, ale wykorzystuje słownictwo, wyrażenia i frazy związane z technologią, sztuczną inteligencją, designem, modą lub biznesem.</p>
      <p>Sprawdza się wtedy, gdy zwykły tekst pseudołaciński nie wystarcza do realistycznego odwzorowania treści, które pojawią się w projekcie. Makieta produktu SaaS, landing page o AI czy lookbook modowy wyglądają bardziej wiarygodnie, gdy tekst używa terminów zbliżonych do finalnego kontekstu.</p>
    </EditorialSection>
    <EditorialSection id="polish-themed-comparison" eyebrow="KLASYCZNY CZY TEMATYCZNY" title="Klasyczne Lorem Ipsum czy tematyczny Ipsum?" split>
      <EditorialTable label="Porównanie klasycznego Lorem Ipsum i tematycznego Ipsum" compact headers={["Klasyczne Lorem Ipsum", "Tematyczny Ipsum"]} rows={[
        ["Neutralny tekst pseudołaciński", "Tekst związany z konkretnym kontekstem"],
        ["Idealny do sprawdzania kompozycji i odstępów", "Przydatny do bardziej realistycznych makiet"],
        ["Nie odwołuje się do konkretnej branży", "Używa terminologii Corporate, Tech, AI, Design, Moda lub Zombie"],
        ["Dobry do ogólnych testów", "Lepiej pasuje do prototypów kontekstowych"],
      ]} />
      <p>Oba rozwiązania służą do testowania layoutu. Różnią się poziomem realizmu: klasyczne Lorem Ipsum pozostaje neutralne, natomiast tematyczny Ipsum lepiej symuluje język, który może pojawić się w finalnym projekcie.</p>
    </EditorialSection>
    <EditorialSection id="polish-themed-quantity" eyebrow="ZALECANE ILOŚCI" title="Ile tekstu tematycznego wygenerować?" split>
      <EditorialTable label="Zalecana ilość tekstu tematycznego według zastosowania" compact headers={["Przypadek użycia", "Zalecana ilość"]} rows={[
        ["Karta UI", "100–150 znaków"], ["Hero lub teaser", "150–250 znaków"],
        ["Moduł produktu", "50–100 słów"], ["Sekcja landing page", "2–3 akapity"],
        ["Makieta redakcyjna", "3–5 akapitów"], ["Prototyp long-form", "250+ słów"],
      ]} />
    </EditorialSection>
    <section className="faq-section" aria-labelledby="polish-themed-faq-title">
      <div className="faq-heading"><span className="eyebrow">PYTANIA O TEMATYCZNY IPSUM</span><h2 id="polish-themed-faq-title">FAQ o tematycznym Ipsum</h2></div>
      <div className="faq-list">{faqItems.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
    </section>
  </>;
}
