import type { HomepageCopy } from "./homepage-copy";
import { enHomepageCopy } from "./homepage-copy/en";
import { itHomepageCopy } from "./homepage-copy/it";
import { deHomepageCopy } from "./homepage-copy/de";
import { frHomepageCopy } from "./homepage-copy/fr";
import { ptbrHomepageCopy } from "./homepage-copy/pt-br";
import { plHomepageCopy } from "./homepage-copy/pl";
import { nlHomepageCopy } from "./homepage-copy/nl";
import type { ThemedLanguage, ThemedTheme } from "@/lib/themed-ipsum";
import { trHomepageCopy } from "./homepage-copy/tr";
import { huHomepageCopy } from "./homepage-copy/hu";
import { esHomepageCopy } from "./homepage-copy/es";

export type ThemedPageLocale = "en" | "it" | "es" | "de" | "fr" | "pt-BR" | "nl" | "pl" | "tr" | "hu";

type ThemeCard = {
  id: ThemedTheme;
  title: string;
  description: string;
  action: string;
};

export type ThemedPageConfig = {
  locale: ThemedPageLocale;
  copy: HomepageCopy;
  defaultContentLanguage: ThemedLanguage;
  showContentLanguageSelector: boolean;
  title: string;
  intro: string;
  topicLabel: string;
  themeLabels: Record<ThemedTheme, string>;
  contentLanguageLabel: string;
  contentLanguageNames: { primary: string; secondary: string };
  exploreTitle: string;
  cards: ThemeCard[];
};

export const frenchThemedPageConfig: ThemedPageConfig = {
  locale: "fr",
  copy: {
    ...frHomepageCopy,
    generator: {
      ...frHomepageCopy.generator,
      layout: "MOTS",
      characters: "CARACTÈRES",
      sentences: "PHRASES",
      quickWords: "VALEURS RAPIDES",
      words: "MOTS",
      paragraphs: "PARAGRAPHES",
      generate: "Générer",
    },
  },
  defaultContentLanguage: "fr",
  showContentLanguageSelector: true,
  title: "Générateur de Lorem Ipsum thématique",
  intro: "Générez du texte de substitution inspiré de secteurs et de contextes spécifiques tout en gardant un contrôle précis sur la quantité et le format du contenu.",
  topicLabel: "Thèmes",
  themeLabels: { corporate: "Corporate", tech: "Tech", ai: "IA", design: "Design", fashion: "Mode", zombie: "Zombie" },
  contentLanguageLabel: "LANGUE DU TEXTE",
  contentLanguageNames: { primary: "Français", secondary: "English" },
  exploreTitle: "EXPLOREZ LES THÈMES",
  cards: [
    { id: "corporate", title: "Corporate Ipsum", description: "Texte de substitution avec une terminologie business pour dashboards, rapports, présentations et produits B2B. Inclut des notions liées à la stratégie, aux KPI, aux parties prenantes, aux processus, à la croissance et aux opérations.", action: "Générer Corporate Ipsum" },
    { id: "tech", title: "Tech Ipsum", description: "Texte de substitution pour logiciels, produits numériques et interfaces techniques. Utilise des termes liés au cloud, aux API, à l’infrastructure, au développement, au déploiement, aux systèmes et à l’architecture.", action: "Générer Tech Ipsum" },
    { id: "ai", title: "IA Ipsum", description: "Texte de substitution consacré à l’intelligence artificielle et au machine learning. Inclut modèles, prompts, jeux de données, agents, automatisation, entraînement, inférence et workflows pilotés par les données.", action: "Générer IA Ipsum" },
    { id: "design", title: "Design Ipsum", description: "Texte de substitution pour mockups, portfolios et projets créatifs. Utilise des termes liés à l’UI, à la typographie, à la mise en page, aux composants, aux design systems, au branding et aux processus créatifs.", action: "Générer Design Ipsum" },
    { id: "fashion", title: "Ipsum Mode", description: "Texte de substitution pour lookbooks, e-commerce mode et contenus éditoriaux. Inclut collections, tissus, silhouettes, styling, matières, campagnes et direction créative.", action: "Générer un Ipsum Mode" },
    { id: "zombie", title: "Zombie Ipsum", description: "Texte de substitution pour jeux, concepts et projets post-apocalyptiques. Zombies, hordes, refuges, villes abandonnées, survie et ressources rendent les mockups plus immersifs.", action: "Générer Zombie Ipsum" },
  ],
};

