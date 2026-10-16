import { EditorialSection, EditorialTable } from "./italian-editorial";
import styles from "./italian-editorial.module.css";

export const frenchHomepageFaqItems: [string, string][] = [
  ["Le Lorem Ipsum signifie-t-il vraiment quelque chose ?", "Le Lorem Ipsum moderne est dérivé du latin classique, mais le texte a été modifié et réorganisé au fil du temps. Il ressemble donc visuellement à une langue naturelle sans former un discours cohérent."],
  ["Quelle est la différence entre Lorem Ipsum, dummy text et placeholder text ?", "Dummy text et placeholder text sont des termes génériques qui désignent du texte temporaire utilisé dans une mise en page. Lorem Ipsum est l’une des formes de texte de substitution les plus répandues."],
];

export const brazilianPortugueseHomepageFaqItems: [string, string][] = [
  ["Lorem Ipsum realmente significa alguma coisa?", "O Lorem Ipsum moderno deriva do latim clássico, mas o texto foi modificado e reorganizado ao longo do tempo. Por isso, ele se parece visualmente com uma linguagem natural sem formar um discurso coerente."],
  ["Qual é a diferença entre Lorem Ipsum, dummy text e placeholder text?", "Dummy text e placeholder text são termos genéricos para textos temporários usados em um layout. Lorem Ipsum é uma das formas mais conhecidas de texto de preenchimento."],
];

export function FrenchHomepageEditorial() {
  return <>
    <EditorialSection id="french-quantity-guide" eyebrow="GUIDE RAPIDE" title="Quelle quantité de Lorem Ipsum utiliser ?" split>
      <p>La quantité de texte de substitution dépend du composant que vous concevez. Une carte ou un sous-titre de hero peut ne nécessiter que quelques lignes, tandis qu’une page éditoriale demande plusieurs paragraphes pour évaluer le rythme, les espacements et le comportement de la mise en page avec un contenu plus long.</p>
      <EditorialTable label="Quantités de Lorem Ipsum recommandées selon le cas d’usage" compact headers={["Cas d’usage", "Quantité recommandée", "Mode"]} rows={[
        ["Microcopy ou courte légende", "100–150 caractères", "Caractères"], ["Sous-titre de hero", "150–250 caractères", "Caractères"], ["Carte produit ou service", "50–80 mots", "Mots"], ["Bloc descriptif", "environ 100 mots", "Mots"], ["Aperçu d’article", "150–250 mots", "Mots"], ["Section éditoriale", "3–5 paragraphes", "Mots + paragraphes"], ["Mise en page long format", "5–8 paragraphes", "Mots + paragraphes"],
      ]} />
      <p>Ces valeurs ne sont pas des règles strictes. Utilisez-les comme point de départ pour simuler des longueurs de contenu réalistes. Si vous devez tester une contrainte précise, choisissez le mode Caractères ou saisissez directement le nombre exact de mots souhaité.</p>
    </EditorialSection>
    <EditorialSection id="french-content-testing" eyebrow="TESTER LE CONTENU" title="Quand utiliser Lorem Ipsum — et quand utiliser du vrai contenu" split>
      <p>Lorem Ipsum est utile dans les premières étapes de conception, lorsque vous souhaitez évaluer la structure, la typographie, la densité et le comportement des composants sans dépendre du contenu final.</p>
      <div className={styles.listGrid}>
        <div><h3>Utilisez du texte de substitution pour :</h3><ul><li>les wireframes et les prototypes ;</li><li>les tests responsive ;</li><li>les cartes, modules et dashboards ;</li><li>les mises en page éditoriales ;</li><li>comparer différentes quantités de contenu.</li></ul></div>
        <div><h3>Passez au contenu réel pour évaluer :</h3><ul><li>le ton éditorial ;</li><li>la compréhension ;</li><li>la hiérarchie éditoriale finale ;</li><li>la longueur réelle des noms, CTA et messages ;</li><li>l’accessibilité et la qualité de l’expérience finale.</li></ul></div>
      </div>
      <p>Lorem Ipsum fonctionne mieux comme outil de conception temporaire : il aide à valider le contenant, tandis que le vrai contenu est nécessaire pour valider le produit final.</p>
    </EditorialSection>
  </>;
}

