import { EditorialSection, EditorialTable } from "./italian-editorial";
import styles from "./italian-editorial.module.css";

export const spanishHomepageFaqItems: [string, string][] = [
  ["¿Lorem Ipsum significa realmente algo?", "El Lorem Ipsum moderno deriva del latín clásico, pero el texto se ha modificado y reorganizado con el tiempo. Por eso parece un idioma natural sin formar un discurso coherente."],
  ["¿Cuál es la diferencia entre Lorem Ipsum, dummy text y placeholder text?", "Dummy text y placeholder text son términos generales para el texto temporal de un layout. Lorem Ipsum es una de las formas de texto de prueba más utilizadas."],
];

export const germanHomepageFaqItems: [string, string][] = [
  ["Hat Lorem Ipsum tatsächlich eine Bedeutung?", "Das moderne Lorem Ipsum basiert auf klassischem Latein, wurde jedoch im Laufe der Zeit verändert und neu angeordnet. Dadurch wirkt es wie natürliche Sprache, ohne einen zusammenhängenden Inhalt zu bilden."],
  ["Was ist der Unterschied zwischen Lorem Ipsum, Blindtext und Platzhaltertext?", "Blindtext und Platzhaltertext sind allgemeine Begriffe für temporären Text in einem Layout. Lorem Ipsum ist eine der bekanntesten Formen solcher Platzhaltertexte."],
];

export function SpanishHomepageEditorial() {
  return <>
    <EditorialSection id="spanish-quantity-guide" eyebrow="GUÍA RÁPIDA" title="¿Cuánto Lorem Ipsum deberías usar?" split>
      <p>La cantidad adecuada de texto de prueba depende del componente que estés diseñando. Una tarjeta o un subtítulo hero pueden necesitar solo unas líneas, mientras que una página editorial requiere varios párrafos para comprobar el ritmo, el espaciado y el comportamiento del layout con contenido más largo.</p>
      <EditorialTable label="Cantidades de Lorem Ipsum recomendadas por caso de uso" compact headers={["Caso de uso", "Cantidad recomendada", "Modo"]} rows={[
        ["Microcopy o pie breve", "100–150 caracteres", "Caracteres"], ["Subtítulo hero", "150–250 caracteres", "Caracteres"], ["Tarjeta de producto o servicio", "50–80 palabras", "Palabras"], ["Bloque descriptivo", "unas 100 palabras", "Palabras"], ["Vista previa de artículo", "150–250 palabras", "Palabras"], ["Sección editorial", "3–5 párrafos", "Palabras + párrafos"], ["Layout long-form", "5–8 párrafos", "Palabras + párrafos"],
      ]} />
      <p>Estas cantidades no son reglas estrictas. Úsalas como punto de partida para simular longitudes de contenido realistas. Si necesitas comprobar un límite concreto, utiliza el modo Caracteres o introduce directamente el número exacto de palabras.</p>
    </EditorialSection>
    <EditorialSection id="spanish-content-testing" eyebrow="PROBAR EL CONTENIDO" title="Cuándo usar Lorem Ipsum y cuándo usar texto real" split>
      <p>Lorem Ipsum es útil en las primeras fases del diseño, cuando necesitas evaluar la estructura, la tipografía, la densidad y el comportamiento de los componentes sin depender del copy definitivo.</p>
      <div className={styles.listGrid}>
        <div><h3>Usa texto de prueba para:</h3><ul><li>wireframes y prototipos;</li><li>pruebas responsive;</li><li>tarjetas, módulos y dashboards;</li><li>layouts editoriales;</li><li>comparar diferentes cantidades de contenido.</li></ul></div>
        <div><h3>Pasa a contenido real cuando necesites evaluar:</h3><ul><li>tono de voz;</li><li>comprensión;</li><li>jerarquías editoriales definitivas;</li><li>longitudes reales de nombres, CTA y mensajes;</li><li>accesibilidad y calidad de la experiencia final.</li></ul></div>
      </div>
      <p>Lorem Ipsum funciona mejor como herramienta temporal de diseño: ayuda a validar el contenedor, mientras que el copy real es necesario para validar el producto final.</p>
    </EditorialSection>
  </>;
}