export const brazilianPortugueseThemedPageConfig: ThemedPageConfig = {
  locale: "pt-BR",
  copy: {
    ...ptbrHomepageCopy,
    generator: {
      ...ptbrHomepageCopy.generator,
      mode: "MODO",
      modeLabel: "Modo de geração",
      layout: "PALAVRAS",
      characters: "CARACTERES",
      sentences: "FRASES",
      quickWords: "PRESETS",
      presets: "PRESETS",
      words: "PALAVRAS",
      paragraphs: "PARÁGRAFOS",
      generate: "Gerar",
    },
  },
  defaultContentLanguage: "pt-BR",
  showContentLanguageSelector: true,
  title: "Gerador de Lorem Ipsum temático",
  intro: "Gere texto de preenchimento inspirado em setores e contextos específicos, mantendo controle preciso sobre a quantidade e o formato do conteúdo.",
  topicLabel: "Temas",
  themeLabels: { corporate: "Corporate", tech: "Tech", ai: "IA", design: "Design", fashion: "Moda", zombie: "Zombie" },
  contentLanguageLabel: "IDIOMA DO TEXTO",
  contentLanguageNames: { primary: "Português do Brasil", secondary: "English" },
  exploreTitle: "EXPLORE OS TEMAS",
  cards: [
    { id: "corporate", title: "Corporate Ipsum", description: "Texto de preenchimento com terminologia de negócios para dashboards, relatórios, apresentações e produtos B2B. Inclui conceitos relacionados a estratégia, KPI, stakeholders, processos, crescimento e operações.", action: "Gerar Corporate Ipsum" },
    { id: "tech", title: "Tech Ipsum", description: "Texto de preenchimento para software, produtos digitais e interfaces técnicas. Usa termos ligados a cloud, API, infraestrutura, desenvolvimento, deploy, sistemas e arquitetura.", action: "Gerar Tech Ipsum" },
    { id: "ai", title: "IA Ipsum", description: "Texto de preenchimento focado em inteligência artificial e machine learning. Inclui modelos, prompts, datasets, agentes, automação, treinamento, inferência e fluxos orientados por dados.", action: "Gerar IA Ipsum" },
    { id: "design", title: "Design Ipsum", description: "Texto de preenchimento para mockups, portfólios e projetos criativos. Usa termos relacionados a UI, tipografia, layout, componentes, design systems, branding e processos criativos.", action: "Gerar Design Ipsum" },
    { id: "fashion", title: "Ipsum de Moda", description: "Texto de preenchimento para lookbooks, e-commerce de moda e conteúdo editorial. Inclui coleções, tecidos, silhuetas, styling, materiais, campanhas e direção criativa.", action: "Gerar Ipsum de Moda" },
    { id: "zombie", title: "Zombie Ipsum", description: "Texto de preenchimento para jogos, conceitos e projetos pós-apocalípticos. Zumbis, hordas, abrigos, cidades abandonadas, sobrevivência e recursos ajudam a criar mockups mais imersivos.", action: "Gerar Zombie Ipsum" },
  ],
};

