type LegalKind = "privacy" | "cookies";
type LegalLanguage = "en" | "it";

const content = {
  en: {
    privacy: {
      eyebrow: "LEGAL",
      title: "Privacy Policy",
      intro: "This policy describes the current behaviour of lorem-generator.com.",
      sections: [
        ["Text generation", "Lorem Ipsum generation runs in your browser. The generated text and text entered into the on-page tools are not sent to a server by this site."],
        ["Preferences", "When you choose a colour theme or save privacy choices, that preference is stored locally in your browser so the site can remember it on later visits."],
        ["Third-party services", "The site does not currently load analytics, advertising, AdSense, or other non-essential third-party tracking services."],
        ["Changes", "This policy will be updated before any new data-processing service is enabled."]
      ]
    },
    cookies: {
      eyebrow: "LEGAL",
      title: "Cookie Policy",
      intro: "This policy explains the current use of browser storage on lorem-generator.com.",
      sections: [
        ["Cookies", "The site does not currently set analytics, advertising, or other non-essential cookies."],
        ["Local storage", "Your selected colour theme and privacy choices may be saved in local storage on your device. This is used only to remember those preferences."],
        ["Optional services", "Analytics and advertising are not active. If they are added in the future, this policy and the consent controls will be updated before those services are enabled."],
        ["Managing storage", "You can clear local storage through your browser settings. Clearing it resets saved theme and privacy preferences."]
      ]
    }
  },
  it: {
    privacy: {
      eyebrow: "LEGALE",
      title: "Informativa privacy",
      intro: "Questa informativa descrive il comportamento attuale di lorem-generator.com.",
      sections: [
        ["Generazione del testo", "La generazione di Lorem Ipsum avviene nel browser. Il testo generato e quello inserito negli strumenti della pagina non vengono inviati a un server da questo sito."],
        ["Preferenze", "Quando scegli un tema colore o salvi le preferenze privacy, la scelta viene memorizzata localmente nel browser per ricordarla nelle visite successive."],
        ["Servizi di terze parti", "Il sito non carica attualmente analytics, pubblicità, AdSense o altri servizi di tracciamento non essenziali di terze parti."],
        ["Modifiche", "Questa informativa verrà aggiornata prima di attivare un nuovo servizio che comporti il trattamento di dati."]
      ]
    },
    cookies: {
      eyebrow: "LEGALE",
      title: "Cookie policy",
      intro: "Questa informativa spiega l’uso attuale della memoria del browser su lorem-generator.com.",
      sections: [
        ["Cookie", "Il sito non imposta attualmente cookie analytics, pubblicitari o altri cookie non essenziali."],
        ["Memoria locale", "Il tema colore scelto e le preferenze privacy possono essere salvati nella memoria locale del dispositivo. Sono usati solo per ricordare tali preferenze."],
        ["Servizi opzionali", "Analytics e pubblicità non sono attivi. Se verranno aggiunti in futuro, questa informativa e i controlli del consenso saranno aggiornati prima dell’attivazione."],
        ["Gestione della memoria", "Puoi cancellare la memoria locale dalle impostazioni del browser. Così verranno reimpostate le preferenze di tema e privacy."]
      ]
    }
  }
} as const;

export function LegalPage({ language, kind }: { language: LegalLanguage; kind: LegalKind }) {
  const copy = content[language][kind];
  const isItalian = language === "it";
  const home = isItalian ? "/it/" : "/";
  const privacy = isItalian ? "/it/privacy-policy/" : "/privacy-policy/";
  const cookies = isItalian ? "/it/cookie-policy/" : "/cookie-policy/";

  return <main className="site-shell legal-shell" lang={language}>
    <div className="page-content legal-content">
      <header className="legal-header">
        <a className="legal-home" href={home}>lorem-generator.com</a>
        <nav aria-label={isItalian ? "Navigazione legale" : "Legal navigation"}>
          <a href={privacy}>{isItalian ? "Privacy" : "Privacy"}</a>
          <a href={cookies}>{isItalian ? "Cookie" : "Cookies"}</a>
        </nav>
      </header>
      <article className="legal-article">
        <span className="eyebrow">{copy.eyebrow}</span>
        <h1>{copy.title}</h1>
        <p className="legal-intro">{copy.intro}</p>
        <div className="legal-sections">
          {copy.sections.map(([heading, body]) => <section key={heading}><h2>{heading}</h2><p>{body}</p></section>)}
        </div>
      </article>
    </div>
    <footer className="site-footer legal-footer"><div className="footer-brand"><span>lorem-generator.com © 2026</span></div><nav className="footer-links" aria-label={isItalian ? "Informazioni legali" : "Legal information"}><a href={privacy}>{isItalian ? "Informativa privacy" : "Privacy Policy"}</a><a href={cookies}>{isItalian ? "Cookie policy" : "Cookie Policy"}</a></nav></footer>
  </main>;
}
