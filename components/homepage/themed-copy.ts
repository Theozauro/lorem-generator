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
      layout: "MOTS + PARAGRAPHES",
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
    { id: "corporate", title: "Corporate Ipsum", description: "Texte de substitution professionnel pour l’entreprise, la stratégie, les opérations et la communication corporate.", action: "Générer Corporate Ipsum" },
    { id: "tech", title: "Tech Ipsum", description: "Texte de substitution inspiré des produits numériques, plateformes, systèmes, infrastructures et du développement.", action: "Générer Tech Ipsum" },
    { id: "ai", title: "IA Ipsum", description: "Texte de substitution autour de l’intelligence artificielle, des modèles, des données, des agents, de l’automatisation et du machine learning.", action: "Générer IA Ipsum" },
    { id: "design", title: "Design Ipsum", description: "Texte de substitution pour la typographie, les mises en page, les composants, les grilles et les processus créatifs.", action: "Générer Design Ipsum" },
    { id: "fashion", title: "Ipsum Mode", description: "Texte de substitution pour les collections, matières, silhouettes, styles et concepts éditoriaux.", action: "Générer un Ipsum Mode" },
    { id: "zombie", title: "Zombie Ipsum", description: "Texte de substitution apocalyptique avec zombies, hordes, refuges, villes abandonnées et survie.", action: "Générer Zombie Ipsum" },
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
      layout: "PALAVRAS + PARÁGRAFOS",
      characters: "CARACTERES",
      sentences: "FRASES",
      quickWords: "VALORES RÁPIDOS",
      presets: "VALORES RÁPIDOS",
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
    { id: "corporate", title: "Corporate Ipsum", description: "Texto de preenchimento profissional para empresas, estratégia, operações e comunicação corporativa.", action: "Gerar Corporate Ipsum" },
    { id: "tech", title: "Tech Ipsum", description: "Texto de preenchimento inspirado em produtos digitais, plataformas, sistemas, infraestrutura e desenvolvimento.", action: "Gerar Tech Ipsum" },
    { id: "ai", title: "IA Ipsum", description: "Texto de preenchimento sobre inteligência artificial, modelos, dados, agentes, automação e aprendizado de máquina.", action: "Gerar IA Ipsum" },
    { id: "design", title: "Design Ipsum", description: "Texto de preenchimento para tipografia, layouts, componentes, grids e processos criativos.", action: "Gerar Design Ipsum" },
    { id: "fashion", title: "Ipsum de Moda", description: "Texto de preenchimento para coleções, tecidos, silhuetas, styling e conceitos editoriais.", action: "Gerar Ipsum de Moda" },
    { id: "zombie", title: "Zombie Ipsum", description: "Texto de preenchimento apocalíptico com zumbis, hordas, abrigos, cidades abandonadas e sobrevivência.", action: "Gerar Zombie Ipsum" },
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
      layout: "WOORDEN + ALINEA'S",
      characters: "TEKENS",
      sentences: "ZINNEN",
      quickWords: "SNELLE WAARDEN",
      presets: "SNELLE WAARDEN",
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
    { id: "corporate", title: "Corporate Ipsum", description: "Opvultekst voor bedrijven, strategie, processen en zakelijke communicatie.", action: "Genereer Corporate Ipsum" },
    { id: "tech", title: "Tech Ipsum", description: "Opvultekst geïnspireerd op digitale producten, platforms, systemen, infrastructuur en ontwikkeling.", action: "Genereer Tech Ipsum" },
    { id: "ai", title: "AI Ipsum", description: "Opvultekst over kunstmatige intelligentie, modellen, data, agents, automatisering en machine learning.", action: "Genereer AI Ipsum" },
    { id: "design", title: "Design Ipsum", description: "Opvultekst voor typografie, layouts, componenten, grids en creatieve processen.", action: "Genereer Design Ipsum" },
    { id: "fashion", title: "Mode Ipsum", description: "Opvultekst voor collecties, materialen, silhouetten, styling en redactionele concepten.", action: "Genereer Mode Ipsum" },
    { id: "zombie", title: "Zombie Ipsum", description: "Apocalyptische opvultekst met zombies, hordes, schuilplaatsen, verlaten steden en overleving.", action: "Genereer Zombie Ipsum" },
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
    layout: "SŁOWA + AKAPITY", characters: "ZNAKI", sentences: "ZDANIA",
    words: "SŁOWA", paragraphs: "AKAPITY", quickWords: "SZYBKIE WARTOŚCI", presets: "SZYBKIE WARTOŚCI",
  } },
  defaultContentLanguage: "pl", showContentLanguageSelector: true,
  title: "Generator tematycznego Lorem Ipsum",
  intro: "Generuj tekst zastępczy inspirowany konkretnymi branżami i kontekstami, zachowując pełną kontrolę nad ilością i formatem treści.",
  topicLabel: "Ipsum tematyczny",
  themeLabels: { corporate: "Corporate", tech: "Tech", ai: "AI", design: "Design", fashion: "Moda", zombie: "Zombie" },
  contentLanguageLabel: "JĘZYK TEKSTU", contentLanguageNames: { primary: "Polski", secondary: "English" },
  exploreTitle: "ODKRYJ TEMATY",
  cards: [
    { id: "corporate", title: "Corporate Ipsum", description: "Tekst zastępczy z terminologią biznesową do dashboardów, raportów, prezentacji i produktów B2B. Obejmuje pojęcia związane ze strategią, KPI, interesariuszami, procesami, wzrostem i operacjami biznesowymi.", action: "Generuj Corporate Ipsum" },
    { id: "tech", title: "Tech Ipsum", description: "Tekst zastępczy dla oprogramowania, produktów cyfrowych i interfejsów technicznych. Wykorzystuje terminy związane z chmurą, API, infrastrukturą, rozwojem, wdrożeniami, systemami i architekturą.", action: "Generuj Tech Ipsum" },
    { id: "ai", title: "AI Ipsum", description: "Tekst zastępczy poświęcony sztucznej inteligencji i machine learning. Obejmuje modele, prompty, zbiory danych, agentów, automatyzację, trenowanie, inferencję i przepływy oparte na danych.", action: "Generuj AI Ipsum" },
    { id: "design", title: "Design Ipsum", description: "Tekst zastępczy do makiet, portfolio i projektów kreatywnych. Wykorzystuje pojęcia związane z UI, typografią, layoutem, komponentami, design systemami, brandingiem i procesem projektowym.", action: "Generuj Design Ipsum" },
    { id: "fashion", title: "Moda Ipsum", description: "Tekst zastępczy do lookbooków, e-commerce i treści redakcyjnych związanych z modą. Obejmuje kolekcje, tkaniny, sylwetki, styling, materiały, kampanie i kierunek kreatywny.", action: "Generuj Moda Ipsum" },
    { id: "zombie", title: "Zombie Ipsum", description: "Tekst zastępczy do gier, konceptów i projektów postapokaliptycznych. Zombie, hordy, schronienia, opuszczone miasta, przetrwanie i zasoby pomagają tworzyć bardziej immersyjne makiety.", action: "Generuj Zombie Ipsum" },
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
    ...enHomepageCopy,
    locale: "es",
    languageLabel: "Idioma",
    themeLabel: "Tema de color",
    theme: { system: "Automático", light: "Claro", dark: "Oscuro" },
    generator: {
      ...enHomepageCopy.generator,
      mode: "Modo",
      modeLabel: "Modo de generación",
      layout: "Palabras + párrafos",
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
    { id: "corporate", title: "Corporate Ipsum", description: "Texto de prueba profesional para empresa, estrategia, operaciones y comunicación corporativa.", action: "Generar Corporate Ipsum" },
    { id: "tech", title: "Tech Ipsum", description: "Texto de prueba tecnológico para productos, plataformas, sistemas, infraestructura y desarrollo.", action: "Generar Tech Ipsum" },
    { id: "ai", title: "IA Ipsum", description: "Texto de prueba sobre inteligencia artificial, modelos, datos, agentes, automatización y aprendizaje automático.", action: "Generar IA Ipsum" },
    { id: "design", title: "Design Ipsum", description: "Texto de prueba para tipografía, layouts, componentes, retículas y procesos creativos.", action: "Generar Ipsum de diseño" },
    { id: "fashion", title: "Fashion Ipsum", description: "Texto de prueba para colecciones, tejidos, siluetas, estilismo y conceptos editoriales.", action: "Generar Ipsum de moda" },
    { id: "zombie", title: "Zombie Ipsum", description: "Texto de prueba apocalíptico con zombis, hordas, refugios, ciudades abandonadas y supervivencia.", action: "Generar Zombie Ipsum" },
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
    { id: "corporate", title: "Corporate Ipsum", description: "Professioneller Blindtext für Unternehmen, Strategie, Prozesse und Unternehmenskommunikation.", action: "Corporate Ipsum generieren" },
    { id: "tech", title: "Tech Ipsum", description: "Technischer Blindtext für Produkte, Plattformen, Systeme, Infrastruktur und Entwicklung.", action: "Tech Ipsum generieren" },
    { id: "ai", title: "KI Ipsum", description: "Blindtext rund um künstliche Intelligenz, Modelle, Daten, Agenten, Automatisierung und maschinelles Lernen.", action: "KI Ipsum generieren" },
    { id: "design", title: "Design Ipsum", description: "Blindtext für Typografie, Layouts, Komponenten, Rastersysteme und kreative Prozesse.", action: "Design Ipsum generieren" },
    { id: "fashion", title: "Fashion Ipsum", description: "Blindtext für Kollektionen, Stoffe, Silhouetten, Styling und redaktionelle Konzepte.", action: "Fashion Ipsum generieren" },
    { id: "zombie", title: "Zombie Ipsum", description: "Apokalyptischer Blindtext mit Zombies, Horden, Zufluchtsorten, verlassenen Städten und Überleben.", action: "Zombie Ipsum generieren" },
  ],
};
