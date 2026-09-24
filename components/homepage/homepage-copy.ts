export type HomepageLocale = "en" | "it" | "es" | "fr" | "de" | "pt-BR" | "nl-NL";

export type HomepageCopy = {
  locale: HomepageLocale;
  numberLocale: string;
  languageLabel: string;
  themeLabel: string;
  theme: { system: string; light: string; dark: string };
  title: string;
  intro: string;
  schema: { description: string; featureList: string[] };
  generator: {
    mode: string;
    modeLabel: string;
    layout: string;
    characters: string;
    sentences: string;
    quickWords: string;
    presets: string;
    options: string;
    startClassic: string;
    sentenceLength: string;
    short: string;
    mixed: string;
    long: string;
    output: string;
    outputAria: string;
    words: string;
    paragraphs: string;
    stats: { words: string; characters: string; withoutSpaces: string; sentences: string; paragraphs: string };
    copy: string;
    copied: string;
    copyHtml: string;
    regenerate: string;
  };
  consent: {
    aria: string;
    title: string;
    intro: string;
    necessary: string;
    necessaryNote: string;
    analytics: string;
    analyticsNote: string;
    advertising: string;
    advertisingNote: string;
    accept: string;
    reject: string;
    customize: string;
    save: string;
  };
  match: { aria: string; title: string; note: string; source: string; placeholder: string; matched: string; characters: string; words: string; paragraphs: string };
  expansion: { title: string; note: string; source: string; placeholder: string; adjustment: string; custom: string; percentage: string; target: string; characters: string; generate: string };
  fit: { aria: string; title: string; note: string; width: string; height: string; fontSize: string; lineHeight: string; padding: string; preview: string; approximate: string; box: string };
  sections: {
    remainingTools: string;
    aboutEyebrow: string; aboutTitle: string; aboutOne: string; aboutTwo: string;
    seoEyebrow: string; seoTitle: string; seoOneTitle: string; seoOneA: string; seoOneB: string; seoTwoTitle: string; seoTwoA: string; seoTwoB: string;
    guideEyebrow: string; guideTitle: string; guide: Array<[string, string]>;
  };
  faq: { eyebrow: string; title: string; intro: string; items: Array<[string, string]> };
  footer: { featuredOn: string; description: string; aria: string; privacy: string; cookies: string; manage: string; privacyHref: string; cookiesHref: string };
};

