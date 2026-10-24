import { EditorialSection, EditorialTable } from "@/components/homepage/italian-editorial";
import styles from "./languages-generator.module.css";

const faqItems = [
  ["Por que testar layouts com textos em idiomas asiáticos?", "Japonês, chinês e coreano usam sistemas de escrita diferentes do alfabeto latino. A densidade visual, a pontuação, os espaços e as quebras de linha podem mudar o comportamento de componentes e páginas."],
  ["Japonês e chinês usam espaços entre as palavras?", "Em geral, não. Inserir espaços artificiais altera o fluxo natural desses textos e pode distorcer a avaliação do layout."],
  ["Qual é a diferença entre chinês simplificado e tradicional?", "As duas variantes usam conjuntos de caracteres diferentes e podem seguir convenções tipográficas distintas conforme o contexto. Vale testar cada uma separadamente."],
  ["O coreano usa espaços?", "Sim. No coreano moderno, os grupos de palavras normalmente são separados por espaços, o que influencia a quebra de linhas e a distribuição do texto."],
  ["Como o gerador conta palavras nesses idiomas?", "A contagem depende do idioma selecionado. Para o japonês, o gerador usa a segmentação linguística disponível no navegador, já que o texto geralmente não separa palavras com espaços."],
  ["Posso usar o texto gerado como tradução ou conteúdo final?", "Não. O texto serve para testar interfaces e layouts. Antes de publicar, substitua-o por conteúdo real e revisado."],
] as const;

export function BrazilianPortugueseLanguagesEditorial() {
  return <>
    <EditorialSection id="languages-layout" eyebrow="LAYOUTS MULTILÍNGUES" title="Teste interfaces com diferentes sistemas de escrita" split>
      <p>Textos em japonês, chinês ou coreano podem alterar a densidade visual, o ritmo das linhas e o espaço ocupado por menus, botões, cards e áreas de conteúdo. Testar essas diferenças ajuda a encontrar ajustes necessários antes da etapa final de localização.</p>
      <p>O texto de teste no idioma escolhido permite avaliar tipografia, espaçamento, pontuação e quebras de linha. Também pode ser útil quando a equipe ainda não conhece bem o idioma do projeto.</p>
    </EditorialSection>
    <EditorialSection id="languages-scripts" eyebrow="SISTEMAS DE ESCRITA" title="Japonês, chinês e coreano no layout" split>
      <EditorialTable label="Sistemas de escrita e aspectos de layout" compact headers={["Idioma", "Escrita", "Espaços", "O que conferir"]} rows={[
        ["Japonês", "Kanji, hiragana e katakana", "Geralmente não", "Quebras de linha, pontuação e densidade"],
        ["Chinês simplificado", "Caracteres Han simplificados", "Geralmente não", "Largura dos caracteres e texto misto"],
        ["Chinês tradicional", "Caracteres Han tradicionais", "Geralmente não", "Densidade, convenções e alinhamento"],
        ["Coreano", "Hangul, com possíveis termos latinos ou Hanja", "Sim", "Espaçamento e comprimento das palavras"],
      ]} />
    </EditorialSection>
    <EditorialSection id="languages-japanese" eyebrow="JAPONÊS — 日本語" title="Confira a composição do texto japonês" split>
      <p>O japonês combina kanji, hiragana e katakana e normalmente não separa palavras com espaços. Por isso, um layout preenchido com Lorem Ipsum pode se comportar de outro jeito quando recebe conteúdo em japonês.</p>
      <p>Observe as quebras de linha, a altura das linhas e a posição da pontuação. Evite inserir espaços manualmente entre os caracteres, pois isso altera o comportamento do texto.</p>
    </EditorialSection>
    <EditorialSection id="languages-chinese" eyebrow="CHINÊS — 中文" title="Teste as duas variantes do chinês" split>
      <p>O chinês simplificado e o tradicional diferem nos caracteres usados, e algumas convenções tipográficas também podem variar conforme o mercado e o contexto.</p>
      <p>Teste cada variante separadamente. Confira componentes estreitos, pontuação e trechos que misturam caracteres chineses com números ou termos em alfabeto latino.</p>
    </EditorialSection>
    <EditorialSection id="languages-korean" eyebrow="COREANO — 한국어" title="Avalie o espaçamento em coreano" split>
      <p>O coreano moderno é escrito principalmente em Hangul e costuma separar grupos de palavras com espaços. Isso influencia a distribuição do texto em linhas curtas, botões, menus e cards.</p>
      <p>Confira também a combinação de Hangul com números e termos latinos, comum em interfaces digitais.</p>
    </EditorialSection>
    <EditorialSection id="languages-checklist" eyebrow="REVISÃO DE LAYOUT" title="O que observar em uma interface multilíngue" split>
      <ul className={styles.checklist}>
        <li>Não insira espaços artificiais em japonês ou chinês.</li>
        <li>Confira cards, botões e menus, além dos parágrafos longos.</li>
        <li>Teste telas estreitas e linhas curtas.</li>
        <li>Observe pontuação, alinhamento e altura das linhas.</li>
        <li>Use o atributo HTML <code>lang</code> correspondente ao texto.</li>
        <li>Use o conteúdo gerado para testes de layout, não como tradução ou texto final.</li>
      </ul>
    </EditorialSection>
    <EditorialSection id="languages-modes" eyebrow="QUANTIDADE E FORMATO" title="Palavras, caracteres ou frases? Defina também os parágrafos." split>
      <EditorialTable label="Modos de geração e usos comuns" compact headers={["Modo", "Indicado para"]} rows={[
        ["Palavras", "Simular seções editoriais, descrições e páginas com vários blocos."],
        ["Caracteres", "Testar cards, prévias e componentes com limite de caracteres."],
        ["Frases", "Avaliar mensagens curtas, instruções e blocos compactos."],
      ]} />
      <p>Em idiomas como o japonês, nos quais os espaços não delimitam as palavras, o gerador usa a segmentação linguística do navegador para calcular a quantidade solicitada.</p>
    </EditorialSection>
    <section className="faq-section" aria-labelledby="languages-faq-title">
      <div className="faq-heading"><span className="eyebrow">PERGUNTAS FREQUENTES</span><h2 id="languages-faq-title">Ipsum Asiático: perguntas frequentes</h2></div>
      <div className="faq-list">{faqItems.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
    </section>
  </>;
}
