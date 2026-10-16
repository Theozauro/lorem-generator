import styles from "./italian-editorial.module.css";
import { EditorialSection, EditorialTable } from "./italian-editorial";

export const dutchHomepageFaqItems: [string, string][] = [
  ["Betekent Lorem Ipsum echt iets?", "Modern Lorem Ipsum is afgeleid van klassiek Latijn, maar de tekst is in de loop van de tijd aangepast en herschikt. Daardoor lijkt hij op natuurlijke taal zonder een samenhangende betekenis te vormen."],
  ["Wat is het verschil tussen Lorem Ipsum, dummy text en placeholdertekst?", "Dummy text en placeholdertekst zijn algemene termen voor tijdelijke tekst in een layout. Lorem Ipsum is een van de bekendste vormen van placeholdertekst."],
];

export const polishHomepageFaqItems: [string, string][] = [
  ["Czy Lorem Ipsum naprawdę coś znaczy?", "Współczesne Lorem Ipsum wywodzi się z klasycznej łaciny, ale tekst był przez lata modyfikowany i przestawiany. Dzięki temu przypomina naturalny język, nie tworząc jednak spójnej wypowiedzi."],
  ["Jaka jest różnica między Lorem Ipsum, dummy text i placeholder text?", "Dummy text i placeholder text to ogólne określenia tymczasowego tekstu używanego w layoucie. Lorem Ipsum jest jedną z najbardziej znanych form takiego tekstu zastępczego."],
];

export function DutchHomepageEditorial() {
  return <>
    <EditorialSection id="dutch-quantity-guide" eyebrow="SNELLE REFERENTIE" title="Hoeveel Lorem Ipsum heb je nodig?" split>
      <p>De juiste hoeveelheid placeholdertekst hangt af van het onderdeel dat je ontwerpt. Voor een kaart of hero-subtitel zijn vaak maar enkele regels nodig, terwijl een redactionele pagina meerdere alinea’s vraagt om ritme, witruimte en het gedrag van de layout met langere content te testen.</p>
      <EditorialTable label="Aanbevolen hoeveelheden Lorem Ipsum per toepassing" compact headers={["Gebruik", "Aanbevolen hoeveelheid", "Modus"]} rows={[
        ["Microcopy of korte caption", "100–150 tekens", "Tekens"], ["Hero-subtitel", "150–250 tekens", "Tekens"],
        ["Product- of servicekaart", "50–80 woorden", "Woorden"], ["Beschrijvingsblok", "ongeveer 100 woorden", "Woorden"],
        ["Artikelpreview", "150–250 woorden", "Woorden"], ["Redactionele sectie", "3–5 alinea’s", "Woorden + alinea’s"],
        ["Long-form layout", "5–8 alinea’s", "Woorden + alinea’s"],
      ]} />
      <p>Deze waarden zijn geen vaste regels. Gebruik ze als praktisch startpunt om realistische contentlengtes te simuleren. Wil je een harde limiet testen, gebruik dan de modus Tekens of voer rechtstreeks het exacte aantal woorden in.</p>
    </EditorialSection>
    <EditorialSection id="dutch-content-testing" eyebrow="CONTENT TESTEN" title="Wanneer gebruik je Lorem Ipsum — en wanneer echte tekst?" split>
      <p>Lorem Ipsum is vooral nuttig in vroege ontwerpfasen, wanneer je structuur, typografie, informatiedichtheid en componentgedrag wilt beoordelen zonder afhankelijk te zijn van definitieve copy.</p>
      <div className={styles.listGrid}>
        <div><h3>Gebruik placeholdertekst voor:</h3><ul><li>wireframes en prototypes;</li><li>responsive tests;</li><li>kaarten, modules en dashboards;</li><li>redactionele layouts;</li><li>het vergelijken van verschillende contentlengtes.</li></ul></div>
        <div><h3>Stap over op echte content wanneer je wilt beoordelen:</h3><ul><li>tone of voice;</li><li>begrijpelijkheid;</li><li>definitieve redactionele hiërarchie;</li><li>werkelijke lengtes van namen, CTA’s en berichten;</li><li>toegankelijkheid en kwaliteit van de uiteindelijke gebruikerservaring.</li></ul></div>
      </div>
      <p>Lorem Ipsum werkt het best als tijdelijk ontwerpmiddel: het helpt de container te valideren, terwijl echte copy nodig is om het uiteindelijke product te beoordelen.</p>
    </EditorialSection>
  </>;
}