export const dutchThemedPageConfig: ThemedPageConfig = {
  locale: "nl",
  copy: {
    ...nlHomepageCopy,
    generator: {
      ...nlHomepageCopy.generator,
      mode: "MODUS",
      modeLabel: "Generatiemodus",
      layout: "WOORDEN",
      characters: "TEKENS",
      sentences: "ZINNEN",
      quickWords: "SNELLE AANTALLEN",
      presets: "VOORINSTELLINGEN",
      words: "WOORDEN",
      paragraphs: "ALINEA'S",
      generate: "Genereren",
    },
  },
  defaultContentLanguage: "nl",
  showContentLanguageSelector: true,
  title: "Lorem Ipsum-generator op thema",
  intro: "Genereer opvultekst die is geïnspireerd op specifieke sectoren en contexten, met nauwkeurige controle over de hoeveelheid en het formaat van de inhoud.",
  topicLabel: "Thema's",
  themeLabels: { corporate: "Corporate", tech: "Tech", ai: "AI", design: "Design", fashion: "Mode", zombie: "Zombie" },
  contentLanguageLabel: "TEKSTTAAL",
  contentLanguageNames: { primary: "Nederlands", secondary: "English" },
  exploreTitle: "ONTDEK DE THEMA'S",
  cards: [
    { id: "corporate", title: "Corporate Ipsum", description: "Placeholdertekst met zakelijke terminologie voor dashboards, rapporten, presentaties en B2B-producten. Bevat begrippen rond strategie, KPI’s, stakeholders, processen, groei en bedrijfsvoering.", action: "Genereer Corporate Ipsum" },
    { id: "tech", title: "Tech Ipsum", description: "Placeholdertekst voor software, digitale producten en technische interfaces. Gebruikt termen rond cloud, API’s, infrastructuur, ontwikkeling, deployment, systemen en architectuur.", action: "Genereer Tech Ipsum" },
    { id: "ai", title: "AI Ipsum", description: "Placeholdertekst rond kunstmatige intelligentie en machine learning. Bevat modellen, prompts, datasets, agents, automatisering, training, inferentie en datagedreven workflows.", action: "Genereer AI Ipsum" },
    { id: "design", title: "Design Ipsum", description: "Placeholdertekst voor mockups, portfolio’s en creatieve projecten. Gebruikt termen rond UI, typografie, layout, componenten, design systems, branding en creatieve processen.", action: "Genereer Design Ipsum" },
    { id: "fashion", title: "Mode Ipsum", description: "Placeholdertekst voor lookbooks, fashion e-commerce en redactionele content. Bevat collecties, stoffen, silhouetten, styling, materialen, campagnes en creative direction.", action: "Genereer Mode Ipsum" },
    { id: "zombie", title: "Zombie Ipsum", description: "Placeholdertekst voor games, concepten en post-apocalyptische projecten. Zombies, hordes, schuilplaatsen, verlaten steden, overleving en middelen maken mockups meeslepender.", action: "Genereer Zombie Ipsum" },
  ],
};

export const italianThemedPageConfig: ThemedPageConfig = {
  locale: "it",
  copy: itHomepageCopy,
  defaultContentLanguage: "it",
  showContentLanguageSelector: true,
  title: "Generatore di Ipsum tematico",
  intro: "Genera testo segnaposto ispirato a settori e contesti specifici, mantenendo il controllo su quantità e formato del contenuto.",
  topicLabel: "Ipsum tematico",
  themeLabels: { corporate: "Corporate", tech: "Tech", ai: "AI", design: "Design", fashion: "Fashion", zombie: "Zombie" },
  contentLanguageLabel: "Lingua testo",
  contentLanguageNames: { primary: "Italiano", secondary: "English" },
  exploreTitle: "Esplora i temi",
  cards: [
    { id: "corporate", title: "Corporate Ipsum", description: "Testo segnaposto con terminologia business per dashboard, report, presentazioni e prodotti B2B. Include concetti legati a strategia, KPI, stakeholder, processi, crescita e operazioni aziendali.", action: "Genera Corporate Ipsum" },
    { id: "tech", title: "Tech Ipsum", description: "Testo segnaposto per software, prodotti digitali e interfacce tecniche. Usa termini legati a cloud, API, infrastrutture, sviluppo, deployment, sistemi e architetture.", action: "Genera Tech Ipsum" },
    { id: "ai", title: "AI Ipsum", description: "Testo segnaposto dedicato a intelligenza artificiale e machine learning. Include modelli, prompt, dataset, agenti, automazione, training, inferenza e flussi basati sui dati.", action: "Genera AI Ipsum" },
    { id: "design", title: "Design Ipsum", description: "Testo segnaposto per mockup, portfolio e progetti creativi. Usa termini di UI, tipografia, layout, componenti, design system, branding e processi creativi.", action: "Genera Design Ipsum" },
    { id: "fashion", title: "Fashion Ipsum", description: "Testo segnaposto per lookbook, e-commerce e contenuti editoriali moda. Include collezioni, tessuti, silhouette, styling, materiali, campagne e direzione creativa.", action: "Genera Fashion Ipsum" },
    { id: "zombie", title: "Zombie Ipsum", description: "Testo segnaposto per videogiochi, concept e progetti post-apocalittici. Tra zombie, orde, rifugi, città abbandonate, sopravvivenza e risorse, rende i mockup più immersivi.", action: "Genera Zombie Ipsum" },
  ],
};