const baseHomepageCopy: Record<Exclude<HomepageLocale, "es" | "fr" | "de" | "pt-BR" | "nl-NL">, HomepageCopy> = {
  en: {
    locale: "en", numberLocale: "en-US", languageLabel: "Language", themeLabel: "Color theme", theme: { system: "Auto", light: "light", dark: "dark" },
    title: "Lorem Ipsum Generator", intro: "Generate exact words, paragraphs, sentences, or characters for layouts, prototypes, and design work.",
    schema: { description: "A browser-based Lorem Ipsum generator for exact words, paragraphs, sentences, and characters.", featureList: ["Exact word and paragraph counts", "Character and sentence generation", "Fit to Box preview", "Browser-local generation"] },
    generator: { mode: "Mode", modeLabel: "Generation mode", layout: "Words + paragraphs", characters: "Characters", sentences: "Sentences", quickWords: "Quick word counts", presets: "Presets", options: "Options", startClassic: "Start with “Lorem ipsum…”", sentenceLength: "Sentence length", short: "Short", mixed: "Mixed", long: "Long", output: "Output", outputAria: "Generated Lorem Ipsum", words: "Words", paragraphs: "Paragraphs", stats: { words: "words", characters: "characters", withoutSpaces: "without spaces", sentences: "sentences", paragraphs: "paragraphs" }, copy: "Copy", copied: "Copied", copyHtml: "Copy HTML", regenerate: "Regenerate" },
    consent: { aria: "Privacy and cookie notice", title: "Privacy preferences", intro: "We use local storage for essential preferences. Optional analytics and advertising remain off until you choose them.", necessary: "Necessary", necessaryNote: "Theme and consent preferences.", analytics: "Analytics", analyticsNote: "Anonymous usage statistics", advertising: "Advertising", advertisingNote: "Ad delivery and measurement.", accept: "Accept all", reject: "Reject optional", customize: "Customize", save: "Save choices" },
    match: { aria: "Match existing text", title: "Match existing text", note: "Replace copy while keeping a similar text footprint.", source: "Source text", placeholder: "Paste text to measure…", matched: "Matched text", characters: "Match character count", words: "Match word count", paragraphs: "Match paragraph count" },
    expansion: { title: "Text expansion", note: "See how a layout behaves with more or less copy.", source: "Source text", placeholder: "Paste text to expand or reduce…", adjustment: "Length adjustment", custom: "Custom %", percentage: "Custom percentage", target: "Target length", characters: "characters", generate: "Generate variant" },
    fit: { aria: "Fit to Box", title: "Fit to Box", note: "Test how much text fits in a fixed-size box.", width: "Width", height: "Height", fontSize: "Font size", lineHeight: "Line height", padding: "Padding", preview: "Preview", approximate: "Approximate word count", box: "box" },
    sections: { remainingTools: "More Designer Tools", aboutEyebrow: "A NOTE ON PLACEHOLDER TEXT", aboutTitle: "A working draft for every layout.", aboutOne: "Lorem Ipsum is familiar placeholder text derived from classical Latin. Designers use it to judge hierarchy, rhythm, line length, and spacing before final copy is ready.", aboutTwo: "Set words and paragraphs together to match a layout's density and rhythm, or switch to characters or sentences when a precise length matters.", seoEyebrow: "BUILT FOR REAL LAYOUTS", seoTitle: "A Lorem Ipsum Generator for designers and developers.", seoOneTitle: "Keep the layout honest.", seoOneA: "Generate Lorem Ipsum with exact words and paragraphs together, then adjust the density without rebuilding your settings. Use Characters or Sentences when a component, headline, or text block needs a precise footprint.", seoOneB: "This generator is made for wireframes, editorial layouts, interface prototypes, and type studies. Fit to Box helps you test how copy behaves before final content arrives.", seoTwoTitle: "Copy the format your workflow needs.", seoTwoA: "Copy plain text for notes and drafts, or use Copy HTML when you are moving placeholder content into a page or component. Switch formats as your layout moves from exploration to implementation.", seoTwoB: "Use the result as temporary content during design. Replace it with approved final copy before publishing a finished project.", guideEyebrow: "A SHORT GUIDE TO LOREM IPSUM", guideTitle: "Why placeholder text still matters.", guide: [["What Lorem Ipsum is", "Lorem Ipsum is temporary copy used to test a page before the final words are ready. Because it looks like a language without delivering a message, it lets a designer judge hierarchy, line length, type size, spacing, and the balance between text and other elements."], ["Where it comes from", "The familiar opening is adapted from a passage in Cicero’s De finibus bonorum et malorum. Over time, the original Latin was shortened and rearranged into the neutral placeholder text used by print and digital design tools today."], ["When to use it", "Use Lorem Ipsum for wireframes, early interface prototypes, editorial layouts, brochures, packaging, and type studies. It keeps attention on the structure while content decisions are still in progress."], ["When to replace it", "Placeholder copy should disappear before a website, document, or printed project is final. Real content is needed to review tone, accessibility, meaning, search visibility, and the actual reading experience."]] },
    faq: { eyebrow: "ANSWERS FOR DESIGNERS", title: "Lorem Ipsum generator FAQ", intro: "Clear answers about placeholder text, word counts, privacy, and practical use.", items: [["What is a Lorem Ipsum generator?", "A Lorem Ipsum generator creates temporary placeholder copy so you can evaluate hierarchy, spacing, line length, and layout before final content is ready."], ["Can I generate an exact number of words and paragraphs?", "Yes. Set Words and Paragraphs together. The generator keeps the total word count exact while distributing the copy across naturally varied paragraphs."], ["Can I use generated Lorem Ipsum in a commercial project?", "Lorem Ipsum is placeholder text. Replace it with approved final copy before publishing or shipping a finished product, and check any project-specific content requirements."], ["Does this Lorem Ipsum generator store my text?", "The generator runs in your browser. Text entered into the local tools is not sent to a server by this page. Theme preference is stored locally when you choose a manual theme."]] },
    footer: { featuredOn: "Featured on", description: "Placeholder copy for thoughtful layouts.", aria: "Legal information", privacy: "Privacy Policy", cookies: "Cookie Policy", manage: "Manage privacy preferences", privacyHref: "/privacy-policy/", cookiesHref: "/cookie-policy/" },
  },
  it: {
    locale: "it", numberLocale: "it-IT", languageLabel: "Lingua", themeLabel: "Tema colore", theme: { system: "Auto", light: "Chiaro", dark: "Scuro" },
    title: "Lorem Ipsum Generator", intro: "Genera un numero esatto di parole, paragrafi, frasi o caratteri per layout, prototipi e progetti di design.",
    schema: { description: "Un generatore Lorem Ipsum nel browser per parole, paragrafi, frasi e caratteri esatti.", featureList: ["Conteggio esatto di parole e paragrafi", "Generazione di caratteri e frasi", "Anteprima Adatta al riquadro", "Generazione nel browser"] },
    generator: { mode: "Modalità", modeLabel: "Modalità di generazione", layout: "Parole + paragrafi", characters: "Caratteri", sentences: "Frasi", quickWords: "Quantità rapide", presets: "Valori predefiniti", options: "Opzioni", startClassic: "Inizia con “Lorem ipsum…”", sentenceLength: "Lunghezza delle frasi", short: "brevi", mixed: "miste", long: "lunghe", output: "Risultato", outputAria: "Testo Lorem Ipsum generato", words: "Parole", paragraphs: "Paragrafi", stats: { words: "parole", characters: "caratteri", withoutSpaces: "senza spazi", sentences: "frasi", paragraphs: "paragrafi" }, copy: "Copia", copied: "Copiato", copyHtml: "Copia HTML", regenerate: "Rigenera" },
    consent: { aria: "Avviso su privacy e cookie", title: "Preferenze sulla privacy", intro: "Usiamo la memoria locale del browser solo per le preferenze essenziali. Analytics e pubblicità restano disattivati finché non li abiliti.", necessary: "Necessari", necessaryNote: "Tema e preferenze del consenso.", analytics: "Analytics", analyticsNote: "Statistiche anonime sull’utilizzo del sito.", advertising: "Pubblicità", advertisingNote: "Erogazione e misurazione degli annunci.", accept: "Accetta tutto", reject: "Rifiuta", customize: "Personalizza", save: "Salva preferenze" },
    match: { aria: "Sostituisci testo esistente", title: "Sostituisci testo esistente", note: "Sostituisci il testo mantenendo lo stesso ingombro.", source: "Testo di partenza", placeholder: "Incolla il testo da misurare…", matched: "Testo sostitutivo", characters: "Stessi caratteri", words: "Stesse parole", paragraphs: "Stessi paragrafi" },
    expansion: { title: "Espansione del testo", note: "Verifica come reagisce un layout con più o meno testo.", source: "Testo di partenza", placeholder: "Incolla un testo di riferimento…", adjustment: "Regolazione della lunghezza", custom: "Percentuale", percentage: "Percentuale personalizzata", target: "Lunghezza desiderata", characters: "caratteri", generate: "Genera variante" },
    fit: { aria: "Adatta al riquadro", title: "Adatta al riquadro", note: "Verifica quanto testo entra in un riquadro.", width: "Larghezza", height: "Altezza", fontSize: "Dimensione carattere", lineHeight: "Interlinea", padding: "Spaziatura interna", preview: "Anteprima", approximate: "adattamento approssimativo", box: "riquadro" },
    sections: { remainingTools: "Altri strumenti", aboutEyebrow: "UNA NOTA SUL TESTO SEGNAPOSTO", aboutTitle: "Una bozza per ogni layout.", aboutOne: "Lorem Ipsum è un testo segnaposto derivato dal latino classico. I designer lo usano per valutare gerarchia, ritmo, lunghezza delle righe e spaziatura prima che il testo finale sia pronto.", aboutTwo: "Imposta insieme parole e paragrafi per controllare densità e ritmo del layout, oppure passa a caratteri o frasi quando serve una lunghezza precisa.", seoEyebrow: "PENSATO PER LAYOUT REALI", seoTitle: "Un generatore Lorem Ipsum per designer e sviluppatori.", seoOneTitle: "Mantieni fedele il layout.", seoOneA: "Genera Lorem Ipsum con parole e paragrafi esatti insieme, poi regola la densità senza ricreare le impostazioni. Usa caratteri o frasi quando un componente, un titolo o un blocco richiede un ingombro preciso.", seoOneB: "Il generatore è pensato per wireframe, layout editoriali, prototipi di interfacce e studi tipografici. La funzione Adatta al riquadro aiuta a verificare il comportamento del testo prima che arrivi il contenuto definitivo.", seoTwoTitle: "Copia il formato che ti serve.", seoTwoA: "Copia testo semplice per note e bozze, oppure usa Copia HTML quando inserisci il testo segnaposto in una pagina o componente. Passa da un formato all’altro mentre il layout passa dall’esplorazione all’implementazione.", seoTwoB: "Usa il risultato come contenuto temporaneo durante il design. Sostituiscilo con il testo finale approvato prima di pubblicare il progetto.", guideEyebrow: "GUIDA BREVE AL LOREM IPSUM", guideTitle: "Perché il testo segnaposto è ancora utile.", guide: [["Cos’è il Lorem Ipsum", "Il Lorem Ipsum è un testo temporaneo usato per provare una pagina prima che le parole definitive siano disponibili. Ricorda una lingua ma non comunica un messaggio immediato: permette di valutare gerarchia, lunghezza delle righe, dimensione dei caratteri, spaziatura ed equilibrio visivo."], ["Da dove proviene", "L’incipit conosciuto deriva da un passaggio del De finibus bonorum et malorum di Cicerone. Nel tempo il testo latino è stato abbreviato e riorganizzato, fino a diventare il contenuto neutro usato dagli strumenti di progettazione grafica e digitale."], ["Quando usarlo", "Il Lorem Ipsum è utile per wireframe, primi prototipi, impaginazione editoriale, brochure, packaging e studi tipografici. Mantiene l’attenzione sulla struttura quando le decisioni sui contenuti sono ancora aperte."], ["Quando sostituirlo", "Il testo segnaposto va rimosso prima della pubblicazione di un sito, di un documento o di un progetto stampato. Il contenuto reale serve per verificare tono, accessibilità, significato, visibilità sui motori di ricerca e reale esperienza di lettura."]] },
    faq: { eyebrow: "RISPOSTE PER DESIGNER", title: "FAQ del generatore Lorem Ipsum", intro: "Risposte chiare su testo segnaposto, conteggi, privacy e utilizzo pratico.", items: [["Cos’è un generatore Lorem Ipsum?", "Un generatore Lorem Ipsum crea testo segnaposto temporaneo per valutare gerarchia, spaziatura, lunghezza delle righe e layout prima che il contenuto finale sia pronto."], ["Posso generare un numero esatto di parole e paragrafi?", "Sì. Imposta insieme parole e paragrafi. Il generatore mantiene esatto il conteggio totale distribuendo il testo in paragrafi naturalmente variati."], ["Posso usare Lorem Ipsum in un progetto commerciale?", "Lorem Ipsum è testo segnaposto. Sostituiscilo con il testo finale approvato prima di pubblicare o distribuire un prodotto finito."], ["Questo generatore Lorem Ipsum salva il mio testo?", "Il generatore funziona nel browser. Il testo inserito negli strumenti locali non viene inviato a un server. La preferenza del tema viene salvata localmente quando scegli un tema manuale."]] },
    footer: { featuredOn: "Featured on", description: "Testo segnaposto per layout curati.", aria: "Informazioni legali", privacy: "Informativa privacy", cookies: "Informativa sui cookie", manage: "Gestisci preferenze", privacyHref: "/it/privacy-policy/", cookiesHref: "/it/cookie-policy/" },
  },
};

