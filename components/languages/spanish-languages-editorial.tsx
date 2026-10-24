import { EditorialSection, EditorialTable } from "@/components/homepage/italian-editorial";
import styles from "./languages-generator.module.css";

const faqItems = [
  ["¿Por qué Lorem Ipsum no basta para probar un diseño en japonés o chino?", "Lorem Ipsum reproduce la densidad y el ritmo de un texto basado en el alfabeto latino. El japonés y el chino utilizan sistemas de escritura y reglas de espaciado y salto de línea diferentes, por lo que una interfaz puede comportarse de otra manera con esos textos."],
  ["¿El japonés y el chino separan las palabras con espacios?", "Por lo general, no. Añadir espacios artificiales para que el texto se parezca al español alteraría su comportamiento real y daría una prueba menos representativa."],
  ["¿Qué cambia entre el chino simplificado y el tradicional en una interfaz?", "Cambian los caracteres y también pueden variar algunas convenciones tipográficas según el mercado. Conviene probar ambas variantes por separado."],
  ["¿El coreano utiliza espacios?", "Sí. El coreano moderno suele separar con espacios los grupos de palabras, por lo que su comportamiento no es igual al del japonés o el chino."],
  ["¿Cómo se cuentan las palabras en estos idiomas?", "El criterio depende del idioma. Para el japonés, el generador utiliza la segmentación lingüística del navegador para identificar unidades aunque el texto no incluya espacios entre palabras."],
  ["¿Puedo usar estos textos como traducción o contenido definitivo?", "No. Son textos de prueba para interfaces, diseños y prototipos. Antes de publicar, sustitúyelos por contenido real y revisado."],
] as const;

