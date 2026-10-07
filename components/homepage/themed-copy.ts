import type { HomepageCopy } from "./homepage-copy";
import { enHomepageCopy } from "./homepage-copy/en";
import { itHomepageCopy } from "./homepage-copy/it";
import type { ThemedLanguage, ThemedTheme } from "@/lib/themed-ipsum";

export type ThemedPageLocale = "en" | "it" | "es";

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
    { id: "corporate", title: "Corporate Ipsum", description: "Testo segnaposto con terminologia business, strategia, KPI, stakeholder e processi aziendali.", action: "Genera Corporate Ipsum" },
    { id: "tech", title: "Tech Ipsum", description: "Placeholder text ispirato a software, cloud, API, infrastrutture e sviluppo.", action: "Genera Tech Ipsum" },
    { id: "ai", title: "AI Ipsum", description: "Testo a tema intelligenza artificiale con modelli, prompt, dataset, token e machine learning.", action: "Genera AI Ipsum" },
    { id: "design", title: "Design Ipsum", description: "Placeholder text per mockup e progetti creativi, con termini di UI, tipografia, layout e branding.", action: "Genera Design Ipsum" },
    { id: "fashion", title: "Fashion Ipsum", description: "Testo segnaposto ispirato a collezioni, tessuti, silhouette, styling ed editoria fashion.", action: "Genera Fashion Ipsum" },
    { id: "zombie", title: "Zombie Ipsum", description: "Testo segnaposto apocalittico con zombie, orde, rifugi, città abbandonate e sopravvivenza.", action: "Genera Zombie Ipsum" },
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
    { id: "corporate", title: "Corporate Ipsum", description: "Professional placeholder text for business, strategy, operations and corporate communication.", action: "Generate Corporate Ipsum" },
    { id: "tech", title: "Tech Ipsum", description: "Technology-focused placeholder text for products, platforms, systems, infrastructure and development.", action: "Generate Tech Ipsum" },
    { id: "ai", title: "AI Ipsum", description: "AI-themed placeholder text for models, data, agents, automation and machine learning.", action: "Generate AI Ipsum" },
    { id: "design", title: "Design Ipsum", description: "Design-focused placeholder text for typography, layouts, components, grids and creative workflows.", action: "Generate Design Ipsum" },
    { id: "fashion", title: "Fashion Ipsum", description: "Fashion placeholder text for collections, fabrics, silhouettes, styling and editorial concepts.", action: "Generate Fashion Ipsum" },
    { id: "zombie", title: "Zombie Ipsum", description: "Apocalyptic placeholder text with zombies, hordes, shelters, abandoned cities and survival.", action: "Generate Zombie Ipsum" },
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