const spanishHomepageCopy: HomepageCopy = {
  locale: "es",
  numberLocale: "es-ES",
  languageLabel: "Idioma",
  themeLabel: "Tema de color",
  theme: { system: "Automático", light: "claro", dark: "oscuro" },
  title: "Lorem Ipsum Generator",
  intro: "Genera un número exacto de palabras, párrafos, frases o caracteres para maquetas, prototipos y proyectos de diseño.",
  schema: {
    description: "Generador de Lorem Ipsum que funciona en el navegador para crear cantidades exactas de palabras, párrafos, frases y caracteres.",
    featureList: ["Cantidades exactas de palabras y párrafos", "Generación por caracteres y frases", "Vista previa de ajuste al marco", "Generación local en el navegador"],
  },
  generator: {
    mode: "Modo",
    modeLabel: "Modo de generación",
    layout: "Palabras + párrafos",
    characters: "Caracteres",
    sentences: "Frases",
    quickWords: "Cantidades rápidas",
    presets: "Cantidades rápidas",
    options: "Opciones",
    startClassic: "Empezar con «Lorem ipsum…»",
    sentenceLength: "Longitud de las frases",
    short: "Cortas",
    mixed: "Variadas",
    long: "Largas",
    output: "Resultado",
    outputAria: "Lorem Ipsum generado",
    words: "Palabras",
    paragraphs: "Párrafos",
    stats: { words: "palabras", characters: "caracteres", withoutSpaces: "sin espacios", sentences: "frases", paragraphs: "párrafos" },
    copy: "Copiar",
    copied: "Copiado",
    copyHtml: "Copiar HTML",
    regenerate: "Regenerar",
  },
  fit: {
    aria: "Ajustar al marco",
    title: "Ajustar al marco",
    note: "Comprueba cuánto texto cabe en un marco de tamaño fijo.",
    width: "Anchura",
    height: "Altura",
    fontSize: "Tamaño de fuente",
    lineHeight: "Interlineado",
    padding: "Margen interior",
    preview: "Vista previa",
    approximate: "Número aproximado de palabras",
    box: "Dimensiones",
  },
  match: {
    aria: "Adaptar a un texto existente",
    title: "Adaptar a un texto existente",
    note: "Sustituye un texto manteniendo una extensión similar.",
    source: "Texto de referencia",
    placeholder: "Pega un texto para medirlo…",
    matched: "Texto adaptado",
    characters: "Igualar número de caracteres",
    words: "Igualar número de palabras",
    paragraphs: "Igualar número de párrafos",
  },
  expansion: {
    title: "Variación de longitud",
    note: "Comprueba cómo se comporta una maqueta con más o menos texto.",
    source: "Texto de referencia",
    placeholder: "Pega un texto para ampliarlo o reducirlo…",
    adjustment: "Ajuste de longitud",
    custom: "% personalizado",
    percentage: "Porcentaje personalizado",
    target: "Longitud deseada",
    characters: "caracteres",
    generate: "Generar variante",
  },
  consent: {
    aria: "Aviso de privacidad y cookies",
    title: "Preferencias de privacidad",
    intro: "Usamos el almacenamiento local del navegador para guardar preferencias esenciales. Las funciones opcionales de analítica y publicidad permanecen desactivadas hasta que las actives.",
    necessary: "Esenciales",
    necessaryNote: "Preferencias de tema y consentimiento.",
    analytics: "Analítica",
    analyticsNote: "Estadísticas de uso anónimas",
    advertising: "Publicidad",
    advertisingNote: "Visualización y medición de anuncios.",
    accept: "Aceptar todo",
    reject: "Rechazar todo",
    customize: "Personalizar",
    save: "Guardar preferencias",
  },
  sections: {
    remainingTools: "Más herramientas para diseñadores",
    aboutEyebrow: "UNA NOTA SOBRE EL TEXTO DE RELLENO",
    aboutTitle: "Un borrador útil para cualquier maqueta.",
    aboutOne: "Lorem Ipsum es un conocido texto de relleno derivado del latín clásico. Los diseñadores lo utilizan para evaluar la jerarquía, el ritmo, la longitud de línea y el espaciado antes de disponer del texto definitivo.",
    aboutTwo: "Define a la vez el número de palabras y párrafos para ajustar la densidad y el ritmo de una maqueta, o cambia a caracteres o frases cuando necesites una longitud precisa.",
    seoEyebrow: "PENSADO PARA MAQUETAS REALES",
    seoTitle: "Un generador de Lorem Ipsum para diseñadores y desarrolladores.",
    seoOneTitle: "Mantén la maqueta fiel a la realidad.",
    seoOneA: "Genera Lorem Ipsum definiendo a la vez un número exacto de palabras y párrafos, y ajusta después la densidad sin tener que configurar todo de nuevo. Usa Caracteres o Frases cuando un componente, un titular o un bloque de texto necesite una longitud precisa.",
    seoOneB: "Este generador está pensado para wireframes, maquetas editoriales, prototipos de interfaces y pruebas tipográficas. Ajustar al marco te permite comprobar cómo se comporta el texto antes de disponer del contenido definitivo.",
    seoTwoTitle: "Copia el formato que necesita tu flujo de trabajo.",
    seoTwoA: "Copia texto plano para notas y borradores, o usa Copiar HTML cuando lleves el texto de relleno a una página o componente. Cambia de formato a medida que la maqueta pasa de la exploración a la implementación.",
    seoTwoB: "Utiliza el resultado como contenido temporal durante el diseño. Sustitúyelo por el texto final aprobado antes de publicar el proyecto.",
    guideEyebrow: "GUÍA BREVE SOBRE LOREM IPSUM",
    guideTitle: "Por qué el texto de relleno sigue siendo útil.",
    guide: [
      ["Qué es Lorem Ipsum", "Lorem Ipsum es un texto temporal que se utiliza para probar una página antes de disponer del contenido definitivo. Al tener la apariencia de un texto real sin transmitir un mensaje, permite evaluar la jerarquía, la longitud de línea, el tamaño tipográfico, el espaciado y el equilibrio entre el texto y los demás elementos."],
      ["De dónde procede", "El conocido comienzo procede de una adaptación de un pasaje de De finibus bonorum et malorum, de Cicerón. Con el tiempo, el latín original se acortó y reorganizó hasta convertirse en el texto de relleno neutro que hoy utilizan las herramientas de diseño impreso y digital."],
      ["Cuándo usarlo", "Utiliza Lorem Ipsum en wireframes, primeros prototipos de interfaces, maquetas editoriales, folletos, packaging y pruebas tipográficas. Permite mantener la atención en la estructura mientras el contenido definitivo todavía está por decidir."],
      ["Cuándo sustituirlo", "El texto de relleno debe sustituirse antes de dar por terminado un sitio web, documento o proyecto impreso. El contenido real es necesario para revisar el tono, la accesibilidad, el significado, la visibilidad en buscadores y la experiencia de lectura."],
    ],
  },
  faq: {
    eyebrow: "RESPUESTAS PARA DISEÑADORES",
    title: "Preguntas frecuentes sobre el generador de Lorem Ipsum",
    intro: "Respuestas claras sobre texto de relleno, cantidad de palabras, privacidad y uso práctico.",
    items: [
      ["¿Qué es un generador de Lorem Ipsum?", "Un generador de Lorem Ipsum crea texto de relleno temporal para que puedas evaluar la jerarquía, el espaciado, la longitud de línea y la maquetación antes de disponer del contenido definitivo."],
      ["¿Puedo generar un número exacto de palabras y párrafos?", "Sí. Define Palabras y Párrafos a la vez. El generador mantiene exacto el número total de palabras y distribuye el texto entre párrafos de longitud variada de forma natural."],
      ["¿Puedo usar el Lorem Ipsum generado en un proyecto comercial?", "Lorem Ipsum es texto de relleno. Sustitúyelo por el texto final aprobado antes de publicar o entregar un proyecto terminado y comprueba cualquier requisito específico de contenido."],
      ["¿Este generador de Lorem Ipsum guarda mi texto?", "El generador funciona en tu navegador. El texto que introduces en las herramientas del sitio no se envía al servidor de la aplicación. La preferencia de tema se guarda localmente cuando eliges un tema manual."],
    ],
  },
  footer: { featuredOn: "Featured on",
    description: "Texto de relleno para diseños cuidados.",
    aria: "Información legal",
    privacy: "Política de privacidad",
    cookies: "Política de cookies",
    manage: "Gestionar preferencias de privacidad",
    privacyHref: "/es/privacy-policy/",
    cookiesHref: "/es/cookie-policy/",
  },
};