export const polishThemedPageConfig: ThemedPageConfig = {
  locale: "pl",
  copy: { ...plHomepageCopy, generator: { ...plHomepageCopy.generator,
    layout: "SŁOWA", characters: "ZNAKI", sentences: "ZDANIA",
    words: "SŁOWA", paragraphs: "AKAPITY", quickWords: "PRESETY", presets: "PRESETY",
  } },
  defaultContentLanguage: "pl", showContentLanguageSelector: true,
  title: "Generator tematycznego Lorem Ipsum",
  intro: "Twórz tekst zastępczy inspirowany konkretnymi branżami i kontekstami, zachowując kontrolę nad długością i formatem.",
  topicLabel: "Ipsum tematyczny",
  themeLabels: { corporate: "Corporate", tech: "Tech", ai: "AI", design: "Design", fashion: "Moda", zombie: "Zombie" },
  contentLanguageLabel: "JĘZYK TEKSTU", contentLanguageNames: { primary: "Polski", secondary: "English" },
  exploreTitle: "ODKRYJ TEMATY",
  cards: [
    { id: "corporate", title: "Corporate Ipsum", description: "Tekst zastępczy z terminologią biznesową do pulpitów, raportów, prezentacji i produktów B2B. Obejmuje pojęcia związane ze strategią, wskaźnikami KPI, interesariuszami, procesami, rozwojem i działalnością firmy.", action: "Generuj Corporate Ipsum" },
    { id: "tech", title: "Tech Ipsum", description: "Tekst zastępczy do oprogramowania, produktów cyfrowych i interfejsów technicznych. Wykorzystuje terminy związane z chmurą, API, infrastrukturą, wytwarzaniem oprogramowania, wdrożeniami, systemami i architekturą.", action: "Generuj Tech Ipsum" },
    { id: "ai", title: "AI Ipsum", description: "Tekst zastępczy poświęcony sztucznej inteligencji i uczeniu maszynowemu. Obejmuje modele, instrukcje dla modeli, zbiory danych, agentów, automatyzację, trenowanie, wnioskowanie i przepływy oparte na danych.", action: "Generuj AI Ipsum" },
    { id: "design", title: "Design Ipsum", description: "Tekst zastępczy do makiet, portfolio i projektów kreatywnych. Wykorzystuje pojęcia związane z interfejsem użytkownika, typografią, układem strony, komponentami, systemem projektowym, identyfikacją marki i procesem projektowym.", action: "Generuj Design Ipsum" },
    { id: "fashion", title: "Moda Ipsum", description: "Tekst zastępczy do katalogów kolekcji, sklepów internetowych i treści redakcyjnych o modzie. Obejmuje kolekcje, tkaniny, sylwetki, stylizacje, materiały, kampanie i kierunek kreatywny.", action: "Generuj Moda Ipsum" },
    { id: "zombie", title: "Zombie Ipsum", description: "Tekst zastępczy do gier, koncepcji i projektów postapokaliptycznych. Zombie, hordy, schronienia, opuszczone miasta, przetrwanie i zasoby pomagają tworzyć bardziej realistyczne makiety.", action: "Generuj Zombie Ipsum" },
  ],
};

