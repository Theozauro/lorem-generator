import { EditorialSection, EditorialTable } from "@/components/homepage/italian-editorial";
import styles from "./languages-generator.module.css";

const faqItems = [
  ["Why test Asian-language layouts with placeholder text?", "Japanese, Chinese and Korean use writing systems and spacing conventions that can affect line breaks, visual density and component dimensions differently from Latin text. A representative sample helps reveal those differences before final content is ready."],
  ["Do Japanese and Chinese use spaces between words?", "Japanese and Chinese text normally does not use spaces to separate words. Avoid adding spaces between characters just to make a sample resemble English or Italian."],
  ["What is the difference between Simplified and Traditional Chinese for layout testing?", "They use different character forms, and typographic conventions can also vary by region and context. Testing both separately helps check density, punctuation and mixed-script text."],
  ["Does Korean use spaces?", "Modern Korean normally uses spaces between word groups. Its line wrapping can therefore behave differently from Japanese and Chinese, especially in narrow controls and cards."],
  ["How are words counted in these languages?", "Counting follows each language’s own rules. Japanese uses the browser’s language-aware segmentation, while Chinese and Korean use their respective engine counting conventions."],
  ["Can I use this text as a translation or final copy?", "No. The generated text is for testing layouts and interfaces. Replace it with reviewed, production-ready content before publication."],
] as const;

export function EnglishLanguagesEditorial() {
  return <>
    <EditorialSection id="languages-layout" eyebrow="MULTILINGUAL LAYOUTS" title="Test layouts across writing systems" split>
      <p>Japanese, Chinese and Korean are not simply Latin text replaced with different characters. Writing systems, visual density, punctuation and line-breaking behavior can change the balance of cards, menus, buttons and editorial pages.</p>
      <p>Generate placeholder text in the selected language to test how an interface behaves before final translations and content are ready. This is also useful when a team is less familiar with the project language.</p>
    </EditorialSection>
    <EditorialSection id="languages-scripts" eyebrow="ASIAN WRITING SYSTEMS" title="How Japanese, Chinese and Korean affect layouts" split>
      <EditorialTable label="Comparison of Asian writing systems and layout behavior" compact headers={["Language", "Writing system", "Spaces between words", "Check for"]} rows={[
        ["Japanese", "Kanji, hiragana and katakana", "Usually no", "Line breaks, punctuation and visual density"],
        ["Simplified Chinese", "Simplified Han characters", "Usually no", "Character width, punctuation and mixed-script text"],
        ["Traditional Chinese", "Traditional Han characters", "Usually no", "Density, regional conventions and wrapping"],
        ["Korean", "Hangul, sometimes Latin or Hanja", "Yes", "Spacing, word length and wrapping"],
      ]} />
    </EditorialSection>
    <EditorialSection id="languages-japanese" eyebrow="JAPANESE — 日本語" title="Testing Japanese layouts" split>
      <p>Japanese commonly combines kanji, hiragana and katakana in the same text and normally does not separate words with spaces. A layout tested with Lorem Ipsum can behave differently when filled with Japanese content.</p>
      <p>Check line breaks, line height and punctuation placement in narrow controls. Avoid inserting spaces between characters: that changes real text behavior and makes the test less representative.</p>
    </EditorialSection>
    <EditorialSection id="languages-simplified-chinese" eyebrow="SIMPLIFIED CHINESE — 简体中文" title="Testing Simplified Chinese layouts" split>
      <p>Simplified Chinese uses Han characters and normally does not separate words with spaces. Its visual density can look quite different from a page designed around English or Italian text.</p>
      <p>Check line breaks, punctuation, narrow components and content that mixes Chinese characters with numbers or Latin words. Do not insert artificial spaces or automatically reduce the font to make text fit.</p>
    </EditorialSection>
    <EditorialSection id="languages-traditional-chinese" eyebrow="TRADITIONAL CHINESE — 繁體中文" title="Traditional Chinese is more than a character variant" split>
      <p>Traditional Chinese uses different Han character forms, but the distinction from Simplified Chinese is not purely visual. Typographic conventions can also vary between markets and contexts.</p>
      <p>Test Traditional Chinese separately rather than treating it as a simple character substitution. Pay particular attention to density, punctuation, short lines and components that mix Chinese, numbers and Latin text.</p>
    </EditorialSection>
    <EditorialSection id="languages-korean" eyebrow="KOREAN — 한국어" title="Korean layout behavior" split>
      <p>Modern Korean is written primarily in Hangul and normally uses spaces between word groups, unlike Japanese and Chinese. The same spacing assumptions should not be applied automatically to all three languages.</p>
      <p>Preserve the spaces in Korean text and check how words wrap in narrow lines, buttons, menus and cards. Also test Hangul alongside numbers and Latin terms, which are common in digital interfaces.</p>
    </EditorialSection>
    <EditorialSection id="languages-checklist" eyebrow="LAYOUT CHECKLIST" title="What to check in multilingual interfaces" split>
      <ul className={styles.checklist}>
        <li>Do not add spaces manually in Japanese or Chinese text.</li>
        <li>Test cards, buttons and menus, not only long paragraphs.</li>
        <li>Check narrow mobile widths and short lines.</li>
        <li>Review punctuation and line breaks for unexpected visual results.</li>
        <li>Keep the correct <code>lang</code> attribute in the HTML.</li>
        <li>Use placeholder text for layout testing, not as a translation or final content.</li>
      </ul>
    </EditorialSection>
    <EditorialSection id="languages-modes" eyebrow="QUANTITY AND FORMAT" title="Words, characters or sentences? Choose a paragraph count too." split>
      <EditorialTable label="Generation modes and use cases" compact headers={["Mode", "When to use it"]} rows={[
        ["Words", "For editorial sections, longer descriptions and pages with multiple content blocks."],
        ["Characters", "For cards, teasers, dialogs and components with a precise space limit."],
        ["Sentences", "For short descriptions, messages, forms and compact text blocks."],
      ]} />
      <p>Word counts follow the selected language’s own segmentation and counting rules, so Japanese, Chinese and Korean are handled according to their writing systems.</p>
    </EditorialSection>
    <section className="faq-section" aria-labelledby="languages-faq-title">
      <div className="faq-heading"><span className="eyebrow">FREQUENTLY ASKED QUESTIONS</span><h2 id="languages-faq-title">Asian-language placeholder text: FAQ</h2></div>
      <div className="faq-list">{faqItems.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
    </section>
  </>;
}