const frenchHomepageCopy: HomepageCopy = {
  ...spanishHomepageCopy,
  locale: "fr",
  numberLocale: "fr-FR",
  languageLabel: "Langue",
  themeLabel: "Thème de couleur",
  theme: { system: "Auto", light: "clair", dark: "sombre" },
  title: "Lorem Ipsum Generator",
  intro: "Générez un nombre exact de mots, paragraphes, phrases ou caractères pour vos mises en page, prototypes et projets de design.",
  schema: {
    description: "Un générateur de Lorem Ipsum dans le navigateur pour créer un nombre exact de mots, paragraphes, phrases et caractères.",
    featureList: ["Nombre exact de mots et de paragraphes", "Génération par caractères et phrases", "Aperçu de l’ajustement au bloc", "Génération locale dans le navigateur"],
  },
  generator: {
    ...spanishHomepageCopy.generator,
    mode: "Mode",
    modeLabel: "Mode de génération",
    layout: "Mots + paragraphes",
    characters: "Caractères",
    sentences: "Phrases",
    quickWords: "Quantités rapides",
    presets: "Préréglages",
    options: "Options",
    startClassic: "Commencer par « Lorem ipsum… »",
    sentenceLength: "Longueur des phrases",
    short: "Courtes",
    mixed: "Variées",
    long: "Longues",
    output: "Résultat",
    outputAria: "Lorem Ipsum généré",
    words: "Mots",
    paragraphs: "Paragraphes",
    stats: { words: "mots", characters: "caractères", withoutSpaces: "sans espaces", sentences: "phrases", paragraphs: "paragraphes" },
    copy: "Copier",
    copied: "Copié",
    copyHtml: "Copier le HTML",
    regenerate: "Régénérer",
  },
  fit: {
    aria: "Ajuster au bloc",
    title: "Ajuster au bloc",
    note: "Testez la quantité de texte qui tient dans un bloc de taille fixe.",
    width: "Largeur",
    height: "Hauteur",
    fontSize: "Taille de police",
    lineHeight: "Interligne",
    padding: "Marge intérieure",
    preview: "Aperçu",
    approximate: "Nombre approximatif de mots",
    box: "Dimensions",
  },
  match: {
    aria: "Adapter à un texte existant",
    title: "Adapter à un texte existant",
    note: "Remplacez un texte tout en conservant un encombrement similaire.",
    source: "Texte de référence",
    placeholder: "Collez un texte à mesurer…",
    matched: "Texte adapté",
    characters: "Même nombre de caractères",
    words: "Même nombre de mots",
    paragraphs: "Même nombre de paragraphes",
  },
  expansion: {
    title: "Variation de longueur",
    note: "Voyez comment une mise en page réagit avec plus ou moins de texte.",
    source: "Texte de référence",
    placeholder: "Collez un texte à allonger ou raccourcir…",
    adjustment: "Ajustement de la longueur",
    custom: "% personnalisé",
    percentage: "Pourcentage personnalisé",
    target: "Longueur souhaitée",
    characters: "caractères",
    generate: "Générer une variante",
  },
  consent: {
    aria: "Avis de confidentialité et de cookies",
    title: "Préférences de confidentialité",
    intro: "Nous utilisons le stockage local du navigateur pour les préférences essentielles. Les fonctions facultatives de statistiques et de publicité restent désactivées tant que vous ne les activez pas.",
    necessary: "Essentiels",
    necessaryNote: "Préférences de thème et de consentement.",
    analytics: "Statistiques",
    analyticsNote: "Statistiques d’utilisation anonymes",
    advertising: "Publicité",
    advertisingNote: "Affichage et mesure des publicités.",
    accept: "Tout accepter",
    reject: "Tout refuser",
    customize: "Personnaliser",
    save: "Enregistrer les préférences",
  },
  sections: {
    ...spanishHomepageCopy.sections,
    remainingTools: "Autres outils pour designers",
    aboutEyebrow: "À PROPOS DU TEXTE DE SUBSTITUTION",
    aboutTitle: "Une base de travail pour chaque mise en page.",
    aboutOne: "Lorem Ipsum est un texte de substitution bien connu dérivé du latin classique. Les designers l’utilisent pour évaluer la hiérarchie, le rythme, la longueur des lignes et l’espacement avant de disposer du contenu final.",
    aboutTwo: "Définissez simultanément le nombre de mots et de paragraphes pour ajuster la densité et le rythme d’une mise en page, ou passez aux caractères ou aux phrases lorsqu’une longueur précise est nécessaire.",
    seoEyebrow: "CONÇU POUR DE VRAIES MISES EN PAGE",
    seoTitle: "Un générateur de Lorem Ipsum pour designers et développeurs.",
    seoOneTitle: "Gardez une mise en page fidèle à la réalité.",
    seoOneA: "Générez du Lorem Ipsum en définissant simultanément un nombre exact de mots et de paragraphes, puis ajustez la densité sans refaire vos réglages. Utilisez Caractères ou Phrases lorsqu’un composant, un titre ou un bloc de texte doit respecter un encombrement précis.",
    seoOneB: "Ce générateur est conçu pour les wireframes, les mises en page éditoriales, les prototypes d’interface et les études typographiques. Ajuster au bloc vous permet de tester le comportement du texte avant l’arrivée du contenu final.",
    seoTwoTitle: "Copiez le format adapté à votre flux de travail.",
    seoTwoA: "Copiez du texte brut pour vos notes et brouillons, ou utilisez Copier le HTML pour intégrer le texte de substitution à une page ou un composant. Changez de format à mesure que votre mise en page passe de l’exploration à l’implémentation.",
    seoTwoB: "Utilisez le résultat comme contenu temporaire pendant la conception. Remplacez-le par le contenu final approuvé avant de publier le projet.",
    guideEyebrow: "GUIDE RAPIDE DU LOREM IPSUM",
    guideTitle: "Pourquoi le texte de substitution reste utile.",
    guide: [
      ["Qu’est-ce que Lorem Ipsum ?", "Lorem Ipsum est un texte temporaire utilisé pour tester une page avant que le contenu final ne soit prêt. Comme il ressemble à une langue sans transmettre de message, il permet d’évaluer la hiérarchie, la longueur des lignes, la taille des caractères, l’espacement et l’équilibre entre le texte et les autres éléments."],
      ["D’où vient-il ?", "Le début bien connu est adapté d’un passage du De finibus bonorum et malorum de Cicéron. Au fil du temps, le latin d’origine a été raccourci et réorganisé pour devenir le texte de substitution neutre utilisé aujourd’hui dans les outils de conception imprimée et numérique."],
      ["Quand l’utiliser", "Utilisez Lorem Ipsum pour les wireframes, les premiers prototypes d’interface, les mises en page éditoriales, les brochures, le packaging et les études typographiques. Il permet de rester concentré sur la structure tant que les choix de contenu ne sont pas finalisés."],
      ["Quand le remplacer", "Le texte de substitution doit être remplacé avant la finalisation d’un site web, d’un document ou d’un projet imprimé. Le contenu réel est indispensable pour évaluer le ton, l’accessibilité, le sens, la visibilité dans les moteurs de recherche et l’expérience de lecture."],
    ],
  },
  faq: {
    eyebrow: "RÉPONSES POUR LES DESIGNERS",
    title: "FAQ du générateur de Lorem Ipsum",
    intro: "Des réponses claires sur le texte de substitution, le nombre de mots, la confidentialité et l’utilisation pratique.",
    items: [
      ["Qu’est-ce qu’un générateur de Lorem Ipsum ?", "Un générateur de Lorem Ipsum crée du texte de substitution temporaire pour vous permettre d’évaluer la hiérarchie, l’espacement, la longueur des lignes et la mise en page avant de disposer du contenu final."],
      ["Puis-je générer un nombre exact de mots et de paragraphes ?", "Oui. Définissez simultanément le nombre de mots et de paragraphes. Le générateur conserve exactement le nombre total de mots tout en répartissant le texte dans des paragraphes de longueur naturellement variée."],
      ["Puis-je utiliser le Lorem Ipsum généré dans un projet commercial ?", "Lorem Ipsum est un texte de substitution. Remplacez-le par le contenu final approuvé avant de publier ou livrer un projet terminé, et vérifiez les éventuelles exigences propres au projet."],
      ["Ce générateur de Lorem Ipsum enregistre-t-il mon texte ?", "Le générateur fonctionne dans votre navigateur. Le texte saisi dans les outils du site n’est pas envoyé au serveur de l’application. La préférence de thème est enregistrée localement lorsque vous choisissez manuellement un thème."],
    ],
  },
  footer: { featuredOn: "Featured on",
    description: "Texte de substitution pour des mises en page soignées.",
    aria: "Informations légales",
    privacy: "Politique de confidentialité",
    cookies: "Politique relative aux cookies",
    manage: "Gérer les préférences de confidentialité",
    privacyHref: "/fr/privacy-policy/",
    cookiesHref: "/fr/cookie-policy/",
  },
};