export const turkishThemedPageConfig: ThemedPageConfig = {
  locale: "tr",
  copy: { ...trHomepageCopy, generator: { ...trHomepageCopy.generator,
    mode: "MOD", modeLabel: "Oluşturma modu", layout: "KELİMELER + PARAGRAFLAR",
    characters: "KARAKTERLER", sentences: "CÜMLELER", words: "KELİMELER",
    paragraphs: "PARAGRAFLAR", quickWords: "HIZLI DEĞERLER", presets: "HIZLI DEĞERLER",
    stats: { ...trHomepageCopy.generator.stats, words: "kelime", characters: "karakter", withoutSpaces: "boşluksuz", sentences: "cümle", paragraphs: "paragraf" },
    copyHtml: "HTML'yi Kopyala", regenerate: "Yeniden Oluştur", generate: "Oluştur",
  } },
  defaultContentLanguage: "tr", showContentLanguageSelector: true,
  title: "Tematik Lorem Ipsum Oluşturucu",
  intro: "Belirli sektörlerden ve bağlamlardan ilham alan yer tutucu metinler oluşturun; içerik miktarı ve biçimi üzerinde tam kontrol sağlayın.",
  topicLabel: "TEMATİK IPSUM",
  themeLabels: { corporate: "Kurumsal", tech: "Teknoloji", ai: "Yapay Zekâ", design: "Tasarım", fashion: "Moda", zombie: "Zombi" },
  contentLanguageLabel: "METİN DİLİ", contentLanguageNames: { primary: "Türkçe", secondary: "English" },
  exploreTitle: "TEMALARI KEŞFET",
  cards: [
    { id: "corporate", title: "Kurumsal Ipsum", description: "Dashboardlar, raporlar, sunumlar ve B2B ürünler için iş dünyası terminolojisi içeren yer tutucu metinler. Strateji, KPI, paydaşlar, süreçler, büyüme ve operasyonlarla ilgili kavramları kapsar.", action: "Kurumsal Ipsum Oluştur" },
    { id: "tech", title: "Teknoloji Ipsum", description: "Yazılım, dijital ürünler ve teknik arayüzler için yer tutucu metinler. Bulut, API, altyapı, geliştirme, dağıtım, sistemler ve mimariyle ilgili terimler kullanır.", action: "Teknoloji Ipsum Oluştur" },
    { id: "ai", title: "Yapay Zekâ Ipsum", description: "Yapay zekâ ve makine öğrenmesine odaklanan yer tutucu metinler. Modeller, promptlar, veri kümeleri, ajanlar, otomasyon, eğitim, çıkarım ve veri odaklı iş akışlarını içerir.", action: "Yapay Zekâ Ipsum Oluştur" },
    { id: "design", title: "Tasarım Ipsum", description: "Mockup, portfolyo ve yaratıcı projeler için yer tutucu metinler. UI, tipografi, düzen, bileşenler, design system, marka kimliği ve tasarım süreçleriyle ilgili kavramlar kullanır.", action: "Tasarım Ipsum Oluştur" },
    { id: "fashion", title: "Moda Ipsum", description: "Lookbook, e-ticaret ve moda editoryal içerikleri için yer tutucu metinler. Koleksiyonlar, kumaşlar, silüetler, styling, malzemeler, kampanyalar ve yaratıcı yön kavramlarını içerir.", action: "Moda Ipsum Oluştur" },
    { id: "zombie", title: "Zombi Ipsum", description: "Oyunlar, konseptler ve kıyamet sonrası projeler için yer tutucu metinler. Zombiler, sürüler, sığınaklar, terk edilmiş şehirler, hayatta kalma ve kaynaklar mockupları daha sürükleyici hâle getirir.", action: "Zombi Ipsum Oluştur" },
  ],
};

