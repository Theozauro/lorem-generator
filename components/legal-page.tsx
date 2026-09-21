type LegalKind = "privacy" | "cookies";
type LegalLanguage = "en" | "it";

const content = {
  en: {
    privacy: {
      title: "Privacy Policy",
      intro: "This policy describes the current privacy behaviour of lorem-generator.com.",
      sections: [
        ["Text generation", "Lorem Ipsum generation runs locally in your browser. Generated text and text entered into the on-page tools are not sent to the site’s application server."],
        ["Preferences", "Your colour theme preference and privacy preference can be stored locally in your browser so the interface can remember those choices."],
        ["Hosting and security", "lorem-generator.com is delivered using Cloudflare infrastructure. Cloudflare may process limited technical information needed to deliver, secure, and operate the website, including IP address, request information, and security-related data, according to its own privacy terms."],
        ["Changes", "The site does not currently enable analytics, advertising, AdSense, or other non-essential third-party tracking services. This policy will be updated before a new data-processing service is enabled."]
      ]
    },
    cookies: {
      title: "Cookie Policy",
      intro: "This policy explains the current use of cookies and browser storage on lorem-generator.com.",
      sections: [
        ["Cookies", "The site does not currently use analytics, advertising, or other non-essential cookies."],
        ["Local storage", "Local storage is not a cookie. The interface may use it to remember your colour theme preference and your saved privacy preference on this device."],
        ["Optional services", "Analytics, advertising, and AdSense are not currently enabled. If any of these services are added, the consent controls and this policy will be updated before they are activated."],
        ["Managing storage", "You can clear local storage through your browser settings. This resets saved theme and privacy preferences."]
      ]
    }
  },
  it: {
    privacy: {
      title: "Informativa privacy",
      intro: "Questa informativa descrive il comportamento attuale di lorem-generator.com in materia di privacy.",
      sections: [
        ["Generazione del testo", "La generazione di Lorem Ipsum avviene localmente nel browser. Il testo generato e quello inserito negli strumenti della pagina non vengono inviati al server applicativo del sito."],
        ["Preferenze", "La preferenza del tema colore e la preferenza sulla privacy possono essere salvate localmente nel browser per permettere all’interfaccia di ricordare tali scelte."],
        ["Hosting e sicurezza", "lorem-generator.com viene distribuito tramite l’infrastruttura Cloudflare. Cloudflare può trattare informazioni tecniche limitate necessarie a distribuire, proteggere e gestire il sito, quali indirizzo IP, informazioni sulla richiesta e dati relativi alla sicurezza, secondo la propria informativa sulla privacy."],
        ["Modifiche", "Il sito non abilita attualmente analytics, pubblicità, AdSense o altri servizi di tracciamento non essenziali di terze parti. Questa informativa verrà aggiornata prima di attivare un nuovo servizio che comporti il trattamento di dati."]
      ]
    },
    cookies: {
      title: "Informativa sui cookie",
      intro: "Questa informativa spiega l’uso attuale dei cookie e della memoria del browser su lorem-generator.com.",
      sections: [
        ["Cookie", "Il sito non utilizza attualmente cookie per analytics, pubblicitari o altri cookie non essenziali."],
        ["Memoria locale", "La memoria locale non è un cookie. L’interfaccia può usarla per ricordare la preferenza del tema colore e la preferenza sulla privacy salvata su questo dispositivo."],
        ["Servizi opzionali", "Analytics, pubblicità e AdSense non sono attivi. Se uno di questi servizi verrà aggiunto, i controlli del consenso e questa informativa saranno aggiornati prima dell’attivazione."],
        ["Gestione della memoria", "Puoi cancellare la memoria locale dalle impostazioni del browser. Così verranno reimpostate le preferenze di tema e privacy salvate."]
      ]
    }
  }
} as const;

export function LegalPage({ language, kind }: { language: LegalLanguage; kind: LegalKind }) {
  const copy = content[language][kind];
  const isItalian = language === "it";
  const home = isItalian ? "/it/" : "/";

  return <main className="site-shell legal-shell" lang={language}>
    <article className="page-content legal-content">
      <a className="legal-back" href={home}>{isItalian ? "← Torna al generatore" : "← Back to generator"}</a>
      <span className="legal-eyebrow">{isItalian ? "LEGALE" : "LEGAL"}</span>
      <h1>{copy.title}</h1>
      <p className="legal-intro">{copy.intro}</p>
      <div className="legal-sections">
        {copy.sections.map(([heading, body]) => <section key={heading}><h2>{heading}</h2><p>{body}</p></section>)}
      </div>
    </article>
  </main>;
}