const germanHomepageCopy: HomepageCopy = {
  ...frenchHomepageCopy,
  locale: "de",
  numberLocale: "de-DE",
  languageLabel: "Sprache",
  themeLabel: "Farbschema",
  theme: { system: "Auto", light: "hell", dark: "dunkel" },
  title: "Lorem Ipsum Generator",
  intro: "Erzeuge eine genaue Anzahl an Wörtern, Absätzen, Sätzen oder Zeichen für Layouts, Prototypen und Designprojekte.",
  schema: {
    description: "Ein browserbasierter Lorem-Ipsum-Generator für eine exakte Anzahl an Wörtern, Absätzen, Sätzen und Zeichen.",
    featureList: ["Exakte Anzahl an Wörtern und Absätzen", "Generierung nach Zeichen und Sätzen", "Vorschau für die Rahmenanpassung", "Lokale Generierung im Browser"],
  },
  generator: {
    ...frenchHomepageCopy.generator,
    mode: "Modus",
    modeLabel: "Generierungsmodus",
    layout: "Wörter + Absätze",
    characters: "Zeichen",
    sentences: "Sätze",
    quickWords: "Schnellauswahl",
    presets: "Vorgaben",
    options: "Optionen",
    startClassic: "Mit „Lorem ipsum…“ beginnen",
    sentenceLength: "Satzlänge",
    short: "Kurz",
    mixed: "Gemischt",
    long: "Lang",
    output: "Ergebnis",
    outputAria: "Generierter Lorem Ipsum",
    words: "Wörter",
    paragraphs: "Absätze",
    stats: { words: "Wörter", characters: "Zeichen", withoutSpaces: "ohne Leerzeichen", sentences: "Sätze", paragraphs: "Absätze" },
    copy: "Kopieren",
    copied: "Kopiert",
    copyHtml: "HTML kopieren",
    regenerate: "Neu generieren",
  },
  fit: {
    aria: "An Rahmen anpassen",
    title: "An Rahmen anpassen",
    note: "Prüfe, wie viel Text in einen Rahmen mit festen Abmessungen passt.",
    width: "Breite",
    height: "Höhe",
    fontSize: "Schriftgröße",
    lineHeight: "Zeilenabstand",
    padding: "Innenabstand",
    preview: "Vorschau",
    approximate: "Ungefähre Wortanzahl",
    box: "Abmessungen",
  },
  match: {
    aria: "An bestehenden Text anpassen",
    title: "An bestehenden Text anpassen",
    note: "Ersetze Text und behalte dabei einen ähnlichen Umfang bei.",
    source: "Referenztext",
    placeholder: "Text zum Messen einfügen…",
    matched: "Angepasster Text",
    characters: "Gleiche Zeichenanzahl",
    words: "Gleiche Wortanzahl",
    paragraphs: "Gleiche Absatzanzahl",
  },
  expansion: {
    title: "Längenvariation",
    note: "Prüfe, wie sich ein Layout mit mehr oder weniger Text verhält.",
    source: "Referenztext",
    placeholder: "Text zum Verlängern oder Kürzen einfügen…",
    adjustment: "Längenanpassung",
    custom: "Eigene %",
    percentage: "Eigener Prozentsatz",
    target: "Gewünschte Länge",
    characters: "Zeichen",
    generate: "Variante erzeugen",
  },
  consent: {
    aria: "Hinweis zu Datenschutz und Cookies",
    title: "Datenschutzeinstellungen",
    intro: "Wir verwenden den lokalen Browserspeicher für notwendige Einstellungen. Optionale Analyse- und Werbefunktionen bleiben deaktiviert, bis du sie aktivierst.",
    necessary: "Notwendig",
    necessaryNote: "Design- und Einwilligungseinstellungen.",
    analytics: "Analyse",
    analyticsNote: "Anonyme Nutzungsstatistiken",
    advertising: "Werbung",
    advertisingNote: "Ausspielung und Messung von Werbung.",
    accept: "Alle akzeptieren",
    reject: "Alle ablehnen",
    customize: "Einstellungen",
    save: "Einstellungen speichern",
  },
  sections: {
    ...frenchHomepageCopy.sections,
    remainingTools: "Weitere Werkzeuge für Designer",
    aboutEyebrow: "EIN HINWEIS ZU BLINDTEXT",
    aboutTitle: "Eine Arbeitsgrundlage für jedes Layout.",
    aboutOne: "Lorem Ipsum ist ein bekannter Blindtext, der auf klassischem Latein basiert. Designer nutzen ihn, um Hierarchie, Rhythmus, Zeilenlänge und Abstände zu beurteilen, bevor der endgültige Inhalt vorliegt.",
    aboutTwo: "Lege Wörter und Absätze gleichzeitig fest, um Dichte und Rhythmus eines Layouts anzupassen, oder wechsle zu Zeichen oder Sätzen, wenn eine präzise Länge wichtig ist.",
    seoEyebrow: "FÜR REALE LAYOUTS ENTWICKELT",
    seoTitle: "Ein Lorem-Ipsum-Generator für Designer und Entwickler.",
    seoOneTitle: "Halte dein Layout realistisch.",
    seoOneA: "Erzeuge Lorem Ipsum mit einer exakten Anzahl an Wörtern und Absätzen und passe anschließend die Textdichte an, ohne deine Einstellungen neu aufzubauen. Nutze Zeichen oder Sätze, wenn ein Element, eine Überschrift oder ein Textblock einen präzisen Umfang benötigt.",
    seoOneB: "Dieser Generator ist für Wireframes, redaktionelle Layouts, Interface-Prototypen und typografische Studien gedacht. Mit „An Rahmen anpassen“ kannst du testen, wie sich Text verhält, bevor der endgültige Inhalt vorliegt.",
    seoTwoTitle: "Kopiere das Format, das dein Workflow braucht.",
    seoTwoA: "Kopiere reinen Text für Notizen und Entwürfe oder nutze „HTML kopieren“, wenn du Blindtext in eine Seite oder Komponente übernimmst. Wechsle das Format, während sich dein Layout von der Exploration zur Umsetzung entwickelt.",
    seoTwoB: "Nutze das Ergebnis während des Designs als temporären Inhalt. Ersetze es vor der Veröffentlichung des Projekts durch den freigegebenen finalen Text.",
    guideEyebrow: "KURZER LEITFADEN ZU LOREM IPSUM",
    guideTitle: "Warum Blindtext weiterhin sinnvoll ist.",
    guide: [
      ["Was Lorem Ipsum ist", "Lorem Ipsum ist temporärer Text, mit dem eine Seite getestet wird, bevor die endgültigen Inhalte vorliegen. Da er wie Sprache aussieht, ohne eine konkrete Botschaft zu vermitteln, lässt sich damit beurteilen, wie Hierarchie, Zeilenlänge, Schriftgröße, Abstände und das Verhältnis zwischen Text und anderen Elementen wirken."],
      ["Woher es stammt", "Der bekannte Anfang geht auf eine bearbeitete Passage aus Ciceros De finibus bonorum et malorum zurück. Im Laufe der Zeit wurde das ursprüngliche Latein gekürzt und neu angeordnet, bis daraus der neutrale Blindtext entstand, der heute in Print- und Digitaldesign verwendet wird."],
      ["Wann du es verwenden solltest", "Nutze Lorem Ipsum für Wireframes, frühe Interface-Prototypen, redaktionelle Layouts, Broschüren, Verpackungen und typografische Studien. So bleibt der Fokus auf der Struktur, solange die endgültigen Inhalte noch nicht feststehen."],
      ["Wann du es ersetzen solltest", "Blindtext sollte ersetzt werden, bevor eine Website, ein Dokument oder ein Printprojekt fertiggestellt wird. Erst mit realen Inhalten lassen sich Tonalität, Barrierefreiheit, Bedeutung, Sichtbarkeit in Suchmaschinen und die tatsächliche Leseerfahrung zuverlässig beurteilen."],
    ],
  },
  faq: {
    eyebrow: "ANTWORTEN FÜR DESIGNER",
    title: "FAQ zum Lorem-Ipsum-Generator",
    intro: "Klare Antworten zu Blindtext, Wortanzahl, Datenschutz und praktischer Anwendung.",
    items: [
      ["Was ist ein Lorem-Ipsum-Generator?", "Ein Lorem-Ipsum-Generator erzeugt temporären Blindtext, mit dem du Hierarchie, Abstände, Zeilenlänge und Layout beurteilen kannst, bevor die endgültigen Inhalte vorliegen."],
      ["Kann ich eine genaue Anzahl an Wörtern und Absätzen erzeugen?", "Ja. Lege Wörter und Absätze gleichzeitig fest. Der Generator hält die Gesamtzahl der Wörter exakt ein und verteilt den Text auf natürlich unterschiedlich lange Absätze."],
      ["Kann ich generierten Lorem Ipsum in einem kommerziellen Projekt verwenden?", "Lorem Ipsum ist Blindtext. Ersetze ihn vor der Veröffentlichung oder Übergabe eines fertigen Projekts durch den freigegebenen finalen Inhalt und beachte projektspezifische Inhaltsanforderungen."],
      ["Speichert dieser Lorem-Ipsum-Generator meinen Text?", "Der Generator läuft in deinem Browser. Text, den du in die Werkzeuge der Seite eingibst, wird nicht an den Anwendungsserver gesendet. Deine Design-Einstellung wird lokal gespeichert, wenn du ein Farbschema manuell auswählst."],
    ],
  },
  footer: { featuredOn: "Featured on",
    description: "Blindtext für sorgfältig gestaltete Layouts.",
    aria: "Rechtliche Informationen",
    privacy: "Datenschutzerklärung",
    cookies: "Cookie-Richtlinie",
    manage: "Datenschutzeinstellungen verwalten",
    privacyHref: "/de/privacy-policy/",
    cookiesHref: "/de/cookie-policy/",
  },
};