export const hungarianThemedPageConfig: ThemedPageConfig = {
  locale: "hu",
  copy: { ...huHomepageCopy, generator: { ...huHomepageCopy.generator,
    mode: "MÓD", modeLabel: "Generálási mód", layout: "SZAVAK + BEKEZDÉSEK",
    characters: "KARAKTEREK", sentences: "MONDATOK", words: "SZAVAK",
    paragraphs: "BEKEZDÉSEK", quickWords: "GYORS ÉRTÉKEK", presets: "GYORS ÉRTÉKEK",
    generate: "Generálás", regenerate: "Újragenerálás", copy: "Másolás", copyHtml: "HTML másolása",
    stats: { ...huHomepageCopy.generator.stats, words: "szó", characters: "karakter", withoutSpaces: "szóközök nélkül", sentences: "mondat", paragraphs: "bekezdés" },
  } },
  defaultContentLanguage: "hu", showContentLanguageSelector: true,
  title: "Tematikus Lorem Ipsum generátor",
  intro: "Hozz létre meghatározott iparágak és témák által inspirált helykitöltő szöveget, miközben pontosan szabályozhatod a tartalom mennyiségét és formátumát.",
  topicLabel: "TEMATIKUS IPSUM",
  themeLabels: { corporate: "Üzleti", tech: "Tech", ai: "AI", design: "Design", fashion: "Divat", zombie: "Zombi" },
  contentLanguageLabel: "SZÖVEG NYELVE", contentLanguageNames: { primary: "Magyar", secondary: "English" },
  exploreTitle: "FEDEZD FEL A TÉMÁKAT",
  cards: [
    { id: "corporate", title: "Üzleti Ipsum", description: "Üzleti terminológiát használó helykitöltő szöveg dashboardokhoz, jelentésekhez, prezentációkhoz és B2B termékekhez. Stratégiai célokhoz, KPI-khez, érintettekhez, folyamatokhoz, növekedéshez és működéshez kapcsolódó fogalmakat tartalmaz.", action: "Üzleti Ipsum generálása" },
    { id: "tech", title: "Tech Ipsum", description: "Helykitöltő szöveg szoftverekhez, digitális termékekhez és technikai felületekhez. Felhővel, API-kkal, infrastruktúrával, fejlesztéssel, deploymenttel, rendszerekkel és architektúrával kapcsolatos kifejezéseket használ.", action: "Tech Ipsum generálása" },
    { id: "ai", title: "AI Ipsum", description: "Mesterséges intelligenciára és gépi tanulásra épülő helykitöltő szöveg. Modellekhez, promptokhoz, adatkészletekhez, ügynökökhöz, automatizáláshoz, tanításhoz, inferenciához és adatvezérelt folyamatokhoz kapcsolódó fogalmakat tartalmaz.", action: "AI Ipsum generálása" },
    { id: "design", title: "Design Ipsum", description: "Helykitöltő szöveg mockupokhoz, portfóliókhoz és kreatív projektekhez. UI-val, tipográfiával, layouttal, komponensekkel, design systemekkel, brandinggel és tervezési folyamatokkal kapcsolatos kifejezéseket használ.", action: "Design Ipsum generálása" },
    { id: "fashion", title: "Divat Ipsum", description: "Helykitöltő szöveg lookbookokhoz, webáruházakhoz és divatmagazinok szerkesztőségi tartalmaihoz. Kollekciókhoz, textilekhez, sziluettekhez, stylinghoz, anyagokhoz, kampányokhoz és kreatív irányhoz kapcsolódó fogalmakat tartalmaz.", action: "Divat Ipsum generálása" },
    { id: "zombie", title: "Zombi Ipsum", description: "Helykitöltő szöveg játékokhoz, koncepciókhoz és posztapokaliptikus projektekhez. Zombik, hordák, menedékek, elhagyott városok, túlélés és erőforrások segítenek hangulatosabb mockupokat készíteni.", action: "Zombi Ipsum generálása" },
  ],
};