export function GermanHomepageEditorial() {
  return <>
    <EditorialSection id="german-quantity-guide" eyebrow="SCHNELLÜBERSICHT" title="Wie viel Lorem Ipsum solltest du verwenden?" split>
      <p>Die passende Menge an Blindtext hängt davon ab, welches Element du gestaltest. Für eine Card oder eine Hero-Subline reichen oft wenige Zeilen, während eine redaktionelle Seite mehrere Absätze benötigt, um Rhythmus, Abstände und das Verhalten des Layouts bei längeren Inhalten zu testen.</p>
      <EditorialTable label="Empfohlene Lorem-Ipsum-Mengen nach Anwendungsfall" compact headers={["Anwendungsfall", "Empfohlene Menge", "Modus"]} rows={[
        ["Microcopy oder kurze Caption", "100–150 Zeichen", "Zeichen"], ["Hero-Subline", "150–250 Zeichen", "Zeichen"], ["Produkt- oder Service-Card", "50–80 Wörter", "Wörter"], ["Beschreibungstext", "etwa 100 Wörter", "Wörter"], ["Artikelvorschau", "150–250 Wörter", "Wörter"], ["Redaktioneller Abschnitt", "3–5 Absätze", "Wörter + Absätze"], ["Long-Form-Layout", "5–8 Absätze", "Wörter + Absätze"],
      ]} />
      <p>Diese Werte sind keine festen Regeln. Nutze sie als praktischen Ausgangspunkt, um realistische Textlängen zu simulieren. Wenn du eine genaue Begrenzung testen möchtest, verwende den Zeichenmodus oder gib die benötigte Wortzahl direkt ein.</p>
    </EditorialSection>
    <EditorialSection id="german-content-testing" eyebrow="INHALTE TESTEN" title="Wann Lorem Ipsum sinnvoll ist — und wann echter Text besser ist" split>
      <p>Lorem Ipsum ist besonders in frühen Designphasen hilfreich, wenn du Struktur, Typografie, Textdichte und das Verhalten von Komponenten beurteilen möchtest, ohne bereits vom finalen Copy abhängig zu sein.</p>
      <div className={styles.listGrid}>
        <div><h3>Verwende Blindtext für:</h3><ul><li>Wireframes und Prototypen;</li><li>Responsive-Tests;</li><li>Cards, Module und Dashboards;</li><li>redaktionelle Layouts;</li><li>Vergleiche unterschiedlicher Textmengen.</li></ul></div>
        <div><h3>Wechsle zu echtem Inhalt, wenn du Folgendes beurteilen möchtest:</h3><ul><li>Tonalität;</li><li>Verständlichkeit;</li><li>finale redaktionelle Hierarchie;</li><li>reale Längen von Namen, CTAs und Meldungen;</li><li>Barrierefreiheit und Qualität der finalen Nutzererfahrung.</li></ul></div>
      </div>
      <p>Lorem Ipsum funktioniert am besten als temporäres Designwerkzeug: Es hilft dabei, den Container zu prüfen, während echter Copy nötig ist, um das fertige Produkt zu validieren.</p>
    </EditorialSection>
  </>;
}

const spanishThemedFaqItems = [
  ["¿Cuál es la diferencia entre Lorem Ipsum e Ipsum temático?", "El Lorem Ipsum tradicional utiliza texto pseudolatino neutro. El Ipsum temático genera texto de prueba con vocabulario y frases relacionados con un sector o contexto específico."],
  ["¿Puedo elegir el idioma?", "Sí. En la página española puedes generar Ipsum temático en español o inglés manteniendo el mismo tema y modo."],
  ["¿Puedo generar una cantidad exacta de texto?", "Sí. Puedes definir palabras y párrafos, frases o un número exacto de caracteres."],
  ["¿Para qué sirve el texto de prueba temático?", "Ayuda a crear mockups y prototipos más realistas, especialmente cuando el vocabulario específico del proyecto afecta a la apariencia del layout."],
  ["¿Los textos temáticos son contenido final?", "No. Están pensados como contenido temporal para diseño, pruebas y prototipado y deben sustituirse por copy final antes de publicar."],
];