const brazilianPortugueseHomepageCopy: HomepageCopy = {
  locale: "pt-BR",
  numberLocale: "pt-BR",
  languageLabel: "Idioma",
  themeLabel: "Tema de cores",
  theme: { system: "Automático", light: "claro", dark: "escuro" },
  title: "Lorem Ipsum Generator",
  intro: "Gere uma quantidade exata de palavras, parágrafos, frases ou caracteres para layouts, protótipos e projetos de design.",
  schema: { description: "Um gerador de Lorem Ipsum no navegador para criar uma quantidade exata de palavras, parágrafos, frases e caracteres.", featureList: ["Contagem exata de palavras e parágrafos", "Geração por caracteres e frases", "Visualização do ajuste ao quadro", "Geração local no navegador"] },
  generator: { mode: "Modo", modeLabel: "Modo de geração", layout: "Palavras + parágrafos", characters: "Caracteres", sentences: "Frases", quickWords: "Quantidades rápidas", presets: "Predefinições", options: "Opções", startClassic: "Começar com “Lorem ipsum…”", sentenceLength: "Comprimento das frases", short: "Curtas", mixed: "Variadas", long: "Longas", output: "Resultado", outputAria: "Lorem Ipsum gerado", words: "Palavras", paragraphs: "Parágrafos", stats: { words: "palavras", characters: "caracteres", withoutSpaces: "sem espaços", sentences: "frases", paragraphs: "parágrafos" }, copy: "Copiar", copied: "Copiado", copyHtml: "Copiar HTML", regenerate: "Gerar novamente" },
  consent: { aria: "Aviso de privacidade e cookies", title: "Preferências de privacidade", intro: "Usamos o armazenamento local do navegador para preferências essenciais. Recursos opcionais de análise e publicidade permanecem desativados até que você os ative.", necessary: "Essenciais", necessaryNote: "Preferências de tema e consentimento.", analytics: "Análises", analyticsNote: "Estatísticas anônimas de uso", advertising: "Publicidade", advertisingNote: "Exibição e medição de anúncios.", accept: "Aceitar tudo", reject: "Recusar opcionais", customize: "Personalizar", save: "Salvar preferências" },
  match: { aria: "Ajustar ao texto existente", title: "Ajustar ao texto existente", note: "Substitua o texto mantendo uma extensão semelhante.", source: "Texto de referência", placeholder: "Cole um texto para medir…", matched: "Texto ajustado", characters: "Mesma quantidade de caracteres", words: "Mesma quantidade de palavras", paragraphs: "Mesma quantidade de parágrafos" },
  expansion: { title: "Variação de comprimento", note: "Veja como um layout se comporta com mais ou menos texto.", source: "Texto de referência", placeholder: "Cole um texto para alongar ou encurtar…", adjustment: "Ajuste de comprimento", custom: "% personalizado", percentage: "Porcentagem personalizada", target: "Comprimento desejado", characters: "caracteres", generate: "Gerar variação" },
  fit: { aria: "Ajustar ao quadro", title: "Ajustar ao quadro", note: "Teste quanto texto cabe em um quadro de tamanho fixo.", width: "Largura", height: "Altura", fontSize: "Tamanho da fonte", lineHeight: "Entrelinha", padding: "Espaçamento interno", preview: "Visualização", approximate: "Contagem aproximada de palavras", box: "Dimensões" },
  sections: {
    remainingTools: "Mais ferramentas para designers",
    aboutEyebrow: "UMA NOTA SOBRE TEXTO DE ESPAÇO RESERVADO",
    aboutTitle: "Uma base de trabalho para qualquer layout.",
    aboutOne: "Lorem Ipsum é um conhecido texto de espaço reservado derivado do latim clássico. Designers o utilizam para avaliar hierarquia, ritmo, comprimento das linhas e espaçamento antes que o conteúdo final esteja pronto.",
    aboutTwo: "Defina palavras e parágrafos ao mesmo tempo para ajustar a densidade e o ritmo de um layout, ou use caracteres ou frases quando precisar de um comprimento preciso.",
    seoEyebrow: "CRIADO PARA LAYOUTS REAIS",
    seoTitle: "Um gerador de Lorem Ipsum para designers e desenvolvedores.",
    seoOneTitle: "Mantenha o layout fiel à realidade.",
    seoOneA: "Gere Lorem Ipsum definindo ao mesmo tempo uma quantidade exata de palavras e parágrafos e depois ajuste a densidade sem refazer suas configurações. Use Caracteres ou Frases quando um componente, título ou quadro de texto precisar de uma extensão precisa.",
    seoOneB: "Este gerador foi criado para wireframes, layouts editoriais, protótipos de interface e estudos tipográficos. Ajustar ao quadro permite testar como o texto se comporta antes que o conteúdo final esteja disponível.",
    seoTwoTitle: "Copie no formato que seu fluxo de trabalho precisa.",
    seoTwoA: "Copie texto simples para notas e rascunhos ou use Copiar HTML ao levar o texto de espaço reservado para uma página ou componente. Alterne entre os formatos à medida que o layout passa da exploração para a implementação.",
    seoTwoB: "Use o resultado como conteúdo temporário durante o processo de design. Substitua-o pelo texto final aprovado antes de publicar o projeto.",
    guideEyebrow: "GUIA RÁPIDO SOBRE LOREM IPSUM",
    guideTitle: "Por que o texto de espaço reservado continua útil.",
    guide: [["O que é Lorem Ipsum", "Lorem Ipsum é um texto temporário usado para testar uma página antes que o conteúdo final esteja pronto. Como se parece com um texto real sem transmitir uma mensagem específica, permite avaliar hierarquia, comprimento das linhas, tamanho da fonte, espaçamento e o equilíbrio entre texto e outros elementos."], ["De onde vem", "O conhecido início deriva de uma adaptação de um trecho de De finibus bonorum et malorum, de Cícero. Com o tempo, o latim original foi abreviado e reorganizado até se tornar o texto neutro de espaço reservado usado atualmente em ferramentas de design impresso e digital."], ["Quando usar", "Use Lorem Ipsum em wireframes, primeiros protótipos de interface, layouts editoriais, folhetos, embalagens e estudos tipográficos. Ele ajuda a manter o foco na estrutura enquanto o conteúdo definitivo ainda está sendo definido."], ["Quando substituir", "O texto de espaço reservado deve ser substituído antes da finalização de um site, documento ou projeto impresso. O conteúdo real é necessário para avaliar tom, acessibilidade, significado, visibilidade nos mecanismos de busca e a experiência real de leitura."]],
  },
  faq: { eyebrow: "RESPOSTAS PARA DESIGNERS", title: "FAQ do gerador de Lorem Ipsum", intro: "Respostas claras sobre texto de espaço reservado, contagem de palavras, privacidade e uso prático.", items: [["O que é um gerador de Lorem Ipsum?", "Um gerador de Lorem Ipsum cria texto temporário de espaço reservado para que você possa avaliar hierarquia, espaçamento, comprimento das linhas e layout antes que o conteúdo final esteja pronto."], ["Posso gerar uma quantidade exata de palavras e parágrafos?", "Sim. Defina Palavras e Parágrafos ao mesmo tempo. O gerador mantém exata a contagem total de palavras e distribui o texto em parágrafos com comprimentos naturalmente variados."], ["Posso usar o Lorem Ipsum gerado em um projeto comercial?", "Lorem Ipsum é texto de espaço reservado. Substitua-o pelo conteúdo final aprovado antes de publicar ou entregar um projeto concluído e verifique eventuais requisitos específicos de conteúdo."], ["Este gerador de Lorem Ipsum armazena meu texto?", "O gerador funciona no seu navegador. O texto inserido nas ferramentas do site não é enviado ao servidor da aplicação. A preferência de tema é armazenada localmente quando você escolhe um tema manualmente."]] },
  footer: { featuredOn: "Featured on", description: "Texto de espaço reservado para layouts bem planejados.", aria: "Informações legais", privacy: "Política de Privacidade", cookies: "Política de Cookies", manage: "Gerenciar preferências de privacidade", privacyHref: "/pt-br/privacy-policy/", cookiesHref: "/pt-br/cookie-policy/" },
};