export function SpanishLanguagesEditorial() {
  return <>
    <EditorialSection id="languages-layout" eyebrow="DISEÑO MULTILINGÜE" title="Probar una interfaz multilingüe" split>
      <p>Diseñar una interfaz en japonés, chino o coreano no consiste solo en sustituir el texto latino por otros caracteres. La densidad visual, el espaciado, la puntuación y los saltos de línea pueden cambiar el equilibrio de tarjetas, menús, botones y páginas editoriales.</p>
      <p>El texto de prueba en el idioma seleccionado permite comprobar el comportamiento del diseño antes de disponer de las traducciones y el contenido definitivos. También resulta útil cuando el equipo no está familiarizado con el idioma del proyecto.</p>
    </EditorialSection>
    <EditorialSection id="languages-scripts" eyebrow="SISTEMAS DE ESCRITURA" title="Japonés, chino y coreano: diferencias de diseño" split>
      <EditorialTable label="Comparación de los sistemas de escritura asiáticos y su comportamiento en el diseño" compact headers={["Idioma", "Escritura", "Espacios entre palabras", "Aspectos que revisar"]} rows={[
        ["Japonés", "Kanji, hiragana y katakana", "Normalmente no", "Saltos de línea, puntuación y densidad visual"],
        ["Chino simplificado", "Caracteres Han simplificados", "Normalmente no", "Ancho de caracteres, puntuación y texto mixto"],
        ["Chino tradicional", "Caracteres Han tradicionales", "Normalmente no", "Densidad, convenciones regionales y ajuste de línea"],
        ["Coreano", "Hangul, con posibles elementos latinos o Hanja", "Sí", "Espaciado, longitud de palabras y ajuste de línea"],
      ]} />
    </EditorialSection>
    <EditorialSection id="languages-japanese" eyebrow="JAPONÉS — 日本語" title="Diseñar para texto japonés" split>
      <p>El japonés combina normalmente kanji, hiragana y katakana en un mismo texto y no suele separar las palabras con espacios. Por eso, un diseño probado con Lorem Ipsum puede comportarse de otra manera al incluir contenido japonés.</p>
      <p>Durante las pruebas, revisa los saltos de línea, la altura de línea y la posición de la puntuación. Evita insertar espacios manualmente entre caracteres: modificarían el comportamiento real de la escritura y restarían utilidad a la prueba.</p>
    </EditorialSection>
    <EditorialSection id="languages-simplified-chinese" eyebrow="CHINO SIMPLIFICADO — 简体中文" title="Probar diseños con chino simplificado" split>
      <p>El chino simplificado utiliza caracteres Han y normalmente no separa las palabras con espacios. Por eso, la densidad del texto puede diferir mucho de la de una página diseñada en español o inglés.</p>
      <p>Revisa los saltos de línea, la puntuación, los componentes estrechos y los bloques que combinan caracteres chinos con números o palabras latinas. No añadas espacios artificiales ni reduzcas automáticamente el tamaño de letra para encajar el texto.</p>
    </EditorialSection>
    <EditorialSection id="languages-traditional-chinese" eyebrow="CHINO TRADICIONAL — 繁體中文" title="El chino tradicional: más que una variante gráfica" split>
      <p>El chino tradicional utiliza caracteres que pueden tener una apariencia más compleja, pero la diferencia respecto al simplificado no se limita a la forma de los glifos. Las convenciones tipográficas también pueden variar entre mercados y contextos.</p>
      <p>Para una maqueta, conviene probar el chino tradicional por separado y no tratarlo como un simple reemplazo del simplificado. Comprueba la densidad, la puntuación, las líneas cortas y los componentes que mezclan caracteres chinos, números y texto latino.</p>
    </EditorialSection>
    <EditorialSection id="languages-korean" eyebrow="COREANO — 한국어" title="El coreano se comporta de forma distinta al japonés y al chino" split>
      <p>El coreano moderno utiliza principalmente Hangul y, a diferencia del japonés y el chino, suele incluir espacios entre grupos de palabras. No conviene aplicar automáticamente al coreano las mismas reglas que a otros sistemas de escritura asiáticos.</p>
      <p>En el texto coreano, conserva los espacios y comprueba cómo se distribuyen las palabras en líneas estrechas, botones, menús y tarjetas. Revisa también la combinación de Hangul con números y términos latinos, habitual en las interfaces digitales.</p>
    </EditorialSection>
    <EditorialSection id="languages-checklist" eyebrow="REVISIÓN DEL DISEÑO" title="Qué revisar en un diseño multilingüe" split>
      <ul className={styles.checklist}>
        <li>No insertes espacios manualmente en japonés o chino.</li>
        <li>Revisa tarjetas, botones y menús, no solo los párrafos largos.</li>
        <li>Prueba anchos móviles y líneas muy cortas.</li>
        <li>Comprueba que la puntuación y los saltos de línea se vean correctamente.</li>
        <li>Mantén el atributo HTML <code>lang</code> adecuado.</li>
        <li>Usa el texto de prueba para revisar el diseño, no como traducción ni contenido definitivo.</li>
      </ul>
    </EditorialSection>
    <EditorialSection id="languages-modes" eyebrow="CANTIDAD Y FORMATO" title="¿Palabras, caracteres o frases? Elige también cuántos párrafos generar." split>
      <EditorialTable label="Modos de generación y casos de uso" compact headers={["Modo", "Cuándo utilizarlo"]} rows={[
        ["Palabras", "Para simular secciones editoriales, descripciones y páginas con varios bloques de contenido."],
        ["Caracteres", "Para probar tarjetas, avances, ventanas y componentes con límites de espacio precisos."],
        ["Frases", "Para descripciones breves, mensajes, formularios y bloques compactos."],
      ]} />
      <p>En idiomas como el japonés, donde los espacios no marcan los límites de las palabras, el generador utiliza la segmentación lingüística del navegador para calcular la cantidad solicitada.</p>
    </EditorialSection>
    <section className="faq-section" aria-labelledby="languages-faq-title">
      <div className="faq-heading"><span className="eyebrow">PREGUNTAS FRECUENTES</span><h2 id="languages-faq-title">Texto de prueba para idiomas asiáticos: preguntas frecuentes</h2></div>
      <div className="faq-list">{faqItems.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
    </section>
  </>;
}