export function PolishHomepageEditorial() {
  return <>
    <EditorialSection id="polish-quantity-guide" eyebrow="SZYBKA ŚCIĄGA" title="Ile Lorem Ipsum warto użyć?" split>
      <p>Odpowiednia ilość tekstu zastępczego zależy od projektowanego elementu. Karta lub podtytuł w sekcji hero mogą wymagać tylko kilku wierszy, natomiast strona redakcyjna potrzebuje kilku akapitów, aby sprawdzić rytm, odstępy i zachowanie layoutu przy dłuższej treści.</p>
      <EditorialTable label="Zalecana ilość Lorem Ipsum w zależności od zastosowania" compact headers={["Zastosowanie", "Zalecana ilość", "Tryb"]} rows={[
        ["Microcopy lub krótki podpis", "100–150 znaków", "Znaki"], ["Podtytuł hero", "150–250 znaków", "Znaki"],
        ["Karta produktu lub usługi", "50–80 słów", "Słowa"], ["Blok opisu", "około 100 słów", "Słowa"],
        ["Podgląd artykułu", "150–250 słów", "Słowa"], ["Sekcja redakcyjna", "3–5 akapitów", "Słowa + akapity"],
        ["Długi layout", "5–8 akapitów", "Słowa + akapity"],
      ]} />
      <p>Te wartości nie są sztywnymi regułami. Traktuj je jako praktyczny punkt wyjścia do symulowania realistycznych długości treści. Jeśli chcesz przetestować konkretny limit, użyj trybu Znaki albo wpisz dokładną liczbę potrzebnych słów.</p>
    </EditorialSection>
    <EditorialSection id="polish-content-testing" eyebrow="TESTOWANIE TREŚCI" title="Kiedy używać Lorem Ipsum, a kiedy prawdziwego tekstu?" split>
      <p>Lorem Ipsum przydaje się szczególnie na wczesnych etapach projektowania, gdy trzeba ocenić strukturę, typografię, gęstość treści i zachowanie komponentów bez uzależniania projektu od finalnego copy.</p>
      <div className={styles.listGrid}>
        <div><h3>Używaj tekstu zastępczego do:</h3><ul><li>wireframe’ów i prototypów;</li><li>testów responsywności;</li><li>kart, modułów i dashboardów;</li><li>layoutów redakcyjnych;</li><li>porównywania różnych długości treści.</li></ul></div>
        <div><h3>Przejdź na prawdziwe treści, gdy chcesz ocenić:</h3><ul><li>tone of voice;</li><li>zrozumiałość;</li><li>finalną hierarchię redakcyjną;</li><li>rzeczywistą długość nazw, CTA i komunikatów;</li><li>dostępność oraz jakość końcowego doświadczenia użytkownika.</li></ul></div>
      </div>
      <p>Lorem Ipsum najlepiej sprawdza się jako tymczasowe narzędzie projektowe: pomaga zweryfikować kontener, natomiast prawdziwy tekst jest potrzebny do oceny gotowego produktu.</p>
    </EditorialSection>
  </>;
}

