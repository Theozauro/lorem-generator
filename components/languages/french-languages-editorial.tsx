import { EditorialSection, EditorialTable } from "@/components/homepage/italian-editorial";
import styles from "./languages-generator.module.css";

const faqItems = [
  ["Pourquoi tester les interfaces avec du texte en langues asiatiques ?", "Le japonais, le chinois et le coréen utilisent des systèmes d’écriture et des conventions d’espacement différents du français. Un échantillon adapté permet de vérifier les retours à la ligne, la densité visuelle et les dimensions des composants."],
  ["Le japonais et le chinois séparent-ils les mots par des espaces ?", "En règle générale, non. Ajouter des espaces entre les caractères modifierait le comportement habituel du texte et rendrait le test moins représentatif."],
  ["Quelle différence entre chinois simplifié et chinois traditionnel ?", "Les formes des caractères diffèrent, et certaines conventions typographiques peuvent varier selon les régions. Il est donc utile de tester les deux variantes séparément."],
  ["Le coréen utilise-t-il des espaces ?", "Oui. Le coréen moderne sépare généralement les groupes de mots par des espaces ; son comportement de retour à la ligne diffère donc de celui du japonais et du chinois."],
  ["Comment les mots sont-ils comptés ?", "Le comptage suit les règles propres à chaque langue et à son système d’écriture. Le générateur applique le compteur prévu pour la langue sélectionnée."],
  ["Ces textes peuvent-ils servir de traduction ou de contenu final ?", "Non. Ils servent à tester la mise en page et les interfaces. Remplacez-les par un contenu réel, relu et validé avant publication."],
] as const;

export function FrenchLanguagesEditorial() {
  return <>
    <EditorialSection id="languages-layout" eyebrow="MISES EN PAGE MULTILINGUES" title="Tester une interface avec plusieurs systèmes d’écriture" split>
      <p>Le japonais, le chinois et le coréen ne sont pas du texte latin auquel on aurait simplement substitué d’autres caractères. La densité visuelle, les espaces, la ponctuation et les règles de retour à la ligne peuvent modifier l’équilibre des cartes, menus, boutons et pages éditoriales.</p>
      <p>Le texte de substitution dans la langue choisie permet d’observer le comportement de l’interface avant que les traductions et le contenu définitif soient disponibles. Il aide aussi les équipes à valider les parcours de localisation et les choix typographiques.</p>
    </EditorialSection>
    <EditorialSection id="languages-scripts" eyebrow="SYSTÈMES D’ÉCRITURE" title="Japonais, chinois et coréen : ce qui change dans la mise en page" split>
      <EditorialTable label="Comparaison des systèmes d’écriture asiatiques et de leur comportement en mise en page" compact headers={["Langue", "Écriture", "Espaces entre les mots", "Points à vérifier"]} rows={[
        ["Japonais", "Kanji, hiragana et katakana", "Généralement aucun", "Retours à la ligne, ponctuation, densité visuelle"],
        ["Chinois simplifié", "Caractères Han simplifiés", "Généralement aucun", "Largeur des caractères, ponctuation, texte mixte"],
        ["Chinois traditionnel", "Caractères Han traditionnels", "Généralement aucun", "Densité, conventions régionales, retour à la ligne"],
        ["Coréen", "Hangul, parfois latin ou hanja", "Oui", "Espacement, longueur des mots, retour à la ligne"],
      ]} />
    </EditorialSection>
    <EditorialSection id="languages-checklist" eyebrow="VÉRIFICATION DE L’INTERFACE" title="Que vérifier dans une mise en page multilingue ?" split>
      <ul className={styles.checklist}>
        <li>N’ajoutez pas d’espaces manuellement en japonais ou en chinois.</li>
        <li>Testez les cartes, boutons et menus, pas seulement les paragraphes longs.</li>
        <li>Vérifiez les petites largeurs d’écran et les lignes courtes.</li>
        <li>Contrôlez le placement de la ponctuation et les retours à la ligne.</li>
        <li>Conservez l’attribut HTML <code>lang</code> correspondant au texte.</li>
        <li>Utilisez le texte de substitution pour tester la mise en page, pas comme traduction ou contenu définitif.</li>
      </ul>
    </EditorialSection>
    <EditorialSection id="languages-modes" eyebrow="QUANTITÉ ET FORMAT" title="Mots, caractères ou phrases ? Choisissez aussi le nombre de paragraphes." split>
      <EditorialTable label="Modes de génération et usages" compact headers={["Mode", "Quand l’utiliser"]} rows={[
        ["Mots", "Pour simuler des sections éditoriales, des descriptions longues ou plusieurs blocs de contenu."],
        ["Caractères", "Pour tester des cartes, accroches, fenêtres et composants soumis à une limite précise."],
        ["Phrases", "Pour des descriptions courtes, messages, formulaires et blocs compacts."],
      ]} />
      <p>Le nombre de mots est calculé selon les règles propres à la langue sélectionnée. Les modes Caractères et Phrases permettent de tester d’autres contraintes, tandis que le nombre de paragraphes reste réglable séparément.</p>
    </EditorialSection>
    <section className="faq-section" aria-labelledby="languages-faq-title">
      <div className="faq-heading"><span className="eyebrow">QUESTIONS FRÉQUENTES</span><h2 id="languages-faq-title">Texte de substitution en langues asiatiques : FAQ</h2></div>
      <div className="faq-list">{faqItems.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
    </section>
  </>;
}