export function BrazilianPortugueseHomepageEditorial() {
  return <>
    <EditorialSection id="pt-br-quantity-guide" eyebrow="GUIA RÁPIDO" title="Quanto Lorem Ipsum você deve usar?" split>
      <p>A quantidade ideal de texto de preenchimento depende do componente que você está projetando. Um card ou subtítulo de hero pode precisar de apenas algumas linhas, enquanto uma página editorial exige vários parágrafos para avaliar o ritmo, o espaçamento e o comportamento do layout com conteúdo mais longo.</p>
      <EditorialTable label="Quantidades de Lorem Ipsum recomendadas por caso de uso" compact headers={["Caso de uso", "Quantidade recomendada", "Modo"]} rows={[
        ["Microcopy ou legenda curta", "100–150 caracteres", "Caracteres"], ["Subtítulo de hero", "150–250 caracteres", "Caracteres"], ["Card de produto ou serviço", "50–80 palavras", "Palavras"], ["Bloco descritivo", "cerca de 100 palavras", "Palavras"], ["Prévia de artigo", "150–250 palavras", "Palavras"], ["Seção editorial", "3–5 parágrafos", "Palavras + parágrafos"], ["Layout long-form", "5–8 parágrafos", "Palavras + parágrafos"],
      ]} />
      <p>Esses valores não são regras rígidas. Use-os como ponto de partida para simular comprimentos de conteúdo realistas. Se precisar testar um limite específico, use o modo Caracteres ou informe diretamente a quantidade exata de palavras.</p>
    </EditorialSection>
    <EditorialSection id="pt-br-content-testing" eyebrow="TESTAR O CONTEÚDO" title="Quando usar Lorem Ipsum — e quando usar conteúdo real" split>
      <p>Lorem Ipsum é útil nas primeiras etapas do design, quando você precisa avaliar estrutura, tipografia, densidade e comportamento dos componentes sem depender do copy definitivo.</p>
      <div className={styles.listGrid}>
        <div><h3>Use texto de preenchimento para:</h3><ul><li>wireframes e protótipos;</li><li>testes responsivos;</li><li>cards, módulos e dashboards;</li><li>layouts editoriais;</li><li>comparar diferentes quantidades de conteúdo.</li></ul></div>
        <div><h3>Passe para conteúdo real quando precisar avaliar:</h3><ul><li>tom de voz;</li><li>compreensão;</li><li>hierarquia editorial final;</li><li>comprimentos reais de nomes, CTAs e mensagens;</li><li>acessibilidade e qualidade da experiência final.</li></ul></div>
      </div>
      <p>Lorem Ipsum funciona melhor como ferramenta temporária de design: ajuda a validar o contêiner, enquanto o copy real é necessário para validar o produto final.</p>
    </EditorialSection>
  </>;
}

const frenchThemedFaqItems: [string, string][] = [
  ["Quelle est la différence entre Lorem Ipsum et Ipsum thématique ?", "Le Lorem Ipsum traditionnel utilise un texte pseudo-latin neutre. L’Ipsum thématique génère du texte de substitution avec du vocabulaire et des expressions liés à un secteur ou à un contexte spécifique."],
  ["Puis-je choisir la langue ?", "Oui. Sur la page française, vous pouvez générer de l’Ipsum thématique en français ou en anglais tout en conservant le même thème et le même mode."],
  ["Puis-je générer une quantité exacte de texte ?", "Oui. Vous pouvez définir un nombre exact de mots et de paragraphes, de phrases ou de caractères."],
  ["À quoi sert le texte de substitution thématique ?", "Il aide à créer des mockups et des prototypes plus réalistes, notamment lorsque le vocabulaire propre au projet influence l’apparence de la mise en page."],
  ["Les textes thématiques sont-ils du contenu final ?", "Non. Ils servent de contenu temporaire pour la conception, les tests et le prototypage, puis doivent être remplacés par le contenu définitif."],
];

const brazilianPortugueseThemedFaqItems: [string, string][] = [
  ["Qual é a diferença entre Lorem Ipsum e Ipsum temático?", "O Lorem Ipsum tradicional usa texto pseudo-latino neutro. O Ipsum temático gera texto de preenchimento com vocabulário e expressões ligados a um setor ou contexto específico."],
  ["Posso escolher o idioma?", "Sim. Na página brasileira, você pode gerar Ipsum temático em português do Brasil ou em inglês mantendo o mesmo tema e modo."],
  ["Posso gerar uma quantidade exata de texto?", "Sim. Você pode definir uma quantidade exata de palavras e parágrafos, frases ou caracteres."],
  ["Para que serve o texto de preenchimento temático?", "Ele ajuda a criar mockups e protótipos mais realistas, especialmente quando o vocabulário específico do projeto influencia a aparência do layout."],
  ["Os textos temáticos são conteúdo final?", "Não. Eles são pensados como conteúdo temporário para design, testes e prototipagem e devem ser substituídos pelo copy final antes da publicação."],
];