const dutchHomepageCopy: HomepageCopy = {
  locale: "nl-NL",
  numberLocale: "nl-NL",
  languageLabel: "Taal",
  themeLabel: "Kleurthema",
  theme: { system: "Automatisch", light: "licht", dark: "donker" },
  title: "Lorem Ipsum Generator",
  intro: "Genereer een exact aantal woorden, alinea’s, zinnen of tekens voor layouts, prototypes en ontwerpwerk.",
  schema: { description: "Een Lorem Ipsum Generator in de browser voor het maken van een exact aantal woorden, alinea’s, zinnen en tekens.", featureList: ["Exact aantal woorden en alinea’s", "Genereren op tekens en zinnen", "Voorbeeld voor aanpassen aan kader", "Lokale generatie in de browser"] },
  generator: { mode: "Modus", modeLabel: "Generatiemodus", layout: "Woorden + alinea’s", characters: "Tekens", sentences: "Zinnen", quickWords: "Snelle aantallen", presets: "Voorinstellingen", options: "Opties", startClassic: "Begin met “Lorem ipsum…”", sentenceLength: "Zinslengte", short: "Kort", mixed: "Gemengd", long: "Lang", output: "Resultaat", outputAria: "Gegenereerde Lorem Ipsum", words: "Woorden", paragraphs: "Alinea’s", stats: { words: "woorden", characters: "tekens", withoutSpaces: "zonder spaties", sentences: "zinnen", paragraphs: "alinea’s" }, copy: "Kopiëren", copied: "Gekopieerd", copyHtml: "HTML kopiëren", regenerate: "Opnieuw genereren" },
  consent: { aria: "Privacy- en cookiemelding", title: "Privacyvoorkeuren", intro: "We gebruiken lokale browseropslag voor essentiële voorkeuren. Optionele functies voor analyse en advertenties blijven uitgeschakeld totdat je ze inschakelt.", necessary: "Essentieel", necessaryNote: "Thema- en toestemmingsvoorkeuren.", analytics: "Analyse", analyticsNote: "Anonieme gebruiksstatistieken", advertising: "Advertenties", advertisingNote: "Weergave en meting van advertenties.", accept: "Alles accepteren", reject: "Optionele functies weigeren", customize: "Aanpassen", save: "Voorkeuren opslaan" },
  match: { aria: "Aanpassen aan bestaande tekst", title: "Aanpassen aan bestaande tekst", note: "Vervang tekst terwijl je ongeveer dezelfde lengte behoudt.", source: "Referentietekst", placeholder: "Plak tekst om te meten…", matched: "Aangepaste tekst", characters: "Zelfde aantal tekens", words: "Zelfde aantal woorden", paragraphs: "Zelfde aantal alinea’s" },
  expansion: { title: "Lengtevariatie", note: "Bekijk hoe een layout reageert op meer of minder tekst.", source: "Referentietekst", placeholder: "Plak tekst om deze langer of korter te maken…", adjustment: "Lengte aanpassen", custom: "aangepast %", percentage: "Aangepast percentage", target: "Gewenste lengte", characters: "tekens", generate: "Variatie genereren" },
  fit: { aria: "Aanpassen aan kader", title: "Aanpassen aan kader", note: "Test hoeveel tekst in een kader met vaste afmetingen past.", width: "Breedte", height: "Hoogte", fontSize: "Lettergrootte", lineHeight: "Regelafstand", padding: "Binnenruimte", preview: "Voorbeeld", approximate: "Geschat aantal woorden", box: "Afmetingen" },
  sections: {
    remainingTools: "Meer tools voor designers",
    aboutEyebrow: "EEN OPMERKING OVER TIJDELIJKE TEKST",
    aboutTitle: "Een werkbasis voor elke layout.",
    aboutOne: "Lorem Ipsum is een bekende tijdelijke tekst die is afgeleid van klassiek Latijn. Designers gebruiken deze tekst om hiërarchie, ritme, regellengte en tussenruimte te beoordelen voordat de definitieve inhoud klaar is.",
    aboutTwo: "Stel woorden en alinea’s tegelijk in om de dichtheid en het ritme van een layout af te stemmen, of gebruik tekens of zinnen wanneer je een precieze lengte nodig hebt.",
    seoEyebrow: "GEMAAKT VOOR ECHTE LAYOUTS",
    seoTitle: "Een Lorem Ipsum Generator voor designers en developers.",
    seoOneTitle: "Houd je layout realistisch.",
    seoOneA: "Genereer Lorem Ipsum door tegelijk een exact aantal woorden en alinea’s in te stellen en pas daarna de dichtheid aan zonder je instellingen opnieuw te doen. Gebruik Tekens of Zinnen wanneer een component, kop of tekstkader een precieze lengte nodig heeft.",
    seoOneB: "Deze generator is gemaakt voor wireframes, redactionele layouts, interfaceprototypes en typografische studies. Aanpassen aan kader helpt je te testen hoe tekst zich gedraagt voordat de definitieve inhoud beschikbaar is.",
    seoTwoTitle: "Kopieer in het formaat dat je workflow nodig heeft.",
    seoTwoA: "Kopieer platte tekst voor notities en concepten of gebruik HTML kopiëren wanneer je tijdelijke tekst naar een pagina of component overbrengt. Wissel tussen formaten terwijl de layout van verkenning naar implementatie gaat.",
    seoTwoB: "Gebruik het resultaat als tijdelijke inhoud tijdens het ontwerpproces. Vervang het door de definitief goedgekeurde tekst voordat je het project publiceert.",
    guideEyebrow: "SNELLE GIDS VOOR LOREM IPSUM",
    guideTitle: "Waarom tijdelijke tekst nog steeds nuttig is.",
    guide: [["Wat is Lorem Ipsum", "Lorem Ipsum is tijdelijke tekst die wordt gebruikt om een pagina te testen voordat de definitieve inhoud klaar is. Omdat het eruitziet als echte tekst zonder een specifieke boodschap over te brengen, kun je hiërarchie, regellengte, lettergrootte, tussenruimte en de balans tussen tekst en andere elementen beoordelen."], ["Waar komt het vandaan", "Het bekende begin is afgeleid van een bewerking van een passage uit De finibus bonorum et malorum van Cicero. In de loop van de tijd werd het oorspronkelijke Latijn ingekort en herschikt tot de neutrale tijdelijke tekst die tegenwoordig wordt gebruikt in tools voor print- en digitaal ontwerp."], ["Wanneer gebruiken", "Gebruik Lorem Ipsum in wireframes, vroege interfaceprototypes, redactionele layouts, brochures, verpakkingen en typografische studies. Het helpt de aandacht op de structuur te houden terwijl de definitieve inhoud nog wordt uitgewerkt."], ["Wanneer vervangen", "Tijdelijke tekst moet worden vervangen voordat een website, document of gedrukt ontwerp wordt afgerond. Echte inhoud is nodig om toon, toegankelijkheid, betekenis, zichtbaarheid in zoekmachines en de daadwerkelijke leeservaring te beoordelen."]],
  },
  faq: { eyebrow: "ANTWOORDEN VOOR DESIGNERS", title: "Veelgestelde vragen over de Lorem Ipsum Generator", intro: "Duidelijke antwoorden over tijdelijke tekst, woordenaantallen, privacy en praktisch gebruik.", items: [["Wat is een Lorem Ipsum Generator?", "Een Lorem Ipsum Generator maakt tijdelijke tekst waarmee je hiërarchie, tussenruimte, regellengte en layout kunt beoordelen voordat de definitieve inhoud klaar is."], ["Kan ik een exact aantal woorden en alinea’s genereren?", "Ja. Stel Woorden en Alinea’s tegelijk in. De generator houdt het totale aantal woorden exact en verdeelt de tekst over alinea’s met natuurlijk variërende lengtes."], ["Kan ik de gegenereerde Lorem Ipsum gebruiken in een commercieel project?", "Lorem Ipsum is tijdelijke tekst. Vervang deze door definitief goedgekeurde inhoud voordat je een afgerond project publiceert of oplevert, en controleer eventuele specifieke inhoudsvereisten."], ["Slaat deze Lorem Ipsum Generator mijn tekst op?", "De generator werkt in je browser. Tekst die je in de tools op de site invoert, wordt niet naar de applicatieserver verzonden. De themavoorkeur wordt lokaal opgeslagen wanneer je handmatig een thema kiest."]] },
  footer: { featuredOn: "Featured on", description: "Tijdelijke tekst voor doordachte layouts.", aria: "Juridische informatie", privacy: "Privacybeleid", cookies: "Cookiebeleid", manage: "Privacyvoorkeuren beheren", privacyHref: "/nl/privacy-policy/", cookiesHref: "/nl/cookie-policy/" },
};

export const homepageCopy: Record<HomepageLocale, HomepageCopy> = { ...baseHomepageCopy, es: spanishHomepageCopy, fr: frenchHomepageCopy, de: germanHomepageCopy, "pt-BR": brazilianPortugueseHomepageCopy, "nl-NL": dutchHomepageCopy };
