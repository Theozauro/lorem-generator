export type HomepageLocale = "en" | "it";

export type HomepageCopy = {
  locale: HomepageLocale;
  numberLocale: string;
  languageLabel: string;
  themeLabel: string;
  theme: { system: string; light: string; dark: string };
  title: string;
  titleAfterBreak: string;
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
  footer: { description: string; aria: string; privacy: string; cookies: string; manage: string; privacyHref: string; cookiesHref: string };
};

export const homepageCopy: Record<HomepageLocale, HomepageCopy> = {
  en: {
    locale: "en", numberLocale: "en-US", languageLabel: "Language", themeLabel: "Color theme", theme: { system: "Auto", light: "light", dark: "dark" },
    title: "Generate clean placeholder text", titleAfterBreak: "with the Lorem Ipsum Generator", intro: "Generate exact words, paragraphs, sentences, or characters for layouts, prototypes, and design work.",
    schema: { description: "A browser-based Lorem Ipsum generator for exact words, paragraphs, sentences, and characters.", featureList: ["Exact word and paragraph counts", "Character and sentence generation", "Fit to Box preview", "Browser-local generation"] },
    generator: { mode: "Mode", modeLabel: "Generation mode", layout: "Words + paragraphs", characters: "Characters", sentences: "Sentences", quickWords: "Quick word counts", presets: "Presets", options: "Options", startClassic: "Start with “Lorem ipsum…”", sentenceLength: "Sentence length", short: "Short", mixed: "Mixed", long: "Long", output: "Output", outputAria: "Generated Lorem Ipsum", words: "Words", paragraphs: "Paragraphs", stats: { words: "words", characters: "characters", withoutSpaces: "without spaces", sentences: "sentences", paragraphs: "paragraphs" }, copy: "Copy", copied: "Copied", copyHtml: "Copy HTML", regenerate: "Regenerate" },
    consent: { aria: "Privacy and cookie notice", title: "Privacy preferences", intro: "We use local storage for essential preferences. Optional analytics and advertising remain off until you choose them.", necessary: "Necessary", necessaryNote: "Theme and consent preferences.", analytics: "Analytics", analyticsNote: "Anonymous usage statistics", advertising: "Advertising", advertisingNote: "Ad delivery and measurement.", accept: "Accept all", reject: "Reject optional", customize: "Customize", save: "Save choices" },
    match: { aria: "Match existing text", title: "Match existing text", note: "Replace copy while keeping a similar text footprint.", source: "Source text", placeholder: "Paste text to measure…", matched: "Matched text", characters: "Match character count", words: "Match word count", paragraphs: "Match paragraph count" },
    expansion: { title: "Text expansion", note: "See how a layout behaves with more or less copy.", source: "Source text", placeholder: "Paste text to expand or reduce…", adjustment: "Length adjustment", custom: "Custom %", percentage: "Custom percentage", target: "Target length", characters: "characters", generate: "Generate variant" },
    fit: { aria: "Fit to Box", title: "Fit to Box", note: "Test how much text fits in a fixed-size box.", width: "Width", height: "Height", fontSize: "Font size", lineHeight: "Line height", padding: "Padding", preview: "Preview", approximate: "Approximate word count", box: "box" },
    sections: { remainingTools: "More Designer Tools", aboutEyebrow: "A NOTE ON PLACEHOLDER TEXT", aboutTitle: "A working draft for every layout.", aboutOne: "Lorem Ipsum is familiar placeholder text derived from classical Latin. Designers use it to judge hierarchy, rhythm, line length, and spacing before final copy is ready.", aboutTwo: "Set words and paragraphs together to match a layout's density and rhythm, or switch to characters or sentences when a precise length matters.", seoEyebrow: "BUILT FOR REAL LAYOUTS", seoTitle: "A Lorem Ipsum Generator for designers and developers.", seoOneTitle: "Keep the layout honest.", seoOneA: "Generate Lorem Ipsum with exact words and paragraphs together, then adjust the density without rebuilding your settings. Use Characters or Sentences when a component, headline, or text block needs a precise footprint.", seoOneB: "This generator is made for wireframes, editorial layouts, interface prototypes, and type studies. Fit to Box helps you test how copy behaves before final content arrives.", seoTwoTitle: "Copy the format your workflow needs.", seoTwoA: "Copy plain text for notes and drafts, or use Copy HTML when you are moving placeholder content into a page or component. Switch formats as your layout moves from exploration to implementation.", seoTwoB: "Use the result as temporary content during design. Replace it with approved final copy before publishing a finished project.", guideEyebrow: "A SHORT GUIDE TO LOREM IPSUM", guideTitle: "Why placeholder text still matters.", guide: [["What Lorem Ipsum is", "Lorem Ipsum is temporary copy used to test a page before the final words are ready. Because it looks like a language without delivering a message, it lets a designer judge hierarchy, line length, type size, spacing, and the balance between text and other elements."], ["Where it comes from", "The familiar opening is adapted from a passage in Cicero’s De finibus bonorum et malorum. Over time, the original Latin was shortened and rearranged into the neutral placeholder text used by print and digital design tools today."], ["When to use it", "Use Lorem Ipsum for wireframes, early interface prototypes, editorial layouts, brochures, packaging, and type studies. It keeps attention on the structure while content decisions are still in progress."], ["When to replace it", "Placeholder copy should disappear before a website, document, or printed project is final. Real content is needed to review tone, accessibility, meaning, search visibility, and the actual reading experience."]] },
    faq: { eyebrow: "ANSWERS FOR DESIGNERS", title: "Lorem Ipsum generator FAQ", intro: "Clear answers about placeholder text, word counts, privacy, and practical use.", items: [["What is a Lorem Ipsum generator?", "A Lorem Ipsum generator creates temporary placeholder copy so you can evaluate hierarchy, spacing, line length, and layout before final content is ready."], ["Can I generate an exact number of words and paragraphs?", "Yes. Set Words and Paragraphs together. The generator keeps the total word count exact while distributing the copy across naturally varied paragraphs."], ["Can I use generated Lorem Ipsum in a commercial project?", "Lorem Ipsum is placeholder text. Replace it with approved final copy before publishing or shipping a finished product, and check any project-specific content requirements."], ["Does this Lorem Ipsum generator store my text?", "The generator runs in your browser. Text entered into the local tools is not sent to a server by this page. Theme preference is stored locally when you choose a manual theme."]] },
    footer: { description: "Placeholder copy for thoughtful layouts.", aria: "Legal information", privacy: "Privacy Policy", cookies: "Cookie Policy", manage: "Manage privacy preferences", privacyHref: "/privacy-policy/", cookiesHref: "/cookie-policy/" },
  },
  it: {
    locale: "it", numberLocale: "it-IT", languageLabel: "Lingua", themeLabel: "Tema colore", theme: { system: "Auto", light: "Chiaro", dark: "Scuro" },
    title: "Genera testo segnaposto", titleAfterBreak: "con il generatore Lorem Ipsum", intro: "Genera parole, paragrafi, frasi o caratteri per layout, prototipi e progetti di design.",
    schema: { description: "Un generatore Lorem Ipsum nel browser per parole, paragrafi, frasi e caratteri esatti.", featureList: ["Conteggio esatto di parole e paragrafi", "Generazione di caratteri e frasi", "Anteprima Adatta al riquadro", "Generazione nel browser"] },
    generator: { mode: "Modalità", modeLabel: "Modalità di generazione", layout: "Parole + paragrafi", characters: "Caratteri", sentences: "Frasi", quickWords: "Quantità rapide", presets: "Valori predefiniti", options: "Opzioni", startClassic: "Inizia con “Lorem ipsum…”", sentenceLength: "Lunghezza delle frasi", short: "brevi", mixed: "miste", long: "lunghe", output: "Risultato", outputAria: "Testo Lorem Ipsum generato", words: "Parole", paragraphs: "Paragrafi", stats: { words: "parole", characters: "caratteri", withoutSpaces: "senza spazi", sentences: "frasi", paragraphs: "paragrafi" }, copy: "Copia", copied: "Copiato", copyHtml: "Copia HTML", regenerate: "Rigenera" },
    consent: { aria: "Avviso su privacy e cookie", title: "Preferenze sulla privacy", intro: "Usiamo la memoria locale del browser solo per le preferenze essenziali. Analytics e pubblicità restano disattivati finché non li abiliti.", necessary: "Necessari", necessaryNote: "Tema e preferenze del consenso.", analytics: "Analytics", analyticsNote: "Statistiche anonime sull’utilizzo del sito.", advertising: "Pubblicità", advertisingNote: "Erogazione e misurazione degli annunci.", accept: "Accetta tutto", reject: "Rifiuta", customize: "Personalizza", save: "Salva preferenze" },
    match: { aria: "Sostituisci testo esistente", title: "Sostituisci testo esistente", note: "Sostituisci il testo mantenendo lo stesso ingombro.", source: "Testo di partenza", placeholder: "Incolla il testo da misurare…", matched: "Testo sostitutivo", characters: "Stessi caratteri", words: "Stesse parole", paragraphs: "Stessi paragrafi" },
    expansion: { title: "Espansione del testo", note: "Verifica come reagisce un layout con più o meno testo.", source: "Testo di partenza", placeholder: "Incolla un testo di riferimento…", adjustment: "Regolazione della lunghezza", custom: "Percentuale", percentage: "Percentuale personalizzata", target: "Lunghezza desiderata", characters: "caratteri", generate: "Genera variante" },
    fit: { aria: "Adatta al riquadro", title: "Adatta al riquadro", note: "Verifica quanto testo entra in un riquadro.", width: "Larghezza", height: "Altezza", fontSize: "Dimensione carattere", lineHeight: "Interlinea", padding: "Spaziatura interna", preview: "Anteprima", approximate: "adattamento approssimativo", box: "riquadro" },
    sections: { remainingTools: "Altri strumenti", aboutEyebrow: "UNA NOTA SUL TESTO SEGNAPOSTO", aboutTitle: "Una bozza per ogni layout.", aboutOne: "Lorem Ipsum è un testo segnaposto derivato dal latino classico. I designer lo usano per valutare gerarchia, ritmo, lunghezza delle righe e spaziatura prima che il testo finale sia pronto.", aboutTwo: "Imposta insieme parole e paragrafi per controllare densità e ritmo del layout, oppure passa a caratteri o frasi quando serve una lunghezza precisa.", seoEyebrow: "PENSATO PER LAYOUT REALI", seoTitle: "Un generatore Lorem Ipsum per designer e sviluppatori.", seoOneTitle: "Mantieni fedele il layout.", seoOneA: "Genera Lorem Ipsum con parole e paragrafi esatti insieme, poi regola la densità senza ricreare le impostazioni. Usa caratteri o frasi quando un componente, un titolo o un blocco richiede un ingombro preciso.", seoOneB: "Il generatore è pensato per wireframe, layout editoriali, prototipi di interfacce e studi tipografici. La funzione Adatta al riquadro aiuta a verificare il comportamento del testo prima che arrivi il contenuto definitivo.", seoTwoTitle: "Copia il formato che ti serve.", seoTwoA: "Copia testo semplice per note e bozze, oppure usa Copia HTML quando inserisci il testo segnaposto in una pagina o componente. Passa da un formato all’altro mentre il layout passa dall’esplorazione all’implementazione.", seoTwoB: "Usa il risultato come contenuto temporaneo durante il design. Sostituiscilo con il testo finale approvato prima di pubblicare il progetto.", guideEyebrow: "GUIDA BREVE AL LOREM IPSUM", guideTitle: "Perché il testo segnaposto è ancora utile.", guide: [["Cos’è il Lorem Ipsum", "Il Lorem Ipsum è un testo temporaneo usato per provare una pagina prima che le parole definitive siano disponibili. Ricorda una lingua ma non comunica un messaggio immediato: permette di valutare gerarchia, lunghezza delle righe, dimensione dei caratteri, spaziatura ed equilibrio visivo."], ["Da dove proviene", "L’incipit conosciuto deriva da un passaggio del De finibus bonorum et malorum di Cicerone. Nel tempo il testo latino è stato abbreviato e riorganizzato, fino a diventare il contenuto neutro usato dagli strumenti di progettazione grafica e digitale."], ["Quando usarlo", "Il Lorem Ipsum è utile per wireframe, primi prototipi, impaginazione editoriale, brochure, packaging e studi tipografici. Mantiene l’attenzione sulla struttura quando le decisioni sui contenuti sono ancora aperte."], ["Quando sostituirlo", "Il testo segnaposto va rimosso prima della pubblicazione di un sito, di un documento o di un progetto stampato. Il contenuto reale serve per verificare tono, accessibilità, significato, visibilità sui motori di ricerca e reale esperienza di lettura."]] },
    faq: { eyebrow: "RISPOSTE PER DESIGNER", title: "FAQ del generatore Lorem Ipsum", intro: "Risposte chiare su testo segnaposto, conteggi, privacy e utilizzo pratico.", items: [["Cos’è un generatore Lorem Ipsum?", "Un generatore Lorem Ipsum crea testo segnaposto temporaneo per valutare gerarchia, spaziatura, lunghezza delle righe e layout prima che il contenuto finale sia pronto."], ["Posso generare un numero esatto di parole e paragrafi?", "Sì. Imposta insieme parole e paragrafi. Il generatore mantiene esatto il conteggio totale distribuendo il testo in paragrafi naturalmente variati."], ["Posso usare Lorem Ipsum in un progetto commerciale?", "Lorem Ipsum è testo segnaposto. Sostituiscilo con il testo finale approvato prima di pubblicare o distribuire un prodotto finito."], ["Questo generatore Lorem Ipsum salva il mio testo?", "Il generatore funziona nel browser. Il testo inserito negli strumenti locali non viene inviato a un server. La preferenza del tema viene salvata localmente quando scegli un tema manuale."]] },
    footer: { description: "Testo segnaposto per layout curati.", aria: "Informazioni legali", privacy: "Informativa privacy", cookies: "Informativa sui cookie", manage: "Gestisci preferenze", privacyHref: "/it/privacy-policy/", cookiesHref: "/it/cookie-policy/" },
  },
};
