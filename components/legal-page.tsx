type LegalKind = "privacy" | "cookies";
type LegalLanguage = "en" | "it" | "es";

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

const spanishPrivacy = {
  title: "Política de privacidad",
  intro: "Esta política describe el funcionamiento actual de lorem-generator.com en materia de privacidad.",
  sections: [
    ["Generación de texto", "La generación de Lorem Ipsum se realiza localmente en tu navegador. El texto generado y el que introduces en las herramientas de la página no se envían al servidor de la aplicación."],
    ["Preferencias", "Tus preferencias de tema de color y privacidad pueden guardarse localmente en el navegador para que la interfaz las recuerde."],
    ["Alojamiento y seguridad", "lorem-generator.com se distribuye mediante la infraestructura de Cloudflare. Cloudflare puede tratar información técnica limitada necesaria para prestar, proteger y operar el sitio web, como la dirección IP, información sobre las solicitudes y datos relacionados con la seguridad, de acuerdo con su propia política de privacidad."],
    ["Cambios", "El sitio no tiene activados actualmente servicios de analítica, publicidad, AdSense ni otros servicios de seguimiento no esenciales de terceros. Esta política se actualizará antes de activar cualquier nuevo servicio que implique tratamiento de datos."]
  ]
} as const;

const spanishCookies = {
  title: "Política de cookies",
  intro: "Esta política explica el uso actual de cookies y del almacenamiento local del navegador en lorem-generator.com.",
  sections: [
    ["Cookies", "El sitio no utiliza actualmente cookies de analítica, publicidad ni otras cookies no esenciales."],
    ["Almacenamiento local", "El almacenamiento local no es una cookie. La interfaz puede utilizarlo para recordar en este dispositivo tus preferencias de tema de color y privacidad."],
    ["Servicios opcionales", "Los servicios de analítica, publicidad y AdSense no están activados actualmente. Si se añade alguno de estos servicios, los controles de consentimiento y esta política se actualizarán antes de su activación."],
    ["Gestión del almacenamiento local", "Puedes borrar el almacenamiento local desde la configuración de tu navegador. Esto restablece las preferencias guardadas de tema y privacidad."]
  ]
} as const;

export function LegalPage({ language, kind }: { language: LegalLanguage; kind: LegalKind }) {
  const copy = language === "es" ? (kind === "cookies" ? spanishCookies : spanishPrivacy) : content[language][kind];
  const isItalian = language === "it";
  const isSpanish = language === "es";
  const home = isItalian ? "/it/" : isSpanish ? "/es/" : "/";

  return <main className="site-shell legal-shell" lang={language}>
    <article className="page-content legal-content">
      <a className="legal-back" href={home}>{isItalian ? "← Torna al generatore" : isSpanish ? "← Volver al generador" : "← Back to generator"}</a>
      <span className="legal-eyebrow">{isItalian ? "LEGALE" : "LEGAL"}</span>
      <h1>{copy.title}</h1>
      <p className="legal-intro">{copy.intro}</p>
      <div className="legal-sections">
        {copy.sections.map(([heading, body]) => <section key={heading}><h2>{heading}</h2><p>{body}</p></section>)}
      </div>
    </article>
  </main>;
}