export const englishThemedPageConfig: ThemedPageConfig = {
  locale: "en",
  copy: enHomepageCopy,
  defaultContentLanguage: "en",
  showContentLanguageSelector: false,
  title: "Themed Lorem Ipsum Generator",
  intro: "Generate placeholder text inspired by specific industries and contexts while keeping precise control over content length and format.",
  topicLabel: "Themed Ipsum",
  themeLabels: { corporate: "Corporate", tech: "Tech", ai: "AI", design: "Design", fashion: "Fashion", zombie: "Zombie" },
  contentLanguageLabel: "Content language",
  contentLanguageNames: { primary: "English", secondary: "Italiano" },
  exploreTitle: "Explore themes",
  cards: [
    { id: "corporate", title: "Corporate Ipsum", description: "Business-focused placeholder text for dashboards, reports, presentations and B2B products. Includes concepts related to strategy, KPIs, stakeholders, processes, growth and business operations.", action: "Generate Corporate Ipsum" },
    { id: "tech", title: "Tech Ipsum", description: "Placeholder text for software, digital products and technical interfaces. Uses terminology related to cloud, APIs, infrastructure, development, deployment, systems and architecture.", action: "Generate Tech Ipsum" },
    { id: "ai", title: "AI Ipsum", description: "Placeholder text focused on artificial intelligence and machine learning. Includes models, prompts, datasets, agents, automation, training, inference and data-driven workflows.", action: "Generate AI Ipsum" },
    { id: "design", title: "Design Ipsum", description: "Placeholder text for mockups, portfolios and creative projects. Uses terminology related to UI, typography, layout, components, design systems, branding and creative processes.", action: "Generate Design Ipsum" },
    { id: "fashion", title: "Fashion Ipsum", description: "Placeholder text for lookbooks, fashion e-commerce and editorial content. Includes collections, fabrics, silhouettes, styling, materials, campaigns and creative direction.", action: "Generate Fashion Ipsum" },
    { id: "zombie", title: "Zombie Ipsum", description: "Placeholder text for games, concepts and post-apocalyptic projects. Zombies, hordes, shelters, abandoned cities, survival and resources make mockups feel more immersive.", action: "Generate Zombie Ipsum" },
  ],
};

export const spanishThemedPageConfig: ThemedPageConfig = {
  locale: "es",
  copy: {
    ...esHomepageCopy,
    locale: "es",
    languageLabel: "Idioma",
    themeLabel: "Tema de color",
    theme: { system: "Automático", light: "Claro", dark: "Oscuro" },
    generator: {
      ...esHomepageCopy.generator,
      mode: "Modo",
      modeLabel: "Modo de generación",
      layout: "Palabras",
      characters: "Caracteres",
      sentences: "Frases",
      quickWords: "Cantidades rápidas",
      presets: "Valores predefinidos",
      output: "Resultado",
      outputAria: "Lorem Ipsum generado",
      emptyState: "Elige la configuración y genera tu texto Lorem Ipsum.",
      generate: "Generar",
      words: "Palabras",
      paragraphs: "Párrafos",
      stats: { words: "palabras", characters: "caracteres", withoutSpaces: "sin espacios", sentences: "frases", paragraphs: "párrafos" },
      copy: "Copiar",
      copied: "Copiado",
      copyHtml: "Copiar HTML",
      regenerate: "Regenerar",
    },
  },
  defaultContentLanguage: "es",
  showContentLanguageSelector: true,
  title: "Generador de Lorem Ipsum temático",
  intro: "Genera texto de prueba inspirado en sectores y contextos específicos, manteniendo un control preciso sobre la cantidad y el formato del contenido.",
  topicLabel: "Ipsum temático",
  themeLabels: { corporate: "Corporate", tech: "Tech", ai: "IA", design: "Diseño", fashion: "Moda", zombie: "Zombie" },
  contentLanguageLabel: "Idioma del texto",
  contentLanguageNames: { primary: "Español", secondary: "English" },
  exploreTitle: "Explora los temas",
  cards: [
    { id: "corporate", title: "Corporate Ipsum", description: "Texto de prueba con terminología empresarial para dashboards, informes, presentaciones y productos B2B. Incluye conceptos relacionados con estrategia, KPI, stakeholders, procesos, crecimiento y operaciones.", action: "Generar Corporate Ipsum" },
    { id: "tech", title: "Tech Ipsum", description: "Texto de prueba para software, productos digitales e interfaces técnicas. Utiliza términos relacionados con cloud, API, infraestructura, desarrollo, despliegue, sistemas y arquitectura.", action: "Generar Tech Ipsum" },
    { id: "ai", title: "IA Ipsum", description: "Texto de prueba centrado en inteligencia artificial y machine learning. Incluye modelos, prompts, datasets, agentes, automatización, entrenamiento, inferencia y flujos basados en datos.", action: "Generar IA Ipsum" },
    { id: "design", title: "Design Ipsum", description: "Texto de prueba para mockups, portfolios y proyectos creativos. Utiliza términos relacionados con UI, tipografía, layout, componentes, design systems, branding y procesos creativos.", action: "Generar Ipsum de diseño" },
    { id: "fashion", title: "Fashion Ipsum", description: "Texto de prueba para lookbooks, e-commerce de moda y contenido editorial. Incluye colecciones, tejidos, siluetas, styling, materiales, campañas y dirección creativa.", action: "Generar Ipsum de moda" },
    { id: "zombie", title: "Zombie Ipsum", description: "Texto de prueba para videojuegos, conceptos y proyectos postapocalípticos. Zombies, hordas, refugios, ciudades abandonadas, supervivencia y recursos ayudan a crear mockups más inmersivos.", action: "Generar Zombie Ipsum" },
  ],
};