const germanThemedFaqItems = [
  ["Was ist der Unterschied zwischen Lorem Ipsum und thematischem Ipsum?", "Traditionelles Lorem Ipsum verwendet neutralen Pseudo-Lateintext. Thematischer Ipsum erzeugt dagegen Blindtext mit Begriffen und Formulierungen aus einer bestimmten Branche oder einem bestimmten Kontext."],
  ["Kann ich die Sprache auswählen?", "Ja. Auf der deutschen Seite kannst du thematischen Ipsum auf Deutsch oder Englisch generieren und dabei Thema und Modus beibehalten."],
  ["Kann ich eine genaue Textmenge generieren?", "Ja. Du kannst Wörter und Absätze, Sätze oder eine genaue Anzahl von Zeichen festlegen."],
  ["Wofür eignet sich thematischer Blindtext?", "Er hilft dabei, realistischere Mockups und Prototypen zu erstellen, insbesondere wenn projektspezifische Begriffe das Erscheinungsbild eines Layouts beeinflussen."],
  ["Sind thematische Texte fertige Inhalte?", "Nein. Sie sind als temporäre Inhalte für Design, Tests und Prototyping gedacht und sollten vor der Veröffentlichung durch finalen Copy ersetzt werden."],
];

function ThemedFaq({ locale }: { locale: "es" | "de" }) {
  const items = locale === "es" ? spanishThemedFaqItems : germanThemedFaqItems;
  return <section className="faq-section" aria-labelledby={`${locale}-themed-faq-title`}>
    <div className="faq-heading"><span className="eyebrow">{locale === "es" ? "PREGUNTAS SOBRE IPSUM TEMÁTICO" : "FRAGEN ZU THEMATISCHEM IPSUM"}</span><h2 id={`${locale}-themed-faq-title`}>{locale === "es" ? "Preguntas frecuentes sobre Ipsum temático" : "FAQ zu thematischem Ipsum"}</h2></div>
    <div className="faq-list">{items.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
  </section>;
}

export function SpanishThemedEditorial() {
  return <>
    <EditorialSection id="spanish-themed-explanation" eyebrow="TEXTO DE PRUEBA CONTEXTUAL" title="¿Qué es el Ipsum temático?" split>
      <p>El Ipsum temático es texto de prueba construido alrededor de un sector o contexto específico. Cumple la misma función básica que el Lorem Ipsum tradicional, pero utiliza vocabulario, expresiones y frases relacionadas con ámbitos como tecnología, inteligencia artificial, diseño, moda o negocio.</p>
      <p>Es útil cuando el texto pseudolatino genérico no representa de forma realista el tipo de contenido que aparecerá en el proyecto final. Un mockup de un producto SaaS, una landing page de IA o un lookbook de moda resultan más creíbles cuando el texto utiliza terminología cercana al contexto previsto.</p>
    </EditorialSection>
    <EditorialSection id="spanish-themed-comparison" eyebrow="CLÁSICO O TEMÁTICO" title="¿Lorem Ipsum clásico o Ipsum temático?" split>
      <EditorialTable label="Comparación entre Lorem Ipsum clásico e Ipsum temático" compact headers={["Lorem Ipsum clásico", "Ipsum temático"]} rows={[["Texto pseudolatino neutro", "Texto ligado a un contexto específico"], ["Ideal para comprobar composición y espaciado", "Útil para mockups más realistas"], ["No está vinculado a un sector concreto", "Utiliza terminología Corporate, Tech, IA, Diseño, Moda o Zombie"], ["Adecuado para pruebas generales de layout", "Más útil para prototipos contextuales"]]} />
      <p>Ambos sirven para probar un layout. La diferencia está en el nivel de realismo: el Lorem Ipsum clásico mantiene el contenido neutro, mientras que el Ipsum temático simula mejor el tipo de lenguaje que puede aparecer en el proyecto final.</p>
    </EditorialSection>
    <EditorialSection id="spanish-themed-quantity" eyebrow="CANTIDADES RECOMENDADAS" title="¿Cuánto texto temático deberías generar?" split>
      <EditorialTable label="Cantidades de texto temático recomendadas" compact headers={["Caso de uso", "Cantidad recomendada"]} rows={[["Tarjeta UI", "100–150 caracteres"], ["Hero o teaser", "150–250 caracteres"], ["Módulo de producto", "50–100 palabras"], ["Sección de landing page", "2–3 párrafos"], ["Mockup editorial", "3–5 párrafos"], ["Prototipo long-form", "250+ palabras"]]} />
    </EditorialSection>
    <ThemedFaq locale="es" />
  </>;
}

export function GermanThemedEditorial() {
  return <>
    <EditorialSection id="german-themed-explanation" eyebrow="KONTEXTBEZOGENER BLINDTEXT" title="Was ist thematischer Ipsum?" split>
      <p>Thematischer Ipsum ist Blindtext, der auf eine bestimmte Branche oder einen bestimmten Kontext zugeschnitten ist. Er erfüllt denselben grundlegenden Zweck wie klassisches Lorem Ipsum, verwendet jedoch Wörter, Ausdrücke und Formulierungen aus Bereichen wie Technologie, künstlicher Intelligenz, Design, Fashion oder Business.</p>
      <p>Er ist besonders dann sinnvoll, wenn generischer Pseudo-Lateintext den späteren Inhalt eines Projekts nicht realistisch genug widerspiegelt. Ein SaaS-Mockup, eine AI-Landingpage oder ein Fashion-Lookbook wirken glaubwürdiger, wenn der Blindtext Begriffe verwendet, die näher am tatsächlichen Kontext liegen.</p>
    </EditorialSection>
    <EditorialSection id="german-themed-comparison" eyebrow="KLASSISCH ODER THEMATISCH" title="Klassisches Lorem Ipsum oder thematischer Ipsum?" split>
      <EditorialTable label="Vergleich von klassischem Lorem Ipsum und thematischem Ipsum" compact headers={["Klassisches Lorem Ipsum", "Thematischer Ipsum"]} rows={[["Neutraler Pseudo-Lateintext", "Kontextbezogener Blindtext"], ["Ideal für Komposition und Abstände", "Geeignet für realistischere Mockups"], ["Nicht an eine Branche gebunden", "Verwendet Corporate-, Tech-, KI-, Design-, Fashion- oder Zombie-Terminologie"], ["Gut für allgemeine Layouttests", "Besser für kontextbezogene Prototypen geeignet"]]} />
      <p>Beide Varianten eignen sich zum Testen eines Layouts. Der Unterschied liegt im Grad des Realismus: Klassisches Lorem Ipsum hält den Inhalt neutral, während thematischer Ipsum die Sprache besser simuliert, die später im fertigen Projekt vorkommen kann.</p>
    </EditorialSection>
    <EditorialSection id="german-themed-quantity" eyebrow="EMPFOHLENE MENGEN" title="Wie viel thematischen Blindtext solltest du generieren?" split>
      <EditorialTable label="Empfohlene Mengen thematischen Blindtexts" compact headers={["Anwendungsfall", "Empfohlene Menge"]} rows={[["UI-Card", "100–150 Zeichen"], ["Hero oder Teaser", "150–250 Zeichen"], ["Produktmodul", "50–100 Wörter"], ["Landingpage-Abschnitt", "2–3 Absätze"], ["Redaktionelles Mockup", "3–5 Absätze"], ["Long-Form-Prototyp", "250+ Wörter"]]} />
    </EditorialSection>
    <ThemedFaq locale="de" />
  </>;
}
