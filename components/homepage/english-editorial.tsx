import { EditorialSection, EditorialTable } from "./italian-editorial";
import styles from "./italian-editorial.module.css";

export const englishHomepageFaqItems: [string, string][] = [
  ["Does Lorem Ipsum actually mean anything?", "Modern Lorem Ipsum is derived from classical Latin, but the text has been altered and rearranged over time. It therefore looks like natural language without forming a coherent passage."],
  ["What is the difference between Lorem Ipsum, dummy text and placeholder text?", "Dummy text and placeholder text are general terms for temporary text used inside a layout. Lorem Ipsum is one of the most widely used forms of placeholder text."],
  ["How can I generate 100, 150 or 250 characters of Lorem Ipsum?", "Select Characters and enter the length you need. The generator creates Lorem Ipsum with the requested character count, including spaces and punctuation. You can use it to test short descriptions, cards and other text areas with fixed limits."],
  ["Does the Lorem Ipsum character count include spaces?", "Yes. The Characters mode includes spaces and punctuation in the total. A separate “Without spaces” counter shows the length excluding spaces. This does not remove spaces from the generated text."],
];

export function EnglishHomepageEditorial() {
  return <>
    <EditorialSection id="english-quantity-guide" eyebrow="QUICK REFERENCE" title="How much Lorem Ipsum should you use?" split>
      <p>The right amount of placeholder text depends on the component you are designing. A card or hero subtitle may need only a few lines, while an editorial page needs several paragraphs to test rhythm, spacing and how the layout behaves with longer content.</p>
      <EditorialTable label="Recommended Lorem Ipsum amounts by use case" compact headers={["Use case", "Recommended amount", "Mode"]} rows={[
        ["Microcopy or short caption", "100–150 characters", "Characters"],
        ["Hero subtitle", "150–250 characters", "Characters"],
        ["Product or service card", "50–80 words", "Words"],
        ["Description block", "about 100 words", "Words"],
        ["Article preview", "150–250 words", "Words"],
        ["Editorial section", "3–5 paragraphs", "Words + paragraphs"],
        ["Long-form layout", "5–8 paragraphs", "Words + paragraphs"],
      ]} />
      <p>These values are not strict rules. Use them as a practical starting point for simulating realistic content lengths. If you need to test a hard constraint, switch to Characters or enter the exact number of words you need.</p>
    </EditorialSection>
    <EditorialSection id="english-content-testing" eyebrow="TESTING CONTENT" title="When to use Lorem Ipsum — and when to use real copy" split>
      <p>Lorem Ipsum is useful during the early stages of design, when you need to evaluate structure, typography, density and component behavior without depending on final copy.</p>
      <div className={styles.listGrid}>
        <div><h3>Use placeholder text for:</h3><ul>
          <li>wireframes and prototypes;</li><li>responsive testing;</li><li>cards, modules and dashboards;</li><li>editorial layouts;</li><li>comparing different content lengths.</li>
        </ul></div>
        <div><h3>Switch to real content when you need to evaluate:</h3><ul>
          <li>tone of voice;</li><li>comprehension;</li><li>final editorial hierarchy;</li><li>real lengths of names, CTAs and messages;</li><li>accessibility and the quality of the final user experience.</li>
        </ul></div>
      </div>
      <p>Lorem Ipsum works best as a temporary design tool: it helps you validate the container, while real copy is necessary to validate the finished product.</p>
    </EditorialSection>
  </>;
}

const themedFaqItems = [
  ["What is the difference between Lorem Ipsum and Themed Ipsum?", "Traditional Lorem Ipsum uses neutral pseudo-Latin text. Themed Ipsum generates placeholder text using vocabulary and phrases related to a specific industry or context."],
  ["Can I choose the language?", "Yes. The English page generates Themed Ipsum in English. Localized themed pages let you switch between the local language and English while preserving the selected theme and mode."],
  ["Can I generate an exact amount of text?", "Yes. You can set exact words and paragraphs, sentences, or a precise character count."],
  ["What is themed placeholder text useful for?", "It helps create more realistic mockups and prototypes, especially when industry-specific vocabulary affects the visual appearance of a layout."],
  ["Is Themed Ipsum final content?", "No. It is temporary content intended for design, testing and prototyping, and should be replaced with final copy before publication."],
];

export function EnglishThemedEditorial() {
  return <>
    <EditorialSection id="english-themed-explanation" eyebrow="CONTEXTUAL PLACEHOLDER TEXT" title="What is Themed Ipsum?" split>
      <p>Themed Ipsum is placeholder text built around a specific industry or context. It serves the same basic purpose as traditional Lorem Ipsum, but uses vocabulary, expressions and phrases related to areas such as technology, artificial intelligence, design, fashion or business.</p>
      <p>It is useful when generic pseudo-Latin text does not realistically represent the type of content that will appear in the final project. A SaaS product mockup, an AI landing page or a fashion lookbook can feel more credible when the placeholder text uses terminology closer to the intended context.</p>
    </EditorialSection>
    <EditorialSection id="english-themed-comparison" eyebrow="CLASSIC OR THEMED" title="Classic Lorem Ipsum or Themed Ipsum?" split>
      <EditorialTable label="Comparison of Classic Lorem Ipsum and Themed Ipsum" compact headers={["Classic Lorem Ipsum", "Themed Ipsum"]} rows={[
        ["Neutral pseudo-Latin text", "Context-specific placeholder text"],
        ["Ideal for testing composition and spacing", "Useful for more realistic mockups"],
        ["Not tied to a specific industry", "Uses Corporate, Tech, AI, Design, Fashion or Zombie terminology"],
        ["Good for general layout tests", "Better suited to contextual prototypes"],
      ]} />
      <p>Both are useful for testing a layout. The difference is the level of realism: Classic Lorem Ipsum keeps the content neutral, while Themed Ipsum better simulates the kind of language that may appear in the final project.</p>
    </EditorialSection>
    <EditorialSection id="english-themed-quantity" eyebrow="RECOMMENDED AMOUNTS" title="How much themed placeholder text should you generate?" split>
      <EditorialTable label="Recommended themed placeholder text amounts by use case" compact headers={["Use case", "Recommended amount"]} rows={[
        ["UI card", "100–150 characters"], ["Hero or teaser", "150–250 characters"],
        ["Product module", "50–100 words"], ["Landing page section", "2–3 paragraphs"],
        ["Editorial mockup", "3–5 paragraphs"], ["Long-form prototype", "250+ words"],
      ]} />
    </EditorialSection>
    <section className="faq-section" aria-labelledby="english-themed-faq-title">
      <div className="faq-heading"><span className="eyebrow">THEMED IPSUM QUESTIONS</span><h2 id="english-themed-faq-title">Themed Ipsum FAQ</h2></div>
      <div className="faq-list">{themedFaqItems.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
    </section>
  </>;
}