export const germanThemedPageConfig: ThemedPageConfig = {
  locale: "de",
  copy: deHomepageCopy,
  defaultContentLanguage: "de",
  showContentLanguageSelector: true,
  title: "Thematischer Lorem-Ipsum-Generator",
  intro: "Erzeuge Blindtext für bestimmte Branchen und Themen und behalte dabei die genaue Kontrolle über Umfang und Format des Inhalts.",
  topicLabel: "Themen",
  themeLabels: { corporate: "Corporate", tech: "Tech", ai: "KI", design: "Design", fashion: "Fashion", zombie: "Zombie" },
  contentLanguageLabel: "Textsprache",
  contentLanguageNames: { primary: "Deutsch", secondary: "English" },
  exploreTitle: "Themen entdecken",
  cards: [
    { id: "corporate", title: "Corporate Ipsum", description: "Blindtext mit Business-Terminologie für Dashboards, Reports, Präsentationen und B2B-Produkte. Enthält Begriffe rund um Strategie, KPIs, Stakeholder, Prozesse, Wachstum und operative Abläufe.", action: "Corporate Ipsum generieren" },
    { id: "tech", title: "Tech Ipsum", description: "Blindtext für Software, digitale Produkte und technische Interfaces. Verwendet Begriffe zu Cloud, APIs, Infrastruktur, Entwicklung, Deployment, Systemen und Architektur.", action: "Tech Ipsum generieren" },
    { id: "ai", title: "KI Ipsum", description: "Blindtext rund um künstliche Intelligenz und Machine Learning. Enthält Modelle, Prompts, Datensätze, Agents, Automatisierung, Training, Inferenz und datengetriebene Workflows.", action: "KI Ipsum generieren" },
    { id: "design", title: "Design Ipsum", description: "Blindtext für Mockups, Portfolios und kreative Projekte. Verwendet Begriffe zu UI, Typografie, Layout, Komponenten, Designsystemen, Branding und kreativen Prozessen.", action: "Design Ipsum generieren" },
    { id: "fashion", title: "Fashion Ipsum", description: "Blindtext für Lookbooks, Fashion-E-Commerce und redaktionelle Inhalte. Enthält Kollektionen, Stoffe, Silhouetten, Styling, Materialien, Kampagnen und Creative Direction.", action: "Fashion Ipsum generieren" },
    { id: "zombie", title: "Zombie Ipsum", description: "Blindtext für Games, Konzepte und postapokalyptische Projekte. Zombies, Horden, Schutzräume, verlassene Städte, Überleben und Ressourcen machen Mockups atmosphärischer und realistischer.", action: "Zombie Ipsum generieren" },
  ],
};