const dutchThemedFaqItems: [string, string][] = [
  ["Wat is het verschil tussen Lorem Ipsum en Themed Ipsum?", "Traditioneel Lorem Ipsum gebruikt neutrale pseudo-Latijnse tekst. Themed Ipsum genereert placeholdertekst met woorden en formuleringen uit een specifieke sector of context."],
  ["Kan ik de taal kiezen?", "Ja. Op de Nederlandse pagina kun je Themed Ipsum in het Nederlands of Engels genereren terwijl thema en modus behouden blijven."],
  ["Kan ik een exacte hoeveelheid tekst genereren?", "Ja. Je kunt een exact aantal woorden en alinea’s, zinnen of tekens instellen."],
  ["Waarvoor is thematische placeholdertekst nuttig?", "Het helpt om realistischere mockups en prototypes te maken, vooral wanneer projectspecifieke woordenschat invloed heeft op het uiterlijk van een layout."],
  ["Is Themed Ipsum definitieve content?", "Nee. Het is tijdelijke content voor ontwerp, tests en prototyping en moet vóór publicatie worden vervangen door definitieve copy."],
];

export function DutchThemedEditorial() {
  return <>
    <EditorialSection id="dutch-themed-explanation" eyebrow="CONTEXTUELE PLACEHOLDERTEXT" title="Wat is Themed Ipsum?" split>
      <p>Themed Ipsum is placeholdertekst die is opgebouwd rond een specifieke sector of context. Het heeft hetzelfde basisdoel als traditioneel Lorem Ipsum, maar gebruikt woorden, uitdrukkingen en formuleringen uit domeinen zoals technologie, kunstmatige intelligentie, design, fashion of business.</p>
      <p>Het is nuttig wanneer generieke pseudo-Latijnse tekst niet realistisch genoeg weergeeft welk soort content uiteindelijk in een project komt te staan. Een SaaS-mockup, AI-landingspagina of fashion-lookbook voelt geloofwaardiger wanneer de placeholdertekst terminologie gebruikt die dichter bij de uiteindelijke context ligt.</p>
    </EditorialSection>
    <EditorialSection id="dutch-themed-comparison" eyebrow="KLASSIEK OF THEMATISCH" title="Klassiek Lorem Ipsum of Themed Ipsum?" split>
      <EditorialTable label="Vergelijking van klassiek Lorem Ipsum en Themed Ipsum" compact headers={["Klassiek Lorem Ipsum", "Themed Ipsum"]} rows={[
        ["Neutrale pseudo-Latijnse tekst", "Contextspecifieke placeholdertekst"], ["Ideaal voor compositie en witruimte", "Nuttig voor realistischere mockups"],
        ["Niet gekoppeld aan een sector", "Gebruikt Corporate-, Tech-, AI-, Design-, Fashion- of Zombie-terminologie"], ["Goed voor algemene layouttests", "Beter geschikt voor contextuele prototypes"],
      ]} />
      <p>Beide zijn nuttig om een layout te testen. Het verschil zit in het realisme: klassiek Lorem Ipsum houdt de inhoud neutraal, terwijl Themed Ipsum beter simuleert welk type taal later in het uiteindelijke project kan verschijnen.</p>
    </EditorialSection>
    <EditorialSection id="dutch-themed-quantity" eyebrow="AANBEVOLEN HOEVEELHEDEN" title="Hoeveel thematische placeholdertekst moet je genereren?" split>
      <EditorialTable label="Aanbevolen hoeveelheden thematische placeholdertekst" compact headers={["Gebruik", "Aanbevolen hoeveelheid"]} rows={[
        ["UI-kaart", "100–150 tekens"], ["Hero of teaser", "150–250 tekens"], ["Productmodule", "50–100 woorden"],
        ["Landingpage-sectie", "2–3 alinea’s"], ["Redactionele mockup", "3–5 alinea’s"], ["Long-form prototype", "250+ woorden"],
      ]} />
    </EditorialSection>
    <section className="faq-section" aria-labelledby="dutch-themed-faq-title">
      <div className="faq-heading"><span className="eyebrow">VRAGEN OVER THEMED IPSUM</span><h2 id="dutch-themed-faq-title">Veelgestelde vragen over Themed Ipsum</h2></div>
      <div className="faq-list">{dutchThemedFaqItems.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
    </section>
  </>;
}