function ThemedFaq({ locale }: { locale: "fr" | "pt-BR" }) {
  const french = locale === "fr";
  const items = french ? frenchThemedFaqItems : brazilianPortugueseThemedFaqItems;
  return <section className="faq-section" aria-labelledby={`${french ? "french" : "pt-br"}-themed-faq-title`}>
    <div className="faq-heading"><span className="eyebrow">{french ? "QUESTIONS SUR L’IPSUM THÉMATIQUE" : "PERGUNTAS SOBRE IPSUM TEMÁTICO"}</span><h2 id={`${french ? "french" : "pt-br"}-themed-faq-title`}>{french ? "FAQ sur l’Ipsum thématique" : "FAQ sobre Ipsum temático"}</h2></div>
    <div className="faq-list">{items.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
  </section>;
}

export function FrenchThemedEditorial() {
  return <>
    <EditorialSection id="french-themed-explanation" eyebrow="TEXTE DE SUBSTITUTION CONTEXTUEL" title="Qu’est-ce que l’Ipsum thématique ?" split>
      <p>L’Ipsum thématique est un texte de substitution construit autour d’un secteur ou d’un contexte spécifique. Il remplit la même fonction de base que le Lorem Ipsum traditionnel, mais utilise du vocabulaire, des expressions et des formulations liés à des domaines comme la technologie, l’intelligence artificielle, le design, la mode ou le business.</p>
      <p>Il est utile lorsque le pseudo-latin générique ne représente pas suffisamment bien le type de contenu qui apparaîtra dans le projet final. Un mockup de produit SaaS, une landing page consacrée à l’IA ou un lookbook de mode paraissent plus crédibles lorsque le texte utilise une terminologie proche du contexte réel.</p>
    </EditorialSection>
    <EditorialSection id="french-themed-comparison" eyebrow="CLASSIQUE OU THÉMATIQUE" title="Lorem Ipsum classique ou Ipsum thématique ?" split>
      <EditorialTable label="Comparaison entre Lorem Ipsum classique et Ipsum thématique" compact headers={["Lorem Ipsum classique", "Ipsum thématique"]} rows={[["Texte pseudo-latin neutre", "Texte lié à un contexte spécifique"], ["Idéal pour tester la composition et les espacements", "Utile pour des mockups plus réalistes"], ["Sans lien avec un secteur particulier", "Terminologie Corporate, Tech, IA, Design, Mode ou Zombie"], ["Adapté aux tests généraux de mise en page", "Mieux adapté aux prototypes contextualisés"]]} />
      <p>Les deux permettent de tester une mise en page. La différence tient au niveau de réalisme : le Lorem Ipsum classique conserve un contenu neutre, tandis que l’Ipsum thématique simule mieux le type de langage qui pourra apparaître dans le projet final.</p>
    </EditorialSection>
    <EditorialSection id="french-themed-quantity" eyebrow="QUANTITÉS RECOMMANDÉES" title="Quelle quantité de texte thématique générer ?" split>
      <EditorialTable label="Quantités de texte thématique recommandées" compact headers={["Cas d’usage", "Quantité recommandée"]} rows={[["Carte UI", "100–150 caractères"], ["Hero ou teaser", "150–250 caractères"], ["Module produit", "50–100 mots"], ["Section de landing page", "2–3 paragraphes"], ["Mockup éditorial", "3–5 paragraphes"], ["Prototype long format", "250+ mots"]]} />
    </EditorialSection>
    <ThemedFaq locale="fr" />
  </>;
}

export function BrazilianPortugueseThemedEditorial() {
  return <>
    <EditorialSection id="pt-br-themed-explanation" eyebrow="TEXTO DE PREENCHIMENTO CONTEXTUAL" title="O que é Ipsum temático?" split>
      <p>Ipsum temático é um texto de preenchimento construído em torno de um setor ou contexto específico. Ele cumpre a mesma função básica do Lorem Ipsum tradicional, mas utiliza vocabulário, expressões e frases relacionadas a áreas como tecnologia, inteligência artificial, design, moda ou negócios.</p>
      <p>É útil quando o pseudo-latim genérico não representa de forma realista o tipo de conteúdo que aparecerá no projeto final. Um mockup de produto SaaS, uma landing page de IA ou um lookbook de moda parecem mais críveis quando o texto utiliza terminologia próxima do contexto real.</p>
    </EditorialSection>
    <EditorialSection id="pt-br-themed-comparison" eyebrow="CLÁSSICO OU TEMÁTICO" title="Lorem Ipsum clássico ou Ipsum temático?" split>
      <EditorialTable label="Comparação entre Lorem Ipsum clássico e Ipsum temático" compact headers={["Lorem Ipsum clássico", "Ipsum temático"]} rows={[["Texto pseudo-latino neutro", "Texto ligado a um contexto específico"], ["Ideal para testar composição e espaçamento", "Útil para mockups mais realistas"], ["Sem vínculo com um setor específico", "Usa terminologia Corporate, Tech, IA, Design, Moda ou Zombie"], ["Bom para testes gerais de layout", "Mais adequado para protótipos contextualizados"]]} />
      <p>Ambos servem para testar um layout. A diferença está no nível de realismo: o Lorem Ipsum clássico mantém o conteúdo neutro, enquanto o Ipsum temático simula melhor o tipo de linguagem que pode aparecer no projeto final.</p>
    </EditorialSection>
    <EditorialSection id="pt-br-themed-quantity" eyebrow="QUANTIDADES RECOMENDADAS" title="Quanto texto temático você deve gerar?" split>
      <EditorialTable label="Quantidades recomendadas de texto temático" compact headers={["Caso de uso", "Quantidade recomendada"]} rows={[["Card de UI", "100–150 caracteres"], ["Hero ou teaser", "150–250 caracteres"], ["Módulo de produto", "50–100 palavras"], ["Seção de landing page", "2–3 parágrafos"], ["Mockup editorial", "3–5 parágrafos"], ["Protótipo long-form", "250+ palavras"]]} />
    </EditorialSection>
    <ThemedFaq locale="pt-BR" />
  </>;
}
